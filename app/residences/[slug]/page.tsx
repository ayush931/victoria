"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import EditorialScrollScene from "@/components/sections/EditorialScrollScene";
import Footer from "@/components/layout/Footer";
import ConciergeModal from "@/components/modals/ConciergeModal";
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
    heroImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
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
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
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
    heroImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1600&auto=format&fit=crop",
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
  const { slug } = use(params);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0);

  const residence = RESIDENCES[slug] || RESIDENCES["natures-cove"];

  return (
    <main id="main-content" className="relative w-full min-h-screen vx-site-page">
      <Navbar overHero onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Hero Header */}
      <section id="top" className="vx-dark relative w-full min-h-[max(620px,100svh)] bg-[var(--forest-deep)] text-[var(--on-dark)] overflow-hidden flex flex-col justify-between pt-32 pb-10">
        <div className="absolute inset-0 z-0">
          <img
            src={residence.heroImage}
            alt={residence.title}
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)] via-[var(--forest-deep)]/20 to-[var(--forest-deep)]/40" />
        </div>

        <div className="relative z-10 w-full site-wrap flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/villas"
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[var(--on-dark)]/80 hover:text-[var(--signal)] transition-colors"
          >
            <ArrowLeftIcon size={14} />
            <span>Return to Portfolio</span>
          </Link>
          <span className="text-[0.625rem] font-mono tracking-widest text-[var(--signal)] uppercase">
            {residence.category}
          </span>
        </div>

        <div className="relative z-10 w-full site-wrap mt-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--on-dark)]/20">
            <div className="min-w-0">
              <span className="text-[0.625rem] sm:text-xs font-sans uppercase tracking-[0.28em] text-[var(--signal)] block mb-3 font-medium">
                {residence.subtitle}
              </span>
              <h1 className="text-[clamp(2.75rem,6.2vw,7.5rem)] font-serif text-[var(--on-dark)] font-light leading-[0.92] text-balance">
                {residence.title}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsConciergeOpen(true)}
                className="px-6 py-3.5 bg-[var(--signal)] text-[var(--forest-deep)] text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--on-dark)] focus-visible:outline-[var(--on-dark)] transition-colors rounded-full flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Book Private Site Visit</span>
                <ArrowUpRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metric Specs Bar */}
      <section className="w-full bg-[var(--paper)] border-b border-[var(--ink)]/10 py-6">
        <div className="w-full site-wrap">
          <div className="residence-specs text-xs font-sans">
            <div>
              <span className="block text-[var(--ink-soft)] text-[0.625rem] uppercase tracking-wider mb-1">Configuration</span>
              <span className="font-medium text-[var(--ink)]">{residence.beds}</span>
            </div>
            <div>
              <span className="block text-[var(--ink-soft)] text-[0.625rem] uppercase tracking-wider mb-1">Plot Enclave</span>
              <span className="font-medium text-[var(--ink)]">{residence.plot}</span>
            </div>
            <div>
              <span className="block text-[var(--ink-soft)] text-[0.625rem] uppercase tracking-wider mb-1">Built-Up Area</span>
              <span className="font-medium text-[var(--ink)]">{residence.builtUp}</span>
            </div>
            <div>
              <span className="block text-[var(--ink-soft)] text-[0.625rem] uppercase tracking-wider mb-1">Pool Specification</span>
              <span className="font-medium text-[var(--ink)]">{residence.pools}</span>
            </div>
            <div>
              <span className="block text-[var(--ink-soft)] text-[0.625rem] uppercase tracking-wider mb-1">Construction Status</span>
              <span className="font-medium text-[var(--ink)]">{residence.status}</span>
            </div>
            <div>
              <span className="block text-[var(--ink-soft)] text-[0.625rem] uppercase tracking-wider mb-1">Commercials</span>
              <span className="font-medium text-[var(--accent-text)]">{residence.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Cinematic Spatial Showcase with Expansive Whitespace */}
      <section className="w-full py-36 md:py-48">
        <div className="w-full site-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32 items-start">
            <div className="lg:col-span-5">
              <span className="text-[0.625rem] font-sans uppercase tracking-[0.32em] text-[var(--accent-text)] block mb-4 font-semibold">
                ARCHITECTURAL INTENT • SUSEGAD LIVING
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[var(--ink)] font-light leading-tight mb-6">
                A sanctuary of quietude nestled in Goa.
              </h2>
              <p className="text-sm sm:text-base font-sans text-[var(--ink-soft)] leading-relaxed mb-6 font-light">
                {residence.overview}
              </p>
              <div className="p-6 bg-[var(--paper)] border border-[var(--ink)]/10 rounded-sm">
                <span className="block text-xs font-mono text-[var(--accent-text)] uppercase mb-1">
                  HERITAGE CONSERVATION NOTE
                </span>
                <p className="text-xs font-sans text-[var(--ink-soft)] leading-relaxed">
                  Designed with strict setback compliance, passive rainwater ground aquifers,
                  and preservation of indigenous 100-year-old coconut and mango tree canopies.
                </p>
              </div>
            </div>

            {/* Cinematic Spatial Showcase */}
            <div className="lg:col-span-7">
              <div className="residence-media relative overflow-hidden rounded-sm bg-[var(--forest)]">
                <img
                  src={residence.gallery[0] || residence.heroImage}
                  alt={residence.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center goa-grade"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="vx-dark absolute bottom-6 left-6 bg-[var(--forest)]/80 backdrop-blur-md px-4 py-2 text-[0.625rem] font-sans tracking-[0.22em] uppercase text-[var(--on-dark)] rounded-sm border border-[var(--on-dark)]/10">
                  {residence.title} • {residence.category}
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Features Grid */}
          <div className="mb-32">
            <h3 className="text-2xl sm:text-3xl font-serif text-[var(--ink)] mb-8 pb-4 border-b border-[var(--ink)]/10">
              Goan Craftsmanship &amp; Finishes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {residence.features.map((feat: FeatureItem) => (
                <div key={feat.name} className="p-6 bg-[var(--paper-raised)] border border-[var(--ink)]/10 rounded-sm">
                  <span className="w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent-text)] flex items-center justify-center text-xs mb-4">
                    <SparklesIcon size={12} />
                  </span>
                  <h4 className="font-serif text-lg text-[var(--ink)] mb-2">{feat.name}</h4>
                  <p className="text-xs font-sans text-[var(--ink-soft)] leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Floorplan Levels Switcher */}
          <div className="mb-32 p-8 sm:p-14 bg-[var(--paper)] border border-[var(--ink)]/10 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-[var(--ink)]/10">
              <div>
                <span className="text-[0.625rem] font-sans uppercase tracking-[0.28em] text-[var(--accent-text)] block mb-1">
                  SPATIAL LAYOUT BLUEPRINT
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[var(--ink)]">
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
                    aria-pressed={activePlan === idx}
                    className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-sm transition-colors ${
                      activePlan === idx
                        ? "bg-[var(--forest-deep)] text-[var(--on-dark)] font-semibold"
                        : "bg-[var(--paper-raised)] border border-[var(--ink)]/10 text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {fp.level}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-2">
                  ENCLOSED AREA: {residence.floorplans[activePlan].area}
                </span>
                <h4 className="text-2xl font-serif text-[var(--ink)] mb-4">
                  {residence.floorplans[activePlan].level}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-[var(--ink-soft)] leading-relaxed mb-6 font-light">
                  {residence.floorplans[activePlan].highlights}
                </p>
                <button
                  type="button"
                  onClick={() => setIsConciergeOpen(true)}
                  className="vx-on-dark px-5 py-2.5 bg-[var(--forest-deep)] text-[var(--on-dark)] text-xs font-sans uppercase tracking-[0.2em] rounded-sm hover:bg-[var(--accent)] hover:text-[var(--on-dark)] focus-visible:outline-[var(--on-dark)] transition-colors"
                >
                  Request Full High-Res Blueprints (PDF)
                </button>
              </div>

              {/* Schematic Blueprint Drawing Graphic */}
              <div className="residence-plan lg:col-span-7 bg-[var(--paper-raised)] border border-[var(--ink)]/15 rounded-sm p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex flex-wrap justify-between gap-1 items-center text-[0.625rem] font-mono text-[var(--ink-soft)] border-b border-[var(--ink)]/10 pb-2">
                  <span>SCALE: 1:100 • ARCHITECTURAL SCHEMATIC</span>
                  <span>ORIENTATION: 15.2894° N (NORTH FACING)</span>
                </div>
                {/* SVG Blueprint Wireframe */}
                <svg className="w-full h-full my-auto opacity-70" viewBox="0 0 600 300" fill="none">
                  <rect x="20" y="20" width="560" height="260" stroke="var(--ink)" strokeWidth="1.5" />
                  <rect x="40" y="40" width="240" height="150" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 3" />
                  <rect x="300" y="40" width="260" height="220" stroke="var(--ink)" strokeWidth="1" />
                  <rect x="60" y="210" width="160" height="70" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
                  <text x="70" y="250" fill="var(--accent-text)" fontSize="10" fontFamily="sans-serif">SUKABUMI PLUNGE POOL (6m x 3.2m)</text>
                  <text x="320" y="70" fill="var(--ink)" fontSize="11" fontFamily="serif">LIVING ATRIUM (5.2m TEAK CEILING)</text>
                  <text x="60" y="70" fill="var(--ink-soft)" fontSize="10" fontFamily="sans-serif">TRADITIONAL BALCÃO</text>
                </svg>
                <div className="text-[0.625rem] font-mono text-[var(--accent-text)] text-right">
                  APPROVED UNDER GOA TOWN &amp; COUNTRY PLANNING ACT
                </div>
              </div>
            </div>
          </div>

          {/* Location Vicinity & Travel Distances */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <span className="text-[0.625rem] font-sans uppercase tracking-[0.28em] text-[var(--accent-text)] block mb-2">
                LOCATION &amp; GEOGRAPHY
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-[var(--ink)] mb-4">
                {residence.subtitle}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[var(--ink-soft)] leading-relaxed mb-8 font-light">
                Nestled within serene Goan village landscapes, shielded from transient traffic while offering seamless connectivity to international transit hubs and private dining enclaves.
              </p>
              <div className="flex flex-col divide-y divide-[var(--ink)]/10">
                {residence.distances.map((d: DistanceItem) => (
                  <div key={d.place} className="py-3 flex justify-between items-center text-xs font-sans">
                    <span className="flex items-center gap-2 text-[var(--ink)]">
                      <MapPinIcon size={14} className="text-[var(--accent-text)]" />
                      <span>{d.place}</span>
                    </span>
                    <span className="font-mono text-[var(--ink-soft)]">{d.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="residence-map lg:col-span-6 relative rounded-sm overflow-hidden bg-[var(--forest-deep)]">
              <img
                src={residence.gallery[0]}
                alt={`Landscape around ${residence.title}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center filter brightness-[0.9]"
              />
              <div className="vx-dark absolute bottom-6 left-6 right-6 bg-[var(--forest-deep)]/80 backdrop-blur-md p-4 rounded-sm border border-[var(--on-dark)]/10 text-xs font-sans text-[var(--on-dark)] flex flex-wrap justify-between items-center gap-2">
                <span>Goa Heritage Zone</span>
                <span className="text-[var(--signal)] font-mono">15.2894° N, 74.0247° E</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialScrollScene
        variant="panels"
        label="Look a little closer"
        title="Picture your"
        emphasis="everyday here."
        description={`Explore the mood and spaces behind ${residence.title}. Ask our team for current project photography, plans and specifications.`}
        word="make it home."
        images={[
          { src: residence.gallery[0], alt: 'Architectural inspiration for a home', caption: 'The spaces' },
          { src: residence.gallery[1], alt: 'Residential lifestyle inspiration', caption: 'The atmosphere' },
          { src: residence.gallery[2], alt: 'Architecture and surroundings inspiration', caption: 'The details' },
        ]}
      />

      <Footer />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        preselectedResidence={`${residence.title} — ${residence.subtitle}`}
      />
    </main>
  );
}
