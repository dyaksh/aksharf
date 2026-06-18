import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

// Using Montserrat as a Google Fonts substitute for Avenir (similar geometric humanist style)
const montserrat = Montserrat({
  variable: "--font-avenir",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshar Foshan | Hotel FF&E Manufacturer",
  description:
    "Akshar Foshan manufactures premium hotel FF&E in Foshan, China — casegoods, upholstery, lighting & bathroom accessories for 240+ brands across 5 continents.",
  keywords: [
    "hospitality FF&E",
    "hotel furniture manufacturer",
    "FF&E supplier",
    "hotel casegoods",
    "hotel upholstery",
    "hotel lighting",
    "bathroom FF&E",
    "Foshan furniture",
  ],
  authors: [{ name: "Akshar Foshan", url: "https://aksharfoshan.com" }],
  creator: "Akshar Foshan",
  publisher: "Akshar Foshan",
  category: "Hospitality FF&E Manufacturing",
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: "https://aksharfoshan.com",
  },
  openGraph: {
    title: "Akshar Foshan | Hotel FF&E Manufacturer",
    description:
      "Premium hotel FF&E manufacturer in Foshan, China. Trusted by IHG, Hilton, Marriott and 240+ brands across 5 continents.",
    type: "website",
    locale: "en_US",
    url: "https://aksharfoshan.com",
    siteName: "Akshar Foshan",
    images: [
      {
        url: "https://aksharfoshan.com/images/hero/hero-hotel.jpeg",
        width: 1200,
        height: 630,
        alt: "Akshar Foshan — Premium Hospitality FF&E Solutions",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshar Foshan | Hotel FF&E Manufacturer",
    description:
      "Premium hotel FF&E from Foshan, China. Trusted by 240+ hotel brands worldwide.",
    creator: "@AksharFoshan",
    images: ["https://aksharfoshan.com/images/hero/hero-hotel.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
    yandex: "yandex-verification-placeholder",
  },
  other: {
    "theme-color": "#5d2c86",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD: Organization — server-rendered */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Akshar Foshan',
              description:
                'Premium hospitality FF&E manufacturer from Foshan, China — vertically integrated, quality-obsessed, always on schedule.',
              url: 'https://aksharfoshan.com',
              logo: 'https://aksharfoshan.com/images/logo.png',
              image: 'https://aksharfoshan.com/images/hero/hero-hotel.jpeg',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Foshan',
                addressRegion: 'Guangdong',
                addressCountry: 'CN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-760-617-0800',
                contactType: 'sales',
                email: 'yogin@aksharfoshan.com',
              },
              sameAs: [],
              knowsAbout: [
                'Hospitality FF&E',
                'Hotel Furniture Manufacturing',
                'Hotel Casegoods',
                'Upholstery',
                'Lighting',
                'Bathroom Accessories',
              ],
            }),
          }}
        />
        {/* JSON-LD: Product — server-rendered, no fabricated ratings */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Hospitality FF&E Solutions by Akshar Foshan',
              description:
                'Premium furniture, fixtures, and equipment for the hospitality industry. Casegoods, upholstery, lighting, bathroom FF&E, and art & decor for hotels worldwide.',
              brand: {
                '@type': 'Brand',
                name: 'Akshar Foshan',
              },
              manufacturer: {
                '@type': 'Organization',
                name: 'Akshar Foshan',
                url: 'https://aksharfoshan.com',
              },
              category: 'Hospitality FF&E',
              image: [
                'https://aksharfoshan.com/images/portfolio/catalog-01.jpg',
                'https://aksharfoshan.com/images/portfolio/catalog-14.jpg',
                'https://aksharfoshan.com/images/portfolio/catalog-03.jpg',
                'https://aksharfoshan.com/images/portfolio/catalog-07.jpg',
                'https://aksharfoshan.com/images/portfolio/catalog-28.jpg',
              ],
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
        {/* JSON-LD: FAQPage — server-rendered */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What does FF&E stand for?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'FF&E stands for Furniture, Fixtures & Equipment. It encompasses all movable furniture, decorative items, lighting, bathroom accessories, and operational equipment that are not permanently attached to a building\'s structure. In hospitality, FF&E is the layer that transforms a bare room into a branded guest experience — from the headboard and desk to the towel rack and artwork.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What hotel brands do you work with?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We partner with 240+ hospitality brands, including IHG, Hilton, Marriott, Choice Hotels, Wyndham, Hyatt, Best Western, and Radisson. Our team is experienced in interpreting and executing each brand\'s specific design standards, specification books, and procurement guidelines.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is your typical lead time?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Standard production lead time is 8–12 weeks from approved shop drawings and material confirmation. For repeat programs with pre-established specs, we can compress to 6–8 weeks. Rush orders may be accommodated depending on factory capacity.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you provide samples before production?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. We provide material swatches, finish chips, and fully finished prototype units for client sign-off before bulk production begins. No production run starts until you have approved every detail.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is your minimum order quantity?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We typically ask for a minimum of 25–30 rooms to justify tooling and production setup. However, for prototype or boutique projects, we can accommodate smaller quantities.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you handle logistics and shipping?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes — we offer both FOB and DDP shipping options. Our logistics team manages container consolidation, customs documentation, freight booking, and coordination with your general contractor for on-site delivery schedules.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do you ensure quality control?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Quality control is embedded at every stage: incoming raw-material inspection, in-process checks, and a final pre-packing audit on 100% of finished goods. We photograph every item before packing and can arrange third-party QC agencies (SGS, Bureau Veritas, TUV) for independent verification.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What geographic areas do you serve?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We ship worldwide from Foshan, China. Primary markets include the Middle East (UAE, Saudi Arabia, Qatar), Southeast Asia, Africa, Europe, and the Americas. We have representatives in Dubai and Riyadh.',
                  },
                },
              ],
            }),
          }}
        />
        {/* JSON-LD: WebPage with dateModified — server-rendered */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Akshar Foshan — Hospitality FF&E Manufacturer',
              description:
                'Akshar Foshan manufactures premium hotel FF&E in Foshan, China — casegoods, upholstery, lighting & bathroom accessories for 240+ brands across 5 continents.',
              url: 'https://aksharfoshan.com',
              dateModified: '2026-06-18',
              lastReviewed: '2026-06-18',
              mainEntity: {
                '@type': 'Organization',
                name: 'Akshar Foshan',
                url: 'https://aksharfoshan.com',
              },
            }),
          }}
        />
        {/* JSON-LD: BreadcrumbList — simplified, no hash URLs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://aksharfoshan.com',
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
