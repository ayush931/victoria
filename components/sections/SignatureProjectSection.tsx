"use client";

import React, { useState } from "react";
import Link from "next/link";
import VillaViewer3D from "@/components/3d/VillaViewer3D";
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0C1A14] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-[#D49B44] hover:text-[#0C1A14] transition-all duration-300 rounded-sm"
              data-cursor="RESIDENCE"
            >
              <span>Explore Masterplan</span>
              <ArrowUpRightIcon size={14} />
            </Link>
            <button
              type="button"
              onClick={onOpenConcierge}
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#121210]/20 text-[#121210] text-xs font-sans uppercase tracking-[0.22em] hover:border-[#B84A39] hover:text-[#B84A39] transition-colors rounded-sm"
            >
              <span>Enquire Pricing</span>
            </button>
          </div>
        </div>

        {/* Interactive 3D Villa Model Viewport with Spacious Framing */}
        <div className="mb-20">
          <VillaViewer3D />
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
