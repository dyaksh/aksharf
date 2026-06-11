# Task 3 - Cinematic 3D WebGL Hero Section

## Agent: Hero 3D Agent
## Status: Completed

## Summary
Created a cinematic 3D WebGL hero section with Three.js/React Three Fiber that replaces the previous cream-background hero with a full-screen dark cinematic experience featuring floating crystalline structures and particle effects.

## Files Created
1. **`/src/components/3d/HeroScene.tsx`** - Three.js 3D scene component
2. **`/src/components/sections/HeroSection.tsx`** - Completely rewritten hero section (was 723 lines, now ~310 lines)

## Files Modified
1. **`/src/app/page.tsx`** - Updated SectionDivider fromBg from `#f8f3ed` to `#0d0a12` to match new dark hero background

## Technical Details

### HeroScene.tsx (3D Scene)
- **Framework**: React Three Fiber (`@react-three/fiber`) with drei helpers (`Float`, `MeshDistortMaterial`)
- **Crystalline Structures**: 3 types of floating shapes:
  - `Crystal` - Octahedron geometry with distort material (gold/purple), metalness 0.85
  - `Gem` - Icosahedron geometry with standard material (gold/purple), metalness 0.9
  - `TorusRing` - Torus geometry with standard material (gold/purple), metalness 0.95
- **Particle Field**: 400 particles using Points geometry with additive blending, drift upward like dust in light
- **Lighting**: Cinematic 5-light setup (ambient, 2 directional, 2 point lights) in gold/purple/cream
- **Performance**: `dpr={[1, 1.5]}`, ACES filmic tone mapping, transparent background, `pointerEvents: none`
- **Responsive**: Uses `useThree().viewport.width` to adjust crystal positions/scales for mobile
- **Colors**: #5d2c86 (purple), #D4AF37 (gold), #f8f3ed (cream)

### HeroSection.tsx (Cinematic Hero)
- **Background**: Dark `#0d0a12` base with 3D scene behind hero image
- **Hero Image**: `/images/hero/hero-main.jpeg` overlaid with multi-layer gradient system
- **Gradient System**: Bottom-to-top dark gradient + radial vignette + scroll-animated overlay opacity
- **Typography**: "Crafting Excellence in Hospitality FF&E" with cinematic stagger reveal
  - Each word animates with `y: 40 → 0`, `rotateX: -40 → 0`, `blur(8px) → blur(0)`
  - "Excellence" in italic with white-to-gold gradient
  - "FF&E" in full gold gradient
- **Subtitle**: "From Foshan to the world — premium furniture, fixtures & equipment for the finest hotels"
- **CTAs**: "Explore Our Work" (gold primary, goes to #portfolio) + "Get a Quote" (outline, goes to #contact)
- **Stats Bar**: 13+ Facilities, 5+ Years, 240+ Keys, 360° Coverage with gold gradient text
- **Parallax**: Image moves down on scroll, content moves up, overlay darkens, stats shift
- **Scroll Indicator**: Animated chevron at bottom
- **Reduced Motion**: Disables 3D scene entirely, disables parallax transforms
- **Accessibility**: `aria-hidden="true"` on 3D canvas and decorative elements, `sr-only` text for stats
- **No green colors used**

## Lint Status: Passes cleanly
## Dev Server: Compiles successfully
