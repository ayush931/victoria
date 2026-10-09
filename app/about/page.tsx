"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import ArchitecturalCompass from "@/components/effects/ArchitecturalCompass";
import PageHero from "@/components/layout/PageHero";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

export default function AboutPage() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-[#FAF8F5] text-[#121210]">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header with Expansive Whitespace */}
      <PageHero
        index="05"
        eyebrow="Atelier Heritage • 2014–2026"
        title={<>Architects of dreams, <em className="text-[#B84A39]">designers of reality.</em></>}
        description="“Homes conceived as heirlooms. Built once, cherished for generations in the soul of Goa.”"
        meta={["Est. 2014 Margao", "Salcete & Assagao", "Row Villas & Estates"]}
      />

      {/* The 10-Year Narrative with Wide Breathing Room */}
      <section className="w-full py-36 md:py-48 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28 items-start">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B84A39] block mb-3 font-semibold">
              THE GOAN MEMOIR
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#121210] mb-6 font-light">
              A Decade of Quiet Susegad Restraint in Curtorim &amp; Margao
            </h2>
            <div className="flex flex-col gap-4 text-xs font-mono text-[#7A756B]">
              <span>ESTABLISHED: 2014</span>
              <span>PRINCIPAL GEOGRAPHY: SALCETE TALUKA &amp; ASSAGAO, GOA</span>
              <span>SPECIALTY: BESPOKE ROW VILLAS &amp; BOUTIQUE ESTATES</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base font-sans text-[#7A756B] leading-relaxed font-light">
            <p>
              When Victorino Luxury Homes was founded in Margao over a decade ago,
              Goa was undergoing rapid commercialization. We made an intentional,
              non-negotiable vow: we would build exclusively in the quiet sanctuaries of Goa,
              where generational heritage, agrarian rhythms, and Portuguese architecture remain sacred.
            </p>
            <p>
              Curtorim is often referred to as the &apos;Grain of Goa&apos; — a village defined by ancient
              irrigation sluice gates (manas), shimmering migratory bird lakes, and centuries-old chapels.
              Here, true luxury is not flashy glass facades; it is the rustle of coconut leaves at twilight,
              the thermal coolness of hand-cut red laterite under hand, and the absolute privacy of an estate
              shielded from the outside world.
            </p>
            <p>
              Every home we construct is built once. We do not mass-produce developments.
              Our flagship launch, Nature&apos;s Cove, comprises just 13 bespoke row villas,
              allowing our senior craftsmen to spend thousands of hours refining timber joints,
              installing mother-of-pearl oyster shell windows (carepas), and hand-dressing each stone block.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Architectural Pillars */}
      <section className="w-full py-36 md:py-48 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="mb-20">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#B84A39] block mb-3 font-semibold">
            FOUNDATIONAL TENETS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#121210] font-light">
            The Four Pillars of Our Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 md:p-10 bg-white border border-[#121210]/10 rounded-sm">
            <span className="font-mono text-xs text-[#B84A39] block mb-4 font-semibold">PILLAR 01</span>
            <h3 className="font-serif text-xl text-[#121210] mb-3">Vernacular Susegad</h3>
            <p className="text-xs font-sans text-[#7A756B] leading-relaxed font-light">
              We revive ancestral Portuguese-Goan architectural devices — the balcão porch, high timber rafters,
              and internal courtyards — adapting them for contemporary life.
            </p>
          </div>

          <div className="p-8 md:p-10 bg-white border border-[#121210]/10 rounded-sm">
            <span className="font-mono text-xs text-[#B84A39] block mb-4 font-semibold">PILLAR 02</span>
            <h3 className="font-serif text-xl text-[#121210] mb-3">Low-Density Landbanks</h3>
            <p className="text-xs font-sans text-[#7A756B] leading-relaxed font-light">
              We strictly reject high-density development. Every project preserves natural topography,
              100-year-old fruit trees, and expansive negative space.
            </p>
          </div>

          <div className="p-8 md:p-10 bg-white border border-[#121210]/10 rounded-sm">
            <span className="font-mono text-xs text-[#B84A39] block mb-4 font-semibold">PILLAR 03</span>
            <h3 className="font-serif text-xl text-[#121210] mb-3">Generational Materials</h3>
            <p className="text-xs font-sans text-[#7A756B] leading-relaxed font-light">
              Natural Goan laterite stone, carepas oyster shell panes, and seasoned reclaimed Burma teak.
              Surfaces that develop magnificent patina instead of wearing down.
            </p>
          </div>

          <div className="p-8 md:p-10 bg-white border border-[#121210]/10 rounded-sm">
            <span className="font-mono text-xs text-[#B84A39] block mb-4 font-semibold">PILLAR 04</span>
            <h3 className="font-serif text-xl text-[#121210] mb-3">Estate Stewardship</h3>
            <p className="text-xs font-sans text-[#7A756B] leading-relaxed font-light">
              Full turn-key property stewardship for global NRIs and second-home owners.
              Landscape care, security, and private concierge when you return to Goa.
            </p>
          </div>
        </div>
      </section>

      {/* Radial Gauge for Passive Climatic Logic */}
      <ArchitecturalCompass />

      {/* Call to Action with Spacious Spacing */}
      <section className="w-full py-36 text-center px-6">
        <h2 className="text-3xl sm:text-5xl font-serif text-[#121210] mb-6 font-light">
          Meet Our Architects in Margao &amp; Curtorim
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#7A756B] max-w-md mx-auto mb-10 font-light">
          Arrange a private discussion at our heritage studio or a walkthrough of our Curtorim lakefront parcels.
        </p>
        <button
          type="button"
          onClick={() => setIsConciergeOpen(true)}
          className="px-8 py-4 bg-[#0C1A14] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] font-semibold hover:bg-[#D49B44] hover:text-[#0C1A14] transition-all rounded-full inline-flex items-center gap-2 shadow-lg"
        >
          <span>Schedule Private Consultation</span>
          <ArrowUpRightIcon size={14} />
        </button>
      </section>

      <Footer />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        preselectedResidence="Heritage Consultation — South Goa"
      />
    </main>
  );
}
