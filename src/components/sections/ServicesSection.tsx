'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sofa, Lamp, Bath, Package, ShieldCheck, Frame, ArrowRight, PenTool, Factory, CheckCircle, Truck } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const services = [
  {
    icon: Sofa,
    title: 'Casegoods &\nUpholstery',
    shortTitle: 'Casegoods',
    description: 'Full range of hotel casegoods, headboards, desks, and upholstered seating crafted to brand specifications.',
    stat: '500+',
    statLabel: 'projects',
    color: '#5d2c86',
  },
  {
    icon: Lamp,
    title: 'Lighting &\nMirrors',
    shortTitle: 'Lighting',
    description: 'Custom lighting solutions and mirrors designed to complement each property\'s unique aesthetic.',
    stat: '120+',
    statLabel: 'fixtures',
    color: '#7d44a8',
  },
  {
    icon: Bath,
    title: 'Bathroom\nAccessories',
    shortTitle: 'Bathroom',
    description: 'Complete bathroom FF&E packages including vanities, accessories, and hardware.',
    stat: '8K+',
    statLabel: 'rooms fitted',
    color: '#9b6bc4',
  },
  {
    icon: Package,
    title: 'Sourcing &\nLogistics',
    shortTitle: 'Logistics',
    description: 'End-to-end supply chain management from raw materials to on-site delivery and installation.',
    stat: '21',
    statLabel: 'day avg',
    color: '#D4AF37',
  },
  {
    icon: ShieldCheck,
    title: 'Quality\nControl',
    shortTitle: 'QC',
    description: 'Rigorous inspection at every stage — from raw material through production to final packaging.',
    stat: '99.2%',
    statLabel: 'pass rate',
    color: '#b8960e',
  },
  {
    icon: Frame,
    title: 'Art &\nDecor',
    shortTitle: 'Decor',
    description: 'Curated art programs and decorative accessories that bring each hotel\'s brand story to life.',
    stat: '340+',
    statLabel: 'programs',
    color: '#8b7410',
  },
];

const processSteps = [
  { icon: PenTool, title: 'Design', description: 'Translate brand standards into precise FF&E specifications and technical drawings.' },
  { icon: Factory, title: 'Manufacture', description: 'Mill, upholster, finish and assemble every piece in our Foshan workshops.' },
  { icon: CheckCircle, title: 'QC', description: 'Multi-stage inspection from raw materials through production to final packaging.' },
  { icon: Truck, title: 'Deliver', description: 'Consolidate, document and install on-site — FOB or DDP, one accountable team.' },
];

/* ═══════════════════════════════════════════════════════
   CONCENTRIC CIRCLES COMPONENT
   ═══════════════════════════════════════════════════════ */

function ConcentricCircles() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  // Selected service for detail panel
  const selectedService = activeIndex !== null ? services[activeIndex] : null;

  // Position 6 services evenly around the inner ring (starting from top, going clockwise)
  const servicePositions = services.map((_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180); // Start from top (-90°)
    return {
      x: 50 + 30 * Math.cos(angle), // 30% radius from center
      y: 50 + 30 * Math.sin(angle),
    };
  });

  // Position 6 stats evenly around the outer ring (offset by 30° from services)
  const statPositions = services.map((_, i) => {
    const angle = (i * 60 - 90 + 30) * (Math.PI / 180); // Offset 30° from services
    return {
      x: 50 + 45 * Math.cos(angle), // 45% radius from center
      y: 50 + 45 * Math.sin(angle),
    };
  });

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      {/* ── CONCENTRIC CIRCLES DIAGRAM ── */}
      <div className="relative aspect-square w-full">
        {/* Decorative background glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(93,44,134,0.06) 0%, rgba(93,44,134,0.02) 40%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        {/* ═══ OUTER RING ═══ */}
        <motion.div
          className="absolute rounded-full border-2 border-dashed border-[#D4AF37]/25 dark:border-[#D4AF37]/20"
          style={{
            top: '5%',
            left: '5%',
            right: '5%',
            bottom: '5%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
        >
          {/* Outer ring label — top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f8f3ed] dark:bg-[#121212] px-3">
            <span className="text-[9px] tracking-[0.25em] font-sans-body font-bold text-[#D4AF37] whitespace-nowrap">
              STATISTICS & METRICS
            </span>
          </div>
        </motion.div>

        {/* Outer ring glow pulse */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '5%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            boxShadow: '0 0 30px rgba(212,175,55,0.08), inset 0 0 30px rgba(212,175,55,0.04)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: [0, 1, 0.6, 1] } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* ═══ INNER SERVICE RING ═══ */}
        <motion.div
          className="absolute rounded-full border-2 border-[#5d2c86]/20 dark:border-[#7d44a8]/25"
          style={{
            top: '18%',
            left: '18%',
            right: '18%',
            bottom: '18%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          {/* Inner ring label — bottom */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#f8f3ed] dark:bg-[#121212] px-3">
            <span className="text-[9px] tracking-[0.25em] font-sans-body font-bold text-[#5d2c86] dark:text-[#7d44a8] whitespace-nowrap">
              SERVICE CATEGORIES
            </span>
          </div>
        </motion.div>

        {/* Connector lines from inner services to outer stats */}
        {services.map((_, i) => {
          const innerPos = servicePositions[i];
          const outerPos = statPositions[i];
          return (
            <motion.div
              key={`connector-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: `${innerPos.x}%`,
                top: `${innerPos.y}%`,
                width: '1px',
                height: '0px',
                transformOrigin: '0 0',
                transform: `rotate(${Math.atan2(outerPos.y - innerPos.y, outerPos.x - innerPos.x) * (180 / Math.PI)}deg)`,
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={isInView ? { height: '12%', opacity: 0.2 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[#5d2c86]/30 to-[#D4AF37]/30" />
            </motion.div>
          );
        })}

        {/* ═══ STAT NODES (OUTER RING) ═══ */}
        {services.map((service, i) => {
          const pos = statPositions[i];
          const isHovered = hoveredIndex === i;
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={`stat-${i}`}
              className="absolute z-20 cursor-pointer"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(isActive ? null : i)}
            >
              <motion.div
                className="relative flex flex-col items-center"
                animate={{
                  scale: isHovered || isActive ? 1.15 : 1,
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Stat pill */}
                <div className={`
                  px-3 py-1.5 rounded-full border backdrop-blur-sm shadow-md transition-all duration-300
                  ${isActive
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : isHovered
                      ? 'bg-white/90 dark:bg-[#1E1E1E]/90 border-[#D4AF37]/30 shadow-[0_0_10px_rgba(212,175,55,0.1)]'
                      : 'bg-white/80 dark:bg-[#1E1E1E]/80 border-[#D4AF37]/15'
                  }
                `}>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-sm font-bold font-serif-display ${isActive ? 'text-[#D4AF37]' : 'text-[#5d2c86] dark:text-[#7d44a8]'}`}>
                      {service.stat}
                    </span>
                    <span className="text-[8px] text-gray-400 dark:text-gray-500 font-sans-body tracking-wider uppercase">
                      {service.statLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* ═══ SERVICE NODES (INNER RING) ═══ */}
        {services.map((service, i) => {
          const pos = servicePositions[i];
          const Icon = service.icon;
          const isHovered = hoveredIndex === i;
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={`service-${i}`}
              className="absolute z-30 cursor-pointer"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.12, type: 'spring' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(isActive ? null : i)}
            >
              <motion.div
                className="relative flex flex-col items-center"
                animate={{
                  scale: isHovered || isActive ? 1.12 : 1,
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Glow ring behind icon when active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: `0 0 20px ${service.color}33, 0 0 40px ${service.color}15`,
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Icon circle */}
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300
                  ${isActive
                    ? `bg-gradient-to-br from-[#5d2c86] to-[#7d44a8] border-[#D4AF37] shadow-xl`
                    : isHovered
                      ? 'bg-white dark:bg-[#1E1E1E] border-[#5d2c86]/40 dark:border-[#7d44a8]/40 shadow-lg'
                      : 'bg-white dark:bg-[#1E1E1E] border-gray-200 dark:border-gray-700 shadow-md'
                  }
                `}>
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[#5d2c86] dark:text-[#7d44a8]'
                  }`} />
                </div>

                {/* Service label below icon */}
                <div className={`
                  mt-2 text-center transition-all duration-300
                  ${isActive ? 'opacity-100' : isHovered ? 'opacity-100' : 'opacity-80'}
                `}>
                  <span className={`text-[10px] font-sans-body font-bold tracking-wide leading-tight block ${
                    isActive ? 'text-[#5d2c86] dark:text-[#7d44a8]' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {service.shortTitle}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* ═══ CENTER CORE ═══ */}
        <motion.div
          className="absolute z-40"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
        >
          <div className="relative">
            {/* Rotating outer gold ring */}
            <motion.div
              className="absolute -inset-3 rounded-full border border-dashed border-[#D4AF37]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            {/* Counter-rotating inner ring */}
            <motion.div
              className="absolute -inset-1.5 rounded-full border border-[#5d2c86]/15 dark:border-[#7d44a8]/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Main center circle */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-[#5d2c86] via-[#5d2c86] to-[#3d1c5a] flex flex-col items-center justify-center shadow-2xl border-2 border-[#D4AF37]/30 overflow-hidden">
              {/* Animated conic gradient shimmer */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(212,175,55,0.15), transparent, rgba(212,175,55,0.1), transparent)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-display text-white leading-none">
                  360°
                </span>
                <div className="w-8 h-[1px] bg-[#D4AF37] mx-auto my-1" />
                <span className="text-[8px] sm:text-[9px] tracking-[0.2em] font-sans-body font-bold text-[#D4AF37] uppercase">
                  FF&E
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.15em] font-sans-body font-medium text-white/70 uppercase block mt-0.5">
                  SUPPORT
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ HOVER/ACTIVE DETAIL TOOLTIP ═══ */}
        <AnimatePresence>
          {(hoveredIndex !== null || activeIndex !== null) && (() => {
            const idx = activeIndex ?? hoveredIndex;
            if (idx === null) return null;
            const svc = services[idx];
            const pos = servicePositions[idx];
            // Position tooltip toward the center if node is on outside, or away
            const isTop = pos.y < 50;
            const isLeft = pos.x < 50;
            return (
              <motion.div
                key={`tooltip-${idx}`}
                className="absolute z-50 pointer-events-none"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(${isLeft ? '10%' : '-110%'}, ${isTop ? '10%' : '-110%'})`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-md rounded-xl shadow-xl border border-[#5d2c86]/10 dark:border-[#7d44a8]/10 p-4 w-56">
                  <div className="flex items-center gap-2 mb-2">
                    <svc.icon className="w-4 h-4 text-[#5d2c86] dark:text-[#7d44a8]" />
                    <h4 className="text-sm font-bold text-[#1A1A1A] dark:text-white font-sans-body">
                      {svc.title.replace('\n', ' ')}
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body mb-2">
                    {svc.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold font-serif-display text-[#5d2c86] dark:text-[#7d44a8]">{svc.stat}</span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-sans-body uppercase tracking-wider">{svc.statLabel}</span>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* ── MOBILE FALLBACK: Card Grid ── */}
      <div className="sm:hidden mt-6 space-y-3">
        {services.map((service, i) => {
          const Icon = service.icon;
          const isActive = activeIndex === i;
          return (
            <motion.button
              key={`mobile-${i}`}
              className={`w-full text-left rounded-xl p-4 border transition-all duration-300 ${
                isActive
                  ? 'bg-[#5d2c86]/5 dark:bg-[#7d44a8]/10 border-[#5d2c86]/20 dark:border-[#7d44a8]/20'
                  : 'bg-white/80 dark:bg-[#1E1E1E]/80 border-gray-100 dark:border-gray-800'
              }`}
              onClick={() => setActiveIndex(isActive ? null : i)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-[#5d2c86]' : 'bg-[#5d2c86]/10 dark:bg-[#7d44a8]/10'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#5d2c86] dark:text-[#7d44a8]'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#1A1A1A] dark:text-white font-sans-body">
                      {service.title.replace('\n', ' ')}
                    </h4>
                    <span className="text-xs font-bold font-serif-display text-[#D4AF37] whitespace-nowrap">
                      {service.stat} {service.statLabel}
                    </span>
                  </div>
                  {isActive && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body mt-2"
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

      {/* ── SELECTED SERVICE DETAIL PANEL (DESKTOP) ── */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-8 hidden sm:block"
          >
            <div className="relative bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg border border-[#5d2c86]/10 dark:border-[#7d44a8]/15 overflow-hidden">
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
                    {selectedService.title.replace('\n', ' ')}
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
                      className="text-xs text-[#5d2c86] dark:text-[#7d44a8] hover:text-[#D4AF37] font-sans-body font-medium transition-colors"
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

/* ═══════════════════════════════════════════════════════
   GOLD ACCENT SEPARATOR
   ═══════════════════════════════════════════════════════ */

function GoldSeparator() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <div ref={ref} className="flex items-center justify-center py-6 lg:py-10" aria-hidden="true">
      <motion.div
        className="h-[1px] w-full max-w-xs"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, #5d2c86, #D4AF37, transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════ */

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const processRef = useRef<HTMLDivElement>(null);
  const isProcessInView = useInView(processRef, { once: true, margin: '-80px' });

  // Word-by-word reveal heading
  const headingWords = ['360°', 'FF&E', 'support,', 'under', 'one', 'roof.'];

  return (
    <section id="services" className="bg-[#f8f3ed] dark:bg-[#121212] relative overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* ─────────────── 1. CINEMATIC HERO BANNER ─────────────── */}
      <div className="relative pt-16 lg:pt-24 pb-4 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(248,243,237,0.95) 0%, rgba(248,243,237,0) 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{ background: 'linear-gradient(180deg, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0) 100%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <motion.p
            className="text-xs tracking-[0.3em] text-[#D4AF37] mb-5 font-sans-body font-semibold"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          >
            WHAT WE COVER
          </motion.p>

          {/* Word-by-word reveal heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-5">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
              >
                {word === '360°' || word === 'FF&E' || word === 'support,' ? (
                  <span className="text-[#5d2c86] dark:text-[#7d44a8]">{word}</span>
                ) : word}
              </motion.span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto font-sans-body mb-5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            From concept sketches to on-site install, every FF&E need is handled by our
            integrated team — no gaps, no finger-pointing, just one accountable partner.
          </motion.p>

          {/* Animated gold line */}
          <div className="flex items-center justify-center">
            <motion.div
              className="h-[2px] rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, #5d2c86, #D4AF37, transparent)' }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 120, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.1, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      {/* ─── Gold Accent Separator ─── */}
      <GoldSeparator />

      {/* ─────────────── 2. CONCENTRIC CIRCLES ─────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ring labels legend */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-dashed border-[#D4AF37]/50" />
            <span className="text-[10px] tracking-[0.15em] font-sans-body font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Outer Ring — Statistics
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-[#5d2c86]/30" />
            <span className="text-[10px] tracking-[0.15em] font-sans-body font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Inner Ring — Services
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#5d2c86] to-[#3d1c5a] border border-[#D4AF37]/30" />
            <span className="text-[10px] tracking-[0.15em] font-sans-body font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Core — 360° Support
            </span>
          </div>
        </motion.div>

        <ConcentricCircles />
      </div>

      {/* ─── Gold Accent Separator ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GoldSeparator />
      </div>

      {/* ─────────────── 3. PROCESS STEPS ─────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div ref={processRef}>
          <div className="text-center mb-10">
            <motion.p
              className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 font-sans-body font-semibold"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              OUR PROCESS
            </motion.p>
            <motion.h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-display text-[#1A1A1A] dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Four steps.{' '}
              <span className="text-[#5d2c86] dark:text-[#7d44a8]">Zero guesswork.</span>
            </motion.h3>
          </div>

          {/* Desktop: Horizontal steps */}
          <div className="hidden md:grid grid-cols-4 gap-0 relative">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealOnScroll key={step.title} direction="up" delay={index * 0.15} duration={0.6}>
                  <div className="relative flex flex-col items-center text-center px-4 lg:px-6">
                    {index < processSteps.length - 1 && (
                      <div className="absolute top-8 lg:top-9 left-[calc(50%+28px)] right-0 z-0 flex items-center">
                        <div className="w-full relative h-[2px]">
                          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ background: 'linear-gradient(90deg, #5d2c86, #D4AF37)' }}
                            initial={{ scaleX: 0 }}
                            animate={isProcessInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.0, delay: 0.8 + index * 0.25, ease: 'easeOut' }}
                          />
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.6)]"
                            initial={{ left: '0%', opacity: 0 }}
                            animate={isProcessInView ? { left: '90%', opacity: [0, 1, 1, 0] } : {}}
                            transition={{ duration: 1.2, delay: 1.0 + index * 0.25, ease: 'easeInOut' }}
                          />
                        </div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={isProcessInView ? { opacity: 0.6 } : {}}
                          transition={{ delay: 1.8 + index * 0.25 }}
                        >
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#D4AF37] -ml-0.5" />
                        </motion.div>
                      </div>
                    )}
                    <div className="relative mb-4">
                      <motion.div
                        className="w-14 h-14 lg:w-[72px] lg:h-[72px] rounded-2xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-sm relative z-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                      >
                        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-[#5d2c86] dark:text-[#7d44a8]" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{ boxShadow: '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1)' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isProcessInView ? { opacity: [0, 0.6, 0], scale: [0.9, 1.15, 0.9] } : {}}
                        transition={{ duration: 2.5, delay: 0.5 + index * 0.2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                      />
                    </div>
                    <motion.span className="text-[10px] font-sans-body font-bold tracking-[0.2em] text-[#D4AF37] mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 + index * 0.15 }}>
                      STEP 0{index + 1}
                    </motion.span>
                    <h4 className="text-sm lg:text-base font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-2">{step.title}</h4>
                    <p className="text-[11px] lg:text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">{step.description}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Mobile: Vertical steps */}
          <div className="md:hidden flex flex-col">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealOnScroll key={step.title} direction="up" delay={index * 0.12} duration={0.5}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-sm relative z-10">
                          <Icon className="w-5 h-5 text-[#5d2c86] dark:text-[#7d44a8]" />
                        </div>
                        <motion.div className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 0 16px rgba(212,175,55,0.25)' }} initial={{ opacity: 0, scale: 0.9 }} animate={isProcessInView ? { opacity: [0, 0.5, 0], scale: [0.9, 1.1, 0.9] } : {}} transition={{ duration: 2.5, delay: 0.3 + index * 0.2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }} />
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="relative w-[2px] h-10 my-1">
                          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
                          <motion.div className="absolute inset-x-0 top-0 bottom-0 rounded-full" style={{ background: 'linear-gradient(180deg, #5d2c86, #D4AF37)' }} initial={{ scaleY: 0 }} animate={isProcessInView ? { scaleY: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }} />
                        </div>
                      )}
                    </div>
                    <div className="pb-6">
                      <span className="text-[9px] font-sans-body font-bold tracking-[0.2em] text-[#D4AF37]">STEP 0{index + 1}</span>
                      <h4 className="text-sm font-bold text-[#1A1A1A] dark:text-white font-sans-body mt-0.5 mb-1">{step.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">{step.description}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Bottom Gold Accent Separator ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GoldSeparator />
      </div>

      {/* Ambient decorative elements */}
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(93,44,134,0.03) 0%, transparent 70%)' }} aria-hidden="true" />
    </section>
  );
}
