"use client";

import React, { useState, useEffect } from "react";

const VOICES = [
  {
    quote:
      "The silence of Curtorim is unlike anywhere else in the world. Victorino built not merely a villa, but a restorative sanctuary our family returns to from London every winter.",
    author: "Dr. Alistair & Rhea Fernandes",
    origin: "Kensington, London & Curtorim",
    residence: "Nature's Cove — Villa 03",
  },
  {
    quote:
      "Their honesty in hand-dressed laterite masonry and reclaimed Burma teak joinery equals the finest restored estates of Tuscany or Provence. Absolute discretion throughout.",
    author: "Vikramaditya & Gayatri Singhania",
    origin: "Dubai & South Goa",
    residence: "Quinta Da Rosa Manor",
  },
  {
    quote:
      "Nature’s Cove is an architectural heirloom. The reflection of Curtorim’s morning mist across our travertine pool justifies every single expectation of quiet luxury.",
    author: "Ronald & Anita D'Souza",
    origin: "Singapore & Margao",
    residence: "Nature's Cove — Villa 08",
  },
];

export default function PatronsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % VOICES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const active = VOICES[activeIdx];

  return (
    <section className="relative w-full py-36 md:py-48 bg-[#0C1A14] text-[#FAF8F5] border-b border-[#FAF8F5]/10 overflow-hidden flex flex-col justify-between">
      {/* Subtle background ambient ring */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,155,68,0.06)_0%,transparent_75%)] pointer-events-none" />

      <div className="w-full px-6 md:px-12 max-w-[1400px] mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#D49B44] block mb-6 font-semibold">
          PATRON VOICES • QUIET GOAN REPUTATION
        </span>

        {/* Headline with Generous Spacing */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#FAF8F5] max-w-4xl mx-auto leading-tight mb-20 md:mb-24">
          The World’s Most Discerning Patrons <br />
          <span className="font-serif italic text-[#D49B44]">
            Build Their Susegad Legacy In Goa
          </span>
        </h2>

        {/* Central Quote Carousel */}
        <div className="max-w-3xl mx-auto min-h-[220px] flex flex-col justify-center transition-all duration-700">
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#FAF8F5]/90 font-light italic leading-relaxed mb-8">
            &ldquo;{active.quote}&rdquo;
          </p>

          <div className="flex flex-col items-center">
            <span className="text-sm font-sans font-medium text-[#FAF8F5] tracking-wide">
              {active.author}
            </span>
            <span className="text-xs font-sans text-[#C5A880] mt-0.5">
              {active.origin}
            </span>
            <span className="text-[11px] font-mono text-[#FAF8F5]/40 mt-1 uppercase">
              {active.residence}
            </span>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {VOICES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                idx === activeIdx
                  ? "w-8 bg-[#C5A880]"
                  : "w-2 bg-[#FAF8F5]/20 hover:bg-[#FAF8F5]/40"
              }`}
              aria-label={`Show quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
