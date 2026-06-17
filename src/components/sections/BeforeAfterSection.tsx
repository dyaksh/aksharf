'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Comparison data ───
const comparisons = [
  {
    label: 'Guest Room',
    before: '/catalog-pages/page_1.png',
    after: '/catalog-pages/page_11.png',
  },
];

// ─── Corner bracket SVG ──────────────────────────────────────────────
function CornerBrackets() {
  const size = 28;
  const stroke = '#5d2c86';
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
function ComparisonSlider({ beforeSrc, afterSrc, beforeLabel, afterLabel }: { beforeSrc: string; afterSrc: string; beforeLabel: string; afterLabel: string }) {
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
      aria-label={`${beforeLabel} and ${afterLabel} comparison slider`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {/* After image (full, underneath) */}
      <div className="absolute inset-0">
        <img
          src={afterSrc}
          alt={`${afterLabel} — after FF&E furnishing`}
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
          alt={`${beforeLabel} — before FF&E furnishing`}
          className="w-full h-full object-cover grayscale"
          draggable={false}
        />
        {/* Gray overlay for extra contrast */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* BEFORE / AFTER labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white bg-[#000]/50 backdrop-blur-sm rounded">
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
        {/* Vertical line */}
        <div className="w-[2px] h-full bg-[#5d2c86] shadow-[0_0_8px_rgba(93,44,134,0.5)]" />

        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <div className="w-12 h-12 rounded-full bg-[#5d2c86] border-[3px] border-[#FFF] flex items-center justify-center shadow-lg shadow-black/40 hover:scale-110 transition-transform duration-200">
            <ChevronLeft className="w-4 h-4 text-white -mr-1" />
            <ChevronRight className="w-4 h-4 text-white -ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────
export default function BeforeAfterSection() {
  return (
    <section
      id="showcase"
      className="relative py-16 lg:py-24 bg-[#000] overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(93,44,134,0.06) 1px, transparent 0)',
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
          background: 'radial-gradient(circle, rgba(93,44,134,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-10 lg:mb-12">
          {/* Eyebrow */}
          <motion.p
            className="text-xs tracking-[0.3em] text-[#5d2c86] mb-4 font-sans-body font-semibold"
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
            See the <span className="text-[#5d2c86] italic">difference</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="mt-4 text-base text-[#FFF]/40 max-w-xl mx-auto font-sans-body leading-relaxed"
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
              background: 'linear-gradient(90deg, transparent, #5d2c86, transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>

        {/* ── Comparison Container ── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Corner brackets */}
          <CornerBrackets />

          {/* Comparison slider */}
          <ComparisonSlider
            beforeSrc={comparisons[0].before}
            afterSrc={comparisons[0].after}
            beforeLabel={comparisons[0].label}
            afterLabel={comparisons[0].label}
          />
        </motion.div>

        {/* ── Drag hint ── */}
        <motion.p
          className="text-center mt-5 text-xs text-[#FFF]/25 font-sans-body tracking-wider"
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
              'linear-gradient(90deg, transparent, rgba(93,44,134,0.3) 30%, rgba(93,44,134,0.3) 70%, transparent)',
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
