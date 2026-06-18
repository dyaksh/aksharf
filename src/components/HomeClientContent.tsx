'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesMarquee from '@/components/sections/ServicesMarquee';
import PartnersTrust from '@/components/sections/PartnersTrust';
import AboutCTA from '@/components/sections/AboutCTA';
import ProcessSection from '@/components/sections/ProcessSection';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ServicesSection from '@/components/sections/ServicesSection';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import FloatingNav from '@/components/sections/FloatingNav';
import ChatWidget from '@/components/sections/ChatWidget';
import WhatsAppFloat from '@/components/sections/WhatsAppFloat';
import PageTransition from '@/components/PageTransition';
import ScrollProgress from '@/components/ScrollProgress';

/* ─────────────── Dynamic imports of 3D scenes (client-only) ─────────────── */

const AboutScene = dynamic(() => import('@/components/3d/AboutScene'), {
  ssr: false,
  loading: () => null,
});

const PortfolioScene = dynamic(() => import('@/components/3d/PortfolioScene'), {
  ssr: false,
  loading: () => null,
});

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

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
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#5d2c86] text-white flex items-center justify-center shadow-lg hover:bg-[#7d44a8] transition-colors duration-300 hover:shadow-xl"
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

// Home Page Content
function HomePageContent() {
  return (
    <motion.div
      key="home"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div aria-label="Hero section"><HeroSection /></div>
      <ServicesMarquee />
      <div aria-label="Partners and trust section"><PartnersTrust /></div>
      <div aria-label="About call to action"><AboutCTA /></div>
      <div aria-label="Process section"><ProcessSection /></div>
      <div aria-label="Services section"><ServicesSection /></div>
      <div aria-label="Before and after showcase"><BeforeAfterSection /></div>
      <div aria-label="Testimonials section"><TestimonialsSection /></div>
      <div aria-label="FAQ section"><FAQSection /></div>
      <div aria-label="Call to action section"><CTASection /></div>
    </motion.div>
  );
}

// About Page
function AboutPage() {
  return (
    <motion.div
      key="about"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* About Hero Banner */}
      <section className="relative pt-20">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Suspense fallback={null}>
            <AboutScene />
          </Suspense>
        </div>
        <div className="relative h-[40vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/images/about/about-hero.png"
            alt="About Akshar Foshan — Manufacturing Excellence"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86]/85 via-[#5d2c86]/55 to-[#5d2c86]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent" />
          {/* Cinematic purple gradient line at bottom for visual storytelling */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5d2c86]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-12 h-[2px] bg-[#5d2c86] mb-6 origin-left"
                />
                <p className="text-xs sm:text-sm tracking-[0.3em] text-white/80 mb-4 font-sans-body font-semibold">OUR STORY</p>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-serif-display text-white leading-tight mb-4">
                  About <span className="text-[#5d2c86] italic">Akshar Foshan</span>
                </h1>
                <p className="mt-2 text-base sm:text-lg lg:text-xl text-white/80 max-w-xl font-sans-body leading-relaxed">
                  Crafting excellence in hospitality FF&amp;E from Foshan to the world.
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="w-24 h-[2px] bg-[#5d2c86]/40 mt-6 origin-left"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <AboutSection />
    </motion.div>
  );
}

// Portfolio Page
function PortfolioPage() {
  return (
    <motion.div
      key="portfolio"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <section className="relative overflow-hidden" style={{ backgroundColor: '#f8f3ed' }}>
        <div className="absolute inset-0 z-0 opacity-30" aria-hidden="true">
          <Suspense fallback={null}>
            <PortfolioScene />
          </Suspense>
        </div>
        <div className="relative z-10">
          <PortfolioSection />
        </div>
      </section>
    </motion.div>
  );
}

// Services Page
function ServicesPage() {
  return (
    <motion.div
      key="services"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <ServicesSection />
      <BeforeAfterSection />
      <CTASection />
    </motion.div>
  );
}

// Contact Page
function ContactPage() {
  return (
    <motion.div
      key="contact"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <ContactSection />
    </motion.div>
  );
}

// Page router hook
function usePageRouter() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const updatePage = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    updatePage();
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  return currentPage;
}

export default function HomeClientContent() {
  const currentPage = usePageRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark page as loaded after initial mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePageContent />;
    }
  };

  return (
    <>
      {/* Initial load overlay — white screen fades out */}
      {!isLoaded && <div className="load-overlay" aria-hidden="true" />}

      {/* Scroll progress bar — gold gradient at top */}
      <ScrollProgress />

      <Header />
      <main className="flex-1" role="main" aria-label="Main content">
        <PageTransition pageKey={currentPage}>
          {renderPage()}
        </PageTransition>
      </main>
      <Footer />
      <ChatWidget />
      <WhatsAppFloat />
      <ScrollToTop />
      <FloatingNav />
    </>
  );
}
