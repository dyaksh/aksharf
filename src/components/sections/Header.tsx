'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, Diamond, Phone, Mail, MessageCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#5d2c86] dark:text-gray-400 dark:hover:text-[#7d44a8] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
  const [activeHash, setActiveHash] = useState('#home');

  // Track active section based on URL hash
  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash || '#home';
      setActiveHash(hash);
    };

    // Set initial hash
    updateHash();

    // Listen for hash changes
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // Scroll background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    window.location.hash = href.replace('#', '');
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-xl shadow-sm'
          : 'bg-gradient-to-b from-black/20 to-transparent dark:from-black/40 dark:to-transparent'
      }`}
    >
      {/* Subtle bottom border on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(93,44,134,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="relative flex-shrink-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Image
                src="/images/logo.png"
                alt="Akshar Foshan logo"
                width={44}
                height={44}
                className="h-10 w-auto sm:h-11 lg:h-12 object-contain"
                priority
              />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-[#1A1A1A] dark:text-white leading-tight font-sans-body">
                Akshar Foshan
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-400 font-sans-body">
                HOSPITALITY FF&amp;E
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-sm font-medium transition-all duration-300 font-sans-body px-4 py-2 rounded-full ${
                    isActive
                      ? 'text-[#5d2c86] dark:text-[#7d44a8]'
                      : 'text-gray-500 dark:text-gray-400 hover:text-[#5d2c86] dark:hover:text-[#7d44a8]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#5d2c86]/8 dark:bg-[#7d44a8]/8 rounded-full -z-10"
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
              variant="outline"
              onClick={() => window.open('/brochure.pdf', '_blank')}
              className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full px-4 font-sans-body text-sm transition-colors duration-300 hidden lg:inline-flex"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Brochure
            </Button>
            <Button
              onClick={() => handleNavClick('#contact')}
              className="bg-[#5d2c86] hover:bg-[#7d44a8] text-white rounded-full px-6 font-sans-body text-sm shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Get a Quote
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
                    const isActive = activeHash === link.href;
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
                              ? 'text-[#5d2c86] dark:text-[#7d44a8] bg-[#5d2c86]/8 dark:bg-[#7d44a8]/8'
                              : 'text-gray-700 dark:text-gray-300 hover:text-[#5d2c86] dark:hover:text-[#7d44a8] hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {link.label}
                        </motion.button>
                      </div>
                    );
                  })}
                </nav>
                <div className="mt-6 space-y-3">
                  <Button
                    onClick={() => handleNavClick('#contact')}
                    className="w-full bg-[#5d2c86] hover:bg-[#7d44a8] text-white rounded-full py-3 font-sans-body shadow-md"
                  >
                    Get a Quote
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('/brochure.pdf', '_blank')}
                    className="w-full border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full py-3 font-sans-body"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                </div>

                {/* Contact info - neutral colored */}
                <div className="mt-auto pb-8">
                  {/* Gold separator */}
                  <div className="w-16 h-0.5 bg-[#D4AF37] mb-4" />

                  {/* Phone & Email */}
                  <div className="space-y-2 mb-4">
                    <a
                      href="tel:+17606170800"
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#5d2c86] dark:hover:text-[#7d44a8] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      +1 (760) 617-0800
                    </a>
                    <a
                      href="mailto:yogin@aksharfoshan.com"
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#5d2c86] dark:hover:text-[#7d44a8] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                      yogin@aksharfoshan.com
                    </a>
                  </div>

                  {/* Neutral contact options (replacing green WhatsApp/WeChat) */}
                  <div className="flex items-center gap-3 mb-4">
                    <a
                      href="https://wa.me/17606170800"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-[#5d2c86] dark:hover:text-[#7d44a8] transition-colors px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <a
                      href="mailto:yogin@aksharfoshan.com"
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-[#5d2c86] dark:hover:text-[#7d44a8] transition-colors px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email Us
                    </a>
                  </div>

                  {/* Decorative branding */}
                  <div className="flex items-center gap-2">
                    <Diamond className="w-3 h-3 text-[#D4AF37]" />
                    <p className="text-xs tracking-[0.2em] text-gray-400 dark:text-gray-500 font-sans-body">
                      HOSPITALITY FF&amp;E
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
