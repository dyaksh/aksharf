'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

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

const categories = ['All', 'IHG', 'Marriott', 'Hilton', 'Choice', 'Wyndham'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredBrands =
    activeCategory === 'All'
      ? brands
      : brands.filter((b) => b.category === activeCategory);

  const displayedBrands = showAll ? filteredBrands : filteredBrands.slice(0, 6);

  return (
    <section id="portfolio" className="bg-[#1A1A1A] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#D4AF37] mb-4 font-sans-body">
              SELECTED REEL
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-white max-w-2xl">
              A refined portfolio for{' '}
              <span className="text-[#D4AF37] italic">hospitality furniture</span>.
            </h2>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 sm:mt-0 text-sm text-white/70 hover:text-white font-sans-body flex items-center gap-1 group transition-colors"
          >
            {showAll ? 'Show less' : `View all ${brands.length} frames`}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium font-sans-body transition-all ${
                activeCategory === cat
                  ? 'bg-[#4A2364] text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBrands.map((brand) => (
            <div
              key={brand.name}
              className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#4A2364]/50 transition-all duration-300 hover:bg-white/10"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-[#4A2364]/80 text-white text-[10px] font-medium rounded-full font-sans-body">
                    {brand.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white font-sans-body mb-2">
                  {brand.name}
                </h3>
                <p className="text-xs text-white/50 mb-4 font-sans-body line-clamp-2">
                  {brand.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {brand.items.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 bg-white/5 text-white/40 text-[10px] rounded-full font-sans-body"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
