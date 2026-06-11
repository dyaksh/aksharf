'use client';

import { Home, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

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
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#0D0D0D] pt-16 lg:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-sans-body">
                  Akshar Foshan
                </h3>
                <p className="text-[9px] tracking-[0.2em] text-white/40 font-sans-body">
                  HOSPITALITY FF&E
                </p>
              </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed font-sans-body mb-6">
              Your partner in hospitality FF&E solutions. Crafting complete hotel
              furniture from Foshan, China to properties worldwide.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#4A2364]" />
                <span className="text-xs text-white/60 font-sans-body">18666422531</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#4A2364]" />
                <span className="text-xs text-white/60 font-sans-body">250552975@qq.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#4A2364] mt-0.5 shrink-0" />
                <span className="text-xs text-white/60 font-sans-body">
                  No. 29, Sanling Road, Hecheng Sub-district, Gaoming District, Foshan City
                </span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-white/40 hover:text-white font-sans-body transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Scope */}
          <div>
            <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold mb-4">
              SCOPE
            </h4>
            <ul className="space-y-2.5">
              {scopeLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-white/40 hover:text-white font-sans-body transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <h4 className="text-xs tracking-[0.2em] text-white/80 font-sans-body font-bold mb-4">
              STUDIO
            </h4>
            <ul className="space-y-2.5">
              {studioLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-white/40 hover:text-white font-sans-body transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-white/30 font-sans-body">
            © {new Date().getFullYear()} Akshar Foshan Hospitality FF&E. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30 font-sans-body">Privacy Policy</span>
            <span className="text-xs text-white/30 font-sans-body">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
