"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** Route-local, transform-only entrances. Text is never split or hidden. */
export default function Motion() {
  const anchor = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const footer = anchor.current?.closest('footer');
    const main = footer?.closest('main') ?? footer?.previousElementSibling;
    if (!footer || !(main instanceof HTMLElement)) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    let disposed = false;
    const contexts: { revert: () => void }[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        void import('gsap').then(({ default: gsap }) => {
          if (disposed || preference.matches) return;
          contexts.push(gsap.context(() => {
            const element = entry.target;
            const isCard = element.matches('.estate-property, .vx-card');
            const isDetail = Boolean(element.closest('.estate-design__details'));
            const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
            const delay = element.matches('article, .estate-property') ? Math.min(siblings.indexOf(element), 3) * .07 : 0;
            gsap.fromTo(element, { y: isDetail ? 0 : isCard ? 30 : 22, x: isDetail ? 14 : 0, rotation: isCard ? .35 : 0 }, {
              y: 0, x: 0, rotation: 0, duration: 1, delay, ease: 'power3.out', clearProps: 'transform',
            });
          }, main));
        });
      });
    }, { threshold: .08 });
    const roots = main.contains(footer) ? [main] : [main, footer];
    roots.forEach(root => root.querySelectorAll<HTMLElement>('h2, .vx-card, .estate-property, .estate-neighbourhoods article, .estate-journey__steps article, .estate-design__details article').forEach(element => {
      if (!element.closest('[data-anim-owned], [data-no-anim], .estate-hero, [data-scroll]') && element.getBoundingClientRect().top >= innerHeight) observer.observe(element);
    }));
    const restore = () => { contexts.forEach(context => context.revert()); };
    preference.addEventListener('change', restore);
    return () => { disposed = true; observer.disconnect(); restore(); preference.removeEventListener('change', restore); };
  }, [pathname]);
  return <span ref={anchor} hidden aria-hidden="true" />;
}
