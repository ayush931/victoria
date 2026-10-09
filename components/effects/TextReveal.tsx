"use client";

import React, { useEffect, useRef } from "react";

/**
 * Line-masked serif reveal — the SOTY headline signature.
 * Splits children text by <br/> boundaries passed as array, or auto-splits words.
 * Usage: <Reveal lines={["Victorino", "Luxury Homes"]} delay={2.2} />
 */
export function Reveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  as: Tag = "h2",
  stagger = 0.12,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  stagger?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      // Wait for preloader so hero intro choreographs after curtain
      await new Promise<void>((resolve) => {
        if ((window as unknown as { __preloaderDone?: boolean }).__preloaderDone) return resolve();
        const h = () => resolve();
        window.addEventListener("victorino:preloader-done", h, { once: true });
        setTimeout(resolve, 4000); // fallback
      });
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const el = ref.current as unknown as HTMLElement | null;
      if (!el) return;
      const targets = el.querySelectorAll("[data-reveal-line-inner]");
      gsap.set(targets, { yPercent: 110 });
      const tween = gsap.to(targets, {
        yPercent: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      // If already in view (hero), force play
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) tween.play();
      ctx = { revert: () => { tween.scrollTrigger?.kill(); tween.kill(); } };
    };
    void run();
    return () => ctx?.revert();
  }, [delay, stagger]);

  const M = Tag as unknown as "div";
  return (
    // @ts-expect-error dynamic tag
    <M ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span data-reveal-line-inner className={`block will-change-transform ${lineClassName}`}>
            {line}
          </span>
        </span>
      ))}
    </M>
  );
}

/** Fade-up on scroll for body copy / cards — honours reduced motion */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 36,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let killed = false;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (killed) return;
      gsap.set(el, { autoAlpha: 0, y });
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    };
    void run();
    return () => {
      killed = true;
    };
  }, [delay, y]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Eyebrow + hairline — shared editorial section header */
export function Eyebrow({ children, tone = "terracotta" }: { children: React.ReactNode; tone?: "terracotta" | "brass" | "light" }) {
  const color = tone === "terracotta" ? "text-[#B84A39]" : tone === "brass" ? "text-[#D49B44]" : "text-[#FAF8F5]/70";
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="h-px w-10 bg-current opacity-40" />
      <span className={`text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] font-semibold ${color}`}>
        {children}
      </span>
    </div>
  );
}
