'use client';

import { FileText, Hammer, Truck, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

// Connecting arrow between cards (desktop only)
function ConnectingArrow() {
  return (
    <div className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-10">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center"
      >
        <div className="w-8 h-[2px] bg-gradient-to-r from-[#4A2364]/30 to-[#D4AF37]/30" />
        <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 -ml-1" />
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden dark:bg-[#121212]" ref={sectionRef}>
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
        </div>

        {/* Three Cards with connecting arrows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {acts.map((act, index) => {
            const Icon = act.icon;
            return (
              <div key={act.number} className="relative">
                {/* Mobile timeline line connector */}
                {index < acts.length - 1 && (
                  <div className="md:hidden flex flex-col items-center absolute left-1/2 -translate-x-1/2 -bottom-3 translate-y-full z-10 h-6">
                    <div className="flex-1 w-[2px] bg-gradient-to-b from-[#4A2364]/30 to-[#D4AF37]/30" />
                    <ArrowRight className="w-3 h-3 text-[#D4AF37]/50 rotate-90 -mt-1" />
                  </div>
                )}
                {/* Connecting arrow between cards on desktop */}
                {index < acts.length - 1 && (
                  <div className="hidden md:block absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                      className="flex items-center"
                    >
                      <div className="w-6 lg:w-8 h-[2px] bg-gradient-to-r from-[#4A2364]/30 to-[#D4AF37]/30" />
                      <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 -ml-1" />
                    </motion.div>
                  </div>
                )}

                <motion.div
                  className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100 dark:border-gray-800 group relative overflow-hidden cursor-default transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-l-[3px] hover:border-l-[#4A2364] dark:hover:border-l-[#6B3F8E]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                >
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
                    {/* Large number - outlined by default, filled purple on hover */}
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
                      <div className="w-10 h-10 rounded-lg bg-[#4A2364]/5 flex items-center justify-center mb-3 group-hover:bg-[#4A2364]/10 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[#4A2364]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white font-sans-body">
                        {act.title}
                      </h3>
                    </div>
                  </div>
                  <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body">
                    {act.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
