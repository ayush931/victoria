"use client";
import { useEffect, useRef } from 'react';
import ShaderCanvas from '@/components/effects/ShaderCanvas';
import Link from 'next/link';
import { Mono } from '@/components/ui/Instrument';
import { ArrowUpRightIcon } from '@/components/ui/Icons';
import { openEnquiry } from '@/lib/enquiry';
import { splitText } from '@/lib/split';
import { VEIL_FRAGMENT } from '@/lib/shaders';

/** What the hero says, in the order the scroll reveals it. */
const STATEMENTS = [
  { lead: 'Thirteen villas', tail: 'on the Goan coast.' },
  { lead: 'Drawn, priced', tail: 'and built by one hand.' },
  { lead: 'Laterite, lime', tail: 'and a deep, shaded eave.' },
];

/** 3 4K UHD videos matching each scroll statement. */
const HERO_VIDEOS = [
  { src: '/videos/coastal-aerial-hd.mp4', poster: '/images/goa-coast-1600.webp' },
  { src: '/videos/luxury-villa-hd.mp4', poster: '/images/villa-1600.webp' },
  { src: '/videos/architectural-villa-hd.mp4', poster: '/images/interior-1600.webp' },
];

/**
 * The opening scene: full-bleed 4K film stage taking the whole screen.
 * As you scroll, the 4K video changes smoothly across 3 cinematic scenes
 * synchronized in lockstep with the 3 text statements.
 */
export default function HeroStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const latRef = useRef<HTMLSpanElement>(null);
  const lonRef = useRef<HTMLSpanElement>(null);
  const videoLayerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const ghost = ghostRef.current;
    if (!section || !frame || !ghost) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const videos = videoRefs.current;
    let visible = true;
    let selected = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const syncPlayback = () => {
      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        if (visible && index === selected && !document.hidden && !reduced.matches && !connection?.saveData) {
          if (!video.getAttribute('src')) { video.src = HERO_VIDEOS[index].src; video.load(); }
          void video.play().catch(() => video.parentElement?.removeAttribute('data-playing'));
        } else {
          video.pause();
          video.parentElement?.removeAttribute('data-playing');
        }
      });
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncPlayback(); });
    observer.observe(section);
    document.addEventListener('visibilitychange', syncPlayback);
    reduced.addEventListener('change', syncPlayback);

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const ghostSplit = splitText(ghost, 'chars');
      const lines = Array.from(section.querySelectorAll<HTMLElement>('.vx-hero__line'));
      const lineSplits = lines.map(line => splitText(line, 'words'));

      const ctx = gsap.context(() => {
        // — Initial states
        const layer0 = videoLayerRefs.current[0];
        const layer1 = videoLayerRefs.current[1];
        const layer2 = videoLayerRefs.current[2];

        if (layer0) gsap.set(layer0, { autoAlpha: 1 });
        if (layer1 && layer2) gsap.set([layer1, layer2], { autoAlpha: 0 });

        if (lineSplits[1] && lineSplits[2]) {
          gsap.set([lineSplits[1].targets, lineSplits[2].targets], { yPercent: 118, autoAlpha: 0 });
        }

        // — Entrance animations
        gsap.from(ghostSplit.targets, { yPercent: 115, rotate: 5, duration: 1.5, ease: 'power4.out', stagger: 0.045, delay: 0.15 });
        gsap.from(lineSplits[0].targets, { yPercent: 115, duration: 1.2, ease: 'power4.out', stagger: 0.07, delay: 0.7 });
        gsap.from('.vx-hero__fade', { autoAlpha: 0, y: 14, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 1 });
        gsap.from(frame, { autoAlpha: 0, duration: 1.4, ease: 'power2.out' });

        // — The scrub timeline: text & 4K video change smoothly together
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            onUpdate: self => {
              const next = self.progress < .35 ? 0 : self.progress < .73 ? 1 : 2;
              if (next !== selected) { selected = next; syncPlayback(); }
              if (trackRef.current) trackRef.current.textContent = String(Math.round(self.progress * 100)).padStart(3, '0');
            },
          },
        });

        timeline
          // Ghost wordmark drifts away
          .to(ghostSplit.targets, { yPercent: (index: number) => -(30 + (index % 4) * 14), opacity: 0, stagger: 0.012, duration: 0.35 }, 0.05)
          .to('.vx-hero__hint', { autoAlpha: 0, duration: 0.06 }, 0.05)
          .fromTo('.vx-hero__bracket', { scale: 0.86, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.2 }, 0.12)

          // ── Scroll step 1 -> step 2: Statement 1 exits, Statement 2 enters, Video 0 fades to Video 1
          .to(lineSplits[0].targets, { yPercent: -118, autoAlpha: 0, stagger: 0.012, duration: 0.1 }, 0.22)
          .set(layer0, { autoAlpha: 1 }, 0)
          .fromTo(layer1, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: 'power1.inOut' }, 0.25)
          .fromTo(lineSplits[1].targets, { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.014, duration: 0.1 }, 0.38)

          // ── Scroll step 2 -> step 3: Statement 2 exits, Statement 3 enters, Video 1 fades to Video 2
          .to(lineSplits[1].targets, { yPercent: -118, autoAlpha: 0, stagger: 0.012, duration: 0.1 }, 0.60)
          
          .fromTo(layer2, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: 'power1.inOut' }, 0.63)
          .fromTo(lineSplits[2].targets, { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.014, duration: 0.1 }, 0.76);
      }, section);

      // — Pointer reads out as survey coordinates
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        if (latRef.current) latRef.current.textContent = (15.2994 - y * 0.0442).toFixed(4);
        if (lonRef.current) lonRef.current.textContent = (73.9606 + x * 0.1018).toFixed(4);
      };
      window.addEventListener('pointermove', move, { passive: true });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      cleanup = () => {
        window.removeEventListener('pointermove', move);
        ctx.revert();
        lineSplits.forEach(split => split.revert());
        ghostSplit.revert();
      };
    })();

    return () => { disposed = true; cleanup?.(); observer.disconnect(); document.removeEventListener('visibilitychange', syncPlayback); reduced.removeEventListener('change', syncPlayback); videos.forEach(video => video?.pause()); };
  }, []);

  return (
    <section ref={sectionRef} id="top" data-chapter="Arrival" className="vx-hero">
      <div className="vx-hero__sticky">
        {/* Full-bleed 4K film stage with 3 smoothly crossfading scenes */}
        <div className="vx-hero__media" aria-hidden="true">
          {HERO_VIDEOS.map((item, index) => (
            <div
              key={item.src}
              ref={el => { videoLayerRefs.current[index] = el; }}
              className="vx-hero__media-layer"
              style={{
                opacity: index === 0 ? 1 : 0,
                visibility: index === 0 ? 'visible' : 'hidden',
              }}
            >
              <img
                className="vx-hero__media-poster"
                src={item.poster}
                alt=""
                fetchPriority={index === 0 ? 'high' : 'low'}
              />
              <video
                ref={el => { videoRefs.current[index] = el; }}
                className="vx-hero__media-video"
                muted
                loop
                playsInline
                preload="none"
                onWaiting={event => event.currentTarget.parentElement?.removeAttribute('data-playing')}
                onError={event => event.currentTarget.parentElement?.removeAttribute('data-playing')}
                onPause={event => event.currentTarget.parentElement?.removeAttribute('data-playing')}
                onPlaying={event => {
                  event.currentTarget.parentElement?.setAttribute('data-playing', 'true');
                }}
              />
            </div>
          ))}
        </div>

        <div ref={frameRef} className="vx-hero__frame">
          <ShaderCanvas fragment={VEIL_FRAGMENT} className="vx-hero__veil" pointer="window" />
          <div className="vx-hero__scrim" />
        </div>

        <p ref={ghostRef} className="vx-hero__ghost" aria-hidden="true">victorino</p>

        <span className="vx-hero__bracket vx-hero__bracket--tl" aria-hidden="true" />
        <span className="vx-hero__bracket vx-hero__bracket--tr" aria-hidden="true" />
        <span className="vx-hero__bracket vx-hero__bracket--bl" aria-hidden="true" />
        <span className="vx-hero__bracket vx-hero__bracket--br" aria-hidden="true" />

        <div className="vx-hero__hud">
          <div className="vx-hero__row vx-hero__fade">
            <Mono className="vx-hero__mono">Curtorim · Salcete · South Goa</Mono>
            <div className="vx-hero__readout" aria-hidden="true">
              <span>LAT <span ref={latRef}>15.2763</span> N</span>
              <span>LON <span ref={lonRef}>74.0013</span> E</span>
              <span>TRACK <span ref={trackRef}>000</span>%</span>
            </div>
          </div>

          <div className="vx-hero__lines">
            {STATEMENTS.map((statement, index) => {
              const Tag = index === 0 ? 'h1' : 'p';
              return (
                <Tag key={statement.lead} className="vx-hero__line" aria-hidden={index === 0 ? undefined : true}>
                  {statement.lead}<br /><span>{statement.tail}</span>
                </Tag>
              );
            })}
          </div>

          <div className="vx-hero__row vx-hero__fade">
            <div className="vx-hero__foot">
              <p className="vx-hero__sub">Row villas at Curtorim, South Goa — designed, priced and built by one bureau, in lime, laterite and teak.</p>
              <div className="vx-hero__cta">
                <button type="button" className="vx-button vx-button--light" onClick={() => openEnquiry("Nature's Cove — Curtorim")}>
                  Arrange a viewing <ArrowUpRightIcon size={14} />
                </button>
                <Link href="/residences/natures-cove" className="vx-button vx-button--ghost vx-button--ghost-light">
                  The residence <ArrowUpRightIcon size={14} />
                </Link>
              </div>
            </div>
            <span className="vx-hero__hint vx-mono vx-hero__mono">Scroll <i aria-hidden="true" /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
