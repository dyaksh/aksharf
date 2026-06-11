'use client';

import { Sofa, Lamp, Bath, Package, ShieldCheck, Frame } from 'lucide-react';

const services = [
  {
    icon: Sofa,
    title: 'Casegoods & Upholstery',
    description:
      'Full range of hotel casegoods, headboards, desks, and upholstered seating crafted to brand specifications.',
  },
  {
    icon: Lamp,
    title: 'Lighting & Mirrors',
    description:
      'Custom lighting solutions and mirrors designed to complement each property\'s unique aesthetic.',
  },
  {
    icon: Bath,
    title: 'Bathroom Accessories',
    description:
      'Complete bathroom FF&E packages including vanities, accessories, and hardware.',
  },
  {
    icon: Package,
    title: 'Sourcing & Logistics',
    description:
      'End-to-end supply chain management from raw materials to on-site delivery and installation.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Control',
    description:
      'Rigorous inspection at every stage — from raw material through production to final packaging.',
  },
  {
    icon: Frame,
    title: 'Art & Decor',
    description:
      'Curated art programs and decorative accessories that bring each hotel\'s brand story to life.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#F8F5F2] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="lg:w-5/12">
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-4 font-sans-body">
              WHAT WE COVER
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] mb-6">
              <span className="text-[#4A2364]">360° FF&E support</span>, under one roof.
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 font-sans-body">
              From concept sketches to on-site install, every FF&E need is handled by our
              integrated team — no gaps, no finger-pointing, just one accountable partner.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/catalog-pages/page_5.png"
                alt="Akshar Foshan Workshop"
                className="w-full h-48 lg:h-64 object-cover"
              />
            </div>
          </div>

          {/* Right Column - Services Grid */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#4A2364]/5 flex items-center justify-center mb-4 group-hover:bg-[#4A2364]/10 transition-colors">
                      <Icon className="w-5 h-5 text-[#4A2364]" />
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A1A] font-sans-body mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans-body">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
