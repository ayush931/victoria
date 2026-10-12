"use client";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { DragIcon } from '@/components/ui/Icons';
import { imageSet } from '@/lib/media';

export type GalleryItem = { image: string; alt: string; title: string; note: string };

/** A hand-dragged 2D strip: pointer drag with inertia, wheel, keyboard and a live position bar. */
export default function DragGallery({ items, label }: { items: GalleryItem[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const target = useRef(0);
  const max = useRef(0);
  const start = useRef(0);
  const startOffset = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const frame = useRef(0);
  const barRef = useRef<HTMLElement>(null);
  const [grabbing, setGrabbing] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    max.current = Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? 0));
    target.current = Math.min(target.current, max.current);
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new ResizeObserver(measure);
    if (track) observer.observe(track);
    window.addEventListener('resize', measure);

    const render = () => {
      if (!dragging.current) {
        target.current = Math.min(max.current, Math.max(0, target.current + velocity.current));
        velocity.current *= 0.92;
        if (Math.abs(velocity.current) < 0.05) velocity.current = 0;
      }
      offset.current += (target.current - offset.current) * (reduced ? 1 : 0.12);
      if (track) track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
      // Written straight to the DOM: a state update per frame would re-render the whole strip.
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.04, max.current ? offset.current / max.current : 0)})`;
      frame.current = requestAnimationFrame(render);
    };
    frame.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame.current); observer.disconnect(); window.removeEventListener('resize', measure); };
  }, [measure]);

  function down(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    dragging.current = true;
    velocity.current = 0;
    start.current = event.clientX;
    startOffset.current = target.current;
    setGrabbing(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const next = Math.min(max.current, Math.max(0, startOffset.current - (event.clientX - start.current) * 1.15));
    velocity.current = next - target.current;
    target.current = next;
  }
  function up(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    setGrabbing(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function step(direction: 1 | -1) {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    const distance = card ? card.offsetWidth + 24 : 320;
    target.current = Math.min(max.current, Math.max(0, target.current + direction * distance));
  }

  return (
    <div className="vx-drag" role="group" aria-label={label}>
      <div className="vx-drag__window" data-cursor="DRAG">
        <div
          ref={trackRef}
          className={`vx-drag__track ${grabbing ? 'is-grabbing' : ''}`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          {items.map(item => (
            <figure key={item.title} className="vx-drag__card">
              <img src={item.image} srcSet={imageSet(item.image)} sizes="(max-width: 760px) 70vw, 28vw" alt={item.alt} loading="lazy" draggable={false} />
              <figcaption><strong>{item.title}</strong><span>{item.note}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="vx-drag__foot">
        <span className="vx-mono"><DragIcon size={13} /> DRAG THE STRIP OR USE THE ARROWS</span>
        <span className="vx-drag__bar" aria-hidden="true"><i ref={barRef} /></span>
        <span className="vx-drag__buttons">
          <button type="button" onClick={() => step(-1)} aria-label={`Previous in ${label}`}>←</button>
          <button type="button" onClick={() => step(1)} aria-label={`Next in ${label}`}>→</button>
        </span>
      </div>
    </div>
  );
}
