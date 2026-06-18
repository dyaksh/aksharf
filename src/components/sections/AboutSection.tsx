'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import {
  Shield,
  Handshake,
  Sparkles,
  Lightbulb,
  Factory,
  Globe2,
  Users,
  Award,
  Hammer,
  Eye,
  Cog,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
  Expand,
  Quote,
  ArrowRight,
  Minus,
} from 'lucide-react';

/* ── Brand Tokens ────────────────────────────────────────────── */
const PURPLE = '#5d2c86';
const CREAM = '#f8f3ed';
const ACCENT = '#5d2c86';
const DARK = '#1A1A1A';

/* ── Animation Variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1, delay, ease: 'easeOut' },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

/* Cinematic reveal: blur + fade + scale */
const cinematicReveal = {
  hidden: { opacity: 0, scale: 1.08, filter: 'blur(12px)' },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* Blur-to-focus reveal for text blocks */
const blurToFocus = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* Accent line separator animation */
const accentLineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Values Data ─────────────────────────────────────────────── */
const values = [
  {
    icon: Shield,
    title: 'Quality',
    description:
      'Every piece is crafted to the highest hospitality standards, rigorously inspected before it leaves our facilities.',
    accent: ACCENT,
  },
  {
    icon: Handshake,
    title: 'Reliability',
    description:
      'On-time delivery and consistent quality — we understand that project timelines in hospitality are non-negotiable.',
    accent: PURPLE,
  },
  {
    icon: Sparkles,
    title: 'Service',
    description:
      'Client-centric approach from first contact to final install. One dedicated team, one accountable partner.',
    accent: ACCENT,
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Continuously refining materials, processes, and designs to exceed evolving brand standards and guest expectations.',
    accent: PURPLE,
  },
];

/* ── Heritage Timeline Data ──────────────────────────────────── */
const timelineEvents = [
  {
    year: '2010',
    title: 'The Foundation',
    description: 'Established in Foshan with a vision to redefine hospitality FF&E manufacturing.',
    image: '/images/about/about-1.png',
  },
  {
    year: '2013',
    title: 'First Major Contract',
    description: 'Secured our first international hotel brand partnership, setting the standard for excellence.',
    image: '/images/about/about-2.png',
  },
  {
    year: '2016',
    title: 'Facility Expansion',
    description: 'Expanded to 8 manufacturing facilities with dedicated upholstery and casegoods lines.',
    image: '/images/about/about-3.png',
  },
  {
    year: '2019',
    title: 'Global Reach',
    description: 'Delivered projects across 5 continents, earning trust from the world\'s top hotel brands.',
    image: '/images/about/about-4.png',
  },
  {
    year: '2022',
    title: 'Innovation Hub',
    description: 'Launched our R&D center for advanced material testing and sustainable manufacturing.',
    image: '/images/about/about-5.png',
  },
  {
    year: '2025',
    title: 'The Future',
    description: 'Continuing to push boundaries with 13+ facilities and an unwavering commitment to craft.',
    image: '/images/about/about-6.png',
  },
];

/* ── Cinematic Gallery Data (enhanced) ───────────────────────── */
const galleryImages = [
  { src: '/images/about/about-1.png', alt: 'Akshar Foshan manufacturing facility', aspect: 'landscape', span: '' },
  { src: '/images/about/about-2.png', alt: 'Artisan crafting hotel furniture', aspect: 'portrait', span: 'row-span-2' },
  { src: '/images/about/about-3.png', alt: 'Finished hotel room installation', aspect: 'landscape', span: '' },
  { src: '/images/about/about-4.png', alt: 'Production line detail', aspect: 'portrait', span: 'row-span-2' },
  { src: '/images/about/about-5.png', alt: 'Quality inspection station', aspect: 'landscape', span: '' },
  { src: '/images/about/about-6.png', alt: 'Material warehouse overview', aspect: 'square', span: '' },
  { src: '/images/about/about-7.png', alt: 'Upholstery workshop interior', aspect: 'landscape', span: '' },
];

/* ── Our Journey Narrative Data ──────────────────────────────── */
const journeyBlocks = [
  {
    title: 'Rooted in Craft',
    text: 'In the heart of Foshan — China\'s furniture capital — our founders envisioned a manufacturing partner that global hotel brands could trust implicitly. Not just for products, but for the entire FF&E ecosystem.',
    image: '/images/about/about-1.png',
    quote: 'Every great hotel room begins with a promise: that the furniture will endure, delight, and inspire.',
  },
  {
    title: 'Scaled with Precision',
    text: 'From a single workshop to 13+ specialized facilities, each expansion was deliberate — adding capacity without compromising the artisanal quality our clients demand. Vertical integration means every material, joint, and finish is under our control.',
    image: '/images/about/about-5.png',
    quote: 'Scale without control is chaos. We chose scale through mastery.',
  },
  {
    title: 'Delivered Worldwide',
    text: 'Today, our furniture graces hotel rooms across five continents. From the deserts of the Middle East to the coastlines of Southeast Asia, our logistics network ensures every piece arrives on-spec and on-time.',
    image: '/images/about/about-7.png',
    quote: 'The distance from Foshan to a hotel room in Dubai is measured not in kilometers, but in standards.',
  },
];

/* ── Manufacturing Steps ─────────────────────────────────────── */
const manufacturingSteps = [
  {
    icon: Hammer,
    title: 'Raw Material Selection',
    desc: 'Sourcing premium hardwoods, fabrics, and metals from certified suppliers.',
    image: '/images/about/about-4.png',
  },
  {
    icon: Cog,
    title: 'Precision Manufacturing',
    desc: 'CNC machining, hand-finishing, and upholstery by skilled artisans.',
    image: '/images/about/about-3.png',
  },
  {
    icon: Eye,
    title: 'Quality Assurance',
    desc: 'Multi-point inspection protocol aligned with brand standards.',
    image: '/images/about/about-6.png',
  },
  {
    icon: Globe2,
    title: 'Global Logistics',
    desc: 'Containerized shipping, customs coordination, and on-site delivery.',
    image: '/images/about/about-7.png',
  },
];

/* ── Corner Brackets Component ───────────────────────────────── */
function CornerBrackets({ size = 28, inset = 3 }: { size?: number; inset?: number }) {
  const stroke = ACCENT;
  const sw = 2;
  const len = 20;

  return (
    <>
      <svg className="absolute pointer-events-none" style={{ top: inset, left: inset }} width={size} height={size} aria-hidden="true">
        <path d={`M0,${len} L0,0 L${len},0`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
      <svg className="absolute pointer-events-none" style={{ top: inset, right: inset }} width={size} height={size} aria-hidden="true">
        <path d={`M${size - len},0 L${size},0 L${size},${len}`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
      <svg className="absolute pointer-events-none" style={{ bottom: inset, left: inset }} width={size} height={size} aria-hidden="true">
        <path d={`M0,${size - len} L0,${size} L${len},${size}`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
      <svg className="absolute pointer-events-none" style={{ bottom: inset, right: inset }} width={size} height={size} aria-hidden="true">
        <path d={`M${size - len},${size} L${size},${size} L${size},${size - len}`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
    </>
  );
}

/* ── Accent Line Separator ─────────────────────────────────────── */
function AccentLineSeparator({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="flex items-center justify-center py-4" aria-hidden="true">
      <motion.div
        variants={accentLineReveal}
        custom={delay}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex items-center gap-3"
      >
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-[#5d2c86]/40" />
        <div className="w-2 h-2 rounded-full border border-[#5d2c86]/60" />
        <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-[#5d2c86]/40 to-transparent" />
      </motion.div>
    </div>
  );
}

/* ── Animated Counter ────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      if (current !== start) {
        setCount(current);
        start = current;
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── 3D Tilt Card Wrapper ───────────────────────────────────── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.01,1.01,1.01)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

/* ── Parallax Image Component ────────────────────────────────── */
function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.16,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={`overflow-hidden relative ${className || ''}`}>
      <motion.div style={{ y: smoothY }} className="w-full h-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}

/* ── Cinematic Gallery Item (enhanced) ───────────────────────── */
function CinematicGalleryItem({
  image,
  index,
  onExpand,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  onExpand: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const smoothY = useSpring(y, { stiffness: 80, damping: 25 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 25 });

  const aspectClass = image.aspect === 'portrait'
    ? 'aspect-[3/4]'
    : image.aspect === 'square'
    ? 'aspect-square'
    : 'aspect-[4/3]';

  return (
    <motion.div
      ref={ref}
      variants={cinematicReveal}
      custom={index * 0.06}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`${image.span} relative rounded-xl overflow-hidden group cursor-pointer`}
      onClick={() => onExpand(index)}
    >
      <motion.div style={{ y: smoothY, scale: smoothScale }} className="w-full h-full">
        <div className={`${aspectClass} relative w-full h-full`}>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Accent border glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 2px ${ACCENT}60, 0 0 20px ${ACCENT}20`,
        }}
      />

      {/* Corner brackets */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <CornerBrackets size={24} inset={4} />
      </div>

      {/* Expand icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1A1A1A]/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
        <Expand className="w-3.5 h-3.5 text-white" />
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
        <p className="text-white text-xs font-sans-body truncate">{image.alt}</p>
      </div>
    </motion.div>
  );
}

/* ── Lightbox (enhanced with AnimatePresence) ────────────────── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Prev button */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 sm:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Image with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl max-h-[80vh] w-[90vw] aspect-[16/10] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-contain"
            />
            {/* Corner brackets inside lightbox */}
            <div className="absolute inset-0 pointer-events-none">
              <CornerBrackets size={32} inset={6} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 sm:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Counter + caption */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
          <div className="text-white/60 text-sm font-sans-body">
            {currentIndex + 1} / {images.length}
          </div>
          <div className="text-white/40 text-xs font-sans-body mt-1">{image.alt}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Value Card Component (with 3D tilt) ────────────────────── */
function ValueCard({
  icon: Icon,
  title,
  description,
  accent,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.12}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative"
    >
      <TiltCard className="h-full">
        <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-[#5d2c86]/8 dark:hover:shadow-[#5d2c86]/8 overflow-hidden h-full">
          {/* Accent gradient on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`,
            }}
          />
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
          />
          <div className="relative z-10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${accent}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: accent }} />
            </div>
            <h3 className="text-lg font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-sans-body">
              {description}
            </p>
          </div>
          {/* Corner bracket accents */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
            <CornerBrackets size={20} inset={6} />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ── Horizontal Scroll Workshop ──────────────────────────────── */
function WorkshopGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const workshopImages = [
    { src: '/images/about/about-1.png', alt: 'Upholstery workshop', label: 'Upholstery' },
    { src: '/images/about/about-2.png', alt: 'Quality control station', label: 'Quality Control' },
    { src: '/images/about/about-3.png', alt: 'Production floor', label: 'Production' },
    { src: '/images/about/about-4.png', alt: 'Material warehouse', label: 'Warehouse' },
    { src: '/images/about/about-5.png', alt: 'Assembly line', label: 'Assembly' },
    { src: '/images/about/about-6.png', alt: 'Finishing department', label: 'Finishing' },
    { src: '/images/about/about-7.png', alt: 'Installation team', label: 'Installation' },
  ];

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  }, [checkScroll]);

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-[#1a1a1a]/90 shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-[#1a1a1a] transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-[#5d2c86] dark:text-[#5d2c86]" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-[#1a1a1a]/90 shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-[#1a1a1a] transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-[#5d2c86] dark:text-[#5d2c86]" />
        </button>
      )}

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f8f3ed] dark:from-[#141414] to-transparent z-[5] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f8f3ed] dark:from-[#141414] to-transparent z-[5] pointer-events-none" />

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-4 px-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {workshopImages.map((img, i) => (
          <motion.div
            key={img.src}
            variants={cinematicReveal}
            custom={i * 0.08}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] snap-start"
          >
            <div className="relative rounded-xl overflow-hidden group aspect-[4/3]">
              <ParallaxImage src={img.src} alt={img.alt} speed={0.1} />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent" />
              {/* accent bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5d2c86] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              {/* Corner brackets on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <CornerBrackets size={20} inset={4} />
              </div>
              {/* Label */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="text-white text-sm font-serif-display font-semibold">
                  {img.label}
                </span>
                <span className="text-[#5d2c86] text-[10px] tracking-[0.15em] uppercase font-sans-body font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Heritage Timeline Item ──────────────────────────────────── */
function TimelineItem({
  event,
  index,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const smoothY = useSpring(parallaxY, { stiffness: 60, damping: 20 });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);
  const smoothScale = useSpring(imgScale, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index * 0.12}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <motion.div
          style={{ y: smoothY }}
          className="relative rounded-xl overflow-hidden aspect-[16/10] shadow-xl group"
        >
          <motion.div style={{ scale: smoothScale }} className="w-full h-full">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent" />
          {/* Corner brackets */}
          <div className="absolute inset-0 pointer-events-none">
            <CornerBrackets size={28} inset={4} />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2">
        <div className="relative">
          {/* Year badge */}
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#5d2c86]/15 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-[#5d2c86]" />
            </div>
            <span className="text-[#5d2c86] text-sm font-sans-body font-bold tracking-[0.15em]">
              {event.year}
            </span>
          </div>
          <motion.h4
            variants={blurToFocus}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-3"
          >
            {event.title}
          </motion.h4>
          <motion.p
            variants={blurToFocus}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 font-sans-body leading-relaxed"
          >
            {event.description}
          </motion.p>
          {/* Decorative line */}
          <div className="w-12 h-px bg-[#5d2c86]/20 dark:bg-[#5d2c86]/20 mt-4" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Our Journey Narrative Block ─────────────────────────────── */
function JourneyBlock({
  block,
  index,
}: {
  block: (typeof journeyBlocks)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const smoothY = useSpring(parallaxY, { stiffness: 60, damping: 20 });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const smoothScale = useSpring(imgScale, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Text Side */}
      <div className="w-full lg:w-1/2">
        <motion.div
          variants={blurToFocus}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Section number */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#5d2c86] text-xs font-sans-body font-bold tracking-[0.2em]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="w-8 h-px bg-[#5d2c86]/40" />
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight mb-5">
            {block.title}
          </h3>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-sans-body leading-relaxed mb-6">
            {block.text}
          </p>

          {/* Pull quote */}
          <div className="relative pl-6 border-l-2 border-[#5d2c86]/30 py-2">
            <Quote className="absolute -left-3 -top-1 w-5 h-5 text-[#5d2c86]/60 bg-white dark:bg-[#0f0f0f] rounded-full" />
            <p className="text-sm sm:text-base text-[#5d2c86] dark:text-[#5d2c86]/80 font-serif-display italic leading-relaxed">
              {block.quote}
            </p>
          </div>

          {/* accent line */}
          <div className="mt-6 flex items-center gap-2">
            <div className="w-6 h-px bg-[#5d2c86]" />
            <ArrowRight className="w-3 h-3 text-[#5d2c86]" />
          </div>
        </motion.div>
      </div>

      {/* Image Side */}
      <div className="w-full lg:w-1/2">
        <motion.div
          variants={isEven ? slideInRight : slideInLeft}
          custom={0.15}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative"
        >
          <motion.div
            style={{ y: smoothY }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl group"
          >
            <motion.div style={{ scale: smoothScale }} className="w-full h-full">
              <img
                src={block.image}
                alt={block.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
            {/* Cinematic gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 via-transparent to-transparent" />
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26,26,26,0.25) 100%)',
            }} />
            {/* Corner brackets */}
            <div className="absolute inset-0 pointer-events-none">
              <CornerBrackets size={32} inset={6} />
            </div>
          </motion.div>

          {/* Decorative accent */}
          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-[#5d2c86]/20 rounded-br-2xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-[#5d2c86]/20 rounded-tl-2xl pointer-events-none" aria-hidden="true" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ABOUT SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  /* Lightbox state */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-[#0f0f0f] overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: OUR STORY — Text + Cinematic Image Collage
          ═══════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="order-2 lg:order-1"
            >
              <motion.p
                variants={blurToFocus}
                custom={0}
                className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-4 font-sans-body"
              >
                Our Story
              </motion.p>
              <motion.h2
                variants={blurToFocus}
                custom={0.1}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight mb-6"
              >
                From Foshan to the{' '}
                <span className="text-[#5d2c86] dark:text-[#5d2c86] italic">
                  world&apos;s finest hotels
                </span>
              </motion.h2>
              <motion.div
                variants={accentLineReveal}
                custom={0.15}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-16 h-[2px] bg-[#5d2c86] mb-6 origin-left"
              />
              <motion.p
                variants={blurToFocus}
                custom={0.2}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-sans-body leading-relaxed mb-5"
              >
                Akshar Foshan was founded on a singular conviction: hospitality
                deserves furniture that endures. From our manufacturing hub in
                Foshan, China — the heartland of global furniture production — we
                have spent over a decade perfecting the craft of FF&amp;E for the
                world&apos;s most demanding hotel brands.
              </motion.p>
              <motion.p
                variants={blurToFocus}
                custom={0.25}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-sans-body leading-relaxed mb-5"
              >
                Our vertically integrated model — from raw material sourcing to
                final on-site delivery — gives us unmatched control over quality,
                timeline, and cost. Every piece that leaves our facilities carries
                the trust of brands like Hilton, Marriott, IHG, and Hyatt.
              </motion.p>
              <motion.p
                variants={blurToFocus}
                custom={0.3}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-sans-body leading-relaxed mb-8"
              >
                We don&apos;t just supply furniture. We engineer complete
                FF&amp;E ecosystems — casegoods, upholstery, lighting, bathroom
                accessories, art &amp; decor — all under one roof, all held to the
                highest standards of hospitality excellence.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={0.4}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2 text-sm font-sans-body text-[#5d2c86] dark:text-[#5d2c86]">
                  <Award className="w-4 h-4" />
                  <span>ISO 9001 Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-sans-body text-[#5d2c86] dark:text-[#5d2c86]">
                  <Factory className="w-4 h-4" />
                  <span>13+ Manufacturing Facilities</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-sans-body text-[#5d2c86] dark:text-[#5d2c86]">
                  <Globe2 className="w-4 h-4" />
                  <span>5+ Continents Served</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Cinematic Image Collage */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {/* Main large image */}
                <motion.div
                  variants={cinematicReveal}
                  custom={0}
                  className="col-span-2 relative rounded-2xl overflow-hidden aspect-[16/10] shadow-xl group"
                >
                  <ParallaxImage
                    src="/images/about/about-hero.png"
                    alt="Akshar Foshan manufacturing facility exterior"
                    speed={0.12}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent" />
                  {/* Cinematic vignette corners */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26,26,26,0.3) 100%)',
                  }} />
                  {/* Corner brackets */}
                  <div className="absolute inset-0 pointer-events-none">
                    <CornerBrackets size={32} inset={6} />
                  </div>
                </motion.div>

                {/* Two smaller images */}
                <motion.div
                  variants={cinematicReveal}
                  custom={0.15}
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg group"
                >
                  <ParallaxImage
                    src="/images/about/about-2.png"
                    alt="Craftsman working on hotel furniture details"
                    speed={0.1}
                  />
                  {/* Accent border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 2px ${ACCENT}50, 0 0 16px ${ACCENT}15` }}
                  />
                  {/* Corner brackets on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <CornerBrackets size={22} inset={4} />
                  </div>
                </motion.div>
                <motion.div
                  variants={cinematicReveal}
                  custom={0.25}
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg group"
                >
                  <ParallaxImage
                    src="/images/about/about-3.png"
                    alt="Finished hotel room furniture installation"
                    speed={0.1}
                  />
                  {/* accent badge */}
                  <div className="absolute bottom-3 left-3 bg-[#5d2c86] text-[#1A1A1A] text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full font-sans-body">
                    Est. 2010
                  </div>
                  {/* Accent border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 2px ${ACCENT}50, 0 0 16px ${ACCENT}15` }}
                  />
                  {/* Corner brackets on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <CornerBrackets size={22} inset={4} />
                  </div>
                </motion.div>

                {/* Decorative floating elements */}
                <div
                  className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, #5d2c86, transparent)',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-4 -right-4 w-32 h-32 rounded-full opacity-5 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, #5d2c86, transparent)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Accent Line Separator ── */}
      <AccentLineSeparator delay={0} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: VALUES — Animated Cards with 3D Tilt
          ═══════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-28 bg-[#f8f3ed] dark:bg-[#141414] relative">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #5d2c86 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14 lg:mb-20"
          >
            <motion.p
              variants={blurToFocus}
              custom={0}
              className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-4 font-sans-body"
            >
              What Drives Us
            </motion.p>
            <motion.h2
              variants={blurToFocus}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight"
            >
              Values that define{' '}
              <span className="text-[#5d2c86] dark:text-[#5d2c86] italic">every piece</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {values.map((value, i) => (
              <ValueCard key={value.title} {...value} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Accent Line Separator ── */}
      <AccentLineSeparator delay={0} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: FULL IMAGE GALLERY — Cinematic Masonry
          ═══════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-28 bg-white dark:bg-[#0f0f0f] relative">
        {/* Decorative diagonal line */}
        <div
          className="absolute top-0 right-0 w-px h-40 bg-gradient-to-b from-[#5d2c86]/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14 lg:mb-20"
          >
            <motion.p
              variants={blurToFocus}
              custom={0}
              className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-4 font-sans-body"
            >
              Visual Journey
            </motion.p>
            <motion.h2
              variants={blurToFocus}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight mb-4"
            >
              Inside our{' '}
              <span className="text-[#5d2c86] dark:text-[#5d2c86] italic">world</span>
            </motion.h2>
            <motion.p
              variants={blurToFocus}
              custom={0.2}
              className="text-gray-500 dark:text-gray-400 font-sans-body max-w-xl mx-auto"
            >
              Every image tells a story of precision, passion, and the relentless pursuit of hospitality perfection.
            </motion.p>
          </motion.div>

          {/* Full-width hero image at top of gallery */}
          <motion.div
            variants={cinematicReveal}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="mb-4 sm:mb-6 relative rounded-2xl overflow-hidden aspect-[21/9] shadow-2xl group cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <ParallaxImage
              src="/images/about/about-hero.png"
              alt="Akshar Foshan panoramic manufacturing overview"
              speed={0.12}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-[#1A1A1A]/10 to-transparent" />
            {/* Cinematic vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26,26,26,0.3) 100%)',
            }} />
            {/* Accent border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 2px ${ACCENT}50, 0 0 24px ${ACCENT}15` }}
            />
            {/* Corner brackets */}
            <div className="absolute inset-0 pointer-events-none">
              <CornerBrackets size={36} inset={8} />
            </div>
            {/* Hero overlay text */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <p className="text-[#5d2c86] text-[10px] sm:text-xs tracking-[0.2em] uppercase font-sans-body font-bold mb-1">Gallery</p>
              <p className="text-white text-lg sm:text-xl font-serif-display font-bold">The Art of Manufacturing</p>
            </div>
            {/* Expand icon */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <Expand className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Masonry Grid — 2 cols mobile, 3 cols desktop with varying aspect ratios */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[220px]">
            {galleryImages.map((image, i) => (
              <CinematicGalleryItem
                key={image.src}
                image={image}
                index={i}
                onExpand={openLightbox}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Accent Line Separator ── */}
      <AccentLineSeparator delay={0} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: OUR WORKSHOP — Horizontal Scroll Gallery
          ═══════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-28 bg-[#f8f3ed] dark:bg-[#141414] relative">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #5d2c86 0px,
              #5d2c86 1px,
              transparent 1px,
              transparent 20px
            )`,
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.p
              variants={blurToFocus}
              custom={0}
              className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-4 font-sans-body"
            >
              Our Workshop
            </motion.p>
            <motion.h2
              variants={blurToFocus}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight mb-4"
            >
              Where craftsmanship{' '}
              <span className="text-[#5d2c86] dark:text-[#5d2c86] italic">comes alive</span>
            </motion.h2>
            <motion.p
              variants={blurToFocus}
              custom={0.2}
              className="text-gray-500 dark:text-gray-400 font-sans-body max-w-lg mx-auto"
            >
              Slide through the spaces where raw materials become masterpieces.
            </motion.p>
          </motion.div>

          <WorkshopGallery />
        </div>
      </div>

      {/* ── Accent Line Separator ── */}
      <AccentLineSeparator delay={0} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: OUR JOURNEY — Visual Narrative
          ═══════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-28 bg-white dark:bg-[#0f0f0f] relative">
        {/* Decorative side line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#5d2c86]/10 to-transparent pointer-events-none hidden lg:block"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14 lg:mb-20"
          >
            <motion.p
              variants={blurToFocus}
              custom={0}
              className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-4 font-sans-body"
            >
              Our Journey
            </motion.p>
            <motion.h2
              variants={blurToFocus}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight mb-4"
            >
              A story of{' '}
              <span className="text-[#5d2c86] dark:text-[#5d2c86] italic">craft & conviction</span>
            </motion.h2>
            <motion.p
              variants={blurToFocus}
              custom={0.2}
              className="text-gray-500 dark:text-gray-400 font-sans-body max-w-xl mx-auto"
            >
              Three chapters that define who we are and where we&apos;re headed.
            </motion.p>
          </motion.div>

          {/* Journey blocks with accent lines between */}
          <div className="space-y-12 lg:space-y-20">
            {journeyBlocks.map((block, i) => (
              <div key={block.title}>
                <JourneyBlock block={block} index={i} />
                {/* accent line between blocks */}
                {i < journeyBlocks.length - 1 && (
                  <div className="flex justify-center py-8 lg:py-12">
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-[#5d2c86]/30" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5d2c86]/50" />
                      <div className="w-8 h-px bg-[#5d2c86]/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5d2c86]/50" />
                      <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-[#5d2c86]/30" />
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Accent Line Separator ── */}
      <AccentLineSeparator delay={0} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: HERITAGE TIMELINE — Visual Storytelling
          ═══════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-28 bg-[#f8f3ed] dark:bg-[#141414] relative">
        {/* Central timeline line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#5d2c86]/15 to-transparent pointer-events-none hidden lg:block"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14 lg:mb-20"
          >
            <motion.p
              variants={blurToFocus}
              custom={0}
              className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-4 font-sans-body"
            >
              Our Heritage
            </motion.p>
            <motion.h2
              variants={blurToFocus}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight mb-4"
            >
              A legacy in{' '}
              <span className="text-[#5d2c86] dark:text-[#5d2c86] italic">the making</span>
            </motion.h2>
            <motion.p
              variants={blurToFocus}
              custom={0.2}
              className="text-gray-500 dark:text-gray-400 font-sans-body max-w-lg mx-auto"
            >
              From a single workshop to a global hospitality FF&E powerhouse.
            </motion.p>
          </motion.div>

          {/* Timeline items */}
          <div className="space-y-12 lg:space-y-20">
            {timelineEvents.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Accent Line Separator ── */}
      <AccentLineSeparator delay={0} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: MANUFACTURING PROCESS — Step-by-step
          ═══════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-28 bg-white dark:bg-[#0f0f0f] relative">
        {/* Background decorative line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#5d2c86]/20 to-transparent pointer-events-none hidden lg:block"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14 lg:mb-20"
          >
            <motion.p
              variants={blurToFocus}
              custom={0}
              className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-4 font-sans-body"
            >
              Our Process
            </motion.p>
            <motion.h2
              variants={blurToFocus}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight"
            >
              From raw material to{' '}
              <span className="text-[#5d2c86] dark:text-[#5d2c86] italic">perfect delivery</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
            {manufacturingSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  variants={isEven ? slideInLeft : slideInRight}
                  custom={i * 0.15}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="flex gap-5 sm:gap-6 items-start"
                >
                  {/* Step image with corner brackets */}
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-lg group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#5d2c86]/20" />
                    {/* Step number */}
                    <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[#5d2c86] flex items-center justify-center text-[#1A1A1A] text-xs font-bold font-serif-display">
                      {i + 1}
                    </div>
                    {/* Corner brackets */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <CornerBrackets size={18} inset={3} />
                    </div>
                  </div>
                  {/* Step content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-4 h-4 text-[#5d2c86] dark:text-[#5d2c86]" />
                      <h4 className="text-base sm:text-lg font-bold font-serif-display text-[#1A1A1A] dark:text-white">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-sans-body leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Accent Line Separator ── */}
      <AccentLineSeparator delay={0} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: TEAM & SCALE — Stats with Animated Counters
          ═══════════════════════════════════════════════════════════ */}
      <div className="py-20 lg:py-28 bg-[#f8f3ed] dark:bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image with parallax */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl group">
                <ParallaxImage
                  src="/images/about/about-hero.png"
                  alt="Akshar Foshan team and manufacturing overview"
                  className="w-full h-full"
                  speed={0.14}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#5d2c86]/30 to-transparent" />
                {/* Cinematic vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26,26,26,0.25) 100%)',
                }} />
                {/* Corner brackets */}
                <div className="absolute inset-0 pointer-events-none">
                  <CornerBrackets size={32} inset={6} />
                </div>
              </div>
              {/* Floating stat card */}
              <motion.div
                variants={scaleUp}
                custom={0.3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="absolute -bottom-5 -right-2 sm:-right-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5d2c86]/15 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#5d2c86]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-serif-display text-[#1A1A1A] dark:text-white">
                      <AnimatedCounter target={500} suffix="+" />{' '}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans-body">Skilled Artisans</p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative corner accent */}
              <div
                className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#5d2c86]/30 rounded-tl-2xl pointer-events-none"
                aria-hidden="true"
              />
            </motion.div>

            {/* Right: Stats & Text with animated counters */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p
                variants={blurToFocus}
                custom={0}
                className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#5d2c86] mb-4 font-sans-body"
              >
                Scale & Expertise
              </motion.p>
              <motion.h2
                variants={blurToFocus}
                custom={0.1}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white leading-tight mb-6"
              >
                Built by <span className="text-[#5d2c86] dark:text-[#5d2c86] italic">hands that know</span>
              </motion.h2>
              <motion.p
                variants={blurToFocus}
                custom={0.2}
                className="text-base text-gray-600 dark:text-gray-300 font-sans-body leading-relaxed mb-8"
              >
                Our team of over 500 skilled artisans combines generations of
                furniture-making heritage with modern precision engineering. From
                hand-carved details to CNC-precise joinery, every technique in
                our repertoire serves a single purpose: exceeding hospitality
                standards.
              </motion.p>

              {/* Stats grid with animated counters */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { value: 13, suffix: '+', label: 'Manufacturing Facilities', icon: Factory },
                  { value: 240, suffix: '+', label: 'Hotel Keys Delivered', icon: Users },
                  { value: 5, suffix: '+', label: 'Continents Served', icon: Globe2 },
                  { value: 100, suffix: '%', label: 'Inspection Pass Rate', icon: Shield },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    custom={0.3 + i * 0.08}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800 group"
                  >
                    <stat.icon className="w-5 h-5 text-[#5d2c86] dark:text-[#5d2c86] mb-2" />
                    <p className="text-xl sm:text-2xl font-bold font-serif-display text-[#1A1A1A] dark:text-white">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans-body mt-0.5">
                      {stat.label}
                    </p>
                    {/* Subtle corner bracket on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                      <CornerBrackets size={16} inset={3} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Accent Line Separator ── */}
      <AccentLineSeparator delay={0} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9: CLOSING — Full-width cinematic image with quote
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <ParallaxImage
          src="/images/about/about-small.png"
          alt="Akshar Foshan finished hotel interior showcase"
          className="w-full h-full"
          speed={0.2}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/60" />
        {/* Cinematic letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-[8%] bg-[#1A1A1A]/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-[#1A1A1A]/40 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center px-4 sm:px-6 max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="w-12 h-px bg-[#5d2c86] mx-auto mb-6"
            />
            <motion.blockquote
              variants={blurToFocus}
              custom={0.15}
              className="text-xl sm:text-2xl lg:text-3xl font-serif-display text-white leading-relaxed mb-6 italic"
            >
              &ldquo;We don&apos;t just manufacture furniture — we engineer the
              experiences that guests remember.&rdquo;
            </motion.blockquote>
            <motion.p
              variants={fadeUp}
              custom={0.25}
              className="text-sm tracking-[0.15em] text-[#5d2c86] font-sans-body uppercase"
            >
              Akshar Foshan Leadership
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="w-12 h-px bg-[#5d2c86] mx-auto mt-6"
            />
            {/* Corner brackets around the quote */}
            <div className="absolute inset-0 pointer-events-none" style={{ margin: '-8px' }}>
              <CornerBrackets size={40} inset={0} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LIGHTBOX OVERLAY
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
