'use client';

import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, Leaf, BadgeCheck, FileCheck, Badge, ArrowRight } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface Certification {
  icon: LucideIcon;
  title: string;
  description: string;
}

const certifications: Certification[] = [
  {
    icon: Shield,
    title: 'ISO 9001:2015',
    description:
      'Quality Management System certification ensuring consistent quality across all manufacturing processes.',
  },
  {
    icon: Leaf,
    title: 'ISO 14001:2015',
    description:
      'Environmental Management System certification demonstrating our commitment to sustainable manufacturing.',
  },
  {
    icon: CheckCircle,
    title: 'BIFMA Certification',
    description:
      "Business and Institutional Furniture Manufacturers Association standards compliance for commercial-grade furniture.",
  },
  {
    icon: Award,
    title: 'SGS Tested',
    description:
      "Independent testing and verification by SGS, the world's leading inspection and certification company.",
  },
  {
    icon: BadgeCheck,
    title: 'Intertek Certified',
    description:
      "Product safety and quality certification from Intertek's global network of testing laboratories.",
  },
  {
    icon: FileCheck,
    title: 'FSC Certified',
    description:
      'Forest Stewardship Council certification ensuring responsible sourcing of wood materials.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="relative bg-white dark:bg-[#121212] py-20 lg:py-28 overflow-hidden transition-colors duration-300"
    >
      {/* Decorative dot pattern background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute top-1/4 left-4 opacity-[0.03] dark:opacity-[0.06]"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <circle
              key={`dot-tl-${i}`}
              cx={(i % 6) * 24}
              cy={Math.floor(i / 6) * 24}
              r="2"
              fill="#5d2c86"
            />
          ))}
        </svg>
        <svg
          className="absolute bottom-1/4 right-4 opacity-[0.03] dark:opacity-[0.06]"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <circle
              key={`dot-br-${i}`}
              cx={(i % 6) * 24}
              cy={Math.floor(i / 6) * 24}
              r="2"
              fill="#5d2c86"
            />
          ))}
        </svg>

        {/* Gradient orbs */}
        <div className="absolute top-16 right-16 w-72 h-72 rounded-full bg-[#5d2c86]/[0.03] dark:bg-[#5d2c86]/[0.08] blur-3xl" />
        <div className="absolute bottom-16 left-16 w-56 h-56 rounded-full bg-[#D4AF37]/[0.04] dark:bg-[#D4AF37]/[0.06] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 lg:mb-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] mb-4 font-sans-body font-medium">
            CERTIFICATIONS &amp; STANDARDS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-4">
            Quality that meets{' '}
            <span className="text-[#D4AF37] italic">global standards</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-sans-body text-lg max-w-xl mx-auto">
            Every product is backed by internationally recognized certifications and rigorous quality assurance.
          </p>
        </motion.div>

        {/* Certification Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={cert.title}
                variants={cardVariants}
                className="group relative rounded-2xl p-[1px] cursor-default"
              >
                {/* Animated conic-gradient border on hover */}
                <div
                  className="award-card-border absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from var(--border-angle, 0deg), #5d2c86, #D4AF37, #7d44a8, #D4AF37, #5d2c86)',
                  }}
                />
                {/* Inner card content */}
                <div className="relative bg-[#f8f3ed]/60 dark:bg-[#1A1A1A]/80 rounded-2xl p-6 h-full border border-gray-100 dark:border-gray-800/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Gold top border accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

                  {/* Number badge in top-left corner */}
                  <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-[#5d2c86]/10 dark:bg-[#5d2c86]/20 flex items-center justify-center">
                    <span className="text-[10px] font-bold font-sans-body text-[#5d2c86] dark:text-[#7d44a8]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Verified badge in corner */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#D4AF37]/15 px-2.5 py-1 rounded-full transition-all duration-300 group-hover:shadow-sm group-hover:shadow-[#D4AF37]/20">
                    <motion.div
                      className="group-hover:hidden"
                    >
                      <Badge className="w-3 h-3 text-[#D4AF37]" />
                    </motion.div>
                    <motion.div
                      className="hidden group-hover:block"
                    >
                      <CheckCircle className="w-3 h-3 text-[#D4AF37]" />
                    </motion.div>
                    <span className="text-[10px] font-medium text-[#D4AF37] font-sans-body tracking-wide">
                      Verified
                    </span>
                  </div>

                  {/* Icon with floating effect on hover */}
                  <div className="w-14 h-14 rounded-xl bg-[#5d2c86]/10 dark:bg-[#5d2c86]/20 flex items-center justify-center mb-5 group-hover:bg-[#5d2c86]/20 dark:group-hover:bg-[#5d2c86]/30 transition-all duration-300 group-hover:-translate-y-0.5">
                    <IconComponent className="w-7 h-7 text-[#5d2c86] dark:text-[#7d44a8]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-2">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans-body leading-relaxed mb-3">
                    {cert.description}
                  </p>

                  {/* Learn more link - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#D4AF37] font-sans-body hover:gap-2 transition-all duration-300">
                      Learn more
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-[#5d2c86]/[0.06] dark:bg-[#5d2c86]/[0.12] rounded-full px-6 py-3">
            <Shield className="w-5 h-5 text-[#5d2c86] dark:text-[#7d44a8]" />
            <p className="text-sm font-medium font-sans-body text-[#5d2c86] dark:text-[#7d44a8]">
              All products undergo rigorous third-party testing and certification
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
