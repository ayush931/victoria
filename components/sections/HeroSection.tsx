"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/components/ui/Icons";

interface HeroSectionProps {
  onOpenConcierge?: () => void;
}

const HERO_VIDEOS = [
  {
    id: "veranda",
    label: "Susegad Veranda",
    src: "/videos/goa-porch-palms.webm",
    type: "video/webm",
    poster: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2400&auto=format&fit=crop",
    caption: "Curtorim Lake Breeze · Ancestral Balcão",
  },
  {
    id: "coast",
    label: "Fort Aguada",
    // Pexels clip 1234164, showing Fort Aguada above Goa's coastline.
    src: "/videos/goa-coastal-heritage.mp4",
    type: "video/mp4",
    poster: "https://images.pexels.com/videos/1234164/free-video-1234164.jpg?auto=compress&dpr=1&h=750&w=1260",
    caption: "Fort Aguada · Arabian Sea Coast",
  },
];

export default function HeroSection({ onOpenConcierge }: HeroSectionProps) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = HERO_VIDEOS[activeVideoIdx];

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const scrollToIntro = () => {
    const el = document.getElementById("introduction");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[760px] md:min-h-[820px] overflow-hidden bg-[#0C1A14] text-[#FAF8F5] flex flex-col justify-between pt-32 pb-12">
      {/* Light Cinematic Goa Video Background with Warm Grading */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          key={activeVideo.src}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={activeVideo.poster}
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] saturate-[1.2] transition-opacity duration-1000 scale-[1.02]"
        >
          <source src={activeVideo.src} type={activeVideo.type} />
        </video>

        {/* Ambient Film Grain & Warm Goan Sunlight Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091B1D] via-[#102725]/20 to-[#102725]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(121,169,154,0.2)_0%,transparent_58%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,118,0.14)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(9,27,29,0.56)_100%)] pointer-events-none" />
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-40" />
      </div>

      {/* Top Floating Eyebrow & Coordinates Bar */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-[1720px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D49B44] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#E0B87A] font-medium">
            GOAN LUXURY REAL ESTATE ATELIER • ESTABLISHED 2014
          </span>
        </div>

        {/* Video Atmosphere Controls Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-[#0C1A14]/75 backdrop-blur-md px-2 py-1 rounded-full border border-[#FAF8F5]/15 text-[10px] font-sans">
            <span className="text-[#FAF8F5]/50 px-2 uppercase tracking-widest text-[9px]">Vibe:</span>
            {HERO_VIDEOS.map((v, idx) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVideoIdx(idx)}
                className={`px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-all ${
                  activeVideoIdx === idx
                    ? "bg-[#D49B44] text-[#0C1A14] font-semibold"
                    : "text-[#FAF8F5]/70 hover:text-[#FAF8F5]"
                }`}
              >
                {v.label}
              </button>
            ))}
            <button
              type="button"
              onClick={toggleVideoPlay}
              className="px-2 text-[#FAF8F5]/60 hover:text-[#D49B44] transition-colors"
              title={isVideoPlaying ? "Pause background video" : "Play background video"}
            >
              {isVideoPlaying ? "❚❚" : "▶"}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[11px] font-sans text-[#FAF8F5]/70">
            <span>15.2894° N, 74.0247° E</span>
            <span className="text-[#D49B44]">•</span>
            <span>CURTORIM &amp; ASSAGAO</span>
          </div>
        </div>
      </div>

      {/* Main Architectural Display Hero */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-[1720px] mx-auto mt-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b border-[#FAF8F5]/15">
          {/* Main Display Headline */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.32em] text-[#D49B44] font-medium">
                THE SOUL OF SUSEGAD • PORTUGUESE-GOAN HEIRLOOM HOMES
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[0.94] text-[#FAF8F5]">
              Victorino <br />
              <span className="font-serif italic text-[#D49B44] font-normal">
                Luxury
              </span>{" "}
              Homes
            </h1>
          </div>

          {/* Editorial Callout & Action Buttons with Generous Spacing */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-6 max-w-lg">
            <p className="text-xs sm:text-sm font-sans text-[#FAF8F5]/85 leading-relaxed font-light">
              Crafting bespoke estates amidst Curtorim’s ancient lakes, Margao’s heritage quarters, and Assagao’s leafy canopies.
              Where hand-dressed red laterite stone, ancestral balcãos, and soaring teak eaves awaken the true spirit of Goa.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/residences/natures-cove"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D49B44] text-[#0C1A14] text-xs font-sans uppercase tracking-[0.22em] font-semibold hover:bg-[#FAF8F5] transition-all duration-300 rounded-sm shadow-lg shadow-black/20"
                data-cursor="NATURE'S COVE"
              >
                <span>Explore Nature&apos;s Cove</span>
                <ArrowUpRightIcon size={14} />
              </Link>
              <button
                type="button"
                onClick={onOpenConcierge}
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#FAF8F5]/35 text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] hover:border-[#D49B44] hover:text-[#D49B44] transition-colors rounded-sm backdrop-blur-xs"
                data-cursor="SCHEDULE"
              >
                <span>Private Viewing</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Micro Specs Bar with Expansive Padding */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-[10px] sm:text-xs font-sans text-[#FAF8F5]/65">
          <div className="flex items-center gap-4 sm:gap-8 font-light">
            <span>10+ Years Goan Atelier</span>
            <span>•</span>
            <span>Hand-Dressed Laterite Stone</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">13 Lakefront Row Villas</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Goa RERA Approved</span>
          </div>

          <button
            type="button"
            onClick={scrollToIntro}
            className="group flex items-center gap-2 text-current hover:text-[#D49B44] transition-colors"
            data-cursor="SCROLL"
          >
            <span className="uppercase tracking-[0.22em]">Explore Goan Living</span>
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
