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
 *   0. Silk light field  — full-screen domain-warped colour that flows like silk
 *   1. Infinity ribbon   — particles flowing along a lemniscate (brand symbol),
 *                          parting around the cursor like a force field
 *   2. Comet streams     — a faster, brighter layer racing along the same ∞
 *   3. Neural lattice    — nodes + synapses with travelling signal pulses
 *   4. Ambient dust      — slow-drifting, twinkling depth particles
 *
 * Pointer and scroll input are eased every frame (frame-rate independent), and
 * each route change triggers a soft "breath" pulse so navigation feels connected.
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
  hero: { ribbonX: 0, ribbonY: 0.2, ribbonScale: 1, ribbonOpacity: 1, netOpacity: 0.85 },
  page: { ribbonX: 5.5, ribbonY: 1.2, ribbonScale: 0.72, ribbonOpacity: 0.62, netOpacity: 0.6 },
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

// Raw input from window listeners (the canvas itself ignores pointer events)…
const input = { x: 0, y: 0, scroll: 0 };
// …and its eased counterpart that every layer reads, for buttery motion.
const smooth = { x: 0, y: 0, scroll: 0, velocity: 0, pulse: 0 };

function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

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

// Soft sprite: crisp core + wide luminous halo.
const SOFT_POINT_FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float core = pow(smoothstep(1.0, 0.0, d), 2.4);
    float halo = exp(-d * d * 3.5) * 0.4;
    gl_FragColor = vec4(vColor, (core + halo) * vAlpha * uOpacity);
  }
`;

// ─── 0. Liquid silk light field ─────────────────────────────────────────────
// Full-screen, domain-warped noise in brand colours. Drawn behind everything,
// calmer in the reading area so text always stays crisp.
const SILK_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const SILK_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uOpacity;
  uniform float uPulse;
  uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3; uniform vec3 uC4;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 4; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 1.35;
    p += uMouse * 0.06 + vec2(0.0, uScroll * 0.35);
    float t = uTime * 0.045;

    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 2.6 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 2.6 * q + vec2(8.3, 2.8) - t * 1.1));
    float f = fbm(p + 2.4 * r);

    vec3 col = mix(uC1, uC2, smoothstep(0.2, 0.8, f));
    col = mix(col, uC3, smoothstep(0.35, 1.0, length(q) * 0.85));
    col = mix(col, uC4, smoothstep(0.55, 1.0, r.x) * 0.55);

    // Silky sheen: thin luminous folds that slide along the flow
    float folds = 0.5 + 0.5 * sin((f * 7.0 + r.y * 5.0) * 3.14159 + uTime * 0.35);
    float a = smoothstep(0.28, 0.92, f) * (0.55 + 0.45 * folds);

    // Keep the central reading area calmer; let colour bloom at the edges
    float edge = smoothstep(0.05, 0.75, length((uv - vec2(0.5, 0.52)) * vec2(1.15, 1.55)));
    a *= mix(0.38, 1.0, edge);

    gl_FragColor = vec4(col, a * uOpacity * (1.0 + uPulse * 0.35));
  }
`;

function Silk({ variantRef }: { variantRef: React.RefObject<SceneVariant> }) {
  const { size } = useThree();
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: SILK_VERT,
        fragmentShader: SILK_FRAG,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(1, 1) },
          uMouse: { value: new THREE.Vector2() },
          uScroll: { value: 0 },
          uOpacity: { value: 0 },
          uPulse: { value: 0 },
          uC1: { value: BRAND.blue },
          uC2: { value: BRAND.violet },
          uC3: { value: BRAND.magenta },
          uC4: { value: BRAND.cyan },
        },
      }),
    []
  );
  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2), []);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  useFrame((state, delta) => {
    const u = material.uniforms;
    const dt = Math.min(delta, 0.05);
    u.uTime.value = state.clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);
    u.uMouse.value.set(smooth.x, smooth.y);
    u.uScroll.value = smooth.scroll;
    u.uPulse.value = smooth.pulse;
    const target = (variantRef.current === "hero" ? 0.3 : 0.22) * (1 - Math.min(smooth.scroll, 1.2) * 0.25);
    u.uOpacity.value = damp(u.uOpacity.value, target, 1.5, dt);
  });

  return <mesh geometry={geometry} material={material} renderOrder={-10} frustumCulled={false} />;
}

// ─── 1 & 2. Infinity ribbon + comet streams ─────────────────────────────────
const RIBBON_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uFlow;
  uniform float uSpread;
  uniform float uPulse;
  uniform vec2 uMouse;
  uniform float uMouseRadius;
  attribute float aT;
  attribute vec3 aRand;
  attribute float aSpeed;
  varying vec3 vColor;
  varying float vAlpha;
  ${PALETTE_GLSL}
  void main() {
    float t = aT + uTime * uFlow * aSpeed;
    float s = sin(t);
    float c = cos(t);
    float d = 1.0 + s * s;
    // Lemniscate of Bernoulli (the ∞ curve)
    vec3 p = vec3(7.2 * c / d, 7.2 * s * c / d * 1.15, 0.0);
    // Breathing tube around the curve; widens briefly on route changes
    float spread = (0.30 + 0.22 * sin(t * 3.0 + uTime * 0.7)) * uSpread * (1.0 + uPulse * 1.8);
    p += aRand * spread * (0.6 + 0.8 * abs(aRand.y));
    p.z += sin(t * 2.0 + uTime * 0.35) * 1.4;

    // Cursor force field (world space): particles part around the pointer
    vec4 world = modelMatrix * vec4(p, 1.0);
    vec2 dm = world.xy - uMouse;
    float md = length(dm);
    float force = smoothstep(uMouseRadius, 0.0, md);
    world.xy += (dm / max(md, 0.001)) * force * 1.6;
    world.z += force * 1.2;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    float sizeJitter = 0.55 + 0.9 * fract(aRand.x * 91.7 + aRand.z * 13.1);
    gl_PointSize = uSize * sizeJitter * (1.0 + force * 0.8) * uPixelRatio * (12.0 / -mv.z);

    vColor = palette(aT / 6.28318 + uTime * 0.02);
    float flare = smoothstep(0.93, 1.0, sin(uTime * 1.3 + aRand.x * 40.0));
    vAlpha = 0.55 + 0.45 * flare + force * 0.35 + uPulse * 0.25;
  }
`;

interface RibbonProps {
  count: number;
  seed: number;
  size: number;
  flow: number;
  spread: number;
  opacityMul: number;
  variantRef: React.RefObject<SceneVariant>;
}

function Ribbon({ count, seed, size, flow, spread, opacityMul, variantRef }: RibbonProps) {
  const ref = useRef<THREE.Points>(null);
  const { gl } = useThree();

  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3); // positions computed in shader
    const t = new Float32Array(count);
    const rand = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const random = createRandom(seed);
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
        uSize: { value: size },
        uFlow: { value: flow },
        uSpread: { value: spread },
        uPulse: { value: 0 },
        uMouse: { value: new THREE.Vector2(999, 999) },
        uMouseRadius: { value: 2.6 },
        uOpacity: { value: 0 },
        uC1: { value: BRAND.blue },
        uC2: { value: BRAND.violet },
        uC3: { value: BRAND.magenta },
      },
    });
    return { geometry: g, material: m };
  }, [count, seed, size, flow, spread, gl]);

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const dt = Math.min(delta, 0.05);
    const v = VARIANTS[variantRef.current ?? "page"];
    const u = material.uniforms;
    const { width, height } = state.viewport;
    u.uTime.value = state.clock.elapsedTime;
    u.uPulse.value = smooth.pulse;
    u.uMouse.value.set(smooth.x * width * 0.5, smooth.y * height * 0.5);
    const targetOpacity = v.ribbonOpacity * opacityMul * (1 - Math.min(smooth.scroll, 1) * 0.5);
    u.uOpacity.value = damp(u.uOpacity.value, targetOpacity, 3, dt);

    // Fit the ∞ to narrow (portrait / mobile) viewports
    const fit = Math.min(1, width / 19);
    pts.position.x = damp(pts.position.x, v.ribbonX * fit, 2.2, dt);
    pts.position.y = damp(pts.position.y, v.ribbonY + smooth.scroll * 2.2, 2.2, dt);
    pts.scale.setScalar(damp(pts.scale.x, v.ribbonScale * Math.max(fit, 0.42) * (1 + smooth.pulse * 0.06), 2.2, dt));
    pts.rotation.x = -0.25 + smooth.y * 0.14 + smooth.scroll * 0.6;
    pts.rotation.y = smooth.x * 0.32 + smooth.velocity * 0.08;
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
      group.current.rotation.y = state.clock.elapsedTime * 0.025 + smooth.x * 0.08;
      group.current.rotation.x = smooth.y * 0.05 + smooth.scroll * 0.25;
      group.current.position.y = smooth.scroll * 3;
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

// ─── Input easing + camera rig ──────────────────────────────────────────────
function Rig({ routeKey }: { routeKey: string }) {
  const lastRoute = useRef(routeKey);
  const lastScroll = useRef(0);
  // Adaptive quality: if frames run slow for ~2s, step resolution down.
  const perf = useRef({ acc: 0, frames: 0, dpr: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const pf = perf.current;
    if (!pf.dpr) pf.dpr = state.viewport.dpr;
    pf.acc += delta;
    pf.frames++;
    if (pf.acc > 2) {
      const avg = pf.acc / pf.frames;
      if (avg > 1 / 45 && pf.dpr > 0.75) {
        pf.dpr = Math.max(0.75, pf.dpr - 0.25);
        state.setDpr(pf.dpr);
      }
      pf.acc = 0;
      pf.frames = 0;
    }
    if (lastRoute.current !== routeKey) {
      lastRoute.current = routeKey;
      smooth.pulse = 1; // route change → soft "breath"
    }
    smooth.x = damp(smooth.x, input.x, 4, dt);
    smooth.y = damp(smooth.y, input.y, 4, dt);
    smooth.scroll = damp(smooth.scroll, input.scroll, 6, dt);
    const vel = (input.scroll - lastScroll.current) / Math.max(dt, 0.001);
    lastScroll.current = input.scroll;
    smooth.velocity = damp(smooth.velocity, Math.max(-3, Math.min(3, vel)), 3, dt);
    smooth.pulse = damp(smooth.pulse, 0, 1.6, dt);

    const cam = state.camera;
    cam.position.x = damp(cam.position.x, smooth.x * 1.3, 2.5, dt);
    cam.position.y = damp(cam.position.y, smooth.y * 0.85, 2.5, dt);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Root ───────────────────────────────────────────────────────────────────
export default function BackgroundScene({ variant, routeKey, onReady }: { variant: SceneVariant; routeKey: string; onReady?: () => void }) {
  const variantRef = useRef<SceneVariant>(variant);
  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  const quality = useMemo(() => {
    if (typeof window === "undefined") return { ribbon: 4000, comets: 300, dust: 500, nodes: 50, silk: false };
    const small = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency || 4;
    const low = small || cores <= 4;
    return low
      ? { ribbon: 4000, comets: 260, dust: 350, nodes: 38, silk: !small }
      : { ribbon: 9000, comets: 520, dust: 900, nodes: 72, silk: true };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      input.x = (e.clientX / window.innerWidth) * 2 - 1;
      input.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => { input.x = 0; input.y = 0; };
    const onScroll = () => { input.scroll = Math.min(window.scrollY / window.innerHeight, 1.5); };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 50, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance", stencil: false, depth: false }}
      onCreated={() => onReady?.()}
      style={{ pointerEvents: "none" }}
    >
      <Rig routeKey={routeKey} />
      {quality.silk && <Silk variantRef={variantRef} />}
      <Dust count={quality.dust} />
      <NeuralLattice nodes={quality.nodes} variantRef={variantRef} />
      <Ribbon count={quality.ribbon} seed={1337} size={3.1} flow={0.16} spread={1} opacityMul={1} variantRef={variantRef} />
      <Ribbon count={quality.comets} seed={99} size={5.2} flow={0.42} spread={0.45} opacityMul={0.9} variantRef={variantRef} />
    </Canvas>
  );
}
