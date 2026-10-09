"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon, PauseIcon, PlayIcon } from "@/components/ui/Icons";
import { Magnetic } from "@/components/effects/Magnetic";

const HERO_VIDEOS = [
  {
    id: "villas",
    label: "Villas",
    src: "/videos/goa-luxury-villas-1080p.mp4",
    type: "video/mp4",
    poster:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
    caption: "Nature's Cove · Lakefront Luxury Villas · 1080p Full HD",
  },
  {
    id: "veranda",
    label: "Balcão",
    src: "/videos/goa-porch-palms.webm",
    type: "video/webm",
    poster:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    caption: "Curtorim Lake Breeze · Ancestral Veranda",
  },
  {
    id: "coast",
    label: "Coast",
    src: "/videos/goa-shore-villas-1080p.mp4",
    type: "video/mp4",
    poster:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    caption: "Salcete Shore · Arabian Sea Coast · 1080p Full HD",
  },
];

function useGoaTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const f = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function HeroSection({ onOpenConcierge }: { onOpenConcierge?: () => void }) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const goaTime = useGoaTime();
  const activeVideo = HERO_VIDEOS[activeVideoIdx];

  // Intro choreography after preloader curtain lifts
  useEffect(() => {
    let killed = false;
    const run = async () => {
      await new Promise<void>((resolve) => {
        if ((window as unknown as { __preloaderDone?: boolean }).__preloaderDone) return resolve();
        window.addEventListener("victorino:preloader-done", () => resolve(), { once: true });
        setTimeout(resolve, 1200);
      });
      if (killed) return;
      const { default: gsap } = await import("gsap");
      const root = rootRef.current;
      if (!root) return;
      const lines = root.querySelectorAll("[data-hero-line-inner]");
      const fades = root.querySelectorAll("[data-hero-fade]");
      const media = root.querySelector("[data-hero-media]");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(media, { scale: 1.18 }, { scale: 1.02, duration: 2.2, ease: "power3.out" }, 0);
      tl.fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.15);
      tl.fromTo(fades, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7);
    };
    void run();
    return () => {
      killed = true;
    };
  }, []);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      void videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const scrollToIntro = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo("#introduction", { offset: 0, duration: 1.6 });
    else document.getElementById("introduction")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      data-hero
      className="relative w-full h-[100svh] min-h-[640px] sm:min-h-[680px] overflow-hidden bg-[#08130F] text-[#FAF8F5] flex flex-col justify-between"
    >
      {/* Cinematic media */}
      <div data-hero-media className="absolute inset-0 overflow-hidden will-change-transform">
        <video
          key={activeVideo.src}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={activeVideo.poster}
          className="h-full w-full object-cover object-center goa-grade"
        >
          <source src={activeVideo.src} type={activeVideo.type} />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#08130F] via-[#08130F]/25 to-[#08130F]/55 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(121,169,154,0.22)_0%,transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,118,0.16)_0%,transparent_52%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(8,19,15,0.6)_100%)] pointer-events-none" />
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-40" />
      </div>

      {/* Top meta bar */}
      <div data-hero-fade className="relative z-10 px-6 md:px-12 max-w-[1720px] mx-auto w-full pt-24 md:pt-28 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.28em] text-[#FAF8F5]/70">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D49B44] animate-pulse" />
          <span className="hidden sm:inline">Goan Luxury Atelier — Est. 2014</span>
          <span className="sm:hidden">Est. 2014</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>15.2894° N, 74.0247° E</span>
          <span className="text-[#D49B44]">Goa {goaTime} IST</span>
        </div>
        {/* Vibe switcher */}
        <div className="flex items-center gap-1 rounded-full border border-[#FAF8F5]/15 bg-black/30 backdrop-blur-md px-1.5 py-1">
          {HERO_VIDEOS.map((v, idx) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveVideoIdx(idx)}
              className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.2em] transition-all ${
                activeVideoIdx === idx ? "bg-[#D49B44] text-[#0C1A14] font-semibold" : "text-[#FAF8F5]/60 hover:text-white"
              }`}
            >
              {v.label}
            </button>
          ))}
          <button type="button" onClick={toggleVideoPlay} className="px-2 text-[#FAF8F5]/60 hover:text-[#D49B44] transition-colors" aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}>
            {isVideoPlaying ? <PauseIcon size={11} /> : <PlayIcon size={11} />}
          </button>
        </div>
      </div>

      {/* Massive display */}
      <div data-hero-content className="relative z-10 mt-auto px-6 md:px-12 max-w-[1720px] mx-auto w-full pb-8 md:pb-10">
        <p data-hero-fade className="font-mono text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#D49B44] mb-4">
          The soul of Susegad — Portuguese-Goan heirloom homes
        </p>
        <h1 className="font-serif font-light leading-[0.88] tracking-[-0.02em] text-[15.5vw] sm:text-[12vw] lg:text-[9.2vw]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line-inner className="block">Victorino</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span data-hero-line-inner className="block">
              <em className="font-normal text-[#D49B44]">Luxury</em>{" "}
              <span className="font-light">Homes</span>
              <sup className="ml-3 align-super font-sans text-[10px] md:text-xs tracking-[0.3em] text-[#FAF8F5]/60">GOA</sup>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-t border-[#FAF8F5]/15 pt-7">
          <p data-hero-fade className="max-w-md text-xs sm:text-sm font-sans font-light leading-relaxed text-[#FAF8F5]/80">
            Bespoke estates on Curtorim&apos;s ancient lakes, Margao&apos;s heritage quarters and
            Assagao&apos;s canopies — hand-dressed laterite, ancestral balcãos, soaring teak eaves.
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/residences/natures-cove"
                data-cursor="NATURE'S COVE"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#D49B44] px-7 py-4 text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#0C1A14] transition-colors duration-500 hover:text-[#FAF8F5]"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-[#FAF8F5]/15 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
                <span className="relative z-10">Explore Nature&apos;s Cove</span>
                <ArrowUpRightIcon size={14} />
              </Link>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={onOpenConcierge}
                data-cursor="SCHEDULE"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#FAF8F5]/30 px-7 py-4 text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#FAF8F5] transition-colors duration-500 hover:border-[#D49B44] hover:text-[#D49B44]"
              >
                Private Viewing
              </button>
            </Magnetic>
          </div>
        </div>

        {/* bottom strip */}
        <div data-hero-fade className="mt-7 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.22em] text-[#FAF8F5]/55">
          <div className="hidden sm:flex items-center gap-6">
            <span>10+ yrs atelier</span>
            <span className="diamond bg-[#D49B44]" />
            <span>{activeVideo.caption}</span>
          </div>
          <button type="button" onClick={scrollToIntro} data-cursor="SCROLL" className="group flex items-center gap-3 text-[#FAF8F5]/80 hover:text-[#D49B44]">
            <span>Scroll</span>
            <span className="relative block h-10 w-px bg-[#FAF8F5]/20 overflow-hidden">
              <span className="scroll-hint-line absolute inset-0 bg-[#D49B44]" />
            </span>
            <ArrowDownIcon size={12} className="transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
