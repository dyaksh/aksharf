'use client';

import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CatalogSection from '@/components/sections/CatalogSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProcessSection />
        <PortfolioSection />
        <ServicesSection />
        <CatalogSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
