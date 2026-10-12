"use client";
import { useEffect, useState } from 'react';

/**
 * The enquiry modal is opened from the bar, the footer and half a dozen sections.
 * Passing a callback down every one of those makes each a non-serializable client
 * boundary, so the request travels as an event instead.
 */
const EVENT = 'victorino:enquire';

export function openEnquiry(residence?: string) {
  window.dispatchEvent(new CustomEvent<string | undefined>(EVENT, { detail: residence }));
}

/** Returns the modal state for a page, plus the residence the request named. */
export function useEnquiry(defaultResidence?: string) {
  const [isOpen, setOpen] = useState(false);
  const [residence, setResidence] = useState(defaultResidence);

  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<string | undefined>).detail;
      setResidence(detail ?? defaultResidence);
      setOpen(true);
    };
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, [defaultResidence]);

  return { isOpen, residence, close: () => setOpen(false) };
}
