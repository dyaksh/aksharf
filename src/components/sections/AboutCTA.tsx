'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Factory, Shield, Globe2 } from 'lucide-react';
import Image from 'next/image';

export default function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Parallax for the image
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3d1c5a 0%, #5d2c86 40%, #4a1f6e 100%)',
      }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Animated decorative border — top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ x: '-100%' }}
          whileInView={{ x: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          className="h-full w-1/2"
          style={{
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }}
        />
      </div>

      {/* Animated decorative border — bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ x: '100%' }}
          whileInView={{ x: '-100%' }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
          className="h-full w-1/2"
          style={{
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image with parallax */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/30">
              <motion.div style={{ y: imageY }} className="relative w-full h-full">
                <Image
                  src="/images/about/about-small.jpeg"
                  alt="Akshar Foshan manufacturing excellence"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
              {/* Purple tint overlay */}
              <div className="absolute inset-0 bg-[#5d2c86]/15" />
            </div>

            {/* Gold accent corner */}
            <div
              className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating mini stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-4 -right-2 sm:-right-4 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl px-4 py-3 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-lg font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight">
                    100%
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-sans-body leading-tight">
                    Pass Rate
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#D4AF37] mb-4 font-sans-body"
            >
              About Akshar Foshan
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-white leading-tight mb-6"
            >
              Built on Trust,{' '}
              <span className="text-[#D4AF37] italic">Driven by Craft</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-16 h-[2px] bg-[#D4AF37] mb-6 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-white/80 font-sans-body leading-relaxed mb-5"
            >
              From our manufacturing hub in Foshan, China, we deliver complete FF&amp;E
              solutions to the world&apos;s finest hotel brands. Vertically integrated,
              quality-obsessed, and always on schedule.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base sm:text-lg text-white/70 font-sans-body leading-relaxed mb-8"
            >
              Every piece is crafted by skilled artisans, inspected against the
              highest hospitality standards, and shipped with precision logistics
              — because your guests deserve perfection.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 sm:gap-6 mb-8"
            >
              {[
                { icon: Factory, value: '13+', label: 'Facilities' },
                { icon: Globe2, value: '5+', label: 'Continents' },
                { icon: Shield, value: '100%', label: 'Pass Rate' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-sans-body text-white/80">
                    <span className="font-bold text-white">{stat.value}</span>{' '}
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <a
                href="#about"
                className="group inline-flex items-center gap-2 bg-[#D4AF37] text-[#1A1A1A] font-semibold font-sans-body px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base hover:bg-[#c9a02e] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
