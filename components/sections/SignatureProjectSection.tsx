"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, SparklesIcon } from "@/components/ui/Icons";

interface SignatureProjectSectionProps {
  onOpenConcierge?: () => void;
}

const TABS = [
  {
    id: "overview",
    label: "01 / Indo-Portuguese Vernacular",
    headline: "Tropical Modernism Sculpted in Goan Red Laterite",
    description:
      "Nature’s Cove is an exclusive enclave of 13 bespoke row villas set in the historic agrarian village of Curtorim. Each residence is conceived around private central rain courtyards (rajangan), natural plunge pools, and ancestral balcãos that celebrate the unhurried rhythm of Goan Susegad living.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
    imageCaption: "The Balcão Frontage • Nature's Cove, Curtorim",
    specs: [
      { label: "Configuration", val: "4 BHK + Balcão Veranda" },
      { label: "Plot Enclaves", val: "3,400 – 4,800 Sq.Ft" },
      { label: "Built-up Area", val: "420 – 540 Sq.M" },
      { label: "Private Pools", val: "Sukabumi Volcanic Emerald Stone" },
      { label: "Fenestration", val: "Carepas (Oyster Shell Lattices)" },
    ],
  },
  {
    id: "curtorim",
    label: "02 / The Ancient Breadbasket",
    headline: "Curtorim: Shimmering Lakes & Centuries-Old Heritage",
    description:
      "Celebrated as the ancient granary of Goa, Curtorim offers rare geographic seclusion bounded by lush paddy fields, migratory bird lakes, and the historic 16th-century Church of St. Alex. Located just 15 minutes from Margao’s Latin heritage quarter and 20 minutes from the silver sands of Benaulim and Varca.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    imageCaption: "The Silver Shores • 18 Mins from Curtorim",
    specs: [
      { label: "Setting", val: "Curtorim Lake & River Basin" },
      { label: "Beach Distance", val: "18 Mins to Varca / Benaulim" },
      { label: "Airport Access", val: "38 Mins to Dabolim / 55 Mins Mopa" },
      { label: "Masterplan", val: "Strict Low-Density Private Enclave" },
      { label: "Zoning", val: "Non-Commercial Heritage Hamlet" },
    ],
  },
  {
    id: "materials",
    label: "03 / Master Goan Materials",
    headline: "Laterite, Mother-of-Pearl Shells, and Aged Burma Teak",
    description:
      "Every surface is tactile, honest, and indigenous to the Konkan coast. Hand-dressed red laterite stone walls act as thermal sponges against afternoon heat, while reclaimed Burma teak trusses rise into soaring 5.2-meter double-height ceilings to effortlessly vent warm air.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    imageCaption: "Laterite, Teak & Oyster Light • Material Study",
    specs: [
      { label: "Wall Masonry", val: "Hand-Cut Goan Laterite Stone" },
      { label: "Roofing", val: "Terracotta Mangalore Clay Tiles" },
      { label: "Timber", val: "Aged Burma Teak & Goan Rosewood" },
      { label: "Windows", val: "Mother-of-Pearl Shell Panes (Carepas)" },
      { label: "Hardware", val: "Living Champagne Patinated Brass" },
    ],
  },
];

export default function SignatureProjectSection({ onOpenConcierge }: SignatureProjectSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab];

  return (
    <section className="w-full py-36 md:py-48 bg-[#FAF8F5] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Section Header with Generous Whitespace */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 md:mb-24">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SparklesIcon size={14} className="text-[#B84A39]" />
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#B84A39] font-semibold">
                FLAGSHIP SIGNATURE DEVELOPMENT • CURTORIM
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#121210] font-light leading-none">
              Nature&apos;s Cove
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#7A756B] mt-4 uppercase tracking-widest font-light">
              13 Bespoke Row Villas • Lakefront Enclave, South Goa
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/residences/natures-cove"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0C1A14] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-[#D49B44] hover:text-[#0C1A14] transition-all duration-300 rounded-full"
              data-cursor="RESIDENCE"
            >
              <span>Explore Masterplan</span>
              <ArrowUpRightIcon size={14} />
            </Link>
            <button
              type="button"
              onClick={onOpenConcierge}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#121210]/20 text-[#121210] text-xs font-sans uppercase tracking-[0.22em] hover:border-[#B84A39] hover:text-[#B84A39] transition-colors rounded-full"
            >
              <span>Enquire Pricing</span>
            </button>
          </div>
        </div>

        {/* Cinematic Tabbed Showcase — full-bleed, GPU-cheap crossfade */}
        <div className="mb-20">
          <div className="relative h-[62vh] min-h-[440px] md:h-[72vh] max-h-[660px] overflow-hidden rounded-sm bg-[#0C1A14]" data-cursor="NATURE'S COVE">
            {TABS.map((tab, idx) => (
              <img
                key={tab.id}
                src={tab.image}
                alt={tab.headline}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover object-center goa-grade transition-opacity duration-700 ease-out ${
                  activeTab === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-[#0C1A14]/80 px-4 py-2 text-[10px] font-mono tracking-[0.2em] text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
              {current.imageCaption}
            </div>
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex items-center gap-2">
              {TABS.map((tab, idx) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  aria-label={`View ${tab.label}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeTab === idx ? "w-10 bg-[#D49B44]" : "w-5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation with Clear Breathing Room */}
        <div className="flex flex-wrap gap-6 sm:gap-12 border-b border-[#121210]/15 pb-4 mb-16">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`text-xs sm:text-sm font-sans tracking-[0.12em] pb-3 transition-all relative ${
                activeTab === idx
                  ? "text-[#121210] font-medium"
                  : "text-[#7A756B] hover:text-[#121210]"
              }`}
            >
              <span className="uppercase">{tab.label}</span>
              {activeTab === idx && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B84A39]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h3 className="text-2xl sm:text-4xl font-serif text-[#121210] mb-6 leading-snug">
              {current.headline}
            </h3>
            <p className="text-sm sm:text-base font-sans text-[#7A756B] leading-relaxed max-w-2xl mb-10 font-light">
              {current.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-[#B84A39]">
              <span>PRICE: ON PRIVATE REQUEST</span>
              <span>•</span>
              <span>UNDER CONSTRUCTION</span>
              <span>•</span>
              <span>HANDOVER: Q4 2026</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F4EFE6] p-8 md:p-10 border border-[#121210]/10 rounded-sm">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B84A39] block mb-6 font-semibold">
              KEY ARCHITECTURAL METRICS
            </span>
            <div className="flex flex-col divide-y divide-[#121210]/10">
              {current.specs.map((item) => (
                <div key={item.label} className="py-4 flex justify-between items-center text-xs font-sans">
                  <span className="text-[#7A756B]">{item.label}</span>
                  <span className="font-medium text-[#121210]">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
