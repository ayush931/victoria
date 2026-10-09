"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownIcon } from "@/components/ui/Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0C1A14] text-[#FAF8F5] pt-36 pb-16 overflow-hidden border-t border-[#FAF8F5]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto flex flex-col justify-between min-h-[600px]">
        {/* Top Bureau Directory Grid with Generous Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-24 border-b border-[#FAF8F5]/10">
          {/* Col 1-4: Bureau Identity & Brand Line */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.32em] text-[#D49B44] block mb-4 font-semibold">
                ARCHITECTS OF DREAMS • DESIGNERS OF REALITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] max-w-sm mb-6 leading-tight">
                Homes conceived as heirlooms. Built once, cherished for generations.
              </h3>
            </div>
            <p className="text-xs font-sans text-[#FAF8F5]/60 max-w-xs leading-relaxed font-light">
              Victorino Luxury Homes is a boutique architectural development bureau
              born in Goa, operating with quiet restraint across historic enclaves since 2014.
            </p>
          </div>

          {/* Col 5-6: Curtorim Flagship Atelier */}
          <div className="lg:col-span-2 flex flex-col gap-3 text-xs font-sans">
            <span className="font-serif text-sm text-[#D49B44] tracking-wide block mb-1">
              Curtorim Flagship
            </span>
            <p className="text-[#FAF8F5]/70 leading-relaxed font-light">
              Nature&apos;s Cove Atelier<br />
              Curtorim Lake Enclave<br />
              Salcete, Goa 403701
            </p>
            <p className="text-[#FAF8F5]/50 text-[11px] mt-2 font-mono">
              15.2894° N, 74.0247° E
            </p>
          </div>

          {/* Col 7-8: Margao Design Studio */}
          <div className="lg:col-span-2 flex flex-col gap-3 text-xs font-sans">
            <span className="font-serif text-sm text-[#D49B44] tracking-wide block mb-1">
              Margao Studio
            </span>
            <p className="text-[#FAF8F5]/70 leading-relaxed font-light">
              Quinta Heritage Office<br />
              Near Holy Spirit Church<br />
              Margao, Goa 403601
            </p>
            <p className="text-[#FAF8F5]/50 text-[11px] mt-2 font-mono">
              By Private Appointment
            </p>
          </div>

          {/* Col 9-10: Verna Engineering HQ */}
          <div className="lg:col-span-2 flex flex-col gap-3 text-xs font-sans">
            <span className="font-serif text-sm text-[#D49B44] tracking-wide block mb-1">
              Verna Engineering
            </span>
            <p className="text-[#FAF8F5]/70 leading-relaxed font-light">
              Victorino Projects HQ<br />
              Phase II, Verna Industrial<br />
              Goa 403722
            </p>
            <p className="text-[#FAF8F5]/50 text-[11px] mt-2 font-mono">
              RERA Goa: PRGO02241982
            </p>
          </div>

          {/* Col 11-12: Navigation & Concierge */}
          <div className="lg:col-span-2 flex flex-col gap-3 text-xs font-sans">
            <span className="font-serif text-sm text-[#D49B44] tracking-wide block mb-1">
              Portfolios
            </span>
            <ul className="flex flex-col gap-2 text-[#FAF8F5]/80 font-light">
              <li>
                <Link href="/residences/natures-cove" className="arch-link hover:text-[#D49B44]">
                  Nature&apos;s Cove (Curtorim)
                </Link>
              </li>
              <li>
                <Link href="/villas" className="arch-link hover:text-[#D49B44]">
                  Goan Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/premium-homes" className="arch-link hover:text-[#D49B44]">
                  Heritage Manors
                </Link>
              </li>
              <li>
                <Link href="/about" className="arch-link hover:text-[#D49B44]">
                  The 10-Year Craft Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="arch-link hover:text-[#D49B44]">
                  Private Concierge
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Brand Display Title */}
        <div className="py-20 md:py-28 text-center select-none overflow-hidden">
          <h2 className="text-[17vw] font-serif font-light tracking-[-0.04em] text-[#FAF8F5]/90 leading-[0.8] hover:text-[#D49B44] transition-colors duration-700 cursor-default">
            VICTORINO
          </h2>
          <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#D49B44] max-w-4xl mx-auto mt-6 px-4">
            <span>CURTORIM</span>
            <span>•</span>
            <span>MARGAO</span>
            <span>•</span>
            <span>ASSAGAO</span>
            <span>•</span>
            <span>VERNA</span>
            <span>•</span>
            <span>GOA</span>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#FAF8F5]/10 text-xs font-sans text-[#FAF8F5]/50">
          <div className="flex items-center gap-6">
            <span>© 2026 Victorino Luxury Homes. All Rights Reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Goa RERA Approved Developer</span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/contact" className="hover:text-[#FAF8F5] transition-colors">
              Privacy &amp; Discretion Policy
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2 hover:text-[#FAF8F5] transition-colors"
              data-cursor="TOP"
            >
              <span>Back to Top</span>
              <span className="transform rotate-180 inline-block transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowDownIcon size={12} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
