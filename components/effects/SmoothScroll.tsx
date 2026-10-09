"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLenis = any;

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  useEffect(() => {
    let lenisInstance: AnyLenis = null;
    let gsapInstance: AnyLenis = null;
    let scrollTrigger: AnyLenis = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let cancelled = false;

    const init = async () => {
      try {
        const [LenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;

        const Lenis = LenisModule.default || LenisModule;
        gsapInstance = gsapModule.default || gsapModule;
        scrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
        gsapInstance.registerPlugin(scrollTrigger);
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduceMotion) {
          lenisInstance = new Lenis({
            duration: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 1.2,
          });
        }

        const onScroll = () => scrollTrigger.update();
        lenisInstance?.on("scroll", onScroll);
        tickerCallback = (time: number) => lenisInstance?.raf(time * 1000);
        gsapInstance.ticker.add(tickerCallback);
        gsapInstance.ticker.lagSmoothing(0);

        const headings = gsapInstance.utils.toArray<HTMLElement>("main section h1, main section h2");
        const cards = gsapInstance.utils.toArray<HTMLElement>("main section .grid > *, main section .arch-grid > *");
        let responsiveMotion: AnyLenis = null;
        const ctx = gsapInstance.context(() => {
          if (!reduceMotion) {
            headings.forEach((heading: HTMLElement) => {
              gsapInstance.fromTo(heading, { autoAlpha: 0, y: 28 }, {
                autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: heading, start: "top 88%", once: true },
              });
            });
            cards.forEach((card: HTMLElement, index: number) => {
              gsapInstance.fromTo(card, { autoAlpha: 0, y: 24 }, {
                autoAlpha: 1, y: 0, duration: 0.8, delay: (index % 4) * 0.08, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 92%", once: true },
              });
            });

            const heroMedia = document.querySelector<HTMLElement>("main section:first-of-type video");
            if (heroMedia) {
              gsapInstance.to(heroMedia, {
                yPercent: 10, scale: 1.08, ease: "none",
                scrollTrigger: { trigger: heroMedia.closest("section"), start: "top top", end: "bottom top", scrub: 0.6 },
              });
            }

            responsiveMotion = gsapInstance.matchMedia();
            responsiveMotion.add("(min-width: 768px)", () => {
              const stackStages: HTMLElement[] = [];
              gsapInstance.utils.toArray<HTMLElement>("[data-horizontal-scroll]").forEach((section: HTMLElement) => {
                const stage = section.querySelector<HTMLElement>(".scroll-horizontal-window");
                const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
                if (!stage || !track || track.scrollWidth <= stage.clientWidth) return;
                gsapInstance.to(track, {
                  x: () => -(track.scrollWidth - stage.clientWidth),
                  ease: "none",
                  scrollTrigger: {
                    trigger: stage,
                    pin: stage,
                    start: "top 18%",
                    end: () => `+=${track.scrollWidth - stage.clientWidth}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                });
              });

              gsapInstance.utils.toArray<HTMLElement>("[data-stack-scroll]").forEach((section: HTMLElement) => {
                const stage = section.querySelector<HTMLElement>("[data-stack-stage]");
                const cards = stage ? Array.from(stage.querySelectorAll<HTMLElement>("[data-stack-card]")) : [];
                if (!stage || cards.length < 2) return;
                stage.dataset.stackReady = "true";
                stackStages.push(stage);
                gsapInstance.set(cards, { zIndex: (index: number) => index + 1 });
                gsapInstance.set(cards.slice(1), { yPercent: 112 });
                const timeline = gsapInstance.timeline({
                  scrollTrigger: {
                    trigger: stage,
                    pin: stage,
                    start: "top 16%",
                    end: () => `+=${window.innerHeight * (cards.length - 1)}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                });
                cards.slice(1).forEach((card: HTMLElement, index: number) => {
                  timeline.to(cards[index], { scale: 0.94, y: -20, autoAlpha: 0.5, ease: "none" }, index);
                  timeline.to(card, { yPercent: 0, ease: "none" }, index);
                });
              });
              return () => stackStages.forEach((stage) => { delete stage.dataset.stackReady; });
            });
          }
        });
        requestAnimationFrame(() => scrollTrigger.refresh());

        return () => {
          ctx.revert();
          responsiveMotion?.revert();
          lenisInstance?.off("scroll", onScroll);
        };
      } catch {
        // Native scrolling remains available if an animation dependency fails to load.
      }
    };

    let animationCleanup: (() => void) | undefined;
    void init().then((cleanup) => { animationCleanup = cleanup; if (cancelled) animationCleanup?.(); });

    return () => {
      cancelled = true;
      animationCleanup?.();
      if (gsapInstance && tickerCallback) gsapInstance.ticker.remove(tickerCallback);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
