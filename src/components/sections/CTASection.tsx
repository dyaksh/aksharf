'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-r from-[#1A1A1A] via-[#2D1B42] to-[#4A2364] py-20 lg:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A2364]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-xs tracking-[0.3em] text-[#D4AF37] mb-6 font-sans-body">
          NEXT CHAPTER
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-serif-display text-white mb-4">
          Tell us about the property.
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-serif-display text-[#D4AF37] italic mb-8">
          We&apos;ll script the FF&E.
        </h3>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl mx-auto mb-10 font-sans-body">
          Share your floor plans, brand standards or a moodboard. We&apos;ll come back
          with a scope, a budget envelope and a sample plan within five working days.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#4A2364] hover:bg-white/90 rounded-full px-8 py-6 font-sans-body text-sm font-medium group"
          >
            Start a project
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 font-sans-body text-sm font-medium"
          >
            Request Catalog
          </Button>
        </div>
      </div>
    </section>
  );
}
