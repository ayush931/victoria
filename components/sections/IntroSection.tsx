"use client";

import React from "react";

export default function IntroSection() {
  return (
    <section id="introduction" className="w-full py-36 md:py-48 bg-[#FAF8F5] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Centered Oversized Headline with Expansive Whitespace */}
        <div className="text-center max-w-5xl mx-auto mb-20 md:mb-32">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#B84A39] block mb-5 font-semibold">
            ATELIER ETHOS • THE SOUL OF GOAN ARCHITECTURE
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-[#121210] leading-[0.95] mb-6">
            The Art of Susegad &amp; <br />
            <span className="font-serif italic font-normal text-[#D49B44]">
              Vernacular Restraint
            </span>
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#7A756B] max-w-2xl mx-auto leading-relaxed">
            &ldquo;We do not merely build in Goa; we listen to its monsoons, its red earth, and the timeless whisper of the Arabian Sea.&rdquo;
          </p>
        </div>

        {/* Two Balanced Dual Story Columns with Wide Gutters */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 lg:gap-36 max-w-5xl mx-auto mb-28 text-xs sm:text-sm font-sans leading-relaxed text-[#7A756B] font-light">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-mono tracking-widest text-[#B84A39] uppercase block mb-3 font-semibold">
              01 / SITE-SPECIFIC LATERITE &amp; WATERWAYS
            </span>
            <p>
              Hand-dressed red laterite stone quarried within 12 kilometers of our sites, calibrated for passive thermal damping.
              Deep subterranean aquifer recharge systems and cross-ventilated gallery corridors engineered around Curtorim’s ancient lake systems
              keep interiors naturally cool without relentless mechanical air conditioning.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-mono tracking-widest text-[#B84A39] uppercase block mb-3 font-semibold">
              02 / THE ANCESTRAL BALCÃO &amp; CAREPAS
            </span>
            <p>
              Reinterpreting the iconic Portuguese-Goan balcão veranda with built-in stone benches (sofa de pedra),
              five-meter double-height Burma teak ceilings, and translucent oyster shell window lattices (carepas)
              that diffuse bright tropical sunshine into a soothing pearlescent golden glow.
            </p>
          </div>
        </div>
      </div>

      {/* Full-Bleed Architectural Wide Visual Break with Generous Framing */}
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        <div className="w-full h-[440px] sm:h-[600px] md:h-[740px] overflow-hidden rounded-sm relative bg-[#0C1A14]">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2400&auto=format&fit=crop"
            alt="Curtorim Lakefront Sanctuary — Victorino Luxury Homes Goa"
            className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.03] hover:scale-105 transition-transform duration-[4000ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:left-10 bg-[#0C1A14]/85 backdrop-blur-md px-5 py-2.5 text-[10px] font-sans tracking-[0.22em] uppercase text-[#FAF8F5] rounded-sm border border-[#FAF8F5]/10 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49B44]" />
            <span>The Lake Pavilion at Curtorim • 15.2894° N, 74.0247° E</span>
          </div>
        </div>
      </div>
    </section>
  );
}
