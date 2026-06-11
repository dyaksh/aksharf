'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, PlayCircle } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Akshar Foshan delivered 240 keys of casegoods and upholstery on schedule with zero defects. Their quality control process is second to none — every piece arrived inspection-ready, saving us weeks of rework.",
    name: 'Sarah Chen',
    title: 'Director of Procurement',
    brand: 'Hilton Garden Inn',
    gradient: 'from-[#5d2c86] to-[#7d44a8]',
  },
  {
    quote:
      "We've partnered with Akshar on three properties now. Their ability to translate our brand standards into perfectly crafted FF&E packages — from lighting to bathroom accessories — makes them indispensable.",
    name: 'Michael Torres',
    title: 'VP of Design & Construction',
    brand: 'IHG Hotels & Resorts',
    gradient: 'from-[#D4AF37] to-[#C4982A]',
  },
  {
    quote:
      "The speed and reliability are remarkable. From approved samples to full delivery in 21 days for our Marriott project — that kind of turnaround without compromising quality is extraordinary.",
    name: 'Rebecca Holden',
    title: 'Senior Project Manager',
    brand: 'Marriott International',
    gradient: 'from-[#5d2c86] to-[#D4AF37]',
  },
  {
    quote:
      "What sets Akshar apart is their remarkable design flexibility and willingness to customize every detail. Whether we need bespoke headboards or custom metalwork for our lobby spaces, they adapt their manufacturing to match our exact specifications without missing a deadline.",
    name: 'David Park',
    title: 'Senior Architect',
    brand: 'Wyndham Hotels & Resorts',
    gradient: 'from-[#3d1c5a] to-[#5d2c86]',
  },
  {
    quote:
      "In the hospitality FF&E space, finding a partner who delivers true cost-effectiveness without compromising on quality is rare. Akshar consistently provides competitive pricing while maintaining the premium finishes our brands demand — that balance is what keeps us coming back.",
    name: 'Elena Vasquez',
    title: 'Procurement Director',
    brand: 'Choice Hotels International',
    gradient: 'from-[#D4AF37] to-[#5d2c86]',
  },
];

const brandLogos = ['IHG', 'Hilton', 'Marriott', 'Choice', 'Wyndham'];

const videoTestimonials = [
  { name: 'Sarah Chen', brand: 'Hilton Garden Inn', duration: '2:30' },
  { name: 'Michael Torres', brand: 'IHG Hotels & Resorts', duration: '2:30' },
  { name: 'David Park', brand: 'Wyndham Hotels & Resorts', duration: '2:30' },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  // Touch / swipe handlers
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
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }, [nextSlide, prevSlide]);

  return (
    <section className="relative bg-white dark:bg-[#121212] py-20 lg:py-28 overflow-hidden transition-colors duration-300">
      {/* Subtle geometric decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-12 right-0 w-64 h-64 rounded-full bg-[#5d2c86]/[0.03] dark:bg-[#5d2c86]/[0.08]" />
        <div className="absolute bottom-8 left-0 w-48 h-48 rounded-full bg-[#D4AF37]/[0.04] dark:bg-[#D4AF37]/[0.06]" />
        <svg
          className="absolute top-1/2 left-8 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.08]"
          width="80"
          height="200"
          viewBox="0 0 80 200"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={i} cx={(i % 5) * 20} cy={Math.floor(i / 5) * 40} r="2" fill="#5d2c86" />
          ))}
        </svg>
        <svg
          className="absolute top-1/2 right-8 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.08]"
          width="80"
          height="200"
          viewBox="0 0 80 200"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={i} cx={(i % 5) * 20} cy={Math.floor(i / 5) * 40} r="2" fill="#5d2c86" />
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
          {/* Gradient border wrapper — visible on active card */}
          <div
            className="relative rounded-2xl p-[2px]"
            style={{
              background:
                'linear-gradient(135deg, #5d2c86, #D4AF37, #5d2c86)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 4s ease infinite',
            }}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="bg-[#f8f3ed]/70 dark:bg-[#1A1A1A]/80 rounded-2xl p-10 sm:p-12 lg:p-14 relative"
                >
                  {/* Gold accent line at top */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                  {/* Quote icon */}
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-[#D4AF37]/30 dark:text-[#D4AF37]/20" />
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-lg sm:text-xl text-[#1A1A1A] dark:text-gray-200 leading-relaxed font-sans-body mb-10 italic">
                    &ldquo;{testimonials[currentSlide].quote}&rdquo;
                  </p>

                  {/* Person info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar initials with gradient background */}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[currentSlide].gradient} flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white font-bold font-sans-body text-lg">
                        {testimonials[currentSlide].name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A] dark:text-white font-sans-body">
                        {testimonials[currentSlide].name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-sans-body">
                        {testimonials[currentSlide].title}
                      </p>
                    </div>
                    {/* Brand logo badge */}
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#5d2c86]/[0.07] dark:bg-[#5d2c86]/[0.15] border border-[#5d2c86]/[0.12] dark:border-[#5d2c86]/[0.25] text-[#5d2c86] dark:text-[#C9A8E8] text-xs font-sans-body font-semibold tracking-wide">
                      {testimonials[currentSlide].brand}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Inline keyframes for gradient animation */}
          <style jsx>{`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-[#5d2c86] hover:text-[#5d2c86] dark:hover:border-[#7d44a8] dark:hover:text-[#7d44a8] transition-colors"
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
                      ? 'w-8 bg-[#5d2c86] dark:bg-[#7d44a8]'
                      : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-[#5d2c86] hover:text-[#5d2c86] dark:hover:border-[#7d44a8] dark:hover:text-[#7d44a8] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Video Testimonials Placeholder */}
        <motion.div
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 font-sans-body font-medium">
              VIDEO STORIES
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#1A1A1A] dark:text-white">
              Watch Our Partners Speak
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                {/* Video thumbnail background */}
                <div className="relative aspect-video bg-gradient-to-br from-[#5d2c86]/20 via-[#f8f3ed] to-[#D4AF37]/10 dark:from-[#5d2c86]/30 dark:via-[#1E1E1E] dark:to-[#D4AF37]/10 flex items-center justify-center">
                  {/* Play icon — always visible, scales on hover */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <PlayCircle className="w-12 h-12 text-[#5d2c86]/40 dark:text-[#7d44a8]/50 group-hover:text-[#5d2c86] dark:group-hover:text-[#7d44a8] group-hover:scale-110 transition-all duration-300" />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#5d2c86]/0 group-hover:bg-[#5d2c86]/10 dark:group-hover:bg-[#5d2c86]/20 transition-colors duration-300" />

                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded bg-black/60 text-white text-xs font-sans-body font-medium">
                    {video.duration}
                  </span>
                </div>

                {/* Info below thumbnail */}
                <div className="bg-white dark:bg-[#1A1A1A] px-4 py-3 border-t border-gray-100 dark:border-gray-800/50">
                  <p className="font-semibold text-[#1A1A1A] dark:text-white font-sans-body text-sm truncate">
                    {video.name}
                  </p>
                  <p className="text-xs text-[#D4AF37] font-sans-body font-medium truncate">
                    {video.brand}
                  </p>
                </div>
              </motion.div>
            ))}
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
            PROUDLY SERVING 50+ BRANDS
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {brandLogos.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group relative flex items-center justify-center h-16 sm:h-20 px-6 sm:px-10 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white/50 dark:bg-[#1E1E1E]/60 text-gray-400 dark:text-gray-500 font-sans-body font-semibold text-sm sm:text-base tracking-wider hover:text-[#5d2c86] dark:hover:text-[#7d44a8] hover:border-[#5d2c86]/30 dark:hover:border-[#7d44a8]/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Shimmer sweep on hover */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(212,175,55,0.12), transparent)',
                  }}
                  aria-hidden="true"
                />
                <span className="relative z-10">{brand}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
