'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Floating rotating diamond decoration
function FloatingDiamond() {
  return (
    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <motion.div
        className="w-20 h-20 border-2 border-[#D4AF37]/30 dark:border-[#D4AF37]/20 rounded-md"
        animate={{ rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center center' }}
      >
        {/* Inner smaller diamond */}
        <motion.div
          className="absolute inset-2 border border-[#D4AF37]/15 dark:border-[#D4AF37]/10 rounded-sm"
          animate={{ rotate: [360, 315, 270, 225, 180, 135, 90, 45, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: 'center center' }}
        />
      </motion.div>
    </div>
  );
}

// Decorative corner bracket (L-shape)
function CornerBracket() {
  return (
    <svg
      className="absolute -top-2 -left-2 w-10 h-10 pointer-events-none z-10"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M 2 2 L 2 38"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      />
      <motion.path
        d="M 2 2 L 38 2"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      />
    </svg>
  );
}

// Count-up animation hook
function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || (isInView && !hasStarted.current)) {
      hasStarted.current = true;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
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
  }, [isInView, target, duration, startOnView]);

  return { count, ref, isComplete };
}

// Decorative SVG pattern component
function DecorativePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.05 }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill="#4A2364" />
          <path d="M0 30h60M30 0v60" stroke="#4A2364" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-pattern)" />
    </svg>
  );
}

const stats = [
  { value: 13, suffix: '+', label: 'COOPERATING FACILITIES', mobileLabel: 'FACILITIES' },
  { value: 5, suffix: '+', label: 'YEARS HOSPITALITY EXPERIENCE', mobileLabel: 'YEARS EXPERIENCE' },
  { value: 240, suffix: '', label: 'KEYS DELIVERED IN 21 DAYS', mobileLabel: 'KEYS IN 21 DAYS' },
  { value: 360, suffix: '°', label: 'FULL FF&E COVERAGE', mobileLabel: 'FF&E COVERAGE', isSpecial: true },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section id="home" className="relative bg-[#F8F5F2] dark:bg-[#1A1A1A] min-h-screen pt-20 lg:pt-0 overflow-x-hidden overflow-y-hidden transition-colors duration-300" ref={heroRef}>
      {/* Gradient overlay - cream to very light purple tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, #F8F5F2 0%, #F8F5F2 40%, #F3EFF8 70%, #EDE7F3 100%)',
        }}
      />
      {/* Dark mode gradient */}
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background: 'linear-gradient(160deg, #1A1A1A 0%, #1A1A1A 40%, #1E1525 70%, #231830 100%)',
        }}
      />

      {/* Decorative SVG pattern behind hero text */}
      <DecorativePattern />

      {/* Grain texture overlay for visual depth */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ opacity: 0.03 }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%">
          <filter id="grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-16 lg:py-0 gap-8 lg:gap-12 relative">
          {/* Floating diamond decoration between columns (desktop only) */}
          <FloatingDiamond />

          {/* Left Content */}
          <div className="w-full lg:flex-1 lg:max-w-xl pt-4 lg:pt-0 relative">
            {/* Decorative corner bracket */}
            <CornerBracket />

            {/* Purple divider */}
            <motion.div
              className="w-12 h-0.5 bg-[#4A2364] mb-6"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Subheading with animated line */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37] shrink-0"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              />
              <motion.p
                className="text-xs tracking-[0.3em] text-gray-400 dark:text-gray-500 font-sans-body"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                HOSPITALITY FF&E &bull; EST. FOSHAN
              </motion.p>
            </div>

            {/* Main headline */}
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-6xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Furniture that{' '}
              <span className="text-[#D4AF37] italic underline decoration-[#D4AF37] decoration-2 underline-offset-4">tells the story</span>{' '}
              of a hotel.
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-base text-gray-500 dark:text-gray-400 leading-7 sm:leading-relaxed mb-8 font-sans-body max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Akshar Foshan crafts complete hotel furniture solutions — casegoods,
              upholstery, lighting, mirrors, bathroom accessories — and orchestrates
              sourcing, QC and logistics for hospitality brands worldwide.
            </motion.p>

            {/* CTA Buttons - min 48px touch target */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Button
                onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-shimmer bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-full px-8 min-h-12 font-sans-body text-sm font-medium group shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Open the portfolio
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-[#4A2364] text-[#4A2364] dark:border-[#6B3F8E] dark:text-[#6B3F8E] hover:bg-[#4A2364]/5 rounded-full px-8 min-h-12 font-sans-body text-sm font-medium"
              >
                Start a project
              </Button>
            </motion.div>
          </div>

          {/* Right Visual Area */}
          <motion.div
            className="w-full lg:flex-1 relative lg:max-w-2xl"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            style={{ y: heroImageY }}
          >
            <div className="relative">
              {/* Purple glow behind main image */}
              <div
                className="absolute -inset-8 rounded-full pointer-events-none z-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(74,35,100,0.25) 0%, rgba(74,35,100,0.08) 40%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
                aria-hidden="true"
              />

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl z-[1]">
                <img
                  src="/hero-hotel.png"
                  alt="Hilton Hotel - Akshar Foshan Project"
                  className="w-full h-[220px] sm:h-[350px] lg:h-[480px] object-cover"
                />
                {/* Enhanced badge with gold border-left accent */}
                <motion.div
                  className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm text-white px-5 py-3 rounded-lg border-l-[3px] border-[#D4AF37] shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <p className="text-xs tracking-widest font-sans-body">
                    NOW MANUFACTURING — <span className="font-bold text-[#D4AF37]">240 KEYS</span>
                  </p>
                </motion.div>
              </div>

              {/* Floating small image - top right with brand color frame - only on desktop */}
              <motion.div
                className="absolute -top-4 -right-2 lg:-right-8 w-28 h-24 lg:w-40 lg:h-32 rounded-xl overflow-hidden shadow-xl hidden md:block"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                style={{ border: '3px solid #4A2364' }}
              >
                <img
                  src="/hero-hotel2.png"
                  alt="Modern hotel building"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating small image - bottom right with brand color frame - only on desktop */}
              <motion.div
                className="absolute -bottom-6 right-8 lg:right-16 w-24 h-20 lg:w-36 lg:h-28 rounded-xl overflow-hidden shadow-xl hidden md:block"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                style={{ border: '3px solid #D4AF37' }}
              >
                <img
                  src="/catalog-pages/page_7.png"
                  alt="Hotel project"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="relative pb-12 lg:pb-20 pt-8">
          {/* Separator line above stats */}
          <motion.div
            className="w-full h-[2px] mb-10"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(74,35,100,0.35) 20%, rgba(212,175,55,0.35) 80%, transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 backdrop-blur-md bg-white/50 dark:bg-white/5 rounded-2xl p-6 lg:p-8 border border-white/20 dark:border-white/10">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          {/* Scroll-down indicator - part of stats section */}
          <motion.div
            className="flex flex-col items-center gap-1 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span className="text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500 font-sans-body">SCROLL</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown className="w-4 h-4 text-[#4A2364]/50 dark:text-[#6B3F8E]/50" />
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

// Stat item component with count-up animation
function StatItem({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const { count, ref, isComplete } = useCountUp(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      className="text-center lg:text-left"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <p
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display ${isComplete ? 'count-glow' : ''}`}
        style={{
          background: 'linear-gradient(135deg, #4A2364, #D4AF37)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {stat.isSpecial ? (
          <>
            <span>{count}</span>
            <span>{stat.suffix}</span>
          </>
        ) : (
          <>
            {count}
            {stat.suffix}
          </>
        )}
      </p>
      <p className="text-xs tracking-widest text-gray-400 dark:text-gray-500 mt-2 font-sans-body">
        {/* Shorter labels on mobile */}
        <span className="md:hidden">{stat.mobileLabel}</span>
        <span className="hidden md:inline">{stat.label}</span>
      </p>
    </motion.div>
  );
}
