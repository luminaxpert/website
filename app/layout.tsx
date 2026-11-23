import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/background/Background";
import NavigationProgress from "@/components/NavigationProgress";
import { SITE, FOUNDER_LINKS } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "LuminaXpert — Enterprise AI Consulting & Engineering",
    template: "%s | LuminaXpert",
  },
  description: SITE.description,
  keywords: [
    "AI consulting",
    "enterprise AI",
    "AI strategy",
    "MLOps",
    "AI agents",
    "responsible AI",
    "EU AI Act",
    "digital transformation",
    "LLM deployment",
  ],
  authors: [{ name: "Sibtain Syed", url: FOUNDER_LINKS.portfolio }],
  creator: "LuminaXpert",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "LuminaXpert — Enterprise AI Consulting & Engineering",
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "LuminaXpert — Build AI that actually works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuminaXpert — Enterprise AI Consulting & Engineering",
    description: SITE.description,
    images: ["/images/og-image.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/images/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/images/logo.png`,
  description: SITE.description,
  email: SITE.email,
  founder: {
    "@type": "Person",
    name: "Sibtain Syed",
    url: FOUNDER_LINKS.portfolio,
    sameAs: [FOUNDER_LINKS.linkedin, FOUNDER_LINKS.portfolio],
  },
  sameAs: [FOUNDER_LINKS.linkedin],
  areaServed: "Worldwide",
  serviceType: ["AI Consulting", "AI Development", "MLOps", "Data & Analytics", "Responsible AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Flag JS before first paint so scroll-reveal styles never flash */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable} ${spaceMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Skip to content
        </a>
        <NavigationProgress />
        <Background />
        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
