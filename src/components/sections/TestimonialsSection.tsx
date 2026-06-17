'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  {
    quote:
      "What sets Akshar apart is their remarkable design flexibility and willingness to customize every detail. Whether we need bespoke headboards or custom metalwork for our lobby spaces, they adapt their manufacturing to match our exact specifications without missing a deadline.",
    name: 'David Park',
    title: 'Senior Architect',
    brand: 'Wyndham Hotels & Resorts',
  },
  {
    quote:
      "In the hospitality FF&E space, finding a partner who delivers true cost-effectiveness without compromising on quality is rare. Akshar consistently provides competitive pricing while maintaining the premium finishes our brands demand — that balance is what keeps us coming back.",
    name: 'Elena Vasquez',
    title: 'Procurement Director',
    brand: 'Choice Hotels International',
  },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }, [nextSlide, prevSlide]);

  const t = testimonials[currentSlide];

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 80 : -80,
      scale: 0.97,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -80 : 80,
      scale: 0.97,
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#5d2c86] py-20 lg:py-28 overflow-hidden"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large faded quote marks */}
        <div className="absolute -top-8 left-[5%] text-white/[0.04] text-[20rem] leading-none font-serif-display select-none">
          &ldquo;
        </div>
        <div className="absolute -bottom-20 right-[5%] text-white/[0.04] text-[20rem] leading-none font-serif-display select-none">
          &rdquo;
        </div>
        {/* Subtle dot grid */}
        <svg className="absolute top-1/2 left-4 -translate-y-1/2 opacity-[0.06]" width="60" height="200" viewBox="0 0 60 200">
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={`l${i}`} cx={(i % 5) * 15} cy={Math.floor(i / 5) * 40} r="1.5" fill="white" />
          ))}
        </svg>
        <svg className="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.06]" width="60" height="200" viewBox="0 0 60 200">
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={`r${i}`} cx={(i % 5) * 15} cy={Math.floor(i / 5) * 40} r="1.5" fill="white" />
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
          <p className="text-xs tracking-[0.3em] text-white/50 mb-4 font-sans-body font-medium">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-white mb-4">
            TRUSTED BY HOSPITALITY BRANDS
          </h2>
          <div className="w-16 h-[2px] bg-white/30 mx-auto mt-6" />
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            className="relative bg-[#f8f3ed] rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Purple accent strip on the left */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#5d2c86]" />

            <div className="p-8 sm:p-10 lg:p-14 pl-10 sm:pl-12 lg:pl-16">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  {/* Quote icon */}
                  <div className="mb-5">
                    <Quote className="w-8 h-8 text-[#5d2c86]/25" />
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#5d2c86] text-[#5d2c86]" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-lg sm:text-xl lg:text-2xl text-[#1A1A1A] leading-relaxed font-sans-body mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Person info */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Avatar initials */}
                    <div className="w-11 h-11 rounded-full bg-[#5d2c86] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold font-sans-body text-sm">
                        {t.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1A1A1A] font-sans-body">
                        {t.name}
                      </p>
                      <p className="text-sm text-gray-500 font-sans-body">
                        {t.title}
                      </p>
                    </div>
                    {/* Brand badge */}
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#5d2c86]/[0.08] border border-[#5d2c86]/[0.15] text-[#5d2c86] text-xs font-sans-body font-semibold tracking-wide">
                      {t.brand}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar at bottom */}
            <div className="h-[3px] bg-[#5d2c86]/10">
              <motion.div
                key={currentSlide}
                className="h-full bg-[#5d2c86]"
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? '0%' : '100%' }}
                transition={{ duration: 6, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { value: '240+', label: 'Brands Served' },
            { value: '98%', label: 'On-Time Delivery' },
            { value: '4.9/5', label: 'Client Rating' },
            { value: '21', label: 'Day Avg. Delivery' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-white/50 font-sans-body mt-1 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
