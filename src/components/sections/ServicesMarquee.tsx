'use client';

import { motion } from 'framer-motion';

const services = [
  'DESIGN & BUDGET CONSULTING',
  'SOURCING & PROCUREMENT',
  'FF&E PACKAGE MANAGEMENT',
  'QUALITY CONTROL',
  'FACTORY INSPECTION',
  'FOB / DDP LOGISTICS',
  'APPROVAL SUPPORT',
  'WARRANTY COORDINATION',
];

export default function ServicesMarquee() {
  // Duplicate items for seamless loop
  const items = [...services, ...services, ...services];

  return (
    <section
      className="relative bg-[#5d2c86] dark:bg-[#3d1c5a] overflow-hidden py-4"
      aria-label="Akshar Foshan services marquee"
    >
      {/* Subtle gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      {/* Subtle gold line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-8 shrink-0"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {items.map((service, i) => (
            <span
              key={`${service}-${i}`}
              className="inline-flex items-center gap-3 text-white/80 font-sans-body text-xs sm:text-sm tracking-[0.15em] font-medium"
            >
              <span className="text-[#D4AF37] text-[8px]">◆</span>
              {service}
              <span className="text-[#D4AF37]/50 text-[8px]">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
