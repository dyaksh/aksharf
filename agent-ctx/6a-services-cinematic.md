# Task 6a - ServicesSection Cinematic Enhancement

## Task
Enhance the ServicesSection component with premium cinematic effects.

## Work Log

### 1. Cinematic Hero Section (Top Banner)
- Added full-width hero banner at top of section with cream-to-transparent background gradient (both light and dark modes)
- "WHAT WE COVER" eyebrow with gold (#D4AF37) color and tracking animation (letterSpacing animates from 0.6em → 0.3em)
- "360° FF&E support, under one roof." heading with word-by-word reveal (each word fades in with blur-to-focus and y-translation, staggered by 0.12s)
- Purple (#5d2c86) highlighting on key words (360°, FF&E, support,)
- Subtitle paragraph below with fade-in animation
- Animated gold gradient line below heading (grows from 0 to 120px width)
- Moved heading text and description from left column to the hero banner for better visual hierarchy

### 2. Service Card Enhancements
- **Blur-to-focus reveal**: Added motion.div overlay that animates from blur(8px)/opacity-0.5 to blur(0)/opacity-1 on scroll into view
- **3D tilt effect**: Created `TiltCard` wrapper component with CSS perspective (1000px) and mouse-move tracking, max 3deg rotation on each axis, smooth 0.15s ease-out on hover, 0.5s ease-out on leave
- **Gold shimmer sweep**: Added `.card-shimmer-sweep` CSS class with `cardShimmerSweep` keyframe animation - a skewed gold gradient that sweeps across the card on hover (1.2s duration)
- **Animated number counter**: Created `AnimatedCounter` component that counts up from 0 to target value using requestAnimationFrame and DOM textContent updates (avoids setState-in-effect lint error), with stats: 500+ projects, 120+ fixtures, 8K+ rooms fitted, 21 day avg, 99.2% pass rate, 340+ programs
- **Particle dot pattern**: Added `ParticleDots` SVG component with 20x20 pattern of 0.8px gold dots at 0.25 opacity, visible on hover only

### 3. Workshop Image Enhancement
- **Parallax scroll effect**: Used framer-motion `useScroll` + `useTransform` on image container, -30px to 30px y-translation based on scroll progress
- **Cinematic zoom-in on scroll**: Scale transforms from 1.08 → 1.04 → 1.12 based on scroll progress
- **"Manufacturing Excellence" overlay badge**: Positioned at bottom-left of image with animated conic-gradient border (reuses existing `award-card-border` CSS class with `--border-angle` animation), glass-morphism white/95 backdrop-blur background
- **Ken Burns animation**: Added `.animate-ken-burns` CSS class with 20s infinite zoom+pan keyframe animation (scale 1→1.08→1, slight translate)

### 4. Process Steps Section
- 4 horizontal steps: Design (PenTool) → Manufacture (Factory) → QC (CheckCircle) → Deliver (Truck)
- Desktop: 4-column grid with animated gold connector lines between steps
  - Background track (gray) with animated gold-to-purple gradient fill
  - Traveling gold dot with shadow glow
  - Arrow head at end of connector
- Mobile: Vertical layout with same connector pattern (vertical orientation)
- Each step has: icon in rounded card, "STEP 0N" label, title, description
- **Stagger animation**: Each step reveals with 0.15s delay offset via RevealOnScroll
- **Gold pulse glow**: Icon containers have animated box-shadow that pulses (0→0.6→0 opacity, 0.9→1.15→0.9 scale) on a 2.5s repeat cycle when in viewport
- Section header: "OUR PROCESS" gold eyebrow + "Four steps. Zero guesswork." heading

### 5. Gold Accent Separators
- Created reusable `GoldSeparator` component with centered gold-to-purple-to-gold gradient line
- Animates from scaleX(0) to scaleX(1) when scrolled into view (1.2s easeInOut)
- Placed between: hero banner ↔ service cards, service cards ↔ process steps, after process steps

### CSS Additions to globals.css
- `@keyframes cardShimmerSweep` - gold shimmer sweep across card on hover
- `.card-shimmer-sweep` - positioned overlay with skewX(-20deg) gold gradient
- `.group:hover .card-shimmer-sweep` - triggers animation on parent group hover
- `@keyframes kenBurns` - slow zoom/pan cycle (1→1.08→1 over 20s)
- `.animate-ken-burns` - applied to workshop image
- Added both new animations to `prefers-reduced-motion` disable list

### Technical Details
- Used DOM textContent updates instead of setState for AnimatedCounter to avoid `react-hooks/set-state-in-effect` lint error
- Used `hasAnimated` ref to prevent double-animation in StrictMode
- All animations respect `prefers-reduced-motion: reduce`
- Brand colors maintained: PURPLE=#5d2c86, GOLD=#D4AF37, CREAM=#f8f3ed
- Existing data structure and service cards preserved with added `stat` and `statLabel` fields
- RevealOnScroll usage maintained throughout
- All images use regular `<img>` tags

## Lint & Build
- Zero lint errors
- Dev server compiles successfully (GET / 200)
