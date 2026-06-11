'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Sofa, Frame, Building2, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const sections: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: Building2 },
  { id: 'portfolio', label: 'Portfolio', icon: Frame },
  { id: 'services', label: 'Services', icon: Sofa },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Track active section from URL hash
  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveSection(hash);
    };
    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);
    return () => window.removeEventListener('hashchange', updateFromHash);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    window.location.hash = id;
  }, []);

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-stretch gap-1 rounded-2xl p-2 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-lg"
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredItem === section.id;
        const Icon = section.icon;

        return (
          <div key={section.id} className="relative flex items-center">
            {/* Tooltip label that slides out to the left */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.div
                  className="absolute right-full mr-3 whitespace-nowrap flex items-center"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {/* Connecting line */}
                  <div className="w-3 h-[1px] bg-[#5d2c86]/30 dark:bg-[#7d44a8]/30" />
                  <span className="rounded-md px-2.5 py-1 bg-white dark:bg-[#2A2A2A] text-[#5d2c86] dark:text-[#D4AF37] font-sans-body text-[10px] tracking-wider font-medium shadow-sm border border-gray-200/50 dark:border-white/10">
                    {section.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active item tooltip with gold dot */}
            <AnimatePresence>
              {isActive && !isHovered && (
                <motion.div
                  className="absolute right-full mr-3 whitespace-nowrap flex items-center"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {/* Connecting line */}
                  <div className="w-3 h-[1px] bg-[#5d2c86]/40 dark:bg-[#7d44a8]/40" />
                  {/* Gold dot indicator */}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-1.5 shrink-0" />
                  <span className="rounded-md px-2.5 py-1 bg-[#5d2c86] text-white font-sans-body text-[10px] tracking-wider font-bold shadow-sm">
                    {section.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pill button */}
            <button
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredItem(section.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex items-center justify-center rounded-lg px-2.5 py-1.5 text-[10px] tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isActive
                  ? 'bg-[#5d2c86] text-white font-bold'
                  : 'text-gray-400 hover:text-[#5d2c86] dark:hover:text-[#7d44a8] hover:bg-[#5d2c86]/5 dark:hover:bg-[#7d44a8]/5 font-medium'
              }`}
              aria-label={`Navigate to ${section.label} section`}
              aria-current={isActive ? 'true' : undefined}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </nav>
  );
}
