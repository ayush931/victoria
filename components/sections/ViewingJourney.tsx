"use client";
import { useEffect, useRef, useState } from 'react';
import { openEnquiry } from '@/lib/enquiry';

const STEPS = [
  { n: '01', title: 'Tell us what matters.', text: 'Share your preferred location, the kind of home you have in mind and how you plan to use it.' },
  { n: '02', title: 'Explore the details.', text: 'Ask about current availability, layouts, specifications and pricing for the residences that interest you.' },
  { n: '03', title: 'Experience the setting.', text: 'Arrange a personal viewing with our team. Walk through the home and take a look around the neighbourhood.' },
  { n: '04', title: 'Consider your next step.', text: 'Request the relevant project information and documentation. Take time to review it with your advisers.' },
];

export default function ViewingJourney() {
  const ref = useRef<HTMLElement>(null);
  const advance = useRef<((step: number) => void) | undefined>(undefined);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const match = gsap.matchMedia();
      match.add('(min-width: 1000px) and (min-height: 750px) and (prefers-reduced-motion: no-preference)', () => {
        const track = section.querySelector<HTMLElement>('.estate-journey__steps');
        const viewport = section.querySelector<HTMLElement>('.estate-journey__viewport');
        if (!track || !viewport) return;
        section.dataset.journeyReady = 'true';
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const measure = () => section.style.setProperty('--journey-travel', `${distance()}px`);
        measure();
        let current = 0;
        const tween = gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar')) || 72}`,
            end: 'bottom bottom', scrub: .75, invalidateOnRefresh: true,
            onRefreshInit: measure,
            onRefresh: self => {
              current = Math.round(self.progress * (STEPS.length - 1));
              setActive(current);
            },
            onUpdate: self => {
              const index = Math.round(self.progress * (STEPS.length - 1));
              if (current !== index) { current = index; setActive(index); }
            },
          },
        });
        advance.current = direction => {
          const trigger = tween.scrollTrigger;
          if (!trigger) return;
          const next = Math.max(0, Math.min(STEPS.length - 1, current + direction));
          const y = trigger.start + (trigger.end - trigger.start) * next / (STEPS.length - 1);
          const engine = (window as Window & { __locomotive?: { scrollTo: (y: number, options: object) => void } }).__locomotive;
          if (engine) engine.scrollTo(y, { duration: .8 });
          else window.scrollTo({ top: y, behavior: 'smooth' });
        };
        return () => {
          advance.current = undefined;
          delete section.dataset.journeyReady;
          section.style.removeProperty('--journey-travel');
        };
      });
      cleanup = () => match.revert();
    }).catch(() => {});
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return <section ref={ref} className="estate-journey estate-wrap" aria-labelledby="journey-title" data-anim-owned>
    <div className="estate-journey__stage">
      <div className="estate-section-head"><div><p className="estate-label">From first look to first visit / 05</p><h2 id="journey-title">Take your time.<br /><em>We’ll guide the way.</em></h2></div><p>A home is a personal decision. Start with a conversation and get the information you need to take the next step.</p></div>
      <div className="estate-journey__viewport"><div className="estate-journey__steps">{STEPS.map((step, index) => <article key={step.n} data-current={active === index ? 'true' : undefined}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div>
      <div className="estate-journey__toolbar"><button type="button" className="estate-text-link" onClick={() => openEnquiry()}>Start a conversation ↗</button><div className="estate-journey__controls"><button type="button" aria-label="Previous viewing step" onClick={() => advance.current?.(-1)} disabled={active === 0}>←</button><span>{String(active + 1).padStart(2, '0')} / 04</span><button type="button" aria-label="Next viewing step" onClick={() => advance.current?.(1)} disabled={active === STEPS.length - 1}>→</button><a href="#buyer-questions" data-scroll-to data-scroll-to-offset="-120" data-scroll-to-duration="1">Skip to questions ↓</a></div></div>
    </div>
  </section>;
}
