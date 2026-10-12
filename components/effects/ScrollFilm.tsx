"use client";
import { useEffect, useMemo, useRef, useState } from 'react';

/** How the camera travels across a section, from the moment it enters to the moment it leaves. */
export type CameraMove = 'push' | 'pull' | 'pan-left' | 'pan-right' | 'rise' | 'bank';

export type Shot = {
  /** id of the section this film sits behind. */
  section: string;
  src: string;
  poster: string;
  /** Opacity of the paper veil over the film while this section reads (0 = full film). */
  veil: number;
  move: CameraMove;
};

type Layer = { src: string; poster: string; sections: number[] };
type Style = 'opacity' | 'transform' | 'visibility';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Camera at progress t (0 → 1) through a section, as scale / x% / y% / rotation. Completely stable, zero shake/tilt. */
function camera(move: CameraMove, t: number) {
  switch (move) {
    case 'push': return { s: mix(1.08, 1.02, t), x: 0, y: mix(0.5, -0.5, t), r: 0 };
    case 'pull': return { s: mix(1.02, 1.08, t), x: 0, y: mix(-0.5, 0.5, t), r: 0 };
    case 'pan-left': return { s: 1.05, x: mix(1.5, -1.5, t), y: 0, r: 0 };
    case 'pan-right': return { s: 1.05, x: mix(-1.5, 1.5, t), y: 0, r: 0 };
    case 'rise': return { s: 1.05, x: 0, y: mix(1.5, -1.5, t), r: 0 };
    case 'bank': return { s: 1.05, x: 0, y: 0, r: 0 };
  }
}

/**
 * The page's film stage. One fixed layer sits behind the whole page and carries a film
 * per section: as a section rises into view its film dissolves in over the last one, a
 * paper veil thickens or thins so copy stays readable, and the camera drifts across the
 * section's passage — push, pan, rise or bank — the way a drone holds a subject while the
 * page moves past it. Scroll speed briefly breathes the lens.
 *
 * Everything is read from layout each frame (no ScrollTrigger ranges), so pinned sections
 * and late-loading content can never put it out of step. Consecutive sections that share a
 * film share one layer. Only the film on screen and its neighbours load, only what is
 * visible plays, and reduced-motion or data-saver visitors get still posters that cut
 * between sections instead of moving.
 */
export default function ScrollFilm({ shots }: { shots: Shot[] }) {
  const lensRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const resyncRef = useRef<() => void>(() => {});
  const [current, setCurrent] = useState(-1);
  const [stills, setStills] = useState(true);

  const layers = useMemo(() => shots.reduce<Layer[]>((list, shot, index) => {
    const last = list[list.length - 1];
    if (last && last.src === shot.src) last.sections.push(index);
    else list.push({ src: shot.src, poster: shot.poster, sections: [index] });
    return list;
  }, []), [shots]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const still = reduced || Boolean(connection?.saveData);
    const sections = shots.map(shot => document.getElementById(shot.section));
    const layerOf = shots.map((_, index) => layers.findIndex(layer => layer.sections.includes(index)));

    // Style writes are skipped when unchanged, so a still frame costs only the reads.
    const written = new WeakMap<HTMLElement, Partial<Record<Style, string>>>();
    const write = (el: HTMLElement | null | undefined, key: Style, value: string) => {
      if (!el) return;
      const cache = written.get(el) ?? {};
      if (cache[key] === value) return;
      el.style[key] = value;
      cache[key] = value;
      written.set(el, cache);
    };

    let frame = 0;
    let focus = -1;
    let playing = new Set<number>();
    const startFrame = requestAnimationFrame(() => setStills(still));

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      // Read everything first — one layout pass, then only writes.
      const rects = sections.map(section => section?.getBoundingClientRect() ?? null);
      // A section's film fades in as its top climbs from the bottom edge to a quarter down.
      const arrival = rects.map((rect, index) => (index === 0 || !rect ? 1 : clamp((vh - rect.top) / (vh * 0.75))));
      let settled = 0;
      arrival.forEach((value, index) => { if (value >= 1 && rects[index]) settled = index; });
      const hasNext = settled + 1 < shots.length;
      const incoming = hasNext ? arrival[settled + 1] : 0;
      const blend = still ? (incoming >= 0.5 ? 1 : 0) : ease(incoming);
      const base = layerOf[settled];
      const next = hasNext ? layerOf[settled + 1] : base;

      layers.forEach((layer, index) => {
        const el = layerRefs.current[index];
        const visible = index === base || (index === next && blend > 0);
        write(el, 'visibility', visible ? 'visible' : 'hidden');
        write(el, 'opacity', index === next && next !== base ? blend.toFixed(3) : visible ? '1' : '0');
        if (!visible || still) return;

        // Camera progress runs across the layer's whole span of sections, starting when
        // the first one enters (or at the top of the page, for what is already on screen).
        const first = rects[layer.sections[0]];
        const last = rects[layer.sections[layer.sections.length - 1]];
        if (!first || !last) return;
        const begin = Math.min(vh, first.top + scrollY);
        const t = clamp((begin - first.top) / Math.max(1, last.bottom - first.top + begin));
        const owner = layer.sections.reduce((pick, sectionIndex) => (arrival[sectionIndex] > 0.5 ? sectionIndex : pick), layer.sections[0]);
        const { s, x, y, r } = camera(shots[owner].move, t);
        write(el, 'transform', `translate3d(${x.toFixed(2)}%, ${y.toFixed(2)}%, 0) scale(${s.toFixed(4)}) rotate(${r.toFixed(3)}deg)`);
      });

      const veil = mix(shots[settled].veil, hasNext ? shots[settled + 1].veil : shots[settled].veil, blend);
      write(veilRef.current, 'opacity', veil.toFixed(3));

      // Lens stays perfectly steady without shaking or breathing on scroll
      write(lensRef.current, 'transform', 'scale(1)');

      // Load the film on screen and its neighbours; play only what can be seen.
      const nextFocus = blend > 0.5 ? next : base;
      if (nextFocus !== focus) { focus = nextFocus; setCurrent(nextFocus); }
      if (still) return;
      const heroVisible = (rects[0]?.bottom ?? 0) > 0;
      const wanted = new Set<number>(heroVisible || veil >= 0.98 ? [] : [nextFocus]);
      const changed = wanted.size !== playing.size || [...wanted].some(index => !playing.has(index));
      if (!changed) return;
      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        if (wanted.has(index) && !document.hidden) void video.play().catch(() => {});
        else video.pause();
      });
      playing = wanted;
    };

    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    // Forget what is playing and re-decide — after the tab returns or a film finishes attaching.
    const resync = () => { playing = new Set(); request(); };
    resyncRef.current = resync;
    request();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    document.addEventListener('visibilitychange', resync);
    const observer = new ResizeObserver(request);
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(startFrame);
      resyncRef.current = () => {};
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      document.removeEventListener('visibilitychange', resync);
      observer.disconnect();
    };
  }, [shots, layers]);

  return (
    <div className="vx-film" data-film-aperture aria-hidden="true">
      <div ref={lensRef} className="vx-film__lens">
        {layers.map((layer, index) => {
          const armed = !stills && current === index;
          return (
            <div
              key={`${layer.src}-${index}`}
              ref={el => { layerRefs.current[index] = el; }}
              className="vx-film__layer vx-video"
              style={{ opacity: index === 0 ? 1 : 0, visibility: index === 0 ? 'visible' : 'hidden' }}
            >
              <img className="vx-video__poster" src={layer.poster} alt="" decoding="async" fetchPriority={index === 0 ? 'high' : 'low'} />
              {armed && (
                <video
                  ref={el => {
                    videoRefs.current[index] = el;
                    // Unloaded: the poster shows again until a fresh film is actually playing.
                    if (!el) layerRefs.current[index]?.removeAttribute('data-playing');
                  }}
                  className="vx-video__film"
                  src={layer.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedData={() => resyncRef.current()}
                  onPlaying={event => { event.currentTarget.parentElement?.setAttribute('data-playing', 'true'); }}
                  onWaiting={event => event.currentTarget.parentElement?.removeAttribute('data-playing')}
                  onPause={event => event.currentTarget.parentElement?.removeAttribute('data-playing')}
                  onError={event => { event.currentTarget.parentElement?.removeAttribute('data-playing'); }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="vx-film__shade" />
      <div ref={veilRef} className="vx-film__veil" style={{ opacity: shots[0]?.veil ?? 0 }} />
    </div>
  );
}
