import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ChatBot from "@/components/ChatBot";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const viewport: Viewport = {
  themeColor: "#1B4332",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "CleanInstead | Premium Eco-Friendly Cleaning Services in Surrey, BC, Canada",
  description:
    "CleanInstead offers premium eco-friendly cleaning services in Surrey, Vancouver, Burnaby, Richmond, Langley, Delta, and Metro Vancouver, BC, Canada. 100% non-toxic, plant-based, zero single-use plastics. Residential, commercial, Airbnb, move-in/out, and post-construction cleaning. Get a free instant quote today!",
  keywords: [
    "CleanInstead",
    "eco-friendly cleaning Surrey BC",
    "green cleaning Vancouver",
    "non-toxic cleaning Metro Vancouver",
    "sustainable cleaning services Canada",
    "residential cleaning Surrey BC",
    "commercial cleaning Vancouver BC",
    "Airbnb cleaning Metro Vancouver",
    "move in out cleaning Surrey",
    "deep cleaning Surrey BC",
    "house cleaning service Surrey",
    "office cleaning Vancouver",
    "eco cleaning BC Canada",
    "natural cleaning services",
    "cleaning company Surrey",
    "cleaning service near me",
    "green house cleaning",
    "pet safe cleaning BC",
    "allergy friendly cleaning Vancouver",
    "home cleaning Surrey BC",
  ],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  metadataBase: new URL("https://cleaninstead.com"),
  alternates: {
    canonical: "https://cleaninstead.com",
  },
  openGraph: {
    title: "CleanInstead | Premium Eco-Friendly Cleaning Services in Surrey, BC",
    description:
      "Premium, eco-friendly cleaning services in Metro Vancouver, BC. 100% non-toxic, plant-based products, zero single-use plastics. Residential, commercial, Airbnb, and move-in/out cleaning. Free instant quote!",
    type: "website",
    locale: "en_CA",
    siteName: "CleanInstead",
    url: "https://cleaninstead.com",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "CleanInstead - Eco-Friendly Cleaning Services in Surrey BC Canada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanInstead | Premium Eco-Friendly Cleaning in Surrey, BC, Canada",
    description:
      "Premium, eco-friendly cleaning services in Metro Vancouver, BC. 100% non-toxic, zero single-use plastics. Residential, commercial & Airbnb cleaning. Free quote!",
    images: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=630&fit=crop"],
    creator: "@CleanInstead",
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
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "Home & Garden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org structured data for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do eco-friendly products actually kill germs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Our products are EPA-registered and hospital-grade. They use natural enzymatic reactions to kill 99.9% of bacteria without toxic fumes or harsh residues that can harm your family and pets.",
        },
      },
      {
        "@type": "Question",
        name: "How does your Rewards Program work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It's completely automated! Every time a clean is completed, your account is automatically credited toward free services. After 3 cleans you get a free fridge clean, after 6 you get free windows, and after 10 you earn an entirely free cleaning session.",
        },
      },
      {
        "@type": "Question",
        name: "What if I'm not happy with the clean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'We offer a 24-hour "Barefoot Guarantee." If we missed something or you\'re unsatisfied for any reason, simply let us know and we\'ll return to fix it at absolutely no cost to you.',
        },
      },
      {
        "@type": "Question",
        name: "Do you bring your own supplies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our teams arrive fully equipped with all necessary eco-friendly products, microfiber cloths, and professional-grade tools. You never need to provide anything. All our products are plant-based and non-toxic.",
        },
      },
      {
        "@type": "Question",
        name: "Are your cleaners insured and background-checked?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every cleaner goes through our rigorous 4-step vetting process, which includes a comprehensive criminal background check, professional reference checks, an eco-product skills assessment, and full insurance verification before they ever enter your home.",
        },
      },
      {
        "@type": "Question",
        name: "What areas do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We currently serve Surrey, Vancouver, Burnaby, Richmond, Langley, Delta, Coquitlam, and surrounding areas in Metro Vancouver, BC.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get a quote?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can use our instant quote calculator on our Pricing page for an estimate right away. For a customized quote, simply fill out the contact form or give us a call — we'll get back to you within a few hours.",
        },
      },
    ],
  };

  // Schema.org WebSite with SearchAction (sitelinks search box)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CleanInstead",
    url: "https://cleaninstead.com",
    description: "Premium eco-friendly cleaning services in Metro Vancouver, BC, Canada",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://cleaninstead.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Schema.org Service structured data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Eco-Friendly Cleaning Service",
    provider: {
      "@type": "LocalBusiness",
      name: "CleanInstead",
      url: "https://cleaninstead.com",
      telephone: "+1-604-497-1001",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit 105A - 14914 104 Ave.",
        addressLocality: "Surrey",
        addressRegion: "BC",
        postalCode: "V3R 1M7",
        addressCountry: "CA",
      },
    },
    areaServed: [
      { "@type": "City", name: "Surrey", sameAs: "https://en.wikipedia.org/wiki/Surrey,_British_Columbia" },
      { "@type": "City", name: "Vancouver", sameAs: "https://en.wikipedia.org/wiki/Vancouver" },
      { "@type": "City", name: "Burnaby", sameAs: "https://en.wikipedia.org/wiki/Burnaby" },
      { "@type": "City", name: "Richmond", sameAs: "https://en.wikipedia.org/wiki/Richmond,_British_Columbia" },
      { "@type": "City", name: "Langley", sameAs: "https://en.wikipedia.org/wiki/Langley,_British_Columbia_(city)" },
      { "@type": "City", name: "Delta", sameAs: "https://en.wikipedia.org/wiki/Delta,_British_Columbia" },
      { "@type": "City", name: "Coquitlam", sameAs: "https://en.wikipedia.org/wiki/Coquitlam" },
      { "@type": "City", name: "White Rock", sameAs: "https://en.wikipedia.org/wiki/White_Rock,_British_Columbia" },
      { "@type": "City", name: "Maple Ridge", sameAs: "https://en.wikipedia.org/wiki/Maple_Ridge,_British_Columbia" },
      { "@type": "City", name: "North Vancouver", sameAs: "https://en.wikipedia.org/wiki/North_Vancouver_(city)" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Eco-Cleaning",
            description: "Houses, townhomes, apartments, and condos cleaned with 100% non-toxic, plant-based products.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Green Cleaning",
            description: "Offices, clinics, retail spaces, and commercial facilities cleaned with healthcare-grade eco products.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Move In / Move Out Cleaning",
            description: "Thorough move-in and move-out cleaning for a seamless, chemical-free transition.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airbnb & Short-Term Rental Cleaning",
            description: "Fast turnarounds for Airbnb hosts seeking 5-star guest ratings with non-toxic cleaning.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deep Cleaning Service",
            description: "Comprehensive deep cleaning including oven, fridge, baseboards, window sills, and light fixtures.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Post-Construction Cleaning",
            description: "Thorough cleanup after renovations and construction projects using eco-friendly methods.",
          },
        },
      ],
    },
  };

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://cleaninstead.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://cleaninstead.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pricing",
        item: "https://cleaninstead.com/pricing",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://cleaninstead.com/contact",
      },
    ],
  };

  // Schema.org Review aggregate
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CleanInstead",
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Amanda R." },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "CleanInstead transformed my home. I have two kids with allergies and since switching to their eco-friendly service, we've noticed a huge difference. No chemical smells, just a genuinely clean home every time.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "David & Lisa M." },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Our guest ratings went up after hiring CleanInstead. Their teams are thorough, reliable, and the fact that they use non-toxic products is a huge selling point for our health-conscious guests.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Dr. Patel" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "As a healthcare facility, cleanliness and safety are non-negotiable. CleanInstead meets the highest standards. Their team is professional, punctual, and their products give us confidence in our patient environment.",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
  };

  // Schema.org LocalBusiness structured data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CleanInstead",
    description:
      "Premium eco-friendly cleaning services for homes and businesses in Metro Vancouver, BC.",
    url: "https://cleaninstead.com",
    telephone: "+1-604-497-1001",
    email: "info@cleaninstead.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 105A - 14914 104 Ave.",
      addressLocality: "Surrey",
      addressRegion: "BC",
      postalCode: "V3R 1M7",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "49.1867",
      longitude: "-122.8490",
    },
    areaServed: [
      { "@type": "City", name: "Surrey" },
      { "@type": "City", name: "Vancouver" },
      { "@type": "City", name: "Burnaby" },
      { "@type": "City", name: "Richmond" },
      { "@type": "City", name: "Langley" },
      { "@type": "City", name: "Delta" },
      { "@type": "City", name: "White Rock" },
      { "@type": "City", name: "Coquitlam" },
      { "@type": "City", name: "Maple Ridge" },
      { "@type": "City", name: "North Vancouver" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  };

  return (
    <html lang="en-CA" suppressHydrationWarning>
      <head>
        {/* Geo meta tags for local SEO in Canada */}
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Surrey, British Columbia" />
        <meta name="geo.position" content="49.1867;-122.8490" />
        <meta name="ICBM" content="49.1867, -122.8490" />
        <meta name="language" content="English" />
        <meta name="author" content="CleanInstead" />
        <meta name="topic" content="Eco-Friendly Cleaning Services" />
        <meta name="coverage" content="Metro Vancouver, BC, Canada" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#1B4332" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CleanInstead" />
        <meta name="application-name" content="CleanInstead" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1B4332" />
        <meta name="msapplication-TileImage" content="/pwa-icon-150.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        {/* Review Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <div className="min-h-screen flex flex-col" itemScope itemType="https://schema.org/LocalBusiness">
          <Header />
          <main className="flex-1" role="main" id="main-content">
            {children}
          </main>
          <Footer />
        </div>
        <PWAInstallPrompt />
        <ChatBot />
        <Toaster />
      </body>
    </html>
  );
}
