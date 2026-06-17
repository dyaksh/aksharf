'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/* ── Main section ───────────────────────────────────────────── */
export default function PartnersTrust() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative w-full py-12 lg:py-16 bg-[#f8f3ed] overflow-hidden"
    >
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-8 lg:mb-10"
        >
          <p className="font-sans-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-3">
            TRUSTED BY HOSPITALITY LEADERS
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-display text-[#1A1A1A] leading-tight">
            Our <span className="text-[#5d2c86] italic">Clients</span>
          </h2>
        </motion.div>

        {/* ── Client Logo Banner ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative w-full"
        >
          <div className="relative w-full bg-white/60 rounded-xl p-4 sm:p-6 lg:p-8">
            <Image
              src="/images/clients-reference.png"
              alt="Our hospitality clients — IHG, Hilton, Marriott, Choice Hotels, Wyndham, Hyatt, Best Western, Radisson and more"
              width={1623}
              height={256}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
