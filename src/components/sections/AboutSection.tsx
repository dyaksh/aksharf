'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Handshake, Sparkles, Lightbulb, Quote } from 'lucide-react';
import Image from 'next/image';

const values = [
  {
    icon: Shield,
    title: 'Quality',
    description:
      'Every piece is crafted to the highest hospitality standards, rigorously inspected before it leaves our facilities.',
  },
  {
    icon: Handshake,
    title: 'Reliability',
    description:
      'On-time delivery and consistent quality — we understand that project timelines in hospitality are non-negotiable.',
  },
  {
    icon: Sparkles,
    title: 'Service',
    description:
      'Client-centric approach from first contact to final install. One dedicated team, one accountable partner.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Continuously refining materials, processes, and designs to exceed evolving brand standards and guest expectations.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about-brand"
      className="relative py-20 lg:py-32 overflow-hidden bg-white"
      ref={sectionRef}
    >
      {/* Subtle dot grid texture overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.025 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="about-dots"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#4A2364" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-dots)" />
      </svg>

      {/* Decorative geometric shapes */}
      <div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,35,100,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] mb-4 font-sans-body">
            OUR STORY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] max-w-3xl mx-auto">
            Built on <span className="text-[#4A2364]">trust</span>, defined by{' '}
            <span className="text-[#D4AF37]">excellence</span>.
          </h2>
        </motion.div>

        {/* Split Layout: Brand Story */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
          {/* Left: Brand Story Text */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Purple accent line */}
            <div className="absolute -left-4 lg:-left-6 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#4A2364] via-[#4A2364]/50 to-transparent" />

            {/* Quote decoration */}
            <div className="mb-6">
              <Quote className="w-8 h-8 text-[#D4AF37]/40" />
            </div>

            <p className="text-base text-gray-600 leading-relaxed font-sans-body mb-6">
              Akshar Hospitality serves as the exclusive international sales and
              project management arm for our strategic hospitality furniture
              manufacturing partner based in Foshan, China and there are more
              than 13 cooperated facilities located in China mainland.
            </p>

            {/* Brand Definition */}
            <div className="bg-[#F8F5F2] rounded-2xl p-6 mb-6 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 z-0">
                <div className="w-12 h-12">
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[48px] border-l-transparent border-t-[48px] border-t-[#D4AF37]/20" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-xs tracking-[0.2em] text-[#4A2364] font-sans-body font-bold mb-3">
                  BRAND DEFINITION
                </p>
                <p className="text-sm text-gray-600 leading-relaxed font-sans-body">
                  <span className="text-[#4A2364] font-bold font-serif-display text-lg">
                    &ldquo;Akshar&rdquo;
                  </span>{' '}
                  combines stability and high quality of hotel furniture and
                  fixtures — a name that reflects our unwavering commitment to
                  precision craftsmanship and lasting durability.
                </p>
              </div>
            </div>

            {/* Mission & Values */}
            <div className="relative">
              <div className="w-8 h-[2px] bg-[#D4AF37] mb-4" />
              <p className="text-xs tracking-[0.2em] text-gray-400 font-sans-body font-bold mb-3">
                MISSION & VALUES
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-sans-body">
                Our mission is to optimize hospitality supply chains by providing
                reliable, well-crafted furniture and exceptional, client-centric
                service.
              </p>
            </div>
          </motion.div>

          {/* Right: Catalog Images */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
                {/* Gold border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37]/30 pointer-events-none z-10" />
                {/* Gold accent corner */}
                <div className="absolute top-0 right-0 z-10">
                  <div className="w-16 h-16">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[64px] border-l-transparent border-t-[64px] border-t-[#D4AF37]" />
                    <div className="absolute top-2 right-2 w-0 h-0 border-l-[48px] border-l-transparent border-t-[48px] border-t-white/90" />
                  </div>
                </div>
                <Image
                  src="/catalog-pages/page_2.png"
                  alt="Akshar Hospitality - Manufacturing Excellence"
                  width={600}
                  height={350}
                  className="w-full h-56 lg:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2364]/20 to-transparent pointer-events-none" />
              </div>

              {/* Second image - offset slightly */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg ml-8 lg:ml-12 -mt-4">
                <div className="absolute inset-0 rounded-2xl border-2 border-[#4A2364]/20 pointer-events-none z-10" />
                {/* Purple accent corner */}
                <div className="absolute bottom-0 left-0 z-10">
                  <div className="w-12 h-12">
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[48px] border-r-transparent border-b-[48px] border-b-[#4A2364]/60" />
                    <div className="absolute bottom-2 left-2 w-0 h-0 border-r-[36px] border-r-transparent border-b-[36px] border-b-white/90" />
                  </div>
                </div>
                <Image
                  src="/catalog-pages/page_3.png"
                  alt="Akshar Hospitality - Product Range"
                  width={500}
                  height={280}
                  className="w-full h-48 lg:h-60 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2364]/15 to-transparent pointer-events-none" />
              </div>

              {/* Decorative floating shape */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-[#D4AF37]/20 rounded-xl rotate-12 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-[#4A2364]/15 rounded-lg -rotate-12 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-[#4A2364] mb-3 font-sans-body">
              CLIENT-CENTRIC VALUES
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#1A1A1A]">
              What drives every decision we make.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="relative bg-[#F8F5F2] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 group overflow-hidden cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A2364] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px] bg-gradient-to-br from-[#4A2364] via-[#D4AF37] to-[#4A2364]">
                    <div className="w-full h-full bg-[#F8F5F2] rounded-[14px]" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#4A2364] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#4A2364] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="text-base font-bold text-[#1A1A1A] font-sans-body mb-2">
                      {value.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans-body">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
