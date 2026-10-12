"use client";
import { useEffect, useRef } from 'react';

const PRINCIPLES = [
  { title: 'Listen to the place.', text: 'Start with the setting: its light, breeze, landscape and the character of the neighbourhood.' },
  { title: 'Make room for life.', text: 'Consider how rooms connect, where people gather and where a little privacy makes all the difference.' },
  { title: 'Resolve the details.', text: 'Bring materials, proportions and everyday function together. A home should reward a closer look.' },
  { title: 'Think beyond today.', text: 'Consider how a place will be lived in and cared for over time, as routines and needs change.' },
];
const LINES = [
  'M60 80H440V420H60Z',
  'M220 170H320V300H220Z M60 170H220 M320 170H440 M220 300H60 M320 300H440',
  'M150 80V170 M350 80V170 M150 300V420 M350 300V420 M220 170V80 M320 300V420',
  'M90 105H120V140H90Z M370 105H410V140H370Z M85 330H120V390H85Z M370 330H415V390H370Z M245 205H295V260H245Z',
];
export default function StudioTimeline() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const match = gsap.matchMedia();
      match.add('(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
        section.dataset.timelineReady = 'true';
        const steps = section.querySelectorAll('.studio-timeline__step');
        section.querySelectorAll<SVGPathElement>('[data-plan-line]').forEach((path, index) => {
          const length = path.getTotalLength();
          gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
            strokeDashoffset: 0, ease: 'none',
            scrollTrigger: { trigger: steps[index], start: 'top 85%', end: 'center 45%', scrub: .55 },
          });
        });
        gsap.fromTo(section.querySelector('.studio-timeline__rail i'), { scaleY: 0 }, {
          scaleY: 1, transformOrigin: 'top', ease: 'none',
          scrollTrigger: { trigger: section.querySelector('.studio-timeline__steps'), start: 'top 65%', end: 'bottom 65%', scrub: .5 },
        });
        return () => { delete section.dataset.timelineReady; };
      });
      cleanup = () => match.revert();
    }).catch(() => {});
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return <section ref={ref} className="studio-timeline estate-wrap" data-anim-owned aria-labelledby="studio-timeline-title">
    <div className="studio-timeline__visual"><p className="estate-label">A considered approach</p><h2 id="studio-timeline-title">From the place<br />to the <em>details.</em></h2><svg viewBox="0 0 500 500" role="img" aria-label="Conceptual courtyard diagram"><g fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".15">{LINES.map(line => <path key={line} d={line} />)}</g><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">{LINES.map(line => <path key={line} d={line} data-plan-line />)}</g><g fill="currentColor" fontSize="9" fontFamily="monospace"><text x="230" y="330">COURTYARD</text><text x="60" y="455">CONCEPT STUDY / VICTORINO</text></g></svg><p>Conceptual design diagram</p></div>
    <div className="studio-timeline__steps"><span className="studio-timeline__rail" aria-hidden="true"><i /></span>{PRINCIPLES.map((step, index) => <article key={step.title} className="studio-timeline__step"><span className="studio-timeline__number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
  </section>;
}
