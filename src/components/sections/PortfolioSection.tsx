'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, X, Star, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

const brands = [
  {
    name: 'Holiday Inn Suites',
    image: '/catalog-pages/page_11.png',
    category: 'IHG',
    page: 11,
    description: 'Comfortable, affordable stays for families, business travelers, and friends.',
    items: ['King Headboard', 'Queen Headboard', 'Desk', 'C-Table', 'TV Chest', 'Sleeper Sofa'],
  },
  {
    name: 'Holiday Inn Express',
    image: '/catalog-pages/page_14.png',
    category: 'IHG',
    page: 14,
    description: 'Simple and smart travel experience with clean, comfortable rooms.',
    items: ['King Headboard', 'SmartShelf & Hook Panel', 'Functional Rack', 'Metal Bed Platform'],
  },
  {
    name: 'Candlewood Suites',
    image: '/catalog-pages/page_16.png',
    category: 'IHG',
    page: 16,
    description: 'A "home away from home" experience with apartment-like suites.',
    items: ['King Headboard', 'TV Panel', 'Dresser', 'Lounge Chair', 'Sleeper Sofa'],
  },
  {
    name: 'Fairfield Inn',
    image: '/catalog-pages/page_20.png',
    category: 'Marriott',
    page: 20,
    description: 'Warm hospitality with a "Beauty of Simplicity" philosophy.',
    items: ['King Headboard', 'Ottoman Bench', 'Sleeper Sofa', 'Nightstand', 'Task Chair'],
  },
  {
    name: 'SpringHill Suites',
    image: '/catalog-pages/page_22.png',
    category: 'Marriott',
    page: 22,
    description: 'Separate areas for relaxing and working in all-suite hotels.',
    items: ['King Headboard', 'TV Stand', 'Desk Chair', 'Bench', 'Sleeper Sofa'],
  },
  {
    name: 'TownePlace Suites',
    image: '/catalog-pages/page_24.png',
    category: 'Marriott',
    page: 24,
    description: 'Extended-stay hotel designed for travelers who want comfortable flexibility.',
    items: ['King Headboard', 'Lounge Chair', 'Functional Sofa', 'Dresser', 'Vanity'],
  },
  {
    name: 'Hampton Inn',
    image: '/catalog-pages/page_28.png',
    category: 'Hilton',
    page: 28,
    description: 'Consistent, reliable, and friendly experience at a mid-price level.',
    items: ['King Headboard', 'C-Table', 'TV Panel', 'Hospitality Unit', 'Sleeper Sofa'],
  },
  {
    name: 'Home2 Suites',
    image: '/catalog-pages/page_30.png',
    category: 'Hilton',
    page: 30,
    description: 'All-suite, extended-stay hotel for cost-conscious guests seeking comfort.',
    items: ['King Headboard', 'Ottoman', 'Desk', 'Sleeper Sofa', 'Kitchenette Wall'],
  },
  {
    name: 'Homewood Suites',
    image: '/catalog-pages/page_32.png',
    category: 'Hilton',
    page: 32,
    description: 'Home-like accommodations for guests and their pets.',
    items: ['King Headboard', 'Nesting Table', 'Sleeper Sofa', 'Vanity', 'Dresser'],
  },
  {
    name: 'Comfort Inn',
    image: '/catalog-pages/page_36.png',
    category: 'Choice',
    page: 36,
    description: 'Bright hospitality, convenient amenities and a colorful outlook.',
    items: ['King Headboard', 'Desk', 'Sleeper Sofa', 'Semi Open Vanity', 'Closet Unit'],
  },
  {
    name: 'Country Inn',
    image: '/catalog-pages/page_38.png',
    category: 'Choice',
    page: 38,
    description: 'Thoughtful extras and heartfelt hospitality for every guest.',
    items: ['King Headboard', 'Refrigerator Cabinet', 'Desk', 'Luggage Bench', 'Lounge Chair'],
  },
  {
    name: 'Wingate',
    image: '/catalog-pages/page_42.png',
    category: 'Wyndham',
    page: 42,
    description: 'Designed for modern travelers who need to stay connected and productive.',
    items: ['King Headboard', 'Desk & Chair', 'Coffee Table', 'TV Panel', 'Sleeper Sofa'],
  },
];

const categories = ['All', 'IHG', 'Marriott', 'Hilton', 'Choice', 'Wyndham'] as const;

const categoryColors: Record<string, string> = {
  IHG: 'bg-emerald-500/90',
  Marriott: 'bg-red-500/90',
  Hilton: 'bg-blue-500/90',
  Choice: 'bg-amber-500/90',
  Wyndham: 'bg-purple-500/90',
};

// Additional catalog pages for each brand (for the detail modal)
const brandCatalogPages: Record<string, number[]> = {
  'Holiday Inn Suites': [11, 12],
  'Holiday Inn Express': [13, 14],
  'Candlewood Suites': [15, 16],
  'Fairfield Inn': [19, 20],
  'SpringHill Suites': [21, 22],
  'TownePlace Suites': [23, 24],
  'Hampton Inn': [27, 28],
  'Home2 Suites': [29, 30],
  'Homewood Suites': [31, 32],
  'Comfort Inn': [35, 36],
  'Country Inn': [37, 38],
  'Wingate': [41, 42],
};

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<(typeof brands)[0] | null>(null);
  const [filterIndicator, setFilterIndicator] = useState({ left: 0, width: 0 });
  const filterRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredBrands =
    activeCategory === 'All'
      ? brands
      : brands.filter((b) => b.category === activeCategory);

  const displayedBrands = showAll ? filteredBrands : filteredBrands.slice(0, 6);

  // Update sliding indicator position
  useEffect(() => {
    const btn = buttonRefs.current[activeCategory];
    if (btn && filterRef.current) {
      const containerRect = filterRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setFilterIndicator({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [activeCategory]);

  return (
    <section id="portfolio" className="bg-[#1A1A1A] py-20 lg:py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
        >
          <div>
            <p className="text-xs tracking-[0.3em] text-[#D4AF37] mb-4 font-sans-body">
              SELECTED REEL
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-white max-w-2xl">
              A refined portfolio for{' '}
              <span className="text-[#D4AF37] italic">hospitality furniture</span>.
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            {/* Animated counter */}
            <motion.span
              key={`${displayedBrands.length}-${filteredBrands.length}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-white/40 font-sans-body"
            >
              Showing {displayedBrands.length} of {filteredBrands.length} brands
            </motion.span>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-white/70 hover:text-white font-sans-body flex items-center gap-1 group transition-colors"
            >
              {showAll ? 'Show less' : `View all ${brands.length} frames`}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Category Filter with Sliding Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex flex-wrap gap-2 mb-10"
          ref={filterRef}
        >
          {/* Sliding indicator */}
          <motion.div
            className="absolute top-0 h-full rounded-full bg-[#4A2364]/30 border border-[#4A2364]/50"
            animate={{
              left: filterIndicator.left,
              width: filterIndicator.width,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          {categories.map((cat) => (
            <button
              key={cat}
              ref={(el) => { buttonRefs.current[cat] = el; }}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`relative z-10 px-4 py-2 rounded-full text-xs font-medium font-sans-body transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-white'
                  : 'bg-transparent text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid with Staggered Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + (showAll ? '-all' : '-partial')}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {displayedBrands.map((brand, index) => (
              <motion.div
                key={brand.name}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: 'easeOut' },
                  },
                }}
                layout
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(74,35,100,0.15)]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category Badge with Brand-Specific Colors */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 ${categoryColors[brand.category] || 'bg-[#4A2364]/80'} text-white text-[10px] font-bold rounded-full font-sans-body shadow-lg`}>
                      {brand.category}
                    </span>
                  </div>

                  {/* Featured / New Badge for first 3 items */}
                  {index < 3 && (
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 text-[9px] font-bold rounded-full font-sans-body flex items-center gap-1 shadow-lg ${
                        index === 0
                          ? 'bg-[#D4AF37] text-black'
                          : 'bg-white/20 text-white backdrop-blur-sm border border-white/20'
                      }`}>
                        {index === 0 ? (
                          <>
                            <Star className="w-3 h-3" fill="currentColor" />
                            Featured
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3" />
                            New
                          </>
                        )}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay with View Details button */}
                  <div className="absolute inset-0 bg-[#4A2364]/0 group-hover:bg-[#4A2364]/50 transition-all duration-500 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Button
                        onClick={() => setSelectedBrand(brand)}
                        className="bg-white text-[#4A2364] hover:bg-[#D4AF37] hover:text-black font-sans-body text-xs font-bold rounded-full px-5 shadow-xl transition-colors duration-300"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        View Details
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Gold Divider Line */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white font-sans-body mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-white/50 mb-4 font-sans-body line-clamp-2">
                    {brand.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.items.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 bg-white/5 text-white/40 text-[10px] rounded-full font-sans-body group-hover:bg-white/10 group-hover:text-white/60 transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                    {brand.items.length > 4 && (
                      <span className="px-2 py-0.5 bg-white/5 text-white/40 text-[10px] rounded-full font-sans-body">
                        +{brand.items.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Brand Detail Dialog */}
      <Dialog
        open={selectedBrand !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedBrand(null);
        }}
      >
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] bg-[#1A1A1A] border-white/10 p-0 overflow-hidden" showCloseButton={false}>
          <DialogTitle className="sr-only">
            {selectedBrand?.name ?? 'Brand Details'}
          </DialogTitle>
          {selectedBrand && (
            <div className="relative flex flex-col h-full max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 ${categoryColors[selectedBrand.category] || 'bg-[#4A2364]/80'} text-white text-[10px] font-bold rounded-full font-sans-body`}>
                    {selectedBrand.category}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif-display">
                      {selectedBrand.name}
                    </h3>
                    <p className="text-xs text-white/40 font-sans-body">
                      Catalog pages {brandCatalogPages[selectedBrand.name]?.join('–')}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={() => setSelectedBrand(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Catalog Images */}
                  <div className="md:w-1/2 flex flex-col gap-4">
                    {brandCatalogPages[selectedBrand.name]?.map((pageNum) => (
                      <div key={pageNum} className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                        <img
                          src={`/catalog-pages/page_${pageNum}.png`}
                          alt={`${selectedBrand.name} - Page ${pageNum}`}
                          className="w-full h-auto object-contain"
                        />
                        <div className="p-2 bg-white/5 text-center">
                          <span className="text-[10px] text-white/40 font-sans-body">Page {pageNum}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Product Info */}
                  <div className="md:w-1/2">
                    <p className="text-sm text-white/70 font-sans-body leading-relaxed mb-6">
                      {selectedBrand.description}
                    </p>

                    <div className="h-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent mb-6" />

                    <h4 className="text-sm font-bold text-[#D4AF37] font-sans-body mb-4 tracking-wider uppercase">
                      Product List
                    </h4>
                    <div className="space-y-3">
                      {selectedBrand.items.map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.3 }}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-[#D4AF37]/20 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#4A2364]/20 flex items-center justify-center text-[#D4AF37] text-xs font-bold font-sans-body group-hover:bg-[#4A2364]/40 transition-colors">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <span className="text-sm text-white/80 font-sans-body">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-[#4A2364]/10 rounded-xl border border-[#4A2364]/20">
                      <p className="text-xs text-white/50 font-sans-body">
                        Interested in {selectedBrand.name} FF&E packages?{' '}
                        <a href="#contact" className="text-[#D4AF37] hover:underline" onClick={() => setSelectedBrand(null)}>
                          Contact us
                        </a>{' '}
                        for detailed specifications and pricing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
