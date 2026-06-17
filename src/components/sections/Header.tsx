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
  const [currentPage, setCurrentPage] = useState('home');

  // Track current page and hash
  useEffect(() => {
    const updateState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveHash('#' + hash);
      setCurrentPage(hash);
    };
    updateState();
    window.addEventListener('hashchange', updateState);
    return () => window.removeEventListener('hashchange', updateState);
  }, []);

  // Only home page gets transparent navbar; other pages always show solid
  const isHomePage = currentPage === 'home';

  // Scroll background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show solid navbar when: not on home, or scrolled on home
  const shouldShowSolid = !isHomePage || isScrolled;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        shouldShowSolid
          ? 'bg-[#f8f3ed] shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      {/* Top gradient accent line — purple gradient, only when solid */}
      {shouldShowSolid && (
        <div
          className="h-[2px] w-full"
          style={{
            background: 'linear-gradient(90deg, #5d2c86, #7d44a8, #5d2c86)',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5"
          >
            <Image
              src="/images/logo.png"
              alt="Akshar Foshan logo"
              width={40}
              height={40}
              className="h-9 w-auto sm:h-10 object-contain"
              priority
            />
            <div>
              <h1
                className={`text-[17px] font-bold leading-tight font-sans-body transition-colors duration-500 ${
                  shouldShowSolid ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                Akshar Foshan
              </h1>
              <p
                className={`text-[9px] tracking-[0.22em] font-sans-body font-medium transition-colors duration-500 ${
                  shouldShowSolid ? 'text-gray-400' : 'text-white/50'
                }`}
              >
                HOSPITALITY FF&amp;E
              </p>
            </div>
          </a>

          {/* Desktop Navigation — simple text links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-[13px] font-medium tracking-wide transition-colors duration-300 font-sans-body ${
                    isActive
                      ? shouldShowSolid
                        ? 'text-[#5d2c86]'
                        : 'text-white'
                      : shouldShowSolid
                        ? 'text-[#555] hover:text-[#5d2c86]'
                        : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button
              onClick={() => handleNavClick('#contact')}
              className={`rounded-full px-7 py-2 font-sans-body text-[13px] font-medium tracking-wide transition-all duration-300 ${
                shouldShowSolid
                  ? 'bg-[#5d2c86] hover:bg-[#4a2270] text-white shadow-md hover:shadow-lg'
                  : 'bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white border border-white/25'
              }`}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile: Menu Toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              className={`p-2 relative z-50 transition-colors duration-300 ${
                shouldShowSolid ? 'text-[#1A1A1A]' : 'text-white'
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
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#f8f3ed] z-50 md:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Top gradient accent line */}
              <div
                className="h-[2px] w-full"
                style={{
                  background: 'linear-gradient(90deg, #5d2c86, #7d44a8, #5d2c86)',
                }}
              />
              <div className="flex flex-col h-full pt-6 px-6">
                {/* Logo in mobile menu */}
                <div className="flex items-center gap-2.5 mb-8">
                  <Image
                    src="/images/logo.png"
                    alt="Akshar Foshan logo"
                    width={36}
                    height={36}
                    className="h-9 w-auto object-contain"
                  />
                  <div>
                    <h1 className="text-[15px] font-bold leading-tight font-sans-body text-[#1A1A1A]">
                      Akshar Foshan
                    </h1>
                    <p className="text-[8px] tracking-[0.22em] font-sans-body font-medium text-gray-400">
                      HOSPITALITY FF&amp;E
                    </p>
                  </div>
                </div>

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
                        className={`text-left text-[15px] font-medium py-3 px-4 rounded-lg transition-colors font-sans-body ${
                          isActive
                            ? 'text-[#5d2c86] bg-[#5d2c86]/8'
                            : 'text-[#555] hover:text-[#5d2c86] hover:bg-[#5d2c86]/5'
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
                    className="w-full bg-[#5d2c86] hover:bg-[#4a2270] text-white rounded-full py-3 font-sans-body text-[13px] font-medium tracking-wide shadow-md"
                  >
                    Get a Quote
                  </Button>
                </div>

                {/* Contact info */}
                <div className="mt-auto pb-8">
                  <div className="w-16 h-0.5 bg-[#5d2c86]/20 mb-4" />
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
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#5d2c86] transition-colors px-3 py-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200"
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
