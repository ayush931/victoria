"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
import VillaViewer3D from "@/components/3d/VillaViewer3D";
import { ArrowLeftIcon, ArrowUpRightIcon, SparklesIcon, MapPinIcon } from "@/components/ui/Icons";

interface FeatureItem {
  name: string;
  desc: string;
}

interface FloorplanItem {
  level: string;
  area: string;
  highlights: string;
}

interface DistanceItem {
  place: string;
  time: string;
}

interface ResidenceData {
  title: string;
  subtitle: string;
  category: string;
  status: string;
  price: string;
  plot: string;
  builtUp: string;
  beds: string;
  pools: string;
  heroImage: string;
  overview: string;
  gallery: string[];
  features: FeatureItem[];
  floorplans: FloorplanItem[];
  distances: DistanceItem[];
}

const RESIDENCES: Record<string, ResidenceData> = {
  "natures-cove": {
    title: "Nature's Cove",
    subtitle: "13 Bespoke Row Villas • Curtorim, South Goa",
    category: "FLAGSHIP LAUNCH",
    status: "Under Construction • Handover Q4 2026",
    price: "Price on Private Application",
    plot: "3,400 – 4,800 Sq.Ft",
    builtUp: "420 – 540 Sq.M",
    beds: "4 BHK + Balcão Veranda",
    pools: "Private Sukabumi Emerald Plunge Pool",
    heroImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000&auto=format&fit=crop",
    overview:
      "Nestled along the pristine edge of Curtorim Lake, Nature's Cove comprises 13 individual row villas conceived as timeless heirlooms. The architecture draws directly upon the historic Portuguese-Goan vernacular — featuring expansive front balcãos with stone seating, double-height living volumes with exposed Burma teak trusses, translucent mother-of-pearl oyster shell windows (carepas), and hand-cut laterite accent walls that keep the interior naturally tempered year-round.",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1200&auto=format&fit=crop",
    ],
    features: [
      { name: "Private Sukabumi Pool", desc: "Volcanic mineral green pool with hydrotherapy jets and Italian travertine coping." },
      { name: "Ancestral Balcão", desc: "Covered deep verandah porch with sofa de pedra overlooking Curtorim lake and coconut groves." },
      { name: "5.2m Soaring Atrium", desc: "Double-height living pavilion with reclaimed Burma teak timber rafters for passive ventilation." },
      { name: "Carepas Fenestration", desc: "Mother-of-pearl oyster shell window panes diffusing intense tropical glare into golden warmth." },
    ],
    floorplans: [
      {
        level: "Ground Floor",
        area: "230 Sq.M",
        highlights: "Grand Entry Foyer • Balcão Porch • Double-Height Living • Dining Hall • Chef's Kitchen • Plunge Pool & Sun Deck • Guest Suite",
      },
      {
        level: "First Floor",
        area: "190 Sq.M",
        highlights: "Master Bedroom with Lake Vista • Walk-In Teak Wardrobe • Travertine Ensuite Bath • Two Guest Ensuite Bedrooms • Family Den",
      },
      {
        level: "Terrace Lounge",
        area: "120 Sq.M",
        highlights: "Private Stargazing Deck • Timber Trellis Pergola • Barbecue Pantry • Hidden Solar PV Inverter & Rainwater Harvest Filtration",
      },
    ],
    distances: [
      { place: "Curtorim Lake & Water Bodies", time: "2 Mins (Walking)" },
      { place: "St. Alex 16th-Century Church", time: "4 Mins" },
      { place: "Margao Heritage Latin Quarter", time: "14 Mins" },
      { place: "Varca & Benaulim Silver Beaches", time: "18 Mins" },
      { place: "Dabolim International Airport", time: "38 Mins" },
    ],
  },
  "quinta-da-rosa": {
    title: "Quinta Da Rosa",
    subtitle: "Ancestral Heritage Manor • Salcete, South Goa",
    category: "HERITAGE MANOR",
    status: "Private Commission",
    price: "Price on Private Application",
    plot: "6,200 Sq.Ft",
    builtUp: "650 Sq.M",
    beds: "5 BHK + Staff Quarters",
    pools: "Private Courtyard Lap Pool (12m x 4m)",
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop",
    overview:
      "Quinta Da Rosa is an exquisite homage to grand Goan quintas of the 18th century, re-engineered for the modern collector. Built around a central peristyle courtyard filled with fragrant frangipani and laterite stone arches, this estate delivers peerless privacy and timeless gravitas.",
    gallery: [
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop",
    ],
    features: [
      { name: "Central Rajangan Courtyard", desc: "Open-to-sky courtyard with ancient laterite pillars and reflecting pond." },
      { name: "Hand-Painted Azulejos", desc: "Custom cobalt ceramic tiles framing entrances and veranda balcãos." },
      { name: "Vaulted Rosewood Suite", desc: "Soaring 5.4m master bedroom featuring original salvaged 19th-century timber trusses." },
      { name: "Private Olive & Palm Grove", desc: "Secluded 2,200 sq.ft private garden with mature coconut palms and night lighting." },
    ],
    floorplans: [
      {
        level: "Ground Floor",
        area: "340 Sq.M",
        highlights: "Grand Carriage Entrance • Courtyard Gallery • Ballroom Living Area • Library • Lap Pool & Pavilion",
      },
      {
        level: "First Floor",
        area: "310 Sq.M",
        highlights: "Master Presidential Suite with Balcony • 4 En-suite Chambers • Sunset Terrace overlooking paddy fields",
      },
    ],
    distances: [
      { place: "Curtorim Village Center", time: "3 Mins" },
      { place: "Margao Heritage Quarter", time: "12 Mins" },
      { place: "Colva & Benaulim Beaches", time: "16 Mins" },
      { place: "Dabolim Airport", time: "35 Mins" },
    ],
  },
  "casa-do-sol": {
    title: "Casa Do Sol",
    subtitle: "Ridge Sanctuary • Assagao, North Goa",
    category: "DESIGNER SANCTUARY",
    status: "Ready for Handover",
    price: "Price on Private Application",
    plot: "3,800 Sq.Ft",
    builtUp: "520 Sq.M",
    beds: "4 BHK + Study",
    pools: "Private Infinity Ridge Pool",
    heroImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2000&auto=format&fit=crop",
    overview:
      "Perched high on the Assagao forest ridge, Casa Do Sol fuses contemporary tropical minimalism with classical Portuguese forms. Expansive floor-to-ceiling louvers capture refreshing valley breezes while preserving absolute acoustic sanctuary.",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    ],
    features: [
      { name: "Ridge Infinity Edge Pool", desc: "Private travertine infinity pool suspended above the lush Assagao valley canopy." },
      { name: "Balcão Dining Terrace", desc: "Covered outdoor alfresco dining room framed by reclaimed teak beams." },
      { name: "Biometric Security Suite", desc: "High-level access control, dedicated concierge parking, and fiber infrastructure." },
      { name: "Solar Passive Shading", desc: "Deep architectural overhangs eliminating 70% of afternoon solar heat gain." },
    ],
    floorplans: [
      {
        level: "Garden Level",
        area: "190 Sq.M",
        highlights: "Double-Height Great Room • Open Kitchen • Guest Suite • Infinity Terrace & Sunken Lounge",
      },
      {
        level: "Upper Ridge Level",
        area: "190 Sq.M",
        highlights: "Master Suite with Forest View Bath • Study Room • 2 Guest Suites • Private Veranda",
      },
    ],
    distances: [
      { place: "Assagao Culinary Enclave", time: "4 Mins" },
      { place: "Anjuna & Vagator Beaches", time: "12 Mins" },
      { place: "Mopa International Airport", time: "30 Mins" },
      { place: "Panaji Latin Quarter", time: "35 Mins" },
    ],
  },
};

export default function ResidenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [resolvedParams, setResolvedParams] = React.useState<{ slug: string } | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const slug = resolvedParams?.slug || "natures-cove";
  const residence = RESIDENCES[slug] || RESIDENCES["natures-cove"];

  return (
    <main className="relative w-full min-h-screen bg-[#FAF8F5] text-[#121210]">
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header */}
      <section className="relative w-full h-[75vh] min-h-[580px] bg-[#08130F] text-[#FAF8F5] overflow-hidden flex flex-col justify-between pt-32 pb-10">
        <div className="absolute inset-0 z-0">
          <img
            src={residence.heroImage}
            alt={residence.title}
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08130F] via-transparent to-[#08130F]/40" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 max-w-[1720px] mx-auto flex items-center justify-between">
          <Link
            href="/villas"
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#FAF8F5]/80 hover:text-[#D49B44] transition-colors"
          >
            <ArrowLeftIcon size={14} />
            <span>Return to Portfolio</span>
          </Link>
          <span className="text-[10px] font-mono tracking-widest text-[#D49B44] uppercase">
            {residence.category}
          </span>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 max-w-[1720px] mx-auto mt-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#FAF8F5]/20">
            <div>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#D49B44] block mb-2 font-medium">
                {residence.subtitle}
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FAF8F5] font-light leading-none">
                {residence.title}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsConciergeOpen(true)}
                className="px-6 py-3 bg-[#B84A39] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#FAF8F5] hover:text-[#121210] transition-all rounded-sm flex items-center gap-2"
              >
                <span>Book Private Site Visit</span>
                <ArrowUpRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metric Specs Bar */}
      <section className="w-full bg-[#FAF8F5] border-b border-[#121210]/10 py-6">
        <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 text-xs font-sans">
            <div>
              <span className="block text-[#7E796E] text-[10px] uppercase tracking-wider mb-1">Configuration</span>
              <span className="font-medium text-[#121210]">{residence.beds}</span>
            </div>
            <div>
              <span className="block text-[#7E796E] text-[10px] uppercase tracking-wider mb-1">Plot Enclave</span>
              <span className="font-medium text-[#121210]">{residence.plot}</span>
            </div>
            <div>
              <span className="block text-[#7E796E] text-[10px] uppercase tracking-wider mb-1">Built-Up Area</span>
              <span className="font-medium text-[#121210]">{residence.builtUp}</span>
            </div>
            <div>
              <span className="block text-[#7E796E] text-[10px] uppercase tracking-wider mb-1">Pool Specification</span>
              <span className="font-medium text-[#121210]">{residence.pools}</span>
            </div>
            <div>
              <span className="block text-[#7E796E] text-[10px] uppercase tracking-wider mb-1">Construction Status</span>
              <span className="font-medium text-[#121210]">{residence.status}</span>
            </div>
            <div>
              <span className="block text-[#7E796E] text-[10px] uppercase tracking-wider mb-1">Commercials</span>
              <span className="font-medium text-[#B84A39]">{residence.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & 3D Interactive Spatial Viewer with Expansive Whitespace */}
      <section className="w-full py-36 md:py-48">
        <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32 items-start">
            <div className="lg:col-span-5">
              <span className="text-[10px] font-sans uppercase tracking-[0.32em] text-[#B84A39] block mb-4 font-semibold">
                ARCHITECTURAL INTENT • SUSEGAD LIVING
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#121210] font-light leading-tight mb-6">
                A sanctuary of quietude nestled in Goa.
              </h2>
              <p className="text-sm sm:text-base font-sans text-[#7E796E] leading-relaxed mb-6 font-light">
                {residence.overview}
              </p>
              <div className="p-6 bg-[#FAF8F5] border border-[#121210]/10 rounded-sm">
                <span className="block text-xs font-mono text-[#B84A39] uppercase mb-1">
                  HERITAGE CONSERVATION NOTE
                </span>
                <p className="text-xs font-sans text-[#7E796E] leading-relaxed">
                  Designed with strict setback compliance, passive rainwater ground aquifers,
                  and preservation of indigenous 100-year-old coconut and mango tree canopies.
                </p>
              </div>
            </div>

            {/* Embedded 3D Villa Viewer */}
            <div className="lg:col-span-7">
              <VillaViewer3D />
            </div>
          </div>

          {/* Architectural Features Grid */}
          <div className="mb-32">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#121210] mb-8 pb-4 border-b border-[#121210]/10">
              Goan Craftsmanship &amp; Finishes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {residence.features.map((feat: FeatureItem) => (
                <div key={feat.name} className="p-6 bg-white border border-[#121210]/10 rounded-sm">
                  <span className="w-6 h-6 rounded-full bg-[#B84A39]/10 text-[#B84A39] flex items-center justify-center text-xs mb-4">
                    <SparklesIcon size={12} />
                  </span>
                  <h4 className="font-serif text-lg text-[#121210] mb-2">{feat.name}</h4>
                  <p className="text-xs font-sans text-[#7E796E] leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Floorplan Levels Switcher */}
          <div className="mb-32 p-8 sm:p-14 bg-[#FAF8F5] border border-[#121210]/10 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#121210]/10">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B84A39] block mb-1">
                  SPATIAL LAYOUT BLUEPRINT
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#121210]">
                  Architectural Floorplans
                </h3>
              </div>

              {/* Level Toggles */}
              <div className="flex items-center gap-2">
                {residence.floorplans.map((fp: FloorplanItem, idx: number) => (
                  <button
                    key={fp.level}
                    type="button"
                    onClick={() => setActivePlan(idx)}
                    className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-sm transition-all ${
                      activePlan === idx
                        ? "bg-[#08130F] text-[#FAF8F5] font-semibold"
                        : "bg-white border border-[#121210]/10 text-[#7E796E] hover:text-[#121210]"
                    }`}
                  >
                    {fp.level}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono text-[#B84A39] block mb-2">
                  ENCLOSED AREA: {residence.floorplans[activePlan].area}
                </span>
                <h4 className="text-2xl font-serif text-[#121210] mb-4">
                  {residence.floorplans[activePlan].level}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-[#7E796E] leading-relaxed mb-6 font-light">
                  {residence.floorplans[activePlan].highlights}
                </p>
                <button
                  type="button"
                  onClick={() => setIsConciergeOpen(true)}
                  className="px-5 py-2.5 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] rounded-sm hover:bg-[#B84A39] hover:text-[#FAF8F5] transition-colors"
                >
                  Request Full High-Res Blueprints (PDF)
                </button>
              </div>

              {/* Schematic Blueprint Drawing Graphic */}
              <div className="lg:col-span-7 h-[320px] sm:h-[400px] bg-white border border-[#121210]/15 rounded-sm p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#7E796E] border-b border-[#121210]/10 pb-2">
                  <span>SCALE: 1:100 • ARCHITECTURAL SCHEMATIC</span>
                  <span>ORIENTATION: 15.2894° N (NORTH FACING)</span>
                </div>
                {/* SVG Blueprint Wireframe */}
                <svg className="w-full h-full my-auto opacity-70" viewBox="0 0 600 300" fill="none">
                  <rect x="20" y="20" width="560" height="260" stroke="#121210" strokeWidth="1.5" />
                  <rect x="40" y="40" width="240" height="150" stroke="#121210" strokeWidth="1" strokeDasharray="3 3" />
                  <rect x="300" y="40" width="260" height="220" stroke="#121210" strokeWidth="1" />
                  <rect x="60" y="210" width="160" height="70" fill="#B84A39" fillOpacity="0.15" stroke="#B84A39" strokeWidth="1" />
                  <text x="70" y="250" fill="#B84A39" fontSize="10" fontFamily="sans-serif">SUKABUMI PLUNGE POOL (6m x 3.2m)</text>
                  <text x="320" y="70" fill="#121210" fontSize="11" fontFamily="serif">LIVING ATRIUM (5.2m TEAK CEILING)</text>
                  <text x="60" y="70" fill="#7E796E" fontSize="10" fontFamily="sans-serif">TRADITIONAL BALCÃO</text>
                </svg>
                <div className="text-[10px] font-mono text-[#B84A39] text-right">
                  APPROVED UNDER GOA TOWN &amp; COUNTRY PLANNING ACT
                </div>
              </div>
            </div>
          </div>

          {/* Location Vicinity & Travel Distances */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B84A39] block mb-2">
                LOCATION &amp; GEOGRAPHY
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-[#121210] mb-4">
                {residence.subtitle}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#7E796E] leading-relaxed mb-8 font-light">
                Nestled within serene Goan village landscapes, shielded from transient traffic while offering seamless connectivity to international transit hubs and private dining enclaves.
              </p>
              <div className="flex flex-col divide-y divide-[#121210]/10">
                {residence.distances.map((d: DistanceItem) => (
                  <div key={d.place} className="py-3 flex justify-between items-center text-xs font-sans">
                    <span className="flex items-center gap-2 text-[#121210]">
                      <MapPinIcon size={14} className="text-[#B84A39]" />
                      <span>{d.place}</span>
                    </span>
                    <span className="font-mono text-[#7E796E]">{d.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] rounded-sm overflow-hidden bg-[#08130F]">
              <img
                src={residence.gallery[0]}
                alt="Goa Surroundings"
                className="w-full h-full object-cover object-center filter brightness-[0.9]"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#08130F]/80 backdrop-blur-md p-4 rounded-sm border border-[#FAF8F5]/10 text-xs font-sans text-[#FAF8F5] flex justify-between items-center">
                <span>Goa Heritage Zone</span>
                <span className="text-[#D49B44] font-mono">15.2894° N, 74.0247° E</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        preselectedResidence={`${residence.title} — ${residence.subtitle}`}
      />
    </main>
  );
}
