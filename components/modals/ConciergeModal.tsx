"use client";

import React, { useState, useEffect } from "react";
import { CloseIcon, CheckIcon, ArrowUpRightIcon, PhoneIcon } from "@/components/ui/Icons";

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedResidence?: string;
}

export default function ConciergeModal({
  isOpen,
  onClose,
  preselectedResidence = "Nature's Cove — Curtorim",
}: ConciergeModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedResidence, setSelectedResidence] = useState<string | null>(null);
  const activeResidence = selectedResidence ?? preselectedResidence;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "India",
    visitDate: "",
    airportChauffeur: false,
    message: "",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulate success
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-[#08130F]/85 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#F7F5F0] text-[#121210] border border-[#C5A880]/30 shadow-2xl p-6 sm:p-10 rounded-sm z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#121210]/60 hover:text-[#121210] hover:rotate-90 transition-all duration-300"
          aria-label="Close modal"
        >
          <CloseIcon size={20} />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#D49B44]/10 border border-[#D49B44] flex items-center justify-center text-[#D49B44] mb-6">
              <CheckIcon size={28} />
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B84A39] mb-2 block font-semibold">
              PRIVATE CONCIERGE CONFIRMED
            </span>
            <h3 className="text-3xl font-serif text-[#121210] mb-3">
              We Await Your Visit
            </h3>
            <p className="text-sm font-sans text-[#7E796E] max-w-md mx-auto mb-8 leading-relaxed">
              Our Senior Principal Concierge will contact you within two hours to
              coordinate your bespoke private viewing at {activeResidence} in South Goa.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] rounded-full hover:bg-[#B84A39] transition-colors"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B84A39] block mb-2 font-semibold">
                PRIVATE VIEWING &amp; BESPOKE CONSULTATION
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-[#121210] mb-3">
                Schedule a Private Encounter
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#7E796E] leading-relaxed">
                Experience the quiet serenity of Curtorim and inspect our row villa craftsmanship in person.
                Discretion guaranteed for all HNI &amp; NRI patrons.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="lux-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lord / Lady / Dr. / Mr. / Ms."
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="concierge@residence.com"
                    className="lux-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="lux-label">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98221 00000 / +44 / +971"
                    className="lux-input"
                  />
                </div>
                <div>
                  <label className="lux-label">
                    Residence of Interest
                  </label>
                  <select
                    value={activeResidence}
                    onChange={(e) => setSelectedResidence(e.target.value)}
                    className="lux-input"
                  >
                    <option value="Nature's Cove — Curtorim">Nature&apos;s Cove (13 Row Villas — Curtorim)</option>
                    <option value="Quinta Da Rosa — Curtorim">Quinta Da Rosa (Heritage Villa Estate)</option>
                    <option value="Casa Do Sol — Verna">Casa Do Sol (Boutique Hillside Home)</option>
                    <option value="Custom Architectural Commission">Custom Architectural Commission</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="lux-label">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="lux-input"
                  />
                </div>
                <div>
                  <label className="lux-label">
                    Current Country of Residence
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="India / UAE / UK / USA / Singapore"
                    className="lux-input"
                  />
                </div>
              </div>

              {/* Chauffeur checkbox */}
              <label className="flex items-center gap-3 cursor-pointer pt-2 text-xs font-sans text-[#121210]/80">
                <input
                  type="checkbox"
                  checked={formData.airportChauffeur}
                  onChange={(e) => setFormData({ ...formData, airportChauffeur: e.target.checked })}
                  className="rounded border-[#121210]/30 text-[#D49B44] focus:ring-[#D49B44]"
                />
                <span>
                  Request complimentary private airport chauffeur transfer from Dabolim or Mopa Airport to Curtorim site
                </span>
              </label>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#08130F] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-[#D49B44] hover:text-[#08130F] transition-all duration-300 flex items-center justify-center gap-2 rounded-full"
                >
                  <span>Request Private Viewing</span>
                  <ArrowUpRightIcon size={14} />
                </button>

                <a
                  href="https://wa.me/919822100000?text=Hello%20Victorino%20Luxury%20Homes,%20I%20am%20interested%20in%20a%20private%20consultation%20for%20Nature's%20Cove%20Curtorim."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-sans tracking-wider text-[#121210]/70 hover:text-[#B84A39] transition-colors"
                >
                  <PhoneIcon size={13} />
                  <span>Direct WhatsApp VIP Concierge</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
