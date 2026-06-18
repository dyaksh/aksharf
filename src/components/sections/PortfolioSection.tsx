'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Table,
  Armchair,
  Sofa,
  Box,
  Bed,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ArrowRight,
  Sparkles,
  Keyboard,
  Lamp,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

/* ── Category & Image Data ──────────────────────────────────── */

interface PortfolioItem {
  id: string;
  category: string;
  name: string;
  image: string;
}

interface CategoryDef {
  key: string;
  label: string;
  icon: React.ElementType;
}

const categories: CategoryDef[] = [
  { key: 'all', label: 'All', icon: ZoomIn },
  { key: 'headboard', label: 'Headboard', icon: Bed },
  { key: 'sofa', label: 'Sofa & Seating', icon: Armchair },
  { key: 'table', label: 'Table & Desk', icon: Table },
  { key: 'cabinet', label: 'Cabinet & Storage', icon: Box },
  { key: 'lighting', label: 'Lighting', icon: Lamp },
];

/* ── Portfolio Items — using real product images from categorized subfolders ── */
const PF = '/images/portfolio';

const portfolioItems: PortfolioItem[] = [
  // ── Headboard (4 items) ──
  { id: 'hb-1', category: 'headboard', name: 'Upholstered Velvet Headboard', image: `${PF}/products/headboard-1.png` },
  { id: 'ns-1', category: 'headboard', name: 'Nightstand with Headboard Set', image: `${PF}/products/nightstand-1.png` },
  { id: 'bd-1', category: 'headboard', name: 'Luxury Hotel Bed Setup', image: `${PF}/bed/bed-1.png` },
  { id: 'bd-2', category: 'headboard', name: 'Premium King Bed Frame', image: `${PF}/bed/bed-2.png` },

  // ── Sofa & Seating (6 items) ──
  { id: 'sf-1', category: 'sofa', name: 'Modern Hotel Sofa', image: `${PF}/sofa/sofa-1.jpeg` },
  { id: 'sf-2', category: 'sofa', name: 'Contemporary Lounge Sofa', image: `${PF}/sofa/sofa-2.jpeg` },
  { id: 'sf-3', category: 'sofa', name: 'Elegant Hospitality Sofa', image: `${PF}/sofa/sofa-3.png` },
  { id: 'sf-4', category: 'sofa', name: 'Designer Modular Sofa', image: `${PF}/sofa/sofa-4.png` },
  { id: 'ch-1', category: 'sofa', name: 'Lounge Accent Chair', image: `${PF}/chairs/chair-1.jpeg` },
  { id: 'ch-2', category: 'sofa', name: 'Executive Club Chair', image: `${PF}/chairs/chair-2.jpeg` },

  // ── Table & Desk (4 items) ──
  { id: 'tb-1', category: 'table', name: 'Hotel Writing Desk', image: `${PF}/table/table-1.jpeg` },
  { id: 'tb-2', category: 'table', name: 'Contemporary Side Table', image: `${PF}/table/table-2.png` },
  { id: 'tb-3', category: 'table', name: 'Accent Console Table', image: `${PF}/table/table-3.png` },
  { id: 'ch-3', category: 'table', name: 'Designer Accent Chair', image: `${PF}/chairs/chair-3.png` },

  // ── Cabinet & Storage (2 items) ──
  { id: 'cb-1', category: 'cabinet', name: 'Premium Storage Cabinet', image: `${PF}/cabinet/cabinet-1.png` },
  { id: 'cp-1', category: 'cabinet', name: 'Hospitality Cupboard Unit', image: `${PF}/cupboard/cupboard-1.png` },

  // ── Lighting (2 items) ──
  { id: 'lm-1', category: 'lighting', name: 'Fabric Shade Table Lamp', image: `${PF}/lamp/lamp-1.png` },
  { id: 'lm-2', category: 'lighting', name: 'Brass Floor Lamp', image: `${PF}/lamp/lamp-2.png` },
];

/* ── Varying heights for Pinterest masonry effect ──────────── */
const heightClasses: Record<string, string> = {
  // Headboard
  'hb-1': 'aspect-[3/4]', 'ns-1': 'aspect-[4/5]', 'bd-1': 'aspect-[3/4]', 'bd-2': 'aspect-[4/5]',
  // Sofa
  'sf-1': 'aspect-[4/5]', 'sf-2': 'aspect-[3/4]', 'sf-3': 'aspect-[4/5]', 'sf-4': 'aspect-square',
  'ch-1': 'aspect-[3/4]', 'ch-2': 'aspect-[4/5]',
  // Table
  'tb-1': 'aspect-[3/4]', 'tb-2': 'aspect-[4/5]', 'tb-3': 'aspect-square', 'ch-3': 'aspect-[4/5]',
  // Cabinet
  'cb-1': 'aspect-[3/4]', 'cp-1': 'aspect-[4/5]',
  // Lighting
  'lm-1': 'aspect-square', 'lm-2': 'aspect-[3/4]',
};

/* ── Count items per category ──────────────────────────────── */
function getCategoryCount(key: string): number {
  if (key === 'all') return portfolioItems.length;
  return portfolioItems.filter((i) => i.category === key).length;
}

/* ── Stagger Animation Variants (blur-to-focus) ────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(6px)',
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

/* ── Particle burst helper ─────────────────────────────────── */
function ParticleBurst({ active, onDone }: { active: boolean; onDone: () => void }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i / 12) * 360,
        distance: 20 + Math.random() * 30,
        size: 3 + Math.random() * 3,
        duration: 0.4 + Math.random() * 0.3,
      })),
    []
  );

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: 0,
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
          }}
          transition={{ duration: p.duration, ease: 'easeOut' }}
          onAnimationComplete={p.id === 0 ? onDone : undefined}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: '#5d2c86',
          }}
        />
      ))}
    </div>
  );
}

/* ── Premium Lightbox Component ─────────────────────────────── */
function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: PortfolioItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Navigate with zoom reset
  const navigateTo = useCallback(
    (index: number) => {
      setIsZoomed(false);
      onNavigate(index);
    },
    [onNavigate]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) { setIsZoomed(false); return; }
        onClose();
      }
      if (e.key === 'ArrowLeft') {
        navigateTo(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
      }
      if (e.key === 'ArrowRight') {
        navigateTo(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
      }
      if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed((prev) => !prev);
      }
      if (e.key === 'h' || e.key === 'H') {
        setShowHints((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, navigateTo, isZoomed]);

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  const categoryLabel =
    categories.find((c) => c.key === currentItem.category)?.label ?? currentItem.category;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 z-[100] w-screen h-screen max-w-none max-h-none translate-x-0 translate-y-0 top-0 left-0 rounded-none border-0 p-0 bg-black/80 backdrop-blur-2xl flex items-center justify-center"
      >
        <DialogTitle className="sr-only">
          {categoryLabel} — {currentItem.name}
        </DialogTitle>
        <DialogDescription className="sr-only">
          View {currentItem.name} in the {categoryLabel} category — image {currentIndex + 1} of {items.length}
        </DialogDescription>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Keyboard Hints Toggle */}
        <button
          onClick={() => setShowHints((p) => !p)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
          aria-label="Show keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* Keyboard Hints Overlay */}
        <AnimatePresence>
          {showHints && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-4 sm:top-18 sm:left-6 z-10 bg-black/70 backdrop-blur-md rounded-lg px-4 py-3 text-white/80 text-xs font-sans-body space-y-1.5 border border-white/10"
            >
              <div className="flex gap-3 items-center">
                <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px]">←</kbd>
                <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px]">→</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex gap-3 items-center">
                <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px]">Z</kbd>
                <span>Zoom</span>
              </div>
              <div className="flex gap-3 items-center">
                <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px]">Esc</kbd>
                <span>Close</span>
              </div>
              <div className="flex gap-3 items-center">
                <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px]">H</kbd>
                <span>Toggle hints</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={() =>
                navigateTo(currentIndex > 0 ? currentIndex - 1 : items.length - 1)
              }
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                navigateTo(currentIndex < items.length - 1 ? currentIndex + 1 : 0)
              }
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image + Info */}
        <div className="flex flex-col items-center justify-center w-full h-full px-4 py-16 sm:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative flex-1 flex items-center justify-center w-full min-h-0 overflow-hidden"
            >
              <motion.div
                className={`relative cursor-zoom-in ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed((prev) => !prev)}
                animate={
                  isZoomed
                    ? { scale: 1.8 }
                    : { scale: 1 }
                }
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Ken Burns subtle animation wrapper */}
                <motion.div
                  animate={
                    isZoomed
                      ? {}
                      : {
                          scale: [1, 1.03, 1],
                          x: [0, 5, 0],
                          y: [0, -3, 0],
                        }
                  }
                  transition={
                    isZoomed
                      ? {}
                      : {
                          duration: 8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                  }
                >
                  <img
                    src={currentItem.image}
                    alt={`${currentItem.name} — ${categoryLabel}`}
                    className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
                    draggable={false}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Info Bar + Progress Dots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="flex flex-col items-center gap-3 mt-4 sm:mt-6"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-[#5d2c86] text-white font-sans-body">
                {categoryLabel}
              </span>
              <span className="text-white/80 text-sm sm:text-base font-sans-body">
                {currentItem.name}
              </span>
              <span className="text-white/40 text-sm font-sans-body ml-2">
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            {/* Progress Dots */}
            {items.length > 1 && (
              <div className="flex items-center gap-1.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigateTo(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIndex
                        ? 'w-6 h-2 bg-[#5d2c86]'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Enhanced Masonry Item Component ────────────────────────── */
function MasonryItem({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const categoryLabel =
    categories.find((c) => c.key === item.category)?.label ?? item.category;
  const CategoryIcon = categories.find((c) => c.key === item.category)?.icon ?? Box;
  const aspectClass = heightClasses[item.id] || 'aspect-square';

  // 3D tilt handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -10;
    const tiltY = (x - 0.5) * 10;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      variants={itemVariants}
      className="break-inside-avoid mb-3 sm:mb-4 group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image Card — Pinterest style with rounded corners */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden rounded-2xl ${aspectClass} bg-[#e8e0d6] transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(93,44,134,0.2)]`}
        style={{
          perspective: '800px',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x === 0 && tilt.y === 0 ? 1 : 1.02})`,
          transition: 'transform 0.3s ease-out, box-shadow 0.5s ease',
        }}
      >
        <img
          src={item.image}
          alt={`${item.name} — ${categoryLabel}`}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle dark gradient at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Shimmer sweep on hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmerSweep_0.8s_ease-in-out] bg-gradient-to-br from-transparent via-white/15 to-transparent skew-x-[-20deg]" />
        </div>

        {/* Hover: Zoom icon top-right */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Hover: Category pill at top-left */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5d2c86]/80 backdrop-blur-sm">
            <CategoryIcon className="w-3 h-3 text-white" />
            <span className="text-[10px] tracking-widest uppercase text-white/90 font-sans-body font-medium">
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Purple border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 2px rgba(93,44,134,0.5)' }} />
      </div>

      {/* Pinterest-style caption below image */}
      <div className="px-1 pt-2.5 pb-1">
        <h3 className="text-sm sm:text-base font-serif-display font-semibold text-[#000] leading-snug line-clamp-2 group-hover:text-[#5d2c86] transition-colors duration-300">
          {item.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          <CategoryIcon className="w-3 h-3 text-[#5d2c86]/50" />
          <span className="text-[10px] tracking-wider uppercase text-[#5d2c86]/50 font-sans-body font-medium">
            {categoryLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Portfolio Section ─────────────────────────────────── */
export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [particlesKey, setParticlesKey] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Parallax on grid
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Get filtered items
  const filteredItems =
    activeCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  // Lightbox navigation
  const handleNavigate = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const openLightbox = useCallback(
    (item: PortfolioItem) => {
      const idx = filteredItems.findIndex((i) => i.id === item.id);
      setLightboxIndex(idx >= 0 ? idx : 0);
      setLightboxOpen(true);
    },
    [filteredItems]
  );

  // Category switch with particles
  const handleCategoryChange = useCallback((key: string) => {
    setActiveCategory(key);
    setShowParticles(true);
    setParticlesKey((prev) => prev + 1);
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Eyebrow and heading word split for animations
  const eyebrowText = 'Crafted with Precision';
  const headingWords = ['Our', 'Portfolio'];

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-0 overflow-hidden"
      style={{ backgroundColor: '#f8f3ed' }}
    >
      {/* ── Cinematic Page Header ──────────────────────────── */}
      <div className="relative w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] flex items-center justify-center overflow-hidden">
        {/* Gradient overlay purple to transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#5d2c86] via-[#5d2c86]/70 to-transparent" />

        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #FFF 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 80px,
                rgba(93,44,134,0.3) 80px,
                rgba(93,44,134,0.3) 81px
              )`,
            }}
          />
        </div>

        {/* Animated purple line reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5d2c86] to-transparent origin-center"
        />

        <div className="relative z-10 text-center px-4 py-16 sm:py-20 lg:py-24">
          {/* Eyebrow with letter-spacing animation */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.35em' } : {}}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.3 }}
            className="text-[11px] sm:text-xs text-[#FFF]/70 uppercase mb-4 sm:mb-5 font-sans-body font-medium"
          >
            {eyebrowText}
          </motion.p>

          {/* Heading with cinematic word-by-word reveal */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-bold text-white leading-tight flex flex-wrap items-center justify-center gap-x-4">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Animated line below heading */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.0 }}
            className="mt-6 sm:mt-8 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FFF]/40 to-transparent origin-center"
          />
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.2 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5d2c86]/40 to-transparent origin-center"
        />
      </div>

      {/* ── Content Area ──────────────────────────────────────── */}
      <div className="relative py-16 sm:py-20 lg:py-24">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #5d2c86 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Accent line between sections */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#5d2c86]/30 to-transparent" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Category Filter Pills ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
            className="mb-10 sm:mb-14"
          >
            <div className="relative flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide justify-start sm:justify-center px-1 flex-wrap">
              {categories.filter(cat => cat.key === 'all' || getCategoryCount(cat.key) > 0).map((cat) => {
                const isActive = activeCategory === cat.key;
                const Icon = cat.icon;
                const count = getCategoryCount(cat.key);
                return (
                  <div key={cat.key} className="relative flex-shrink-0">
                    <button
                      onClick={() => handleCategoryChange(cat.key)}
                      className={`
                        flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium
                        transition-all duration-300 whitespace-nowrap font-sans-body
                        ${
                          isActive
                            ? 'bg-[#5d2c86] text-white shadow-lg shadow-[#5d2c86]/25 scale-105'
                            : 'bg-white text-[#000]/45 hover:text-[#5d2c86] hover:bg-white hover:shadow-md border border-[#000]/8'
                        }
                      `}
                      aria-pressed={isActive}
                      aria-label={`Filter by ${cat.label}`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#000]/30'}`} />
                      <span>{cat.label}</span>
                      {/* Count badge */}
                      <span
                        className={`ml-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#000]/5 text-[#000]/30'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                    {/* Particle burst on this active pill */}
                    {isActive && (
                      <ParticleBurst
                        key={particlesKey}
                        active={showParticles}
                        onDone={() => setShowParticles(false)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Masonry Grid with Parallax ─────────────────────── */}
          <motion.div style={{ y: gridY }} ref={gridRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="masonry-grid"
              >
                {filteredItems.map((item, index) => (
                  <MasonryItem
                    key={item.id}
                    item={item}
                    index={index}
                    onClick={() => openLightbox(item)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-[#000]/30 font-sans-body"
            >
              No items in this category yet.
            </motion.div>
          )}

          {/* ── Accent line between sections ────────────── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="mt-16 sm:mt-20"
          >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#5d2c86]/20 to-transparent" />
          </motion.div>

          {/* ── Request Custom CTA ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="mt-10 sm:mt-14 mb-4"
          >
            <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10 lg:p-12 text-center">
              {/* Purple gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5d2c86] via-[#5d2c86] to-[#000]" />

              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border border-[#FFF]/15" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-[1px] rounded-2xl pointer-events-none"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0%, transparent 75%, rgba(93,44,134,0.6) 85%, transparent 100%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                  }}
                />
              </div>

              {/* Subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, #FFF 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="w-14 h-14 rounded-full bg-[#FFF]/10 border border-[#FFF]/20 flex items-center justify-center mx-auto mb-5"
                >
                  <Sparkles className="w-6 h-6 text-[#FFF]" />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white mb-3">
                  Don&apos;t see what you need?
                </h3>
                <p className="text-white/60 text-sm sm:text-base font-sans-body max-w-md mx-auto mb-7">
                  Every piece we create is tailored to your vision. Let us craft something extraordinary just for you.
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FFF] hover:bg-[#f8f3ed] text-[#5d2c86] font-sans-body font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_24px_rgba(93,44,134,0.3)] hover:scale-105 group"
                >
                  Request Custom Piece
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onNavigate={handleNavigate}
      />

      {/* ── Global Styles — Pinterest Masonry ──────────────────── */}
      <style jsx global>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 12px;
        }
        @media (min-width: 640px) {
          .masonry-grid {
            column-count: 2;
            column-gap: 16px;
          }
        }
        @media (min-width: 768px) {
          .masonry-grid {
            column-count: 3;
            column-gap: 16px;
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 4;
            column-gap: 18px;
          }
        }
        @media (min-width: 1400px) {
          .masonry-grid {
            column-count: 5;
            column-gap: 20px;
          }
        }

        /* Hide scrollbar for category pills */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Shimmer sweep keyframe */
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%) skewX(-20deg);
          }
          100% {
            transform: translateX(200%) skewX(-20deg);
          }
        }

        /* Pinterest-style line clamp */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
