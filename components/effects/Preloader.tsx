"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    document.body.style.overflow = "";

    const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
    lenis?.start();

    setTimeout(() => {
      setGone(true);
      (window as unknown as { __preloaderDone?: boolean }).__preloaderDone = true;
      onDone?.();
      window.dispatchEvent(new CustomEvent("victorino:preloader-done"));
    }, 600);
  }, [onDone]);

  useEffect(() => {
    // Lock scroll during preload
    const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    // Snappy luxury duration: 1100ms instead of 3500ms
    const DURATION = 1100;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // easeOutExpo for luxury counter feel
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -8 * t);
      setCount(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(finish, 120);
      }
    };

    raf = requestAnimationFrame(tick);

    // Fail-safe unlock after 2200ms in case RAF or browser background throttling occurs
    const failSafe = setTimeout(finish, 2200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failSafe);
      document.body.style.overflow = "";
    };
  }, [finish]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      onClick={finish}
      className={`fixed inset-0 z-[20000] flex flex-col justify-between bg-[#08130F] text-[#FAF8F5] transition-transform duration-[700ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* top row */}
      <div className="flex items-center justify-between px-6 md:px-12 pt-6 sm:pt-8 text-[10px] font-sans uppercase tracking-[0.32em] text-[#FAF8F5]/60">
        <span>Victorino Luxury Homes</span>
        <span className="hidden sm:inline">Curtorim • Goa • Est. 2014</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finish();
          }}
          className="text-[#D49B44] hover:text-[#FAF8F5] transition-colors tracking-widest text-[9px] uppercase px-2 py-1 rounded border border-[#D49B44]/30"
        >
          Skip ↗
        </button>
      </div>

      {/* center massive counter */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-4">
        <div className="overflow-hidden max-h-[35vh] flex items-center justify-center">
          <div
            className={`font-serif font-light leading-none tracking-[-0.03em] text-[20vw] sm:text-[16vw] md:text-[14vw] max-text-[160px] tabular-nums transition-all duration-500 ${
              leaving ? "-translate-y-full opacity-0" : ""
            }`}
          >
            {count}
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="font-serif italic text-[#D49B44] text-base sm:text-lg md:text-xl">
            Architects of dreams…
          </span>
          {/* progress hairline */}
          <div className="w-[180px] sm:w-[240px] md:w-[300px] h-[1.5px] bg-[#FAF8F5]/15 overflow-hidden rounded-full">
            <div
              className="h-full bg-[#D49B44] origin-left transition-transform duration-75"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
        </div>
      </div>

      {/* bottom row */}
      <div className="flex items-end justify-between px-6 md:px-12 pb-6 sm:pb-8 text-xs font-sans">
        <span className="font-serif italic text-[#FAF8F5]/50 text-xs sm:text-sm">
          Laterite • Teak • Oyster light
        </span>
        <span className="text-[10px] font-mono tracking-[0.22em] text-[#FAF8F5]/50 uppercase">
          15.2894°N — 74.0247°E
        </span>
      </div>

      {/* curtain accent panel */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[8vh] bg-[#D49B44] transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          leaving ? "-translate-y-[92vh]" : "translate-y-full"
        }`}
      />
    </div>
  );
}
