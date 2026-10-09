"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const COLLECTIONS = [
  {
    slug: "/villas",
    title: "Goan Luxury Villas",
    subtitle: "Curtorim & Assagao Enclaves",
    count: "07 BESPOKE ESTATES",
    description:
      "Independent private sanctuaries set amidst ancestral coconut groves, tranquil waterways, and emerald paddy terraces. Featuring Sukabumi stone plunge pools, double-height Burma teak rafters, and secluded inner rain courtyards.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
    specs: "3,800 – 6,500 Sq.Ft • Private Pools • Gated Seclusion",
  },
  {
    slug: "/premium-homes",
    title: "Heritage Portuguese Manors",
    subtitle: "Fontainhas & Salcete Ridge",
    count: "12 BOUTIQUE RESIDENCES",
    description:
      "Low-density residences celebrating 450 years of Indo-Portuguese architecture. Wrap-around balcãos, hand-painted azulejos, mother-of-pearl oyster shell windows, and lock-and-leave ease with dedicated estate concierge.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    specs: "2,400 – 3,600 Sq.Ft • Heritage Verandas • Concierge Handover",
  },
];

export default function CollectionsSection() {
  return (
    <section className="w-full py-24 md:py-36 bg-[#FAF8F5] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Section Header with Generous Whitespace */}
        <div className="mb-20 md:mb-28 max-w-4xl">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#B84A39] block mb-4 font-semibold">
            PORTFOLIO TYPOLOGY • GOAN DISCIPLINES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#121210] font-light arch-indent leading-[1.08]">
            Two deliberate disciplines of living: Luxury Villas and Heritage Portuguese Manors.
          </h2>
        </div>

        {/* Two Tall Editorial Cards with Expansive Breathing Room */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              href={col.slug}
              className="group flex flex-col justify-between"
              data-cursor="EXPLORE"
            >
              {/* Tall Image with Hover Scale */}
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[560px] max-h-[62vh] overflow-hidden rounded-sm mb-8 bg-[#0C1A14]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.03] transition-transform duration-[1200ms] ease-[cubic-bezier(0.17,0.84,0.44,1)] group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-[#0C1A14]/85 backdrop-blur-md px-4 py-2 text-[10px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
                  {col.count}
                </div>
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[#121210] flex items-center justify-center transition-all duration-300 group-hover:bg-[#D49B44] group-hover:text-[#0C1A14] group-hover:scale-110 shadow-lg">
                  <ArrowUpRightIcon size={18} />
                </div>
              </div>

              {/* Card Meta Content with Terracotta Accent */}
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between border-b border-[#121210]/15 pb-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#121210] group-hover:text-[#B84A39] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs font-sans text-[#7A756B] mt-1 font-light">
                      {col.subtitle}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[#B84A39] uppercase tracking-wider">
                    {col.specs}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-sans text-[#7A756B] leading-relaxed max-w-xl pt-2 font-light">
                  {col.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
