'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sofa, Lamp, Bath, Package, ShieldCheck, Frame, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Sofa,
    title: 'Casegoods & Upholstery',
    description:
      'Full range of hotel casegoods, headboards, desks, and upholstered seating crafted to brand specifications.',
  },
  {
    icon: Lamp,
    title: 'Lighting & Mirrors',
    description:
      'Custom lighting solutions and mirrors designed to complement each property\'s unique aesthetic.',
  },
  {
    icon: Bath,
    title: 'Bathroom Accessories',
    description:
      'Complete bathroom FF&E packages including vanities, accessories, and hardware.',
  },
  {
    icon: Package,
    title: 'Sourcing & Logistics',
    description:
      'End-to-end supply chain management from raw materials to on-site delivery and installation.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Control',
    description:
      'Rigorous inspection at every stage — from raw material through production to final packaging.',
  },
  {
    icon: Frame,
    title: 'Art & Decor',
    description:
      'Curated art programs and decorative accessories that bring each hotel\'s brand story to life.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="bg-[#F8F5F2] dark:bg-[#121212] py-20 lg:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column - Slides in from left */}
          <motion.div
            className="lg:w-5/12 relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Decorative purple accent line on left side */}
            <div className="absolute -left-4 lg:-left-6 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#4A2364] via-[#4A2364]/50 to-transparent" />

            <p className="text-xs tracking-[0.3em] text-gray-400 mb-4 font-sans-body">
              WHAT WE COVER
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-6">
              <span className="text-[#4A2364] dark:text-[#6B3F8E]">360° FF&E support</span>, under one roof.
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 font-sans-body">
              From concept sketches to on-site install, every FF&E need is handled by our
              integrated team — no gaps, no finger-pointing, just one accountable partner.
            </p>

            {/* Workshop Image with Gold Accent Corner */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {/* Gold accent corner - top right */}
              <div className="absolute top-0 right-0 z-10">
                <div className="w-16 h-16">
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[64px] border-l-transparent border-t-[64px] border-t-[#D4AF37]" />
                  <div className="absolute top-2 right-2 w-0 h-0 border-l-[48px] border-l-transparent border-t-[48px] border-t-white/90" />
                </div>
              </div>
              {/* Gold accent corner - bottom left */}
              <div className="absolute bottom-0 left-0 z-10">
                <div className="w-16 h-16">
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[64px] border-r-transparent border-b-[64px] border-b-[#D4AF37]" />
                  <div className="absolute bottom-2 left-2 w-0 h-0 border-r-[48px] border-r-transparent border-b-[48px] border-b-white/90" />
                </div>
              </div>
              {/* Gold border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37]/30 pointer-events-none z-10" />
              <img
                src="/catalog-pages/page_5.png"
                alt="Akshar Foshan Workshop"
                className="w-full h-48 lg:h-64 object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2364]/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column - Slides in from right */}
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
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="relative bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 dark:border-gray-800 group overflow-hidden"
                  >
                    {/* Gradient border effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px] bg-gradient-to-br from-[#4A2364] via-[#D4AF37] to-[#4A2364]">
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
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4A2364]/10 to-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:from-[#4A2364]/20 group-hover:to-[#D4AF37]/20 transition-all duration-300">
                        <Icon className="w-5 h-5 text-[#4A2364] group-hover:text-[#4A2364] transition-colors" />
                      </div>
                      <h3 className="text-base font-bold text-[#1A1A1A] dark:text-white font-sans-body mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans-body mb-3">
                        {service.description}
                      </p>

                      {/* Learn more link - appears on hover */}
                      <div className="flex items-center gap-1 text-[#4A2364] text-xs font-sans-body font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Learn more
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
