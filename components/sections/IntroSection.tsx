"use client";

import React from "react";
import { Reveal, FadeUp, Eyebrow } from "@/components/effects/TextReveal";
import ParallaxImage from "@/components/effects/ParallaxImage";

export default function IntroSection() {
  return (
    <section id="introduction" className="w-full py-28 md:py-44 bg-[#FAF8F5] text-[#121210] border-b border-[#121210]/10 overflow-hidden">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        <div className="text-center max-w-5xl mx-auto mb-16 md:mb-24">
          <div className="flex justify-center">
            <Eyebrow>Atelier ethos • The soul of Goan architecture</Eyebrow>
          </div>
          <Reveal
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[0.95] mb-6"
            lines={[
              <>The Art of Susegad &amp;</>,
              <span key="it" className="italic font-normal text-[#D49B44]">Vernacular Restraint</span>,
            ]}
          />
          <FadeUp delay={0.15}>
            <p className="text-sm sm:text-base font-serif italic text-[#7A756B] max-w-2xl mx-auto leading-relaxed">
              &ldquo;We do not merely build in Goa; we listen to its monsoons, its red earth, and the timeless whisper of the Arabian Sea.&rdquo;
            </p>
          </FadeUp>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-10 lg:gap-28 max-w-5xl mx-auto mb-20 md:mb-28 text-xs sm:text-sm font-sans leading-relaxed text-[#7A756B] font-light">
          <FadeUp className="w-full md:w-1/2">
            <span className="text-[10px] font-mono tracking-widest text-[#B84A39] uppercase block mb-3 font-semibold">
              01 / Site-specific laterite &amp; waterways
            </span>
            <p>
              Hand-dressed red laterite stone quarried within 12 kilometers of our sites, calibrated for passive thermal damping.
              Deep subterranean aquifer recharge systems and cross-ventilated gallery corridors engineered around Curtorim’s ancient lake systems
              keep interiors naturally cool without relentless mechanical air conditioning.
            </p>
          </FadeUp>
          <FadeUp delay={0.12} className="w-full md:w-1/2">
            <span className="text-[10px] font-mono tracking-widest text-[#B84A39] uppercase block mb-3 font-semibold">
              02 / The ancestral balcão &amp; carepas
            </span>
            <p>
              Reinterpreting the iconic Portuguese-Goan balcão veranda with built-in stone benches (sofa de pedra),
              five-meter double-height Burma teak ceilings, and translucent oyster shell window lattices (carepas)
              that diffuse bright tropical sunshine into a soothing pearlescent golden glow.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop"
          alt="Curtorim Lakefront Sanctuary — Victorino Luxury Homes Goa"
          cursor="LAKE PAVILION"
        />
        <div className="mt-4 flex items-center justify-between text-[10px] font-sans tracking-[0.22em] uppercase text-[#7A756B]">
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49B44]" />
            The Lake Pavilion at Curtorim • 15.2894° N, 74.0247° E
          </span>
          <span className="hidden sm:inline font-mono">Fig. 01 — Water &amp; Laterite</span>
        </div>
      </div>
    </section>
  );
}
