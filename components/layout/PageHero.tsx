"use client";

import React from "react";
import { Reveal, FadeUp } from "@/components/effects/TextReveal";

/** Shared editorial hero for all subpages — index, eyebrow, oversized serif, meta hairline */
export default function PageHero({
  index,
  eyebrow,
  title,
  description,
  meta = [],
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  meta?: string[];
}) {
  return (
    <section className="w-full pt-40 md:pt-52 pb-14 md:pb-20 px-6 md:px-12 max-w-[1720px] mx-auto">
      <FadeUp>
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#B84A39] font-semibold mb-6">
          <span className="flex items-center gap-4">
            <span className="font-mono">({index})</span>
            <span>{eyebrow}</span>
          </span>
          <span className="hidden md:inline font-mono text-[#121210]/40 tracking-[0.2em]">
            15.2894° N — 74.0247° E
          </span>
        </div>
      </FadeUp>
      <Reveal
        as="h1"
        className="font-serif font-light text-[#121210] leading-[0.95] tracking-tight text-5xl sm:text-7xl md:text-8xl max-w-6xl"
        lines={[title]}
      />
      {description && (
        <FadeUp delay={0.2} className="mt-8 max-w-2xl">
          <p className="text-sm sm:text-base font-sans text-[#7A756B] leading-relaxed font-light">
            {description}
          </p>
        </FadeUp>
      )}
      {meta.length > 0 && (
        <FadeUp delay={0.28}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#121210]/10 pt-5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#121210]/45">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </FadeUp>
      )}
    </section>
  );
}
