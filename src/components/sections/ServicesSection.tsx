'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Sofa, Lamp, Bath, Package, ShieldCheck, Frame, ArrowRight, PenTool, Factory, CheckCircle, Truck } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

const services = [
  {
    icon: Sofa,
    title: 'Casegoods & Upholstery',
    description:
      'Full range of hotel casegoods, headboards, desks, and upholstered seating crafted to brand specifications.',
    stat: '500+',
    statLabel: 'projects',
  },
  {
    icon: Lamp,
    title: 'Lighting & Mirrors',
    description:
      'Custom lighting solutions and mirrors designed to complement each property\'s unique aesthetic.',
    stat: '120+',
    statLabel: 'fixtures',
  },
  {
    icon: Bath,
    title: 'Bathroom Accessories',
    description:
      'Complete bathroom FF&E packages including vanities, accessories, and hardware.',
    stat: '8K+',
    statLabel: 'rooms fitted',
  },
  {
    icon: Package,
    title: 'Sourcing & Logistics',
    description:
      'End-to-end supply chain management from raw materials to on-site delivery and installation.',
    stat: '21',
    statLabel: 'day avg',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Control',
    description:
      'Rigorous inspection at every stage — from raw material through production to final packaging.',
    stat: '99.2%',
    statLabel: 'pass rate',
  },
  {
    icon: Frame,
    title: 'Art & Decor',
    description:
      'Curated art programs and decorative accessories that bring each hotel\'s brand story to life.',
    stat: '340+',
    statLabel: 'programs',
  },
];

const processSteps = [
  {
    icon: PenTool,
    title: 'Design',
    description: 'Translate brand standards into precise FF&E specifications and technical drawings.',
  },
  {
    icon: Factory,
    title: 'Manufacture',
    description: 'Mill, upholster, finish and assemble every piece in our Foshan workshops.',
  },
  {
    icon: CheckCircle,
    title: 'QC',
    description: 'Multi-stage inspection from raw materials through production to final packaging.',
  },
  {
    icon: Truck,
    title: 'Deliver',
    description: 'Consolidate, document and install on-site — FOB or DDP, one accountable team.',
  },
];

/* ── Animated Number Counter ── */
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const numericMatch = value.match(/^[\d.]+/);
    if (!numericMatch || !spanRef.current) return;

    const target = parseFloat(numericMatch[0]);
    const suffix = value.replace(numericMatch[0], '');
    const hasDecimal = numericMatch[0].includes('.');
    const duration = 1800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      if (spanRef.current) {
        spanRef.current.textContent = (hasDecimal ? current.toFixed(1) : Math.floor(current).toString()) + suffix;
      }
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  const numericMatch = value.match(/^[\d.]+/);
  const initialValue = numericMatch ? '0' : value;

  return (
    <div ref={ref} className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-baseline gap-1.5">
        <span ref={spanRef} className="text-lg font-bold font-serif-display text-[#5d2c86] dark:text-[#7d44a8] count-glow">
          {initialValue}
        </span>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-sans-body uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ── 3D Tilt Card Wrapper ── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: ((y - 0.5) * -6), // max 3deg
      y: ((x - 0.5) * 6),  // max 3deg
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          transform: isHovering
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Gold Accent Separator ── */
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

/* ── Particle Dot Pattern (visible on hover) ── */
function ParticleDots() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="card-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#D4AF37" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#card-dots)" />
    </svg>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const isProcessInView = useInView(processRef, { once: true, margin: '-80px' });

  // Parallax & zoom for workshop image
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.04, 1.12]);

  // Word-by-word reveal heading
  const headingWords = ['360°', 'FF&E', 'support,', 'under', 'one', 'roof.'];

  return (
    <section id="services" className="bg-[#f8f3ed] dark:bg-[#121212] relative overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* ─────────────── 1. CINEMATIC HERO BANNER ─────────────── */}
      <div ref={heroRef} className="relative pt-16 lg:pt-24 pb-4 overflow-hidden">
        {/* Background gradient cream → transparent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(248,243,237,0.95) 0%, rgba(248,243,237,0) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Dark mode gradient */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background: 'linear-gradient(180deg, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow with gold color and tracking animation */}
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
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.12,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {word === '360°' || word === 'FF&E' || word === 'support,' ? (
                  <span className="text-[#5d2c86] dark:text-[#7d44a8]">{word}</span>
                ) : (
                  word
                )}
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

          {/* Animated gold line below heading */}
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

      {/* ─────────────── MAIN CONTENT: Workshop Image + Service Cards ─────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column - Workshop Image (Enhanced) */}
          <motion.div
            className="lg:w-5/12 relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Decorative purple accent line on left side */}
            <div className="absolute -left-4 lg:-left-6 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#5d2c86] via-[#5d2c86]/50 to-transparent" />

            {/* Workshop Image with Parallax, Zoom, Ken Burns & Overlay Badge */}
            <div ref={imageRef} className="relative rounded-2xl overflow-hidden shadow-xl image-zoom-premium">
              {/* Gold accent corner - top right */}
              <div className="absolute top-0 right-0 z-20">
                <div className="w-16 h-16">
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[64px] border-l-transparent border-t-[64px] border-t-[#D4AF37]" />
                  <div className="absolute top-2 right-2 w-0 h-0 border-l-[48px] border-l-transparent border-t-[48px] border-t-white/90 dark:border-t-[#1E1E1E]/90" />
                </div>
              </div>
              {/* Gold accent corner - bottom left */}
              <div className="absolute bottom-0 left-0 z-20">
                <div className="w-16 h-16">
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[64px] border-r-transparent border-b-[64px] border-b-[#D4AF37]" />
                  <div className="absolute bottom-2 left-2 w-0 h-0 border-r-[48px] border-r-transparent border-b-[48px] border-b-white/90 dark:border-b-[#1E1E1E]/90" />
                </div>
              </div>
              {/* Gold border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37]/30 pointer-events-none z-20" />

              {/* Parallax image with Ken Burns */}
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="w-full h-48 lg:h-64 overflow-hidden"
              >
                <img
                  src="/images/about/about-7.jpeg"
                  alt="Akshar Foshan Workshop — Manufacturing Excellence"
                  className="w-full h-full object-cover animate-ken-burns"
                />
              </motion.div>

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5d2c86]/20 to-transparent pointer-events-none z-10" />

              {/* "Manufacturing Excellence" overlay badge with animated border */}
              <div className="absolute bottom-4 left-4 z-30">
                <div className="relative">
                  {/* Animated border */}
                  <div
                    className="absolute -inset-[2px] rounded-lg award-card-border"
                    style={{
                      background: 'conic-gradient(from var(--border-angle), #D4AF37, #5d2c86, #D4AF37, #5d2c86, #D4AF37)',
                    }}
                  />
                  <div className="relative bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-sm rounded-lg px-4 py-2.5">
                    <p className="text-[10px] tracking-[0.2em] text-[#D4AF37] font-sans-body font-semibold uppercase">
                      Manufacturing
                    </p>
                    <p className="text-sm font-bold text-[#1A1A1A] dark:text-white font-serif-display">
                      Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Service Cards (Enhanced) */}
          <motion.div
            className="lg:w-7/12"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <RevealOnScroll
                    key={service.title}
                    direction="up"
                    delay={index * 0.1}
                    duration={0.5}
                  >
                    <TiltCard>
                      <div className="relative bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 group overflow-hidden h-full">
                        {/* Blur-to-focus reveal on scroll */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none z-0"
                          initial={{ filter: 'blur(8px)', opacity: 0.5 }}
                          whileInView={{ filter: 'blur(0px)', opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />

                        {/* Particle dot pattern on hover */}
                        <ParticleDots />

                        {/* Gold shimmer sweep on hover */}
                        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                          <div className="card-shimmer-sweep" />
                        </div>

                        {/* Gradient border effect on hover */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px] bg-gradient-to-br from-[#5d2c86] via-[#D4AF37] to-[#5d2c86]">
                          <div className="w-full h-full bg-white dark:bg-[#1E1E1E] rounded-[14px]" />
                        </div>

                        {/* Gold triangle corner accent - top right */}
                        <div className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[32px] border-l-transparent border-t-[32px] border-t-[#D4AF37]" />
                          </div>
                        </div>

                        <div className="relative z-10">
                          {/* Icon with gradient background */}
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#5d2c86]/10 to-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:from-[#5d2c86]/20 group-hover:to-[#D4AF37]/20 transition-all duration-300 group-hover:scale-110">
                            <Icon className="w-5 h-5 text-[#5d2c86] group-hover:text-[#5d2c86] transition-colors" />
                          </div>
                          <h3 className="text-base font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-2">
                            {service.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body mb-3">
                            {service.description}
                          </p>

                          {/* Animated number counter */}
                          <AnimatedCounter value={service.stat} label={service.statLabel} />

                          {/* Learn more link - appears on hover */}
                          <div className="flex items-center gap-1 text-[#5d2c86] text-xs font-sans-body font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-3">
                            Learn more
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </RevealOnScroll>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Gold Accent Separator ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GoldSeparator />
      </div>

      {/* ─────────────── 4. PROCESS STEPS SECTION ─────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div ref={processRef}>
          {/* Section header */}
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

          {/* Desktop: Horizontal steps with gold lines */}
          <div className="hidden md:grid grid-cols-4 gap-0 relative">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealOnScroll
                  key={step.title}
                  direction="up"
                  delay={index * 0.15}
                  duration={0.6}
                >
                  <div className="relative flex flex-col items-center text-center px-4 lg:px-6">
                    {/* Gold connector line between steps */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute top-8 lg:top-9 left-[calc(50%+28px)] right-0 z-0 flex items-center">
                        <div className="w-full relative h-[2px]">
                          {/* Track */}
                          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
                          {/* Animated gold fill */}
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, #5d2c86, #D4AF37)',
                            }}
                            initial={{ scaleX: 0 }}
                            animate={isProcessInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.0, delay: 0.8 + index * 0.25, ease: 'easeOut' }}
                          />
                          {/* Traveling gold dot */}
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.6)]"
                            initial={{ left: '0%', opacity: 0 }}
                            animate={isProcessInView ? { left: '90%', opacity: [0, 1, 1, 0] } : {}}
                            transition={{ duration: 1.2, delay: 1.0 + index * 0.25, ease: 'easeInOut' }}
                          />
                        </div>
                        {/* Arrow head */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={isProcessInView ? { opacity: 0.6 } : {}}
                          transition={{ delay: 1.8 + index * 0.25 }}
                        >
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#D4AF37] -ml-0.5" />
                        </motion.div>
                      </div>
                    )}

                    {/* Step icon with gold pulse glow */}
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
                      {/* Gold glow pulse when in viewport */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          boxShadow: '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1)',
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isProcessInView ? { opacity: [0, 0.6, 0], scale: [0.9, 1.15, 0.9] } : {}}
                        transition={{
                          duration: 2.5,
                          delay: 0.5 + index * 0.2,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>

                    {/* Step number */}
                    <motion.span
                      className="text-[10px] font-sans-body font-bold tracking-[0.2em] text-[#D4AF37] mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.15 }}
                    >
                      STEP 0{index + 1}
                    </motion.span>

                    <h4 className="text-sm lg:text-base font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[11px] lg:text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
                      {step.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Mobile: Vertical steps with gold lines */}
          <div className="md:hidden flex flex-col">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealOnScroll
                  key={step.title}
                  direction="up"
                  delay={index * 0.12}
                  duration={0.5}
                >
                  <div className="flex gap-4">
                    {/* Left: icon + connector */}
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-sm relative z-10">
                          <Icon className="w-5 h-5 text-[#5d2c86] dark:text-[#7d44a8]" />
                        </div>
                        {/* Gold pulse glow */}
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{
                            boxShadow: '0 0 16px rgba(212,175,55,0.25)',
                          }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={isProcessInView ? { opacity: [0, 0.5, 0], scale: [0.9, 1.1, 0.9] } : {}}
                          transition={{
                            duration: 2.5,
                            delay: 0.3 + index * 0.2,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>
                      {/* Vertical gold connector */}
                      {index < processSteps.length - 1 && (
                        <div className="relative w-[2px] h-10 my-1">
                          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
                          <motion.div
                            className="absolute inset-x-0 top-0 bottom-0 rounded-full"
                            style={{
                              background: 'linear-gradient(180deg, #5d2c86, #D4AF37)',
                            }}
                            initial={{ scaleY: 0 }}
                            animate={isProcessInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                          />
                        </div>
                      )}
                    </div>
                    {/* Right: content */}
                    <div className="pb-6">
                      <span className="text-[9px] font-sans-body font-bold tracking-[0.2em] text-[#D4AF37]">
                        STEP 0{index + 1}
                      </span>
                      <h4 className="text-sm font-bold text-[#1A1A1A] dark:text-white font-sans-body mt-0.5 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
                        {step.description}
                      </p>
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

      {/* ─── Ambient decorative elements ─── */}
      {/* Top right gold blob */}
      <div
        className="absolute -top-10 -right-10 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Bottom left purple blob */}
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(93,44,134,0.03) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
