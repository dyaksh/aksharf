'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Sun, Moon, Diamond, Phone, Mail, MessageCircle, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Catalog', href: '#catalog' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#4A2364] dark:text-gray-400 dark:hover:text-[#6B3F8E] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className="w-5 h-5 block dark:hidden" />
      <Moon className="w-5 h-5 hidden dark:block" />
    </button>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  // Scroll background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
          ? 'bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
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
              <h1 className="text-lg font-bold text-[#1A1A1A] dark:text-white leading-tight font-sans-body">
                Akshar Foshan
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500 font-sans-body">
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
                      ? 'text-[#4A2364] dark:text-[#6B3F8E]'
                      : 'text-gray-500 dark:text-gray-400 hover:text-[#4A2364] dark:hover:text-[#6B3F8E]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#4A2364]/8 dark:bg-[#6B3F8E]/8 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button
              onClick={() => handleNavClick('#contact')}
              className="bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-full px-6 font-sans-body text-sm shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Request Catalog
            </Button>
          </div>

          {/* Mobile: Theme Toggle + Menu Toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-[#1A1A1A] dark:text-white relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-[#1A1A1A] z-50 md:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <nav className="flex flex-col">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href;
                    return (
                      <div key={link.label}>
                        {index > 0 && (
                          <div className="h-[1px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/40 to-[#D4AF37]/20 my-1" />
                        )}
                        <motion.button
                          onClick={() => handleNavClick(link.href)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
                          className={`text-left text-lg font-medium py-3 px-4 rounded-lg transition-colors font-sans-body ${
                            isActive
                              ? 'text-[#4A2364] dark:text-[#6B3F8E] bg-[#4A2364]/8 dark:bg-[#6B3F8E]/8'
                              : 'text-gray-700 dark:text-gray-300 hover:text-[#4A2364] dark:hover:text-[#6B3F8E] hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {link.label}
                        </motion.button>
                      </div>
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

                {/* Contact info and quick actions */}
                <div className="mt-auto pb-8">
                  {/* Gold separator */}
                  <div className="w-16 h-0.5 bg-[#D4AF37] mb-4" />

                  {/* Phone & Email */}
                  <div className="space-y-2 mb-4">
                    <a
                      href="tel:+8618666422531"
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#4A2364] dark:hover:text-[#6B3F8E] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      +86 186 6642 2531
                    </a>
                    <a
                      href="mailto:info@aksharfoshan.com"
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#4A2364] dark:hover:text-[#6B3F8E] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                      info@aksharfoshan.com
                    </a>
                  </div>

                  {/* WeChat & WhatsApp quick actions */}
                  <div className="flex items-center gap-3 mb-4">
                    <a
                      href="https://wa.me/8618666422531"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#25D366] hover:text-[#128C7E] transition-colors px-3 py-2 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <button
                      className="flex items-center gap-1.5 text-xs font-medium text-[#07C160] hover:text-[#06AD56] transition-colors px-3 py-2 rounded-full bg-[#07C160]/10 hover:bg-[#07C160]/20"
                      onClick={() => {
                        navigator.clipboard.writeText('18666422531');
                      }}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      WeChat
                    </button>
                  </div>

                  {/* Decorative branding */}
                  <div className="flex items-center gap-2">
                    <Diamond className="w-3 h-3 text-[#D4AF37]" />
                    <p className="text-xs tracking-[0.2em] text-gray-400 dark:text-gray-500 font-sans-body">
                      HOSPITALITY FF&E
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
