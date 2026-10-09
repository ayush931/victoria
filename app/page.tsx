"use client";

import React, { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import GoaAtmosphereVideoSection from "@/components/sections/GoaAtmosphereVideoSection";
import HeritageMatrixSection from "@/components/sections/HeritageMatrixSection";
import OfficesSection from "@/components/sections/OfficesSection";
import SignatureProjectSection from "@/components/sections/SignatureProjectSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import MaterialsPhilosophySection from "@/components/sections/MaterialsPhilosophySection";
import SketchSlider from "@/components/effects/SketchSlider";
import ArchitecturalCompass from "@/components/effects/ArchitecturalCompass";
import WorksGridSection from "@/components/sections/WorksGridSection";
import PatronsSection from "@/components/sections/PatronsSection";
import JournalSection from "@/components/sections/JournalSection";
import ConciergeEnquirySection from "@/components/sections/ConciergeEnquirySection";
import ConciergeModal from "@/components/modals/ConciergeModal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Marquee from "@/components/effects/Marquee";
import { CoastalSideScrollSection, LayeredLivingSection } from "@/components/sections/ScrollJourneySections";

export default function HomePage() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-[#FAF8F5] text-[#121210]">
      {/* Fixed Luxury Navigation */}
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* 1. Hero with Light Goa Video Background */}
      <HeroSection onOpenConcierge={() => setIsConciergeOpen(true)} />

      <Marquee
        items={["Nature's Cove — Curtorim", "Susegad Living", "Hand-Dressed Laterite", "Balcão Verandas", "Goa RERA Approved"]}
      />

      {/* 2. Introduction: Susegad Philosophy & Architectural Restraint */}
      <IntroSection />

      {/* 3. Goa Atmosphere Cinematic Video Reel & Coastal Ambience */}
      <GoaAtmosphereVideoSection />

      {/* Scroll-driven journey across Goa's landscape and shoreline */}
      <CoastalSideScrollSection />

      {/* 4. Heritage Matrix: Founded 2014 in Margao, Accolades & Press */}
      <HeritageMatrixSection />

      {/* 4. Bureau Directory: Curtorim, Margao, Verna */}
      <OfficesSection onEnquire={() => setIsConciergeOpen(true)} />

      {/* 5. Flagship Signature: Nature's Cove with 3D Villa Viewer */}
      <SignatureProjectSection onOpenConcierge={() => setIsConciergeOpen(true)} />

      <Marquee
        dark
        items={["13 Lakefront Row Villas", "Sukabumi Pools", "Burma Teak Rafters", "Oyster-Shell Light", "Private Concierge"]}
      />

      <LayeredLivingSection />

      {/* 6. Collections: Luxury Villas & Premium Homes */}
      <CollectionsSection />

      {/* 7. Precision in Development: Sketch to Reality Architectural Slider */}
      <SketchSlider
        title="From Sketch to Sanctuary"
        caption="Early-stage charcoal outlines distilled into precise Goan architectural frameworks."
      />

      {/* 8. Materials & Tactile Philosophy: Deep Green Section */}
      <MaterialsPhilosophySection />

      {/* 8. Kononenko Circular Radial Gauge: 8 Passive Climate Axioms */}
      <ArchitecturalCompass />

      {/* 9. Selected Works: 15-Column Asymmetric Grid with Dual Sliding Text */}
      <WorksGridSection />

      {/* 10. Patrons Voices: Discerning Owners in South Goa */}
      <PatronsSection />

      {/* 11. Journal: Architectural Writings */}
      <JournalSection />

      {/* 12. Private Concierge & VIP Viewing */}
      <ConciergeEnquirySection />

      <Marquee
        items={["Book a Private Viewing", "Curtorim • Margao • Assagao", "Architects of Dreams", "Designers of Reality"]}
        speed={32}
      />

      {/* Grand Editorial Footer */}
      <Footer />

      {/* Global VIP Concierge Booking Modal */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        preselectedResidence="Nature's Cove — Curtorim"
      />
    </main>
  );
}
