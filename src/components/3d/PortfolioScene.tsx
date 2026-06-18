'use client';

import { useRef, useMemo, useCallback, useSyncExternalStore } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { CinematicParticles } from './CinematicParticles';

/* ─────────────── Color constants ─────────────── */
const ACCENT = '#9b6ec5';
const CREAM = '#f8f3ed';
const DARK = '#1A1A1A';

/* ─────────────── Wave Grid Cube ─────────────── */

interface WaveGridCubeProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  index: number;
  totalCols: number;
  totalRows: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  opacity?: number;
  isRectangle?: boolean;
}

function WaveGridCube({
  position,
  scale = 1,
  color,
  index,
  totalCols,
  totalRows,
  waveSpeed = 0.8,
  waveAmplitude = 0.3,
  opacity = 0.35,
  isRectangle = false,
}: WaveGridCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  // Calculate grid coordinates for wave phase offset
  const col = index % totalCols;
  const row = Math.floor(index / totalCols);
  const phaseOffset = (col + row) * 0.6;

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsed = state.clock.elapsedTime;

    // Gentle sine wave across the grid
    const wave = Math.sin(elapsed * waveSpeed + phaseOffset) * waveAmplitude;
    meshRef.current.position.y = initialY + wave;

    // Subtle rotation synced to wave
    meshRef.current.rotation.x = wave * 0.3;
    meshRef.current.rotation.z = wave * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {isRectangle ? (
        <boxGeometry args={[0.6, 0.8, 0.3]} />
      ) : (
        <boxGeometry args={[0.4, 0.4, 0.4]} />
      )}
      <meshStandardMaterial
        color={color}
        metalness={0.75}
        roughness={0.25}
        transparent
        opacity={opacity}
        envMapIntensity={1.0}
      />
    </mesh>
  );
}

/* ─────────────── Floating Accent ─────────────── */

interface FloatingAccentProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  floatSpeed?: number;
  floatIntensity?: number;
  rotationSpeed?: number;
}

function FloatingAccent({
  position,
  scale = 1,
  color,
  floatSpeed = 0.7,
  floatIntensity = 0.3,
  rotationSpeed = 0.05,
}: FloatingAccentProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * rotationSpeed;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.4;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.12} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.1}
          transparent
          opacity={0.4}
          envMapIntensity={1.3}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Horizontal Line Accent ─────────────── */

function HorizontalLine({
  position,
  length = 8,
  color = ACCENT,
}: {
  position: [number, number, number];
  length?: number;
  color?: string;
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const half = length / 2;
    const vertices = new Float32Array([-half, 0, 0, half, 0, 0]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return geo;
  }, [length]);

  return (
    <line position={position} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </line>
  );
}

/* ─────────────── Scene Content ─────────────── */

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 8;

  const motionScale = reducedMotion ? 0 : 1;

  // Grid configuration
  const cols = isMobile ? 5 : 7;
  const rows = isMobile ? 3 : 4;
  const spacing = isMobile ? 1.4 : 1.6;
  const totalCubes = cols * rows;

  // Generate grid positions and colors
  const gridItems = useMemo(() => {
    const items: {
      position: [number, number, number];
      color: string;
      isRectangle: boolean;
      opacity: number;
    }[] = [];

    const offsetX = ((cols - 1) * spacing) / 2;
    const offsetY = ((rows - 1) * spacing) / 2;

    const palette = [ACCENT, CREAM, '#b892d4', '#e8dcc8', DARK];
    const rectPalette = [ACCENT, CREAM, '#a07bbd'];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isRect = Math.random() > 0.55;
        const colorPool = isRect ? rectPalette : palette;
        const color = colorPool[Math.floor(Math.random() * colorPool.length)];
        items.push({
          position: [
            col * spacing - offsetX,
            row * spacing - offsetY,
            -3 - Math.random() * 2,
          ],
          color,
          isRectangle: isRect,
          opacity: 0.15 + Math.random() * 0.25,
        });
      }
    }
    return items;
  }, [cols, rows, spacing]);

  return (
    <>
      {/* Soft warm lighting for portfolio elegance */}
      <ambientLight intensity={0.12} color={CREAM} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.35}
        color={ACCENT}
      />
      <directionalLight
        position={[-4, 3, 4]}
        intensity={0.2}
        color={CREAM}
      />
      <pointLight position={[0, 3, 4]} intensity={0.4} color={ACCENT} distance={14} />
      <pointLight position={[4, -2, 3]} intensity={0.15} color={CREAM} distance={10} />

      {/* Accent particle dust */}
      <CinematicParticles
        color={ACCENT}
        count={100}
        spread={18}
        speed={0.02 * motionScale}
        position={[0, 0, -2]}
        size={0.5}
        additive
      />

      {/* Cream particle dust - subtle second layer */}
      <CinematicParticles
        color={CREAM}
        count={50}
        spread={14}
        speed={0.018 * motionScale}
        position={[0, 0, -1]}
        size={0.35}
        additive
      />

      {/* Wave grid of cubes/rectangles */}
      {gridItems.map((item, index) => (
        <WaveGridCube
          key={index}
          position={item.position}
          scale={isMobile ? 0.5 : 0.65}
          color={item.color}
          index={index}
          totalCols={cols}
          totalRows={rows}
          waveSpeed={0.6 * motionScale}
          waveAmplitude={0.25 * motionScale}
          opacity={item.opacity}
          isRectangle={item.isRectangle}
        />
      ))}

      {/* Floating accent shapes - icosahedrons for visual interest */}
      <FloatingAccent
        position={isMobile ? [3, 2, -4] : [6, 3, -4]}
        scale={isMobile ? 0.2 : 0.35}
        color={ACCENT}
        floatSpeed={0.6}
        floatIntensity={0.25}
        rotationSpeed={0.04 * motionScale}
      />

      <FloatingAccent
        position={isMobile ? [-3, -1.5, -5] : [-6, -2, -5]}
        scale={isMobile ? 0.15 : 0.28}
        color={CREAM}
        floatSpeed={0.8}
        floatIntensity={0.3}
        rotationSpeed={0.06 * motionScale}
      />

      <FloatingAccent
        position={isMobile ? [1.5, -2.5, -5.5] : [4, -3.5, -5.5]}
        scale={isMobile ? 0.12 : 0.2}
        color={ACCENT}
        floatSpeed={0.5}
        floatIntensity={0.2}
        rotationSpeed={0.03 * motionScale}
      />

      {/* Subtle horizontal lines for structure */}
      <HorizontalLine
        position={[0, isMobile ? 3 : 4.5, -4]}
        length={isMobile ? 10 : 16}
        color={ACCENT}
      />
      <HorizontalLine
        position={[0, isMobile ? -3 : -4.5, -4]}
        length={isMobile ? 10 : 16}
        color={ACCENT}
      />
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

export default function PortfolioScene() {
  const reducedMotion = useSyncExternalStore(
    reducedMotionSubscribe,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor('#000000', 0); // Transparent background
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
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
