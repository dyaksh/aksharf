'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'catalog', label: 'Catalog' },
  { id: 'contact', label: 'Contact' },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  // IntersectionObserver for scroll spy
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-5 backdrop-blur-md bg-white/30 dark:bg-white/5 rounded-full px-2.5 py-5 border border-white/20 dark:border-white/10 shadow-sm"
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredDot === section.id;
        const showLabel = isActive || isHovered;

        return (
          <div key={section.id} className="relative flex items-center">
            {/* Label tooltip */}
            <AnimatePresence>
              {showLabel && (
                <motion.div
                  className="absolute right-7 whitespace-nowrap rounded-full px-3 py-1 bg-[#4A2364] text-white font-sans-body text-[10px] tracking-wider shadow-lg"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {section.label}
                  {/* Arrow pointing right towards the dot */}
                  <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-[#4A2364]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot button */}
            <button
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredDot(section.id)}
              onMouseLeave={() => setHoveredDot(null)}
              className="relative w-6 h-6 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-full"
              aria-label={`Navigate to ${section.label} section`}
              aria-current={isActive ? 'true' : undefined}
            >
              <motion.span
                className="block w-2.5 h-2.5 rounded-full border transition-colors duration-300"
                animate={{
                  scale: isActive ? 1.25 : 1,
                  backgroundColor: isActive ? '#4A2364' : 'rgba(74,35,100,0.4)',
                  borderColor: isActive ? '#D4AF37' : 'rgba(74,35,100,0.5)',
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </button>
          </div>
        );
      })}
    </nav>
  );
}
