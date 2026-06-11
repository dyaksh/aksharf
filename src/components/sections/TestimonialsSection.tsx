'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Akshar Foshan delivered 240 keys of casegoods and upholstery on schedule with zero defects. Their quality control process is second to none — every piece arrived inspection-ready, saving us weeks of rework.",
    name: 'Sarah Chen',
    title: 'Director of Procurement',
    brand: 'Hilton Garden Inn',
  },
  {
    quote:
      "We've partnered with Akshar on three properties now. Their ability to translate our brand standards into perfectly crafted FF&E packages — from lighting to bathroom accessories — makes them indispensable.",
    name: 'Michael Torres',
    title: 'VP of Design & Construction',
    brand: 'IHG Hotels & Resorts',
  },
  {
    quote:
      "The speed and reliability are remarkable. From approved samples to full delivery in 21 days for our Marriott project — that kind of turnaround without compromising quality is extraordinary.",
    name: 'Rebecca Holden',
    title: 'Senior Project Manager',
    brand: 'Marriott International',
  },
];

const brandLogos = ['IHG', 'Hilton', 'Marriott', 'Choice', 'Wyndham'];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section className="relative bg-white dark:bg-[#121212] py-20 lg:py-28 overflow-hidden">
      {/* Subtle geometric decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-right geometric shape */}
        <div className="absolute top-12 right-0 w-64 h-64 rounded-full bg-[#4A2364]/[0.03] dark:bg-[#4A2364]/[0.08]" />
        {/* Bottom-left geometric shape */}
        <div className="absolute bottom-8 left-0 w-48 h-48 rounded-full bg-[#D4AF37]/[0.04] dark:bg-[#D4AF37]/[0.06]" />
        {/* Dots pattern */}
        <svg
          className="absolute top-1/2 left-8 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.08]"
          width="80"
          height="200"
          viewBox="0 0 80 200"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 5) * 20}
              cy={Math.floor(i / 5) * 40}
              r="2"
              fill="#4A2364"
            />
          ))}
        </svg>
        <svg
          className="absolute top-1/2 right-8 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.08]"
          width="80"
          height="200"
          viewBox="0 0 80 200"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 5) * 20}
              cy={Math.floor(i / 5) * 40}
              r="2"
              fill="#4A2364"
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 lg:mb-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] mb-4 font-sans-body font-medium">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-4">
            TRUSTED BY HOSPITALITY BRANDS
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-sans-body text-lg max-w-xl mx-auto">
            What our partners say
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="relative max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="bg-[#F8F5F2]/70 dark:bg-[#1A1A1A] rounded-2xl p-8 sm:p-10 lg:p-12 border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-[#D4AF37]/30 dark:text-[#D4AF37]/20" />
                </div>

                {/* Star rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-lg sm:text-xl text-[#1A1A1A] dark:text-gray-200 leading-relaxed font-sans-body mb-8 italic">
                  &ldquo;{testimonials[currentSlide].quote}&rdquo;
                </p>

                {/* Person info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4A2364]/10 dark:bg-[#4A2364]/20 flex items-center justify-center">
                    <span className="text-[#4A2364] dark:text-[#6B3F8E] font-bold font-sans-body text-lg">
                      {testimonials[currentSlide].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] dark:text-white font-sans-body">
                      {testimonials[currentSlide].name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-sans-body">
                      {testimonials[currentSlide].title}
                    </p>
                    <p className="text-sm text-[#D4AF37] font-sans-body font-medium">
                      {testimonials[currentSlide].brand}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-[#4A2364] hover:text-[#4A2364] dark:hover:border-[#6B3F8E] dark:hover:text-[#6B3F8E] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-[#4A2364] dark:bg-[#6B3F8E]'
                      : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-[#4A2364] hover:text-[#4A2364] dark:hover:border-[#6B3F8E] dark:hover:text-[#6B3F8E] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Brand Logos */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-center text-xs tracking-[0.2em] text-gray-400 dark:text-gray-500 font-sans-body mb-8">
            PROUDLY SERVING
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {brandLogos.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-center h-16 sm:h-20 px-6 sm:px-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#1A1A1A]/50 text-gray-400 dark:text-gray-500 font-sans-body font-semibold text-sm sm:text-base tracking-wider hover:text-[#4A2364] dark:hover:text-[#6B3F8E] hover:border-[#4A2364]/30 dark:hover:border-[#6B3F8E]/30 transition-all duration-300 cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
