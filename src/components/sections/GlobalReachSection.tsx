'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Factory, MapPin, Clock, Truck } from 'lucide-react';

// ─── Count-up animation hook ───────────────────────────────────────
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsComplete(true);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return { count, ref, isComplete };
}

// ─── Data ───────────────────────────────────────────────────────────
const stats = [
  { value: 13, suffix: '+', label: 'Manufacturing Facilities', mobileLabel: 'Facilities', icon: Factory },
  { value: 5, suffix: '+', label: 'Countries Served', mobileLabel: 'Countries', icon: Globe },
  { value: 240, suffix: '+', label: 'Keys Delivered', mobileLabel: 'Keys Delivered', icon: MapPin },
  { value: 21, suffix: '', label: 'Days Avg Lead Time', mobileLabel: 'Avg Lead Time', icon: Clock },
];

const destinations = [
  {
    name: 'North America',
    deliveryTime: '25–30 days',
    description: 'Full DDP & FOB shipping',
    angle: -40, // degrees from horizontal right
  },
  {
    name: 'Europe',
    deliveryTime: '28–35 days',
    description: 'CIF & door-to-door',
    angle: -10,
  },
  {
    name: 'Middle East',
    deliveryTime: '18–22 days',
    description: 'FOB & DDP available',
    angle: 20,
  },
  {
    name: 'Southeast Asia',
    deliveryTime: '7–10 days',
    description: 'Fastest regional delivery',
    angle: 55,
  },
  {
    name: 'Australia',
    deliveryTime: '15–20 days',
    description: 'Direct shipping routes',
    angle: 85,
  },
];

// ─── Decorative pattern overlay ─────────────────────────────────────
function DecorativePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.03 }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="global-reach-pattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="20" cy="20" r="1" fill="#5d2c86" />
          <path d="M0 20h40M20 0v40" stroke="#5d2c86" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#global-reach-pattern)" />
    </svg>
  );
}

// ─── Animated route line component ──────────────────────────────────
function AnimatedRoute({
  x1,
  y1,
  x2,
  y2,
  controlOffset,
  delay,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  controlOffset: number;
  delay: number;
  color: string;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  // Perpendicular control point offset
  const cx = midX - dy * controlOffset;
  const cy = midY + dx * controlOffset;

  const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

  return (
    <g>
      {/* Base route line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
      />
      {/* Animated dashed overlay */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="6 8"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="28"
          to="0"
          dur="2s"
          repeatCount="indefinite"
        />
      </motion.path>
      {/* Traveling pulse dot */}
      <motion.circle r="3" fill={color}>
        <animateMotion dur="4s" repeatCount="indefinite" begin={`${delay}s`}>
          <mpath href={`#route-path-${delay}`} />
        </animateMotion>
      </motion.circle>
      <path id={`route-path-${delay}`} d={pathD} fill="none" stroke="none" />
    </g>
  );
}

// ─── Supply chain SVG visualization ─────────────────────────────────
function SupplyChainVisual() {
  // Center point (Foshan) and destination coordinates in SVG viewBox
  const centerX = 400;
  const centerY = 280;

  const destinationCoords = [
    { x: 120, y: 80, controlOffset: 0.15, delay: 0.3 },   // North America
    { x: 160, y: 300, controlOffset: -0.1, delay: 0.5 },   // Europe
    { x: 350, y: 480, controlOffset: -0.15, delay: 0.7 },  // Middle East
    { x: 600, y: 440, controlOffset: -0.1, delay: 0.9 },   // Southeast Asia
    { x: 680, y: 520, controlOffset: 0.12, delay: 1.1 },   // Australia
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        className="w-full h-auto"
        aria-label="Supply chain routes from Foshan, China to global destinations"
        role="img"
      >
        <defs>
          {/* Gold gradient for Foshan origin point */}
          <radialGradient id="originGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          {/* Purple gradient for route lines */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5d2c86" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          {/* Glow filter for origin */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Subtle grid pattern */}
          <pattern
            id="svg-grid"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#5d2c86"
              strokeWidth="0.3"
              opacity="0.08"
            />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect width="800" height="600" fill="url(#svg-grid)" />

        {/* Abstract continent shapes - very subtle background shapes */}
        {/* North America suggestion */}
        <path
          d="M 80 100 Q 100 60 140 55 Q 170 50 160 80 Q 155 120 130 140 Q 100 160 90 130 Z"
          fill="#5d2c86"
          opacity="0.04"
        />
        {/* Europe suggestion */}
        <path
          d="M 130 250 Q 150 230 175 240 Q 190 250 185 280 Q 170 310 145 300 Q 120 280 130 250 Z"
          fill="#5d2c86"
          opacity="0.04"
        />
        {/* Middle East suggestion */}
        <path
          d="M 310 420 Q 340 400 370 410 Q 380 430 365 460 Q 340 475 315 455 Q 300 440 310 420 Z"
          fill="#5d2c86"
          opacity="0.04"
        />
        {/* Southeast Asia suggestion */}
        <path
          d="M 570 380 Q 600 360 640 380 Q 660 400 640 430 Q 610 450 580 430 Q 560 410 570 380 Z"
          fill="#5d2c86"
          opacity="0.04"
        />
        {/* Australia suggestion */}
        <path
          d="M 640 490 Q 680 470 720 490 Q 740 520 710 550 Q 670 560 645 535 Q 630 510 640 490 Z"
          fill="#5d2c86"
          opacity="0.04"
        />
        {/* China/Foshan area */}
        <path
          d="M 360 250 Q 400 230 440 250 Q 460 280 440 310 Q 400 330 370 310 Q 345 285 360 250 Z"
          fill="#5d2c86"
          opacity="0.06"
        />

        {/* Route lines from Foshan to each destination */}
        {destinationCoords.map((dest, i) => (
          <AnimatedRoute
            key={i}
            x1={centerX}
            y1={centerY}
            x2={dest.x}
            y2={dest.y}
            controlOffset={dest.controlOffset}
            delay={dest.delay}
            color="#5d2c86"
          />
        ))}

        {/* Destination markers */}
        {destinationCoords.map((dest, i) => (
          <g key={`dest-${i}`}>
            <motion.circle
              cx={dest.x}
              cy={dest.y}
              r="5"
              fill="#5d2c86"
              opacity="0.6"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.15 }}
            />
            <motion.circle
              cx={dest.x}
              cy={dest.y}
              r="3"
              fill="#D4AF37"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.6 + i * 0.15 }}
            />
          </g>
        ))}

        {/* Destination labels */}
        {destinations.map((dest, i) => {
          const coords = destinationCoords[i];
          return (
            <motion.g
              key={`label-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.8 + i * 0.15 }}
            >
              <text
                x={coords.x}
                y={coords.y - 14}
                textAnchor="middle"
                className="text-[11px] font-sans-body fill-[#1A1A1A] dark:fill-white font-semibold"
              >
                {dest.name}
              </text>
              <text
                x={coords.x}
                y={coords.y + 22}
                textAnchor="middle"
                className="text-[9px] font-sans-body fill-[#D4AF37]"
              >
                {dest.deliveryTime}
              </text>
            </motion.g>
          );
        })}

        {/* Foshan origin glow */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="30"
          fill="url(#originGlow)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <animate
            attributeName="r"
            values="25;35;25"
            dur="3s"
            repeatCount="indefinite"
          />
        </motion.circle>

        {/* Foshan outer ring - pulsing */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="12"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <animate
            attributeName="r"
            values="12;18;12"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.3;0.1;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </motion.circle>

        {/* Foshan main dot */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="7"
          fill="#D4AF37"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Foshan label */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <rect
            x={centerX - 35}
            y={centerY - 35}
            width="70"
            height="18"
            rx="4"
            fill="#5d2c86"
          />
          <text
            x={centerX}
            y={centerY - 22}
            textAnchor="middle"
            className="text-[10px] font-sans-body fill-white font-bold tracking-wider"
          >
            FOSHAN
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

// ─── Simplified mobile supply chain visual ──────────────────────────
function MobileSupplyChainVisual() {
  const routes = [
    { name: 'North America', time: '25–30 days', direction: 'up-left' },
    { name: 'Europe', time: '28–35 days', direction: 'left' },
    { name: 'Middle East', time: '18–22 days', direction: 'down-left' },
    { name: 'Southeast Asia', time: '7–10 days', direction: 'down-right' },
    { name: 'Australia', time: '15–20 days', direction: 'right' },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto py-8">
      {/* Central Foshan point */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#5d2c86]/10 flex items-center justify-center border-2 border-[#D4AF37]">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[8px] font-bold text-[#5d2c86] font-sans-body tracking-wider">FSH</span>
            </div>
          </div>
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="mt-2 text-xs font-bold tracking-widest text-[#5d2c86] dark:text-[#7d44a8] font-sans-body">
          FOSHAN, CHINA
        </span>
      </div>

      {/* Radial routes */}
      <div className="mt-6 space-y-3">
        {routes.map((route, i) => (
          <motion.div
            key={route.name}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          >
            {/* Connecting line */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              <motion.div
                className="h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#5d2c86]/30 w-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                style={{ transformOrigin: 'left' }}
              />
              <Truck className="w-3.5 h-3.5 text-[#5d2c86]/40 dark:text-[#7d44a8]/40" />
            </div>
            {/* Destination info */}
            <div className="flex-1 flex items-center justify-between bg-white/60 dark:bg-[#1E1E1E]/60 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-[#1A1A1A] dark:text-white font-sans-body">
                {route.name}
              </span>
              <span className="text-[10px] text-[#D4AF37] font-sans-body font-medium">
                {route.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Stat card component ────────────────────────────────────────────
function StatCard({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const { count, ref, isComplete } = useCountUp(stat.value, 2000);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      className="relative bg-white dark:bg-[#1E1E1E] rounded-xl p-5 lg:p-6 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5d2c86] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5d2c86]/[0.02] to-[#D4AF37]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-[#5d2c86]/8 dark:bg-[#5d2c86]/15 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#5d2c86] dark:text-[#7d44a8]" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-800" />
        </div>

        <p className={`text-3xl lg:text-4xl font-bold font-serif-display text-[#1A1A1A] dark:text-white ${isComplete ? 'count-glow' : ''}`}>
          {count}
          <span className="text-[#D4AF37]">{stat.suffix}</span>
        </p>

        <p className="text-xs tracking-widest text-gray-400 dark:text-gray-500 mt-2 font-sans-body uppercase">
          <span className="sm:hidden">{stat.mobileLabel}</span>
          <span className="hidden sm:inline">{stat.label}</span>
        </p>
      </div>
    </motion.div>
  );
}

// ─── Destination detail card ────────────────────────────────────────
function DestinationCard({
  destination,
  index,
}: {
  destination: typeof destinations[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 bg-white/70 dark:bg-[#1E1E1E]/70 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-100 dark:border-gray-800 hover:border-[#D4AF37]/30 dark:hover:border-[#D4AF37]/20 transition-colors duration-300"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
    >
      <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1A1A1A] dark:text-white font-sans-body truncate">
          {destination.name}
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 font-sans-body">
          {destination.description}
        </p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <Clock className="w-3 h-3 text-[#D4AF37]" />
        <span className="text-xs font-bold text-[#5d2c86] dark:text-[#7d44a8] font-sans-body">
          {destination.deliveryTime}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────
export default function GlobalReachSection() {
  const sectionRef = useRef(null);

  return (
    <section
      id="global-reach"
      className="relative py-20 lg:py-32 overflow-hidden bg-white dark:bg-[#121212] transition-colors duration-300"
      ref={sectionRef}
    >
      {/* Decorative pattern overlay */}
      <DecorativePattern />

      {/* Decorative gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(93,44,134,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Eyebrow */}
          <motion.p
            className="text-xs tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4 font-sans-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            GLOBAL SUPPLY CHAIN
          </motion.p>

          {/* Main heading */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white max-w-3xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From Foshan{' '}
            <span className="text-[#D4AF37] italic">to the World</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="mt-4 text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-sans-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Strategically located in China&apos;s furniture capital, our supply chain
            reaches hospitality projects across five continents with precision and reliability.
          </motion.p>

          {/* Decorative separator */}
          <motion.div
            className="mx-auto mt-6 w-20 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>

        {/* ── Supply Chain Visualization ── */}
        <div className="mb-12 lg:mb-16">
          {/* Desktop SVG visualization */}
          <div className="hidden md:block">
            <SupplyChainVisual />
          </div>

          {/* Mobile simplified visualization */}
          <div className="md:hidden">
            <MobileSupplyChainVisual />
          </div>
        </div>

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* ── Destination Cards (desktop: row, mobile: stacked) ── */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Section mini-header */}
          <div className="text-center mb-6">
            <p className="text-xs tracking-[0.2em] text-[#5d2c86] dark:text-[#7d44a8] font-sans-body font-semibold uppercase">
              Delivery Destinations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest.name} destination={dest} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Bottom decorative bar ── */}
        <motion.div
          className="mt-12 lg:mt-16 mx-auto w-full max-w-2xl h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(93,44,134,0.15) 20%, rgba(212,175,55,0.15) 80%, transparent)',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </section>
  );
}
