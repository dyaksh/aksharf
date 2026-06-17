'use client';

import { useRef, useState, useMemo } from 'react';
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
   SERVICE CARD — mobile/tablet
   ═══════════════════════════════════════════════════════ */

function ServiceCard({
  service,
  isActive,
  onClick,
  index,
}: {
  service: (typeof services)[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.article
      className={`relative rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden ${
        isActive
          ? 'bg-white border-[#5d2c86]/25 shadow-lg ring-1 ring-[#5d2c86]/15'
          : 'bg-white/70 border-[#000]/8 hover:border-[#5d2c86]/20 hover:shadow-md'
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <div className="p-4 flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
          isActive ? 'bg-[#5d2c86]' : 'bg-[#5d2c86]/8'
        }`}>
          <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#5d2c86]'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-[#000] font-sans-body">{service.title}</h3>
            <span className="text-xs font-bold font-serif-display text-[#5d2c86] whitespace-nowrap">{service.stat}</span>
          </div>
          <p className="text-[10px] text-[#000]/40 font-sans-body tracking-wide uppercase mt-0.5">
            {service.statLabel}
          </p>
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-[#000]/55 leading-relaxed font-sans-body mt-2">{service.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   SEMI-CIRCLE INFOGRAPHIC (DESKTOP)
   ═══════════════════════════════════════════════════════ */

function SemiCircleDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const selectedService = activeIndex !== null ? services[activeIndex] : null;

  // Position service nodes along a semi-circle arc
  const nodePositions = useMemo(() => {
    return services.map((_, i) => {
      const angleDeg = 180 - (i * 180 / (services.length - 1));
      const angleRad = angleDeg * (Math.PI / 180);
      const innerR = 28; // % from center for service icons
      const outerR = 42; // % from center for stat pills
      return {
        service: {
          x: 50 + innerR * Math.cos(angleRad),
          y: 50 - innerR * Math.sin(angleRad),
        },
        stat: {
          x: 50 + outerR * Math.cos(angleRad),
          y: 50 - outerR * Math.sin(angleRad),
        },
        angleDeg,
      };
    });
  }, []);

  return (
    <div ref={containerRef} className="py-4">
      {/* Semi-circle container with proper aspect ratio */}
      <div className="relative w-full max-w-3xl mx-auto" style={{ paddingBottom: '50%' }}>
        {/* SVG layer */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Semi-circle infographic showing FF&E services"
        >
          <defs>
            <linearGradient id="outerArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5d2c86" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#5d2c86" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5d2c86" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="innerArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5d2c86" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#5d2c86" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5d2c86" stopOpacity="0.08" />
            </linearGradient>
            <radialGradient id="coreGrad" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#5d2c86" />
              <stop offset="100%" stopColor="#3d1c5a" />
            </radialGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <filter id="purpleGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
            </filter>
          </defs>

          {/* Base line */}
          <motion.line
            x1="80" y1="500" x2="920" y2="500"
            stroke="#5d2c86" strokeWidth="1" opacity="0.12"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ transformOrigin: '500px 500px' }}
          />

          {/* Outer arc (Statistics ring) */}
          <motion.path
            d="M 100,500 A 400,400 0 0,1 900,500"
            fill="none"
            stroke="url(#outerArcGrad)"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          />
          <motion.path
            d="M 100,500 A 400,400 0 0,1 900,500"
            fill="none" stroke="#5d2c86" strokeWidth="6" opacity="0.06"
            filter="url(#softGlow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Inner arc (Services ring) */}
          <motion.path
            d="M 220,500 A 280,280 0 0,1 780,500"
            fill="none"
            stroke="url(#innerArcGrad)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          />
          <motion.path
            d="M 220,500 A 280,280 0 0,1 780,500"
            fill="none" stroke="#5d2c86" strokeWidth="5" opacity="0.05"
            filter="url(#softGlow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
          />

          {/* Connector lines */}
          {nodePositions.map((pos, i) => {
            const sx = pos.service.x * 10;
            const sy = pos.service.y * 5;
            const ox = pos.stat.x * 10;
            const oy = pos.stat.y * 5;
            const isActive = activeIndex === i;
            return (
              <motion.line
                key={`conn-${i}`}
                x1={sx} y1={sy} x2={ox} y2={oy}
                stroke="#5d2c86"
                strokeWidth={isActive ? 1.5 : 0.6}
                strokeDasharray={isActive ? '4 3' : '2 4'}
                opacity={isActive ? 0.5 : 0.12}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.08 }}
              />
            );
          })}

          {/* Stat pills on outer arc */}
          {services.map((service, i) => {
            const pos = nodePositions[i];
            const cx = pos.stat.x * 10;
            const cy = pos.stat.y * 5;
            const isActive = activeIndex === i;
            return (
              <g key={`stat-${i}`}>
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
                >
                  {isActive && (
                    <rect x={cx - 46} y={cy - 17} width="92" height="34" rx="17"
                      fill="rgba(93,44,134,0.15)" filter="url(#softGlow)" />
                  )}
                  <rect x={cx - 44} y={cy - 15} width="88" height="30" rx="15"
                    fill={isActive ? 'rgba(93,44,134,0.08)' : 'rgba(255,255,255,0.9)'}
                    stroke={isActive ? 'rgba(93,44,134,0.4)' : 'rgba(93,44,134,0.15)'}
                    strokeWidth="1" />
                  <text x={cx - 6} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                    fill="#5d2c86" fontSize="14"
                    fontFamily="var(--font-serif-display, Georgia)" fontWeight="700">
                    {service.stat}
                  </text>
                  <text x={cx + 20} y={cy + 1} textAnchor="start" dominantBaseline="middle"
                    fill="#000" opacity="0.35" fontSize="6.5"
                    fontFamily="var(--font-sans-body, system-ui)" fontWeight="500" letterSpacing="0.06em">
                    {service.statLabel}
                  </text>
                </motion.g>
              </g>
            );
          })}

          {/* Center core */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 80 }}
          >
            <circle cx="500" cy="500" r="80" fill="#5d2c86" opacity="0.08" filter="url(#purpleGlow)" />
            <circle cx="500" cy="500" r="55" fill="url(#coreGrad)" stroke="#5d2c86" strokeWidth="1.5" opacity="0.95" />
            <circle cx="490" cy="488" r="25" fill="rgba(255,255,255,0.06)" />
            <text x="500" y="486" textAnchor="middle" dominantBaseline="middle"
              fill="#FFF" fontSize="24" fontFamily="var(--font-serif-display, Georgia)" fontWeight="700">
              360°
            </text>
            <line x1="478" y1="498" x2="522" y2="498" stroke="#FFF" strokeWidth="1" opacity="0.3" />
            <text x="500" y="516" textAnchor="middle" dominantBaseline="middle"
              fill="#FFF" fontSize="11" fontFamily="var(--font-sans-body, system-ui)" fontWeight="700" letterSpacing="0.2em">
              FF&amp;E
            </text>
            <text x="500" y="532" textAnchor="middle" dominantBaseline="middle"
              fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="var(--font-sans-body, system-ui)" fontWeight="500" letterSpacing="0.15em">
              SUPPORT
            </text>
          </motion.g>

          {/* Ring labels */}
          <motion.text x="500" y="68" textAnchor="middle" fill="#5d2c86" fontSize="10"
            fontFamily="var(--font-sans-body, system-ui)" fontWeight="700" letterSpacing="0.25em" opacity="0"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.45 } : {}}>
            STATISTICS
          </motion.text>
          <motion.text x="500" y="210" textAnchor="middle" fill="#5d2c86" fontSize="9"
            fontFamily="var(--font-sans-body, system-ui)" fontWeight="700" letterSpacing="0.2em" opacity="0"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.3 } : {}}>
            SERVICES
          </motion.text>
        </svg>

        {/* Interactive service icon buttons */}
        <div className="absolute inset-0">
          {services.map((service, i) => {
            const pos = nodePositions[i];
            const Icon = service.icon;
            const isActive = activeIndex === i;
            const leftPct = pos.service.x;
            const topPct = pos.service.y;
            return (
              <motion.button
                key={`svc-btn-${i}`}
                className="absolute z-20 flex flex-col items-center cursor-pointer group"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1, type: 'spring' }}
                onClick={() => setActiveIndex(isActive ? null : i)}
                aria-label={`${service.title} service category`}
              >
                {isActive && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{ width: '56px', height: '56px', boxShadow: '0 0 20px rgba(93,44,134,0.35)' }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center
                  border-2 shadow-md transition-all duration-300 backdrop-blur-sm
                  ${isActive
                    ? 'bg-[#5d2c86] border-[#5d2c86] shadow-lg'
                    : 'bg-white/90 border-[#5d2c86]/20 hover:border-[#5d2c86]/50 hover:shadow-lg'
                  }`}>
                  <Icon className={`w-5 h-5 lg:w-6 lg:h-6 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[#5d2c86]'
                  }`} />
                </div>
                <span className={`mt-1.5 text-[9px] lg:text-[10px] font-sans-body font-bold tracking-wide text-center
                  transition-all duration-300 max-w-[70px] leading-tight
                  ${isActive ? 'text-[#5d2c86]' : 'text-[#000]/45'}
                `}>
                  {service.shortTitle}
                </span>
              </motion.button>
            );
          })}

          {/* Stat pill click targets */}
          {services.map((service, i) => {
            const pos = nodePositions[i];
            const isActive = activeIndex === i;
            return (
              <button
                key={`stat-btn-${i}`}
                className="absolute z-10 cursor-pointer"
                style={{
                  left: `${pos.stat.x}%`,
                  top: `${pos.stat.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '88px', height: '30px',
                  background: 'transparent', border: 'none',
                }}
                onClick={() => setActiveIndex(isActive ? null : i)}
                aria-label={`${service.title}: ${service.stat} ${service.statLabel}`}
              />
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <article className="relative bg-white rounded-xl shadow-lg border border-[#5d2c86]/10 overflow-hidden">
              <div className="h-1 bg-[#5d2c86]" />
              <div className="p-5 sm:p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#5d2c86] flex items-center justify-center shrink-0 shadow-md">
                  <selectedService.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#000] font-sans-body mb-1">{selectedService.title}</h3>
                  <p className="text-sm text-[#000]/55 leading-relaxed font-sans-body mb-3">{selectedService.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold font-serif-display text-[#5d2c86]">{selectedService.stat}</span>
                    <span className="text-xs text-[#000]/35 font-sans-body uppercase tracking-wider">{selectedService.statLabel}</span>
                    <button
                      onClick={() => setActiveIndex(null)}
                      className="ml-auto text-xs text-[#5d2c86] hover:text-[#000] font-sans-body font-medium transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE CARD LAYOUT
   ═══════════════════════════════════════════════════════ */

function SemiCircleMobile() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {services.map((service, i) => (
        <ServiceCard
          key={service.shortTitle}
          service={service}
          isActive={activeIndex === i}
          onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          index={i}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════ */

export default function SemiCircleInfographic() {
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

      <div className="hidden md:block">
        <SemiCircleDesktop />
      </div>
      <div className="md:hidden">
        <SemiCircleMobile />
      </div>
    </div>
  );
}
