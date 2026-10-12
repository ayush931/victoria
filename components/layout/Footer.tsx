"use client";
import { Suspense } from 'react';
import Motion from "@/components/effects/Motion";
import Link from 'next/link';
import { ArrowUpRightIcon } from '@/components/ui/Icons';
import { Magnetic } from '@/components/effects/Magnetic';
import { openEnquiry } from '@/lib/enquiry';

const DIRECTORY = [
  {
    heading: 'Portfolio',
    links: [
      ["Nature's Cove", '/residences/natures-cove'],
      ['Goan Villas', '/villas'],
      ['Premium Homes', '/premium-homes'],
      ['All Work', '/work'],
    ],
  },
  {
    heading: 'Bureau',
    links: [
      ['The Studio', '/about'],
      ['Journal', '/journal'],
      ['Contact', '/contact'],
    ],
  },
  {
    heading: 'Offices',
    links: [
      ['Curtorim · Atelier', '/contact'],
      ['Margao · Studio', '/contact'],
      ['Verna · Works', '/contact'],
    ],
  },

];

export default function Footer() {
  const toTop = () => {
    const locomotive = (window as unknown as { __locomotive?: { scrollTo: (t: number, o?: object) => void } }).__locomotive;
    if (locomotive) locomotive.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="vx-footer">
      <Suspense fallback={null}><Motion /></Suspense>
      <div className="vx-wrap">
        <div className="vx-head__meta">
          <span className="vx-mono vx-bracket">Victorino</span>
          <span className="vx-mono vx-bracket">15°16′ N 74°00′ E</span>
        </div>
        <hr className="vx-rule" />

        <div className="vx-footer__top">
          <div>
            <h3>Planning a home in South Goa?<br />Start with a conversation.</h3>
          </div>
          <div className="vx-stack-gap">
            <p className="vx-lede">
              We take on a small number of commissions each year, from a single residence to a
              thirteen-villa enclave. Tell us about the site and the life you want on it.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Magnetic>
                <button type="button" className="vx-button" onClick={() => openEnquiry()}>
                  Open an enquiry <ArrowUpRightIcon size={14} />
                </button>
              </Magnetic>
              <Link href="/contact" className="vx-button vx-button--ghost">
                Visit the studio <ArrowUpRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="vx-footer__cols">
          {DIRECTORY.map(column => (
            <div key={column.heading}>
              <h4>{column.heading}</h4>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={label}><Link href={href} className="vx-link">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="vx-footer__mega" aria-hidden="true">victorino</p>

        <div className="vx-footer__base">
          <span className="vx-mono">© 2026 Victorino Luxury Homes · Goa RERA PRGO02241982</span>
          <span style={{ display: 'flex', gap: 24 }}>
            <button type="button" className="vx-mono" onClick={() => window.dispatchEvent(new Event('victorino:cookie-settings'))}>
              Privacy settings
            </button>
            <button type="button" className="vx-mono" onClick={toTop}>Back to top ↑</button>
          </span>
        </div>
      </div>
    </footer>
  );
}
