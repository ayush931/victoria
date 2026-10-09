"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

type ViewMode = "grid" | "list" | "gallery";

const ALL_WORKS = [
  {
    slug: "/residences/natures-cove",
    title: "Nature's Cove — Villa A",
    subtitle: "The Lakefront Sanctuary",
    location: "Curtorim Lake, South Goa",
    typology: "FLAGSHIP ROW VILLA",
    area: "480 m²",
    beds: "4 BHK",
    year: "2026",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-8",
    marginTop: "",
    height: "h-[420px] sm:h-[540px] lg:h-[620px]",
  },
  {
    slug: "/residences/natures-cove",
    title: "Nature's Cove — Villa B",
    subtitle: "The Orchard Courtyard",
    location: "Curtorim Village, South Goa",
    typology: "FLAGSHIP ROW VILLA",
    area: "420 m²",
    beds: "4 BHK",
    year: "2026",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-7",
    marginTop: "lg:mt-32",
    height: "h-[380px] sm:h-[480px] lg:h-[560px]",
  },
  {
    slug: "/residences/quinta-da-rosa",
    title: "Quinta Da Rosa Manor",
    subtitle: "Ancestral Balcão Estate",
    location: "Curtorim Heritage Belt",
    typology: "HERITAGE MANOR",
    area: "650 m²",
    beds: "5 BHK",
    year: "2025",
    status: "Completed Commission",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-6",
    marginTop: "lg:mt-16",
    height: "h-[400px] sm:h-[500px] lg:h-[580px]",
  },
  {
    slug: "/residences/casa-do-sol",
    title: "Casa Do Sol",
    subtitle: "Verna Ridge Residence",
    location: "Verna Hills Plateau",
    typology: "BOUTIQUE HILLSIDE",
    area: "380 m²",
    beds: "3 BHK",
    year: "2025",
    status: "Ready for Handover",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-9",
    marginTop: "lg:mt-24",
    height: "h-[420px] sm:h-[520px] lg:h-[600px]",
  },
  {
    slug: "/residences/natures-cove",
    title: "Villa Miramar",
    subtitle: "Salcete Waterway Enclave",
    location: "Salcete River Estuary",
    typology: "WATERFRONT ESTATE",
    area: "540 m²",
    beds: "4 BHK",
    year: "2024",
    status: "Commissioned",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-7",
    marginTop: "lg:mt-12",
    height: "h-[380px] sm:h-[480px] lg:h-[540px]",
  },
  {
    slug: "/residences/casa-do-sol",
    title: "Aldeia Curtorim",
    location: "Curtorim Village Edge",
    subtitle: "Low-Density Garden Home",
    typology: "GARDEN ENCLAVE",
    area: "340 m²",
    beds: "3 BHK",
    year: "2027",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-8",
    marginTop: "lg:mt-28",
    height: "h-[400px] sm:h-[500px] lg:h-[580px]",
  },
];

export default function WorkArchivePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  const filters = ["ALL", "FLAGSHIP ROW VILLA", "HERITAGE MANOR", "BOUTIQUE HILLSIDE", "WATERFRONT ESTATE"];

  const filteredWorks = activeFilter === "ALL"
    ? ALL_WORKS
    : ALL_WORKS.filter((w) => w.typology === activeFilter);

  return (
    <main className="relative w-full min-h-screen bg-[#F7F5F0] text-[#121210] pb-24">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Header */}
      <section className="w-full pt-40 pb-16 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#B38F5B] block mb-3 font-medium">
              PORTFOLIO ARCHIVE • 2014–2026
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#121210] font-light leading-none">
              Selected Works <sup className="text-2xl font-serif text-[#B38F5B]">({ALL_WORKS.length})</sup>
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-sans text-[#7E796E] max-w-sm leading-relaxed">
            A comprehensive record of bespoke row villas, private estates, and boutique residences
            crafted across South Goa&apos;s historic enclaves.
          </p>
        </div>
      </section>

      {/* Typology Filter Bar */}
      <section className="w-full py-6 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="flex flex-wrap gap-4 sm:gap-8">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`text-xs font-sans tracking-[0.15em] uppercase pb-2 transition-all relative ${
                activeFilter === f
                  ? "text-[#121210] font-semibold"
                  : "text-[#7E796E] hover:text-[#121210]"
              }`}
            >
              <span>{f}</span>
              {activeFilter === f && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B38F5B]" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* VIEW MODE 1: Kononenko Asymmetric Masonry Grid */}
      {viewMode === "grid" && (
        <section className="w-full py-20 px-6 md:px-12 max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-15 gap-8 lg:gap-12">
            {filteredWorks.map((proj) => (
              <Link
                key={proj.title}
                href={proj.slug}
                className={`group flex flex-col ${proj.colSpan} ${proj.marginTop}`}
                data-cursor="VIEW"
              >
                <div className={`relative w-full ${proj.height} overflow-hidden rounded-sm bg-[#08130F] mb-4`}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.02] transition-transform duration-[1100ms] ease-[cubic-bezier(0.17,0.84,0.44,1)] group-hover:scale-[1.035]"
                  />
                  <div className="absolute top-5 left-5 bg-[#08130F]/80 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
                    {proj.typology}
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-[#121210]/15 pb-3 pt-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif text-[#121210] group-hover:text-[#B38F5B] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] font-sans text-[#7E796E]">
                      {proj.location} • {proj.beds}
                    </p>
                  </div>

                  <div className="slide-swap text-right text-xs font-sans">
                    <span className="slide-swap-item slide-swap-default font-mono text-[#7E796E]">
                      {proj.area}
                    </span>
                    <span className="slide-swap-item slide-swap-hover text-[#B38F5B] font-medium flex items-center gap-1 justify-end">
                      <span>Visit</span>
                      <ArrowUpRightIcon size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* VIEW MODE 2: Kononenko Refined List Table View */}
      {viewMode === "list" && (
        <section className="w-full py-16 px-6 md:px-12 max-w-[1720px] mx-auto">
          <div className="flex flex-col border-t border-[#121210]/15">
            {filteredWorks.map((proj, idx) => (
              <Link
                key={proj.title}
                href={proj.slug}
                className="group py-8 px-4 border-b border-[#121210]/15 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:bg-[#08130F] hover:text-[#FAF8F5]"
                data-cursor="RESIDENCE"
              >
                {/* Col 1: Number & Title */}
                <div className="md:w-4/12 flex items-center gap-6">
                  <span className="text-xs font-mono text-[#B38F5B]">0{idx + 1}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif">{proj.title}</h3>
                    <span className="text-xs text-[#7E796E] group-hover:text-[#C5A880]">{proj.subtitle}</span>
                  </div>
                </div>

                {/* Col 2: Typology & Location */}
                <div className="md:w-3/12 text-xs font-sans text-[#7E796E] group-hover:text-[#FAF8F5]/70">
                  <p className="font-mono text-[#B38F5B] mb-0.5">{proj.typology}</p>
                  <p>{proj.location}</p>
                </div>

                {/* Col 3: Specs & Year */}
                <div className="md:w-3/12 text-xs font-sans text-[#7E796E] group-hover:text-[#FAF8F5]/70 flex items-center gap-6">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-current/50">Built-Up</span>
                    <span className="font-mono text-current font-medium">{proj.area}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-current/50">Timeline</span>
                    <span className="text-current">{proj.status}</span>
                  </div>
                </div>

                {/* Col 4: Thumbnail & Arrow */}
                <div className="md:w-2/12 flex items-center justify-end gap-4">
                  <div className="w-16 h-11 rounded-sm overflow-hidden bg-black/20 shrink-0">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center text-current group-hover:border-[#B38F5B] group-hover:text-[#B38F5B]">
                    <ArrowUpRightIcon size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* VIEW MODE 3: Full-Bleed Magazine Gallery View */}
      {viewMode === "gallery" && (
        <section className="w-full py-16 px-6 md:px-12 max-w-[1720px] mx-auto">
          <div className="flex flex-col gap-24">
            {filteredWorks.map((proj, idx) => (
              <div key={proj.title} className="flex flex-col gap-6">
                <div className="relative w-full h-[520px] sm:h-[660px] rounded-sm overflow-hidden bg-[#08130F]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08130F] via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-[#FAF8F5]">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block mb-1">
                        0{idx + 1} / {proj.typology}
                      </span>
                      <h3 className="text-3xl sm:text-5xl font-serif">{proj.title}</h3>
                      <p className="text-xs sm:text-sm font-sans text-[#FAF8F5]/70 mt-1">{proj.location} • {proj.beds} • {proj.area}</p>
                    </div>
                    <Link
                      href={proj.slug}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#B38F5B] text-[#08130F] text-xs font-sans uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#FAF8F5] transition-colors"
                    >
                      <span>Explore Residence</span>
                      <ArrowUpRightIcon size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Kononenko Floating View Toggle Pill (.xgy .ouf) */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="bg-[#08130F]/90 backdrop-blur-md border border-[#FAF8F5]/15 text-[#FAF8F5] px-4 py-2 rounded-full shadow-2xl flex items-center gap-4 pointer-events-auto">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 ${
              viewMode === "grid"
                ? "bg-[#B38F5B] text-[#08130F] font-semibold"
                : "text-[#FAF8F5]/60 hover:text-[#FAF8F5]"
            }`}
          >
            <span className="text-[10px]">⊞</span>
            <span>Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 ${
              viewMode === "list"
                ? "bg-[#B38F5B] text-[#08130F] font-semibold"
                : "text-[#FAF8F5]/60 hover:text-[#FAF8F5]"
            }`}
          >
            <span className="text-[10px]">≡</span>
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("gallery")}
            className={`px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 ${
              viewMode === "gallery"
                ? "bg-[#B38F5B] text-[#08130F] font-semibold"
                : "text-[#FAF8F5]/60 hover:text-[#FAF8F5]"
            }`}
          >
            <span className="text-[10px]">▥</span>
            <span>Gallery</span>
          </button>
        </div>
      </div>

      <Footer />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        preselectedResidence="Work Archive Inquiry"
      />
    </main>
  );
}
