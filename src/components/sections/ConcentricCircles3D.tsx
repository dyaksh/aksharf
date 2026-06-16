'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sofa, Lamp, Bath, Package, ShieldCheck, Frame } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const services = [
  {
    icon: Sofa,
    title: 'Casegoods & Upholstery',
    shortTitle: 'Casegoods',
    description: 'Full range of hotel casegoods, headboards, desks, and upholstered seating crafted to brand specifications.',
    stat: '500+',
    statLabel: 'projects',
    color: '#5d2c86',
  },
  {
    icon: Lamp,
    title: 'Lighting & Mirrors',
    shortTitle: 'Lighting',
    description: 'Custom lighting solutions and mirrors designed to complement each property\'s unique aesthetic.',
    stat: '120+',
    statLabel: 'fixtures',
    color: '#7d44a8',
  },
  {
    icon: Bath,
    title: 'Bathroom Accessories',
    shortTitle: 'Bathroom',
    description: 'Complete bathroom FF&E packages including vanities, accessories, and hardware.',
    stat: '8K+',
    statLabel: 'rooms fitted',
    color: '#9b6bc4',
  },
  {
    icon: Package,
    title: 'Sourcing & Logistics',
    shortTitle: 'Logistics',
    description: 'End-to-end supply chain management from raw materials to on-site delivery and installation.',
    stat: '21',
    statLabel: 'day avg',
    color: '#D4AF37',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Control',
    shortTitle: 'QC',
    description: 'Rigorous inspection at every stage — from raw material through production to final packaging.',
    stat: '99.2%',
    statLabel: 'pass rate',
    color: '#b8960e',
  },
  {
    icon: Frame,
    title: 'Art & Decor',
    shortTitle: 'Decor',
    description: 'Curated art programs and decorative accessories that bring each hotel\'s brand story to life.',
    stat: '340+',
    statLabel: 'programs',
    color: '#8b7410',
  },
];

/* ═══════════════════════════════════════════════════════
   PARTICLE CANVAS — ambient floating particles
   ═══════════════════════════════════════════════════════ */

function ParticleCanvas({ color1 = '#5d2c86', color2 = '#D4AF37' }: { color1?: string; color2?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? color1 : color2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = alpha * 0.3;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [color1, color2]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}

/* ═══════════════════════════════════════════════════════
   3D ORBIT RING — SVG ring with 3D perspective
   ═══════════════════════════════════════════════════════ */

function OrbitRing({
  radius,
  color,
  dashArray,
  opacity = 0.3,
  rotateSpeed = 60,
  reverse = false,
  strokeWidth = 1.5,
}: {
  radius: number;
  color: string;
  dashArray?: string;
  opacity?: number;
  rotateSpeed?: number;
  reverse?: boolean;
  strokeWidth?: number;
}) {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 500 500"
      style={{ transform: 'perspective(800px) rotateX(60deg)', transformStyle: 'preserve-3d' }}
      animate={{ rotateZ: reverse ? -360 : 360 }}
      transition={{ duration: rotateSpeed, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      <circle
        cx="250"
        cy="250"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        opacity={opacity}
      />
    </motion.svg>
  );
}

/* ═══════════════════════════════════════════════════════
   ORBITING NODE — service/stat node that orbits a ring
   ═══════════════════════════════════════════════════════ */

function OrbitingNode({
  angle,
  radius,
  children,
  orbitSpeed = 40,
  reverse = false,
  delay = 0,
  isInView,
}: {
  angle: number;
  radius: number;
  children: React.ReactNode;
  orbitSpeed?: number;
  reverse?: boolean;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transformStyle: 'preserve-3d',
      }}
      animate={
        isInView
          ? {
              rotateZ: reverse ? -360 : 360,
            }
          : {}
      }
      transition={{
        duration: orbitSpeed,
        repeat: Infinity,
        ease: 'linear',
        delay: delay,
      }}
    >
      <motion.div
        style={{
          transform: `translate(${radius}px, 0)`,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.5, type: 'spring', stiffness: 150 }}
      >
        {/* Counter-rotate to keep content upright */}
        <motion.div
          animate={
            isInView
              ? {
                  rotateZ: reverse ? 360 : -360,
                }
              : {}
          }
          transition={{
            duration: orbitSpeed,
            repeat: Infinity,
            ease: 'linear',
            delay: delay,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICE NODE — icon + label for inner ring
   ═══════════════════════════════════════════════════════ */

function ServiceNode({
  service,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  service: (typeof services)[0];
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const Icon = service.icon;
  return (
    <motion.button
      className="relative flex flex-col items-center cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      animate={{
        scale: isActive || isHovered ? 1.15 : 1,
      }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
      aria-label={service.title}
    >
      {/* Active glow pulse */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 25px ${service.color}55, 0 0 50px ${service.color}25`,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Icon circle */}
      <div
        className={`
          w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-full flex items-center justify-center 
          border-2 shadow-lg transition-all duration-300 backdrop-blur-md
          ${
            isActive
              ? 'bg-gradient-to-br from-[#5d2c86] to-[#7d44a8] border-[#D4AF37] shadow-[0_0_30px_rgba(93,44,134,0.4)]'
              : isHovered
                ? 'bg-white/90 dark:bg-[#1E1E1E]/90 border-[#5d2c86]/50 shadow-[0_0_20px_rgba(93,44,134,0.2)]'
                : 'bg-white/80 dark:bg-[#1E1E1E]/80 border-gray-200/80 dark:border-gray-700/60 shadow-md'
          }
        `}
      >
        <Icon
          className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-[#5d2c86] dark:text-[#7d44a8]'
          }`}
        />
      </div>

      {/* Service label */}
      <div
        className={`
          mt-2 text-center transition-all duration-300 px-2
          ${isActive ? 'opacity-100' : isHovered ? 'opacity-100' : 'opacity-75'}
        `}
      >
        <span
          className={`text-[9px] sm:text-[10px] lg:text-xs font-sans-body font-bold tracking-wide leading-tight block ${
            isActive ? 'text-[#5d2c86] dark:text-[#7d44a8]' : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          {service.shortTitle}
        </span>
      </div>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════
   STAT NODE — stat pill for outer ring
   ═══════════════════════════════════════════════════════ */

function StatNode({
  service,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  service: (typeof services)[0];
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <motion.button
      className="relative cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      animate={{
        scale: isActive || isHovered ? 1.12 : 1,
      }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
      aria-label={`${service.stat} ${service.statLabel}`}
    >
      <div
        className={`
          px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border backdrop-blur-md shadow-md transition-all duration-300
          ${
            isActive
              ? 'bg-[#D4AF37]/15 border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
              : isHovered
                ? 'bg-white/90 dark:bg-[#1E1E1E]/90 border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                : 'bg-white/70 dark:bg-[#1E1E1E]/70 border-[#D4AF37]/15 shadow-sm'
          }
        `}
      >
        <div className="flex items-baseline gap-1">
          <span
            className={`text-sm sm:text-base lg:text-lg font-bold font-serif-display ${
              isActive ? 'text-[#D4AF37]' : 'text-[#5d2c86] dark:text-[#7d44a8]'
            }`}
          >
            {service.stat}
          </span>
          <span className="text-[7px] sm:text-[8px] text-gray-400 dark:text-gray-500 font-sans-body tracking-wider uppercase">
            {service.statLabel}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════
   CENTER CORE — 360° FF&E SUPPORT
   ═══════════════════════════════════════════════════════ */

function CenterCore({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      className="absolute z-40"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
      initial={{ scale: 0, opacity: 0, rotateY: -180 }}
      animate={isInView ? { scale: 1, opacity: 1, rotateY: 0 } : {}}
      transition={{ duration: 1.2, delay: 0.3, type: 'spring', stiffness: 80, damping: 15 }}
    >
      <div className="relative">
        {/* Outer rotating ring — dashed gold */}
        <motion.div
          className="absolute -inset-4 sm:-inset-5 lg:-inset-6 rounded-full border-2 border-dashed border-[#D4AF37]/25 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ transform: 'perspective(600px) rotateX(60deg)' }}
        />

        {/* Mid rotating ring — solid purple */}
        <motion.div
          className="absolute -inset-2 sm:-inset-3 lg:-inset-4 rounded-full border border-[#5d2c86]/20 pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ transform: 'perspective(600px) rotateX(60deg)' }}
        />

        {/* Outer glow */}
        <motion.div
          className="absolute -inset-8 sm:-inset-10 lg:-inset-12 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(93,44,134,0.15) 0%, rgba(93,44,134,0.05) 40%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Main center sphere */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full flex flex-col items-center justify-center overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5d2c86] via-[#5d2c86] to-[#3d1c5a] pointer-events-none" />

          {/* Animated conic shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'conic-gradient(from 0deg, transparent, rgba(212,175,55,0.2), transparent, rgba(212,175,55,0.1), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner highlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            }}
          />

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#D4AF37]/20 pointer-events-none"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.span
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-white leading-none block"
              animate={{ textShadow: ['0 0 10px rgba(212,175,55,0.3)', '0 0 25px rgba(212,175,55,0.6)', '0 0 10px rgba(212,175,55,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              360°
            </motion.span>
            <div className="w-10 h-[1.5px] bg-[#D4AF37] mx-auto my-1.5 sm:my-2" />
            <span className="text-[9px] sm:text-[10px] lg:text-xs tracking-[0.2em] font-sans-body font-bold text-[#D4AF37] uppercase">
              FF&E
            </span>
            <span className="text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.15em] font-sans-body font-medium text-white/70 uppercase block mt-0.5">
              SUPPORT
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN 3D CONCENTRIC CIRCLES COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function ConcentricCircles3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mouse parallax for desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  const selectedService = activeIndex !== null ? services[activeIndex] : null;

  // Responsive orbit radii
  const outerRadius = isMobile ? 155 : 195;
  const innerRadius = isMobile ? 100 : 130;

  // Pre-compute node positions with rounded values to avoid hydration mismatch
  const outerRadiusPct = isMobile ? 38 : 39;
  const innerRadiusPct = isMobile ? 24 : 26;
  const nodePositions = useMemo(() => {
    return services.map((_, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180);
      return {
        inner: {
          x: Math.round((50 + innerRadiusPct * Math.cos(angle)) * 1000) / 1000,
          y: Math.round((50 + innerRadiusPct * Math.sin(angle)) * 1000) / 1000,
        },
        outer: {
          x: Math.round((50 + outerRadiusPct * Math.cos(angle)) * 1000) / 1000,
          y: Math.round((50 + outerRadiusPct * Math.sin(angle)) * 1000) / 1000,
        },
      };
    });
  }, [innerRadiusPct, outerRadiusPct]);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* ── 3D SCENE CONTAINER ── */}
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        <div
          ref={sceneRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            perspective: isMobile ? '1200px' : '900px',
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 3D tilted scene */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              rotateX: isMobile ? 35 : 30 + mousePos.y * -8,
              rotateY: isMobile ? 0 : mousePos.x * 8,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          >
            {/* Particle background */}
            <ParticleCanvas />

            {/* ── 3D ORBIT RINGS (SVG) ── */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'perspective(800px) rotateX(60deg)', transformStyle: 'preserve-3d' }} aria-hidden="true">
              {/* Outer ring — stats */}
              <OrbitRing radius={outerRadius} color="#D4AF37" dashArray="8 6" opacity={0.25} rotateSpeed={80} strokeWidth={1.5} />
              {/* Outer ring glow */}
              <OrbitRing radius={outerRadius} color="#D4AF37" opacity={0.06} rotateSpeed={80} strokeWidth={8} />
              {/* Inner ring — services */}
              <OrbitRing radius={innerRadius} color="#5d2c86" opacity={0.2} rotateSpeed={55} reverse strokeWidth={1.5} />
              {/* Inner ring glow */}
              <OrbitRing radius={innerRadius} color="#5d2c86" opacity={0.05} rotateSpeed={55} reverse strokeWidth={6} />
              {/* Extra decorative ring */}
              <OrbitRing radius={outerRadius + 20} color="#D4AF37" dashArray="2 12" opacity={0.1} rotateSpeed={120} reverse strokeWidth={0.8} />
            </div>

            {/* ═══ FLAT OVERLAY — Service & Stat nodes positioned normally ═══ */}
            <div className="absolute inset-0 pointer-events-auto" style={{ transformStyle: 'preserve-3d' }}>
              {/* ── OUTER STAT NODES ── */}
              {services.map((service, i) => {
                const pos = nodePositions[i];
                return (
                  <motion.div
                    key={`stat-${i}`}
                    className="absolute z-20"
                    style={{
                      left: `${pos.outer.x}%`,
                      top: `${pos.outer.y}%`,
                      transform: 'translate(-50%, -50%)',
                      transformStyle: 'preserve-3d',
                    }}
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.1, type: 'spring' }}
                  >
                    <StatNode
                      service={service}
                      isActive={activeIndex === i}
                      isHovered={hoveredIndex === i}
                      onHover={() => setHoveredIndex(i)}
                      onLeave={() => setHoveredIndex(null)}
                      onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    />
                  </motion.div>
                );
              })}

              {/* ── INNER SERVICE NODES ── */}
              {services.map((service, i) => {
                const pos = nodePositions[i];
                return (
                  <motion.div
                    key={`service-${i}`}
                    className="absolute z-30"
                    style={{
                      left: `${pos.inner.x}%`,
                      top: `${pos.inner.y}%`,
                      transform: 'translate(-50%, -50%)',
                      transformStyle: 'preserve-3d',
                    }}
                    initial={{ scale: 0, opacity: 0, y: 15 }}
                    animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.12, type: 'spring' }}
                  >
                    <ServiceNode
                      service={service}
                      isActive={activeIndex === i}
                      isHovered={hoveredIndex === i}
                      onHover={() => setHoveredIndex(i)}
                      onLeave={() => setHoveredIndex(null)}
                      onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    />
                  </motion.div>
                );
              })}

              {/* ── CONNECTOR LINES ── */}
              {services.map((_, i) => {
                const pos = nodePositions[i];
                const isActiveConn = activeIndex === i || hoveredIndex === i;
                return (
                  <svg
                    key={`conn-${i}`}
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <motion.line
                      x1={pos.inner.x}
                      y1={pos.inner.y}
                      x2={pos.outer.x}
                      y2={pos.outer.y}
                      stroke={isActiveConn ? '#D4AF37' : '#5d2c86'}
                      strokeWidth={isActiveConn ? 0.3 : 0.15}
                      strokeDasharray="1 2"
                      opacity={isActiveConn ? 0.6 : 0.15}
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
                    />
                  </svg>
                );
              })}

              {/* ── CENTER CORE ── */}
              <CenterCore isInView={isInView} />

              {/* ── RING LABELS (positioned on the flat overlay) ── */}
              <motion.div
                className="absolute z-10"
                style={{ left: '50%', top: isMobile ? '5%' : '4%', transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <span className="text-[8px] sm:text-[9px] tracking-[0.25em] font-sans-body font-bold text-[#D4AF37]/60 whitespace-nowrap">
                  STATISTICS & METRICS
                </span>
              </motion.div>

              <motion.div
                className="absolute z-10"
                style={{ left: '50%', bottom: isMobile ? '14%' : '12%', transform: 'translate(-50%, 50%)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 2.0 }}
              >
                <span className="text-[8px] sm:text-[9px] tracking-[0.25em] font-sans-body font-bold text-[#5d2c86]/50 whitespace-nowrap">
                  SERVICE CATEGORIES
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE CARD LAYOUT ── */}
      <div className="sm:hidden mt-8 space-y-3">
        {services.map((service, i) => {
          const Icon = service.icon;
          const isActive = activeIndex === i;
          return (
            <motion.button
              key={`mobile-${i}`}
              className={`w-full text-left rounded-xl p-4 border transition-all duration-300 ${
                isActive
                  ? 'bg-[#5d2c86]/5 border-[#5d2c86]/20 shadow-md'
                  : 'bg-white/80 border-gray-100'
              }`}
              onClick={() => setActiveIndex(isActive ? null : i)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-[#5d2c86]' : 'bg-[#5d2c86]/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#5d2c86]'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#1A1A1A] font-sans-body">{service.title}</h4>
                    <span className="text-xs font-bold font-serif-display text-[#D4AF37] whitespace-nowrap">
                      {service.stat} {service.statLabel}
                    </span>
                  </div>
                  {isActive && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="text-xs text-gray-500 leading-relaxed font-sans-body mt-2"
                    >
                      {service.description}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ── DESKTOP DETAIL PANEL ── */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 25, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 15, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-8 hidden sm:block"
          >
            <div className="relative bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#5d2c86]/10 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-[#5d2c86] via-[#D4AF37] to-[#5d2c86]" />

              <div className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5d2c86] to-[#7d44a8] flex items-center justify-center shrink-0 shadow-lg">
                  <selectedService.icon className="w-7 h-7 text-white" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-2">
                    {selectedService.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body mb-4">
                    {selectedService.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-2xl font-bold font-serif-display text-[#5d2c86] dark:text-[#7d44a8]">
                        {selectedService.stat}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-sans-body ml-2 uppercase tracking-wider">
                        {selectedService.statLabel}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveIndex(null)}
                      className="text-xs text-[#5d2c86] hover:text-[#D4AF37] font-sans-body font-medium transition-colors"
                    >
                      ← Back to overview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
