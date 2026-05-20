'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 400 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Warm saffron
        col[i * 3] = 0.88; col[i * 3 + 1] = 0.40; col[i * 3 + 2] = 0.12;
      } else if (colorChoice < 0.7) {
        // Deep green
        col[i * 3] = 0.12; col[i * 3 + 1] = 0.35; col[i * 3 + 2] = 0.18;
      } else if (colorChoice < 0.85) {
        // Gold
        col[i * 3] = 0.79; col[i * 3 + 1] = 0.64; col[i * 3 + 2] = 0.15;
      } else {
        // Warm brown
        col[i * 3] = 0.42; col[i * 3 + 1] = 0.33; col[i * 3 + 2] = 0.25;
      }
      siz[i] = Math.random() * 2.5 + 0.5;
    }
    return [pos, col, siz];
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const time = clock.getElapsedTime();
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(time * 0.3 + i * 0.01) * 0.002;
      posArray[i3] += Math.cos(time * 0.2 + i * 0.02) * 0.001;
      posArray[i3] += pointer.x * 0.0004;
      posArray[i3 + 1] += pointer.y * 0.0004;
      if (posArray[i3 + 1] > 8) posArray[i3 + 1] = -8;
      if (posArray[i3 + 1] < -8) posArray[i3 + 1] = 8;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.015;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function FloatingBook({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const init = useRef(position);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.y = init.current[1] + Math.sin(t * 0.4) * 0.4;
    ref.current.position.x = init.current[0] + Math.cos(t * 0.3) * 0.15;
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.6, 0.8, 0.12]} />
      <meshStandardMaterial color={color} transparent opacity={0.2} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#E0651E" />
      <pointLight position={[-10, -5, 5]} intensity={0.3} color="#1F5A2E" />
      <Particles count={400} />
      <FloatingBook position={[-3, 1, -3]} color="#E0651E" speed={0.7} />
      <FloatingBook position={[3, -0.5, -4]} color="#1F5A2E" speed={0.5} />
      <FloatingBook position={[0, 2, -5]} color="#C9A227" speed={0.9} />
      <FloatingBook position={[-2, -1.5, -2]} color="#B84915" speed={0.6} />
      <FloatingBook position={[2.5, 1.5, -3.5]} color="#1F5A2E" speed={0.8} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="canvas-container interactive">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
