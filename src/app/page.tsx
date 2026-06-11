'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Home } from 'lucide-react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import BrandMarquee from '@/components/sections/BrandMarquee';
import ProcessSection from '@/components/sections/ProcessSection';
import ProjectTimeline from '@/components/sections/ProjectTimeline';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ServicesSection from '@/components/sections/ServicesSection';
import GlobalReachSection from '@/components/sections/GlobalReachSection';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import AwardsSection from '@/components/sections/AwardsSection';
import CatalogSection from '@/components/sections/CatalogSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import FloatingNav from '@/components/sections/FloatingNav';
import ChatWidget from '@/components/sections/ChatWidget';
import SectionDivider from '@/components/sections/SectionDivider';
import CookieConsent from '@/components/sections/CookieConsent';
import ScrollProgress from '@/components/sections/ScrollProgress';
import StatsTicker from '@/components/sections/StatsTicker';

// Page loading animation
function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip loader entirely for users who prefer reduced motion (delay=0 dismisses immediately)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Use shorter delay on mobile screens for faster dismiss
    const isMobile = window.innerWidth < 768;
    const delay = prefersReducedMotion ? 0 : isMobile ? 800 : 1000;

    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {/* Logo pulse */}
          <motion.div
            className="w-16 h-16 rounded-full bg-[#4A2364] flex items-center justify-center mb-6 shadow-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Home className="w-7 h-7 text-white" />
            </motion.div>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            className="text-xl font-bold text-white font-sans-body tracking-wide mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Akshar Foshan
          </motion.h1>
          <motion.p
            className="text-[10px] tracking-[0.3em] text-white/40 font-sans-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            HOSPITALITY FF&amp;E
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#4A2364] via-[#D4AF37] to-[#4A2364] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#4A2364] text-white flex items-center justify-center shadow-lg hover:bg-[#6B3F8E] transition-colors duration-300 hover:shadow-xl"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageLoader />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SectionDivider fromBg="#F8F5F2" toBg="#FFFFFF" variant="curve" />
        <BrandMarquee />
        <SectionDivider fromBg="#FFFFFF" toBg="#F8F5F2" variant="curve" />
        <ProcessSection />
        <SectionDivider fromBg="#F8F5F2" toBg="#F8F5F2" variant="curve" />
        <ProjectTimeline />
        <SectionDivider fromBg="#F8F5F2" toBg="#FFFFFF" variant="curve" />
        <AboutSection />
        <StatsTicker />
        <SectionDivider fromBg="#1A1A1A" toBg="#1A1A1A" variant="wave" />
        <PortfolioSection />
        <SectionDivider fromBg="#1A1A1A" toBg="#F8F5F2" variant="angled" />
        <ServicesSection />
        <SectionDivider fromBg="#F8F5F2" toBg="#FFFFFF" variant="curve" />
        <GlobalReachSection />
        <SectionDivider fromBg="#FFFFFF" toBg="#1A1A1A" variant="angled" />
        <BeforeAfterSection />
        <SectionDivider fromBg="#1A1A1A" toBg="#FFFFFF" variant="angled" />
        <TestimonialsSection />
        <SectionDivider fromBg="#FFFFFF" toBg="#FFFFFF" variant="curve" />
        <AwardsSection />
        <SectionDivider fromBg="#FFFFFF" toBg="#FFFFFF" variant="curve" />
        <CatalogSection />
        <SectionDivider fromBg="#FFFFFF" toBg="#F8F5F2" variant="curve" />
        <FAQSection />
        <SectionDivider fromBg="#F8F5F2" toBg="#2D1B42" variant="wave" />
        <CTASection />
        <SectionDivider fromBg="#2D1B42" toBg="#F8F5F2" variant="angled" />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingNav />
      <ChatWidget />
      <CookieConsent />
    </div>
  );
}
