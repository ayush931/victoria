"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { imageSet, media } from '@/lib/media';

/** A native sticky scene: scrolling choreographs the photographs, not the reading order. */
export default function CoastalScrollStory() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mediaQuery = gsap.matchMedia();
      mediaQuery.add('(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
        section.dataset.motionReady = 'true';
        const scene = section.querySelector('.coastal-story__scene');
        const main = section.querySelector('[data-story-main]');
        const interior = section.querySelector('[data-story-interior]');
        const coast = section.querySelector('[data-story-coast]');
        const lines = section.querySelectorAll('[data-story-line]');
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar')) || 72}`,
            end: 'bottom bottom',
            scrub: .8,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .fromTo(main, { rotation: -7, xPercent: -4, yPercent: 8, scale: .94 }, { rotation: 5, xPercent: 7, yPercent: -5, scale: 1.025, duration: 1, ease: 'none' }, 0)
          .fromTo(interior, { rotation: 9, x: -25, y: 100 }, { rotation: -5, x: 20, y: -35, duration: 1, ease: 'none' }, 0)
          .fromTo(coast, { rotation: -8, y: 125 }, { rotation: 7, y: -55, duration: 1, ease: 'none' }, 0)
          .fromTo(lines[0], { x: 0 }, { x: 28, duration: 1, ease: 'none' }, 0)
          .fromTo(lines[1], { x: 24 }, { x: -15, duration: 1, ease: 'none' }, 0)
          .fromTo(section.querySelector('.coastal-story__type'), { xPercent: 12 }, { xPercent: -18, duration: 1, ease: 'none' }, 0)
          .fromTo(section.querySelector('.coastal-story__seal'), { rotation: -25 }, { rotation: 115, duration: 1, ease: 'none' }, 0)
          .fromTo(section.querySelector('.coastal-story__curve'), { scaleY: .3 }, { scaleY: 1, transformOrigin: 'bottom', duration: .45, ease: 'none' }, .55)
          .fromTo(section.querySelector('.coastal-story__progress i'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 1, ease: 'none' }, 0);
        // The scene stays in normal document flow; there is no scroll-jacking or pin spacer.
        if (scene) ScrollTrigger.refresh();
        return () => { delete section.dataset.motionReady; };
      });
      cleanup = () => { mediaQuery.revert(); delete section.dataset.motionReady; };
    }).catch(() => { delete section.dataset.motionReady; });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return <section ref={ref} className="coastal-story" aria-labelledby="coastal-story-title" data-anim-owned>
    <div className="coastal-story__scene">
      <div className="coastal-story__copy">
        <p className="estate-label">The feeling of a home in Goa</p>
        <h2 id="coastal-story-title"><span data-story-line>Room to live.</span><em data-story-line>Space to breathe.</em></h2>
        <p>Architecture, open spaces and a slower everyday. Discover a home that brings it all together.</p>
        <Link href="#residences" className="estate-text-link" data-scroll-to data-scroll-to-offset="-120" data-scroll-to-duration="1">Find your place <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="coastal-story__gallery">
        <figure className="coastal-story__photo coastal-story__photo--main" data-story-main>
          <img src={media.villa} srcSet={imageSet(media.villa)} sizes="(min-width: 900px) 43vw, 88vw" alt="Architectural inspiration: a contemporary home framed by mature trees" loading="lazy" />
          <figcaption><span>01 / The architecture</span><span>Inspiration</span></figcaption>
        </figure>
        <figure className="coastal-story__photo coastal-story__photo--interior" data-story-interior>
          <img src={media.interior} srcSet={imageSet(media.interior)} sizes="(min-width: 900px) 23vw, 44vw" alt="Interior inspiration: a light-filled living room" loading="lazy" />
          <figcaption>02 / The everyday</figcaption>
        </figure>
        <figure className="coastal-story__photo coastal-story__photo--coast" data-story-coast>
          <img src={media.goa} srcSet={imageSet(media.goa)} sizes="(min-width: 900px) 20vw, 44vw" alt="Lifestyle inspiration: the Goa coastline" loading="lazy" />
          <figcaption>03 / The surroundings</figcaption>
        </figure>
      </div>
      <svg className="coastal-story__seal" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="44" /><circle cx="50" cy="50" r="32" /><path d="M50 5v90M5 50h90M18 18l64 64M18 82l64-64" /><circle cx="50" cy="50" r="9" /></svg>
      <p className="coastal-story__type" aria-hidden="true">a life in Goa.</p>
      <div className="coastal-story__progress" aria-hidden="true"><span>Scroll to explore</span><span className="coastal-story__track"><i /></span><span>Victorino / Goa</span></div>
      <svg className="coastal-story__curve" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 160 Q720 -120 1440 160 V160 H0Z" /></svg>
    </div>
  </section>;
}
