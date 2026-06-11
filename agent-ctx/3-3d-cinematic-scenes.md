---
Task ID: 3
Agent: 3D Cinematic Scene Components Agent
Task: Create 3D WebGL/Three.js cinematic scene components for the Akshar Foshan hotel FF&E website

Work Log:
- Read existing HeroScene.tsx to understand patterns (Canvas with transparent bg, pointer-events: none, Float from drei, useFrame animations)
- Read worklog.md for full project context (brand colors, architecture, conventions)
- Verified available packages: @react-three/fiber ^9.6.1, @react-three/drei ^10.7.7, three ^0.184.0

Files Created:

1. **`/home/z/my-project/src/components/3d/CinematicParticles.tsx`**
   - Reusable particle system component with named export `CinematicParticles`
   - Custom vertex + fragment shaders for premium look (soft circular particles with glow falloff, pulsing, depth fade)
   - Props: color, count, spread, speed, position, size, additive
   - Uses THREE.Points with THREE.ShaderMaterial
   - Particles drift upward like dust motes in hotel lighting with lateral sway
   - Supports both additive and normal blending
   - Proper TypeScript interface exported as `CinematicParticlesProps`

2. **`/home/z/my-project/src/components/3d/AboutScene.tsx`**
   - Subtle 3D background scene for About page
   - Floating geometric shapes: cubes (solid + wireframe), spheres, octahedrons - representing manufacturing/precision
   - Dual-layer CinematicParticles (purple + gold dust)
   - Subtle ground grid for manufacturing/precision aesthetic
   - Purple and gold color palette, very low opacity for subtlety
   - Camera at z=7, fov=45 for wider, less dramatic perspective
   - Reduced tone mapping exposure (0.9) for subtlety
   - Mobile responsive (fewer/smaller objects, adjusted positions)
   - Uses useSyncExternalStore for reduced motion detection (lint-compliant)

3. **`/home/z/my-project/src/components/3d/PortfolioScene.tsx`**
   - Creative 3D background for Portfolio page
   - Grid of floating small cubes/rectangles with gentle wave animation (sin wave across grid)
   - Gold and cream color palette with dark accents
   - Dual-layer CinematicParticles (gold + cream dust)
   - Floating icosahedron accents for visual interest
   - Subtle horizontal lines for structural elegance
   - Camera at z=8, fov=45 for wide view of grid
   - Mobile responsive (5x3 vs 7x4 grid, adjusted scale/spacing)
   - Uses useSyncExternalStore for reduced motion detection (lint-compliant)

Technical Decisions:
- Used useSyncExternalStore instead of useEffect+useState for reduced motion to comply with React 19 strict lint rules (no setState in effect body)
- All components follow HeroScene.tsx pattern: Canvas with transparent bg, pointer-events: none, DPR [1, 1.5]
- Reduced motion support zeros out animation speeds when prefers-reduced-motion is active
- Performance optimized: low poly geometries, efficient instancing, throttled animation speeds
- All files use 'use client' directive for dynamic import compatibility

Lint: PASS (0 errors, 0 warnings)
Dev Server: Running correctly on port 3000
