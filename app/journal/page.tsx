"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const ALL_ARTICLES = [
  {
    slug: "/journal/art-of-the-balcao",
    title: "The Art of the Balcão: How Ancestral Porches Shape Modern Living",
    category: "VERNACULAR ESSAY",
    date: "Autumn 2026",
    readTime: "6 Min Read",
    excerpt:
      "A historical study of the Portuguese-Goan porch as a social threshold and passive ventilation instrument in contemporary Curtorim estates.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    author: "Arch. Antonio Victorino",
  },
  {
    slug: "/journal/south-goa-quiet-luxury",
    title: "Why South Goa is the Global Epicenter of Restraint",
    category: "GEOGRAPHIC DISPATCH",
    date: "Late Summer 2026",
    readTime: "8 Min Read",
    excerpt:
      "Far from the crowded northern beaches, Curtorim, Margao, and Verna offer ancient water systems, dense coconut canopies, and uncompromised privacy for HNIs.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    author: "Maria Elena D'Silva",
  },
  {
    slug: "/journal/passive-cooling-tropical-modernism",
    title: "Thermal Damping & Monsoons: Passive Cooling with Laterite",
    category: "CLIMATE ARCHITECTURE",
    date: "Monsoon 2026",
    readTime: "5 Min Read",
    excerpt:
      "How we harness 12km local quarry stone and soaring 5-meter Burma teak volumes to keep indoor temperatures 6°C cooler than the Goan outdoors.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1200&auto=format&fit=crop",
    author: "Eng. Rui Mascarenhas",
  },
  {
    slug: "/journal/curtorim-lake-ecology",
    title: "Curtorim's Agrarian Waterways: Building with Ecological Reverence",
    category: "HYDROLOGY & ECOLOGY",
    date: "Spring 2026",
    readTime: "7 Min Read",
    excerpt:
      "Understanding the 400-year-old sluice gate network (Manas) of Curtorim and how Nature’s Cove preserves the aquifer recharge basins.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    author: "Landscape Studio Victorino",
  },
];

export default function JournalPage() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "VERNACULAR ESSAY", "GEOGRAPHIC DISPATCH", "CLIMATE ARCHITECTURE", "HYDROLOGY & ECOLOGY"];

  const filtered = activeCategory === "ALL"
    ? ALL_ARTICLES
    : ALL_ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <main className="relative w-full min-h-screen bg-[#FAF8F5] text-[#121210]">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header with Expansive Whitespace */}
      <section className="w-full pt-44 pb-24 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="max-w-4xl">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#B84A39] block mb-4 font-semibold">
            EDITORIAL DISPATCHES • ESSAYS
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#121210] font-light leading-tight mb-6">
            The Victorino Journal
          </h1>
          <p className="text-sm sm:text-base font-sans text-[#7E796E] leading-relaxed max-w-2xl font-light">
            Reflections on tropical modernism, Portuguese-Goan vernacular architecture,
            materials that age with dignity, and the tranquil Susegad lifestyle of Goa.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="w-full py-8 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="flex flex-wrap gap-4 sm:gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-sans tracking-[0.15em] uppercase pb-2 transition-all relative ${
                activeCategory === cat
                  ? "text-[#121210] font-semibold"
                  : "text-[#7E796E] hover:text-[#121210]"
              }`}
            >
              <span>{cat}</span>
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B84A39]" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid with Generous Spacing */}
      <section className="w-full py-28 md:py-36 px-6 md:px-12 max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
          {filtered.map((article) => (
            <Link
              key={article.title}
              href={article.slug}
              className="group flex flex-col justify-between"
              data-cursor="READ"
            >
              <div>
                <div className="relative w-full h-[360px] sm:h-[440px] overflow-hidden rounded-sm bg-[#08130F] mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#08130F]/80 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-[#7E796E] mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>By {article.author}</span>
                </div>

                <h3 className="text-2xl font-serif text-[#121210] group-hover:text-[#B84A39] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-[#7E796E] leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#121210]/10 flex items-center justify-between text-xs font-sans">
                <span className="arch-link font-medium group-hover:text-[#B84A39]">
                  Read Complete Essay
                </span>
                <ArrowUpRightIcon size={14} className="text-[#B84A39] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        preselectedResidence="Journal Inquiry"
      />
    </main>
  );
}

