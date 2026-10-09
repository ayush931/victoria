"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, SparklesIcon } from "@/components/ui/Icons";

interface AtmospherePreset {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  narrative: string;
  videoSrc: string;
  poster: string;
  location: string;
  coords: string;
  metricLabel: string;
  metricValue: string;
}

const ATMOSPHERES: AtmospherePreset[] = [
  {
    id: "balcao",
    tag: "VERNACULAR LIVING",
    title: "The Susegad Veranda",
    subtitle: "Morning Light Filtered Through Palm Fronds & Stone Balcãos",
    narrative:
      "Derived from the Portuguese 'sossegado' — a state of unhurried contentment and inner peace. In our homes, the balcão is not merely an architectural porch; it is the sacred threshold where morning coffee is sipped, neighbors are greeted, and the gentle breeze from Curtorim's ancient lakes cools the laterite stone underfoot.",
    videoSrc: "/videos/goa-porch-palms.webm",
    poster: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2400&auto=format&fit=crop",
    location: "Curtorim Lake Enclave, South Goa",
    coords: "15.2894° N, 74.0247° E",
    metricLabel: "PASSIVE COOLING GAIN",
    metricValue: "68% Less Energy Required",
  },
  {
    id: "coast",
    tag: "COASTAL SECLUSION",
    title: "The Arabian Horizon",
    subtitle: "Gentle Coastal Rhythms Along Untouched Silver Shores",
    narrative:
      "Goa’s 105 kilometers of coastline have drawn artists, writers, and aristocrats for centuries. In South Goa, the beaches remain expansive, tranquil, and pristine. Our private villas are secluded in agrarian hamlets just minutes from the Arabian Sea, ensuring absolute acoustic privacy with immediate coastal access.",
    videoSrc: "/videos/goa-coast.webm",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2400&auto=format&fit=crop",
    location: "Vainguinim & Benaulim Littoral, Goa",
    coords: "15.2638° N, 73.9142° E",
    metricLabel: "PROXIMITY TO SEA",
    metricValue: "18 Mins to Pristine Sands",
  },
  {
    id: "monsoon",
    tag: "ECOLOGICAL HARMONY",
    title: "Monsoon Awakening",
    subtitle: "Where Clay Roofs Celebrate the Konkan Rains",
    narrative:
      "The monsoon is Goa’s lifeblood. Deep red laterite walls absorb the downpours, while steep Mangalore-tiled roof slopes guide cascading rainwater into underground aquifers. Double-height teak ceilings create soothing acoustic resonance as emerald paddy fields outside awaken in vibrant green.",
    videoSrc: "/videos/goa-monsoon.webm",
    poster: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2400&auto=format&fit=crop",
    location: "Salcete Paddy Basins, South Goa",
    coords: "15.2912° N, 74.0321° E",
    metricLabel: "ANNUAL HARVESTING",
    metricValue: "1.2M Liters Aquifer Recharge",
  },
];

export default function GoaAtmosphereVideoSection() {
  const [activeAtmosphereIdx, setActiveAtmosphereIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = ATMOSPHERES[activeAtmosphereIdx];

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative w-full py-36 md:py-48 bg-[#102725] text-[#FAF8F5] overflow-hidden border-b border-[#FAF8F5]/10">
      {/* Background Decorative Ambient Tone */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_28%,rgba(121,169,154,0.15)_0%,transparent_43%),radial-gradient(ellipse_at_85%_78%,rgba(201,169,118,0.1)_0%,transparent_48%)] pointer-events-none" />

      <div className="relative z-10 w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Section Header with Generous Whitespace */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 md:mb-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <SparklesIcon size={14} className="text-[#D49B44]" />
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#D49B44] font-semibold">
                CINEMATIC AMBIENCE • THE SPIRIT OF GOA
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-[1.02] text-[#FAF8F5]">
              Living in the slow rhythm <br />
              <span className="font-serif italic text-[#D49B44]">of authentic Susegad.</span>
            </h2>
          </div>

          <div className="max-w-md text-xs sm:text-sm font-sans text-[#FAF8F5]/70 leading-relaxed font-light">
            <p>
              As documented in Incredible India&apos;s cultural heritage, Goa is not just a destination —
              it is an architectural state of mind. A sacred union of Konkan geology, 450 years of Portuguese influence,
              and tropical coastal ecology.
            </p>
          </div>
        </div>

        {/* Atmosphere Tabs */}
        <div className="flex flex-wrap gap-4 sm:gap-8 border-b border-[#FAF8F5]/15 pb-6 mb-12">
          {ATMOSPHERES.map((atm, idx) => (
            <button
              key={atm.id}
              type="button"
              onClick={() => setActiveAtmosphereIdx(idx)}
              className={`group flex items-center gap-3 text-xs sm:text-sm font-sans tracking-[0.14em] pb-3 transition-all relative ${
                activeAtmosphereIdx === idx
                  ? "text-[#FAF8F5] font-medium"
                  : "text-[#FAF8F5]/45 hover:text-[#FAF8F5]/85"
              }`}
            >
              <span className="font-mono text-[10px] text-[#D49B44]">
                0{idx + 1}
              </span>
              <span className="uppercase">{atm.title}</span>
              {activeAtmosphereIdx === idx && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D49B44]" />
              )}
            </button>
          ))}
        </div>

        {/* Split Cinematic Video Showcase & Editorial Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Ambient Video Viewport */}
          <div className="lg:col-span-7 relative h-[460px] sm:h-[580px] md:h-[680px] rounded-sm overflow-hidden bg-[#07120D] border border-[#FAF8F5]/10 shadow-2xl">
            <video
              key={active.videoSrc}
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster={active.poster}
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] saturate-[1.1] transition-opacity duration-1000"
            >
              <source src={active.videoSrc} type="video/webm" />
            </video>

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A14] via-transparent to-black/30 pointer-events-none" />

            {/* Top Video Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="bg-[#0C1A14]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FAF8F5]/15 text-[10px] font-mono tracking-widest text-[#D49B44] uppercase pointer-events-auto">
                {active.tag}
              </div>
              <button
                type="button"
                onClick={handleTogglePlay}
                className="bg-[#0C1A14]/80 backdrop-blur-md w-9 h-9 rounded-full border border-[#FAF8F5]/15 text-[#FAF8F5] flex items-center justify-center text-xs hover:text-[#D49B44] transition-colors pointer-events-auto"
                title={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#0C1A14]/85 backdrop-blur-md p-4 rounded-sm border border-[#FAF8F5]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-sans">
              <div className="flex items-center gap-2 text-[#FAF8F5]/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D49B44]" />
                <span className="font-medium">{active.location}</span>
              </div>
              <span className="font-mono text-[#FAF8F5]/50">{active.coords}</span>
            </div>
          </div>

          {/* Right Column: Architectural Narrative & Metrics with Generous Space */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="mb-10">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#D49B44] block mb-3">
                GOAN REAL ESTATE PARADIGM
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FAF8F5] mb-4 leading-snug">
                {active.subtitle}
              </h3>
              <p className="text-sm sm:text-base font-sans text-[#FAF8F5]/75 leading-relaxed font-light mb-8">
                {active.narrative}
              </p>
            </div>

            {/* Metrics & Proof Points */}
            <div className="flex flex-col gap-5 pt-8 border-t border-[#FAF8F5]/15">
              <div className="p-6 bg-[#FAF8F5]/5 rounded-sm border border-[#FAF8F5]/10">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D49B44] mb-1">
                  {active.metricLabel}
                </span>
                <span className="text-xl sm:text-2xl font-serif text-[#FAF8F5] font-light">
                  {active.metricValue}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/residences/natures-cove"
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.22em] text-[#D49B44] hover:text-[#FAF8F5] transition-colors font-medium"
                >
                  <span>Experience Nature&apos;s Cove</span>
                  <ArrowUpRightIcon size={14} />
                </Link>
                <span className="text-[11px] font-mono text-[#FAF8F5]/40">
                  SOUTH GOA SANCTUARY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

