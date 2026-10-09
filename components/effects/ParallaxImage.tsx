"use client";

import React, { useEffect, useRef } from "react";

/**
 * Scroll-drifted image — transform-only (compositor-friendly, no paint per frame).
 * Entrance settles scale once; scroll drift is a pure yPercent scrub.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  ratio = "h-[60vh] min-h-[420px] md:h-[78vh]",
  cursor,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  cursor?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let killed = false;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (killed) return;
      gsap.set(img, { scale: 1.18 });
      const enter = gsap.to(img, {
        scale: 1.06,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
      });
      const drift = gsap.fromTo(
        img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
      return () => {
        enter.scrollTrigger?.kill();
        enter.kill();
        drift.scrollTrigger?.kill();
        drift.kill();
      };
    };
    let cleanup: (() => void) | undefined;
    void run().then((c) => {
      const fn = c as unknown as (() => void) | undefined;
      if (typeof fn === "function") cleanup = fn;
    });
    return () => {
      killed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative w-full overflow-hidden bg-[#0C1A14] ${ratio} ${className}`} {...(cursor ? { "data-cursor": cursor } : {})}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover object-center will-change-transform ${imgClassName}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
