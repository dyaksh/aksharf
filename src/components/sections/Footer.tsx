'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  MessageCircle,
  ArrowUp,
  Check,
  Loader2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const exploreLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const scopeLinks = [
  { label: 'Casegoods', href: '#portfolio' },
  { label: 'Upholstery', href: '#portfolio' },
  { label: 'Lighting', href: '#portfolio' },
  { label: 'Bathroom FF&E', href: '#portfolio' },
  { label: 'Art & Decor', href: '#portfolio' },
];

const studioLinks = [
  { label: 'Foshan Workshop', href: '#about' },
  { label: 'Quality Control', href: '#about' },
  { label: 'Logistics', href: '#about' },
  { label: 'Installation', href: '#about' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<
    'idle' | 'loading' | 'success'
  >('idle');

  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setNewsletterState('loading');
    // Simulate submission
    setTimeout(() => {
      setNewsletterState('success');
      setEmail('');
      setTimeout(() => setNewsletterState('idle'), 3000);
    }, 1000);
  };

  return (
    <footer id="contact" className="bg-[#0D0D0D] relative" ref={footerRef}>
      {/* Decorative gold line at the very top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="pt-16 lg:pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Brand */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
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
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#4A2364]" />
                  <span className="text-xs text-white/60 font-sans-body">
                    18666422531
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#4A2364]" />
                  <span className="text-xs text-white/60 font-sans-body">
                    250552975@qq.com
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#4A2364] mt-0.5 shrink-0" />
                  <span className="text-xs text-white/60 font-sans-body">
                    No. 29, Sanling Road, Hecheng Sub-district, Gaoming District,
                    Foshan City
                  </span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#4A2364] hover:border-[#4A2364] hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#4A2364] hover:border-[#4A2364] hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#4A2364] hover:border-[#4A2364] hover:text-white transition-all duration-300"
                  aria-label="WeChat"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Explore */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold mb-4">
                EXPLORE
              </h4>
              <ul className="space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-white/40 hover:text-white font-sans-body transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Scope */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold mb-4">
                SCOPE
              </h4>
              <ul className="space-y-2.5">
                {scopeLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-white/40 hover:text-white font-sans-body transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold mb-4">
                NEWSLETTER
              </h4>
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
                    className="rounded-lg font-sans-body text-xs h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#D4AF37]/30 focus-visible:border-[#D4AF37]/30"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={newsletterState === 'loading'}
                  className="w-full bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-lg h-9 font-sans-body text-xs font-medium transition-all duration-300"
                >
                  {newsletterState === 'loading' ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Subscribing...
                    </>
                  ) : newsletterState === 'success' ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Subscribed!
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
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
              <span className="text-xs text-white/30 font-sans-body hover:text-white/60 cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="text-xs text-white/30 font-sans-body hover:text-white/60 cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={handleScrollToTop}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#4A2364] text-white flex items-center justify-center shadow-lg hover:bg-[#6B3F8E] transition-all duration-300 hover:shadow-xl hover:scale-110"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
