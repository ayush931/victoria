"use client";

import { useEffect, ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLenis = any;

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let lenisInstance: AnyLenis = null;
    let rafId: number | null = null;

    // Dynamically attempt to load lenis if installed
    import("lenis")
      .then((LenisModule) => {
        const Lenis = LenisModule.default || LenisModule;
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential luxury ease
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        const raf = (time: number) => {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // Optional GSAP ScrollTrigger sync if GSAP is available
        import("gsap").then((gsapModule) => {
          const gsap = gsapModule.default || gsapModule;
          import("gsap/ScrollTrigger").then((stModule) => {
            const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
            if (ScrollTrigger) {
              gsap.registerPlugin(ScrollTrigger);
              lenisInstance.on("scroll", ScrollTrigger.update);
              gsap.ticker.add((time: number) => {
                lenisInstance.raf(time * 1000);
              });
              gsap.ticker.lagSmoothing(0);
            }
          }).catch(() => {});
        }).catch(() => {});
      })
      .catch(() => {
        // Lenis not yet installed; browser native smooth scroll active
      });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
