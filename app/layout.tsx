import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import SiteExperience from "@/components/layout/SiteExperience";

export const metadata: Metadata = {
  title: "Victorino Luxury Homes | Architects of Dreams, Designers of Reality | South Goa",
  description:
    "Bespoke luxury row villas and premium homes in Curtorim, Margao, and Verna, South Goa. Flagship launch: Nature's Cove — 13 bespoke row villas for discerning HNIs and NRIs.",
  keywords: [
    "Victorino Luxury Homes",
    "Goa Luxury Villas",
    "Nature's Cove Curtorim",
    "Curtorim Villas",
    "South Goa Real Estate",
    "Bespoke Goan Architecture",
    "Portuguese Colonial Luxury Homes",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Victorino Luxury Homes | South Goa",
    description: "Architects of dreams, designers of reality. Flagship Launch: Nature's Cove Curtorim.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Plus+Jakarta+Sans:wght@200;300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" suppressHydrationWarning>
        <a href="#main-content" className="vx-skip">Skip to content</a>
        <Suspense fallback={null}><SiteExperience /></Suspense>
        {children}
      </body>
    </html>
  );
}
