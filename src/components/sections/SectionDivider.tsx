'use client';

import { motion } from 'framer-motion';

type DividerVariant = 'wave' | 'angled' | 'curve';

interface SectionDividerProps {
  fromBg: string;
  toBg: string;
  variant?: DividerVariant;
}

const dividerPaths: Record<DividerVariant, string> = {
  wave: 'M0,40 C120,10 240,70 360,40 C480,10 600,70 720,40 C840,10 960,70 1080,40 C1200,10 1320,70 1440,40',
  angled: 'M0,50 L480,20 L960,50 L1440,20',
  curve: 'M0,50 Q360,10 720,50 Q1080,90 1440,50',
};

const accentPaths: Record<DividerVariant, string> = {
  wave: 'M0,40 C120,10 240,70 360,40 C480,10 600,70 720,40 C840,10 960,70 1080,40 C1200,10 1320,70 1440,40',
  angled: 'M0,50 L480,20 L960,50 L1440,20',
  curve: 'M0,50 Q360,10 720,50 Q1080,90 1440,50',
};

function getAccentColor(fromBg: string, toBg: string): string {
  const isLight = (c: string) => {
    const hex = c.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };

  // Always use purple (#5d2c86) as accent
  return '#5d2c86';
}

export default function SectionDivider({ fromBg, toBg, variant = 'wave' }: SectionDividerProps) {
  const path = dividerPaths[variant];
  const accentPath = accentPaths[variant];
  const accentColor = getAccentColor(fromBg, toBg);

  return (
    <div
      className="relative w-full h-24 md:h-28 overflow-hidden -my-px"
      style={{ background: `linear-gradient(to bottom, ${fromBg}, ${toBg})` }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Filled shape for smooth color transition */}
        <path
          d={path + ' L1440,100 L0,100 Z'}
          fill={toBg}
          fillOpacity={0.4}
        />
        <path
          d={path + ' L0,0 L1440,0 Z'}
          fill={fromBg}
          fillOpacity={0.4}
        />

        {/* Gradient glow behind the accent line */}
        <motion.path
          d={accentPath}
          stroke={accentColor}
          strokeWidth={8}
          strokeOpacity={0.08}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Primary decorative accent line with draw-in animation */}
        <motion.path
          d={accentPath}
          stroke={accentColor}
          strokeWidth={2.5}
          strokeOpacity={0.7}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Decorative dots at wave peaks */}
        <motion.circle
          cx="360" cy="40" r="3"
          fill={accentColor}
          fillOpacity={0}
          initial={{ fillOpacity: 0, scale: 0 }}
          whileInView={{ fillOpacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.2 }}
        />
        <motion.circle
          cx="720" cy="40" r="3"
          fill={accentColor}
          fillOpacity={0}
          initial={{ fillOpacity: 0, scale: 0 }}
          whileInView={{ fillOpacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.4 }}
        />
        <motion.circle
          cx="1080" cy="40" r="3"
          fill={accentColor}
          fillOpacity={0}
          initial={{ fillOpacity: 0, scale: 0 }}
          whileInView={{ fillOpacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.6 }}
        />
      </svg>
    </div>
  );
}
