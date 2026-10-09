"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const COLLECTIONS = [
  {
    slug: "/villas",
    title: "Luxury Villas",
    subtitle: "Curtorim & Margao Enclaves",
    count: "07 BESPOKE ESTATES",
    description:
      "Independent private estates set amidst ancestral coconut groves and peaceful riverfronts. Featuring private travertine plunge pools, high vaulted teak rafters, and secluded inner courtyards.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    specs: "3,800 – 6,500 Sq.Ft • Private Pools • Gated Seclusion",
  },
  {
    slug: "/premium-homes",
    title: "Premium Homes",
    subtitle: "Verna Hills & Curtorim",
    count: "12 BOUTIQUE RESIDENCES",
    description:
      "Low-density residences crafted for seamless, low-maintenance living. Perfect for HNIs and NRIs seeking a lock-and-leave sanctuary in South Goa with biometric security and lush private gardens.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    specs: "2,400 – 3,600 Sq.Ft • Hillside Views • Curated Amenity",
  },
];

export default function CollectionsSection() {
  return (
    <section className="w-full py-28 md:py-36 bg-[#F7F5F0] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Section Header with Indentation */}
        <div className="mb-20">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#B38F5B] block mb-3 font-medium">
            PORTFOLIO TYPOLOGY • COLLECTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#121210] font-light max-w-4xl arch-indent leading-[1.05]">
            Two deliberate disciplines of living: Luxury Villas and Premium Homes.
          </h2>
        </div>

        {/* Two Tall Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              href={col.slug}
              className="group flex flex-col justify-between"
              data-cursor="EXPLORE"
            >
              {/* Tall Image with Hover Scale */}
              <div className="relative w-full h-[460px] sm:h-[580px] md:h-[660px] overflow-hidden rounded-sm mb-6 bg-[#08130F]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02] transition-transform duration-[1200ms] ease-[cubic-bezier(0.17,0.84,0.44,1)] group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-[#08130F]/80 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
                  {col.count}
                </div>
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[#121210] flex items-center justify-center transition-all duration-300 group-hover:bg-[#B38F5B] group-hover:text-[#08130F] group-hover:scale-110">
                  <ArrowUpRightIcon size={16} />
                </div>
              </div>

              {/* Card Meta Content with Brass Underline Transition */}
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between border-b border-[#121210]/15 pb-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#121210] group-hover:text-[#B38F5B] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs font-sans text-[#7E796E] mt-0.5">
                      {col.subtitle}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[#B38F5B] uppercase tracking-wider">
                    {col.specs}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-sans text-[#7E796E] leading-relaxed max-w-xl pt-2">
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
