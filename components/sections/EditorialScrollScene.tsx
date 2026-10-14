"use client";

import { useEffect, useId, useRef } from 'react';
import { imageSet, media } from '@/lib/media';
import './editorial-scroll-scene.css';

type Variant = 'fan' | 'panels' | 'collage';
type SceneImage = { src: string; alt: string; caption: string };
const DEFAULT_IMAGES: [SceneImage, SceneImage, SceneImage] = [
  { src: media.villa, alt: 'Architectural inspiration: a home surrounded by greenery', caption: 'The architecture' },
  { src: media.interior, alt: 'Interior inspiration: a light-filled living space', caption: 'The everyday' },
  { src: media.goa, alt: 'Lifestyle inspiration: palms along the Goa coastline', caption: 'The surroundings' },
];

/** One scoped scroll driver, three compositions. Content is readable before enhancement. */
export default function EditorialScrollScene({
  variant, label, title, emphasis, description, word, images = DEFAULT_IMAGES,
}: {
  variant: Variant;
  label: string;
  title: string;
  emphasis: string;
  description: string;
  word: string;
  images?: [SceneImage, SceneImage, SceneImage];
}) {
  const ref = useRef<HTMLElement>(null);
  const id = useId();

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const match = gsap.matchMedia();
      match.add('(min-width: 1000px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)', () => {
        section.dataset.sceneReady = 'true';
        const cards = section.querySelectorAll<HTMLElement>('.editorial-scene__photo');
        const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          trigger: section,
          start: () => `top top+=${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar')) || 72}`,
          end: 'bottom bottom', scrub: .8, invalidateOnRefresh: true,
        } });

        if (variant === 'fan') {
          cards.forEach((card, index) => {
            const direction = index - 1;
            timeline.fromTo(card,
              { xPercent: direction * 8, yPercent: index * 5, rotation: direction * 3, scale: .92 },
              { xPercent: direction * 55, yPercent: direction === 0 ? -8 : 5, rotation: direction * 11, scale: 1, duration: 1 }, 0);
          });
        } else if (variant === 'panels') {
          cards.forEach((card, index) => {
            timeline.fromTo(card,
              { yPercent: index % 2 ? 24 : -18, scale: .94 },
              { yPercent: index % 2 ? -8 : 8, scale: 1, duration: 1 }, 0);
            timeline.fromTo(card.querySelector('img'), { scale: 1.12 }, { scale: 1, duration: 1 }, 0);
          });
        } else {
          timeline.fromTo(cards[0], { rotation: -5, yPercent: 9 }, { rotation: 3, yPercent: -5, duration: 1 }, 0)
            .fromTo(cards[1], { xPercent: 18, yPercent: 25, rotation: 8 }, { xPercent: -8, yPercent: -12, rotation: -6, duration: 1 }, 0)
            .fromTo(cards[2], { xPercent: -10, yPercent: -15, rotation: -8 }, { xPercent: 8, yPercent: 12, rotation: 6, duration: 1 }, 0);
        }
        timeline.fromTo(section.querySelector('.editorial-scene__word'), { xPercent: 8 }, { xPercent: -12, duration: 1 }, 0)
          .fromTo(section.querySelector('h2 em'), { x: 18 }, { x: -12, duration: 1 }, 0)
          .fromTo(section.querySelector('.editorial-scene__seal'), { rotation: -20 }, { rotation: 100, duration: 1 }, 0)
          .fromTo(section.querySelector('.editorial-scene__progress i'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
        const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => { cancelAnimationFrame(refresh); delete section.dataset.sceneReady; };
      });
      cleanup = () => { match.revert(); delete section.dataset.sceneReady; };
    }).catch(() => { delete section.dataset.sceneReady; });
    return () => { disposed = true; cleanup?.(); };
  }, [variant, title, emphasis]);

  return <section ref={ref} className={`editorial-scene editorial-scene--${variant}`} aria-labelledby={`${id}-title`} data-anim-owned>
    <div className="editorial-scene__stage">
      <div className="editorial-scene__copy">
        <p className="estate-label">{label}</p>
        <h2 id={`${id}-title`}>{title}<em>{emphasis}</em></h2>
        <p>{description}</p>
        <p className="editorial-scene__note">Architecture &amp; lifestyle inspiration</p>
      </div>
      <div className="editorial-scene__gallery">
        {images.map((picture, index) => <figure className="editorial-scene__photo" key={index}>
          <div className="editorial-scene__image"><img src={picture.src} srcSet={picture.src.startsWith('/images/') ? imageSet(picture.src) : undefined} sizes="(min-width: 1000px) 40vw, (min-width: 600px) 50vw, 92vw" alt={picture.alt} loading="lazy" width="960" height="720" /></div>
          <figcaption>{picture.caption}</figcaption>
        </figure>)}
      </div>
      <svg className="editorial-scene__seal" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" /><path d="M50 10V90M10 50H90M22 22L78 78M22 78L78 22" /><circle cx="50" cy="50" r="24" /></svg>
      <span className="editorial-scene__word" aria-hidden="true">{word}</span>
      <div className="editorial-scene__progress" aria-hidden="true"><span>Take a closer look</span><span><i /></span><span>Victorino / Goa</span></div>
    </div>
  </section>;
}
