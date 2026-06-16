'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PenTool, Factory, CheckCircle, Truck } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import ConcentricCircles3D from '@/components/sections/ConcentricCircles3D';

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const processSteps = [
  { icon: PenTool, title: 'Design', description: 'Translate brand standards into precise FF&E specifications and technical drawings.' },
  { icon: Factory, title: 'Manufacture', description: 'Mill, upholster, finish and assemble every piece in our Foshan workshops.' },
  { icon: CheckCircle, title: 'QC', description: 'Multi-stage inspection from raw materials through production to final packaging.' },
  { icon: Truck, title: 'Deliver', description: 'Consolidate, document and install on-site — FOB or DDP, one accountable team.' },
];

/* ═══════════════════════════════════════════════════════
   CONCENTRIC CIRCLES — now in ConcentricCircles3D.tsx
   ═══════════════════════════════════════════════════════ */

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

        <ConcentricCircles3D />
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
