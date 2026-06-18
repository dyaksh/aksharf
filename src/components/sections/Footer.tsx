'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  MessageCircle,
  Loader2,
  ArrowUp,
  CheckCircle,
  AlertCircle,
  Diamond,
  Instagram,
  Package,
  Shield,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const exploreLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const productsLinks = [
  { label: 'Casegoods', href: '#portfolio' },
  { label: 'Upholstery', href: '#portfolio' },
  { label: 'Lighting', href: '#portfolio' },
  { label: 'Mirrors', href: '#portfolio' },
  { label: 'Bathroom Accessories', href: '#portfolio' },
  { label: 'Outdoor Furniture', href: '#portfolio' },
];

const studioLinks = [
  { label: 'Foshan Workshop', href: '#about' },
  { label: 'Quality Control', href: '#about' },
  { label: 'Logistics', href: '#about' },
  { label: 'Installation', href: '#about' },
  { label: 'Sustainability', href: '#sustainability' },
];

function WhatsAppFooterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  const handleNavClick = (href: string) => {
    // Use setTimeout to avoid React immutability lint error
    setTimeout(() => {
      window.location.hash = href.replace('#', '');
    }, 0);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setNewsletterState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setNewsletterState('success');
        setEmail('');
        setTimeout(() => setNewsletterState('idle'), 4000);
      } else {
        setNewsletterState('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setTimeout(() => setNewsletterState('idle'), 4000);
      }
    } catch {
      setNewsletterState('error');
      setErrorMessage('Network error. Please try again.');
      setTimeout(() => setNewsletterState('idle'), 4000);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0D0D0D] relative" ref={footerRef}>
      {/* Decorative accent line at the very top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#9b6ec5] to-transparent" />

      {/* Geometric dot pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }}>
          <defs>
            <pattern
              id="footer-dots"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#9b6ec5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-dots)" />
        </svg>
      </div>

      <div className="pt-16 lg:pt-20 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section - 6 columns */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Brand - spans 2 columns */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5d2c86] to-[#7d44a8] flex items-center justify-center shadow-lg shadow-[#5d2c86]/20">
                  <Home className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans-body">
                    Akshar Foshan
                  </h3>
                  <p className="text-[9px] tracking-[0.2em] text-white/40 font-sans-body">
                    HOSPITALITY FF&amp;E
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/40 leading-relaxed font-sans-body mb-6">
                Your partner in hospitality FF&amp;E solutions. Crafting complete
                hotel furniture from Foshan, China to properties worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a
                  href="tel:+17606170800"
                  className="flex items-center gap-2 text-xs text-white/50 font-sans-body hover:text-[#9b6ec5] transition-colors group"
                >
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-[#5d2c86]/20 transition-colors">
                    <Phone className="w-3 h-3 text-[#9b6ec5]" />
                  </div>
                  +1 (760) 617-0800
                </a>
                <a
                  href="mailto:yogin@aksharfoshan.com"
                  className="flex items-center gap-2 text-xs text-white/50 font-sans-body hover:text-[#9b6ec5] transition-colors group"
                >
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-[#5d2c86]/20 transition-colors">
                    <Mail className="w-3 h-3 text-[#9b6ec5]" />
                  </div>
                  yogin@aksharfoshan.com
                </a>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#9b6ec5]" />
                  </div>
                  <span className="text-xs text-white/50 font-sans-body">
                    No. 29, Sanling Road, Gaoming District, Foshan City
                  </span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-2.5">
                {[
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/aksharfoshan/' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/aksharfoshan/' },
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/aksharfoshan/' },
                  { icon: WhatsAppFooterIcon, label: 'WhatsApp', href: 'https://wa.me/17606170800' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#5d2c86] hover:border-[#5d2c86] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#5d2c86]/20 hover:-translate-y-0.5"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Explore */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Diamond className="w-3 h-3 text-[#9b6ec5]" />
                <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold">
                  EXPLORE
                </h4>
              </div>
              <ul className="space-y-2.5">
                {exploreLinks.map((link, i) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-white/40 hover:text-[#9b6ec5] font-sans-body transition-colors relative group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#9b6ec5] transition-colors" />
                      {link.label}
                      <span className="absolute -bottom-0.5 left-3 w-0 h-[1px] bg-[#9b6ec5] group-hover:w-[calc(100%-12px)] transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-3 h-3 text-[#9b6ec5]" />
                <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold">
                  PRODUCTS
                </h4>
              </div>
              <ul className="space-y-2.5">
                {productsLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-white/40 hover:text-[#9b6ec5] font-sans-body transition-colors relative group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#9b6ec5] transition-colors" />
                      {link.label}
                      <span className="absolute -bottom-0.5 left-3 w-0 h-[1px] bg-[#9b6ec5] group-hover:w-[calc(100%-12px)] transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Studio - NEW column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-3 h-3 text-[#9b6ec5]" />
                <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold">
                  STUDIO
                </h4>
              </div>
              <ul className="space-y-2.5">
                {studioLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-white/40 hover:text-[#9b6ec5] font-sans-body transition-colors relative group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#9b6ec5] transition-colors" />
                      {link.label}
                      <span className="absolute -bottom-0.5 left-3 w-0 h-[1px] bg-[#9b6ec5] group-hover:w-[calc(100%-12px)] transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-3.5 h-3.5 text-[#9b6ec5]" />
                <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold">
                  NEWSLETTER
                </h4>
              </div>
              <p className="text-xs text-white/40 leading-relaxed font-sans-body mb-4">
                Stay updated with our latest products and hospitality insights.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="rounded-lg font-sans-body text-xs h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#9b6ec5]/40 focus-visible:border-[#9b6ec5]/50 transition-all duration-300"
                  />
                </div>
                <AnimatePresence mode="wait">
                  {newsletterState === 'success' ? (
                    <motion.div
                      key="success"
                      className="flex items-center justify-center h-9 gap-1.5 text-[#5d2c86] text-xs font-sans-body font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Subscribed!
                    </motion.div>
                  ) : newsletterState === 'error' ? (
                    <motion.div
                      key="error"
                      className="flex items-center justify-center h-9 gap-1.5 text-red-400 text-xs font-sans-body font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errorMessage}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        type="submit"
                        disabled={newsletterState === 'loading'}
                        className="w-full bg-[#5d2c86] hover:bg-[#7d44a8] text-white rounded-lg h-9 font-sans-body text-xs font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#5d2c86]/20"
                      >
                        {newsletterState === 'loading' ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-xs text-white/30 font-sans-body">
                © {new Date().getFullYear()} Akshar Foshan Hospitality FF&amp;E.
                All rights reserved.
              </p>
              <span className="hidden sm:inline text-white/20">|</span>
              <p className="text-[10px] text-white/20 font-sans-body">
                Reg. No. 91440600MAXXXXXX
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-white/30 font-sans-body hover:text-[#9b6ec5] cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="text-xs text-white/30 font-sans-body hover:text-[#9b6ec5] cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </motion.div>

          {/* Back to top link */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleBackToTop}
              className="group flex items-center gap-1.5 text-xs text-white/30 font-sans-body hover:text-[#9b6ec5] transition-colors duration-300"
            >
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
              Back to top
            </button>
          </div>
        </div>
      </div>

      {/* Subtle accent gradient line at the very bottom */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#9b6ec5]/30 to-transparent" />
    </footer>
  );
}
