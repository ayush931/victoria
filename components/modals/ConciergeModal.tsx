"use client";
import { useEffect, useRef } from 'react';
import EnquiryForm from '@/components/forms/EnquiryForm';

export default function ConciergeModal({ isOpen, onClose, preselectedResidence = "Nature's Cove — Curtorim" }: { isOpen: boolean; onClose: () => void; preselectedResidence?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const scroll = (window as Window & { __locomotive?: { stop: () => void; start: () => void } }).__locomotive;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    scroll?.stop();
    return () => { dialog.close(); document.body.style.overflow = oldOverflow; scroll?.start(); previous?.focus({ preventScroll: true }); };
  }, [isOpen]);
  return <dialog ref={ref} className="vx-enquiry-dialog" aria-labelledby="enquiry-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} data-lenis-prevent>
    <div className="vx-dialog-content"><button className="vx-dialog-close" type="button" onClick={onClose} aria-label="Close enquiry">×</button><p className="vx-mono">A HOME IN GOA</p><h2 id="enquiry-title">Let’s plan your visit.</h2><p className="vx-form-intro">Tell us a little about yourself and the home you have in mind.</p>{isOpen && <EnquiryForm key={preselectedResidence} residence={preselectedResidence} />}</div>
  </dialog>;
}
