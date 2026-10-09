"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const PROJECTS = [
  {
    slug: "/residences/natures-cove",
    title: "Nature's Cove — Villa A",
    subtitle: "The Lakefront Sanctuary",
    location: "Curtorim Lake Enclave, South Goa",
    area: "480 m²",
    beds: "4 BHK",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-8",
    marginTop: "",
    height: "h-[400px] sm:h-[540px] lg:h-[640px]",
    tag: "FLAGSHIP ROW VILLA",
  },
  {
    slug: "/residences/natures-cove",
    title: "Nature's Cove — Villa B",
    subtitle: "The Orchard Courtyard",
    location: "Curtorim Village, South Goa",
    area: "420 m²",
    beds: "4 BHK",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-7",
    marginTop: "lg:mt-32",
    height: "h-[400px] sm:h-[500px] lg:h-[580px]",
    tag: "LAKE RESIDENCE",
  },
  {
    slug: "/residences/quinta-da-rosa",
    title: "Quinta Da Rosa",
    subtitle: "Ancestral Balcão Manor",
    location: "Salcete Heritage Basin, South Goa",
    area: "650 m²",
    beds: "5 BHK",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-6",
    marginTop: "lg:mt-12",
    height: "h-[400px] sm:h-[520px] lg:h-[600px]",
    tag: "PORTUGUESE MANOR",
  },
  {
    slug: "/residences/casa-do-sol",
    title: "Casa Do Sol",
    subtitle: "Assagao Palm Ridge Residence",
    location: "Assagao, North Goa",
    area: "520 m²",
    beds: "4 BHK",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-9",
    marginTop: "lg:mt-24",
    height: "h-[400px] sm:h-[540px] lg:h-[620px]",
    tag: "DESIGNER SANCTUARY",
  },
];

export default function WorksGridSection() {
  return (
    <section className="w-full py-24 md:py-36 bg-[#FAF8F5] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Section Header (Kononenko Selected Projects <sup>(4+)</sup>) */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#B84A39] block mb-2 font-medium">
              SELECTED PORTFOLIO • RESIDENCES
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#121210] font-light">
              Selected Residences <sup className="text-2xl font-serif text-[#B84A39]">(4+)</sup>
            </h2>
          </div>

          <Link
            href="/villas"
            className="arch-link text-xs font-sans uppercase tracking-[0.2em] text-[#121210] hover:text-[#B84A39]"
          >
            Explore Complete Archive
          </Link>
        </div>

        {/* Kononenko Signature Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-15 gap-8 lg:gap-10">
          {PROJECTS.map((proj) => (
            <Link
              key={proj.title}
              href={proj.slug}
              className={`group flex flex-col ${proj.colSpan} ${proj.marginTop}`}
              data-cursor="VIEW"
            >
              {/* Image Container with Smooth Scale */}
              <div className={`relative w-full ${proj.height} overflow-hidden rounded-sm bg-[#08130F] mb-4`}>
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.02] transition-transform duration-[1100ms] ease-[cubic-bezier(0.17,0.84,0.44,1)] group-hover:scale-[1.035]"
                />
                <div className="absolute top-5 left-5 bg-[#08130F]/80 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
                  {proj.tag}
                </div>
              </div>

              {/* Bottom Caption Bar with Dual Sliding Text (Kononenko .i-w & .i-c style) */}
              <div className="flex items-center justify-between border-b border-[#121210]/15 pb-3 pt-1">
                <div>
                  <h3 className="text-base sm:text-lg font-serif text-[#121210] group-hover:text-[#B84A39] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] font-sans text-[#7E796E]">
                    {proj.location} • {proj.beds}
                  </p>
                </div>

                {/* The Signature Dual Sliding Swap Interaction */}
                <div className="slide-swap text-right text-xs font-sans">
                  <span className="slide-swap-item slide-swap-default font-mono text-[#7E796E]">
                    {proj.area}
                  </span>
                  <span className="slide-swap-item slide-swap-hover text-[#B84A39] font-medium flex items-center gap-1 justify-end">
                    <span>Visit</span>
                    <ArrowUpRightIcon size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
