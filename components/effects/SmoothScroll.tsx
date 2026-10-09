"use client";

import { useEffect, ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLenis = any;

function ScrollEngine() {
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
            duration: 1.25,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 1.2,
          });
          (window as unknown as { __lenis?: AnyLenis }).__lenis = lenisInstance;
        }

        const onScroll = () => scrollTrigger.update();
        lenisInstance?.on("scroll", onScroll);
        tickerCallback = (time: number) => lenisInstance?.raf(time * 1000);
        gsapInstance.ticker.add(tickerCallback);
        gsapInstance.ticker.lagSmoothing(0);

        const ctx = gsapInstance.context(() => {
          if (reduceMotion) return;

          // — Generic headings fade (skip hero which has its own choreography)
          (gsapInstance.utils.toArray("main section:not([data-hero]) h1, main section:not([data-hero]) h2") as HTMLElement[])
            .forEach((heading: HTMLElement) => {
              gsapInstance.fromTo(
                heading,
                { autoAlpha: 0, y: 24 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out",
                  clearProps: "all",
                  scrollTrigger: { trigger: heading, start: "top 90%", once: true },
                }
              );
            });

          // — Grid stagger (with clean clearProps so layout is never stuck)
          (gsapInstance.utils.toArray("main section .arch-grid > *, main section .stagger-grid > *") as HTMLElement[])
            .forEach((card: HTMLElement, index: number) => {
              gsapInstance.fromTo(
                card,
                { autoAlpha: 0, y: 20 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.7,
                  delay: (index % 4) * 0.06,
                  ease: "power2.out",
                  clearProps: "all",
                  scrollTrigger: { trigger: card, start: "top 92%", once: true },
                }
              );
            });

          // — Hero media scrub (pure drift without conflicting scale)
          const heroMedia = document.querySelector<HTMLElement>("[data-hero] video, main section:first-of-type video");
          if (heroMedia) {
            gsapInstance.to(heroMedia, {
              yPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: heroMedia.closest("section"), start: "top top", end: "bottom top", scrub: 0.5 },
            });
            const heroContent = document.querySelector<HTMLElement>("[data-hero-content]");
            if (heroContent) {
              gsapInstance.to(heroContent, {
                yPercent: -6,
                autoAlpha: 0.35,
                ease: "none",
                scrollTrigger: { trigger: heroMedia.closest("section"), start: "top top", end: "65% top", scrub: 0.5 },
              });
            }
          }

          // — Footer mega-type drift
          const mega = document.querySelector<HTMLElement>("[data-mega-type]");
          if (mega) {
            gsapInstance.fromTo(
              mega,
              { yPercent: 10 },
              {
                yPercent: 0,
                ease: "none",
                scrollTrigger: { trigger: mega, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
              }
            );
          }

          // — Desktop pinned journeys
          const mm = gsapInstance.matchMedia();
          mm.add("(min-width: 768px)", () => {
            const stackStages: HTMLElement[] = [];

            (gsapInstance.utils.toArray("[data-stack-scroll]") as HTMLElement[]).forEach((section: HTMLElement) => {
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
                  start: "top 10%",
                  end: () => `+=${window.innerHeight * (cards.length - 1)}`,
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              });
              cards.slice(1).forEach((card: HTMLElement, index: number) => {
                // transform-only: opacity scrubs force repaints over huge images
                timeline.to(cards[index], { scale: 0.94, y: -24, ease: "none" }, index);
                timeline.to(card, { yPercent: 0, ease: "none" }, index);
              });
            });
            return () => stackStages.forEach((stage) => delete stage.dataset.stackReady);
          });
        });
        requestAnimationFrame(() => scrollTrigger.refresh());

        return () => {
          ctx.revert();
          lenisInstance?.off("scroll", onScroll);
        };
      } catch {
        // Native scrolling fallback
      }
    };

    let cleanup: (() => void) | undefined;
    void init().then((c) => {
      cleanup = c as unknown as (() => void) | undefined;
      if (cancelled) cleanup?.();
    });

    return () => {
      cancelled = true;
      cleanup?.();
      if (gsapInstance && tickerCallback) gsapInstance.ticker.remove(tickerCallback);
      if (lenisInstance) {
        lenisInstance.destroy();
        (window as unknown as { __lenis?: AnyLenis }).__lenis = undefined;
      }
    };
  }, [pathname]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollEngine />
      </Suspense>
      {children}
    </>
  );
}
