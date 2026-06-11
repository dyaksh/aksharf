'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const rowOneBrands = [
  'IHG',
  'Hilton',
  'Marriott',
  'Choice Hotels',
  'Wyndham',
  'Hyatt',
  'Best Western',
  'Radisson',
  'Accor',
  'InterContinental',
  'Crowne Plaza',
  'Holiday Inn',
];

const rowTwoBrands = [
  'Hampton',
  'Fairfield',
  'SpringHill',
  'Home2',
  'Homewood',
  'Candlewood',
  'TownePlace',
  'Comfort',
  'Country Inn',
  'Wingate',
  'La Quinta',
];

function BrandPill({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0">
      <div
        className="
          inline-flex items-center justify-center
          px-5 py-2.5 sm:px-6 sm:py-3
          rounded-full
          border border-[#4A2364]/15 dark:border-[#D4AF37]/25
          bg-[#F8F5F2]/60 dark:bg-[#1E1E2A]/80
          backdrop-blur-sm
          transition-colors duration-300
          hover:border-[#4A2364]/40 dark:hover:border-[#D4AF37]/50
          hover:bg-[#F8F5F2] dark:hover:bg-[#1E1E2A]
          group cursor-default select-none
        "
      >
        <span
          className="
            font-sans-body text-sm sm:text-base font-medium
            text-[#4A2364]/75 dark:text-[#D4AF37]/80
            tracking-wide uppercase
            transition-colors duration-300
            group-hover:text-[#4A2364] dark:group-hover:text-[#D4AF37]
            whitespace-nowrap
          "
        >
          {name}
        </span>
      </div>
    </div>
  );
}

export default function BrandMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full py-16 sm:py-20 md:py-24
        bg-white dark:bg-[#121212]
        overflow-hidden
      "
    >
      {/* Subtle top/bottom border accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A2364]/10 dark:via-[#D4AF37]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A2364]/10 dark:via-[#D4AF37]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <p
            className="
              font-sans-body text-xs sm:text-sm
              text-[#D4AF37] dark:text-[#D4AF37]
              tracking-[0.2em] sm:tracking-[0.25em] uppercase
              font-semibold
            "
          >
            Trusted by Leading Hospitality Brands
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="block h-px w-8 sm:w-12 bg-[#D4AF37]/40 dark:bg-[#D4AF37]/30" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 dark:bg-[#D4AF37]/50" />
            <span className="block h-px w-8 sm:w-12 bg-[#D4AF37]/40 dark:bg-[#D4AF37]/30" />
          </div>
        </motion.div>
      </div>

      {/* Marquee rows container with hover-to-pause */}
      <div
        className="space-y-4 sm:space-y-5 md:space-y-6"
        onMouseEnter={(e) => {
          const rows = e.currentTarget.querySelectorAll<HTMLDivElement>('[data-marquee-row]');
          rows.forEach((row) => {
            row.style.animationPlayState = 'paused';
          });
        }}
        onMouseLeave={(e) => {
          const rows = e.currentTarget.querySelectorAll<HTMLDivElement>('[data-marquee-row]');
          rows.forEach((row) => {
            row.style.animationPlayState = 'running';
          });
        }}
      >
        {/* Row 1 — scrolls left (brands enter from right, move left) */}
        <div className="relative overflow-hidden">
          {/* Left gradient fade */}
          <div
            className="
              absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 md:w-32
              bg-gradient-to-r from-white dark:from-[#121212] to-transparent
              pointer-events-none
            "
          />
          {/* Right gradient fade */}
          <div
            className="
              absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 md:w-32
              bg-gradient-to-l from-white dark:from-[#121212] to-transparent
              pointer-events-none
            "
          />

          <div
            data-marquee-row
            className="flex gap-4 sm:gap-5 md:gap-6 w-max"
            style={{
              animation: 'marquee-scroll-left 35s linear infinite',
            }}
          >
            {[...rowOneBrands, ...rowOneBrands, ...rowOneBrands, ...rowOneBrands].map(
              (brand, index) => (
                <BrandPill key={`r1-${brand}-${index}`} name={brand} />
              )
            )}
          </div>
        </div>

        {/* Row 2 — scrolls right (brands enter from left, move right) */}
        <div className="relative overflow-hidden">
          {/* Left gradient fade */}
          <div
            className="
              absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 md:w-32
              bg-gradient-to-r from-white dark:from-[#121212] to-transparent
              pointer-events-none
            "
          />
          {/* Right gradient fade */}
          <div
            className="
              absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 md:w-32
              bg-gradient-to-l from-white dark:from-[#121212] to-transparent
              pointer-events-none
            "
          />

          <div
            data-marquee-row
            className="flex gap-4 sm:gap-5 md:gap-6 w-max"
            style={{
              animation: 'marquee-scroll-right 38s linear infinite',
            }}
          >
            {[...rowTwoBrands, ...rowTwoBrands, ...rowTwoBrands, ...rowTwoBrands].map(
              (brand, index) => (
                <BrandPill key={`r2-${brand}-${index}`} name={brand} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
