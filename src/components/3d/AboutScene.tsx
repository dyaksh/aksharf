'use client';

import { useRef, useMemo, useCallback, useSyncExternalStore } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { CinematicParticles } from './CinematicParticles';

/* ─────────────── Color constants ─────────────── */
const PURPLE = '#5d2c86';
const ACCENT = '#9b6ec5';
const CREAM = '#f8f3ed';

/* ─────────────── Floating Cube ─────────────── */

interface FloatingCubeProps {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color: string;
  floatSpeed?: number;
  floatIntensity?: number;
  wireframe?: boolean;
}

function FloatingCube({
  position,
  scale = 1,
  rotationSpeed = 0.08,
  color,
  floatSpeed = 0.8,
  floatIntensity = 0.3,
  wireframe = false,
}: FloatingCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
    meshRef.current.rotation.y += delta * rotationSpeed * 0.7;
    meshRef.current.rotation.z += delta * rotationSpeed * 0.2;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.15} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          wireframe={wireframe}
          transparent
          opacity={wireframe ? 0.4 : 0.6}
          envMapIntensity={1.0}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Floating Sphere ─────────────── */

interface FloatingSphereProps {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color: string;
  floatSpeed?: number;
  floatIntensity?: number;
  metalness?: number;
}

function FloatingSphere({
  position,
  scale = 1,
  rotationSpeed = 0.05,
  color,
  floatSpeed = 0.6,
  floatIntensity = 0.25,
  metalness = 0.85,
}: FloatingSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.1} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={0.12}
          transparent
          opacity={0.55}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Floating Octahedron ─────────────── */

interface FloatingOctahedronProps {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color: string;
  floatSpeed?: number;
  floatIntensity?: number;
}

function FloatingOctahedron({
  position,
  scale = 1,
  rotationSpeed = 0.06,
  color,
  floatSpeed = 0.7,
  floatIntensity = 0.3,
}: FloatingOctahedronProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.3;
    meshRef.current.rotation.y += delta * rotationSpeed * 0.5;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.12} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.08}
          transparent
          opacity={0.5}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Subtle Grid Lines ─────────────── */

function SubtleGrid() {
  const linesRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const gridSize = 12;
    const divisions = 12;
    const step = gridSize / divisions;
    const half = gridSize / 2;

    for (let i = 0; i <= divisions; i++) {
      const pos = -half + i * step;
      // Horizontal lines
      vertices.push(-half, 0, pos, half, 0, pos);
      // Vertical lines
      vertices.push(pos, 0, -half, pos, 0, half);
    }

    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geo;
  }, []);

  useFrame((_state, delta) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y += delta * 0.008;
  });

  return (
    <group ref={linesRef} position={[0, -3, -4]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color={PURPLE}
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ─────────────── Scene Content ─────────────── */

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 8;

  // Scale down animation speeds for reduced motion preference
  const motionScale = reducedMotion ? 0 : 1;

  return (
    <>
      {/* Soft ambient lighting for subtlety */}
      <ambientLight intensity={0.1} color={CREAM} />
      <directionalLight
        position={[4, 4, 4]}
        intensity={0.4}
        color={ACCENT}
      />
      <directionalLight
        position={[-3, 2, 3]}
        intensity={0.2}
        color={PURPLE}
      />
      <pointLight position={[0, 2, 3]} intensity={0.3} color={ACCENT} distance={10} />
      <pointLight position={[-3, -1, 2]} intensity={0.2} color={PURPLE} distance={8} />

      {/* Cinematic dust particles - purple tinted */}
      <CinematicParticles
        color={PURPLE}
        count={120}
        spread={16}
        speed={0.03 * motionScale}
        position={[0, 0, -2]}
        size={0.6}
        additive
      />

      {/* Second layer of accent particles - sparser */}
      <CinematicParticles
        color={ACCENT}
        count={60}
        spread={14}
        speed={0.025 * motionScale}
        position={[0, 0, -1]}
        size={0.4}
        additive
      />

      {/* Floating cubes - representing precision/manufacturing */}
      <FloatingCube
        position={isMobile ? [2.5, 1, -2] : [5, 1.5, -2]}
        scale={isMobile ? 0.4 : 0.6}
        color={ACCENT}
        rotationSpeed={0.06 * motionScale}
        floatSpeed={0.7}
        floatIntensity={0.25}
      />

      <FloatingCube
        position={isMobile ? [-2, -0.5, -3] : [-5, -1, -3]}
        scale={isMobile ? 0.3 : 0.45}
        color={PURPLE}
        rotationSpeed={0.08 * motionScale}
        floatSpeed={0.9}
        floatIntensity={0.3}
        wireframe
      />

      <FloatingCube
        position={isMobile ? [1, -1.5, -4] : [3.5, -2, -4]}
        scale={isMobile ? 0.2 : 0.3}
        color={PURPLE}
        rotationSpeed={0.1 * motionScale}
        floatSpeed={1.0}
        floatIntensity={0.35}
      />

      {/* Floating spheres - representing completeness/quality */}
      <FloatingSphere
        position={isMobile ? [-1.5, 1.5, -2.5] : [-3.5, 2.5, -2.5]}
        scale={isMobile ? 0.3 : 0.5}
        color={ACCENT}
        rotationSpeed={0.04 * motionScale}
        floatSpeed={0.6}
        floatIntensity={0.2}
      />

      <FloatingSphere
        position={isMobile ? [2, -1, -3.5] : [4, -1.5, -3.5]}
        scale={isMobile ? 0.2 : 0.35}
        color={CREAM}
        rotationSpeed={0.05 * motionScale}
        floatSpeed={0.8}
        floatIntensity={0.25}
        metalness={0.6}
      />

      <FloatingSphere
        position={isMobile ? [-2.5, -1.5, -4.5] : [-5, -2.5, -4.5]}
        scale={isMobile ? 0.15 : 0.25}
        color={ACCENT}
        rotationSpeed={0.03 * motionScale}
        floatSpeed={0.5}
        floatIntensity={0.2}
      />

      {/* Octahedron - precision gem shape */}
      <FloatingOctahedron
        position={isMobile ? [0.5, 2, -3] : [1.5, 3, -3]}
        scale={isMobile ? 0.15 : 0.25}
        color={PURPLE}
        rotationSpeed={0.07 * motionScale}
        floatSpeed={0.8}
        floatIntensity={0.3}
      />

      <FloatingOctahedron
        position={isMobile ? [-1, 0.5, -4] : [-2, 0.8, -4]}
        scale={isMobile ? 0.1 : 0.18}
        color={ACCENT}
        rotationSpeed={0.09 * motionScale}
        floatSpeed={1.0}
        floatIntensity={0.35}
      />

      {/* Subtle ground grid for manufacturing/precision feel */}
      <SubtleGrid />
    </>
  );
}

/* ─────────────── Main Canvas Component ─────────────── */

const reducedMotionSubscribe = (cb: () => void) => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getServerSnapshot = () => false;

export default function AboutScene() {
  const reducedMotion = useSyncExternalStore(
    reducedMotionSubscribe,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor('#000000', 0); // Transparent background
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.9; // Slightly dimmer than hero for subtlety
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop="always"
      onCreated={onCreated}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <SceneContent reducedMotion={reducedMotion} />
    </Canvas>
  );
}
