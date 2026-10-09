"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const ARTICLES = [
  {
    slug: "/journal/art-of-the-balcao",
    title: "The Art of the Balcão: How Ancestral Porches Shape Modern Living",
    category: "VERNACULAR ESSAY",
    date: "Autumn 2026",
    readTime: "6 Min Read",
    excerpt:
      "A historical study of the Portuguese-Goan porch as a social threshold and passive ventilation instrument in contemporary Curtorim estates.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "/journal/south-goa-quiet-luxury",
    title: "Why South Goa is the Global Epicenter of Restraint",
    category: "GEOGRAPHIC DISPATCH",
    date: "Late Summer 2026",
    readTime: "8 Min Read",
    excerpt:
      "Far from the crowded northern beaches, Curtorim, Margao, and Verna offer ancient water systems, dense coconut canopies, and uncompromised privacy for HNIs.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "/journal/passive-cooling-tropical-modernism",
    title: "Thermal Damping & Monsoons: Passive Cooling with Laterite",
    category: "CLIMATE ARCHITECTURE",
    date: "Monsoon 2026",
    readTime: "5 Min Read",
    excerpt:
      "How we harness 12km local quarry stone and soaring 5-meter Burma teak volumes to keep indoor temperatures 6°C cooler than the Goan outdoors.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=800&auto=format&fit=crop",
  },
];

export default function JournalSection() {
  return (
    <section className="w-full py-28 md:py-36 bg-[#F7F5F0] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-16">
          <div>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#B38F5B] block mb-2 font-medium">
              THE VICTORINO JOURNAL • INSIGHTS
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#121210] font-light">
              Architectural Writings
            </h2>
          </div>

          <Link
            href="/journal"
            className="arch-link text-xs font-sans uppercase tracking-[0.2em] text-[#121210] hover:text-[#B38F5B]"
          >
            Read All Essays
          </Link>
        </div>

        {/* 3-Up Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {ARTICLES.map((article) => (
            <Link
              key={article.title}
              href={article.slug}
              className="group flex flex-col justify-between"
              data-cursor="READ"
            >
              <div>
                <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden rounded-sm bg-[#08130F] mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.17,0.84,0.44,1)] group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#08130F]/80 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-[#7E796E] mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-[#121210] group-hover:text-[#B38F5B] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs font-sans text-[#7E796E] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#121210]/10 flex items-center justify-between text-xs font-sans">
                <span className="arch-link font-medium group-hover:text-[#B38F5B]">
                  Read Essay
                </span>
                <ArrowUpRightIcon size={14} className="text-[#B38F5B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
