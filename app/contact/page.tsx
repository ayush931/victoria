"use client";

import React from "react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import ConciergeModal from "@/components/modals/ConciergeModal";
import { useEnquiry } from "@/lib/enquiry";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { ArrowUpRightIcon, PhoneIcon } from "@/components/ui/Icons";

export default function ContactPage() {
  const enquiry = useEnquiry();

  return (
    <main className="relative w-full min-h-screen vx-site-page">
      <Navbar />

      {/* Hero Header with Expansive Whitespace */}
      <PageHero
        index="06"
        eyebrow="VIP Concierge & Ateliers in Goa"
        title={<>Private Consultation <em className="text-[#B84A39]">& Concierge</em></>}
        description="We operate with the discretion of a private family office. Schedule a bespoke site visit to Nature's Cove in Curtorim, or arrange a private meeting with our principal architects in Margao and Assagao."
        meta={["Curtorim Atelier", "Margao Studio", "Verna HQ", "09:00–20:00 IST"]}
      />

      {/* Main Content Split with Generous Spacing */}
      <section className="w-full py-28 md:py-36 px-6 md:px-12 max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28 items-start">
          {/* Left Column: Comprehensive VIP Scheduler Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#121210]/10 rounded-sm shadow-sm">
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B84A39] block mb-3 font-semibold">
              SCHEDULE PRIVATE VIEWING
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#121210] mb-8 font-light">
              Bespoke Site Appointment
            </h2>

            <EnquiryForm />
          </div>

          {/* Right Column: Three Ateliers & Direct Contact */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Atelier 1: Curtorim */}
            <div className="p-8 bg-white border border-[#121210]/10 rounded-sm">
              <span className="text-[10px] font-mono text-[#B84A39] uppercase block mb-1 font-semibold">
                ATELIER 01 • FLAGSHIP
              </span>
              <h3 className="text-xl font-serif text-[#121210] mb-2">
                Curtorim Lake Atelier
              </h3>
              <p className="text-xs font-sans text-[#7E796E] leading-relaxed mb-3">
                Nature&apos;s Cove Enclave, Curtorim Waterway Edge, Salcete Taluka, South Goa 403701
              </p>
              <span className="text-[10px] font-mono text-[#121210]/50 block">
                Coordinates: 15.2894° N, 74.0247° E
              </span>
            </div>

            {/* Atelier 2: Margao */}
            <div className="p-8 bg-white border border-[#121210]/10 rounded-sm">
              <span className="text-[10px] font-mono text-[#B84A39] uppercase block mb-1 font-semibold">
                ATELIER 02 • DESIGN STUDIO
              </span>
              <h3 className="text-xl font-serif text-[#121210] mb-2">
                Margao Architectural Studio
              </h3>
              <p className="text-xs font-sans text-[#7E796E] leading-relaxed mb-3">
                Quinta Heritage Suite, Near Holy Spirit Church, Margao, South Goa 403601
              </p>
              <span className="text-[10px] font-mono text-[#121210]/50 block">
                By Private Appointment Only
              </span>
            </div>

            {/* Atelier 3: Verna */}
            <div className="p-8 bg-white border border-[#121210]/10 rounded-sm">
              <span className="text-[10px] font-mono text-[#B84A39] uppercase block mb-1 font-semibold">
                ATELIER 03 • ENGINEERING &amp; RERA
              </span>
              <h3 className="text-xl font-serif text-[#121210] mb-2">
                Verna Engineering HQ
              </h3>
              <p className="text-xs font-sans text-[#7E796E] leading-relaxed mb-3">
                Victorino Projects Tower, Phase II, Verna Industrial Hub, South Goa 403722
              </p>
              <span className="text-[10px] font-mono text-[#B84A39] block font-semibold">
                Goa RERA Reg: PRGO02241982
              </span>
            </div>

            {/* Direct WhatsApp Concierge */}
            <a
              href="https://wa.me/919822144550?text=Hello%20Victorino%20Luxury%20Homes,%20I%20would%20like%20to%20schedule%20a%20private%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-[#08130F] text-[#FAF8F5] rounded-sm flex items-center justify-between hover:bg-[#D49B44] hover:text-[#08130F] transition-all group"
            >
              <div className="flex items-center gap-3">
                <PhoneIcon size={18} className="text-[#D49B44] group-hover:text-current" />
                <div>
                  <span className="text-xs font-sans uppercase tracking-wider block font-medium">
                    Direct VIP WhatsApp Concierge
                  </span>
                  <span className="text-[11px] text-current/70">
                    +91 98221 44550 (Instant Response)
                  </span>
                </div>
              </div>
              <ArrowUpRightIcon size={16} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ConciergeModal isOpen={enquiry.isOpen} onClose={enquiry.close} preselectedResidence={enquiry.residence} />
    </main>
  );
}

