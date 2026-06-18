'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  PenTool,
  CheckCircle,
  Factory,
  ShieldCheck,
  Truck,
  Clock,
} from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface TimelineStep {
  number: number;
  title: string;
  duration: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  detail: string;
}

const steps: TimelineStep[] = [
  {
    number: 1,
    title: 'Discovery & Briefing',
    duration: 'Week 1-2',
    description:
      'Understanding your brand standards, room counts, and project timeline.',
    icon: MessageSquare,
    detail:
      'We conduct in-depth workshops with your team to capture brand DNA, review FF&E standards, analyze room counts and scope, and align on milestone dates and budget parameters.',
  },
  {
    number: 2,
    title: 'Design & Specification',
    duration: 'Week 2-4',
    description:
      'Translating brand requirements into detailed FF&E specifications and drawings.',
    icon: PenTool,
    detail:
      'Our design engineers produce detailed technical drawings, material call-outs, finish schedules, and full specification packages for every item in the scope.',
  },
  {
    number: 3,
    title: 'Sampling & Approval',
    duration: 'Week 4-6',
    description:
      'Producing physical samples for your review and approval before production.',
    icon: CheckCircle,
    detail:
      'We produce finish, fabric, and construction samples for your brand team to review, adjust, and formally approve — ensuring zero surprises during mass production.',
  },
  {
    number: 4,
    title: 'Manufacturing',
    duration: 'Week 6-14',
    description:
      'Full-scale production across our cooperating facilities with daily QC checks.',
    icon: Factory,
    detail:
      'Parallel production lines across our partner factories run simultaneously with daily quality checkpoints, milestone photo reports, and live progress dashboards.',
  },
  {
    number: 5,
    title: 'Quality Inspection',
    duration: 'Week 14-16',
    description:
      'Comprehensive inspection of every piece before packaging and shipment.',
    icon: ShieldCheck,
    detail:
      'Our in-house QC team inspects 100% of finished goods against the approved samples and specification book, documenting every piece with photos and compliance certificates.',
  },
  {
    number: 6,
    title: 'Logistics & Delivery',
    duration: 'Week 16-20',
    description:
      'Coordinated shipping, customs clearance, and on-time delivery to your property.',
    icon: Truck,
    detail:
      'We consolidate shipments, manage export documentation, coordinate freight forwarding, handle customs clearance, and arrange final-mile delivery to your property — FOB or DDP.',
  },
];

/* ------------------------------------------------------------------ */
/*  Decorative dot pattern                                             */
/* ------------------------------------------------------------------ */

function DecorativeDots() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.03 }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="timeline-dots"
          x="0"
          y="0"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="#5d2c86" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#timeline-dots)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Step number circle                                                 */
/* ------------------------------------------------------------------ */

function StepCircle({
  number,
  isHovered,
  isInView,
  delay,
}: {
  number: number;
  isHovered: boolean;
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="relative z-10"
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
    >
      {/* Pulse ring — always subtle, stronger on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#9b6ec5]/30"
        animate={
          isHovered
            ? { scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }
            : { scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }
        }
        transition={{
          duration: isHovered ? 1.2 : 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main circle */}
      <div
        className={`
          relative w-14 h-14 rounded-full flex items-center justify-center
          border-2 border-[#9b6ec5] bg-[#5d2c86]
          transition-all duration-300
          ${isHovered ? 'shadow-[0_0_24px_rgba(125,68,168,0.35)] scale-110' : 'shadow-lg'}
        `}
      >
        <span className="text-white font-bold font-serif-display text-lg">
          {number}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop step card                                                  */
/* ------------------------------------------------------------------ */

function DesktopStepCard({
  step,
  index,
  isInView,
  isHovered,
  onHover,
  onLeave,
}: {
  step: TimelineStep;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = step.icon;
  const staggerDelay = 0.15 * index;

  return (
    <RevealOnScroll direction="up" delay={staggerDelay} duration={0.6}>
      <div className="flex flex-col items-center">
        {/* Number circle */}
        <div
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className="cursor-default"
        >
          <StepCircle
            number={step.number}
            isHovered={isHovered}
            isInView={isInView}
            delay={0.3 + staggerDelay}
          />
        </div>

        {/* Card below */}
        <motion.div
          className={`
            mt-6 w-full max-w-[200px] lg:max-w-[220px]
            bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 lg:p-6
            border border-gray-100 dark:border-gray-800
            shadow-sm cursor-default
            transition-all duration-500
            hover:shadow-xl hover:-translate-y-1.5
            hover:border-[#9b6ec5]/40 dark:hover:border-[#9b6ec5]/30
            group relative overflow-hidden
          `}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          {/* Top accent on hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, #5d2c86, #9b6ec5, #5d2c86)',
            }}
          />

          {/* Icon */}
          <div className="w-9 h-9 rounded-lg bg-[#5d2c86]/8 dark:bg-[#5d2c86]/15 flex items-center justify-center mb-3 group-hover:bg-[#5d2c86]/15 dark:group-hover:bg-[#5d2c86]/25 group-hover:scale-110 transition-all duration-300">
            <Icon className="w-4.5 h-4.5 text-[#5d2c86] dark:text-[#7d44a8]" />
          </div>

          {/* Duration badge */}
          <span className="inline-block text-[10px] font-semibold tracking-wider text-[#9b6ec5] bg-[#9b6ec5]/10 dark:bg-[#9b6ec5]/15 rounded-full px-2.5 py-0.5 mb-2 font-sans-body">
            {step.duration}
          </span>

          {/* Title */}
          <h3 className="text-sm font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-1.5 leading-tight">
            {step.title}
          </h3>

          {/* Brief description */}
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
            {step.description}
          </p>

          {/* Expandable detail on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-700/50">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </RevealOnScroll>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile step card                                                   */
/* ------------------------------------------------------------------ */

function MobileStepCard({
  step,
  index,
  isInView,
  isHovered,
  onHover,
  onLeave,
}: {
  step: TimelineStep;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = step.icon;
  const staggerDelay = 0.12 * index;

  return (
    <RevealOnScroll direction="up" delay={staggerDelay} duration={0.5}>
      <div className="flex gap-5">
        {/* Left: vertical line + circle */}
        <div className="flex flex-col items-center">
          <StepCircle
            number={step.number}
            isHovered={isHovered}
            isInView={isInView}
            delay={0.2 + staggerDelay}
          />

          {/* Vertical connector */}
          {index < steps.length - 1 && (
            <motion.div
              className="w-[2px] flex-1 min-h-[40px] rounded-full relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + staggerDelay }}
            >
              {/* Track */}
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
              {/* Accent fill */}
              <motion.div
                className="absolute inset-x-0 top-0 bottom-0 rounded-full origin-top"
                style={{
                  background: 'linear-gradient(180deg, #5d2c86, #9b6ec5)',
                }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + staggerDelay,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Right: content card */}
        <div
          className={`
            flex-1 pb-8
            bg-white dark:bg-[#1E1E1E] rounded-2xl p-5
            border border-gray-100 dark:border-gray-800
            shadow-sm cursor-default
            transition-all duration-500
            hover:shadow-xl hover:-translate-y-1
            hover:border-[#9b6ec5]/40 dark:hover:border-[#9b6ec5]/30
            group relative overflow-hidden
          `}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onTouchStart={onHover}
          onTouchEnd={onLeave}
        >
          {/* Top accent on hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, #5d2c86, #9b6ec5, #5d2c86)',
            }}
          />

          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#5d2c86]/8 dark:bg-[#5d2c86]/15 flex items-center justify-center group-hover:bg-[#5d2c86]/15 dark:group-hover:bg-[#5d2c86]/25 transition-all duration-300">
              <Icon className="w-4 h-4 text-[#5d2c86] dark:text-[#7d44a8]" />
            </div>

            {/* Duration badge */}
            <span className="text-[10px] font-semibold tracking-wider text-[#9b6ec5] bg-[#9b6ec5]/10 dark:bg-[#9b6ec5]/15 rounded-full px-2.5 py-0.5 font-sans-body">
              {step.duration}
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-1.5">
            {step.title}
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
            {step.description}
          </p>

          {/* Expandable detail on hover/touch */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-700/50">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ProjectTimeline() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Track which step is hovered (for expand + pulse)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="timeline"
      className="relative py-20 lg:py-32 overflow-hidden bg-[#f8f3ed] dark:bg-[#121212] transition-colors duration-300"
      ref={sectionRef}
    >
      {/* Decorative dots overlay */}
      <DecorativeDots />

      {/* Subtle gradient accent blobs */}
      <div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(93,44,134,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(125,68,168,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---- Section Header ---- */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            className="text-xs tracking-[0.3em] text-[#9b6ec5] mb-4 font-sans-body font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            OUR PROCESS
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From concept to{' '}
            <span className="text-[#9b6ec5] italic">completion</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-sans-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A structured, transparent journey from initial briefing through
            final delivery — every milestone visible, every detail accounted
            for.
          </motion.p>

          {/* accent line */}
          <motion.div
            className="mx-auto mt-6 h-[1px] w-24 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, #9b6ec5, transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>

        {/* ---- Desktop: Horizontal timeline ---- */}
        <div className="hidden lg:block">
          {/* Horizontal connecting line */}
          <div className="relative flex items-start justify-between">
            {/* Full-width accent gradient line behind the circles */}
            <div className="absolute top-7 left-[calc(8.33%+28px)] right-[calc(8.33%+28px)] h-[2px]">
              {/* Track */}
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
              {/* Animated accent fill */}
              <motion.div
                className="absolute inset-y-0 left-0 right-0 rounded-full origin-left"
                style={{
                  background:
                    'linear-gradient(90deg, #5d2c86, #9b6ec5 50%, #5d2c86)',
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Steps */}
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 flex justify-center">
                <DesktopStepCard
                  step={step}
                  index={index}
                  isInView={isInView}
                  isHovered={hoveredStep === step.number}
                  onHover={() => setHoveredStep(step.number)}
                  onLeave={() => setHoveredStep(null)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ---- Tablet: Horizontal with scroll ---- */}
        <div className="hidden md:block lg:hidden">
          <div className="relative">
            {/* Horizontal accent line */}
            <div className="absolute top-7 left-7 right-7 h-[2px]">
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
              <motion.div
                className="absolute inset-y-0 left-0 right-0 rounded-full origin-left"
                style={{
                  background:
                    'linear-gradient(90deg, #5d2c86, #9b6ec5 50%, #5d2c86)',
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Scrollable step row */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {steps.map((step, index) => (
                <div key={step.number} className="flex-shrink-0 w-[180px]">
                  <DesktopStepCard
                    step={step}
                    index={index}
                    isInView={isInView}
                    isHovered={hoveredStep === step.number}
                    onHover={() => setHoveredStep(step.number)}
                    onLeave={() => setHoveredStep(null)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Mobile: Vertical timeline ---- */}
        <div className="md:hidden">
          {steps.map((step, index) => (
            <MobileStepCard
              key={step.number}
              step={step}
              index={index}
              isInView={isInView}
              isHovered={hoveredStep === step.number}
              onHover={() => setHoveredStep(step.number)}
              onLeave={() => setHoveredStep(null)}
            />
          ))}
        </div>

        {/* ---- Bottom badge ---- */}
        <RevealOnScroll direction="up" delay={0.8} duration={0.6}>
          <div className="flex justify-center mt-14 lg:mt-20">
            <div className="inline-flex items-center gap-2.5 bg-white dark:bg-[#1E1E1E] border border-[#9b6ec5]/30 dark:border-[#9b6ec5]/20 rounded-full px-6 py-3 shadow-sm">
              <Clock className="w-4 h-4 text-[#9b6ec5]" />
              <span className="text-sm font-semibold text-[#1A1A1A] dark:text-white font-sans-body">
                <span className="text-[#9b6ec5]">21 days</span> average lead
                time
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
