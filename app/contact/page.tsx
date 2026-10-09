"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { ArrowUpRightIcon, CheckIcon, PhoneIcon } from "@/components/ui/Icons";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "India",
    residence: "Nature's Cove — Curtorim",
    visitDate: "",
    chauffeur: true,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative w-full min-h-screen bg-[#FAF8F5] text-[#121210]">
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

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#D49B44]/10 border border-[#D49B44] flex items-center justify-center text-[#D49B44] mb-6">
                  <CheckIcon size={28} />
                </div>
                <h3 className="text-3xl font-serif text-[#121210] mb-3">
                  Appointment Requested
                </h3>
                <p className="text-sm font-sans text-[#7E796E] max-w-md mx-auto mb-8 leading-relaxed">
                  Our Senior Private Concierge will reach out via WhatsApp and phone within two hours to
                  finalize your private itinerary, site visit timing, and chauffeur arrangements.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] rounded-full hover:bg-[#B84A39] transition-colors"
                >
                  Edit Information
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="lux-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Alistair Fernandes"
                      className="lux-input"
                    />
                  </div>
                  <div>
                    <label className="lux-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="patron@domain.com"
                      className="lux-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="lux-label">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 / +44 / +971"
                      className="lux-input"
                    />
                  </div>
                  <div>
                    <label className="lux-label">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      placeholder="India / UAE / UK / Singapore"
                      className="lux-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="lux-label">
                      Residence of Interest
                    </label>
                    <select
                      value={form.residence}
                      onChange={(e) => setForm({ ...form, residence: e.target.value })}
                      className="lux-input"
                    >
                      <option value="Nature's Cove — Curtorim">Nature&apos;s Cove (13 Bespoke Row Villas)</option>
                      <option value="Quinta Da Rosa — Curtorim">Quinta Da Rosa (Heritage Manor)</option>
                      <option value="Casa Do Sol — Verna">Casa Do Sol (Boutique Home)</option>
                      <option value="Custom Architectural Commission">Custom Architectural Commission</option>
                    </select>
                  </div>
                  <div>
                    <label className="lux-label">
                      Preferred Date of Visit
                    </label>
                    <input
                      type="date"
                      value={form.visitDate}
                      onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
                      className="lux-input"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer pt-2 text-xs font-sans text-[#121210]/80">
                  <input
                    type="checkbox"
                    checked={form.chauffeur}
                    onChange={(e) => setForm({ ...form, chauffeur: e.target.checked })}
                    className="rounded border-[#121210]/30 text-[#D49B44] focus:ring-[#D49B44]"
                  />
                  <span>
                    Request private airport chauffeur pickup from Dabolim (GOI) or Mopa (GOX) International Airport
                  </span>
                </label>

                <div>
                  <label className="lux-label">
                    Specific Architectural Questions / Confidential Requests
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Share any details about your second-home requirements, family preferences, or investment timeline..."
                    className="lux-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.25em] font-medium hover:bg-[#D49B44] hover:text-[#08130F] transition-all rounded-full flex items-center justify-center gap-2"
                >
                  <span>Confirm Private Viewing Request</span>
                  <ArrowUpRightIcon size={14} />
                </button>
              </form>
            )}
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
    </main>
  );
}

