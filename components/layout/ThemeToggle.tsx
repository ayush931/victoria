"use client";

import { useSyncExternalStore } from 'react';
import { applyTheme, THEME_EVENT, THEME_KEY } from '@/lib/theme';

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}
const snapshot = () => document.documentElement.dataset.theme === 'dark';

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, snapshot, () => false);
  return <button type="button" className="vx-theme-toggle" role="switch" aria-checked={dark} aria-label="Dark theme" title={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => {
    const theme = dark ? 'light' : 'dark';
    document.documentElement.dataset.themeChoice = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* The switch still works for this visit. */ }
    applyTheme(theme);
  }}>
    <svg className="vx-theme-toggle__moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" /></svg>
    <svg className="vx-theme-toggle__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>
  </button>;
}
