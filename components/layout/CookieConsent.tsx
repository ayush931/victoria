"use client";
import { useEffect, useRef, useState } from 'react';

type Choice = 'accept' | 'reject' | 'essentials';
const KEY = 'victorino-consent-v1';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  const settingsRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      const valid = saved && ['accept', 'reject', 'essentials'].includes(saved.choice) && Number.isFinite(saved.updatedAt) && saved.updatedAt <= Date.now() && Date.now() - saved.updatedAt < MAX_AGE;
      // The banner opens on every load; a saved choice still sets the consent state underneath it.
      setOpen(true);
      setReady(true);
      document.documentElement.dataset.cookieConsent = valid ? saved.choice : 'essentials';
    } catch { setOpen(true); setReady(true); document.documentElement.dataset.cookieConsent = 'essentials'; }
    });
    const reopen = () => setOpen(true);
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
    requestAnimationFrame(() => settingsRef.current?.focus({ preventScroll: true }));
  }
  return <>
    <span role="status" className="sr-only">{message}</span>
    {ready && !open && <button ref={settingsRef} className="vx-consent-reopen" onClick={() => setOpen(true)} aria-label="Change cookie preferences">Privacy settings</button>}
    {open && <section className="vx-consent" aria-label="Cookie preferences">
      <span className="vx-mono vx-bracket" style={{ flex: 'none' }}>Privacy</span>
      <p>Essential storage keeps this site working. You choose whether to allow optional cookies. Reject and Essentials both keep optional cookies off — nothing optional is installed either way.</p>
      <div className="vx-consent__actions"><button onClick={() => choose('accept')}>Accept</button><button onClick={() => choose('reject')}>Reject</button><button onClick={() => choose('essentials')}>Essentials</button></div>
    </section>}
  </>;
}
