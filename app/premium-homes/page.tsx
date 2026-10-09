"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const HOMES = [
  {
    slug: "/residences/casa-do-sol",
    title: "Casa Do Sol",
    location: "Verna Hills Ridge, South Goa",
    status: "Ready for Handover",
    price: "Price on Private Request",
    beds: "3 BHK + Study",
    plot: "3,200 Sq.Ft",
    builtUp: "380 Sq.M",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop",
    tag: "HILLSIDE BOUTIQUE",
  },
  {
    slug: "/residences/casa-do-sol",
    title: "Aldeia Curtorim",
    location: "Curtorim Village Edge, South Goa",
    status: "Under Construction • Q1 2027",
    price: "Price on Private Request",
    beds: "3 BHK",
    plot: "2,800 Sq.Ft",
    builtUp: "340 Sq.M",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1200&auto=format&fit=crop",
    tag: "GARDEN ENCLAVE",
  },
  {
    slug: "/residences/casa-do-sol",
    title: "Verde Terraces",
    location: "Verna Plateau Enclave",
    status: "New Architectural Release",
    price: "Price on Private Request",
    beds: "3 BHK Penthouse Residence",
    plot: "Private Rooftop Solarium",
    builtUp: "310 Sq.M",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    tag: "SOLARIUM SUITE",
  },
];

export default function PremiumHomesPage() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-[#F7F5F0] text-[#121210]">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header */}
      <section className="w-full pt-40 pb-20 px-6 md:px-12 max-w-[1720px] mx-auto border-b border-[#121210]/10">
        <div className="max-w-4xl">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#B38F5B] block mb-3 font-medium">
            ATELIER PORTFOLIO • TYPOLOGY 02
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#121210] font-light leading-tight mb-6">
            Premium Homes of South Goa
          </h1>
          <p className="text-sm sm:text-base font-sans text-[#7E796E] leading-relaxed max-w-2xl">
            Boutique low-density residences in Verna and Curtorim engineered for lock-and-leave ease.
            Ideal for international NRIs and second-home patrons who require flawless security,
            zero-maintenance estate management, and tranquil Goan village serenity.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="w-full py-20 px-6 md:px-12 max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {HOMES.map((home) => (
            <Link
              key={home.title}
              href={home.slug}
              className="group flex flex-col justify-between"
              data-cursor="VIEW"
            >
              <div className="relative w-full h-[360px] sm:h-[440px] overflow-hidden rounded-sm bg-[#08130F] mb-6">
                <img
                  src={home.image}
                  alt={home.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#08130F]/80 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
                  {home.tag}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="border-b border-[#121210]/15 pb-4">
                  <h3 className="text-xl font-serif text-[#121210] group-hover:text-[#B38F5B] transition-colors">
                    {home.title}
                  </h3>
                  <p className="text-xs font-sans text-[#7E796E] mt-0.5">
                    {home.location} • {home.beds}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs font-sans text-[#7E796E]">
                  <span>{home.builtUp}</span>
                  <span className="text-[#121210] font-medium flex items-center gap-1 group-hover:text-[#B38F5B]">
                    <span>Inspect</span>
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
        preselectedResidence="Premium Homes Portfolio"
      />
    </main>
  );
}
