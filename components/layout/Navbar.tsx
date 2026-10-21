"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { openEnquiry } from '@/lib/enquiry';

const ROUTES = [
  { href: '/', label: 'Home', index: '01' },
  { href: '/residences/natures-cove', label: "Nature's Cove", index: '02' },
  { href: '/villas', label: 'Villas', index: '03' },
  { href: '/premium-homes', label: 'Premium Homes', index: '04' },
  { href: '/work', label: 'Work', index: '05' },
  { href: '/about', label: 'About', index: '06' },
  { href: '/journal', label: 'Journal', index: '07' },
  { href: '/contact', label: 'Contact', index: '08' },
];

/** The bureau mark: a surveyor's cross inside a square. */
function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="vx-bar__mark" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2.6" y="2.6" width="18.8" height="18.8" />
      <path d="M12 2.6v18.8M2.6 12h18.8" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  );
}

/** Live IST readout — the studio runs on Goa time, and the bar says so. */
function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata',
    }).format(new Date()));
    const frame = requestAnimationFrame(tick);
    const timer = setInterval(tick, 10000);
    return () => { cancelAnimationFrame(frame); clearInterval(timer); };
  }, []);
  // Empty until mounted, so the server and client markup agree.
  return <span className="vx-bar__clock" suppressHydrationWarning>{time ? `IST ${time}` : ''}</span>;
}

/** `onOpenConcierge` is honoured for pages that still own their modal state; otherwise the enquiry event opens it. */
export default function Navbar({ onOpenConcierge, overHero }: { onOpenConcierge?: () => void; overHero?: boolean } = {}) {
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(Boolean(overHero));
  const isCurrent = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/villas') {
      return pathname === '/villas'
        || (pathname.startsWith('/residences/') && pathname !== '/residences/natures-cove');
    }
    return pathname === href;
  };
  // On the index the bar floats clear over the film, then settles onto paper once the hero is behind it.
  useEffect(() => {
    if (!overHero) return;
    const header = headerRef.current;
    // Scope to this page: cached routes can retain hidden hero elements in the DOM.
    const hero = header?.nextElementSibling?.querySelector<HTMLElement>('#top');
    if (!header || !hero) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const bounds = hero.getBoundingClientRect();
      setLight(bounds.height > 0 && bounds.bottom > header.getBoundingClientRect().height);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(request);
    observer.observe(hero);
    request();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    window.addEventListener('pageshow', request);
    window.addEventListener('popstate', request);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      window.removeEventListener('pageshow', request);
      window.removeEventListener('popstate', request);
    };
  }, [overHero]);
  useEffect(() => {
    if (!open) return;
    const dialog = document.querySelector<HTMLElement>('.vx-menu');
    const restoreFocus = menuButtonRef.current;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); return; }
      if (event.key !== 'Tab' || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', escape);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', escape);
      document.body.style.overflow = previous;
      requestAnimationFrame(() => restoreFocus?.focus({ preventScroll: true }));
    };
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="vx-bar" data-tone={light ? 'light' : undefined}>
        <Link href="/" className="vx-bar__brand" aria-label="Victorino, home">
          <Mark />
          <span className="vx-bar__name">victorino</span>
        </Link>
        <nav className="vx-bar__links" aria-label="Main navigation">
          {ROUTES.map(route => <Link key={route.href} href={route.href} aria-current={isCurrent(route.href) ? 'page' : undefined}>{route.label}</Link>)}
        </nav>
        <div className="vx-bar__right">
          <Clock />
          <button type="button" className="vx-mono vx-mono--ink" onClick={() => (onOpenConcierge ? onOpenConcierge() : openEnquiry())}>Enquire</button>
          <button ref={menuButtonRef} type="button" className="vx-bar__menu vx-bar__mobile-toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(value => !value)}>
            {open ? 'close' : 'menu'}
          </button>
        </div>
      </header>

      {open && (
        <div id="site-menu" className="vx-menu" role="dialog" aria-modal="true" aria-label="Site index">
          <div className="vx-bar" style={{ position: 'static', background: 'transparent', backdropFilter: 'none' }}>
            <div className="vx-bar__brand"><Mark /><span className="vx-bar__name">victorino</span></div>
            <span />
            <div className="vx-bar__right">
              <button type="button" className="vx-bar__menu" onClick={() => setOpen(false)} autoFocus>close</button>
            </div>
          </div>
          <nav className="vx-menu__list">
            {ROUTES.map(route => (
              <Link key={route.href} href={route.href} onClick={() => setOpen(false)} aria-current={isCurrent(route.href) ? 'page' : undefined}>
                <span>{route.index}</span>
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="vx-menu__foot">
            <span className="vx-mono vx-bracket">Goa RERA PRGO02241982</span>
            <span className="vx-mono vx-bracket">Est. 2014</span>
            <span className="vx-mono vx-bracket">15°16′ N 74°00′ E</span>
          </div>
        </div>
      )}
    </>
  );
}
