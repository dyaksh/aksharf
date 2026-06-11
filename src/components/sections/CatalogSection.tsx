'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const catalogPages = Array.from({ length: 45 }, (_, i) => ({
  page: i + 1,
  image: `/catalog-pages/page_${i + 1}.png`,
  title: getCatalogPageTitle(i + 1),
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

export default function CatalogSection() {
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const keyPages = catalogPages.filter(
    (_, i) =>
      i === 0 || // Cover
      i === 3 || // Customized
      (i >= 10 && i <= 43) // Product pages
  );

  const handleOpenPage = (page: number) => {
    const idx = catalogPages.findIndex((p) => p.page === page);
    setCurrentPage(idx >= 0 ? idx : 0);
    setSelectedPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const newIdx = currentPage - 1;
      setCurrentPage(newIdx);
      setSelectedPage(catalogPages[newIdx].page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < catalogPages.length - 1) {
      const newIdx = currentPage + 1;
      setCurrentPage(newIdx);
      setSelectedPage(catalogPages[newIdx].page);
    }
  };

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-4 font-sans-body">
            FULL CATALOG
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#1A1A1A] mb-4">
            Browse our <span className="text-[#4A2364]">complete catalog</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto font-sans-body">
            Explore our 2026 Furniture Catalog with detailed product specifications
            across all hotel brand standards.
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {keyPages.map((page) => (
            <button
              key={page.page}
              onClick={() => handleOpenPage(page.page)}
              className="group relative rounded-xl overflow-hidden border border-gray-100 hover:border-[#4A2364]/30 shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={page.image}
                  alt={page.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#4A2364]/0 group-hover:bg-[#4A2364]/20 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-[10px] text-white/90 font-sans-body font-medium truncate">
                  {page.title}
                </p>
                <p className="text-[9px] text-white/50 font-sans-body">Page {page.page}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Viewer Dialog */}
      <Dialog
        open={selectedPage !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPage(null);
        }}
      >
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/95 border-white/10">
          <div className="relative w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="text-sm font-medium text-white font-sans-body">
                  {selectedPage !== null ? catalogPages[currentPage]?.title : ''}
                </h3>
                <p className="text-xs text-white/40 font-sans-body">
                  Page {selectedPage} of {catalogPages.length}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => setSelectedPage(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
              {selectedPage !== null && (
                <img
                  src={catalogPages[currentPage]?.image}
                  alt={catalogPages[currentPage]?.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-4 border-t border-white/10">
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
