"use client";

import React, { useState } from "react";

const PRINCIPLES = [
  {
    num: "01",
    tag: "AERATION",
    title: "Curtorim Lake Microclimate",
    desc: "Positioned along the natural wind funnel between Curtorim’s ancient water bodies and the Arabian Sea, drawing constant passive cooling.",
    angle: 0,
  },
  {
    num: "02",
    tag: "SOLAR ORIENTATION",
    title: "15.28° N Solar Path Optimization",
    desc: "Deep timber overhangs shield glazing during zenith noon while welcoming soft morning luminescence into living atriums.",
    angle: 45,
  },
  {
    num: "03",
    tag: "PRECIPITATION",
    title: "Monsoon Infiltration & Harvesting",
    desc: "Steep Mangalore clay roof slopes celebrate tropical downpours, channeling rainwater into concealed subterranean aquifer recharge pits.",
    angle: 90,
  },
  {
    num: "04",
    tag: "VERNACULAR",
    title: "Ancestral Balcão Thresholds",
    desc: "Reinterpreting the traditional Goan porch as a contemporary transitional sanctuary between community intimacy and private quietude.",
    angle: 135,
  },
  {
    num: "05",
    tag: "LITHIC MASS",
    title: "Laterite Stone Thermal Damping",
    desc: "Locally quarried Goan laterite absorbs intense diurnal heat, radiating gentle warmth into evening courtyards as temperatures dip.",
    angle: 180,
  },
  {
    num: "06",
    tag: "ACOUSTICS",
    title: "Vaulted Reclaimed Teak Volumes",
    desc: "Soaring 5.2-meter timber trusses deaden tropical rain acoustic spikes, producing cathedral-like quiet within master suites.",
    angle: 225,
  },
  {
    num: "07",
    tag: "HYDROLOGY",
    title: "Sal River Cross-Circulation",
    desc: "Strategically aligned floor-to-ceiling louvers capture afternoon river valley breezes, reducing air conditioning load by 68%.",
    angle: 270,
  },
  {
    num: "08",
    tag: "ECOLOGY",
    title: "Preserved Ancient Canopy",
    desc: "Every villa at Nature's Cove was laid out around century-old banyan, mango, and coconut palms, eliminating deforestation.",
    angle: 315,
  },
];

export default function ArchitecturalCompass() {
  const [activeIdx, setActiveIdx] = useState(0);

  const active = PRINCIPLES[activeIdx];

  return (
    <section id="climate-principles" className="vx-dark relative w-full min-h-[90vh] lg:min-h-screen py-36 md:py-48 bg-[var(--forest)] text-[var(--on-dark)] overflow-hidden flex flex-col justify-between border-b border-[var(--on-dark)]/10">
      {/* Subtle background radial glow */}
      <div className="compass-glow absolute inset-0 pointer-events-none" />

      {/* Top Header */}
      <div className="w-full site-wrap z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-[var(--on-dark)]/10">
          <div>
            <span className="text-[0.625rem] md:text-xs font-sans uppercase tracking-[0.32em] text-[var(--signal)] block mb-4 font-semibold">
              PASSIVE LOGIC • SUSEGAD CLIMATE AXIOMS
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-[var(--on-dark)] leading-[1.02]">
              Vernacular Clarity &amp; Ecology
            </h2>
          </div>
          <p className="text-xs md:text-sm font-sans text-[var(--on-dark)]/70 max-w-lg leading-relaxed font-light">
            Indo-Portuguese vernacular intelligence codified into eight passive climate axioms.
            Select a node or use the index to see how our residences work with the natural rhythm of Goa.
          </p>
        </div>
      </div>

      {/* Main Center Gauge Display */}
      <div className="relative site-wrap py-12 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        {/* Left: Active Principle Details */}
        <div id="compass-detail" aria-live="polite" className="w-full lg:w-5/12 text-left order-2 lg:order-1 transition-all duration-500">
          <div className="compass-chip inline-flex items-center gap-3 px-3 py-1.5 rounded-full mb-6">
            <span className="text-[0.6875rem] font-mono tracking-widest text-[var(--signal)]">
              AXIOM {active.num}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--signal)]" />
            <span className="text-[0.625rem] font-sans tracking-[0.18em] uppercase text-[var(--on-dark)]/80">
              {active.tag}
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif text-[var(--on-dark)] mb-4 leading-tight">
            {active.title}
          </h3>

          <p className="text-sm sm:text-base font-sans text-[var(--on-dark)]/70 leading-relaxed max-w-lg mb-8">
            {active.desc}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[var(--on-dark)]/10 text-xs font-sans text-[var(--on-dark)]/60">
            <div>
              <span className="block text-[var(--signal)] tracking-wider uppercase text-[0.625rem] mb-1">
                LOCATION COORD
              </span>
              <span>15.2894° N, 74.0247° E</span>
            </div>
            <div>
              <span className="block text-[var(--signal)] tracking-wider uppercase text-[0.625rem] mb-1">
                VILLAGE SANCTUARY
              </span>
              <span>Curtorim, South Goa</span>
            </div>
          </div>
        </div>

        {/* Right: The Kononenko-inspired Circular Dial Gauge */}
        <div className="w-full lg:w-6/12 flex items-center justify-center order-1 lg:order-2">
          <div className="compass-dial">
            {/* Rotating Outer Dial Rings */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none animate-spin-slower"
              viewBox="0 0 600 600"
            >
              <circle
                cx="300"
                cy="300"
                r="285"
                fill="none"
                strokeWidth="1"
                className="compass-rule"
              />
              <circle
                cx="300"
                cy="300"
                r="240"
                fill="none"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="compass-rule--signal"
              />
              <circle
                cx="300"
                cy="300"
                r="180"
                fill="none"
                strokeWidth="1"
                className="compass-rule"
              />
              {/* Radial crosshairs */}
              <line
                x1="300"
                y1="15"
                x2="300"
                y2="585"
                strokeWidth="0.8"
                className="compass-rule"
              />
              <line
                x1="15"
                y1="300"
                x2="585"
                y2="300"
                strokeWidth="0.8"
                className="compass-rule"
              />
            </svg>

            {/* Static Center Core */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[0.625rem] font-mono tracking-[0.3em] uppercase text-[var(--signal)] mb-1">
                VICTORINO
              </span>
              <span className="text-xl sm:text-2xl font-serif text-[var(--on-dark)]">
                {active.num} / 08
              </span>
              <span className="text-[0.625rem] font-sans tracking-widest text-[var(--on-dark)]/50 mt-1 uppercase">
                Curtorim Vernacular
              </span>
            </div>

            {/* 8 Interactive Nodes along circumference */}
            {PRINCIPLES.map((item, idx) => {
              const radius = 240; // match middle ring in 600x600 viewBox
              const rad = (item.angle - 90) * (Math.PI / 180);
              // Percentage position from center (50% + cos/sin)
              const pctX = 50 + (radius / 300) * 50 * Math.cos(rad);
              const pctY = 50 + (radius / 300) * 50 * Math.sin(rad);

              const isSelected = idx === activeIdx;

              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  aria-pressed={isSelected}
                  aria-controls="compass-detail"
                  className={`compass-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${
                    isSelected
                      ? "w-11 h-11 bg-[var(--signal)] text-[var(--forest-deep)] scale-110 font-semibold"
                      : "w-8 h-8 bg-[var(--forest-deep)] border border-[var(--on-dark)]/20 text-[var(--on-dark)]/70 hover:border-[var(--signal)] hover:text-[var(--signal)]"
                  }`}
                  style={{
                    left: `${pctX}%`,
                    top: `${pctY}%`,
                  }}
                  data-cursor="AXIOM"
                  aria-label={`Axiom ${item.num}: ${item.title}`}
                >
                  <span className="text-[0.6875rem] font-mono">{item.num}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Axiom Ticker */}
      <div className="w-full site-wrap z-10 pt-8 border-t border-[var(--on-dark)]/10">
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
          {PRINCIPLES.map((item, idx) => (
            <button
              key={item.num}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-pressed={idx === activeIdx}
              aria-controls="compass-detail"
              className={`py-2 px-1 text-left border-b-2 transition-colors duration-300 ${
                idx === activeIdx
                  ? "border-[var(--signal)] text-[var(--on-dark)]"
                  : "border-transparent text-[var(--on-dark)]/40 hover:text-[var(--on-dark)]/80"
              }`}
            >
              <span className="block font-mono text-[0.625rem] text-[var(--signal)]">
                {item.num}
              </span>
              <span className="block text-xs font-sans truncate">
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
