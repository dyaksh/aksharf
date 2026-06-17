'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sofa, Lamp, Bath, Package, ShieldCheck, Frame } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   DATA
   Allowed colors: #5d2c86, #f8f3ed, #FFF, #000
   ═══════════════════════════════════════════════════════ */

const services = [
  {
    icon: Sofa,
    title: 'Casegoods & Upholstery',
    shortTitle: 'Casegoods',
    description: 'Full range of hotel casegoods, headboards, desks, and upholstered seating crafted to brand specifications.',
    stat: '500+',
    statLabel: 'projects delivered',
  },
  {
    icon: Lamp,
    title: 'Lighting & Mirrors',
    shortTitle: 'Lighting',
    description: 'Custom lighting solutions and mirrors designed to complement each property\'s unique aesthetic.',
    stat: '120+',
    statLabel: 'lighting fixtures',
  },
  {
    icon: Bath,
    title: 'Bathroom Accessories',
    shortTitle: 'Bathroom',
    description: 'Complete bathroom FF&E packages including vanities, accessories, and hardware.',
    stat: '8K+',
    statLabel: 'rooms fitted',
  },
  {
    icon: Package,
    title: 'Sourcing & Logistics',
    shortTitle: 'Logistics',
    description: 'End-to-end supply chain management from raw materials to on-site delivery and installation.',
    stat: '21',
    statLabel: 'day avg delivery',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Control',
    shortTitle: 'QC',
    description: 'Rigorous inspection at every stage — from raw material through production to final packaging.',
    stat: '99.2%',
    statLabel: 'pass rate',
  },
  {
    icon: Frame,
    title: 'Art & Decor',
    shortTitle: 'Decor',
    description: 'Curated art programs and decorative accessories that bring each hotel\'s brand story to life.',
    stat: '340+',
    statLabel: 'art programs',
  },
];

/* ═══════════════════════════════════════════════════════
   ANIMATED GLOWING BORDER CARD (Desktop)
   ═══════════════════════════════════════════════════════ */

function GlowCard({
  service,
  index,
  isActive,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer rounded-2xl overflow-hidden ${
        isActive ? 'z-10' : 'z-0'
      }`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Animated glow border effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0">
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isActive
              ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(93,44,134,0.25), transparent 60%)`
              : `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(93,44,134,0.12), transparent 60%)`,
          }}
        />
      </div>

      {/* Border glow */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
          isActive
            ? 'shadow-[0_0_0_2px_#5d2c86,0_8px_30px_rgba(93,44,134,0.15)]'
            : isHovered
              ? 'shadow-[0_0_0_1px_rgba(93,44,134,0.3),0_4px_16px_rgba(93,44,134,0.08)]'
              : 'shadow-[0_0_0_1px_rgba(0,0,0,0.06)]'
        }`}
      />

      {/* Card content */}
      <div className={`relative z-10 p-5 sm:p-6 transition-all duration-500 ${
        isActive ? 'bg-white' : 'bg-white/80 group-hover:bg-white'
      }`}>
        {/* Top row: icon + stat */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isActive
                ? 'bg-[#5d2c86] shadow-lg shadow-[#5d2c86]/20'
                : 'bg-[#5d2c86]/8 group-hover:bg-[#5d2c86]/12 group-hover:shadow-md'
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Icon className={`w-5 h-5 transition-colors duration-500 ${
              isActive ? 'text-white' : 'text-[#5d2c86]'
            }`} />
          </motion.div>

          <div className="text-right">
            <p className={`text-2xl font-bold font-serif-display transition-colors duration-300 ${
              isActive ? 'text-[#5d2c86]' : 'text-[#5d2c86]/70 group-hover:text-[#5d2c86]'
            }`}>
              {service.stat}
            </p>
            <p className="text-[10px] text-[#000]/35 font-sans-body uppercase tracking-wider mt-0.5">
              {service.statLabel}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-sm font-bold font-sans-body transition-colors duration-300 mb-1 ${
          isActive ? 'text-[#000]' : 'text-[#000]/80 group-hover:text-[#000]'
        }`}>
          {service.title}
        </h3>

        {/* Animated progress bar */}
        <div className="h-[2px] rounded-full bg-[#5d2c86]/8 overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full bg-[#5d2c86]"
            initial={{ width: 0 }}
            whileInView={{ width: isActive ? '100%' : '40%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
          />
        </div>

        {/* Description - expands on active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <p className="text-[13px] text-[#000]/55 leading-relaxed font-sans-body pt-1">
                {service.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover indicator */}
        {!isActive && (
          <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1 h-1 rounded-full bg-[#5d2c86]" />
            <span className="text-[10px] text-[#5d2c86] font-sans-body font-medium tracking-wide">
              Click to explore
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   360° CENTER ORB (background decorative element)
   ═══════════════════════════════════════════════════════ */

function CenterOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative flex items-center justify-center py-8 mb-6">
      {/* Rotating ring */}
      <motion.div
        className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-[#5d2c86]/10"
        initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
        animate={isInView ? { rotate: 360, scale: 1, opacity: 1 } : {}}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, scale: { duration: 1 }, opacity: { duration: 1 } }}
      >
        {/* Dots on the ring */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-[#5d2c86]/25"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateY(-50%) translateX(-50%)`,
              transformOrigin: '0 0',
            }}
          />
        ))}
      </motion.div>

      {/* Inner pulsing circle */}
      <motion.div
        className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#5d2c86]/5"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: [0.9, 1.05, 0.9], opacity: [0.5, 0.8, 0.5] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center text */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
      >
        <p className="text-3xl sm:text-4xl font-bold font-serif-display text-[#5d2c86]">360°</p>
        <p className="text-[9px] tracking-[0.25em] font-sans-body font-bold text-[#5d2c86]/60 mt-0.5">
          FF&E SUPPORT
        </p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE CARD (simpler)
   ═══════════════════════════════════════════════════════ */

function MobileCard({
  service,
  index,
  isActive,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive
          ? 'shadow-lg shadow-[#5d2c86]/10'
          : 'shadow-sm hover:shadow-md'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onToggle}
    >
      {/* Active border */}
      <div className={`absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 ${
        isActive
          ? 'shadow-[inset_0_0_0_2px_#5d2c86]'
          : 'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]'
      }`} />

      <div className={`p-4 ${isActive ? 'bg-white' : 'bg-white/80'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
            isActive ? 'bg-[#5d2c86]' : 'bg-[#5d2c86]/8'
          }`}>
            <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#5d2c86]'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#000] font-sans-body">{service.title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-bold font-serif-display text-[#5d2c86]">{service.stat}</span>
              <span className="text-[10px] text-[#000]/35 font-sans-body uppercase tracking-wider">{service.statLabel}</span>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-[#000]/55 leading-relaxed font-sans-body mt-3 pl-[52px]">
                {service.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════ */

export default function SemiCircleInfographic() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative" aria-label="Akshar Foshan FF&E service categories and statistics">
      {/* SEO structured data */}
      <div className="sr-only">
        <h3>What does Akshar Foshan cover in FF&amp;E?</h3>
        <p>
          Akshar Foshan provides comprehensive 360° FF&amp;E support for hotels, covering six key areas:
          Casegoods &amp; Upholstery (500+ projects), Lighting &amp; Mirrors (120+ fixtures),
          Bathroom Accessories (8K+ rooms fitted), Sourcing &amp; Logistics (21-day avg delivery),
          Quality Control (99.2% pass rate), and Art &amp; Decor (340+ programs).
        </p>
      </div>

      {/* Desktop: 3x2 Grid with center orb */}
      <div className="hidden md:block">
        <CenterOrb />
        <div className="grid grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, i) => (
            <GlowCard
              key={service.shortTitle}
              service={service}
              index={i}
              isActive={activeIndex === i}
              onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Stacked cards */}
      <div className="md:hidden space-y-3">
        <CenterOrb />
        {services.map((service, i) => (
          <MobileCard
            key={service.shortTitle}
            service={service}
            index={i}
            isActive={activeIndex === i}
            onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
