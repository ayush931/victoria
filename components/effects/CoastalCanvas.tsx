"use client";
import { useEffect, useRef } from 'react';

type Mote = { x: number; y: number; z: number; vx: number; vy: number; r: number; warm: boolean };
type Ripple = { x: number; y: number; t: number };

/**
 * Ambient 2D layer: sea-spray motes drifting on a slow onshore wind.
 * The pointer pushes them aside, scroll velocity carries them, a click sets a tide ring.
 * Soft-light blending keeps it legible over both the dark hero and the limestone sections.
 */
export default function CoastalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let width = 0, height = 0, dpr = 1;
    let motes: Mote[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: -1e4, y: -1e4, active: false };
    let scrollVelocity = 0, lastScroll = window.scrollY, frame = 0, last = performance.now();

    function resize() {
      if (!canvas || !context) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(150, Math.max(40, (width * height) / 16000)));
      motes = Array.from({ length: count }, () => spawn());
    }

    function spawn(): Mote {
      const z = 0.35 + Math.random() * 0.65;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (0.1 + Math.random() * 0.35) * z,
        vy: (Math.random() - 0.5) * 0.14 * z,
        r: (0.6 + Math.random() * 1.9) * z,
        warm: Math.random() > 0.45,
      };
    }

    function draw(now: number) {
      if (!context) return;
      const delta = Math.min((now - last) / 16.667, 3);
      last = now;
      scrollVelocity *= 0.92;
      context.clearRect(0, 0, width, height);

      for (const mote of motes) {
        const dx = mote.x - pointer.x;
        const dy = mote.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (pointer.active && distance < 170) {
          const push = ((170 - distance) / 170) ** 2 * 1.6 * mote.z;
          mote.x += (dx / (distance || 1)) * push * delta;
          mote.y += (dy / (distance || 1)) * push * delta;
        }
        mote.x += mote.vx * delta;
        mote.y += (mote.vy - scrollVelocity * 0.012 * mote.z) * delta;
        if (mote.x > width + 12) mote.x = -12;
        if (mote.y < -12) mote.y = height + 12;
        else if (mote.y > height + 12) mote.y = -12;
        context.beginPath();
        context.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2);
        context.fillStyle = mote.warm
          ? `rgba(176, 100, 63, ${0.05 + mote.z * 0.1})`
          : `rgba(30, 43, 48, ${0.04 + mote.z * 0.09})`;
        context.fill();
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.t += 0.012 * delta;
        if (ripple.t >= 1) { ripples.splice(index, 1); continue; }
        const eased = 1 - (1 - ripple.t) ** 3;
        context.beginPath();
        context.arc(ripple.x, ripple.y, 12 + eased * 190, 0, Math.PI * 2);
        context.strokeStyle = `rgba(30, 43, 48, ${(1 - ripple.t) * 0.18})`;
        context.lineWidth = 1.1;
        context.stroke();
      }

      frame = requestAnimationFrame(draw);
    }

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true;
    };
    const leave = () => { pointer.active = false; pointer.x = -1e4; pointer.y = -1e4; };
    const tap = (event: PointerEvent) => { if (ripples.length < 6) ripples.push({ x: event.clientX, y: event.clientY, t: 0 }); };
    const scroll = () => { scrollVelocity = window.scrollY - lastScroll; lastScroll = window.scrollY; };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) { last = performance.now(); frame = requestAnimationFrame(draw); }
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', tap, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    document.documentElement.addEventListener('pointerleave', leave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', tap);
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('visibilitychange', visibility);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);
  return <canvas ref={canvasRef} className="vx-ambient" aria-hidden="true" />;
}
