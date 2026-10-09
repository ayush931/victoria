"use client";

import React from "react";

/** Infinite luxury ticker — SOTY marquee strip */
export default function Marquee({
  items,
  className = "",
  dark = false,
  speed = 28,
}: {
  items: string[];
  className?: string;
  dark?: boolean;
  speed?: number;
}) {
  const row = [...items, ...items, ...items];
  return (
    <div
      className={`relative w-full overflow-hidden select-none ${
        dark ? "bg-[#08130F] text-[#FAF8F5] border-y border-[#FAF8F5]/10" : "bg-[#D49B44] text-[#0C1A14]"
      } ${className}`}
    >
      <div
        className="flex w-max items-center gap-0 whitespace-nowrap py-4 md:py-5 animate-[marquee_var(--marquee-speed)_linear_infinite]"
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex w-max items-center" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-serif italic text-lg md:text-2xl px-6 md:px-10">{item}</span>
                <span className={`diamond ${dark ? "bg-[#D49B44]" : "bg-[#0C1A14]/60"}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
