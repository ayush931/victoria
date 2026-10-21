"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import EditorialScrollScene from "@/components/sections/EditorialScrollScene";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import PageHero from "@/components/layout/PageHero";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const VILLAS = [
  {
    slug: "/residences/natures-cove",
    title: "Nature's Cove — Villa A",
    location: "Curtorim Lakefront, South Goa",
    status: "Under Construction • Q4 2026",
    price: "Price on Private Request",
    beds: "4 BHK",
    plot: "4,400 Sq.Ft",
    builtUp: "480 Sq.M",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
    tag: "FLAGSHIP LAUNCH",
  },
  {
    slug: "/residences/natures-cove",
    title: "Nature's Cove — Villa B",
    location: "Curtorim Village, South Goa",
    status: "Under Construction • Q4 2026",
    price: "Price on Private Request",
    beds: "4 BHK",
    plot: "3,800 Sq.Ft",
    builtUp: "420 Sq.M",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    tag: "ROW VILLA",
  },
  {
    slug: "/residences/quinta-da-rosa",
    title: "Quinta Da Rosa Manor",
    location: "Salcete Heritage Belt, South Goa",
    status: "Private Bespoke Handover",
    price: "Price on Private Request",
    beds: "5 BHK",
    plot: "6,200 Sq.Ft",
    builtUp: "650 Sq.M",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    tag: "HERITAGE MANOR",
  },
  {
    slug: "/residences/natures-cove",
    title: "Villa Miramar",
    location: "Assagao Palm Ridge, North Goa",
    status: "Completed • Fully Commissioned",
    price: "Price on Private Request",
    beds: "4 BHK",
    plot: "5,100 Sq.Ft",
    builtUp: "540 Sq.M",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
    tag: "WATERFRONT ESTATE",
  },
];

export default function VillasPage() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  return (
    <main id="main-content" className="relative w-full min-h-screen vx-site-page">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header with Expansive Whitespace */}
      <PageHero
        index="01"
        eyebrow="Atelier Portfolio • Goan Estates"
        title={<>Luxury Villas <em className="text-[var(--accent-text)]">of Goa</em></>}
        description="Bespoke low-density row villas and independent manor estates in Curtorim and Assagao. Crafted for generational Susegad living with private Sukabumi plunge pools, hand-cut red laterite, and soaring teak eaves."
        meta={["Curtorim Lakefront", "Assagao Ridge", "4–5 BHK Estates", "Goa RERA Approved"]}
      />

      <EditorialScrollScene
        variant="fan"
        label="Room for a different everyday"
        title="Open the door."
        emphasis="Let life unfold."
        description="From garden mornings to evenings on the veranda, consider the spaces that make a villa feel like your own."
        word="room to live."
      />

      {/* Portfolio Grid with Generous Spacing */}
      <section className="w-full py-28 md:py-36 site-wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
          {VILLAS.map((villa) => (
            <Link
              key={villa.title}
              href={villa.slug}
              className="group flex flex-col justify-between"
              data-cursor="VIEW"
            >
              <div className="portfolio-image relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-sm bg-[var(--forest-deep)] mb-6">
                <img
                  src={villa.image}
                  alt={villa.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="vx-media-badge">{villa.tag}</div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between border-b border-[var(--ink)]/15 pb-4">
                  <div>
                    <h3 className="text-2xl font-serif text-[var(--ink)] group-hover:text-[var(--accent-text)] transition-colors">
                      {villa.title}
                    </h3>
                    <p className="text-xs font-sans text-[var(--ink-soft)] mt-0.5">
                      {villa.location} • {villa.beds}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--accent-text)]">
                    {villa.builtUp}
                  </span>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-sans text-[var(--ink-soft)] pt-1">
                  <span>{villa.status}</span>
                  <span className="text-[var(--ink)] font-medium flex items-center gap-1 group-hover:text-[var(--accent-text)]">
                    <span>Inspect Residence</span>
                    <ArrowUpRightIcon size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        preselectedResidence="Luxury Villas Portfolio"
      />
    </main>
  );
}
