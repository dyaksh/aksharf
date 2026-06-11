'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Comparison data ─────────────────────────────────────────────────
const comparisons = [
  {
    label: 'Guest Room',
    before: '/catalog-pages/page_5.png',
    after: '/catalog-pages/page_11.png',
  },
  {
    label: 'Bathroom',
    before: '/catalog-pages/page_3.png',
    after: '/catalog-pages/page_20.png',
  },
  {
    label: 'Lobby',
    before: '/catalog-pages/page_1.png',
    after: '/catalog-pages/page_30.png',
  },
];

// ─── Corner bracket SVG ──────────────────────────────────────────────
function CornerBrackets() {
  const size = 28;
  const stroke = '#D4AF37';
  const sw = 2;
  const len = 20;

  return (
    <>
      {/* Top-left */}
      <svg
        className="absolute top-3 left-3 pointer-events-none"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <path d={`M0,${len} L0,0 L${len},0`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
      {/* Top-right */}
      <svg
        className="absolute top-3 right-3 pointer-events-none"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <path d={`M${size - len},0 L${size},0 L${size},${len}`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
      {/* Bottom-left */}
      <svg
        className="absolute bottom-3 left-3 pointer-events-none"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <path d={`M0,${size - len} L0,${size} L${len},${size}`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
      {/* Bottom-right */}
      <svg
        className="absolute bottom-3 right-3 pointer-events-none"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <path d={`M${size - len},${size} L${size},${size} L${size},${size - len}`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
    </>
  );
}

// ─── Comparison Slider ───────────────────────────────────────────────
function ComparisonSlider({ beforeSrc, afterSrc }: { beforeSrc: string; afterSrc: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setPosition(pct);
  }, []);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    updatePosition(e.clientX);
  }, [updatePosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [updatePosition]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      isDragging.current = false;
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {/* After image (full, underneath) */}
      <div className="absolute inset-0">
        <img
          src={afterSrc}
          alt="After FF&E furnishing"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Before image (clipped from left via clip-path) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt="Before FF&E furnishing"
          className="w-full h-full object-cover grayscale"
          draggable={false}
        />
        {/* Gray overlay for extra contrast */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* BEFORE / AFTER labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white bg-black/50 backdrop-blur-sm rounded">
          BEFORE
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white bg-[#5d2c86]/70 backdrop-blur-sm rounded">
          AFTER
        </span>
      </div>

      {/* Slider divider line */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical gold line */}
        <div className="w-[2px] h-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />

        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <div className="w-12 h-12 rounded-full bg-[#5d2c86] border-[3px] border-[#D4AF37] flex items-center justify-center shadow-lg shadow-black/40 hover:scale-110 transition-transform duration-200">
            <ChevronLeft className="w-4 h-4 text-[#D4AF37] -mr-1" />
            <ChevronRight className="w-4 h-4 text-[#D4AF37] -ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────
export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="showcase"
      className="relative py-20 lg:py-32 bg-[#1A1A1A] overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(212,175,55,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Decorative gradient orbs */}
      <div
        className="absolute -top-48 -left-48 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(93,44,134,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-10 lg:mb-14">
          {/* Eyebrow */}
          <motion.p
            className="text-xs tracking-[0.3em] text-[#D4AF37] mb-4 font-sans-body font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ROOM TRANSFORMATION
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            See the <span className="text-[#D4AF37] italic">difference</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="mt-4 text-base text-gray-400 max-w-xl mx-auto font-sans-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From bare walls to breathtaking spaces — experience the dramatic impact
            of our FF&amp;E solutions through interactive before &amp; after comparisons.
          </motion.p>

          {/* Decorative separator */}
          <motion.div
            className="mx-auto mt-6 w-20 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>

        {/* ── Tab Navigation ── */}
        <motion.div
          className="flex items-center justify-center gap-6 sm:gap-8 mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {comparisons.map((comp, i) => (
            <button
              key={comp.label}
              onClick={() => setActiveTab(i)}
              className={`relative pb-2 text-sm sm:text-base font-sans-body font-semibold tracking-wider uppercase transition-colors duration-300 ${
                activeTab === i
                  ? 'text-[#D4AF37]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {comp.label}
              {/* Gold underline for active tab */}
              {activeTab === i && (
                <motion.div
                  layoutId="activeTab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Comparison Container with Corner Brackets ── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Corner brackets */}
          <CornerBrackets />

          {/* Comparison slider with fade transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <ComparisonSlider
                beforeSrc={comparisons[activeTab].before}
                afterSrc={comparisons[activeTab].after}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Drag hint ── */}
        <motion.p
          className="text-center mt-5 text-xs text-gray-500 font-sans-body tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          DRAG THE SLIDER TO COMPARE
        </motion.p>

        {/* ── Bottom decorative bar ── */}
        <motion.div
          className="mt-12 lg:mt-16 mx-auto w-full max-w-2xl h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(212,175,55,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent)',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </section>
  );
}
