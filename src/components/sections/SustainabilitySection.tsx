'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Factory, Truck, Shield, Recycle, Wind, TreePine, PackageCheck } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

// ──────────────────────────────────────────────
// Count-up animation hook
// ──────────────────────────────────────────────
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return { count, ref };
}

// ──────────────────────────────────────────────
// Decorative leaf/nature SVG pattern
// ──────────────────────────────────────────────
function LeafPattern() {
  return (
    <svg
      className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
      style={{ opacity: 0.035 }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="leaf-pattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Stylized leaf shape */}
          <path
            d="M30 5 C30 5 45 15 45 30 C45 45 30 55 30 55 C30 55 15 45 15 30 C15 15 30 5 30 5Z"
            fill="none"
            stroke="#22C55E"
            strokeWidth="1"
          />
          {/* Leaf vein */}
          <line x1="30" y1="10" x2="30" y2="50" stroke="#22C55E" strokeWidth="0.5" />
          <line x1="30" y1="25" x2="22" y2="18" stroke="#22C55E" strokeWidth="0.3" />
          <line x1="30" y1="35" x2="38" y2="28" stroke="#22C55E" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="500" height="500" fill="url(#leaf-pattern)" />
    </svg>
  );
}

function BottomLeafPattern() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
      style={{ opacity: 0.025 }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="leaf-pattern-bottom"
          x="0"
          y="0"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="24" cy="24" r="6" fill="none" stroke="#22C55E" strokeWidth="0.8" />
          <circle cx="24" cy="24" r="2" fill="#22C55E" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#leaf-pattern-bottom)" />
    </svg>
  );
}

// ──────────────────────────────────────────────
// Eco Stats Data
// ──────────────────────────────────────────────
const ecoStats = [
  {
    icon: Recycle,
    value: 85,
    suffix: '%',
    label: 'Recycled Materials',
    description: 'of raw inputs from recycled sources',
  },
  {
    icon: Wind,
    value: 40,
    suffix: '%',
    label: 'Carbon Reduction',
    description: 'lower emissions vs. industry average',
  },
  {
    icon: TreePine,
    value: 100,
    suffix: '%',
    label: 'FSC-Certified Wood',
    description: 'responsibly sourced timber',
  },
  {
    icon: PackageCheck,
    value: 0,
    suffix: '',
    label: 'Zero-Waste Goal',
    description: 'packaging waste target by 2026',
  },
];

// ──────────────────────────────────────────────
// Feature Cards Data
// ──────────────────────────────────────────────
const features = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Materials',
    highlights: ['FSC-certified wood', 'Low-VOC finishes', 'Recycled metals'],
    description:
      'Every material is selected with purpose — certified sustainable timber, non-toxic coatings, and reclaimed metals that reduce demand on virgin resources.',
  },
  {
    icon: Factory,
    title: 'Clean Manufacturing',
    highlights: ['Solar-powered workshops', 'Water recycling', 'Waste reduction'],
    description:
      'Our Foshan production facilities run on renewable energy, recycle over 90% of process water, and have cut landfill waste by two-thirds.',
  },
  {
    icon: Truck,
    title: 'Green Logistics',
    highlights: ['Carbon-neutral shipping', 'Consolidated freight', 'Sustainable packaging'],
    description:
      'From consolidated container loads to bio-degradable wrapping, every shipment is optimized to minimize its footprint across the supply chain.',
  },
];

// ──────────────────────────────────────────────
// Individual Stat Counter Component
// ──────────────────────────────────────────────
function StatCounter({
  stat,
  index,
}: {
  stat: (typeof ecoStats)[number];
  index: number;
}) {
  const { count, ref } = useCountUp(stat.value, 2200);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Background glow on hover */}
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#22C55E]/5 to-[#5d2c86]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        {/* Icon */}
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#22C55E]/10 to-[#5d2c86]/10 flex items-center justify-center group-hover:from-[#22C55E]/20 group-hover:to-[#5d2c86]/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-5 h-5 text-[#22C55E]" />
        </div>

        {/* Counter Value */}
        <p className="text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-1">
          {stat.value === 0 ? (
            <>
              <span className="text-[#22C55E]">Zero</span>
            </>
          ) : (
            <>
              {count}
              <span className="text-[#22C55E]">{stat.suffix}</span>
            </>
          )}
        </p>

        {/* Label */}
        <p className="text-xs tracking-[0.15em] uppercase font-sans-body font-semibold text-[#5d2c86] dark:text-[#7d44a8] mb-1">
          {stat.label}
        </p>

        {/* Description */}
        <p className="text-[11px] text-gray-400 dark:text-gray-500 font-sans-body leading-relaxed max-w-[140px] mx-auto">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Feature Card Component
// ──────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <RevealOnScroll direction="up" delay={index * 0.15} duration={0.6}>
      <div className="relative bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800 group overflow-hidden cursor-default transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full">
        {/* Top gradient accent line - green to purple on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, #22C55E, #5d2c86)' }}
        />

        {/* Left border accent on hover */}
        <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-[#22C55E] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:top-2 group-hover:bottom-2" />

        {/* Shine sweep animation on view */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ x: '-100%' }}
          whileInView={{ x: '200%' }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.5 + index * 0.2,
            ease: 'easeInOut',
          }}
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(34,197,94,0.06), transparent)',
            width: '50%',
          }}
        />

        {/* Hover gradient overlay - green-to-purple tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(34,197,94,0.03) 0%, rgba(93,44,134,0.03) 100%)',
          }}
        />

        <div className="relative z-10">
          {/* Icon with gradient background */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22C55E]/10 to-[#5d2c86]/10 flex items-center justify-center mb-5 group-hover:from-[#22C55E]/20 group-hover:to-[#5d2c86]/20 group-hover:scale-110 transition-all duration-300">
            <Icon className="w-6 h-6 text-[#22C55E] group-hover:text-[#22C55E] transition-colors" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-3">
            {feature.title}
          </h3>

          {/* Highlight Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {feature.highlights.map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] tracking-wide font-sans-body font-medium bg-[#22C55E]/8 text-[#16A34A] dark:bg-[#22C55E]/10 dark:text-[#22C55E] border border-[#22C55E]/10"
              >
                <span className="w-1 h-1 rounded-full bg-[#22C55E]" />
                {highlight}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
            {feature.description}
          </p>

          {/* Bottom progress bar that fills on view */}
          <div className="mt-6 h-[2px] rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #22C55E, #5d2c86)' }}
              initial={{ width: '0%' }}
              whileInView={{ width: '40%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
            />
            <div
              className="h-full rounded-full -mt-[2px] transition-all duration-700 ease-out w-0 group-hover:w-full"
              style={{ background: 'linear-gradient(90deg, #22C55E, #5d2c86)' }}
            />
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

// ──────────────────────────────────────────────
// Main Sustainability Section Component
// ──────────────────────────────────────────────
export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="sustainability"
      className="relative bg-[#f8f3ed] dark:bg-[#121212] py-20 lg:py-28 overflow-hidden transition-colors duration-300"
      ref={sectionRef}
    >
      {/* ── Background Decorations ── */}

      {/* Leaf pattern - top right */}
      <LeafPattern />

      {/* Organic circles pattern - bottom left */}
      <BottomLeafPattern />

      {/* Green-tinted gradient orb - top right */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Green-tinted gradient orb - bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(34,197,94,0.04) 0%, rgba(93,44,134,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Purple gradient orb - mid left */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(93,44,134,0.04) 0%, transparent 70%)',
        }}
      />

      {/* accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22C55E]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Leaf className="w-4 h-4 text-[#9b6ec5]" />
            <p className="text-xs tracking-[0.3em] text-[#9b6ec5] dark:text-[#9b6ec5] font-sans-body font-medium">
              GREEN MANUFACTURING
            </p>
            <Leaf className="w-4 h-4 text-[#9b6ec5]" />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sustainability at our{' '}
            <span className="text-[#5d2c86] dark:text-[#7d44a8] italic">core</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We believe luxury hospitality and environmental responsibility go hand in hand.
            Our eco-friendly manufacturing practices reduce waste, conserve resources, and
            deliver exceptional FF&E — without compromising the planet.
          </motion.p>

          {/* accent line under header */}
          <motion.div
            className="mx-auto mt-8 h-[1px] w-24 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #22C55E, #9b6ec5, transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>

        {/* ── Eco Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-16 lg:mb-20">
          {ecoStats.map((stat, index) => (
            <StatCounter key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* ── Divider ── */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-16 lg:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#22C55E]/30" />
          <div className="w-2 h-2 rounded-full bg-[#22C55E]/40" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#22C55E]/30" />
        </motion.div>

        {/* ── Three Feature Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* ── Bottom CTA Bar ── */}
        <RevealOnScroll direction="up" delay={0.2} duration={0.6}>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(93,44,134,0.08) 50%, rgba(125,68,168,0.05) 100%)',
              }}
            />

            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl border border-[#22C55E]/10 dark:border-[#22C55E]/15 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-6 py-8 lg:px-12 lg:py-10 text-center sm:text-left">
              {/* Shield icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22C55E]/15 to-[#5d2c86]/15 flex items-center justify-center shrink-0">
                <Shield className="w-7 h-7 text-[#22C55E]" />
              </div>

              {/* Text content */}
              <div className="max-w-lg">
                <h3 className="text-lg lg:text-xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-1">
                  Committed to a greener hospitality industry
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans-body leading-relaxed">
                  From material sourcing to final delivery, sustainability isn&apos;t an add-on — it&apos;s built
                  into every step of our process. Together, we can create beautiful spaces that respect our planet.
                </p>
              </div>

              {/* Decorative leaf cluster */}
              <div className="hidden sm:flex items-center gap-1 opacity-20 shrink-0">
                <Leaf className="w-5 h-5 text-[#22C55E] -rotate-45" />
                <Leaf className="w-4 h-4 text-[#22C55E] rotate-12" />
                <Leaf className="w-3 h-3 text-[#22C55E] -rotate-12" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
