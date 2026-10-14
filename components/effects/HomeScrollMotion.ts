"use client";
import { useEffect, type RefObject } from 'react';

/** Scroll-scrubbed scene transitions; Locomotive remains the single scroll driver. */
export function useHomeScrollMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const hero = root.querySelector('.estate-hero');
        const lens = root.querySelector('.estate-hero__lens');
        const title = root.querySelector('.estate-hero h1');
        if (hero && lens && title) {
          const exit = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .65 } });
          exit.to(lens, { yPercent: 9, scale: 1.12, ease: 'none', duration: 1 }, 0)
            .to(title, { x: -45, y: -60, ease: 'none', duration: 1 }, 0)
            .to(hero, { borderBottomLeftRadius: '6vw', borderBottomRightRadius: '6vw', ease: 'none', duration: .6 }, .15);
        }
        const frame = root.querySelector('.estate-feature__reveal');
        if (frame) gsap.fromTo(frame, { clipPath: 'inset(7% 12% 7% 12% round 45% 45% 2px 2px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 2px 2px 2px 2px)', ease: 'none',
          scrollTrigger: { trigger: frame.parentElement, start: 'top 90%', end: 'top 20%', scrub: .8 },
        });
        root.querySelectorAll<HTMLElement>('.estate-property__image').forEach((picture, index) => {
          const direction = index % 2 ? 1 : -1;
          gsap.fromTo(picture, { rotation: direction * 2.5, y: 30 }, {
            rotation: direction * -.8, y: -18, ease: 'none',
            scrollTrigger: { trigger: picture.parentElement, start: 'top bottom', end: 'bottom top', scrub: .75 },
          });
        });
        root.querySelectorAll<HTMLElement>('[data-scrub-heading]').forEach(heading => {
          gsap.fromTo(heading.children, { y: 24, rotation: index => index ? 3 : -2 }, {
            y: 0, rotation: 0, stagger: .12, ease: 'none',
            scrollTrigger: { trigger: heading, start: 'top 95%', end: 'top 45%', scrub: .6 },
          });
        });
        const ribbon = root.querySelector('.estate-scroll-ribbon');
        if (ribbon) {
          const rows = ribbon.querySelectorAll('[data-ribbon-line]');
          rows.forEach((row, index) => gsap.fromTo(row,
            { xPercent: index ? -12 : 10, rotation: index ? 2 : -2 },
            { xPercent: index ? 8 : -10, rotation: index ? -2 : 2, ease: 'none', scrollTrigger: { trigger: ribbon, start: 'top bottom', end: 'bottom top', scrub: .8 } },
          ));
        }
      });
      media.add('(min-width: 900px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)', () => {
        const living = root.querySelector('.estate-living');
        if (living) {
          // Open the view as its own scene; image depth remains owned by Locomotive.
          const panorama = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
            trigger: living.querySelector('.estate-living__visual'),
            start: 'top 90%', end: 'center 45%', scrub: .9, invalidateOnRefresh: true,
          } });
          panorama.fromTo(living.querySelector('.estate-living__frame'),
            { clipPath: 'inset(10% 25% 10% 25% round 45% 45% 45% 45%)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)', duration: 1 }, 0)
            .fromTo(living.querySelector('.estate-living__caption-rule'),
              { scaleX: 0 }, { scaleX: 1, duration: .6 }, .4);
          gsap.fromTo(living.querySelectorAll('[data-living-line]'),
            { x: index => index ? 36 : -24, y: 20 },
            { x: 0, y: 0, stagger: .12, ease: 'none', scrollTrigger: {
              trigger: living.querySelector('.estate-section-head'), start: 'top 90%', end: 'top 35%', scrub: .8,
            } });
          gsap.fromTo(living.querySelectorAll('.estate-living__notes > div'),
            { y: index => 40 + index * 30 },
            { y: 0, stagger: .18, ease: 'none', scrollTrigger: {
              trigger: living.querySelector('.estate-living__notes'), start: 'top 100%', end: 'top 50%', scrub: .8,
            } });
        }
      });
      media.add('(min-width: 1000px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)', () => {
        const design = root.querySelector('.estate-design');
        if (design) {
          gsap.fromTo(design.querySelector('.estate-design__visual'),
            { rotationY: -14, rotationZ: -3, scale: .92, transformPerspective: 1200, transformOrigin: 'left center' },
            { rotationY: 0, rotationZ: 0, scale: 1, ease: 'none', scrollTrigger: {
              trigger: design, start: 'top 85%', end: 'center 50%', scrub: .9,
            } });
          gsap.fromTo(design.querySelectorAll('.estate-design__details article'),
            { x: index => 20 + index * 14 },
            { x: 0, stagger: .12, ease: 'none', scrollTrigger: {
              trigger: design, start: 'top 60%', end: 'bottom 85%', scrub: .8,
            } });
        }
      });
      cleanup = () => media.revert();
    }).catch(() => { /* Static content remains usable if a motion chunk fails to load. */ });
    return () => { disposed = true; cleanup?.(); };
  }, [ref]);
}
