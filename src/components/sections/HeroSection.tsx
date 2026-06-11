'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-[#F8F5F2] min-h-screen pt-20 lg:pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-12 lg:py-0 gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 lg:max-w-xl pt-8 lg:pt-0">
            {/* Purple divider */}
            <div className="w-12 h-0.5 bg-[#4A2364] mb-6 animate-fade-in-up" />
            
            {/* Subheading */}
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-4 font-sans-body animate-fade-in-up animation-delay-200">
              HOSPITALITY FF&E &bull; EST. FOSHAN
            </p>
            
            {/* Main headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-display text-[#1A1A1A] leading-tight mb-6 animate-fade-in-up animation-delay-200">
              Furniture that{' '}
              <span className="text-[#D4AF37] italic">tells the story</span>{' '}
              of a hotel.
            </h2>
            
            {/* Description */}
            <p className="text-base text-gray-500 leading-relaxed mb-8 font-sans-body max-w-lg animate-fade-in-up animation-delay-400">
              Akshar Foshan crafts complete hotel furniture solutions — casegoods,
              upholstery, lighting, mirrors, bathroom accessories — and orchestrates
              sourcing, QC and logistics for hospitality brands worldwide.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
              <Button
                onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-full px-8 py-6 font-sans-body text-sm font-medium group"
              >
                Open the portfolio
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-[#4A2364] text-[#4A2364] hover:bg-[#4A2364]/5 rounded-full px-8 py-6 font-sans-body text-sm font-medium"
              >
                Start a project
              </Button>
            </div>
          </div>

          {/* Right Visual Area */}
          <div className="flex-1 relative w-full lg:max-w-2xl">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-hotel.png"
                  alt="Hilton Hotel - Akshar Foshan Project"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                  <p className="text-xs tracking-widest font-sans-body">
                    NOW MANUFACTURING — <span className="font-bold">240 KEYS</span>
                  </p>
                </div>
              </div>
              
              {/* Floating small image - top right */}
              <div className="absolute -top-4 -right-2 lg:-right-8 w-28 h-24 lg:w-40 lg:h-32 rounded-xl overflow-hidden shadow-xl border-2 border-white hidden sm:block">
                <img
                  src="/hero-hotel2.png"
                  alt="Modern hotel building"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating small image - bottom right */}
              <div className="absolute -bottom-6 right-8 lg:right-16 w-24 h-20 lg:w-36 lg:h-28 rounded-xl overflow-hidden shadow-xl border-2 border-white hidden sm:block">
                <img
                  src="/catalog-pages/page_7.png"
                  alt="Hotel project"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pb-12 lg:pb-20 pt-8">
          {[
            { value: '13+', label: 'COOPERATING FACILITIES' },
            { value: '5+', label: 'YEARS HOSPITALITY EXPERIENCE' },
            { value: '240', label: 'KEYS DELIVERED IN 21 DAYS' },
            { value: '360°', label: 'FULL FF&E COVERAGE' },
          ].map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A]">
                {stat.value}
              </p>
              <p className="text-xs tracking-widest text-gray-400 mt-2 font-sans-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
