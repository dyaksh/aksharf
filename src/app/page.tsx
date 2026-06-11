'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ProcessSection from '@/components/sections/ProcessSection';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CatalogSection from '@/components/sections/CatalogSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import ChatWidget from '@/components/sections/ChatWidget';

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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProcessSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <TestimonialsSection />
        <CatalogSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
}
