"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Network() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const particleCount = 100;
  const maxDistance = 4;
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const c = new THREE.Color();
      c.setHSL(0.7 + Math.random() * 0.2, 1.0, 0.6); // Violet/Magenta range
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const velocities = useMemo(() => {
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
      vel.push(new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02));
    }
    return vel;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;
      
      // Bounce off walls
      if (positions[i * 3] > 10 || positions[i * 3] < -10) velocities[i].x *= -1;
      if (positions[i * 3 + 1] > 10 || positions[i * 3 + 1] < -10) velocities[i].y *= -1;
      if (positions[i * 3 + 2] > 5 || positions[i * 3 + 2] < -5) velocities[i].z *= -1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update lines
    const linePositions = [];
    const lineColors = [];
    
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        if (dist < maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
          
          const alpha = 1.0 - dist / maxDistance;
          lineColors.push(
            colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2], alpha,
            colors[j * 3], colors[j * 3 + 1], colors[j * 3 + 2], alpha
          );
        }
      }
    }
    
    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesRef.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
    
    // Slow rotation
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.y += 0.001;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <Network />
      </Canvas>
    </div>
  );
}
