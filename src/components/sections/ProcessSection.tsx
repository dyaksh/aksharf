'use client';

import { FileText, Hammer, Truck } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';

const acts = [
  {
    number: '01',
    title: 'ACT I: Brief',
    icon: FileText,
    description:
      "We translate brand standards, brief decks and floor plans into FF&E reality — across casegoods, upholstery, lighting and bath.",
  },
  {
    number: '02',
    title: 'ACT II: Craft',
    icon: Hammer,
    description:
      "Our Foshan workshops mill, upholster, finish and inspect every piece against the property's specification book.",
  },
  {
    number: '03',
    title: 'ACT III: Deliver',
    icon: Truck,
    description:
      "FOB or DDP, we orchestrate consolidation, documentation and on-site install with one accountable team.",
  },
];

// Decorative dots pattern background
function DecorativeDots() {
  return (
    <svg
      className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
      style={{ opacity: 0.04 }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="process-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#4A2364" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#process-dots)" />
    </svg>
  );
}

// Animated gold connector line between steps (desktop)
function GoldConnector({ isInView, delay }: { isInView: boolean; delay: number }) {
  return (
    <div className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-10">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        className="flex items-center"
      >
        {/* Gold line */}
        <div className="relative w-10 lg:w-14 h-[2px]">
          {/* Background track */}
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
          {/* Animated gold fill */}
          <motion.div
            className="absolute inset-y-0 left-0 right-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #4A2364, #D4AF37)',
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeInOut' }}
          />
          {/* Traveling dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.6)]"
            initial={{ left: '0%', opacity: 0 }}
            animate={isInView ? { left: '100%', opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 1.4, delay: delay + 0.6, ease: 'easeInOut' }}
          />
        </div>
        {/* Arrow head */}
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + 1.5 }}
        >
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-[#D4AF37] -ml-1" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Mobile vertical gold connector
function MobileGoldConnector({ isInView, delay }: { isInView: boolean; delay: number }) {
  return (
    <div className="md:hidden flex flex-col items-center py-3">
      <div className="relative w-[2px] h-10">
        {/* Track */}
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
        {/* Animated fill */}
        <motion.div
          className="absolute inset-x-0 top-0 bottom-0 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #4A2364, #D4AF37)',
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
      {/* Animated dot traveling down */}
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)] -mt-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.6 }}
      />
    </div>
  );
}

// Progress indicator step dot
function StepDot({ step, total, isActive, isInView }: { step: number; total: number; isActive: boolean; isInView: boolean }) {
  return (
    <div className="flex items-center gap-0">
      <motion.div
        className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
          isActive
            ? 'border-[#D4AF37] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
            : 'border-gray-300 dark:border-gray-600 bg-transparent'
        }`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: step * 0.2 }}
      />
      {step < total - 1 && (
        <motion.div
          className="w-8 h-[2px] rounded-full mx-1"
          style={{
            background: isActive
              ? 'linear-gradient(90deg, #D4AF37, #4A2364/30)'
              : 'linear-gradient(90deg, #e5e7eb, #e5e7eb)',
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: step * 0.2 + 0.3 }}
        />
      )}
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const cardDelays = [0, 0.15, 0.3];

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden dark:bg-[#121212] transition-colors duration-300" ref={sectionRef}>
      {/* Subtle gradient background - cream to slightly different cream */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background: 'linear-gradient(180deg, #F8F5F2 0%, #F5F1ED 50%, #F8F5F2 100%)',
        }}
      />

      {/* Decorative dots pattern */}
      <DecorativeDots />

      {/* Additional decorative geometric shape */}
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74,35,100,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Top right gold accent blob */}
      <div
        className="absolute -top-10 -right-10 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-xs tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4 font-sans-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            HOW A PROJECT UNFOLDS
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Three acts.{' '}
            <span className="text-[#4A2364] dark:text-[#6B3F8E]">One accountable team.</span>{' '}
            From brief to install.
          </motion.h2>

          {/* Animated progress indicator */}
          <motion.div
            className="flex items-center justify-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {acts.map((_, index) => (
              <StepDot
                key={index}
                step={index}
                total={acts.length}
                isActive={isInView}
                isInView={isInView}
              />
            ))}
          </motion.div>

          {/* Gold accent line under progress */}
          <motion.div
            className="mx-auto mt-4 h-[1px] w-24 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>

        {/* Three Cards with gold connectors */}
        <div className="relative">
          {/* Desktop layout: 3 columns with connectors */}
          <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 relative">
            {acts.map((act, index) => {
              const Icon = act.icon;
              return (
                <RevealOnScroll key={act.number} direction="up" delay={cardDelays[index]} duration={0.6}>
                  <div className="relative">
                    {/* Gold connector between cards on desktop */}
                    {index < acts.length - 1 && (
                      <GoldConnector isInView={isInView} delay={0.5 + index * 0.3} />
                    )}

                    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100 dark:border-gray-800 group relative overflow-hidden cursor-default transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      {/* Top gold accent line */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, #4A2364, #D4AF37, #4A2364)' }} />

                      {/* Left border accent on hover */}
                      <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:top-2 group-hover:bottom-2" />

                      {/* Shine sweep animation on view */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none z-10"
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '200%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 + index * 0.2, ease: 'easeInOut' }}
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)',
                          width: '50%',
                        }}
                      />
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4A2364]/[0.02] to-[#D4AF37]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="relative flex items-start gap-4 mb-6">
                        {/* Large number */}
                        <span
                          className="text-6xl lg:text-7xl font-bold font-serif-display leading-none select-none transition-all duration-500"
                          style={{
                            WebkitTextStroke: '1.5px rgba(74,35,100,0.15)',
                            color: 'transparent',
                          }}
                        >
                          <span
                            className="group-hover:text-[#4A2364] dark:group-hover:text-[#6B3F8E]"
                            style={{
                              transition: 'all 0.5s ease',
                            }}
                          >
                            <span className="group-hover:[-webkit-text-stroke-color:#4A2364] dark:group-hover:[-webkit-text-stroke-color:#6B3F8E]">
                              {act.number}
                            </span>
                          </span>
                        </span>
                        <div className="mt-2">
                          <div className="w-10 h-10 rounded-lg bg-[#4A2364]/5 dark:bg-[#4A2364]/10 flex items-center justify-center mb-3 group-hover:bg-[#4A2364]/15 dark:group-hover:bg-[#4A2364]/20 group-hover:scale-110 transition-all duration-300">
                            <Icon className="w-5 h-5 text-[#4A2364] dark:text-[#6B3F8E]" />
                          </div>
                          <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white font-sans-body">
                            {act.title}
                          </h3>
                        </div>
                      </div>
                      <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
                        {act.description}
                      </p>

                      {/* Bottom gold progress bar that fills on hover */}
                      <div className="mt-6 h-[2px] rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #4A2364, #D4AF37)' }}
                          initial={{ width: '0%' }}
                          whileInView={{ width: '40%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                        />
                        <div
                          className="h-full rounded-full -mt-[2px] transition-all duration-700 ease-out w-0 group-hover:w-full"
                          style={{ background: 'linear-gradient(90deg, #4A2364, #D4AF37)' }}
                        />
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Mobile layout: vertical with connectors */}
          <div className="md:hidden flex flex-col items-center">
            {acts.map((act, index) => {
              const Icon = act.icon;
              return (
                <RevealOnScroll key={act.number} direction="up" delay={cardDelays[index]} duration={0.6}>
                  <div className="w-full">
                    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 group relative overflow-hidden cursor-default transition-all duration-500 active:scale-[0.98]">
                      {/* Top gold accent line */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, #4A2364, #D4AF37, #4A2364)' }} />

                      {/* Shine sweep animation on view */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none z-10"
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '200%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 + index * 0.2, ease: 'easeInOut' }}
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)',
                          width: '50%',
                        }}
                      />

                      <div className="relative flex items-start gap-4 mb-4">
                        {/* Step number */}
                        <span
                          className="text-5xl font-bold font-serif-display leading-none select-none"
                          style={{
                            WebkitTextStroke: '1.5px rgba(74,35,100,0.15)',
                            color: 'transparent',
                          }}
                        >
                          <span className="text-[#4A2364]/30 dark:text-[#6B3F8E]/30">{act.number}</span>
                        </span>
                        <div className="mt-1">
                          <div className="w-9 h-9 rounded-lg bg-[#4A2364]/5 dark:bg-[#4A2364]/10 flex items-center justify-center mb-2">
                            <Icon className="w-4 h-4 text-[#4A2364] dark:text-[#6B3F8E]" />
                          </div>
                          <h3 className="text-base font-bold text-[#1A1A1A] dark:text-white font-sans-body">
                            {act.title}
                          </h3>
                        </div>
                      </div>
                      <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
                        {act.description}
                      </p>

                      {/* Bottom progress bar */}
                      <div className="mt-4 h-[2px] rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #4A2364, #D4AF37)' }}
                          initial={{ width: '0%' }}
                          whileInView={{ width: '50%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Mobile connector between cards */}
                    {index < acts.length - 1 && (
                      <MobileGoldConnector isInView={isInView} delay={0.5 + index * 0.3} />
                    )}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
