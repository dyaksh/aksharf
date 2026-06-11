'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('#home');

  // Scroll progress and background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy using IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.substring(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#4A2364] via-[#6B3F8E] to-[#D4AF37]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      {/* Subtle bottom border on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(74,35,100,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-11 h-11 rounded-full bg-[#4A2364] flex items-center justify-center shadow-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: 1,
                  ease: 'easeInOut',
                }}
              >
                <Home className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-[#1A1A1A] leading-tight font-sans-body">
                Akshar Foshan
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-gray-400 font-sans-body">
                HOSPITALITY FF&E
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-sm font-medium transition-all duration-300 font-sans-body px-4 py-2 rounded-full ${
                    isActive
                      ? 'text-[#4A2364]'
                      : 'text-gray-500 hover:text-[#4A2364]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#4A2364]/8 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick('#contact')}
              className="bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-full px-6 font-sans-body text-sm shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Request Catalog
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#1A1A1A] relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide in from right */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 md:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href;
                    return (
                      <motion.button
                        key={link.label}
                        onClick={() => handleNavClick(link.href)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
                        className={`text-left text-lg font-medium py-3 px-4 rounded-lg transition-colors font-sans-body ${
                          isActive
                            ? 'text-[#4A2364] bg-[#4A2364]/8'
                            : 'text-gray-700 hover:text-[#4A2364] hover:bg-gray-50'
                        }`}
                      >
                        {link.label}
                      </motion.button>
                    );
                  })}
                </nav>
                <div className="mt-6">
                  <Button
                    onClick={() => handleNavClick('#contact')}
                    className="w-full bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-full py-3 font-sans-body shadow-md"
                  >
                    Request Catalog
                  </Button>
                </div>
                {/* Decorative element at bottom */}
                <div className="mt-auto pb-8">
                  <div className="w-16 h-0.5 bg-[#D4AF37] mb-3" />
                  <p className="text-xs tracking-[0.2em] text-gray-400 font-sans-body">
                    HOSPITALITY FF&E
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
