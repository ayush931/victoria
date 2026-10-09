"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
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
    <main className="relative w-full min-h-screen bg-[#FAF8F5] text-[#121210]">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header with Expansive Whitespace */}
      <PageHero
        index="01"
        eyebrow="Atelier Portfolio • Goan Estates"
        title={<>Luxury Villas <em className="text-[#B84A39]">of Goa</em></>}
        description="Bespoke low-density row villas and independent manor estates in Curtorim and Assagao. Crafted for generational Susegad living with private Sukabumi plunge pools, hand-cut red laterite, and soaring teak eaves."
        meta={["Curtorim Lakefront", "Assagao Ridge", "4–5 BHK Estates", "Goa RERA Approved"]}
      />

      {/* Portfolio Grid with Generous Spacing */}
      <section className="w-full py-28 md:py-36 px-6 md:px-12 max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
          {VILLAS.map((villa) => (
            <Link
              key={villa.title}
              href={villa.slug}
              className="group flex flex-col justify-between"
              data-cursor="VIEW"
            >
              <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-sm bg-[#08130F] mb-6">
                <img
                  src={villa.image}
                  alt={villa.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-5 left-5 bg-[#08130F]/80 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
                  {villa.tag}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between border-b border-[#121210]/15 pb-4">
                  <div>
                    <h3 className="text-2xl font-serif text-[#121210] group-hover:text-[#B84A39] transition-colors">
                      {villa.title}
                    </h3>
                    <p className="text-xs font-sans text-[#7E796E] mt-0.5">
                      {villa.location} • {villa.beds}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#B84A39]">
                    {villa.builtUp}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-sans text-[#7E796E] pt-1">
                  <span>{villa.status}</span>
                  <span className="text-[#121210] font-medium flex items-center gap-1 group-hover:text-[#B84A39]">
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
