"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/components/ui/Icons";

interface HeroSectionProps {
  onOpenConcierge?: () => void;
}

export default function HeroSection({ onOpenConcierge }: HeroSectionProps) {
  const scrollToIntro = () => {
    const el = document.getElementById("introduction");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[700px] overflow-hidden bg-[#08130F] text-[#FAF8F5] flex flex-col justify-between pt-28 pb-10">
      {/* Cinematic Full-Bleed Architectural Visual with Warm Grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop"
          alt="Victorino Luxury Villa in South Goa"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05] transition-transform duration-[12000ms] ease-out scale-105 hover:scale-100"
        />
        {/* Subtle Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08130F] via-transparent to-[#08130F]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(8,19,15,0.6)_100%)]" />
      </div>

      {/* Top Tagline Eyebrow */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-[1720px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B38F5B] animate-ping" />
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#C5A880]">
            FLAGSHIP LAUNCH • CURTORIM, SOUTH GOA
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] font-sans text-[#FAF8F5]/70">
          <span>15.2894° N, 74.0247° E</span>
          <span className="text-[#C5A880]">•</span>
          <span>13 BESPOKE ROW VILLAS</span>
        </div>
      </div>

      {/* Bottom Architectural Display Hero (Kononenko Inspired Layout) */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-[1720px] mx-auto mt-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-8 border-b border-[#FAF8F5]/15">
          {/* Main Display Headline */}
          <div className="max-w-4xl">
            <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#C5A880] block mb-3 font-medium">
              ARCHITECTS OF DREAMS • DESIGNERS OF REALITY
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[0.95] text-[#FAF8F5]">
              Victorino <br />
              <span className="font-serif italic text-[#C5A880] font-normal">
                Luxury
              </span>{" "}
              Homes
            </h1>
          </div>

          {/* Editorial Callout & Quick Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-6 max-w-md">
            <p className="text-xs sm:text-sm font-sans text-[#FAF8F5]/80 leading-relaxed font-light">
              Crafting heirloom residences in Curtorim, Margao, and Verna.
              Where Portuguese-Goan architectural serenity meets contemporary quiet luxury.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/residences/natures-cove"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B38F5B] text-[#08130F] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#FAF8F5] transition-all duration-300 rounded-sm"
                data-cursor="NATURE'S COVE"
              >
                <span>Explore Nature&apos;s Cove</span>
                <ArrowUpRightIcon size={14} />
              </Link>
              <button
                type="button"
                onClick={onOpenConcierge}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors rounded-sm"
                data-cursor="SCHEDULE"
              >
                <span>Private Viewing</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Micro Specs Bar */}
        <div className="flex items-center justify-between pt-6 text-[10px] sm:text-xs font-sans text-[#FAF8F5]/60">
          <div className="flex items-center gap-4 sm:gap-8">
            <span>10+ Years Heritage</span>
            <span>•</span>
            <span>13 Bespoke Villas</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">RERA Registered</span>
          </div>

          <button
            type="button"
            onClick={scrollToIntro}
            className="group flex items-center gap-2 text-current hover:text-[#C5A880] transition-colors"
            data-cursor="SCROLL"
          >
            <span className="uppercase tracking-[0.2em]">Scroll to Explore</span>
            <ArrowDownIcon
              size={12}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
