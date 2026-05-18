"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Scene Fog (applied directly) ───────────────────────────────────── */
function SceneFog() {
  const { scene } = useThree();
  useMemo(() => {
    scene.fog = new THREE.FogExp2("#020617", 0.045);
  }, [scene]);
  return null;
}

/* ── Particle Field ──────────────────────────────────────────────── */
function ParticleField({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 0.05 + 0.01;
    }
    return [pos, sz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.02;
    mesh.current.rotation.x = Math.sin(t * 0.01) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#00e5ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Volumetric Light Cone ────────────────────────────────────────── */
function LightCone() {
  const light = useRef<THREE.SpotLight>(null!);

  useFrame(({ clock }) => {
    if (!light.current) return;
    const t = clock.getElapsedTime();
    light.current.position.x = Math.sin(t * 0.15) * 3;
    light.current.position.z = Math.cos(t * 0.1) * 2;
  });

  return (
    <spotLight
      ref={light}
      position={[0, 10, 0]}
      angle={0.4}
      penumbra={0.8}
      intensity={3}
      color="#00e5ff"
      distance={30}
      castShadow={false}
    />
  );
}

/* ── Floating Orb ────────────────────────────────────────────────── */
function FloatingOrb({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Main Scene Component ─────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <SceneFog />
      <ambientLight intensity={0.05} color="#0f172a" />
      <LightCone />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#164e63" distance={15} />
      <pointLight position={[5, -3, 5]} intensity={0.5} color="#22d3ee" distance={10} />
      <ParticleField count={350} />
      <FloatingOrb position={[-4, 2, -3]} />
      <FloatingOrb position={[4, -1, -2]} />
      <FloatingOrb position={[0, 3, -5]} />
      <FloatingOrb position={[-2, -2, -4]} />
    </>
  );
}

/* ── Canvas Wrapper ──────────────────────────────────────────────── */
interface AtmosphereSceneProps {
  className?: string;
}

export default function AtmosphereScene({ className = "" }: AtmosphereSceneProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
