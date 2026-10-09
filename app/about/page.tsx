"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import ArchitecturalCompass from "@/components/effects/ArchitecturalCompass";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

export default function AboutPage() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-[#F7F5F0] text-[#121210]">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header */}
      <section className="w-full pt-40 pb-24 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="max-w-4xl">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#B38F5B] block mb-3 font-medium">
            ATELIER HERITAGE • 2014–2026
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#121210] font-light leading-[0.95] mb-8">
            Architects of dreams, <br />
            <span className="font-serif italic text-[#B38F5B]">designers of reality.</span>
          </h1>
          <p className="text-base sm:text-lg font-serif italic text-[#121210]/80 leading-relaxed max-w-2xl">
            &ldquo;Homes conceived as heirlooms. Built once, cherished for generations.&rdquo;
          </p>
        </div>
      </section>

      {/* The 10-Year Narrative */}
      <section className="w-full py-24 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B38F5B] block mb-2 font-semibold">
              THE SOUTH GOA MEMOIR
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#121210] mb-6">
              A Decade of Quiet Restraint in Curtorim &amp; Margao
            </h2>
            <div className="flex flex-col gap-4 text-xs font-mono text-[#7E796E]">
              <span>ESTABLISHED: 2014</span>
              <span>PRINCIPAL GEOGRAPHY: SALCETE TALUKA, SOUTH GOA</span>
              <span>SPECIALTY: BESPOKE ROW VILLAS &amp; BOUTIQUE ESTATES</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base font-sans text-[#7E796E] leading-relaxed">
            <p>
              When Victorino Luxury Homes was founded in Margao over a decade ago,
              Goa was undergoing rapid, often noisy commercialization. We made an intentional,
              non-negotiable vow: we would build exclusively in the quiet sanctuary of South Goa,
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
              laying cross-cut Italian travertine, and hand-dressing each stone block.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Architectural Pillars */}
      <section className="w-full py-24 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="mb-16">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#B38F5B] block mb-2 font-medium">
            FOUNDATIONAL TENETS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#121210] font-light">
            The Four Pillars of Our Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 bg-white border border-[#121210]/10 rounded-sm">
            <span className="font-mono text-xs text-[#B38F5B] block mb-4">PILLAR 01</span>
            <h3 className="font-serif text-xl text-[#121210] mb-3">Vernacular Restraint</h3>
            <p className="text-xs font-sans text-[#7E796E] leading-relaxed">
              We revive ancestral Portuguese-Goan architectural devices — the balcão porch, high timber rafters,
              and internal courtyards — adapting them for contemporary life.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#121210]/10 rounded-sm">
            <span className="font-mono text-xs text-[#B38F5B] block mb-4">PILLAR 02</span>
            <h3 className="font-serif text-xl text-[#121210] mb-3">Low-Density Landbanks</h3>
            <p className="text-xs font-sans text-[#7E796E] leading-relaxed">
              We strictly reject high-density development. Every project preserves natural topography,
              100-year-old fruit trees, and expansive negative space.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#121210]/10 rounded-sm">
            <span className="font-mono text-xs text-[#B38F5B] block mb-4">PILLAR 03</span>
            <h3 className="font-serif text-xl text-[#121210] mb-3">Generational Materials</h3>
            <p className="text-xs font-sans text-[#7E796E] leading-relaxed">
              Natural Goan laterite stone, honed Italian travertine, and seasoned reclaimed Burma teak.
              Surfaces that develop magnificent patina instead of wearing down.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#121210]/10 rounded-sm">
            <span className="font-mono text-xs text-[#B38F5B] block mb-4">PILLAR 04</span>
            <h3 className="font-serif text-xl text-[#121210] mb-3">HNI Concierge Stewardship</h3>
            <p className="text-xs font-sans text-[#7E796E] leading-relaxed">
              Full turn-key property stewardship for global NRIs and second-home owners.
              Landscape care, security, and private chef coordination when you return.
            </p>
          </div>
        </div>
      </section>

      {/* Kononenko Circular Radial Gauge for Passive Climatic Logic */}
      <ArchitecturalCompass />

      {/* Call to Action */}
      <section className="w-full py-24 text-center px-6">
        <h2 className="text-3xl sm:text-5xl font-serif text-[#121210] mb-6">
          Meet Our Architects in Margao
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#7E796E] max-w-md mx-auto mb-8">
          Arrange a private discussion at our design studio or a walkthrough of our Curtorim lakefront parcels.
        </p>
        <button
          type="button"
          onClick={() => setIsConciergeOpen(true)}
          className="px-8 py-3.5 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-[#B38F5B] hover:text-[#08130F] transition-all rounded-sm inline-flex items-center gap-2"
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
