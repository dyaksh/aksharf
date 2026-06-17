'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

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
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // Scroll background change - smooth blend
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(93,44,134,0.08)]'
          : 'bg-transparent'
      }`}
    >
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
              <h1 className={`text-lg font-bold leading-tight font-sans-body transition-colors duration-500 ${
                isScrolled ? 'text-[#1A1A1A]' : 'text-white'
              }`}>
                Akshar Foshan
              </h1>
              <p className={`text-[10px] tracking-[0.2em] font-sans-body transition-colors duration-500 ${
                isScrolled ? 'text-gray-400' : 'text-white/60'
              }`}>
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
                      ? isScrolled
                        ? 'text-[#5d2c86] bg-[#5d2c86]/8'
                        : 'text-white bg-white/15 backdrop-blur-sm'
                      : isScrolled
                        ? 'text-gray-500 hover:text-[#5d2c86] hover:bg-[#5d2c86]/5'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#5d2c86]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => handleNavClick('#contact')}
              className={`rounded-full px-6 font-sans-body text-sm shadow-md hover:shadow-lg transition-all duration-300 ${
                isScrolled
                  ? 'bg-[#5d2c86] hover:bg-[#7d44a8] text-white'
                  : 'bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white border border-white/30'
              }`}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile: Menu Toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              className={`p-2 relative z-50 transition-colors duration-300 ${
                isScrolled ? 'text-[#1A1A1A]' : 'text-white'
              }`}
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
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
                <nav className="flex flex-col">
                  {navLinks.map((link, index) => {
                    const isActive = activeHash === link.href;
                    return (
                      <motion.button
                        key={link.label}
                        onClick={() => handleNavClick(link.href)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
                        className={`text-left text-lg font-medium py-3 px-4 rounded-lg transition-colors font-sans-body ${
                          isActive
                            ? 'text-[#5d2c86] bg-[#5d2c86]/8'
                            : 'text-gray-700 hover:text-[#5d2c86] hover:bg-gray-50'
                        }`}
                      >
                        {link.label}
                      </motion.button>
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
                </div>

                {/* Contact info */}
                <div className="mt-auto pb-8">
                  <div className="w-16 h-0.5 bg-[#5d2c86]/30 mb-4" />
                  <div className="space-y-2 mb-4">
                    <a
                      href="tel:+17606170800"
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#5d2c86] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#5d2c86]" />
                      +1 (760) 617-0800
                    </a>
                    <a
                      href="mailto:yogin@aksharfoshan.com"
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#5d2c86] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#5d2c86]" />
                      yogin@aksharfoshan.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/17606170800"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#5d2c86] transition-colors px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
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
