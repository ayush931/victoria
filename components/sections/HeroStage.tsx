"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HeroStage() {
  const film = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [requested, setRequested] = useState(true);
  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = true;
    const sync = () => {
      if (requested && visible && !document.hidden && !preference.matches && !connection?.saveData) {
        if (!video.getAttribute('src')) video.src = '/videos/architectural-villa-hd.mp4';
        void video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    sync();
    return () => { observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', sync); preference.removeEventListener('change', sync); };
  }, [requested]);
  return <section id="top" className="estate-hero" data-no-anim>
    <div className="estate-hero__lens"><video ref={film} className="estate-hero__film" poster="/images/property-film-poster.jpg" muted playsInline loop preload="none" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <div className="estate-hero__shade" /></div>
    <div className="estate-hero__content">
      <p className="estate-label">Victorino Luxury Homes · Goa</p>
      <h1>Some places<br />feel like <em>home.</em></h1>
      <div className="estate-hero__bottom">
        <p>Considered villas. Quiet neighbourhoods.<br />Discover your own corner of Goa.</p>
        <Link href="#residences" data-scroll-to data-scroll-to-offset="-120" data-scroll-to-duration="1" className="estate-button estate-button--light">Explore our homes <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
    <div className="estate-hero__foot"><span>Goa homes · Architecture inspiration</span><button type="button" onClick={() => setRequested(!playing)} aria-label={playing ? 'Pause background film' : 'Play background film'}>{playing ? 'Pause film Ⅱ' : 'Play film ▷'}</button></div>
  </section>;
}
