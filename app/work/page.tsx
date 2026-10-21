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
    media: "work-media--tall",
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
    media: "work-media--mid",
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
    media: "work-media--low",
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
    media: "work-media--tall",
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
    media: "work-media--mid",
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
    media: "work-media--low",
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
    <main id="main-content" className="relative w-full min-h-screen vx-site-page pb-28">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Header with Expansive Whitespace */}
      <PageHero
        index="04"
        eyebrow="Portfolio Archive • Goa 2014–2026"
        title={<>Selected Works <sup className="font-serif text-[0.35em] text-[var(--accent-text)]">({ALL_WORKS.length})</sup></>}
        description="A comprehensive record of bespoke row villas, private estates, and boutique residences crafted across South Goa's historic enclaves."
        meta={["Row Villas", "Heritage Manors", "Boutique Homes", "6 Commissions"]}
      />

      {/* Typology Filter Bar */}
      <section className="w-full py-6 site-wrap border-b border-[var(--ink)]/10">
        <div className="vx-filterbar">
          <div className="vx-filters" role="group" aria-label="Filter the work archive by typology">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                className="vx-filter"
              >
                {f}
              </button>
            ))}
          </div>
          <span className="vx-filterbar__count" aria-live="polite">
            {String(filteredWorks.length).padStart(2, "0")} / {String(ALL_WORKS.length).padStart(2, "0")} projects
          </span>
        </div>
      </section>

      {filteredWorks.length === 0 && (
        <section className="w-full py-24 site-wrap">
          <div className="vx-empty">
            <h2>No projects in this typology yet.</h2>
            <p>Choose another category to browse the archive.</p>
          </div>
        </section>
      )}

      {/* VIEW MODE 1: Kononenko Asymmetric Masonry Grid */}
      {viewMode === "grid" && filteredWorks.length > 0 && (
        <section className="w-full py-24 md:py-32 site-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-15 gap-8 lg:gap-12">
            {filteredWorks.map((proj) => (
              <Link
                key={proj.title}
                href={proj.slug}
                className={`group flex flex-col ${proj.colSpan} ${proj.marginTop}`}
                data-cursor="VIEW"
              >
                <div className={`relative w-full ${proj.media} overflow-hidden rounded-sm bg-[var(--forest-deep)] mb-4`}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.02] transition-transform duration-[1100ms] ease-[cubic-bezier(0.17,0.84,0.44,1)] group-hover:scale-[1.035]"
                  />
                  <div className="vx-media-badge">{proj.typology}</div>
                </div>

                <div className="flex items-center justify-between border-b border-[var(--ink)]/15 pb-3 pt-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif text-[var(--ink)] group-hover:text-[var(--accent-text)] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] font-sans text-[var(--ink-soft)]">
                      {proj.location} • {proj.beds}
                    </p>
                  </div>

                  <div className="slide-swap text-right text-xs font-sans">
                    <span className="slide-swap-item slide-swap-default font-mono text-[var(--ink-soft)]">
                      {proj.area}
                    </span>
                    <span className="slide-swap-item slide-swap-hover text-[var(--accent-text)] font-medium flex items-center gap-1 justify-end">
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
      {viewMode === "list" && filteredWorks.length > 0 && (
        <section className="w-full py-16 site-wrap">
          <div className="flex flex-col border-t border-[var(--ink)]/15">
            {filteredWorks.map((proj, idx) => (
              <Link
                key={proj.title}
                href={proj.slug}
                className="group py-8 px-4 border-b border-[var(--ink)]/15 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300 hover:bg-[var(--forest-deep)] hover:text-[var(--on-dark)]"
                data-cursor="RESIDENCE"
              >
                {/* Col 1: Number & Title */}
                <div className="md:w-4/12 flex items-center gap-6">
                  <span className="text-xs font-mono text-[var(--accent-text)]">0{idx + 1}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif">{proj.title}</h3>
                    <span className="text-xs text-[var(--ink-soft)] group-hover:text-[var(--signal)]">{proj.subtitle}</span>
                  </div>
                </div>

                {/* Col 2: Typology & Location */}
                <div className="md:w-3/12 text-xs font-sans text-[var(--ink-soft)] group-hover:text-[var(--on-dark)]/70">
                  <p className="font-mono text-[var(--accent-text)] group-hover:text-[var(--signal)] mb-0.5">{proj.typology}</p>
                  <p>{proj.location}</p>
                </div>

                {/* Col 3: Specs & Year */}
                <div className="md:w-3/12 text-xs font-sans text-[var(--ink-soft)] group-hover:text-[var(--on-dark)]/70 flex items-center gap-6">
                  <div>
                    <span className="block text-[0.625rem] uppercase tracking-wider text-current/50">Built-Up</span>
                    <span className="font-mono text-current font-medium">{proj.area}</span>
                  </div>
                  <div>
                    <span className="block text-[0.625rem] uppercase tracking-wider text-current/50">Timeline</span>
                    <span className="text-current">{proj.status}</span>
                  </div>
                </div>

                {/* Col 4: Thumbnail & Arrow */}
                <div className="md:w-2/12 flex items-center justify-end gap-4">
                  <div className="w-20 h-14 rounded-sm overflow-hidden bg-[var(--forest-deep)] shrink-0">
                    <img src={proj.image} alt={proj.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center text-current group-hover:border-[var(--signal)] group-hover:text-[var(--signal)]">
                    <ArrowUpRightIcon size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* VIEW MODE 3: Full-Bleed Magazine Gallery View */}
      {viewMode === "gallery" && filteredWorks.length > 0 && (
        <section className="w-full py-16 site-wrap">
          <div className="flex flex-col gap-24">
            {filteredWorks.map((proj, idx) => (
              <div key={proj.title} className="flex flex-col gap-6">
                <div className="work-media--gallery relative w-full h-[520px] sm:h-[660px] rounded-sm overflow-hidden bg-[var(--forest-deep)]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)] via-transparent to-transparent" />
                  <div className="vx-dark absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-[var(--on-dark)]">
                    <div>
                      <span className="text-[0.625rem] font-mono tracking-widest text-[var(--signal)] uppercase block mb-1">
                        0{idx + 1} / {proj.typology}
                      </span>
                      <h3 className="text-3xl sm:text-5xl font-serif">{proj.title}</h3>
                      <p className="text-xs sm:text-sm font-sans text-[var(--on-dark)]/70 mt-1">{proj.location} • {proj.beds} • {proj.area}</p>
                    </div>
                    <Link
                      href={proj.slug}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--forest-deep)] text-[var(--on-dark)] text-xs font-sans uppercase tracking-[0.2em] font-medium rounded-full hover:bg-[var(--signal)] hover:text-[var(--forest-deep)] transition-colors"
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

      {/* Floating view switch — stays clear of phone gesture areas. */}
      <div className="work-toggle-wrap">
        <div className="work-toggle vx-dark" role="group" aria-label="Portfolio view mode">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
          >
            <GridIcon size={13} />
            <span>Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
          >
            <ListIcon size={13} />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("gallery")}
            aria-pressed={viewMode === "gallery"}
          >
            <GalleryIcon size={13} />
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
