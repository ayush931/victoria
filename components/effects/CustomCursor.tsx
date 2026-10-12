"use client";
import { useEffect, useRef } from 'react';

/** A small pointer accent; the native cursor remains available everywhere. */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let x = 0, y = 0;
    const hide = () => { node.style.opacity = '0'; };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') return hide();
      const target = event.target as Element;
      if (target.closest('input, textarea, select, [contenteditable], dialog, [role="dialog"]')) return hide();
      x = event.clientX; y = event.clientY;
      node.dataset.active = String(Boolean(target.closest('a, button, [role="tab"], [role="slider"]')));
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        node.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
        node.style.opacity = '1';
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    media.addEventListener('change', hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', hide);
      document.documentElement.removeEventListener('pointerleave', hide);
      media.removeEventListener('change', hide);
    };
  }, []);
  return <div ref={ref} className="vx-pointer-accent" aria-hidden="true" />;
}
