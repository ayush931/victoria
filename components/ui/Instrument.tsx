"use client";
import { useEffect, useRef, useState, type ReactNode } from 'react';
import ShaderCanvas from '@/components/effects/ShaderCanvas';
import { RIPPLE_FRAGMENT, GLASS_FRAGMENT } from '@/lib/shaders';
import { imageSet } from '@/lib/media';

/** Bracketed monospace micro-label — the unit of annotation across the site. */
export function Mono({ children, bracket = true, ink = false, className = '' }: {
  children: ReactNode; bracket?: boolean; ink?: boolean; className?: string;
}) {
  return (
    <span className={`vx-mono ${bracket ? 'vx-bracket' : ''} ${ink ? 'vx-mono--ink' : ''} ${className}`}>
      {children}
    </span>
  );
}

/** The oversized numbered section head, with its hairline rule. */
export function SectionHead({ index, title, left, right, children }: {
  index: string; title: string; left?: string; right?: string; children?: ReactNode;
}) {
  return (
    <div className="vx-head">
      {(left || right) && (
        <div className="vx-head__meta">
          <Mono>{left ?? ''}</Mono>
          <Mono>{right ?? ''}</Mono>
        </div>
      )}
      <span className="vx-head__index" aria-hidden="true">{index}</span>
      <h2>{title}</h2>
      {children}
      <hr className="vx-rule vx-head__rule" />
    </div>
  );
}

export type Stat = { value: string; label: string };

/** Three figures across a rule; the middle one reads as active until pointed at. */
export function StatRow({ stats }: { stats: Stat[] }) {
  const [active, setActive] = useState(Math.floor(stats.length / 2));
  return (
    <div className="vx-stats">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          data-active={active === index}
          onPointerEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
          tabIndex={0}
        >
          <strong>{stat.value}</strong>
          <Mono>{stat.label}</Mono>
        </div>
      ))}
    </div>
  );
}

export type StackItem = { name: string; value: string; text: string; image: string; alt: string };

/** Vertical switcher, centred media, spec on the right — the reference's signature block. */
export function TabStack({ items, label, footLeft = 'Fabric', footRight = 'Spec', distortion }: {
  items: StackItem[]; label: string; footLeft?: string; footRight?: string; distortion?: 'water' | 'glass';
}) {
  const [active, setActive] = useState(0);
  const mediaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    void import('gsap').then(({ default: gsap }) => {
      if (disposed || !mediaRef.current) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(mediaRef.current, { clipPath: 'inset(0 0 100% 0)' }, {
          clipPath: 'inset(0 0 0% 0)', duration: .8, ease: 'power3.out', clearProps: 'clipPath',
        });
      });
      revert = () => ctx.revert();
    });
    return () => { disposed = true; revert?.(); };
  }, [active]);
  const item = items[active];
  return (
    <div>
      <div className="vx-stack">
        <div className="vx-stack__tabs" role="tablist" aria-label={label} aria-orientation="vertical">
          {items.map((entry, index) => (
            <button
              key={entry.name}
              role="tab"
              id={`${label}-tab-${index}`}
              aria-selected={active === index}
              aria-controls={`${label}-panel`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={event => {
                let next = index;
                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % items.length;
                else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + items.length - 1) % items.length;
                else if (event.key === 'Home') next = 0;
                else if (event.key === 'End') next = items.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                document.getElementById(`${label}-tab-${next}`)?.focus();
              }}
            >
              {entry.name}
            </button>
          ))}
        </div>
        <div ref={mediaRef} className="vx-stack__media" data-anim-owned>
          <img src={item.image} srcSet={imageSet(item.image)} sizes="(max-width: 1000px) 92vw, 46vw" alt={item.alt} loading="lazy" />
          {distortion && <ShaderCanvas fragment={distortion === 'water' ? RIPPLE_FRAGMENT : GLASS_FRAGMENT} image={item.image.replace('-4k.jpg', '-1600.webp')} pointer="element" maxDpr={1.25} />}
        </div>
        <div className="vx-stack__spec" id={`${label}-panel`} role="tabpanel" aria-labelledby={`${label}-tab-${active}`} tabIndex={0}>
          <strong>{item.value}</strong>
          <p>{item.text}</p>
        </div>
      </div>
      <div className="vx-stack__foot">
        <Mono>{footLeft}</Mono>
        <Mono>{footRight}</Mono>
      </div>
    </div>
  );
}

export type Record = { title: string; grade: 'low' | 'moderate' | 'high'; note: string; body: string };

/** Expanding rows — the reference's risk cards, used here for diligence notes. */
export function RecordList({ records }: { records: Record[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="vx-records">
      {records.map((record, index) => (
        <div key={record.title} className="vx-record" data-open={open === index}>
          <button
            type="button"
            className="vx-record__head"
            aria-expanded={open === index}
            aria-controls={`record-${index}`}
            onClick={() => setOpen(open === index ? null : index)}
          >
            <Mono>{String(index + 1).padStart(2, '0')}</Mono>
            <span className="vx-record__title">{record.title}</span>
            <span className="vx-record__grade" data-grade={record.grade}>{record.note}</span>
            <span className="vx-record__toggle" aria-hidden="true" />
          </button>
          <div className="vx-record__body" id={`record-${index}`} role="region">
            <div><p>{record.body}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Infinite ticker in the instrument language. */
export function Ticker({ items, speed = 38 }: { items: string[]; speed?: number }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="vx-marquee" aria-hidden="true">
      <div className="vx-marquee__row" style={{ ['--marquee-speed' as string]: `${speed}s` }}>
        {[0, 1].map(half => (
          <span key={half} style={{ display: 'flex' }}>
            {row.map((item, index) => (
              <span key={`${half}-${index}`}><em>{item}</em><i /></span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Before / after wipe. Pointer, touch and keyboard all move the split. */
export function Compare({ before, after, beforeLabel, afterLabel, beforeAlt, afterAlt }: {
  before: string; after: string; beforeLabel: string; afterLabel: string; beforeAlt: string; afterAlt: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const dragging = useRef(false);

  function moveTo(clientX: number) {
    const host = hostRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    setSplit(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }

  useEffect(() => {
    const move = (event: PointerEvent) => { if (dragging.current) moveTo(event.clientX); };
    const up = () => { dragging.current = false; };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, []);

  return (
    <div
      ref={hostRef}
      className="vx-compare"
      style={{ ['--split' as string]: `${split}%` }}
      onPointerDown={event => { dragging.current = true; moveTo(event.clientX); }}
    >
      <img src={before} srcSet={imageSet(before)} sizes="100vw" alt={beforeAlt} loading="lazy" draggable={false} />
      <img className="vx-compare__top" src={after} srcSet={imageSet(after)} sizes="100vw" alt={afterAlt} loading="lazy" draggable={false} />
      <span className="vx-compare__label" style={{ left: 16 }}>{beforeLabel}</span>
      <span className="vx-compare__label" style={{ right: 16 }}>{afterLabel}</span>
      <div
        className="vx-compare__handle"
        role="slider"
        tabIndex={0}
        aria-label={`Reveal ${afterLabel} over ${beforeLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft') setSplit(value => Math.max(0, value - 4));
          else if (event.key === 'ArrowRight') setSplit(value => Math.min(100, value + 4));
          else return;
          event.preventDefault();
        }}
      />
    </div>
  );
}
