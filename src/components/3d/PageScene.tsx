'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ---- Particles ---- */
function Particles({ count = 250, colors }: { count?: number; colors: [number, number, number][] }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colorsArr] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      const c = colors[Math.floor(Math.random() * colors.length)];
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, [count, colors]);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const arr = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 1] += Math.sin(t * 0.3 + i * 0.01) * 0.003;
      arr[i3] += Math.cos(t * 0.2 + i * 0.02) * 0.0015;
      arr[i3] += pointer.x * 0.0005;
      arr[i3 + 1] += pointer.y * 0.0005;
      if (arr[i3 + 1] > 6) arr[i3 + 1] = -6;
      if (arr[i3 + 1] < -6) arr[i3 + 1] = 6;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = t * 0.012;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colorsArr, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.7} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ---- Floating Shape ---- */
type ShapeType = 'box' | 'sphere' | 'octahedron' | 'tetrahedron' | 'torus' | 'cone' | 'dodecahedron' | 'icosahedron';

function FloatingShape({ position, color, shape = 'box', speed = 1, scale = 1 }: {
  position: [number, number, number]; color: string; shape?: ShapeType; speed?: number; scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const init = useRef(position);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.y = init.current[1] + Math.sin(t * 0.4) * 0.6;
    ref.current.position.x = init.current[0] + Math.cos(t * 0.3) * 0.25;
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.z = t * 0.12;
    ref.current.rotation.y = t * 0.1;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere': return <sphereGeometry args={[0.5 * scale, 16, 16]} />;
      case 'octahedron': return <octahedronGeometry args={[0.55 * scale]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[0.55 * scale]} />;
      case 'torus': return <torusGeometry args={[0.5 * scale, 0.15 * scale, 12, 24]} />;
      case 'cone': return <coneGeometry args={[0.4 * scale, 0.7 * scale, 8]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[0.5 * scale]} />;
      case 'icosahedron': return <icosahedronGeometry args={[0.5 * scale]} />;
      default: return <boxGeometry args={[0.6 * scale, 0.8 * scale, 0.15 * scale]} />;
    }
  }, [shape, scale]);

  return (
    <mesh ref={ref} position={position}>
      {geometry}
      <meshStandardMaterial color={color} transparent opacity={0.35} wireframe />
    </mesh>
  );
}

/* ---- Floating Ring ---- */
function FloatingRing({ position, color, speed = 0.5, radius = 0.8 }: {
  position: [number, number, number]; color: string; speed?: number; radius?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const init = useRef(position);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.y = init.current[1] + Math.sin(t * 0.3) * 0.4;
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.04, 16, 48]} />
      <meshStandardMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

/* ---- Scene Presets ---- */
export interface SceneConfig {
  particleColors: [number, number, number][];
  particleCount?: number;
  shapes: { pos: [number, number, number]; color: string; shape: ShapeType; speed: number; scale?: number }[];
  rings?: { pos: [number, number, number]; color: string; speed: number; radius: number }[];
  lights?: { pos: [number, number, number]; color: string; intensity: number }[];
}

function SceneContent({ config }: { config: SceneConfig }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      {(config.lights || [
        { pos: [10, 10, 10] as [number, number, number], color: '#935073', intensity: 0.6 },
        { pos: [-10, -5, 5] as [number, number, number], color: '#502D55', intensity: 0.4 },
      ]).map((l, i) => (
        <pointLight key={i} position={l.pos} intensity={l.intensity} color={l.color} />
      ))}
      <Particles count={config.particleCount || 300} colors={config.particleColors} />
      {config.shapes.map((s, i) => (
        <FloatingShape key={i} position={s.pos} color={s.color} shape={s.shape} speed={s.speed} scale={s.scale || 1} />
      ))}
      {config.rings?.map((r, i) => (
        <FloatingRing key={`r${i}`} position={r.pos} color={r.color} speed={r.speed} radius={r.radius} />
      ))}
    </>
  );
}

export default function PageScene({ config, className = '' }: { config: SceneConfig; className?: string }) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <SceneContent config={config} />
      </Canvas>
    </div>
  );
}

/* ---- Updated color palette: Violet Dusk ---- */
/* Deep Violet #502D55, Mauve #935073, Peach Cream #F6DBC0, Light Violet #6B4370, Rose #B06E90 */

export const sceneConfigs = {
  home: {
    particleColors: [[0.58, 0.31, 0.45], [0.31, 0.18, 0.33], [0.96, 0.86, 0.75], [0.42, 0.26, 0.44]] as [number, number, number][],
    particleCount: 400,
    shapes: [
      { pos: [-3, 0.5, -1.5] as [number, number, number], color: '#935073', shape: 'box' as ShapeType, speed: 0.7, scale: 1.4 },
      { pos: [3, -0.3, -2] as [number, number, number], color: '#502D55', shape: 'box' as ShapeType, speed: 0.5, scale: 1.2 },
      { pos: [0, 1.5, -2.5] as [number, number, number], color: '#F6DBC0', shape: 'octahedron' as ShapeType, speed: 0.9, scale: 1.3 },
      { pos: [-2, -1.2, -1] as [number, number, number], color: '#6B4370', shape: 'box' as ShapeType, speed: 0.6, scale: 1.1 },
      { pos: [2.5, 1, -2] as [number, number, number], color: '#502D55', shape: 'tetrahedron' as ShapeType, speed: 0.8, scale: 1.2 },
    ],
    rings: [
      { pos: [-1, 0.3, -2] as [number, number, number], color: '#F6DBC0', speed: 0.3, radius: 1.5 },
      { pos: [2, -0.8, -1.5] as [number, number, number], color: '#935073', speed: 0.4, radius: 1.0 },
    ],
  } as SceneConfig,

  about: {
    particleColors: [[0.42, 0.26, 0.44], [0.31, 0.18, 0.33], [0.96, 0.86, 0.75]] as [number, number, number][],
    particleCount: 300,
    shapes: [
      { pos: [-3, 1, -1.5] as [number, number, number], color: '#6B4370', shape: 'dodecahedron' as ShapeType, speed: 0.5, scale: 1.5 },
      { pos: [3, -0.3, -2] as [number, number, number], color: '#502D55', shape: 'icosahedron' as ShapeType, speed: 0.6, scale: 1.4 },
      { pos: [0, -1, -1] as [number, number, number], color: '#F6DBC0', shape: 'sphere' as ShapeType, speed: 0.4, scale: 1.6 },
      { pos: [-1.5, 0, -2.5] as [number, number, number], color: '#935073', shape: 'octahedron' as ShapeType, speed: 0.7, scale: 1.3 },
      { pos: [2, 1.5, -1] as [number, number, number], color: '#B06E90', shape: 'tetrahedron' as ShapeType, speed: 0.5, scale: 1.2 },
    ],
    rings: [
      { pos: [1, 0.5, -2] as [number, number, number], color: '#6B4370', speed: 0.25, radius: 1.8 },
      { pos: [-2, -0.5, -1.5] as [number, number, number], color: '#F6DBC0', speed: 0.35, radius: 1.2 },
    ],
  } as SceneConfig,

  courses: {
    particleColors: [[0.58, 0.31, 0.45], [0.31, 0.18, 0.33], [0.96, 0.86, 0.75]] as [number, number, number][],
    particleCount: 320,
    shapes: [
      { pos: [-3, 0.5, -1] as [number, number, number], color: '#935073', shape: 'box' as ShapeType, speed: 0.6, scale: 1.6 },
      { pos: [3.5, -0.3, -2] as [number, number, number], color: '#502D55', shape: 'box' as ShapeType, speed: 0.4, scale: 1.4 },
      { pos: [0.5, 1.5, -2.5] as [number, number, number], color: '#F6DBC0', shape: 'box' as ShapeType, speed: 0.8, scale: 1.2 },
      { pos: [-2, -0.8, -1.5] as [number, number, number], color: '#502D55', shape: 'tetrahedron' as ShapeType, speed: 0.7, scale: 1.3 },
      { pos: [2, 1, -1] as [number, number, number], color: '#6B4370', shape: 'cone' as ShapeType, speed: 0.5, scale: 1.3 },
    ],
    rings: [
      { pos: [-0.5, 0, -2] as [number, number, number], color: '#935073', speed: 0.3, radius: 1.4 },
    ],
  } as SceneConfig,

  results: {
    particleColors: [[0.96, 0.86, 0.75], [0.58, 0.31, 0.45], [0.42, 0.26, 0.44]] as [number, number, number][],
    particleCount: 350,
    shapes: [
      { pos: [-3, 0.8, -1] as [number, number, number], color: '#F6DBC0', shape: 'octahedron' as ShapeType, speed: 0.6, scale: 1.7 },
      { pos: [3, -0.3, -2] as [number, number, number], color: '#F6DBC0', shape: 'icosahedron' as ShapeType, speed: 0.5, scale: 1.5 },
      { pos: [0, 1.5, -2.5] as [number, number, number], color: '#935073', shape: 'dodecahedron' as ShapeType, speed: 0.7, scale: 1.3 },
      { pos: [-2, -1, -1.5] as [number, number, number], color: '#F6DBC0', shape: 'sphere' as ShapeType, speed: 0.8, scale: 1.2 },
      { pos: [2.5, 1, -1] as [number, number, number], color: '#6B4370', shape: 'tetrahedron' as ShapeType, speed: 0.4, scale: 1.4 },
    ],
    rings: [
      { pos: [0, 0, -2] as [number, number, number], color: '#F6DBC0', speed: 0.2, radius: 2.2 },
      { pos: [-2, 0.8, -1] as [number, number, number], color: '#935073', speed: 0.35, radius: 1.0 },
    ],
  } as SceneConfig,

  feeTiming: {
    particleColors: [[0.31, 0.18, 0.33], [0.96, 0.86, 0.75], [0.42, 0.26, 0.44]] as [number, number, number][],
    particleCount: 280,
    shapes: [
      { pos: [-3, 0.3, -1] as [number, number, number], color: '#F6DBC0', shape: 'sphere' as ShapeType, speed: 0.5, scale: 1.5 },
      { pos: [3, 0.8, -2] as [number, number, number], color: '#502D55', shape: 'torus' as ShapeType, speed: 0.6, scale: 1.4 },
      { pos: [0, -0.8, -2.5] as [number, number, number], color: '#F6DBC0', shape: 'dodecahedron' as ShapeType, speed: 0.4, scale: 1.4 },
      { pos: [-2, 1.2, -1.5] as [number, number, number], color: '#935073', shape: 'octahedron' as ShapeType, speed: 0.7, scale: 1.3 },
    ],
    rings: [
      { pos: [1, -0.3, -1.5] as [number, number, number], color: '#502D55', speed: 0.3, radius: 1.5 },
    ],
  } as SceneConfig,

  gallery: {
    particleColors: [[0.58, 0.31, 0.45], [0.31, 0.18, 0.33], [0.96, 0.86, 0.75], [0.42, 0.26, 0.44]] as [number, number, number][],
    particleCount: 300,
    shapes: [
      { pos: [-3, 0.8, -1] as [number, number, number], color: '#935073', shape: 'box' as ShapeType, speed: 0.5, scale: 1.7 },
      { pos: [3, -0.3, -2] as [number, number, number], color: '#502D55', shape: 'box' as ShapeType, speed: 0.4, scale: 1.5 },
      { pos: [0, 1.5, -2.5] as [number, number, number], color: '#F6DBC0', shape: 'box' as ShapeType, speed: 0.7, scale: 1.3 },
      { pos: [-1.5, -1, -1.5] as [number, number, number], color: '#6B4370', shape: 'box' as ShapeType, speed: 0.6, scale: 1.1 },
    ],
    rings: [
      { pos: [1.5, 0.3, -1.5] as [number, number, number], color: '#F6DBC0', speed: 0.3, radius: 1.3 },
      { pos: [-1, -0.5, -1] as [number, number, number], color: '#935073', speed: 0.25, radius: 0.9 },
    ],
  } as SceneConfig,

  inquiry: {
    particleColors: [[0.31, 0.18, 0.33], [0.42, 0.35, 0.44], [0.42, 0.26, 0.44]] as [number, number, number][],
    particleCount: 260,
    shapes: [
      { pos: [-3, 0.8, -1] as [number, number, number], color: '#502D55', shape: 'cone' as ShapeType, speed: 0.5, scale: 1.5 },
      { pos: [3, -0.3, -2] as [number, number, number], color: '#935073', shape: 'tetrahedron' as ShapeType, speed: 0.6, scale: 1.4 },
      { pos: [0, 1.5, -2.5] as [number, number, number], color: '#502D55', shape: 'icosahedron' as ShapeType, speed: 0.4, scale: 1.3 },
      { pos: [-1.5, -0.8, -1.5] as [number, number, number], color: '#F6DBC0', shape: 'octahedron' as ShapeType, speed: 0.7, scale: 1.2 },
    ],
    rings: [
      { pos: [-1, 0, -1.5] as [number, number, number], color: '#502D55', speed: 0.2, radius: 1.6 },
      { pos: [2, 0.5, -1] as [number, number, number], color: '#F6DBC0', speed: 0.3, radius: 1.0 },
    ],
  } as SceneConfig,

  contact: {
    particleColors: [[0.58, 0.31, 0.45], [0.42, 0.26, 0.44], [0.96, 0.86, 0.75]] as [number, number, number][],
    particleCount: 280,
    shapes: [
      { pos: [-3, 0.3, -1] as [number, number, number], color: '#935073', shape: 'sphere' as ShapeType, speed: 0.5, scale: 1.4 },
      { pos: [3, 0.8, -2] as [number, number, number], color: '#6B4370', shape: 'torus' as ShapeType, speed: 0.6, scale: 1.5 },
      { pos: [0, -0.8, -2.5] as [number, number, number], color: '#F6DBC0', shape: 'dodecahedron' as ShapeType, speed: 0.4, scale: 1.3 },
      { pos: [-2, 1.2, -1.5] as [number, number, number], color: '#502D55', shape: 'octahedron' as ShapeType, speed: 0.7, scale: 1.4 },
    ],
    rings: [
      { pos: [1, -0.3, -1] as [number, number, number], color: '#935073', speed: 0.25, radius: 1.3 },
      { pos: [-1.5, 0.5, -2] as [number, number, number], color: '#F6DBC0', speed: 0.3, radius: 1.6 },
    ],
  } as SceneConfig,
};

