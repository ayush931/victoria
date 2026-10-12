"use client";
import { useEffect, useId, useRef, useState } from 'react';

const residences = ["Nature's Cove — Curtorim", 'Quinta Da Rosa — Curtorim', 'Casa Do Sol — Verna', 'Custom Architectural Commission'];
export default function EnquiryForm({ residence = residences[0] }: { residence?: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState('');
  const [today, setToday] = useState('');
  useEffect(() => { const frame = requestAnimationFrame(() => setToday(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()))); return () => cancelAnimationFrame(frame); }, []);
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const problems: Record<string, string> = {};
    if (!values.name?.trim()) problems.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email?.trim() ?? '')) problems.email = 'Enter a valid email address.';
    if (!/^[+\d\s().-]+$/.test(values.phone ?? '') || values.phone.replace(/\D/g, '').length < 7 || values.phone.replace(/\D/g, '').length > 15) problems.phone = 'Enter 7–15 digits, including your country code.';
    if (values.visitDate && values.visitDate < today) problems.visitDate = 'Choose today or a future date.';
    setErrors(problems);
    if (Object.keys(problems).length) {
      setDraft(null);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(problems)[0]}"]`)?.focus());
      return;
    }
    setDraft(`Hello Victorino, I would like to arrange a private viewing.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nPhone: ${values.phone.trim()}\nResidence: ${values.residence}\nCountry: ${values.country || 'Not specified'}\nPreferred visit: ${values.visitDate || 'Flexible'}\nAirport transfer requested: ${values.chauffeur ? 'Yes' : 'No'}\n\n${values.message?.trim() ?? ''}`);
  }
  const fields = [
    { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', required: true },
    { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: true },
    { name: 'phone', label: 'Phone, including country code', type: 'tel', autoComplete: 'tel', required: true },
    { name: 'country', label: 'Country of residence', type: 'text', autoComplete: 'country-name', required: false },
  ];
  return <form ref={formRef} className="vx-enquiry-form" noValidate onSubmit={prepare} onChange={() => { setDraft(null); setCopied(''); }}>
    <div className="vx-form-grid">{fields.map(field => <div key={field.name}>
      <label htmlFor={`${id}-${field.name}`}>{field.label}{field.required ? ' *' : ''}</label>
      <input id={`${id}-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} required={field.required} maxLength={field.name === 'phone' ? 30 : 120} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${id}-${field.name}-error` : undefined} />
      {errors[field.name] && <p className="vx-field-error" id={`${id}-${field.name}-error`}>{errors[field.name]}</p>}
    </div>)}</div>
    <div className="vx-form-grid"><div><label htmlFor={`${id}-residence`}>Residence of interest</label><select id={`${id}-residence`} name="residence" defaultValue={residence}>{[...new Set([residence, ...residences])].map(value => <option key={value}>{value}</option>)}</select></div><div><label htmlFor={`${id}-date`}>Preferred visit date</label><input id={`${id}-date`} type="date" name="visitDate" min={today} aria-invalid={Boolean(errors.visitDate)} aria-describedby={errors.visitDate ? `${id}-date-error` : undefined} />{errors.visitDate && <p id={`${id}-date-error`} className="vx-field-error">{errors.visitDate}</p>}</div></div>
    <label className="vx-form-check"><input name="chauffeur" type="checkbox" /> I would like to discuss an airport transfer.</label>
    <div><label htmlFor={`${id}-message`}>Anything you would like us to know?</label><textarea className="resize-none" id={`${id}-message`} name="message" rows={4} maxLength={1500} /></div>
    <button className="vx-button" type="submit">Review enquiry <span aria-hidden="true">↗</span></button>
    {Object.keys(errors).length > 0 && <p role="alert" className="vx-field-error">Please check the highlighted fields.</p>}
    {draft && <div className="vx-enquiry-review" role="region" aria-label="Review your enquiry"><h3>Your enquiry is ready</h3><p>Review your details, then continue in WhatsApp. Nothing has been sent yet; press Send there to contact the studio.</p><pre>{draft}</pre><div className="vx-form-actions"><a className="vx-button" href={`https://wa.me/919822144550?text=${encodeURIComponent(draft)}`} target="_blank" rel="noopener noreferrer">Continue in WhatsApp ↗</a><button className="vx-button vx-button--ghost" type="button" onClick={async () => { try { await navigator.clipboard.writeText(draft); setCopied('Enquiry copied.'); } catch { setCopied('Select and copy the enquiry text above.'); } }}>Copy enquiry</button></div><p role="status">{copied}</p></div>}
  </form>;
}
