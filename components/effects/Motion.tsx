"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scramble, splitText, type Split } from '@/lib/split';


/** Anything a component animates for itself opts out with this attribute. */
const OWNED = '[data-anim-owned], [data-no-anim], .vx-hero';

type Group = { selector: string; from: Record<string, number | string>; to: Record<string, number | string>; stagger?: number };

/**
 * The motion director. One pass over the page after each route change, giving every
 * kind of element its own kind of movement — rather than one fade for everything:
 *
 *   headings      masked character rise            ledes        word blur-up
 *   rules         draw from the left               index dots   spin in
 *   media         clip-path wipe + settling scale  labels       glyph scramble
 *   cards/rows    staggered batches, per-kind      figures      count up
 *   marquees      scroll-velocity skew             footer mark  scrubbed letter wave
 *   [data-hscroll] pinned horizontal travel        pointer      spotlight on cards
 *
 * Everything starts hidden only after it is armed here, with a CSS failsafe in
 * globals.css so a failed script can never leave the page blank. Reduced motion
 * does nothing at all.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      await (document.fonts?.ready ?? Promise.resolve());
      if (disposed) return;

      const splits: Split[] = [];
      const stops: Array<() => void> = [];
      const done = new WeakSet<Element>();

      // Cache Components keeps earlier routes in the DOM, hidden. Only the page on screen is animated.
      const shown = (el: Element) => el.getClientRects().length > 0;
      const fresh = (selector: string) =>
        Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(el => shown(el) && !done.has(el) && !el.closest(OWNED));
      const claim = (el: HTMLElement) => { done.add(el); el.style.visibility = 'visible'; };

      // The index asks for a quieter register: one gentle rise, no drift, spin, scramble or dimming.
      const calm = Boolean(document.querySelector('main[data-calm]'));
      const smooth = calm ? 'power2.out' : 'power4.out';

      const ctx = gsap.context(() => {
        const once = (el: Element, from = 'top 88%') => ({ trigger: el, start: from, once: true });

        // — Headings: a masked rise, by character when short, by word when long
        const headings = [
          ...fresh('.vx-head h2, .vx-display, .vx-footer__top h3'),
          ...fresh('main h1, main h2'),
        ];
        headings.forEach(heading => {
          if (done.has(heading) || heading.querySelector('[data-reveal-line-inner]')) return;
          claim(heading);
          const length = (heading.textContent ?? '').length;
          const split = splitText(heading, length <= 26 ? 'chars' : 'words');
          splits.push(split);
          const variant = calm ? undefined : heading.closest<HTMLElement>('[data-heading-motion]')?.dataset.headingMotion;
          const entrance = variant === 'fold'
            ? { yPercent: 65, rotationX: -85, transformPerspective: 700, transformOrigin: '50% 100%', opacity: 0 }
            : variant === 'spread'
              ? { x: (index: number) => (index - split.targets.length / 2) * 22, yPercent: 0, opacity: 0 }
              : variant === 'slide'
                ? { xPercent: -100, yPercent: 0, skewX: 12, opacity: 0 }
                : calm ? { yPercent: 105, opacity: 0 } : { yPercent: 118, rotate: 6 };
          gsap.set(split.targets, entrance);
          gsap.to(split.targets, {
            x: 0, xPercent: 0, yPercent: 0, rotate: 0, rotationX: 0, skewX: 0, opacity: 1,
            duration: calm ? 1.1 : variant === 'fold' ? 1.5 : 1.25, ease: smooth,
            stagger: variant === 'spread' ? { each: 0.055, from: 'center' } : calm ? 0.018 : length <= 26 ? 0.03 : 0.045,
            scrollTrigger: once(heading),
          });
        });

        // — Ledes: words resolve out of a blur
        fresh('.vx-lede, .vx-footer__top .vx-lede').forEach(lede => {
          claim(lede);
          const split = splitText(lede, 'words');
          splits.push(split);
          gsap.set(split.targets, { autoAlpha: 0, y: calm ? 12 : 22 });
          gsap.to(split.targets, {
            autoAlpha: 1, y: 0, duration: calm ? 1.1 : 0.9, ease: 'power3.out',
            stagger: { each: 0.014, amount: calm ? 0.6 : 1.1 }, scrollTrigger: once(lede, 'top 90%'),
          });
        });

        // — Rules draw themselves
        fresh('.vx-rule').forEach(rule => {
          claim(rule);
          gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: 1.5, ease: 'power3.inOut', scrollTrigger: once(rule, 'top 94%') });
        });

        // — Index dots spin in
        fresh('.vx-head__index').forEach(dot => {
          claim(dot);
          gsap.from(dot, calm ? { autoAlpha: 0, duration: 1, ease: 'power2.out', scrollTrigger: once(dot, 'top 92%') } : { scale: 0, rotate: -200, autoAlpha: 0, duration: 1.1, ease: 'back.out(1.5)', scrollTrigger: once(dot, 'top 92%') });
        });

        // — Mono labels scramble into place
        fresh('.vx-head__meta .vx-mono, .vx-hud .vx-mono').forEach(label => {
          claim(label);
          if (calm) return;
          let stop: (() => void) | undefined;
          ScrollTrigger.create({ trigger: label, start: 'top 94%', once: true, onEnter: () => { stop = scramble(label, 0.9); } });
          stops.push(() => stop?.());
        });

        // — Media: a wipe up while the picture settles
        fresh('.vx-card__media, .vx-stack__media, .vx-compare, .vx-atlas__stage, .vx-drag__window').forEach(media => {
          claim(media);
          gsap.set(media, { clipPath: 'inset(100% 0% 0% 0%)' });
          const inner = media.querySelector('img, video, .vx-video');
          const tween = gsap.timeline({ scrollTrigger: once(media, 'top 90%') });
          tween.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: calm ? 1.2 : 1.35, ease: calm ? 'power3.inOut' : 'power4.inOut', clearProps: 'clipPath' });
          if (inner) tween.fromTo(inner, { scale: calm ? 1.08 : 1.32 }, { scale: 1, duration: calm ? 1.6 : 1.9, ease: 'power3.out' }, 0);
        });

        // — Parallax drift on anything that asks for it
        fresh('[data-parallax]').forEach(layer => {
          claim(layer);
          const amount = Number(layer.dataset.parallax) || 10;
          gsap.fromTo(layer, { yPercent: -amount }, {
            yPercent: amount, ease: 'none',
            scrollTrigger: { trigger: layer.parentElement ?? layer, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });

        // — Oversized section titles travel sideways across their passage
        document.querySelectorAll<HTMLElement>('main .vx-head h2').forEach(title => {
          if (calm || title.closest(OWNED)) return;
          gsap.fromTo(title, { xPercent: 4 }, {
            xPercent: -4, ease: 'none',
            scrollTrigger: { trigger: title, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          });
        });

        // — Depth: a section's content sinks back and dims as it leaves, so the film
        //   behind the page shows through between chapters. Pinned content is left alone.
        fresh('main .vx-section > .vx-wrap').forEach(wrap => {
          if (calm || wrap.querySelector('[data-hscroll], [data-stack-scroll], [data-anim-owned]')) return;
          done.add(wrap);
          gsap.fromTo(wrap, { y: 0, scale: 1, opacity: 1 }, {
            y: () => window.innerHeight * 0.12, scale: 0.97, opacity: 0.1, ease: 'none', immediateRender: false,
            transformOrigin: '50% 100%',
            scrollTrigger: { trigger: wrap.parentElement ?? wrap, start: 'bottom 40%', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true },
          });
        });

        // — Batches, each element kind with its own entrance
        const groups: Group[] = [
          { selector: '.vx-card', from: { autoAlpha: 0, y: 90, rotate: 2.5, scale: 0.96 }, to: { autoAlpha: 1, y: 0, rotate: 0, scale: 1 }, stagger: 0.09 },
          { selector: '.vx-drag__card', from: { autoAlpha: 0, x: 80 }, to: { autoAlpha: 1, x: 0 }, stagger: 0.07 },
          { selector: '.vx-record', from: { autoAlpha: 0, x: -50 }, to: { autoAlpha: 1, x: 0 }, stagger: 0.1 },
          { selector: '.vx-spec tr', from: { autoAlpha: 0, x: -28 }, to: { autoAlpha: 1, x: 0 }, stagger: 0.09 },
          { selector: '.vx-stats > *', from: { autoAlpha: 0, y: 40, scaleY: 0.9 }, to: { autoAlpha: 1, y: 0, scaleY: 1 }, stagger: 0.12 },
          { selector: '.vx-stack__tabs button', from: { autoAlpha: 0, x: -24 }, to: { autoAlpha: 1, x: 0 }, stagger: 0.08 },
          { selector: '.vx-stack__spec', from: { autoAlpha: 0, x: 40 }, to: { autoAlpha: 1, x: 0 } },
          { selector: '.vx-atlas__pin', from: { autoAlpha: 0, scale: 0.4 }, to: { autoAlpha: 1, scale: 1 }, stagger: 0.12 },
          // Pages that predate the instrument language: any grid's direct children rise in turn.
          { selector: 'main [class*="grid-cols"] > *', from: { autoAlpha: 0, y: 56 }, to: { autoAlpha: 1, y: 0 }, stagger: 0.08 },
        ];
        groups.forEach(group => {
          const targets = fresh(group.selector).filter(el =>
            !el.closest('[data-hscroll-track]') &&
            // A card containing a form or action must stay available to keyboard,
            // automation and assistive technology before it enters the viewport.
            !el.querySelector('form, button, input, select, textarea, [role="dialog"]')
          );
          if (!targets.length) return;
          targets.forEach(claim);
          gsap.set(targets, calm ? { ...group.from, ...(('y' in group.from) ? { y: 24 } : {}), ...(('x' in group.from) ? { x: Math.sign(Number(group.from.x)) * 16 } : {}), rotate: 0, scale: 1, scaleY: 1 } : group.from);
          ScrollTrigger.batch(targets, {
            start: 'top 92%',
            once: true,
            onEnter: batch => gsap.to(batch, { ...group.to, duration: calm ? 1.1 : 1, ease: 'power3.out', stagger: group.stagger ?? 0.08, clearProps: 'transform,opacity,visibility' }),
          });
        });

        // — Figures count up to their value
        fresh('.vx-stats strong').forEach(figure => {
          const original = figure.textContent ?? '';
          const match = original.match(/^(\D*?)(\d[\d,]*\.?\d*)([\s\S]*)$/);
          if (!match) return;
          claim(figure);
          const [, prefix, raw, suffix] = match;
          const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
          const target = Number(raw.replace(/,/g, ''));
          const state = { value: 0 };
          const format = (value: number) => {
            const text = value.toFixed(decimals);
            return raw.includes(',') ? Number(text).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : text;
          };
          figure.textContent = `${prefix}${format(0)}${suffix}`;
          gsap.to(state, {
            value: target, duration: 1.9, ease: 'power3.out',
            scrollTrigger: once(figure, 'top 92%'),
            onUpdate: () => { figure.textContent = `${prefix}${format(state.value)}${suffix}`; },
            onComplete: () => { figure.textContent = original; },
          });
          stops.push(() => { figure.textContent = original; });
        });

        // — Photographs on older pages settle as they enter
        fresh('main .overflow-hidden > img, main .group img').forEach(image => {
          if ((image as HTMLImageElement).closest('nav, header, [data-hscroll], .embla')) return;
          claim(image);
          gsap.fromTo(image, { scale: 1.22 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: image.parentElement ?? image, start: 'top bottom', end: 'center center', scrub: true } });
        });

        // — Footer wordmark: letters wave up as the footer arrives
        fresh('.vx-footer__mega').forEach(mark => {
          claim(mark);
          const split = splitText(mark, 'chars');
          splits.push(split);
          gsap.set(split.targets, { yPercent: 105 });
          gsap.to(split.targets, {
            yPercent: 0, ease: 'none', stagger: { each: 0.05, from: 'start' },
            scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
          });
        });

        // — Pinned horizontal travel
        const travel = gsap.matchMedia();
        stops.push(() => travel.revert());
        travel.add('(min-width: 900px)', () => {
          Array.from(document.querySelectorAll<HTMLElement>('[data-hscroll]')).filter(shown).forEach(wrap => {
            const track = wrap.querySelector<HTMLElement>('[data-hscroll-track]');
            const bar = wrap.querySelector<HTMLElement>('.vx-hs__bar i');
            const count = wrap.querySelector<HTMLElement>('[data-hscroll-count]');
            if (!track) return;
            const panels = Array.from(track.children) as HTMLElement[];
            const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
            if (distance() <= 0) return;
            const move = gsap.to(track, {
              x: () => -distance(), ease: 'none',
              scrollTrigger: {
                trigger: wrap, pin: true, start: () => `top top+=${document.querySelector('header.vx-bar')?.getBoundingClientRect().height ?? 58}`, end: () => `+=${distance()}`, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
                onUpdate: self => {
                  if (bar) bar.style.transform = `scaleX(${Math.max(0.02, self.progress)})`;
                  if (count) count.textContent = String(Math.round(self.progress * (panels.length - 1)) + 1).padStart(2, '0');
                },
              },
            });
            const advance = (event: Event) => {
              const trigger = move.scrollTrigger;
              if (!trigger) return;
              const step = Number((event as CustomEvent<number>).detail);
              const index = Math.max(0, Math.min(panels.length - 1, Math.round(trigger.progress * (panels.length - 1)) + step));
              const y = trigger.start + (trigger.end - trigger.start) * index / (panels.length - 1);
              const engine = (window as Window & { __locomotive?: { scrollTo: (target: number, options?: object) => void } }).__locomotive;
              if (engine) engine.scrollTo(y, { duration: .75 }); else window.scrollTo({ top: y, behavior: 'smooth' });
            };
            window.addEventListener('victorino:method-step', advance);
            stops.push(() => window.removeEventListener('victorino:method-step', advance));
            // Each numeral counter-travels, so the panel reads as depth rather than a flat belt.
            panels.forEach(panel => {
              const numeral = panel.querySelector<HTMLElement>('.vx-hs__numeral');
              if (numeral) gsap.fromTo(numeral, { xPercent: 22 }, { xPercent: -22, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: move, start: 'left right', end: 'right left', scrub: true } });
            });
          });
          return () => document.querySelectorAll<HTMLElement>('[data-hscroll] .vx-hs__bar i').forEach(bar => { bar.style.transform = ''; });
        });
      });

      // — Scroll velocity skews marquees and the footer wordmark
      const skewTargets = Array.from(document.querySelectorAll<HTMLElement>('.vx-marquee')).filter(shown);
      let lastY = window.scrollY;
      let skew = 0;
      const tick = () => {
        const y = window.scrollY;
        const target = Math.max(-9, Math.min(9, -(y - lastY) * 0.35));
        lastY = y;
        skew += (target - skew) * 0.12;
        if (Math.abs(skew) < 0.01) skew = 0;
        if (skewTargets.length) gsap.set(skewTargets, { skewX: skew });
      };
      if (skewTargets.length) gsap.ticker.add(tick);

      // — A light that follows the pointer across cards and rows
      const spotlight = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const host = (event.target as HTMLElement | null)?.closest<HTMLElement>('.vx-card, .vx-stats > *, .vx-record, .vx-atlas__card');
        if (!host) return;
        const rect = host.getBoundingClientRect();
        host.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        host.style.setProperty('--my', `${event.clientY - rect.top}px`);
      };
      window.addEventListener('pointermove', spotlight, { passive: true });

      // Refresh in page order, so triggers below a pinned section account for its spacer.
      const refresh = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
      requestAnimationFrame(refresh);
      window.addEventListener('load', refresh, { once: true });

      cleanup = () => {
        window.removeEventListener('load', refresh);
        window.removeEventListener('pointermove', spotlight);
        if (skewTargets.length) { gsap.ticker.remove(tick); gsap.set(skewTargets, { clearProps: 'transform' }); }
        stops.forEach(stop => stop());
        ctx.revert();
        splits.reverse().forEach(split => split.revert());
      };
    };

    // A frame after the route commits, so the page being animated is the page that exists.
    const frame = requestAnimationFrame(() => { void start(); });
    return () => { disposed = true; cancelAnimationFrame(frame); cleanup?.(); };
  }, [pathname]);

  return null;
}
