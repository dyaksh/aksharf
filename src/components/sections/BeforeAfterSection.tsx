'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Lamp,
  Sofa,
  Utensils,
  DoorOpen,
  Maximize2,
  X,
  MoveHorizontal,
  Sparkles,
} from 'lucide-react';

// ─── Room data ───────────────────────────────────────────────────────
// Uses distinct room photos for before/after comparison.
interface RoomData {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  before: string;       // Before image (unfurnished/different room)
  after: string;        // After image (furnished)
  description: string;
  specs: string[];
  accentColor: string;
}

const rooms: RoomData[] = [
  {
    id: 'guest-room',
    label: 'Guest Room',
    sublabel: 'Standard & Deluxe',
    icon: Bed,
    before: '/images/room-transformation/room-7.png',
    after: '/images/room-transformation/room-1.png',
    description: 'Complete FF&E transformation — casegoods, headboard, seating, lighting & decor for a premium guest experience.',
    specs: ['Custom headboard & bed frame', 'Nightstands & dresser', 'Desk & task chair', 'Floor lamp & sconces', 'Art & accent pieces'],
    accentColor: '#5d2c86',
  },
  {
    id: 'suite',
    label: 'Executive Suite',
    sublabel: 'Luxury Living Space',
    icon: DoorOpen,
    before: '/images/room-transformation/room-8.png',
    after: '/images/room-transformation/room-2.png',
    description: 'Full suite FF&E package — living area, bedroom zone, and workspace with bespoke furniture & ambient lighting.',
    specs: ['Upholstered sofa & armchairs', 'Console & coffee table', 'King headboard panel', 'Chandelier & pendants', 'Decorative mirrors & art'],
    accentColor: '#7d44a8',
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    sublabel: 'Vanity & Accessories',
    icon: Bath,
    before: '/images/room-transformation/room-9.png',
    after: '/images/room-transformation/room-3.png',
    description: 'Elegant bathroom FF&E — vanities, mirrors, towel accessories, and hardware crafted for durability & style.',
    specs: ['Vanity unit & basin', 'Framed mirror', 'Towel rack & hooks', 'Soap dispenser & tray', 'Vanity lighting'],
    accentColor: '#9b6ec5',
  },
  {
    id: 'lobby',
    label: 'Lobby & Reception',
    sublabel: 'First Impression',
    icon: Sofa,
    before: '/images/room-transformation/room-10.png',
    after: '/images/room-transformation/room-4.png',
    description: 'Grand lobby FF&E — statement seating, reception desk, lighting installations, and curated art for an unforgettable welcome.',
    specs: ['Reception desk & credenza', 'Lobby seating ensemble', 'Statement chandelier', 'Planters & accent tables', 'Feature wall art'],
    accentColor: '#5d2c86',
  },
  {
    id: 'dining',
    label: 'Dining Area',
    sublabel: 'Restaurant & Banquet',
    icon: Utensils,
    before: '/images/room-transformation/room-11.png',
    after: '/images/room-transformation/room-5.png',
    description: 'Restaurant & banquet FF&E — dining tables, chairs, buffet stations, and atmospheric lighting solutions.',
    specs: ['Dining tables & chairs', 'Buffet & server stations', 'Pendant & ambient lighting', 'Upholstered banquettes', 'Decorative partitions'],
    accentColor: '#7d44a8',
  },
  {
    id: 'lighting',
    label: 'Lighting Design',
    sublabel: 'Ambient & Task',
    icon: Lamp,
    before: '/images/room-transformation/room-12.png',
    after: '/images/room-transformation/room-6.png',
    description: 'Comprehensive lighting FF&E — chandeliers, sconces, pendants, and task lighting designed for hospitality spaces.',
    specs: ['Chandeliers & pendants', 'Wall sconces & vanity lights', 'Table & floor lamps', 'LED accent lighting', 'Custom fixture design'],
    accentColor: '#9b6ec5',
  },
];

// ─── Smart image with dual fallback ──────────────────────────────────
// Tries AI image first, falls back to a different real image
function SmartImage({
  primarySrc,
  fallbackSrc,
  alt,
  className,
  draggable,
  isBefore = false,
}: {
  primarySrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  draggable?: boolean;
  isBefore?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(fallbackSrc);
  const [isAi, setIsAi] = useState(false);

  // Check if AI image exists; fall back to catalog/room image
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) {
        setImgSrc(primarySrc);
        setIsAi(true);
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setImgSrc(fallbackSrc);
        setIsAi(false);
      }
    };
    img.src = primarySrc;
    return () => { cancelled = true; };
  }, [primarySrc, fallbackSrc]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className || ''}
      draggable={draggable}
      style={isBefore && !isAi ? {
        filter: 'grayscale(0.6) brightness(0.85) contrast(1.05) saturate(0.7)',
      } : undefined}
    />
  );
}

// ─── Comparison Slider ───────────────────────────────────────────────
function ComparisonSlider({
  beforeSrc,
  afterSrc,
  fallbackBeforeSrc,
  fallbackAfterSrc,
  roomLabel,
  accentColor,
}: {
  beforeSrc: string;
  afterSrc: string;
  fallbackBeforeSrc: string;
  fallbackAfterSrc: string;
  roomLabel: string;
  accentColor: string;
}) {
  const [position, setPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setPosition(pct);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

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

  // Auto-animate slider on mount
  useEffect(() => {
    if (hasInteracted) return;
    let frame: number;
    let startTime: number | null = null;
    const duration = 3000;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      setPosition(15 + eased * 70);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 1200);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [hasInteracted, afterSrc]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden cursor-col-resize select-none shadow-2xl shadow-black/50"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-label={`${roomLabel} before and after comparison slider`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {/* After image (full, underneath) */}
      <div className="absolute inset-0">
        <SmartImage
          primarySrc={afterSrc}
          fallbackSrc={fallbackAfterSrc}
          alt={`${roomLabel} — after Akshar Foshan FF&E furnishing`}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Subtle warm vignette on after side */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(0,0,0,0.12) 100%)',
        }} />
      </div>

      {/* Before image (clipped from left via clip-path) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <SmartImage
          primarySrc={beforeSrc}
          fallbackSrc={fallbackBeforeSrc}
          alt={`${roomLabel} — before FF&E installation`}
          className="w-full h-full object-cover"
          draggable={false}
          isBefore={true}
        />
      </div>

      {/* BEFORE / AFTER labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/90 bg-black/50 backdrop-blur-md rounded-md border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          BEFORE
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white bg-[#5d2c86]/80 backdrop-blur-md rounded-md border border-[#7d44a8]/30">
          <Sparkles className="w-3 h-3" />
          AFTER
        </span>
      </div>

      {/* Slider divider line */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Glow line */}
        <div className="absolute inset-y-0 -left-[6px] w-[14px]" style={{
          background: `linear-gradient(180deg, transparent, ${accentColor}40, ${accentColor}, ${accentColor}40, transparent)`,
          filter: 'blur(2px)',
        }} />
        {/* Sharp line */}
        <div className="w-[2px] h-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />

        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:scale-110 transition-transform duration-200 border-[3px] border-white/90"
            style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}
          >
            <div className="flex items-center">
              <ChevronLeft className="w-4 h-4 text-white/80 -mr-1" />
              <div className="w-[1px] h-5 bg-white/30 mx-0" />
              <ChevronRight className="w-4 h-4 text-white/80 -ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Drag hint */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 2 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <MoveHorizontal className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/60 tracking-wider font-medium">DRAG TO COMPARE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Fullscreen Modal ────────────────────────────────────────────────
function FullscreenModal({
  room,
  onClose,
}: {
  room: RoomData;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Close fullscreen view"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <div className="w-full max-w-6xl">
        <ComparisonSlider
          beforeSrc={room.before}
          afterSrc={room.after}
          fallbackBeforeSrc={room.fallbackBefore}
          fallbackAfterSrc={room.fallbackAfter}
          roomLabel={room.label}
          accentColor={room.accentColor}
        />
      </div>
    </motion.div>
  );
}

// ─── Room Spec Item ──────────────────────────────────────────────────
function SpecItem({ text, accentColor, delay }: { text: string; accentColor: string; delay: number }) {
  return (
    <motion.li
      className="flex items-center gap-2 text-sm text-white/70 font-sans-body"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
      {text}
    </motion.li>
  );
}

// ─── Main Section ────────────────────────────────────────────────────
export default function BeforeAfterSection() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [fullscreenRoom, setFullscreenRoom] = useState<RoomData | null>(null);
  const [direction, setDirection] = useState(0);

  const currentRoom = rooms[activeRoom];

  const goToRoom = useCallback((index: number) => {
    setDirection(index > activeRoom ? 1 : -1);
    setActiveRoom(index);
  }, [activeRoom]);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveRoom((prev) => (prev + 1) % rooms.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const slideVariants = useMemo(() => ({
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
    }),
  }), []);

  return (
    <section
      id="showcase"
      className="relative py-16 lg:py-24 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(93,44,134,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Decorative gradient orbs */}
      <div
        className="absolute -top-64 -left-64 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(93,44,134,0.1) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-64 -right-64 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(125,68,168,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-10 lg:mb-14">
          {/* HS Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#5d2c86]/40 bg-[#5d2c86]/10 backdrop-blur-sm">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#5d2c86] to-[#7d44a8] flex items-center justify-center">
                <span className="text-[10px] font-black text-white tracking-wider">HS</span>
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#7d44a8]">HOSPITALITY SUITE</span>
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            className="text-xs tracking-[0.3em] text-[#5d2c86] mb-4 font-sans-body font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
            className="mt-4 text-base text-white/40 max-w-2xl mx-auto font-sans-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>

        {/* ── Room Navigation Tabs ── */}
        <motion.div
          className="mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            {rooms.map((room, i) => {
              const Icon = room.icon;
              const isActive = i === activeRoom;
              return (
                <button
                  key={room.id}
                  onClick={() => goToRoom(i)}
                  className={`
                    group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-lg
                    transition-all duration-300 text-xs sm:text-sm font-medium
                    ${isActive
                      ? 'bg-[#5d2c86] text-white shadow-lg shadow-[#5d2c86]/30'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/5 hover:border-white/10'
                    }
                  `}
                  aria-label={`View ${room.label} transformation`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`} />
                  <span className="hidden sm:inline">{room.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border border-[#7d44a8]/50"
                      layoutId="activeRoomTab"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Main Content Area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">
          {/* Comparison Slider */}
          <div className="relative">
            {/* Prev/Next buttons */}
            <button
              onClick={goPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-all duration-300 hover:border-white/20 group"
              aria-label="Previous room"
            >
              <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-all duration-300 hover:border-white/20 group"
              aria-label="Next room"
            >
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </button>

            {/* Fullscreen button */}
            <button
              onClick={() => setFullscreenRoom(currentRoom)}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/50 transition-all duration-300 group"
              aria-label="View fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80" />
            </button>

            {/* Animated slider */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentRoom.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <ComparisonSlider
                  beforeSrc={currentRoom.before}
                  afterSrc={currentRoom.after}
                  fallbackBeforeSrc={currentRoom.fallbackBefore}
                  fallbackAfterSrc={currentRoom.fallbackAfter}
                  roomLabel={currentRoom.label}
                  accentColor={currentRoom.accentColor}
                />
              </motion.div>
            </AnimatePresence>

            {/* Room counter */}
            <div className="absolute bottom-4 left-4 z-30">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <span className="text-xs font-bold text-[#5d2c86]">{String(activeRoom + 1).padStart(2, '0')}</span>
                <span className="text-xs text-white/30">/</span>
                <span className="text-xs text-white/40">{String(rooms.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5">
              {rooms.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToRoom(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeRoom
                      ? 'w-6 h-1.5 bg-[#5d2c86]'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to room ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Room Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoom.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="hidden lg:block"
            >
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 space-y-5">
                {/* Room title */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${currentRoom.accentColor}20` }}
                    >
                      {(() => {
                        const Icon = currentRoom.icon;
                        return <Icon className="w-4 h-4" style={{ color: currentRoom.accentColor }} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif-display text-white">{currentRoom.label}</h3>
                      <p className="text-[10px] tracking-[0.15em] text-white/30 uppercase">{currentRoom.sublabel}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/50 font-sans-body leading-relaxed">
                  {currentRoom.description}
                </p>

                {/* Divider */}
                <div className="h-px w-full" style={{
                  background: `linear-gradient(90deg, ${currentRoom.accentColor}40, transparent)`,
                }} />

                {/* FF&E Specs */}
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.15em] text-white/40 mb-3 uppercase">FF&amp;E Included</h4>
                  <ul className="space-y-2">
                    {currentRoom.specs.map((spec, i) => (
                      <SpecItem key={spec} text={spec} accentColor={currentRoom.accentColor} delay={0.1 + i * 0.05} />
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  className="w-full py-3 rounded-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${currentRoom.accentColor}, ${currentRoom.accentColor}cc)`,
                    color: '#fff',
                    boxShadow: `0 4px 20px ${currentRoom.accentColor}30`,
                  }}
                  onClick={() => setFullscreenRoom(currentRoom)}
                >
                  VIEW FULL SCREEN
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile room info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${currentRoom.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-5 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
          >
            <div className="flex items-center gap-2 mb-2">
              {(() => {
                const Icon = currentRoom.icon;
                return <Icon className="w-4 h-4 text-[#5d2c86]" />;
              })()}
              <h3 className="text-base font-bold font-serif-display text-white">{currentRoom.label}</h3>
              <span className="text-[10px] tracking-[0.1em] text-white/30 uppercase ml-auto">{currentRoom.sublabel}</span>
            </div>
            <p className="text-xs text-white/40 font-sans-body leading-relaxed">
              {currentRoom.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom stats bar ── */}
        <motion.div
          className="mt-10 lg:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { value: '240+', label: 'Hotel Brands' },
            { value: '13+', label: 'Manufacturing Facilities' },
            { value: '5K+', label: 'FF&E Products' },
            { value: '98%', label: 'On-Time Delivery' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
              <p className="text-xl sm:text-2xl font-bold font-serif-display text-[#5d2c86]">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-white/30 tracking-wider mt-1 font-sans-body">{stat.label}</p>
            </div>
          ))}
        </motion.div>

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

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenRoom && (
          <FullscreenModal
            room={fullscreenRoom}
            onClose={() => setFullscreenRoom(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}