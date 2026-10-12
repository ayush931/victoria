"use client";
import { useEffect, type RefObject } from 'react';

/** Decorative motion is scoped to one footer and never controls content visibility. */
export function useFooterMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const footer = ref.current;
    if (!footer) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let generation = 0;
    let context: { revert: () => void } | undefined;
    let observer: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let frame = 0;
    const stop = () => {
      generation++;
      cancelAnimationFrame(frame);
      frame = 0;
      observer?.disconnect();
      resizeObserver?.disconnect();
      context?.revert();
      context = undefined;
    };
    const start = async () => {
      if (preference.matches) return;
      const run = generation;
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed || preference.matches || run !== generation) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const mark = footer.querySelector('.vx-footer__mega');
        if (mark) gsap.fromTo(mark.querySelectorAll('span'), { yPercent: index => 22 - Math.sin(index / 8 * Math.PI) * 18, rotation: index => (index - 4) * 1.8 }, {
          yPercent: 0, rotation: 0, stagger: .045, ease: 'none',
          scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom 90%', scrub: .65, invalidateOnRefresh: true },
        });
      }, footer);
      context = ctx;
      // Expanding a buyer FAQ changes the footer's position without a window resize.
      const refresh = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!disposed && !preference.matches && run === generation) ScrollTrigger.refresh();
        });
      };
      resizeObserver = new ResizeObserver(refresh);
      resizeObserver.observe(footer);
      const main = footer.closest('main') ?? footer.previousElementSibling;
      if (main instanceof HTMLElement) resizeObserver.observe(main);
      void document.fonts.ready.then(() => {
        if (!disposed && !preference.matches && run === generation) refresh();
      });
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer?.unobserve(entry.target);
          ctx.add(() => {
            const element = entry.target;
            if (element.matches('.vx-rule')) {
              gsap.fromTo(element, { scaleX: .25 }, { scaleX: 1, transformOrigin: 'left', duration: 1.2, ease: 'power3.out', clearProps: 'transform,transformOrigin' });
            } else {
              const targets = element.matches('.vx-footer__cols') ? element.querySelectorAll('h4, li') : element.children;
              gsap.fromTo(targets, { y: 18 }, { y: 0, duration: .95, stagger: .055, ease: 'power3.out', clearProps: 'transform' });
            }
          });
        });
      }, { threshold: .12 });
      footer.querySelectorAll('.vx-rule, .vx-footer__top, .vx-footer__cols').forEach(element => {
        if (element.getBoundingClientRect().top >= innerHeight) observer?.observe(element);
      });
    };
    void start();
    const change = () => { stop(); if (!preference.matches) void start(); };
    preference.addEventListener('change', change);
    return () => { disposed = true; stop(); preference.removeEventListener('change', change); };
  }, [ref]);
}
