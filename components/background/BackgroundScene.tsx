"use client";
/* eslint-disable react-hooks/immutability -- R3F idiom: GPU uniforms & object transforms are mutated inside useFrame, outside React's render cycle */

/**
 * LuminaXpert ambient 3D scene.
 *
 * Everything animates on the GPU inside custom shaders — the CPU only updates a
 * handful of uniforms per frame. One persistent <Canvas> lives in the root
 * layout, so navigating between pages never re-creates the WebGL context; the
 * scene simply eases into a different composition ("variant") per route.
 *
 * Layers:
 *   1. Infinity ribbon   — particles flowing along a lemniscate (brand symbol)
 *   2. Neural lattice    — nodes + synapses with travelling signal pulses
 *   3. Ambient dust      — slow-drifting, twinkling depth particles
 */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type SceneVariant = "hero" | "page";

const BRAND = {
  blue: new THREE.Color("#050DEB"),
  violet: new THREE.Color("#8B3FFF"),
  magenta: new THREE.Color("#FB00DF"),
  cyan: new THREE.Color("#00B8E6"),
};

// Composition targets per variant — the scene lerps toward these.
const VARIANTS: Record<SceneVariant, { ribbonX: number; ribbonY: number; ribbonScale: number; ribbonOpacity: number; netOpacity: number }> = {
  hero: { ribbonX: 0, ribbonY: 0.2, ribbonScale: 1, ribbonOpacity: 0.95, netOpacity: 0.85 },
  page: { ribbonX: 5.5, ribbonY: 1.2, ribbonScale: 0.72, ribbonOpacity: 0.55, netOpacity: 0.6 },
};

// Small seeded PRNG (mulberry32): deterministic layouts and render-pure useMemo.
function createRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Shared pointer / scroll state (window listeners; the canvas itself ignores pointer events).
const input = { x: 0, y: 0, scroll: 0 };

// ─── Shader chunks ──────────────────────────────────────────────────────────
const PALETTE_GLSL = /* glsl */ `
  uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3;
  vec3 palette(float t) {
    float x = fract(t) * 3.0;
    if (x < 1.0) return mix(uC1, uC2, x);
    if (x < 2.0) return mix(uC2, uC3, x - 1.0);
    return mix(uC3, uC1, x - 2.0);
  }
`;

const SOFT_POINT_FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, pow(core, 1.6) * vAlpha * uOpacity);
  }
`;

// ─── 1. Infinity ribbon ─────────────────────────────────────────────────────
const RIBBON_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  attribute float aT;
  attribute vec3 aRand;
  attribute float aSpeed;
  varying vec3 vColor;
  varying float vAlpha;
  ${PALETTE_GLSL}
  void main() {
    float t = aT + uTime * 0.16 * aSpeed;
    float s = sin(t);
    float c = cos(t);
    float d = 1.0 + s * s;
    // Lemniscate of Bernoulli (the ∞ curve)
    vec3 p = vec3(7.2 * c / d, 7.2 * s * c / d * 1.15, 0.0);
    // Breathing tube around the curve
    float spread = 0.32 + 0.22 * sin(t * 3.0 + uTime * 0.7);
    p += aRand * spread * (0.6 + 0.8 * abs(aRand.y));
    p.z += sin(t * 2.0 + uTime * 0.35) * 1.4;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float sizeJitter = 0.55 + 0.9 * fract(aRand.x * 91.7 + aRand.z * 13.1);
    gl_PointSize = uSize * sizeJitter * uPixelRatio * (12.0 / -mv.z);

    vColor = palette(aT / 6.28318 + uTime * 0.015);
    // Sparkle: a few particles flare periodically
    float flare = smoothstep(0.92, 1.0, sin(uTime * 1.3 + aRand.x * 40.0));
    vAlpha = 0.55 + 0.45 * flare;
  }
`;

function Ribbon({ count, variantRef }: { count: number; variantRef: React.RefObject<SceneVariant> }) {
  const ref = useRef<THREE.Points>(null);
  const { gl } = useThree();

  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3); // positions computed in shader
    const t = new Float32Array(count);
    const rand = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const random = createRandom(1337);
    for (let i = 0; i < count; i++) {
      t[i] = random() * Math.PI * 2;
      // Gaussian-ish distribution for a dense core and soft edges
      const r = () => (random() + random() + random() - 1.5) / 1.5;
      rand[i * 3] = r();
      rand[i * 3 + 1] = r();
      rand[i * 3 + 2] = r();
      speed[i] = 0.7 + random() * 0.6;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aT", new THREE.BufferAttribute(t, 1));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 3));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

    const m = new THREE.ShaderMaterial({
      vertexShader: RIBBON_VERT,
      fragmentShader: SOFT_POINT_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
        uSize: { value: 3.1 },
        uOpacity: { value: 0 },
        uC1: { value: BRAND.blue },
        uC2: { value: BRAND.violet },
        uC3: { value: BRAND.magenta },
      },
    });
    return { geometry: g, material: m };
  }, [count, gl]);

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const v = VARIANTS[variantRef.current ?? "page"];
    const k = 1 - Math.pow(0.04, delta); // frame-rate independent easing
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uOpacity.value += (v.ribbonOpacity * (1 - Math.min(input.scroll, 1) * 0.55) - material.uniforms.uOpacity.value) * k;
    // Fit the ∞ to narrow (portrait / mobile) viewports
    const fit = Math.min(1, state.viewport.width / 19);
    pts.position.x += (v.ribbonX * fit - pts.position.x) * k;
    pts.position.y += (v.ribbonY + input.scroll * 2.2 - pts.position.y) * k;
    const s = pts.scale.x + (v.ribbonScale * Math.max(fit, 0.42) - pts.scale.x) * k;
    pts.scale.setScalar(s);
    pts.rotation.x = -0.25 + input.y * 0.12 + input.scroll * 0.6;
    pts.rotation.y += ((input.x * 0.35) - pts.rotation.y) * k * 0.5;
    pts.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
  });

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}

// ─── 2. Neural lattice ──────────────────────────────────────────────────────
const NODE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vAlpha;
  uniform vec3 uC1; uniform vec3 uC2;
  void main() {
    vec3 p = position;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float pulse = 0.5 + 0.5 * sin(uTime * 1.6 + aSeed * 30.0);
    gl_PointSize = (3.5 + pulse * 3.5) * uPixelRatio * (14.0 / -mv.z);
    vColor = mix(uC1, uC2, aSeed);
    vAlpha = 0.45 + 0.55 * pulse;
  }
`;

const LINE_VERT = /* glsl */ `
  uniform float uTime;
  attribute float aProgress;
  attribute float aSeed;
  varying float vProgress;
  varying float vSeed;
  void main() {
    vec3 p = position;
    vProgress = aProgress;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const LINE_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uC1; uniform vec3 uC2;
  varying float vProgress;
  varying float vSeed;
  void main() {
    float head = fract(uTime * (0.12 + vSeed * 0.18) + vSeed * 7.0);
    float pulse = smoothstep(0.14, 0.0, abs(vProgress - head));
    vec3 col = mix(uC1, uC2, vProgress);
    float a = 0.07 + pulse * 0.75;
    gl_FragColor = vec4(col, a * uOpacity);
  }
`;

function NeuralLattice({ nodes: nodeCount, variantRef }: { nodes: number; variantRef: React.RefObject<SceneVariant> }) {
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const { nodeGeo, nodeMat, lineGeo, lineMat } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const random = createRandom(42);
    for (let i = 0; i < nodeCount; i++) {
      // Distribute in a wide, shallow ellipsoid shell so the lattice frames the content
      const u = random() * Math.PI * 2;
      const v = Math.acos(2 * random() - 1);
      const r = 0.55 + random() * 0.45;
      pts.push(new THREE.Vector3(Math.sin(v) * Math.cos(u) * 17 * r, Math.cos(v) * 9 * r, Math.sin(v) * Math.sin(u) * 6 * r - 4));
    }
    const nodePos = new Float32Array(nodeCount * 3);
    const nodeSeed = new Float32Array(nodeCount);
    pts.forEach((p, i) => { nodePos.set([p.x, p.y, p.z], i * 3); nodeSeed[i] = random(); });
    const ng = new THREE.BufferGeometry();
    ng.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    ng.setAttribute("aSeed", new THREE.BufferAttribute(nodeSeed, 1));

    // Connect each node to its nearest neighbours (computed once, not per frame)
    const segs: number[] = [];
    const prog: number[] = [];
    const seeds: number[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < nodeCount; i++) {
      const near = pts
        .map((p, j) => ({ j, d: p.distanceToSquared(pts[i]) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      for (const { j, d } of near) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key) || d > 60) continue;
        seen.add(key);
        segs.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        prog.push(0, 1);
        const s = random();
        seeds.push(s, s);
      }
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(segs, 3));
    lg.setAttribute("aProgress", new THREE.Float32BufferAttribute(prog, 1));
    lg.setAttribute("aSeed", new THREE.Float32BufferAttribute(seeds, 1));

    const shared = { uTime: { value: 0 }, uOpacity: { value: 0 }, uC1: { value: BRAND.violet }, uC2: { value: BRAND.cyan } };
    const nm = new THREE.ShaderMaterial({
      vertexShader: NODE_VERT,
      fragmentShader: SOFT_POINT_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: { ...shared, uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) } },
    });
    const lm = new THREE.ShaderMaterial({
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: shared,
    });
    return { nodeGeo: ng, nodeMat: nm, lineGeo: lg, lineMat: lm };
  }, [nodeCount, gl]);

  useEffect(() => () => { nodeGeo.dispose(); nodeMat.dispose(); lineGeo.dispose(); lineMat.dispose(); }, [nodeGeo, nodeMat, lineGeo, lineMat]);

  useFrame((state, delta) => {
    const v = VARIANTS[variantRef.current ?? "page"];
    const k = 1 - Math.pow(0.05, delta);
    const u = nodeMat.uniforms; // uTime/uOpacity objects are shared with the line material
    u.uTime.value = state.clock.elapsedTime;
    u.uOpacity.value += (v.netOpacity - u.uOpacity.value) * k;
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.025 + input.x * 0.08;
      group.current.rotation.x = input.y * 0.05 + input.scroll * 0.25;
      group.current.position.y = input.scroll * 3;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo} material={lineMat} frustumCulled={false} />
      <points geometry={nodeGeo} material={nodeMat} frustumCulled={false} />
    </group>
  );
}

// ─── 3. Ambient dust ────────────────────────────────────────────────────────
const DUST_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vAlpha;
  uniform vec3 uC1; uniform vec3 uC2;
  void main() {
    vec3 p = position;
    // Upward drift that wraps around a 30-unit tall volume
    p.y = mod(p.y + uTime * (0.15 + aSeed * 0.25) + 15.0, 30.0) - 15.0;
    p.x += sin(uTime * 0.2 + aSeed * 12.0) * 0.6;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.5 + aSeed * 2.5) * uPixelRatio * (14.0 / -mv.z);
    vColor = mix(uC1, uC2, aSeed);
    float twinkle = 0.5 + 0.5 * sin(uTime * (0.8 + aSeed * 2.0) + aSeed * 50.0);
    vAlpha = 0.25 + 0.5 * twinkle;
  }
`;

function Dust({ count }: { count: number }) {
  const { gl } = useThree();
  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const random = createRandom(7);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random() - 0.5) * 50;
      pos[i * 3 + 1] = (random() - 0.5) * 30;
      pos[i * 3 + 2] = -random() * 25 + 2;
      seed[i] = random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: DUST_VERT,
      fragmentShader: SOFT_POINT_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.7 },
        uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
        uC1: { value: BRAND.blue },
        uC2: { value: BRAND.magenta },
      },
    });
    return { geometry: g, material: m };
  }, [count, gl]);

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);
  useFrame((state) => { material.uniforms.uTime.value = state.clock.elapsedTime; });
  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

// ─── Camera rig ─────────────────────────────────────────────────────────────
function CameraRig() {
  useFrame((state, delta) => {
    const k = 1 - Math.pow(0.08, delta);
    const cam = state.camera;
    cam.position.x += (input.x * 1.4 - cam.position.x) * k;
    cam.position.y += (input.y * 0.9 - cam.position.y) * k;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Root ───────────────────────────────────────────────────────────────────
export default function BackgroundScene({ variant, onReady }: { variant: SceneVariant; onReady?: () => void }) {
  const variantRef = useRef<SceneVariant>(variant);
  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  const quality = useMemo(() => {
    if (typeof window === "undefined") return { ribbon: 4000, dust: 500, nodes: 50 };
    const small = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency || 4;
    const low = small || cores <= 4;
    return low ? { ribbon: 4000, dust: 350, nodes: 38 } : { ribbon: 9000, dust: 900, nodes: 72 };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      input.x = (e.clientX / window.innerWidth) * 2 - 1;
      input.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => { input.scroll = Math.min(window.scrollY / window.innerHeight, 1.5); };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 50, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance", stencil: false, depth: false }}
      onCreated={() => onReady?.()}
      style={{ pointerEvents: "none" }}
    >
      <Dust count={quality.dust} />
      <NeuralLattice nodes={quality.nodes} variantRef={variantRef} />
      <Ribbon count={quality.ribbon} variantRef={variantRef} />
      <CameraRig />
    </Canvas>
  );
}
