"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// ─── LAYER 1: INFINITY PARTICLE RIBBON ────────────────────────
function InfinityRibbon() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 10;
  const particleCount = isMobile ? 1000 : 2000;
  const a = 8; // Scale factor

  const { positions, colors, offsets } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const off = new Float32Array(particleCount);
    
    const brandColors = [
      new THREE.Color("#3B6FFF"),
      new THREE.Color("#8B3FFF"),
      new THREE.Color("#E040FB"),
      new THREE.Color("#FF2EC4")
    ];

    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 2;
      off[i] = t;
      
      const colorProgress = (i / particleCount) * (brandColors.length - 1);
      const index = Math.floor(colorProgress);
      const nextIndex = Math.min(index + 1, brandColors.length - 1);
      const lerpFactor = colorProgress - index;
      
      const c = new THREE.Color().copy(brandColors[index]).lerp(brandColors[nextIndex], lerpFactor);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col, offsets: off };
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      // Flow particles along path
      offsets[i] += 0.005;
      const t = offsets[i];
      
      const denom = 1 + Math.pow(Math.sin(t), 2);
      const x = (a * Math.cos(t)) / denom;
      const y = (a * Math.sin(t) * Math.cos(t)) / denom;
      const z = Math.sin(t * 3 + time) * 0.5; // Ripple effect

      posAttr[i * 3] = x;
      posAttr[i * 3 + 1] = y;
      posAttr[i * 3 + 2] = z;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── LAYER 2: NEURAL NETWORK WEB ──────────────────────────────
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesCount = 80;
  
  const { nodes, lineGeometry } = useMemo(() => {
    const nodesArray = [];
    for (let i = 0; i < nodesCount; i++) {
      nodesArray.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 34,
          (Math.random() - 0.5) * 22,
          -Math.random() * 5
        ),
        phase: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.1 + 0.1
      });
    }
    return { nodes: nodesArray, lineGeometry: new THREE.BufferGeometry() };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y += 0.002;
    
    // Update lines dynamically (simplified for performance)
    const linePositions = [];
    const lineColors = [];
    const color = new THREE.Color("#8B3FFF");

    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 7) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
          lineColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
        }
      }
    }
    // We update nodes pulsing individually via refs if needed, but here using children
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={node.position}>
            <sphereGeometry args={[node.scale, 16, 16]} />
            <meshBasicMaterial color="#3B6FFF" transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ─── LAYER 3: FLOATING WIREFRAME GEOMETRIES ───────────────────
function FloatingGeometries() {
  const brandColors = ["#3B6FFF", "#8B3FFF", "#E040FB", "#FF2EC4"];
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      rotation: [Math.random(), Math.random(), Math.random()] as [number, number, number],
      speed: Math.random() * 0.006 + 0.003,
      size: Math.random() * 0.8 + 0.7,
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
      type: Math.random() > 0.5 ? 'icosa' : 'octa'
    }));
  }, []);

  return (
    <group>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} rotation={shape.rotation}>
          {shape.type === 'icosa' ? <icosahedronGeometry args={[shape.size, 1]} /> : <octahedronGeometry args={[shape.size, 1]} />}
          <meshBasicMaterial color={shape.color} wireframe transparent opacity={0.25} />
          <GeometryAnimator speed={shape.speed} />
        </mesh>
      ))}
    </group>
  );
}

function GeometryAnimator({ speed }: { speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += speed;
      ref.current.rotation.y += speed;
    }
  });
  return <primitive object={new THREE.Object3D()} ref={ref} />;
}

// ─── LAYER 4: DEEP SPACE PARTICLE FIELD ───────────────────────
function SpaceField() {
  const ref = useRef<THREE.Points>(null);
  const count = 2500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = -Math.random() * 30 - 10;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.001;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#FFFFFF" transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

// ─── CAMERA & PARALLAX ────────────────────────────────────────
function Scene() {
  const { camera, mouse } = useThree();
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame(() => {
    targetX.current = THREE.MathUtils.lerp(targetX.current, mouse.x * 2, 0.05);
    targetY.current = THREE.MathUtils.lerp(targetY.current, mouse.y * 1.5, 0.05);
    camera.position.x = targetX.current;
    camera.position.y = targetY.current;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <InfinityRibbon />
      <NeuralNetwork />
      <FloatingGeometries />
      <SpaceField />
    </>
  );
}

export default function LuminaBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isLowRes = window.innerWidth < 768;
      const noWebGL2 = !window.WebGL2RenderingContext;
      setIsMobile(isLowRes || noWebGL2);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0D0D1F]">
        <div className="absolute inset-0 animate-hue-pulse opacity-40" style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(59,111,255,0.15), transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(224,64,251,0.12), transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(139,63,255,0.10), transparent 70%)
          `
        }}></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0D0D1F]">
      <Canvas
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]}
      >
        {!prefersReducedMotion && <Scene />}
        {prefersReducedMotion && (
           <group>
             <InfinityRibbon />
             <SpaceField />
           </group>
        )}
      </Canvas>
    </div>
  );
}
