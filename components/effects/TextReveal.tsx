"use client";

import React, { useEffect, useRef } from "react";

/** Content stays visible before hydration and throughout navigation restoration. */
function useEntrance(ref: React.RefObject<HTMLElement | null>, delay: number, y: number) {
  useEffect(() => {
    const element = ref.current;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || preference.matches || element.getBoundingClientRect().top < innerHeight) return;
    let disposed = false;
    let context: { revert: () => void } | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      void import('gsap').then(({ default: gsap }) => {
        if (disposed || preference.matches) return;
        context = gsap.context(() => {
          gsap.fromTo(element, { y: Math.min(y, 24) }, {
            y: 0, duration: .9, delay: Math.min(delay, .2), ease: 'power3.out', clearProps: 'transform',
          });
        }, element);
      });
    }, { threshold: .05 });
    observer.observe(element);
    const restore = () => context?.revert();
    preference.addEventListener('change', restore);
    return () => { disposed = true; observer.disconnect(); restore(); preference.removeEventListener('change', restore); };
  }, [ref, delay, y]);
}

/** Semantic multiline heading with an optional, non-hiding entrance. */
export function Reveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  stagger?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEntrance(ref, delay, 20);

  const M = Tag as unknown as "div";
  return (
    // @ts-expect-error dynamic tag
    <M ref={ref} className={className} data-anim-owned>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span data-reveal-line-inner className={`block ${lineClassName}`}>
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
  useEntrance(ref, delay, y);

  return (
    <div ref={ref} className={className} data-anim-owned>
      {children}
    </div>
  );
}

/** Eyebrow + hairline — shared editorial section header */
export function Eyebrow({ children, tone = "terracotta" }: { children: React.ReactNode; tone?: "terracotta" | "brass" | "light" }) {
  const color = tone === "terracotta" ? "text-[var(--accent-text)]" : tone === "brass" ? "text-[#D49B44]" : "text-[#FAF8F5]/70";
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="h-px w-10 bg-current opacity-40" />
      <span className={`text-[10px] sm:text-xs font-sans uppercase tracking-[0.32em] font-semibold ${color}`}>
        {children}
      </span>
    </div>
  );
}
