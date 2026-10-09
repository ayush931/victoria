"use client";

import React, { useState } from "react";

const MATERIALS = [
  {
    id: "laterite",
    name: "Goan Hand-Dressed Laterite",
    category: "LITHIC HERITAGE",
    origin: "Quarried within 12km of Curtorim",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1200&auto=format&fit=crop",
    narrative:
      "Formed by geological millennia under tropical monsoons, Goan laterite is deeply porous and breathable. It acts as an organic thermal sponge, absorbing intense solar radiation during the day and gently releasing warmth as evening breezes roll in across Curtorim lake.",
    properties: {
      thermalMass: "High Thermal Damping (Specific Heat 0.84 kJ/kg·K)",
      acoustic: "Porous Micro-Cavity Noise Attenuation",
      longevity: "Centuries-Old Vernacular Provenance",
      finish: "Natural Wire-Brushed Earthen Texture",
    },
  },
  {
    id: "carepas",
    name: "Mother-of-Pearl Oyster Shells (Carepas)",
    category: "VERNACULAR FENESTRATION",
    origin: "Windowpane Oyster Shells (Placuna placenta), Goa Littoral",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1200&auto=format&fit=crop",
    narrative:
      "As celebrated across historic Latin quarters in Panaji and Old Goa, traditional carepas window panes were crafted from thin oyster shells fitted into wooden lattices instead of clear glass. They filter the fierce Konkan midday sun into a serene, pearlescent golden luminescence.",
    properties: {
      thermalMass: "Natural Solar Glare Diffusion",
      acoustic: "Shields Interiors from Coastal Winds",
      longevity: "Immune to Saline Coastal Degradation",
      finish: "Translucent Pearlescent Shell Sheen",
    },
  },
  {
    id: "teak",
    name: "Reclaimed Aged Burma Teak",
    category: "STRUCTURAL TIMBER",
    origin: "Salvaged Colonial Goan Manors & Sourced Rafters",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop",
    narrative:
      "Seasoned for over seven decades, our teak has zero residual sap moisture, rendering it immune to termite infestation and seasonal warpage. Used in high-vaulted trusses, sun louvers, and bespoke pivot entrance portals.",
    properties: {
      thermalMass: "Natural Insulative Air Pockets",
      acoustic: "Warm Acoustic Diffusion in High Vaults",
      longevity: "High Natural Silica & Resin Content",
      finish: "Hand-Rubbed Organic Linseed & Beeswax",
    },
  },
  {
    id: "azulejos",
    name: "Hand-Painted Azulejos & Mineral Ochre",
    category: "INDO-PORTUGUESE ARTISTRY",
    origin: "Bespoke Ceramic Atelier, Margao",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
    narrative:
      "Honoring the 450-year heritage of Old Goa, our verandas and courtyard borders feature hand-painted cobalt azulejos paired with natural yellow and terracotta mineral ochre washes that age with graceful dignity under coastal rain.",
    properties: {
      thermalMass: "Breathable Natural Lime Wash Substrate",
      acoustic: "Non-Reflective Matt Mineral Surface",
      longevity: "Unglazed Terracotta and Cobalt Fired at 1050°C",
      finish: "Hand-Stroked Artisanal Brush Finish",
    },
  },
  {
    id: "water",
    name: "Natural Sukabumi Pool Emeralds",
    category: "HYDRO-MICROCLIMATE",
    origin: "Natural Volcanic Mineral Stone",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop",
    narrative:
      "Every plunge pool at Nature's Cove is lined with natural volcanic green stone, imparting a deep crystalline emerald hue reminiscent of Curtorim’s monsoon lakes. Natural zeolite minerals in the stone aid in continuous water purification.",
    properties: {
      thermalMass: "Passive Evaporative Microclimate Cooling",
      acoustic: "Soothing Natural Water Lap Resonance",
      longevity: "Algae Resistant Volcanic Mineral",
      finish: "Honed Non-Slip Wet Coping Texture",
    },
  },
];

export default function MaterialsPhilosophySection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = MATERIALS[activeIdx];

  return (
    <section className="w-full py-36 md:py-48 bg-[#0C1A14] text-[#FAF8F5] border-b border-[#FAF8F5]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Header with Generous Whitespace */}
        <div className="mb-24 md:mb-32">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#D49B44] block mb-4 font-semibold">
            TACTILE PHILOSOPHY • INDO-PORTUGUESE HONESTY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF8F5] font-light max-w-4xl arch-indent leading-[1.08]">
            Materials that age with dignity. Five tactile elements of our Goan architecture.
          </h2>
        </div>

        {/* Horizontal Material Selector Bar */}
        <div className="flex flex-wrap gap-4 sm:gap-8 border-b border-[#FAF8F5]/15 pb-4 mb-16">
          {MATERIALS.map((mat, idx) => (
            <button
              key={mat.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`text-xs sm:text-sm font-sans tracking-[0.1em] pb-3 transition-all relative ${
                activeIdx === idx
                  ? "text-[#FAF8F5] font-medium"
                  : "text-[#FAF8F5]/40 hover:text-[#FAF8F5]/80"
              }`}
            >
              <span className="font-mono text-[10px] text-[#D49B44] mr-2">
                0{idx + 1}
              </span>
              <span>{mat.name}</span>
              {activeIdx === idx && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D49B44]" />
              )}
            </button>
          ))}
        </div>

        {/* Selected Material Showcase: Split Visual & Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Macro Texture Image with crossfade */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[520px] lg:h-[580px] max-h-[66vh] rounded-sm overflow-hidden bg-[#08130F] border border-[#FAF8F5]/10 shadow-xl">
            {MATERIALS.map((mat, idx) => (
              <img
                key={mat.id}
                src={mat.image}
                alt={mat.name}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-opacity duration-700 ease-out ${
                  activeIdx === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute top-6 left-6 bg-[#08130F]/80 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-mono tracking-widest text-[#D49B44] uppercase rounded-sm border border-[#FAF8F5]/10">
              {current.category}
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-[#08130F]/80 backdrop-blur-md p-4 text-[11px] font-sans text-[#FAF8F5]/80 rounded-sm border border-[#FAF8F5]/10 flex justify-between items-center">
              <span>Provenance:</span>
              <span className="text-[#D49B44] font-medium">{current.origin}</span>
            </div>
          </div>

          {/* Right: Technical & Sensorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="mb-8">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#D49B44] block mb-2">
                MATERIAL STUDY 0{activeIdx + 1}
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-[#FAF8F5] mb-4">
                {current.name}
              </h3>
              <p className="text-sm sm:text-base font-sans text-[#FAF8F5]/70 leading-relaxed">
                {current.narrative}
              </p>
            </div>

            {/* Properties Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#FAF8F5]/15 text-xs font-sans">
              <div className="p-4 bg-[#FAF8F5]/5 rounded-sm border border-[#FAF8F5]/10">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A880] mb-1">
                  THERMAL CHARACTER
                </span>
                <span className="text-[#FAF8F5]/80">{current.properties.thermalMass}</span>
              </div>
              <div className="p-4 bg-[#FAF8F5]/5 rounded-sm border border-[#FAF8F5]/10">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A880] mb-1">
                  ACOUSTIC PERFORMANCE
                </span>
                <span className="text-[#FAF8F5]/80">{current.properties.acoustic}</span>
              </div>
              <div className="p-4 bg-[#FAF8F5]/5 rounded-sm border border-[#FAF8F5]/10">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A880] mb-1">
                  HERITAGE LONGEVITY
                </span>
                <span className="text-[#FAF8F5]/80">{current.properties.longevity}</span>
              </div>
              <div className="p-4 bg-[#FAF8F5]/5 rounded-sm border border-[#FAF8F5]/10">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A880] mb-1">
                  TACTILE FINISH
                </span>
                <span className="text-[#FAF8F5]/80">{current.properties.finish}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
