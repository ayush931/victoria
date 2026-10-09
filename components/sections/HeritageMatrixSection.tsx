"use client";

import React from "react";

export default function HeritageMatrixSection() {
  return (
    <section className="w-full py-36 md:py-48 bg-[#FAF8F5] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Top Split: Atelier Info vs Master Statement with Generous Spacing */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-28 pb-24 border-b border-[#121210]/10">
          {/* Left Column: Metadata */}
          <div className="w-full lg:w-4/12 flex flex-col gap-8 text-xs font-sans">
            <div className="flex flex-col gap-1 border-b border-[#121210]/10 pb-5">
              <span className="font-serif text-sm text-[#B84A39]">Founded</span>
              <p className="text-sm font-medium text-[#121210]">2014 in Margao, South Goa</p>
            </div>
            <div className="flex flex-col gap-1 border-b border-[#121210]/10 pb-5">
              <span className="font-serif text-sm text-[#B84A39]">Founding Vision</span>
              <p className="text-sm font-medium text-[#121210]">Victorino Family Atelier • Goan Vernacular</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-sm text-[#B84A39]">Bespoke Disciplines</span>
              <p className="text-xs text-[#7A756B] leading-relaxed font-light">
                From architectural conception to turnkey handover — including hand-dressed laterite masonry,
                veranda balcãos, oyster shell carepas fenestration, plunge pool engineering, and private estate concierge.
              </p>
            </div>
          </div>

          {/* Right Column: Master Statement */}
          <div className="w-full lg:w-8/12">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#121210] leading-snug font-light">
              An architectural real estate atelier born in Goa.
              We build with an intimate reverence for South Goan village context, tropical climate,
              and 450 years of Indo-Portuguese design — shaping sanctuaries that feel effortless, restorative, and distinctly refined.
              From lakefront row villas in Curtorim to private boutique estates in Assagao, each residence is conceived as an heirloom.
            </p>
          </div>
        </div>

        {/* Bottom Multi-Column Grid: Achievements, Honors, Publications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pt-20">
          {/* Achievements */}
          <div>
            <h3 className="font-serif text-lg text-[#B84A39] mb-6 flex items-center gap-2">
              <span>Achievements</span>
              <span className="text-[10px] font-sans tracking-widest text-[#121210]/40 uppercase">
                (2014–2026)
              </span>
            </h3>
            <div className="flex flex-col gap-6 text-xs font-sans">
              <div>
                <p className="font-medium text-[#121210] text-sm">10+ Years Dedicated to South Goa</p>
                <p className="text-[#7E796E]">Exclusively crafting in Curtorim, Margao, and Verna</p>
              </div>
              <div>
                <p className="font-medium text-[#121210] text-sm">13 Flagship Row Villas</p>
                <p className="text-[#7E796E]">Nature&apos;s Cove, Curtorim (Low-density lakefront enclave)</p>
              </div>
              <div>
                <p className="font-medium text-[#121210] text-sm">Over 45+ Master Artisans</p>
                <p className="text-[#7E796E]">Generational stone dressers, timber carpenters, and landscape curators</p>
              </div>
            </div>
          </div>

          {/* Honors & Accolades */}
          <div>
            <h3 className="font-serif text-lg text-[#B84A39] mb-6 flex items-center gap-2">
              <span>Honors &amp; Accolades</span>
              <span className="text-[10px] font-sans tracking-widest text-[#121210]/40 uppercase">
                (RECOGNITION)
              </span>
            </h3>
            <div className="flex flex-col gap-6 text-xs font-sans">
              <div>
                <p className="font-medium text-[#121210] text-sm">Goa Heritage Architecture Citation</p>
                <p className="text-[#7E796E]">Excellence in Portuguese-Goan Vernacular Adaptation</p>
              </div>
              <div>
                <p className="font-medium text-[#121210] text-sm">Sustainable Coastal Living Award 2025</p>
                <p className="text-[#7E796E]">Passive microclimate design &amp; zero-deforestation layout</p>
              </div>
              <div>
                <p className="font-medium text-[#121210] text-sm">Luxury Residential Bureau of the Year</p>
                <p className="text-[#7E796E]">Recognized for impeccable second-home handover standards</p>
              </div>
            </div>
          </div>

          {/* Publications */}
          <div>
            <h3 className="font-serif text-lg text-[#B84A39] mb-6 flex items-center gap-2">
              <span>Publications</span>
              <span className="text-[10px] font-sans tracking-widest text-[#121210]/40 uppercase">
                (PRESS)
              </span>
            </h3>
            <div className="flex flex-col gap-6 text-xs font-sans">
              <div>
                <p className="font-medium text-[#121210] text-sm">Architectural Digest India</p>
                <p className="text-[#7E796E]">Cover Feature: &quot;The New Vernacular in Curtorim&quot;</p>
              </div>
              <div>
                <p className="font-medium text-[#121210] text-sm">Elle Décor Living</p>
                <p className="text-[#7E796E]">Special Issue: Tropical Modernism &amp; Laterite Stone</p>
              </div>
              <div>
                <p className="font-medium text-[#121210] text-sm">Robb Report &amp; Financial Times</p>
                <p className="text-[#7E796E]">Why Global NRIs Seek Sanctuary in South Goa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
