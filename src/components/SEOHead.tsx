'use client';

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

const SITE_URL = 'https://aksharfoshan.com';

/* ─────────── JSON-LD Structured Data Schemas ─────────── */

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Akshar Foshan',
  description: 'Premium hospitality FF&E manufacturer from Foshan, China — vertically integrated, quality-obsessed, always on schedule.',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/hero/hero-hotel.jpeg`,
  telephone: '+1-760-617-0800',
  email: 'yogin@aksharfoshan.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Foshan',
    addressRegion: 'Guangdong',
    addressCountry: 'CN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '23.0218',
    longitude: '113.1218',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  priceRange: '$$-$$$',
  sameAs: [],
  areaServed: {
    '@type': 'GeoCircle',
    name: 'Worldwide — 5+ Continents',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hospitality FF&E Products',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Casegoods',
        description: 'Premium hotel casegoods including nightstands, dressers, desks, and armoires.',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Upholstery',
        description: 'Custom hotel upholstery — headboards, sofas, chairs, and ottomans.',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Lighting',
        description: 'Hospitality-grade lighting solutions — chandeliers, sconces, lamps, and pendants.',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Bathroom FF&E',
        description: 'Bathroom accessories and fixtures for hotels — mirrors, vanities, towel racks, and hardware.',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Art & Decor',
        description: 'Curated art and decor for hospitality spaces — wall art, sculptures, and accent pieces.',
      },
    ],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Hospitality FF&E Solutions by Akshar Foshan',
  description: 'Premium furniture, fixtures, and equipment for the hospitality industry. Casegoods, upholstery, lighting, bathroom FF&E, and art & decor for hotels worldwide.',
  brand: {
    '@type': 'Brand',
    name: 'Akshar Foshan',
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'Akshar Foshan',
    url: SITE_URL,
  },
  category: 'Hospitality FF&E',
  image: [
    `${SITE_URL}/images/portfolio/bed/bed-1.png`,
    `${SITE_URL}/images/portfolio/sofa/sofa-1.jpeg`,
    `${SITE_URL}/images/portfolio/lamp/lamp-1.png`,
    `${SITE_URL}/images/portfolio/chairs/chair-1.jpeg`,
    `${SITE_URL}/images/portfolio/table/table-1.jpeg`,
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    offerCount: '5000',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '240',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is FF&E in the hospitality industry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FF&E stands for Furniture, Fixtures, and Equipment. In the hospitality industry, it refers to all movable furniture, lighting, bathroom accessories, art, and decor that are not permanently attached to the building structure. Akshar Foshan specializes in manufacturing and supplying premium FF&E for hotels worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Akshar Foshan located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Akshar Foshan is based in Foshan, Guangdong, China — the heart of the world\'s furniture manufacturing industry. With 13+ facilities, we serve hotel brands across 5+ continents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which hotel brands does Akshar Foshan supply?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Akshar Foshan is a trusted supplier for 240+ hotel brands worldwide, including IHG, Hilton, Marriott, Choice Hotels, Wyndham, Hyatt, Best Western, and Radisson. We meet the stringent quality and design standards required by all major hospitality chains.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of hotel furniture does Akshar Foshan manufacture?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Akshar Foshan manufactures a comprehensive range of hospitality FF&E including: casegoods (nightstands, dressers, desks, armoires), upholstery (headboards, sofas, chairs, ottomans), lighting (chandeliers, sconces, lamps, pendants), bathroom FF&E (mirrors, vanities, towel racks, hardware), and art & decor (wall art, sculptures, accent pieces).',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does FF&E procurement and installation take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timelines vary by project scope. Akshar Foshan\'s vertically integrated manufacturing allows us to deliver faster than industry average. We work closely with project managers to ensure on-time delivery aligned with your construction schedule. Contact us for a project-specific timeline.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Akshar Foshan offer custom hotel furniture design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Akshar Foshan offers fully custom FF&E design services. Our in-house design team works with hotel owners, designers, and procurement firms to create bespoke furniture that meets brand standards and project specifications. From concept to installation, we handle the full process.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: `${SITE_URL}/#about`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Portfolio',
      item: `${SITE_URL}/#portfolio`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Services',
      item: `${SITE_URL}/#services`,
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Contact',
      item: `${SITE_URL}/#contact`,
    },
  ],
};

export default function SEOHead({
  title = 'Akshar Foshan | Premium Hospitality FF&E Manufacturer',
  description = 'From Foshan to the world — premium furniture, fixtures & equipment for the finest hotels. Vertically integrated, quality-obsessed, always on schedule.',
  keywords = 'hospitality FF&E, hotel furniture manufacturer, Foshan furniture, hotel casegoods, upholstery, lighting, bathroom accessories, Akshar Foshan',
  canonicalUrl = SITE_URL,
  ogImage = '/images/hero/hero-hotel.jpeg',
  ogType = 'website',
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (attr: string, attrValue: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', 'index, follow');
    setMeta('name', 'googlebot', 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1');

    // Theme color and mobile web app meta tags
    setMeta('name', 'theme-color', '#5d2c86');
    setMeta('name', 'apple-mobile-web-app-capable', 'yes');
    setMeta('name', 'apple-mobile-web-app-status-bar-style', 'black-translucent');
    setMeta('name', 'format-detection', 'telephone=no');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Open Graph — comprehensive
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', `${SITE_URL}${ogImage}`);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', title);
    setMeta('property', 'og:image:type', 'image/jpeg');
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', 'Akshar Foshan');
    setMeta('property', 'og:locale', 'en_US');

    // Twitter Card — comprehensive
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', '@AksharFoshan');
    setMeta('name', 'twitter:creator', '@AksharFoshan');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', `${SITE_URL}${ogImage}`);
    setMeta('name', 'twitter:image:alt', title);

    // ─── Inject JSON-LD structured data ───
    const injectJsonLd = (id: string, data: object) => {
      // Remove existing if present
      const existing = document.getElementById(id);
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    injectJsonLd('seo-localbusiness-schema', localBusinessSchema);
    injectJsonLd('seo-product-schema', productSchema);
    injectJsonLd('seo-faq-schema', faqSchema);
    injectJsonLd('seo-breadcrumb-schema', breadcrumbSchema);
  }, [title, description, keywords, canonicalUrl, ogImage, ogType]);

  return null;
}
