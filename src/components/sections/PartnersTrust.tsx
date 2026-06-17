'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/* ── Brand Logo Data ─────────────────────────────────────────── */
const partners = [
  {
    name: 'IHG',
    logo: '/images/brands/brand-logo-3.png',
    alt: 'IHG Hotels and Resorts logo',
  },
  {
    name: 'Hilton',
    logo: '/images/brands/brand-logo-4.png',
    alt: 'Hilton Hotels and Resorts logo',
  },
  {
    name: 'Marriott',
    logo: '/images/brands/brand-logo-5.png',
    alt: 'Marriott International logo',
  },
  {
    name: 'Choice Hotels',
    logo: '/images/brands/brand-logo-6.png',
    alt: 'Choice Hotels logo',
  },
  {
    name: 'Wyndham',
    logo: '/images/brands/brand-logo-7.png',
    alt: 'Wyndham Hotels and Resorts logo',
  },
  {
    name: 'Hyatt',
    logo: '/images/brands/brand-logo-8.png',
    alt: 'Hyatt Hotels logo',
  },
  {
    name: 'Best Western',
    logo: '/images/brands/brand-logo-9.png',
    alt: 'Best Western Hotels logo',
  },
  {
    name: 'Radisson',
    logo: '/images/brands/brand-logo-10.png',
    alt: 'Radisson Hotels logo',
  },
];

/* ── Main section ───────────────────────────────────────────── */
export default function PartnersTrust() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-20 bg-[#f8f3ed] overflow-hidden"
    >
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-10 lg:mb-14"
        >
          <p className="font-sans-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-3">
            TRUSTED BY HOSPITALITY LEADERS
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-display text-[#1A1A1A] leading-tight">
            Our <span className="text-[#5d2c86] italic">Clients</span>
          </h2>
        </motion.div>

        {/* ── Logo wall — clean grid ────────────────────── */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 sm:gap-5 lg:gap-6 max-w-4xl mx-auto">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: 'easeOut',
              }}
              className="group flex items-center justify-center"
            >
              <div
                className="
                  relative flex items-center justify-center
                  bg-white/60 rounded-lg
                  hover:bg-white hover:shadow-md
                  hover:-translate-y-0.5
                  transition-all duration-300 ease-out
                  p-3 sm:p-4
                  w-full aspect-square
                "
              >
                {/* Real Brand Logo Image */}
                <div className="relative w-full h-8 sm:h-10">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    fill
                    className="object-contain transition-all duration-300 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                    sizes="(max-width: 640px) 80px, 100px"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
