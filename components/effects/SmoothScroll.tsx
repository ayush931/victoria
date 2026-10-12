"use client";

import { useEffect, useSyncExternalStore, ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotionPreference(callback: () => void) {
  const query = matchMedia(motionQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const allowsMotion = () => !matchMedia(motionQuery).matches;
const serverMotion = () => false;

/**
 * Locomotive Scroll v5 drives the page: it owns Lenis, the [data-scroll] element
 * observers (in-view classes, data-scroll-speed parallax, --progress CSS vars and
 * data-scroll-call events) and the data-scroll-to anchors. GSAP's ticker drives its
 * RAF so ScrollTrigger and Locomotive never fight over the frame.
 */
function ScrollEngine() {
  const pathname = usePathname();
  const motionAllowed = useSyncExternalStore(subscribeMotionPreference, allowsMotion, serverMotion);
  useEffect(() => {
    if (!motionAllowed) return;
    let locomotive: Any = null;
    let gsapInstance: Any = null;
    let scrollTrigger: Any = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let cancelled = false;

    const init = async () => {
      try {
        const [LocomotiveModule, gsapModule, scrollTriggerModule] = await Promise.all([
          import("locomotive-scroll"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;

        const LocomotiveScroll = LocomotiveModule.default || LocomotiveModule;
        gsapInstance = gsapModule.default || gsapModule;
        scrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
        gsapInstance.registerPlugin(scrollTrigger);
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!reduceMotion) {
          locomotive = new LocomotiveScroll({
            lenisOptions: {
              // Damped rather than timed: the page glides to a stop under the film like a camera on a gimbal.
              lerp: 0.085,
              wheelMultiplier: 0.95,
              orientation: "vertical",
              gestureOrientation: "vertical",
              smoothWheel: true,
              touchMultiplier: 1.2,
            },
            triggerRootMargin: "-1px -1px -1px -1px",
            rafRootMargin: "100% 100% 100% 100%",
            scrollCallback: ({ velocity, progress }: { velocity: number; progress: number }) => {
              scrollTrigger.update();
              const root = document.documentElement;
              root.style.setProperty("--scroll-velocity", velocity.toFixed(3));
              root.style.setProperty("--scroll-progress", progress.toFixed(5));
            },
            initCustomTicker: (render: () => void) => {
              tickerCallback = render;
              gsapInstance.ticker.add(render);
            },
            destroyCustomTicker: (render: () => void) => {
              gsapInstance.ticker.remove(render);
              if (tickerCallback === render) tickerCallback = null;
            },
          });
          gsapInstance.ticker.lagSmoothing(0);
          const win = window as unknown as { __locomotive?: Any; __lenis?: Any };
          win.__locomotive = locomotive;
          // Back-compat shim: Footer, ChapterRail and Preloader reach for __lenis.
          win.__lenis = {
            scrollTo: (target: Any, options?: Any) => locomotive.scrollTo(target, options),
            stop: () => locomotive.stop(),
            start: () => locomotive.start(),
            get raw() { return locomotive.lenisInstance; },
          };
        }

        const ctx = gsapInstance.context(() => {
          if (reduceMotion) return;

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
        requestAnimationFrame(() => {
          scrollTrigger.refresh();
          locomotive?.resize();
        });

        return () => { ctx.revert(); };
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
      if (locomotive) {
        locomotive.destroy();
        const win = window as unknown as { __locomotive?: Any; __lenis?: Any };
        win.__locomotive = undefined;
        win.__lenis = undefined;
      }
    };
  }, [pathname, motionAllowed]);

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
