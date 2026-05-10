"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Geometries() {
  const groupRef = useRef<THREE.Group>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

    meshesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x += delta * (0.1 + i * 0.05);
      mesh.rotation.y += delta * (0.15 + i * 0.02);
      mesh.position.y += Math.sin(state.clock.elapsedTime + i) * 0.005;
    });
  });

  const material = new THREE.MeshPhysicalMaterial({
    color: "#8b3fff",
    emissive: "#3b6fff",
    emissiveIntensity: 0.2,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 1,
    ior: 1.5,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });

  return (
    <group ref={groupRef}>
      {/* Icosahedron */}
      <mesh 
        ref={(el) => { if (el) meshesRef.current[0] = el; }} 
        position={[-4, 2, -2]} 
        scale={1.5}
        material={material}
      >
        <icosahedronGeometry args={[1, 0]} />
      </mesh>

      {/* Octahedron */}
      <mesh 
        ref={(el) => { if (el) meshesRef.current[1] = el; }} 
        position={[4, -1, 1]} 
        scale={1.2}
        material={material}
      >
        <octahedronGeometry args={[1, 0]} />
      </mesh>

      {/* Torus */}
      <mesh 
        ref={(el) => { if (el) meshesRef.current[2] = el; }} 
        position={[1, 3, 2]} 
        scale={0.8}
        material={material}
      >
        <torusGeometry args={[1, 0.4, 16, 32]} />
      </mesh>

      {/* Dodecahedron */}
      <mesh 
        ref={(el) => { if (el) meshesRef.current[3] = el; }} 
        position={[-2, -3, 0]} 
        scale={1.4}
        material={material}
      >
        <dodecahedronGeometry args={[1, 0]} />
      </mesh>
    </group>
  );
}

export default function FloatingGeometries() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} color="#E040FB" intensity={2} />
        <Geometries />
      </Canvas>
    </div>
  );
}
