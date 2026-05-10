"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ribbon() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 5000;
  
  // Create particle positions and colors
  const { positions, colors, initialTs } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const ts = new Float32Array(particleCount);
    
    const color1 = new THREE.Color("#3B6FFF");
    const color2 = new THREE.Color("#8B3FFF");
    const color3 = new THREE.Color("#E040FB");
    const color4 = new THREE.Color("#FF2EC4");
    
    for (let i = 0; i < particleCount; i++) {
      // Initialize t from 0 to 2PI
      const t = Math.random() * Math.PI * 2;
      ts[i] = t;
      
      // Determine color based on position along curve
      const colorProgress = t / (Math.PI * 2);
      const c = new THREE.Color();
      if (colorProgress < 0.33) c.lerpColors(color1, color2, colorProgress / 0.33);
      else if (colorProgress < 0.66) c.lerpColors(color2, color3, (colorProgress - 0.33) / 0.33);
      else c.lerpColors(color3, color4, (colorProgress - 0.66) / 0.34);
      
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    
    return { positions: pos, colors: col, initialTs: ts };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const a = 12; // Scale factor
    
    // Rotate entire scene slowly
    pointsRef.current.rotation.y += 0.002;
    
    // Mouse parallax
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, mouseY, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouseX, 0.05);
    
    // Breathe scale
    const scale = Math.cos(state.clock.elapsedTime * 0.5) * 0.02 + 1.0;
    pointsRef.current.scale.set(scale, scale, scale);

    // Flow particles
    for (let i = 0; i < particleCount; i++) {
      // Advance t
      initialTs[i] += delta * 0.5; // Speed
      const t = initialTs[i];
      
      // Lemniscate of Bernoulli
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (a * Math.cos(t)) / denom;
      const y = (a * Math.sin(t) * Math.cos(t)) / denom;
      const z = Math.sin(t * 2) * 2; // Add some depth
      
      // Add some noise/spread
      const spread = 0.5;
      const noiseX = Math.sin(i * 12.4) * spread;
      const noiseY = Math.cos(i * 4.2) * spread;
      const noiseZ = Math.sin(i * 8.1) * spread;
      
      positions[i * 3] = x + noiseX;
      positions[i * 3 + 1] = y + noiseY;
      positions[i * 3 + 2] = z + noiseZ;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function InfinityRibbon() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Ribbon />
      </Canvas>
    </div>
  );
}
