"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Choice = 'accept' | 'reject' | 'essentials';
const KEY = 'victorino-consent-v2';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      const valid = saved && ['accept', 'reject', 'essentials'].includes(saved.choice) && Number.isFinite(saved.updatedAt) && saved.updatedAt <= Date.now() && Date.now() - saved.updatedAt < MAX_AGE;
      // Respect a current preference instead of prompting again on every load.
      setOpen(!valid);
      document.documentElement.dataset.cookieConsent = valid ? saved.choice : 'essentials';
    } catch { setOpen(true); document.documentElement.dataset.cookieConsent = 'essentials'; }
    });
    const reopen = () => { triggerRef.current = document.activeElement as HTMLElement | null; setOpen(true); };
    window.addEventListener('victorino:cookie-settings', reopen);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('victorino:cookie-settings', reopen); };
  }, []);
  function choose(choice: Choice) {
    const consent = { choice, essential: true, analytics: choice === 'accept', marketing: choice === 'accept', updatedAt: Date.now() };
    let saved = true;
    try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch { saved = false; }
    document.documentElement.dataset.cookieConsent = choice;
    window.dispatchEvent(new CustomEvent('victorino:consent-change', { detail: consent }));
    setMessage(saved ? 'Cookie preference saved.' : 'Preference applied for this visit. Your browser blocked saving it.');
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }
  return <>
    <span role="status" className="sr-only">{message}</span>
    {open && <section className="vx-consent" aria-label="Cookie preferences">
      <span className="vx-mono vx-bracket" style={{ flex: 'none' }}>Privacy</span>
      <p>We store your cookie choice on this device. Accept allows optional cookies; Reject and Essentials keep them off. Accept enables visitor analytics for pages, clicks and scroll depth. Reject and Essentials leave analytics off. <Link href="/privacy-policy" className="vx-consent__policy">Read our Privacy Policy</Link>.</p>
      <div className="vx-consent__actions"><button onClick={() => choose('accept')}>Accept</button><button onClick={() => choose('reject')}>Reject</button><button onClick={() => choose('essentials')}>Essentials</button></div>
    </section>}
  </>;
}
