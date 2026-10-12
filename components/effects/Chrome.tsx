"use client";
import { usePathname } from 'next/navigation';

/**
 * Two pieces of page-level motion that need no JavaScript to play: a reading-progress
 * hairline (driven by --scroll-progress, which Locomotive writes) and a curtain that
 * lifts off every route. The curtain is keyed by pathname, so each navigation mounts a
 * fresh one and the CSS animation replays; it never captures pointer events.
 */
export default function Chrome() {
  const pathname = usePathname();
  return (
    <>
      <div className="vx-progress" aria-hidden="true"><i /></div>
      <div key={pathname} className="vx-curtain" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="2.6" y="2.6" width="18.8" height="18.8" />
          <path d="M12 2.6v18.8M2.6 12h18.8" />
          <circle cx="12" cy="12" r="3.4" />
        </svg>
      </div>
    </>
  );
}
