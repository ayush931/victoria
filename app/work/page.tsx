"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import PageHero from "@/components/layout/PageHero";
import { ArrowUpRightIcon, GridIcon, ListIcon, GalleryIcon } from "@/components/ui/Icons";

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
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-7",
    marginTop: "lg:mt-32",
    height: "h-[380px] sm:h-[480px] lg:h-[560px]",
  },
  {
    slug: "/residences/quinta-da-rosa",
    title: "Quinta Da Rosa Manor",
    subtitle: "Ancestral Balcão Estate",
    location: "Salcete Heritage Belt, South Goa",
    typology: "HERITAGE MANOR",
    area: "650 m²",
    beds: "5 BHK",
    year: "2025",
    status: "Completed Commission",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-6",
    marginTop: "lg:mt-16",
    height: "h-[400px] sm:h-[500px] lg:h-[580px]",
  },
  {
    slug: "/residences/casa-do-sol",
    title: "Casa Do Sol",
    subtitle: "Assagao Ridge Residence",
    location: "Assagao, North Goa",
    typology: "BOUTIQUE HILLSIDE",
    area: "520 m²",
    beds: "4 BHK",
    year: "2025",
    status: "Ready for Handover",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-9",
    marginTop: "lg:mt-24",
    height: "h-[420px] sm:h-[520px] lg:h-[600px]",
  },
  {
    slug: "/residences/natures-cove",
    title: "Villa Miramar",
    subtitle: "Salcete Waterway Enclave",
    location: "Salcete River Estuary, Goa",
    typology: "WATERFRONT ESTATE",
    area: "540 m²",
    beds: "4 BHK",
    year: "2024",
    status: "Commissioned",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop",
    colSpan: "lg:col-span-7",
    marginTop: "lg:mt-12",
    height: "h-[380px] sm:h-[480px] lg:h-[540px]",
  },
  {
    slug: "/residences/casa-do-sol",
    title: "Aldeia Curtorim",
    location: "Curtorim Village Edge, Goa",
    subtitle: "Low-Density Balcão Home",
    typology: "GARDEN ENCLAVE",
    area: "340 m²",
    beds: "3 BHK",
    year: "2027",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1600&auto=format&fit=crop",
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
    <main className="relative w-full min-h-screen bg-[#FAF8F5] text-[#121210] pb-24">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Header with Expansive Whitespace */}
      <PageHero
        index="04"
        eyebrow="Portfolio Archive • Goa 2014–2026"
        title={<>Selected Works <sup className="font-serif text-[0.35em] text-[#B84A39]">({ALL_WORKS.length})</sup></>}
        description="A comprehensive record of bespoke row villas, private estates, and boutique residences crafted across South Goa's historic enclaves."
        meta={["Row Villas", "Heritage Manors", "Boutique Homes", "6 Commissions"]}
      />

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
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B84A39]" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* VIEW MODE 1: Kononenko Asymmetric Masonry Grid */}
      {viewMode === "grid" && (
        <section className="w-full py-24 md:py-32 px-6 md:px-12 max-w-[1720px] mx-auto">
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
                    <h3 className="text-base sm:text-lg font-serif text-[#121210] group-hover:text-[#B84A39] transition-colors">
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
                    <span className="slide-swap-item slide-swap-hover text-[#B84A39] font-medium flex items-center gap-1 justify-end">
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
                  <span className="text-xs font-mono text-[#B84A39]">0{idx + 1}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif">{proj.title}</h3>
                    <span className="text-xs text-[#7E796E] group-hover:text-[#D49B44]">{proj.subtitle}</span>
                  </div>
                </div>

                {/* Col 2: Typology & Location */}
                <div className="md:w-3/12 text-xs font-sans text-[#7E796E] group-hover:text-[#FAF8F5]/70">
                  <p className="font-mono text-[#B84A39] mb-0.5">{proj.typology}</p>
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
                  <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center text-current group-hover:border-[#B84A39] group-hover:text-[#B84A39]">
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
                      <span className="text-[10px] font-mono tracking-widest text-[#D49B44] uppercase block mb-1">
                        0{idx + 1} / {proj.typology}
                      </span>
                      <h3 className="text-3xl sm:text-5xl font-serif">{proj.title}</h3>
                      <p className="text-xs sm:text-sm font-sans text-[#FAF8F5]/70 mt-1">{proj.location} • {proj.beds} • {proj.area}</p>
                    </div>
                    <Link
                      href={proj.slug}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] font-medium rounded-full hover:bg-[#D49B44] hover:text-[#08130F] transition-colors"
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
                ? "bg-[#B84A39] text-[#FAF8F5] font-semibold"
                : "text-[#FAF8F5]/60 hover:text-[#FAF8F5]"
            }`}
          >
            <GridIcon size={12} />
            <span>Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 ${
              viewMode === "list"
                ? "bg-[#B84A39] text-[#FAF8F5] font-semibold"
                : "text-[#FAF8F5]/60 hover:text-[#FAF8F5]"
            }`}
          >
            <ListIcon size={12} />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("gallery")}
            className={`px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 ${
              viewMode === "gallery"
                ? "bg-[#B84A39] text-[#FAF8F5] font-semibold"
                : "text-[#FAF8F5]/60 hover:text-[#FAF8F5]"
            }`}
          >
            <GalleryIcon size={12} />
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
