'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  MousePointerClick,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

const catalogPages = Array.from({ length: 45 }, (_, i) => ({
  page: i + 1,
  image: `/catalog-pages/page_${i + 1}.png`,
  title: getCatalogPageTitle(i + 1),
  category: getCatalogPageCategory(i + 1),
}));

function getCatalogPageTitle(page: number): string {
  const titles: Record<number, string> = {
    1: 'Furniture Catalog 2026',
    2: 'About Us',
    3: 'Brand Definition & Values',
    4: 'Customized Professionalism',
    5: 'Workshops',
    6: 'Workshops',
    7: 'Your Partner in Hospitality FF&E',
    8: 'Table of Contents',
    9: 'Brand Standards',
    10: 'Brand Standards',
    11: 'Holiday Inn Suites',
    12: 'Holiday Inn Suites - Products',
    13: 'Holiday Inn Express',
    14: 'Holiday Inn Express - Products',
    15: 'Candlewood Suites',
    16: 'Candlewood Suites - Products',
    17: 'IHG Standards',
    18: 'IHG Standards',
    19: 'Fairfield Inn',
    20: 'Fairfield Inn - Products',
    21: 'SpringHill Suites',
    22: 'SpringHill Suites - Products',
    23: 'TownePlace Suites',
    24: 'TownePlace Suites - Products',
    25: 'Marriott Standards',
    26: 'Marriott Standards',
    27: 'Hampton Inn',
    28: 'Hampton Inn - Products',
    29: 'Home2 Suites',
    30: 'Home2 Suites - Products',
    31: 'Homewood Suites',
    32: 'Homewood Suites - Products',
    33: 'Hilton Standards',
    34: 'Hilton Standards',
    35: 'Comfort Inn',
    36: 'Comfort Inn - Products',
    37: 'Country Inn',
    38: 'Country Inn - Products',
    39: 'Choice Standards',
    40: 'Wyndham Hotels',
    41: 'Wingate',
    42: 'Wingate - Products',
    43: 'La Quinta',
    44: 'La Quinta - Products',
    45: 'Contact',
  };
  return titles[page] || `Page ${page}`;
}

function getCatalogPageCategory(page: number): string {
  if (page === 1) return 'Cover';
  if (page >= 2 && page <= 7) return 'About';
  if (page >= 8 && page <= 10) return 'About';
  if ((page >= 11 && page <= 18) || page === 9) return 'IHG';
  if (page >= 19 && page <= 26) return 'Marriott';
  if (page >= 27 && page <= 34) return 'Hilton';
  if (page >= 35 && page <= 39) return 'Choice';
  if (page >= 40 && page <= 44) return 'Wyndham';
  if (page === 45) return 'Contact';
  return 'About';
}

const catalogCategories = ['All', 'Cover', 'About', 'IHG', 'Marriott', 'Hilton', 'Choice', 'Wyndham', 'Contact'] as const;

const categoryFilterMap: Record<string, number[]> = {
  Cover: [1],
  About: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  IHG: [11, 12, 13, 14, 15, 16, 17, 18],
  Marriott: [19, 20, 21, 22, 23, 24, 25, 26],
  Hilton: [27, 28, 29, 30, 31, 32, 33, 34],
  Choice: [35, 36, 37, 38, 39],
  Wyndham: [40, 41, 42, 43, 44],
  Contact: [45],
};

export default function CatalogSection() {
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Get key pages based on category filter
  const keyPages = activeCategory === 'All'
    ? catalogPages.filter(
        (_, i) =>
          i === 0 || // Cover
          i === 3 || // Customized
          (i >= 10 && i <= 43) // Product pages
      )
    : catalogPages.filter((p) =>
        categoryFilterMap[activeCategory]?.includes(p.page) ?? false
      );

  const handleOpenPage = useCallback((page: number) => {
    const idx = catalogPages.findIndex((p) => p.page === page);
    setCurrentPage(idx >= 0 ? idx : 0);
    setSelectedPage(page);
    setZoomLevel(1);
  }, []);

  // Listen for custom event from PortfolioSection "View Catalog Page" links
  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ page: number }>;
      if (customEvent.detail?.page) {
        handleOpenPage(customEvent.detail.page);
      }
    };
    window.addEventListener('openCatalogPage', handleCustomEvent);
    return () => window.removeEventListener('openCatalogPage', handleCustomEvent);
  }, [handleOpenPage]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      const newIdx = currentPage - 1;
      setCurrentPage(newIdx);
      setSelectedPage(catalogPages[newIdx].page);
      setZoomLevel(1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < catalogPages.length - 1) {
      const newIdx = currentPage + 1;
      setCurrentPage(newIdx);
      setSelectedPage(catalogPages[newIdx].page);
      setZoomLevel(1);
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedPage === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      } else if (e.key === 'Escape') {
        setSelectedPage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPage, handlePrevPage, handleNextPage]);

  // Mouse wheel zoom
  useEffect(() => {
    if (selectedPage === null) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setZoomLevel((prev) => {
          const delta = e.deltaY > 0 ? -0.15 : 0.15;
          return Math.min(3, Math.max(0.5, prev + delta));
        });
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [selectedPage]);

  // Thumbnail strip pages for dialog
  const thumbnailStart = Math.max(0, currentPage - 6);
  const thumbnailEnd = Math.min(catalogPages.length, thumbnailStart + 13);
  const thumbnailPages = catalogPages.slice(thumbnailStart, thumbnailEnd);

  return (
    <section id="catalog" className="bg-white dark:bg-[#121212] py-20 lg:py-32 relative transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4 font-sans-body">
            FULL CATALOG
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] dark:text-white mb-4">
            Browse our <span className="text-[#4A2364] dark:text-[#6B3F8E]">complete catalog</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-sans-body">
            Explore our 2026 Furniture Catalog with detailed product specifications
            across all hotel brand standards.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {catalogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium font-sans-body transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#4A2364] text-white shadow-md shadow-[#4A2364]/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Catalog Grid with Animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {keyPages.map((page) => (
              <motion.div
                key={page.page}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, ease: 'easeOut' },
                  },
                }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleOpenPage(page.page)}
                      className="group relative rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:border-[#4A2364]/40 dark:hover:border-[#6B3F8E]/40 shadow-sm hover:shadow-2xl hover:shadow-[#4A2364]/10 dark:hover:shadow-[#6B3F8E]/10 hover:scale-[1.03] transition-all duration-500 bg-gray-50 dark:bg-[#1E1E1E] w-full active:scale-[0.98]"
                    >
                      {/* Gold top accent line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, #4A2364, #D4AF37, #4A2364)' }} />

                      <div className="aspect-[3/4] relative">
                        <img
                          src={page.image}
                          alt={page.title}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Hover overlay with purple glow */}
                        <div className="absolute inset-0 bg-[#4A2364]/0 group-hover:bg-[#4A2364]/20 dark:group-hover:bg-[#6B3F8E]/20 transition-all duration-500" />
                        {/* Inner shadow glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_40px_rgba(74,35,100,0.15)] dark:shadow-[inset_0_0_40px_rgba(107,63,142,0.15)]" />
                        {/* Click to view indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-[#2A2A2A]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                            <MousePointerClick className="w-3.5 h-3.5 text-[#4A2364] dark:text-[#6B3F8E]" />
                            <span className="text-[10px] font-bold text-[#4A2364] dark:text-[#6B3F8E] font-sans-body">Click to view</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
                        <p className="text-[10px] text-white/90 font-sans-body font-medium truncate">
                          {page.title}
                        </p>
                        <p className="text-[9px] text-white/50 font-sans-body">Page {page.page}</p>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-[#4A2364] text-white text-xs font-sans-body border-[#4A2364]"
                  >
                    {page.title} — Page {page.page}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Download Full Catalog Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A2364] text-white rounded-full text-sm font-medium font-sans-body hover:bg-[#4A2364]/90 hover:shadow-lg hover:shadow-[#4A2364]/20 transition-all duration-300 group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            Download Full Catalog
          </a>
        </motion.div>
      </div>

      {/* Enhanced Catalog Viewer Dialog */}
      <Dialog
        open={selectedPage !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPage(null);
        }}
      >
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-black/95 border-white/10" showCloseButton={false}>
          <DialogTitle className="sr-only">
            {selectedPage !== null ? catalogPages[currentPage]?.title : 'Catalog Viewer'}
          </DialogTitle>
          <div className="relative w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                {/* Page title in prominent way */}
                <div>
                  <h3 className="text-base font-bold text-white font-serif-display">
                    {selectedPage !== null ? catalogPages[currentPage]?.title : ''}
                  </h3>
                  <p className="text-xs text-white/40 font-sans-body">
                    Page {selectedPage} of {catalogPages.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Zoom controls */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8"
                  onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs text-white/40 font-sans-body min-w-[3rem] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8"
                  onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8"
                  onClick={() => setZoomLevel(1)}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={() => setSelectedPage(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Image */}
            <div
              ref={imageContainerRef}
              className="flex-1 flex items-center justify-center p-4 overflow-auto"
            >
              {selectedPage !== null && (
                <motion.img
                  key={currentPage}
                  src={catalogPages[currentPage]?.image}
                  alt={catalogPages[currentPage]?.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  draggable={false}
                />
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="px-4 py-2 border-t border-white/10">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {thumbnailPages.map((tp) => (
                  <button
                    key={tp.page}
                    onClick={() => {
                      const idx = catalogPages.findIndex((p) => p.page === tp.page);
                      if (idx >= 0) {
                        setCurrentPage(idx);
                        setSelectedPage(catalogPages[idx].page);
                        setZoomLevel(1);
                      }
                    }}
                    className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      tp.page === selectedPage
                        ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                        : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={tp.image}
                      alt={tp.title}
                      className="w-12 h-16 object-contain bg-white/5"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-3 border-t border-white/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(10, catalogPages.length) }, (_, i) => {
                  const pageIdx = Math.max(0, currentPage - 4) + i;
                  if (pageIdx >= catalogPages.length) return null;
                  return (
                    <button
                      key={pageIdx}
                      onClick={() => {
                        setCurrentPage(pageIdx);
                        setSelectedPage(catalogPages[pageIdx].page);
                        setZoomLevel(1);
                      }}
                      className={`w-7 h-7 rounded text-[10px] font-sans-body transition-colors ${
                        pageIdx === currentPage
                          ? 'bg-[#4A2364] text-white'
                          : 'bg-white/10 text-white/40 hover:bg-white/20'
                      }`}
                    >
                      {pageIdx + 1}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === catalogPages.length - 1}
                className="text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
