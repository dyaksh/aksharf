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
  title: "Akshar Foshan — Premium Hospitality FF&E Solutions | Hotel Furniture Manufacturer",
  description: "Akshar Foshan is a leading hospitality FF&E manufacturer from Foshan, China. We craft premium hotel furniture — casegoods, upholstery, lighting, bathroom accessories — for IHG, Hilton, Marriott, and 240+ hotel brands worldwide. 13+ facilities, 5+ continents.",
  keywords: [
    "Akshar Foshan", "Hospitality FF&E", "Hotel Furniture Manufacturer", 
    "Hotel Casegoods", "Hotel Upholstery", "Hotel Lighting", 
    "Bathroom FF&E", "Hotel Furniture China", "FF&E Procurement",
    "IHG Furniture", "Hilton Furniture", "Marriott Furniture",
    "Hotel Room Furniture", "Custom Hotel Furniture",
    "Foshan Furniture Manufacturer", "Hospitality Design",
    "Hotel FF&E Supplier", "Hospitality Furniture Solutions",
    "Hotel Renovation Furniture", "Commercial Furniture Manufacturer",
    "Hotel Interior Design", "FF&E Installation",
    "Hotel Fixture Manufacturer", "Hospitality Procurement"
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
    title: "Akshar Foshan — Premium Hospitality FF&E Solutions",
    description: "Crafting excellence in hotel furniture from Foshan to the world. Trusted by IHG, Hilton, Marriott and 240+ brands across 5+ continents.",
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
    title: "Akshar Foshan — Premium Hospitality FF&E Solutions",
    description: "Crafting excellence in hotel furniture from Foshan to the world. Trusted by IHG, Hilton, Marriott and 240+ brands.",
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
