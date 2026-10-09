"use client";

import React from "react";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const LOCATIONS = [
  {
    role: "Head Flagship Atelier",
    city: "South Goa, Curtorim",
    address: "Nature's Cove Enclave, Curtorim Lakefront",
    coords: "15.2894° N, 74.0247° E",
  },
  {
    role: "Architecture & Design Studio",
    city: "South Goa, Margao",
    address: "Quinta Heritage Suite, Near Holy Spirit Church",
    coords: "15.2736° N, 73.9582° E",
  },
  {
    role: "Engineering & Operations HQ",
    city: "South Goa, Verna",
    address: "Victorino Projects Tower, Phase II, Verna",
    coords: "15.3622° N, 73.9318° E",
  },
  {
    role: "Private Airport Concierge Desk",
    city: "Goa Dabolim / Mopa",
    address: "VIP Arrivals Lounge & Private Chauffeur Fleet",
    coords: "Available on 24h Prior Notice",
  },
];

export default function OfficesSection() {
  return (
    <section className="w-full py-28 md:py-36 bg-[#F7F5F0] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Kononenko-inspired Indented Headline */}
        <div className="mb-20">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#B38F5B] block mb-3 font-medium">
            GEOGRAPHIC PRESENCE • ATELIERS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#121210] font-light max-w-4xl arch-indent leading-[1.05]">
            Curtorim atelier, Margao design studio, Verna engineering office.
          </h2>
        </div>

        {/* Directory Row List (Kononenko .jke .rsp style) */}
        <div className="flex flex-col border-t border-[#121210]/15">
          {LOCATIONS.map((loc, idx) => (
            <div
              key={loc.role}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 px-4 sm:px-6 border-b border-[#121210]/15 transition-all duration-500 hover:bg-[#08130F] hover:text-[#FAF8F5] cursor-pointer"
              data-cursor="VISIT"
            >
              {/* Col 1: Number & Role */}
              <div className="flex items-center gap-4 sm:w-4/12">
                <span className="text-xs font-mono text-[#B38F5B]">
                  0{idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-serif group-hover:text-[#FAF8F5] transition-colors">
                  {loc.role}
                </h3>
              </div>

              {/* Col 2: Region / City */}
              <div className="sm:w-3/12 text-xs font-sans text-[#7E796E] group-hover:text-[#C5A880] transition-colors">
                {loc.city}
              </div>

              {/* Col 3: Address & Coords */}
              <div className="sm:w-4/12 text-xs font-sans text-[#7E796E] group-hover:text-[#FAF8F5]/80 transition-colors">
                <p>{loc.address}</p>
                <p className="text-[10px] font-mono text-[#121210]/40 group-hover:text-[#FAF8F5]/40 mt-0.5">
                  {loc.coords}
                </p>
              </div>

              {/* Col 4: Arrow Icon */}
              <div className="sm:w-1/12 flex justify-end">
                <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center text-current transition-all duration-300 group-hover:border-[#B38F5B] group-hover:text-[#B38F5B] group-hover:scale-110">
                  <ArrowUpRightIcon size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
