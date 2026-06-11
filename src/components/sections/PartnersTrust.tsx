'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Factory, KeyRound, Globe, ShieldCheck } from 'lucide-react';

const partners = [
  'IHG', 'Hilton', 'Marriott', 'Choice Hotels',
  'Wyndham', 'Hyatt', 'Best Western', 'Radisson',
  'Accor', 'InterContinental', 'Crowne Plaza', 'Holiday Inn',
];

const stats = [
  { value: 13, suffix: '+', label: 'Manufacturing Facilities', icon: Factory },
  { value: 240, suffix: '+', label: 'Hotel Keys Delivered', icon: KeyRound },
  { value: 5, suffix: '+', label: 'Continents Served', icon: Globe },
  { value: 100, suffix: '%', label: 'Inspection Pass Rate', icon: ShieldCheck },
];

/* ── Count-up hook ────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ── Single stat counter ──────────────────────────────────── */
function StatCounter({
  value,
  suffix,
  label,
  icon: Icon,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  inView: boolean;
}) {
  const count = useCountUp(value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#4A2364]/10 dark:bg-[#D4AF37]/10 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-[#4A2364] dark:text-[#D4AF37]" />
      </div>
      <span className="text-3xl sm:text-4xl font-bold font-serif-display text-[#1A1A1A] dark:text-white">
        {count}
        <span className="text-[#D4AF37]">{suffix}</span>
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 font-sans-body mt-1">{label}</span>
    </motion.div>
  );
}

/* ── Shimmer overlay ──────────────────────────────────────── */
function ShimmerOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 animate-[shimmer-sweep_6s_ease-in-out_infinite]"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.06) 45%, rgba(212,175,55,0.10) 50%, rgba(212,175,55,0.06) 55%, transparent 60%)',
        }}
      />
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────── */
export default function PartnersTrust() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-white dark:bg-[#121212] overflow-hidden transition-colors duration-300"
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #4A2364 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      {/* Shimmer sweep */}
      <ShimmerOverlay />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-14 lg:mb-20"
        >
          <p className="font-sans-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#D4AF37] mb-4">
            TRUSTED BY HOSPITALITY LEADERS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight">
            Partnered with the world&apos;s{' '}
            <span className="text-[#D4AF37] italic">finest brands</span>
          </h2>
        </motion.div>

        {/* ── Logo wall ──────────────────────────────────── */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-4xl mx-auto mb-16 lg:mb-24">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0.95 }
              }
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: 'easeOut',
              }}
              className="group"
            >
              <div
                className="
                  relative flex items-center justify-center
                  bg-[#F8F5F2]/50 dark:bg-[#1E1E1E]
                  rounded-xl border border-gray-200/60 dark:border-gray-700/40
                  hover:border-[#D4AF37]/60 dark:hover:border-[#D4AF37]/50
                  hover:shadow-lg hover:shadow-[#D4AF37]/10
                  hover:-translate-y-1
                  transition-all duration-300 ease-out
                  py-6 sm:py-8 px-4
                  cursor-default select-none
                "
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow:
                      '0 0 24px 2px rgba(212,175,55,0.12), inset 0 0 12px rgba(212,175,55,0.06)',
                  }}
                  aria-hidden
                />
                <span
                  className="
                    font-sans-body text-sm sm:text-base font-semibold
                    tracking-wide uppercase text-center
                    text-[#4A2364]/80 dark:text-white/70
                    group-hover:text-[#4A2364] dark:group-hover:text-[#D4AF37]
                    group-hover:scale-105
                    transition-all duration-300
                  "
                >
                  {name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats row ──────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 max-w-4xl mx-auto">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} inView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
