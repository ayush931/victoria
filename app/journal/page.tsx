"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import PageHero from "@/components/layout/PageHero";
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
    <main id="main-content" className="relative w-full min-h-screen vx-site-page">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header with Expansive Whitespace */}
      <PageHero
        index="03"
        eyebrow="Editorial Dispatches • Essays"
        title={<>The Victorino <em className="text-[var(--accent-text)]">Journal</em></>}
        description="Reflections on tropical modernism, Portuguese-Goan vernacular architecture, materials that age with dignity, and the tranquil Susegad lifestyle of Goa."
        meta={["Vernacular Essays", "Climate Studies", "Goa Dispatches"]}
      />

      {/* Filter Tabs */}
      <section className="w-full py-8 site-wrap border-b border-[var(--ink)]/10">
        <div className="vx-filterbar">
          <div className="vx-filters" role="group" aria-label="Filter journal essays">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className="vx-filter"
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="vx-filterbar__count" aria-live="polite">
            {String(filtered.length).padStart(2, "0")} {filtered.length === 1 ? "essay" : "essays"}
          </span>
        </div>
      </section>

      {/* Articles Grid with Generous Spacing */}
      <section className="w-full py-28 md:py-36 site-wrap">
        {filtered.length === 0 ? (
          <div className="vx-empty">
            <h2>No essays in this chapter yet.</h2>
            <p>Choose another category, or return to the complete journal.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
          {filtered.map((article) => (
            <Link
              key={article.title}
              href={article.slug}
              className="group flex flex-col justify-between"
              data-cursor="READ"
            >
              <div>
                <div className="portfolio-image relative w-full h-[360px] sm:h-[440px] overflow-hidden rounded-sm bg-[var(--forest-deep)] mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="vx-media-badge">{article.category}</div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-mono text-[var(--ink-soft)] mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>By {article.author}</span>
                </div>

                <h3 className="text-2xl font-serif text-[var(--ink)] group-hover:text-[var(--accent-text)] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-[var(--ink-soft)] leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--ink)]/10 flex items-center justify-between text-xs font-sans">
                <span className="arch-link font-medium group-hover:text-[var(--accent-text)]">
                  Read Complete Essay
                </span>
                <ArrowUpRightIcon size={14} className="text-[var(--accent-text)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
        )}
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

