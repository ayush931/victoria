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
    label: "01 / The Architecture",
    headline: "Tropical Modernism Framed in Goa's Red Laterite",
    description:
      "Nature’s Cove is an exclusive collection of 13 bespoke row villas set in the historic agrarian village of Curtorim. Each residence is sculpted around private courtyards, reflecting pools, and ancestral balcãos that celebrate the natural rhythm of Goan village life.",
    specs: [
      { label: "Configuration", val: "4 BHK + Maid's Quarters" },
      { label: "Plot Enclaves", val: "3,400 – 4,800 Sq.Ft" },
      { label: "Built-up Area", val: "420 – 540 Sq.M" },
      { label: "Private Pools", val: "Italian Travertine Finish" },
    ],
  },
  {
    id: "curtorim",
    label: "02 / The Village Serenity",
    headline: "Curtorim: The Ancient Breadbasket of Goa",
    description:
      "Known for its expansive emerald paddy fields, centuries-old water bodies, and the 16th-century Church of St. Alex, Curtorim offers rare geographic privacy. Located just 15 minutes from Margao and 25 minutes from South Goa’s untouched silver beaches.",
    specs: [
      { label: "Setting", val: "Curtorim Lake & Waterway Edge" },
      { label: "Beach Distance", val: "18 Mins to Varca / Benaulim" },
      { label: "Airport Access", val: "38 Mins to Dabolim Airport" },
      { label: "Density", val: "Strict Low-Density Masterplan" },
    ],
  },
  {
    id: "materials",
    label: "03 / Master Materials",
    headline: "Tactile Travertine, Burma Teak, and Antique Brass",
    description:
      "Every surface is tactile and honest. Honed Italian cross-cut travertine flooring provides soothing coolness underfoot, while reclaimed Burma teak rafters rise into soaring 5.2-meter double-height ceilings that naturally expel warm air.",
    specs: [
      { label: "Stone Masonry", val: "Hand-Cut Goan Laterite" },
      { label: "Timber", val: "Aged Burma Teak Trusses" },
      { label: "Hardware", val: "Living Antique Champagne Brass" },
      { label: "Glazing", val: "Acoustic Low-E High-Performance" },
    ],
  },
];

export default function SignatureProjectSection({ onOpenConcierge }: SignatureProjectSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab];

  return (
    <section className="w-full py-28 md:py-36 bg-[#FAF8F5] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SparklesIcon size={14} className="text-[#B38F5B]" />
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#B38F5B] font-semibold">
                FLAGSHIP SIGNATURE DEVELOPMENT
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#121210] font-light leading-none">
              Nature&apos;s Cove
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#7E796E] mt-3 uppercase tracking-widest">
              13 Bespoke Row Villas • Curtorim, South Goa
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/residences/natures-cove"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#B38F5B] hover:text-[#08130F] transition-all duration-300 rounded-sm"
              data-cursor="RESIDENCE"
            >
              <span>Explore Masterplan</span>
              <ArrowUpRightIcon size={14} />
            </Link>
            <button
              type="button"
              onClick={onOpenConcierge}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#121210]/20 text-[#121210] text-xs font-sans uppercase tracking-[0.2em] hover:border-[#B38F5B] hover:text-[#B38F5B] transition-colors rounded-sm"
            >
              <span>Enquire Pricing</span>
            </button>
          </div>
        </div>

        {/* Interactive 3D Villa Model Viewport */}
        <div className="mb-16">
          <VillaViewer3D />
        </div>

        {/* Tab Navigation (Kononenko Hairline Filter Style) */}
        <div className="flex flex-wrap gap-6 sm:gap-12 border-b border-[#121210]/15 pb-4 mb-12">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`text-xs sm:text-sm font-sans tracking-[0.1em] pb-2 transition-all relative ${
                activeTab === idx
                  ? "text-[#121210] font-medium"
                  : "text-[#7E796E] hover:text-[#121210]"
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === idx && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B38F5B]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <h3 className="text-2xl sm:text-4xl font-serif text-[#121210] mb-6 leading-snug">
              {current.headline}
            </h3>
            <p className="text-sm sm:text-base font-sans text-[#7E796E] leading-relaxed max-w-2xl mb-8">
              {current.description}
            </p>
            <div className="inline-flex items-center gap-6 text-xs font-mono text-[#B38F5B]">
              <span>PRICE: ON PRIVATE REQUEST</span>
              <span>•</span>
              <span>STATUS: UNDER CONSTRUCTION</span>
              <span>•</span>
              <span>HANDOVER: Q4 2026</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F7F5F0] p-8 border border-[#121210]/10 rounded-sm">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B38F5B] block mb-4 font-semibold">
              KEY ARCHITECTURAL METRICS
            </span>
            <div className="flex flex-col divide-y divide-[#121210]/10">
              {current.specs.map((item) => (
                <div key={item.label} className="py-3.5 flex justify-between items-center text-xs font-sans">
                  <span className="text-[#7E796E]">{item.label}</span>
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
