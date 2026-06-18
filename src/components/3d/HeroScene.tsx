'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────── Color constants ─────────────── */
const PURPLE = '#5d2c86';
const ACCENT = '#9b6ec5';
const CREAM = '#f8f3ed';

/* ─────────────── Floating Crystal ─────────────── */

interface CrystalProps {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color: string;
  distort?: number;
  floatSpeed?: number;
  floatIntensity?: number;
}

function Crystal({
  position,
  scale = 1,
  rotationSpeed = 0.15,
  color,
  distort = 0.25,
  floatSpeed = 1.5,
  floatIntensity = 0.6,
}: CrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.4;
    meshRef.current.rotation.y += delta * rotationSpeed * 0.6;
    meshRef.current.rotation.z += delta * rotationSpeed * 0.2;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.2} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.85}
          roughness={0.15}
          distort={distort}
          speed={1.5}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Icosahedron Gem ─────────────── */

interface GemProps {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color: string;
  floatSpeed?: number;
  floatIntensity?: number;
}

function Gem({
  position,
  scale = 1,
  rotationSpeed = 0.1,
  color,
  floatSpeed = 1.2,
  floatIntensity = 0.4,
}: GemProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * rotationSpeed;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.3;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.15} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Torus Ring ─────────────── */

interface TorusRingProps {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color: string;
  floatSpeed?: number;
  floatIntensity?: number;
}

function TorusRing({
  position,
  scale = 1,
  rotationSpeed = 0.08,
  color,
  floatSpeed = 0.8,
  floatIntensity = 0.3,
}: TorusRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
    meshRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.1} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.15, 16, 48]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1.8}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Particle Field ─────────────── */

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400;

  const { positions, opacities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const opa = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      opa[i] = Math.random() * 0.4 + 0.1;
    }
    return { positions: pos, opacities: opa };
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const purple = new THREE.Color(PURPLE);
    const accent = new THREE.Color(ACCENT);
    const cream = new THREE.Color(CREAM);
    const palette = [purple, accent, cream];

    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle upward drift like dust in light
      arr[i * 3 + 1] += delta * 0.06;
      arr[i * 3] += Math.sin(Date.now() * 0.0003 + i) * delta * 0.015;

      // Reset particles that drift too far
      if (arr[i * 3 + 1] > 7) {
        arr[i * 3 + 1] = -7;
        arr[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─────────────── Scene Composer ─────────────── */

function SceneContent() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 8;

  return (
    <>
      {/* Lighting - cinematic, warm and moody */}
      <ambientLight intensity={0.15} color={CREAM} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        color={ACCENT}
      />
      <directionalLight
        position={[-3, 3, 2]}
        intensity={0.3}
        color={PURPLE}
      />
      <pointLight position={[0, 2, 4]} intensity={0.8} color={ACCENT} distance={12} />
      <pointLight position={[-4, -1, 3]} intensity={0.4} color={PURPLE} distance={10} />

      {/* Particle field background */}
      <ParticleField />

      {/* Main crystals - larger, prominent */}
      <Crystal
        position={isMobile ? [2.2, 0.5, -1] : [4, 0.8, -1]}
        scale={isMobile ? 0.8 : 1.3}
        color={ACCENT}
        rotationSpeed={0.12}
        distort={0.2}
        floatSpeed={1.2}
        floatIntensity={0.5}
      />

      <Crystal
        position={isMobile ? [-2, -0.8, -2] : [-4.5, -0.5, -2]}
        scale={isMobile ? 0.6 : 0.9}
        color={PURPLE}
        rotationSpeed={0.18}
        distort={0.3}
        floatSpeed={1.6}
        floatIntensity={0.6}
      />

      {/* Secondary gems - smaller accent pieces */}
      <Gem
        position={isMobile ? [1.5, -1.5, -1.5] : [3, -2, -1.5]}
        scale={isMobile ? 0.35 : 0.55}
        color={ACCENT}
        rotationSpeed={0.2}
        floatSpeed={1.8}
        floatIntensity={0.7}
      />

      <Gem
        position={isMobile ? [-1.8, 1.2, -2.5] : [-3, 2, -2.5]}
        scale={isMobile ? 0.25 : 0.4}
        color={PURPLE}
        rotationSpeed={0.15}
        floatSpeed={1.4}
        floatIntensity={0.5}
      />

      {/* Torus rings - elegant orbiting shapes */}
      <TorusRing
        position={isMobile ? [-1, -1.5, -3] : [-2, -2.5, -3]}
        scale={isMobile ? 0.3 : 0.5}
        color={ACCENT}
        rotationSpeed={0.1}
        floatSpeed={0.8}
        floatIntensity={0.3}
      />

      <TorusRing
        position={isMobile ? [1.8, 1.8, -3.5] : [5, 2.5, -3.5]}
        scale={isMobile ? 0.25 : 0.35}
        color={PURPLE}
        rotationSpeed={0.12}
        floatSpeed={1.0}
        floatIntensity={0.4}
      />

      {/* Small accent crystal - far background */}
      <Crystal
        position={isMobile ? [0.5, 2, -4] : [1, 3.5, -4]}
        scale={isMobile ? 0.15 : 0.25}
        color={CREAM}
        rotationSpeed={0.08}
        distort={0.15}
        floatSpeed={1.0}
        floatIntensity={0.3}
      />
    </>
  );
}

/* ─────────────── Main Canvas Component ─────────────── */

export default function HeroScene() {
  // Throttle frame rate for performance
  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor('#000000', 0); // Transparent background
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.1;
    // Prevent WebGL context loss on page navigation
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
    });
    canvas.addEventListener('webglcontextrestored', () => {
      // Context will be restored by R3F automatically
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
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
      <SceneContent />
    </Canvas>
  );
}
