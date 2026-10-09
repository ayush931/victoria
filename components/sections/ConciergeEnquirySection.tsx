"use client";

import React, { useState } from "react";
import { ArrowUpRightIcon, CheckIcon, PhoneIcon, MailIcon, MapPinIcon } from "@/components/ui/Icons";

export default function ConciergeEnquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    residence: "Nature's Cove — Curtorim",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="enquire" className="w-full py-36 md:py-48 bg-[#FAF8F5] text-[#121210]">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28">
          {/* Left Column: Refined Concierge Enquiry Form with Generous Space */}
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#B84A39] block mb-4 font-semibold">
              CONCIERGE DESK • PRIVATE GOAN ENQUIRY
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#121210] font-light mb-6">
              Initiate a Private Dialogue
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#7A756B] leading-relaxed max-w-xl mb-14 font-light">
              For patrons seeking second homes, ancestral row villas, or bespoke architectural commissions
              in Curtorim, Assagao, and Margao. We value your privacy and respond with prompt discretion.
            </p>

            {submitted ? (
              <div className="p-8 bg-white border border-[#B38F5B] rounded-sm text-center">
                <div className="w-12 h-12 rounded-full bg-[#B38F5B]/10 text-[#B38F5B] flex items-center justify-center mx-auto mb-4">
                  <CheckIcon size={24} />
                </div>
                <h3 className="text-2xl font-serif text-[#121210] mb-2">
                  Thank You For Reaching Out
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#7E796E] max-w-md mx-auto">
                  Our Senior Concierge has received your enquiry and will connect with you via your preferred channel within two hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#121210]/70 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Alistair Fernandes"
                      className="w-full px-4 py-3 bg-white border border-[#121210]/15 text-sm font-sans focus:outline-none focus:border-[#B38F5B] transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#121210]/70 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="patron@domain.com"
                      className="w-full px-4 py-3 bg-white border border-[#121210]/15 text-sm font-sans focus:outline-none focus:border-[#B38F5B] transition-colors rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#121210]/70 mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 / +44 / +971"
                      className="w-full px-4 py-3 bg-white border border-[#121210]/15 text-sm font-sans focus:outline-none focus:border-[#B38F5B] transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#121210]/70 mb-1.5">
                      Residence of Interest
                    </label>
                    <select
                      value={form.residence}
                      onChange={(e) => setForm({ ...form, residence: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#121210]/15 text-sm font-sans focus:outline-none focus:border-[#B38F5B] transition-colors rounded-sm"
                    >
                      <option value="Nature's Cove — Curtorim">Nature&apos;s Cove (13 Bespoke Row Villas)</option>
                      <option value="Quinta Da Rosa — Curtorim">Quinta Da Rosa (Heritage Manor)</option>
                      <option value="Casa Do Sol — Verna">Casa Do Sol (Boutique Home)</option>
                      <option value="Custom Architectural Commission">Custom Architectural Commission</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider text-[#121210]/70 mb-1.5">
                    Your Requirements &amp; Preferred Timeframe
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your spatial needs, timeline for possession, or specific village preferences..."
                    className="w-full px-4 py-3 bg-white border border-[#121210]/15 text-sm font-sans focus:outline-none focus:border-[#B38F5B] transition-colors rounded-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-[#B38F5B] hover:text-[#08130F] transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
                  >
                    <span>Submit Private Enquiry</span>
                    <ArrowUpRightIcon size={14} />
                  </button>
                  <span className="text-[11px] font-sans text-[#7E796E]">
                    Confidentiality assured under RERA Goa PRGO02241982
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Address, Telephone & Muted Map Visual */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-[#FAF8F5] p-8 sm:p-10 border border-[#121210]/10 rounded-sm mb-8">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B38F5B] block mb-6 font-semibold">
                HEAD ATELIER &amp; CONCIERGE DESK
              </span>

              <div className="flex flex-col gap-6 text-xs font-sans">
                <div className="flex items-start gap-4">
                  <MapPinIcon size={18} className="text-[#B38F5B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#121210] mb-1">
                      Curtorim Lake Enclave
                    </h4>
                    <p className="text-[#7E796E] leading-relaxed">
                      Nature&apos;s Cove Atelier, Salcete Taluka,<br />
                      South Goa 403701, India
                    </p>
                    <span className="text-[10px] font-mono text-[#B38F5B] mt-1 block">
                      Coordinates: 15.2894° N, 74.0247° E
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-[#121210]/10 pt-4">
                  <PhoneIcon size={18} className="text-[#B38F5B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#121210] mb-1">
                      Direct Concierge Line
                    </h4>
                    <p className="text-[#7E796E]">
                      +91 98221 44550 / +91 832 278 1900
                    </p>
                    <span className="text-[10px] font-sans text-[#7E796E]/80">
                      Available daily: 09:00 – 20:00 IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-[#121210]/10 pt-4">
                  <MailIcon size={18} className="text-[#B38F5B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#121210] mb-1">
                      Electronic Correspondence
                    </h4>
                    <p className="text-[#7E796E]">
                      concierge@victorinohomes.com
                    </p>
                    <p className="text-[#7E796E]">
                      vip-desk@victorinohomes.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural Location Map Card */}
            <div className="relative h-[220px] rounded-sm overflow-hidden bg-[#08130F] border border-[#121210]/10">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                alt="Curtorim, South Goa Location Map"
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.2] opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08130F] via-[#08130F]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B38F5B] animate-ping" />
                  <span className="font-medium">Nature&apos;s Cove, Curtorim</span>
                </div>
                <span className="text-[10px] font-mono text-[#C5A880]">SOUTH GOA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
