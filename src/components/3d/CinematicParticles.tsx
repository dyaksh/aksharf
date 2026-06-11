'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────── Custom Shaders ─────────────── */

const particleVertexShader = /* glsl */ `
  attribute float aOpacity;
  attribute float aSize;
  varying float vOpacity;
  varying float vDistance;

  void main() {
    vOpacity = aOpacity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDistance = -mvPosition.z;
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  varying float vOpacity;
  varying float vDistance;

  void main() {
    // Soft circular particle with glow falloff
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft glow: bright center, gentle falloff
    float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;

    // Subtle pulsing based on time and position
    float pulse = 0.85 + 0.15 * sin(uTime * 1.5 + vDistance * 0.5);
    alpha *= pulse;

    // Fade with distance for depth
    float depthFade = smoothstep(20.0, 2.0, vDistance);
    alpha *= depthFade;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ─────────────── Props ─────────────── */

export interface CinematicParticlesProps {
  /** Base color for the particles (hex string) */
  color?: string;
  /** Number of particles to render */
  count?: number;
  /** Spread of particles in world units */
  spread?: number;
  /** Speed of particle drift animation */
  speed?: number;
  /** Initial position offset [x, y, z] */
  position?: [number, number, number];
  /** Base size of particles */
  size?: number;
  /** Whether to use additive blending for glow effect */
  additive?: boolean;
}

/* ─────────────── Component ─────────────── */

export function CinematicParticles({
  color = '#D4AF37',
  count = 200,
  spread = 10,
  speed = 0.05,
  position = [0, 0, 0],
  size = 1.0,
  additive = true,
}: CinematicParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate particle positions, opacities, and sizes
  const { positions, opacities, sizes, seeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const opa = new Float32Array(count);
    const siz = new Float32Array(count);
    const sed = new Float32Array(count); // random seeds for varied motion

    for (let i = 0; i < count; i++) {
      // Distribute particles in a soft volume
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 1;

      // Varying opacity for natural look
      opa[i] = Math.random() * 0.35 + 0.08;

      // Varying sizes for depth illusion
      siz[i] = (Math.random() * 0.6 + 0.4) * size;

      // Random seed for unique motion per particle
      sed[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, opacities: opa, sizes: siz, seeds: sed };
  }, [count, spread, size]);

  // Uniform color as THREE.Color
  const uniformColor = useMemo(() => new THREE.Color(color), [color]);

  // Animate particles each frame
  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const elapsed = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const seed = seeds[i];

      // Gentle upward drift like dust motes in hotel lighting
      arr[i * 3 + 1] += speed * 0.5;

      // Soft lateral sway
      arr[i * 3] += Math.sin(elapsed * 0.4 + seed) * speed * 0.3;

      // Subtle depth oscillation
      arr[i * 3 + 2] += Math.cos(elapsed * 0.3 + seed * 1.5) * speed * 0.1;

      // Reset particles that drift above the top
      const halfSpreadY = spread * 0.35;
      if (arr[i * 3 + 1] > halfSpreadY) {
        arr[i * 3 + 1] = -halfSpreadY;
        arr[i * 3] = (Math.random() - 0.5) * spread;
        arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 1;
      }
    }
    posAttr.needsUpdate = true;

    // Update time uniform for shader pulsing
    materialRef.current.uniforms.uTime.value = elapsed;
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          args={[opacities, 1]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{
          uColor: { value: uniformColor },
          uTime: { value: 0 },
        }}
        transparent
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}
