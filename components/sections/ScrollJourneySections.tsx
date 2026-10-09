"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  X,
  Compass,
  MapPin,
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";

interface GoanStop {
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  tone: string;
  specs: string[];
  link: string;
  residence: string;
}

const STOPS: GoanStop[] = [
  {
    number: "01",
    tag: "CURTORIM · 15.2894° N",
    title: "The Agrarian Rhythm of Curtorim",
    subtitle: "LAKE COUNTRY & 400-YEAR SLUICE GATES",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
    tone: "Ancient water sluice gates (manas), shimmering migratory bird lakes, and quiet village lanes framed by red laterite walls.",
    specs: ["Lakefront Parcel", "Passive Aquifer Recharge", "13 Row Villas"],
    link: "/residences/natures-cove",
    residence: "Nature's Cove — Curtorim",
  },
  {
    number: "02",
    tag: "SALCETE · 15.2831° N",
    title: "A Balcão Made for the Sea Breeze",
    subtitle: "PORTUGUESE-GOAN VERANDA LIVING",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    tone: "Shaded deep verandas with granite stone benches (sofa de pedra), Burma teak trusses, and mother-of-pearl oyster shell windows.",
    specs: ["Deep Verandah", "Carepas Shell Glazing", "Burma Teak Rafters"],
    link: "/residences/natures-cove",
    residence: "Nature's Cove — Balcão Suite",
  },
  {
    number: "03",
    tag: "PANJIM · 15.4989° N",
    title: "Ochre Facades & Cobalt Azulejos",
    subtitle: "FONTAINHAS LATIN QUARTER ATELIER",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    tone: "Ancestral estates celebrated for their natural lime ochre plaster, cobalt ceramic crests, and terracotta-tiled pitched eaves.",
    specs: ["Fontainhas Ochre", "Cobalt Azulejos", "Heritage Manor"],
    link: "/residences/quinta-da-rosa",
    residence: "Quinta Da Rosa — Manor",
  },
  {
    number: "04",
    tag: "SOUTH SHORE · 15.1630° N",
    title: "The Salcete Waterway Enclave",
    subtitle: "ESTUARY SHORELINE & PRIVATE CANALS",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    tone: "Verdant coconut groves descending into serene tidal estuaries where the rhythm of the Arabian Sea echoes under twilight.",
    specs: ["Waterfront Boundary", "Private Boat Jetty", "Sukabumi Pool"],
    link: "/residences/natures-cove",
    residence: "Villa Miramar — Waterfront",
  },
  {
    number: "05",
    tag: "ASSAGAO · 15.5912° N",
    title: "Sanctuary amidst the Banyan Canopy",
    subtitle: "NORTH GOA HILLSIDE RIDGE",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
    tone: "Secluded tropical residences enveloped by ancient mango and jackfruit groves, balancing dramatic cantilevered eaves with total privacy.",
    specs: ["Hillside Ridge", "Internal Courtyard", "3 BHK Boutique"],
    link: "/residences/casa-do-sol",
    residence: "Casa Do Sol — Assagao",
  },
  {
    number: "06",
    tag: "CABO DE RAMA · 15.0880° N",
    title: "Unbroken Horizons of the Arabian Sea",
    subtitle: "HIGH OCEAN BLUFFS & MONSOON WINDS",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop",
    tone: "Sweeping cliffside ocean horizons where ancient stone parapets meet the sea, capturing Goa's most breathtaking sunsets.",
    specs: ["Cliffside Panorama", "Zero Noise Corridor", "Private Solarium"],
    link: "/residences/quinta-da-rosa",
    residence: "Quinta Da Rosa — Ocean Wing",
  },
];

const PRINCIPLES = [
  {
    number: "01 / EARTH",
    title: "Laterite with a living texture",
    copy: "Hand-dressed local stone gives each home its warm, grounded character and a direct thermal connection to the Goan soil.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "02 / SHADE",
    title: "A balcão made for the breeze",
    copy: "Deep eaves, timber columns, and generous verandas soften the afternoon sun, making room for unhurried Susegad living.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "03 / WATER",
    title: "Life shaped around water",
    copy: "Courtyards, private Sukabumi mineral plunge pools, and nearby lake country bring the cooling presence of water into daily life.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop",
  },
];

export function CoastalSideScrollSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Initialize Embla Carousel with Autoplay Plugin
  const autoplayRef = useRef(
    Autoplay({
      delay: 5500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: false,
      duration: 25,
    },
    [autoplayRef.current]
  );

  // Apply counter-parallax on slide images as carousel scrolls
  const applyParallax = useCallback(() => {
    if (!emblaApi) return;
    const slides = emblaApi.slideNodes();
    const scrollProgress = emblaApi.scrollProgress();
    const scrollSnaps = emblaApi.scrollSnapList();

    slides.forEach((slide, index) => {
      const snap = scrollSnaps[index];
      if (snap === undefined) return;
      const diffToTarget = snap - scrollProgress;
      const img = slide.querySelector("img");
      if (img) {
        const translate = Math.max(-12, Math.min(12, diffToTarget * -20));
        img.style.transform = `scale(1.04) translateX(${translate}%)`;
      }
    });
  }, [emblaApi]);

  // Update scroll state from Embla
  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress);
    applyParallax();
  }, [emblaApi, applyParallax]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    onScroll();
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, onScroll]);

  // Trackpad / Wheel horizontal swipe listener
  useEffect(() => {
    if (!emblaApi) return;
    const container = emblaApi.rootNode();
    if (!container) return;

    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        if (Math.abs(e.deltaX) > 15 || (e.shiftKey && Math.abs(e.deltaY) > 15)) {
          if (wheelTimeout) return;
          if (e.deltaX > 15 || (e.shiftKey && e.deltaY > 15)) {
            emblaApi.scrollNext();
          } else {
            emblaApi.scrollPrev();
          }
          wheelTimeout = setTimeout(() => {
            wheelTimeout = null;
          }, 240);
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      container.removeEventListener("wheel", onWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [emblaApi]);

  // Autoplay play/pause toggle
  const toggleAutoplay = useCallback(() => {
    const autoplay = autoplayRef.current;
    if (!autoplay) return;
    if (isPlaying) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : STOPS.length - 1));
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev !== null && prev < STOPS.length - 1 ? prev + 1 : 0));
        }
        return;
      }
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi, lightboxIndex]);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F5] py-24 md:py-32 border-b border-[#121210]/10 select-none">
      {/* Top Header Row with Expansive Whitespace & Navigation Controls */}
      <div className="mx-auto mb-12 flex w-full max-w-[1720px] flex-col justify-between gap-8 px-6 md:mb-16 md:flex-row md:items-end md:px-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D49B44] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.32em] text-[#B84A39] font-semibold">
              EXPEDITION ARCHIVE • A SENSE OF PLACE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#121210] font-light leading-[1.08]">
            From lake country <em className="italic text-[#B84A39]">to the Arabian Sea.</em>
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-sans text-[#7A756B] max-w-xl leading-relaxed font-light">
            A journey across Goa&apos;s agrarian waterways, shaded ancestral balcãos, ochre heritage quarters, and coastal bluffs. Drag or browse through our architectural landscape.
          </p>
        </div>

        {/* Carousel Micro-Controls Pill */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Autoplay Play/Pause */}
          <button
            type="button"
            onClick={toggleAutoplay}
            aria-label={isPlaying ? "Pause expedition autoplay" : "Start expedition autoplay"}
            className="flex items-center gap-2 px-3.5 py-2 text-[10px] font-mono uppercase tracking-wider rounded-full border border-[#121210]/15 text-[#121210] hover:border-[#D49B44] hover:text-[#D49B44] transition-all bg-white shadow-sm"
          >
            {isPlaying ? <Pause size={12} className="text-[#D49B44]" /> : <Play size={12} className="text-[#B84A39]" />}
            <span className="hidden sm:inline">{isPlaying ? "Autoplay On" : "Paused"}</span>
          </button>

          {/* Slide Indicator */}
          <div className="px-3.5 py-2 text-xs font-mono text-[#121210] rounded-full border border-[#121210]/15 bg-white shadow-sm">
            <span className="font-semibold text-[#B84A39]">0{selectedIndex + 1}</span>
            <span className="text-[#121210]/40"> / 0{STOPS.length}</span>
          </div>

          {/* Prev / Next Magnetic Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous stop"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                canScrollPrev
                  ? "border-[#121210]/20 bg-white text-[#121210] hover:bg-[#0C1A14] hover:text-[#FAF8F5] hover:border-[#0C1A14] active:scale-95"
                  : "border-[#121210]/10 bg-white/50 text-[#121210]/25 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next stop"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                canScrollNext
                  ? "border-[#121210]/20 bg-white text-[#121210] hover:bg-[#0C1A14] hover:text-[#FAF8F5] hover:border-[#0C1A14] active:scale-95"
                  : "border-[#121210]/10 bg-white/50 text-[#121210]/25 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Embla Viewport */}
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6 sm:gap-8 px-6 md:px-12">
          {STOPS.map((stop, index) => (
            <article
              key={stop.number}
              className="group relative flex flex-col justify-between shrink-0 rounded-sm bg-white border border-[#121210]/12 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden w-[86vw] sm:w-[68vw] md:w-[50vw] lg:w-[38vw] xl:w-[32vw] max-w-[540px]"
              data-cursor="EXPEDITION"
            >
              {/* Dedicated Photo Container — Fixed Aspect Ratio (16:10) for Proper Uncropped Visibility */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10.5] overflow-hidden bg-[#0C1A14]">
                <img
                  src={stop.image}
                  alt={stop.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                
                {/* Subtle top & bottom vignette so photo remains bright and clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35 pointer-events-none" />

                {/* Top Badge: Region & Coordinates */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-2 bg-[#08130F]/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 text-[10px] font-mono tracking-widest text-white uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D49B44]" />
                    <span className="font-bold text-[#D49B44]">{stop.number}</span>
                    <span>{stop.tag}</span>
                  </div>

                  {/* Expand Image Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(index);
                    }}
                    aria-label={`Expand full image for ${stop.title}`}
                    className="pointer-events-auto w-8 h-8 rounded-full bg-[#08130F]/80 backdrop-blur-md text-white/80 hover:text-white hover:bg-[#D49B44] hover:text-[#0C1A14] flex items-center justify-center transition-all border border-white/10 shadow-md"
                  >
                    <Maximize2 size={13} />
                  </button>
                </div>

                {/* Subtitle floating pill */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10 text-[9px] font-mono tracking-wider text-white/90 uppercase">
                  {stop.subtitle}
                </div>
              </div>

              {/* Card Editorial Information Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-5 bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#121210] group-hover:text-[#B84A39] transition-colors leading-tight mb-2.5">
                    {stop.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-sans text-[#7A756B] leading-relaxed font-light line-clamp-3">
                    {stop.tone}
                  </p>
                </div>

                {/* Architectural Specs Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stop.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-[#FAF8F5] border border-[#121210]/10 text-[#121210]/75 rounded-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-[#121210]/10 flex items-center justify-between text-xs font-sans">
                  <span className="text-[11px] font-mono text-[#7A756B]">
                    {stop.residence}
                  </span>
                  <Link
                    href={stop.link}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#121210] group-hover:text-[#B84A39] transition-colors"
                  >
                    <span>Inspect Residence</span>
                    <ArrowUpRight size={13} className="text-[#B84A39] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Interactive Progress Bar & Quick Jump Navigation */}
      <div className="mx-auto mt-10 max-w-[1720px] px-6 md:px-12 flex flex-col gap-6">
        {/* Hairline Progress Track */}
        <div className="w-full h-[2px] bg-[#121210]/10 overflow-hidden rounded-full relative">
          <div
            className="h-full bg-[#D49B44] transition-all duration-300 ease-out origin-left rounded-full"
            style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
          />
        </div>

        {/* Quick Jump Stop Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {STOPS.map((stop, i) => (
              <button
                key={stop.number}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded-sm transition-all border ${
                  selectedIndex === i
                    ? "bg-[#0C1A14] text-[#FAF8F5] border-[#0C1A14] font-semibold shadow-sm"
                    : "bg-white text-[#7A756B] border-[#121210]/12 hover:border-[#121210]/30 hover:text-[#121210]"
                }`}
              >
                <span>{stop.number}</span>
                <span className="hidden md:inline ml-1.5">{stop.tag.split("·")[0].trim()}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#7A756B]">
            <Compass size={12} className="text-[#D49B44]" />
            <span>Drag or use ← → arrow keys to navigate</span>
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Inspector Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[25000] bg-black/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top modal bar */}
          <div
            className="flex items-center justify-between text-white pb-4 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#D49B44] text-[#0C1A14] font-mono text-xs font-bold">
                {STOPS[lightboxIndex].number}
              </span>
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-white">{STOPS[lightboxIndex].title}</h4>
                <p className="text-[10px] font-mono text-white/60">{STOPS[lightboxIndex].tag} • {STOPS[lightboxIndex].subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : STOPS.length - 1))}
                className="w-9 h-9 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev < STOPS.length - 1 ? prev + 1 : 0))}
                className="w-9 h-9 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/30 transition-colors ml-2"
                aria-label="Close image inspection"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Center full uncropped image */}
          <div
            className="flex-1 flex items-center justify-center my-4 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={STOPS[lightboxIndex].image}
              alt={STOPS[lightboxIndex].title}
              className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-2xl"
            />
          </div>

          {/* Bottom details bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/80 pt-4 border-t border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-white/90">
              {STOPS[lightboxIndex].tone}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={STOPS[lightboxIndex].link}
                onClick={() => setLightboxIndex(null)}
                className="px-5 py-2.5 bg-[#D49B44] text-[#0C1A14] font-sans uppercase tracking-[0.2em] text-[11px] font-semibold rounded-full hover:bg-white transition-colors"
              >
                View Residence Portfolio
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function LayeredLivingSection() {
  return (
    <section data-stack-scroll className="relative bg-[#0C1A14] py-24 text-[#FAF8F5] md:py-32 border-b border-white/10">
      <div className="mx-auto mb-12 w-full max-w-[1720px] px-6 md:mb-16 md:px-12">
        <span className="mb-3 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.32em] text-[#D49B44]">
          SUSEGAD CRAFTSMANSHIP • GOAN MATERIALS
        </span>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-serif text-3xl font-light leading-[1.05] sm:text-5xl md:text-6xl text-[#FAF8F5]">
            A slower kind of luxury, <span className="italic text-[#D49B44]">layer by layer.</span>
          </h2>
          <p className="max-w-sm text-xs sm:text-sm font-light leading-relaxed text-white/70">
            Every material choice honors generational durability. Reclaimed timber, laterite blocks, and natural waters temper the tropical sun.
          </p>
        </div>
      </div>

      <div data-stack-stage className="mx-auto flex w-full max-w-[1720px] flex-col gap-8 px-6 md:px-12">
        {PRINCIPLES.map((item, index) => (
          <article
            key={item.number}
            data-stack-card
            className="relative isolate flex min-h-[58vh] md:min-h-[64vh] max-h-[620px] rounded-sm overflow-hidden bg-[#122820] border border-white/10 will-change-transform shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 -z-10 h-full w-full object-cover filter brightness-[0.85] contrast-[1.05]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0C1A14]/95 via-[#0C1A14]/55 to-transparent" />
            <div className="flex w-full flex-col justify-between p-7 sm:p-10 md:p-14">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#D49B44]">
                <span>{item.number}</span>
                <span>THE NATURE&apos;S COVE PHILOSOPHY</span>
              </div>
              <div className="max-w-2xl my-auto py-8">
                <h3 className="mb-4 font-serif text-3xl font-light leading-tight sm:text-5xl md:text-6xl text-[#FAF8F5]">
                  {item.title}
                </h3>
                <p className="max-w-xl text-xs sm:text-base font-light leading-relaxed text-white/80">
                  {item.copy}
                </p>
              </div>
              <div className="h-[1.5px] w-full bg-white/20 rounded-full overflow-hidden">
                <span
                  className="block h-full bg-[#D49B44] transition-all"
                  style={{ width: `${((index + 1) / PRINCIPLES.length) * 100}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
