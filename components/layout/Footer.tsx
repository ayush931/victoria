"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import { Magnetic } from "@/components/effects/Magnetic";

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#08130F] text-[#FAF8F5] pt-28 md:pt-36 pb-10 overflow-hidden border-t border-[#FAF8F5]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* CTA row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 md:pb-20 border-b border-[#FAF8F5]/10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-sans uppercase tracking-[0.32em] text-[#D49B44] block mb-4 font-semibold">
              Architects of dreams • Designers of reality
            </span>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.02] tracking-tight">
              Homes conceived as <em className="text-[#D49B44]">heirlooms.</em>
            </h3>
          </div>
          <Magnetic>
            <Link
              href="/contact"
              data-cursor="CONCIERGE"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#FAF8F5] px-8 py-4 text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#08130F] transition-colors duration-500 hover:text-[#FAF8F5]"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-[#B84A39] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
              <span className="relative z-10">Start a private enquiry</span>
              <ArrowUpRightIcon size={14} className="relative z-10" />
            </Link>
          </Magnetic>
        </div>

        {/* Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-14 md:py-16 border-b border-[#FAF8F5]/10 text-xs font-sans">
          <div className="lg:col-span-4 max-w-xs">
            <p className="text-[#FAF8F5]/60 leading-relaxed font-light">
              Victorino Luxury Homes is a boutique architectural development bureau
              born in Goa, operating with quiet restraint across historic enclaves since 2014.
            </p>
            <p className="mt-4 font-mono text-[11px] text-[#FAF8F5]/40">Goa RERA: PRGO02241982</p>
          </div>
          {[
            { t: "Curtorim Flagship", b: ["Nature's Cove Atelier", "Curtorim Lake Enclave", "Salcete, Goa 403701"] },
            { t: "Margao Studio", b: ["Quinta Heritage Office", "Near Holy Spirit Church", "Margao, Goa 403601"] },
            { t: "Verna Engineering", b: ["Victorino Projects HQ", "Phase II, Verna Industrial", "Goa 403722"] },
          ].map((c) => (
            <div key={c.t} className="lg:col-span-2 flex flex-col gap-2">
              <span className="font-serif text-sm text-[#D49B44] tracking-wide block mb-1">{c.t}</span>
              {c.b.map((l) => (
                <p key={l} className="text-[#FAF8F5]/70 font-light leading-relaxed">{l}</p>
              ))}
            </div>
          ))}
          <div className="lg:col-span-2 flex flex-col gap-2 text-[#FAF8F5]/80 font-light">
            <span className="font-serif text-sm text-[#D49B44] tracking-wide block mb-1">Portfolios</span>
            {[
              ["Nature's Cove (Curtorim)", "/residences/natures-cove"],
              ["Goan Luxury Villas", "/villas"],
              ["Heritage Manors", "/premium-homes"],
              ["The Craft Story", "/about"],
              ["Private Concierge", "/contact"],
            ].map(([label, href]) => (
              <Link key={label} href={href} className="arch-link hover:text-[#D49B44] w-fit">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mega type — perfectly scaled to fit 100% on every viewport */}
        <div className="py-14 md:py-24 text-center select-none w-full overflow-visible" data-cursor="VICTORINO">
          <h2
            data-mega-type
            className="mega-outline font-serif font-light tracking-[0.04em] sm:tracking-[0.08em] leading-none text-[clamp(1.75rem,8.8vw,9.2rem)] cursor-default block w-full mx-auto text-center"
          >
            VICTORINO
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#D49B44] mt-6">
            {["Curtorim", "Margao", "Assagao", "Verna", "Goa"].map((p, i, a) => (
              <span key={p} className="flex items-center gap-4">
                {p}
                {i < a.length - 1 && <span className="text-[#FAF8F5]/30">•</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-7 border-t border-[#FAF8F5]/10 text-xs font-sans text-[#FAF8F5]/50">
          <div className="flex items-center gap-5">
            <span>© 2026 Victorino Luxury Homes</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Goa RERA Approved</span>
          </div>
          <div className="flex items-center gap-7">
            <Link href="/contact" className="hover:text-[#FAF8F5] transition-colors">
              Privacy &amp; Discretion
            </Link>
            <button type="button" onClick={scrollToTop} data-cursor="TOP" className="group flex items-center gap-2 hover:text-[#FAF8F5]">
              <span>Back to Top</span>
              <span className="inline-block rotate-180 transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowDownIcon size={12} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
