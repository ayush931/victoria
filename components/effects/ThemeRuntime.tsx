"use client";

import { useEffect } from 'react';
import { applyTheme, THEME_KEY } from '@/lib/theme';

export default function ThemeRuntime() {
  useEffect(() => {
    const system = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch {
        saved = document.documentElement.dataset.themeChoice || null;
      }
      applyTheme(saved === 'light' || saved === 'dark' ? saved : system.matches ? 'dark' : 'light');
    };
    const storage = (event: StorageEvent) => { if (event.key === THEME_KEY || event.key === null) sync(); };
    sync();
    system.addEventListener('change', sync);
    window.addEventListener('storage', storage);
    return () => { system.removeEventListener('change', sync); window.removeEventListener('storage', storage); };
  }, []);
  return null;
}
