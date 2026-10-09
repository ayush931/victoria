"use client";

import React from "react";

export default function IntroSection() {
  return (
    <section id="introduction" className="w-full pt-28 md:pt-40 bg-[#F7F5F0] text-[#121210]">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Kononenko-inspired Centered Oversized Headline */}
        <div className="text-center max-w-5xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#B38F5B] block mb-4 font-medium">
            ATELIER PHILOSOPHY • SOUTH GOA
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-[#121210] leading-[0.95]">
            Systematic Clarity &amp; <br />
            <span className="font-serif italic font-normal text-[#B38F5B]">
              Bespoke Craftsmanship
            </span>
          </h2>
        </div>

        {/* Two Balanced Dual Story Columns */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 lg:gap-36 max-w-4xl mx-auto mb-24 text-xs sm:text-sm font-sans leading-relaxed text-[#7E796E]">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-mono tracking-widest text-[#121210] uppercase block mb-2 font-semibold">
              01 / SITE-SPECIFIC MATERIAL LOGIC
            </span>
            <p>
              Hand-dressed red laterite stone from local quarries, passive microclimate orientation,
              deep rainwater aquifer recharge, and natural cross-ventilation engineered around Curtorim’s ancient lakes.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-mono tracking-widest text-[#121210] uppercase block mb-2 font-semibold">
              02 / TIMELESS VERNACULAR FORM
            </span>
            <p>
              Reinterpreting the ancestral Portuguese-Goan balcão, soaring 5-meter teakwood ceilings,
              honed Italian travertine bathrooms, and seamless indoor-outdoor water pavilions designed for lifelong serenity.
            </p>
          </div>
        </div>
      </div>

      {/* Full-Bleed Architectural Wide Image Break (Kononenko .jss) */}
      <div className="w-full h-[400px] sm:h-[580px] md:h-[720px] overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2400&auto=format&fit=crop"
          alt="Architectural Craftsmanship of Victorino Luxury Homes"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02] hover:scale-105 transition-transform duration-[4000ms] ease-out"
        />
        <div className="absolute bottom-6 left-6 md:left-12 bg-[#08130F]/80 backdrop-blur-md px-4 py-2 text-[10px] font-sans tracking-[0.2em] uppercase text-[#FAF8F5] rounded-sm border border-[#FAF8F5]/10">
          The Pavilion at Curtorim • 15.2894° N, 74.0247° E
        </div>
      </div>
    </section>
  );
}
