"use client";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon, MapPinIcon } from '@/components/ui/Icons';
import { media, imageSet } from '@/lib/media';

const places = [
  { name: 'Curtorim', region: 'Salcete', x: 60, y: 46, coords: '15°16′ N 74°00′ E', title: 'The lake village', text: 'Paddy fields, a church on the water and the quiet that drew us here first. Home to Nature’s Cove.', image: media.villa, alt: 'Villa inspiration beside green Goan fields', href: '/residences/natures-cove', cta: 'See the residence' },
  { name: 'Margao', region: 'South Goa', x: 45, y: 57, coords: '15°16′ N 73°58′ E', title: 'The old town', text: 'Portuguese façades, the covered market and every errand within a short drive of home.', image: media.interior, alt: 'Interior inspiration in a heritage-influenced home', href: '/premium-homes', cta: 'Premium homes' },
  { name: 'Verna', region: 'Mormugao', x: 48, y: 26, coords: '15°22′ N 73°56′ E', title: 'The workshop', text: 'Where our drawings become joinery, stone and tile before anything reaches a site.', image: media.interior, alt: 'Material detail inside a finished Goan home', href: '/about', cta: 'Our approach' },
  { name: 'Colva', region: 'The coast', x: 31, y: 64, coords: '15°16′ N 73°55′ E', title: 'The shoreline', text: 'Twenty minutes of palm-shaded road and the Arabian Sea opens in front of you.', image: media.goa, alt: 'Goan beach fringed with coconut palms', href: '/villas', cta: 'Coastal villas' },
  { name: 'Assagao', region: 'North Goa', x: 74, y: 9, coords: '15°36′ N 73°45′ E', title: 'The other side', text: 'The north’s gardens and long lunches, for the days you want a different pace entirely.', image: media.villa, alt: 'Garden and pool of a contemporary Goan villa', href: '/work', cta: 'All residences' },
];

/** A hand-drawn 2D plan of where Victorino builds. Schematic, not a survey map. */
export default function GoaMapSection() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const place = places[active];

  function trace(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty('--map-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    stage.style.setProperty('--map-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <div aria-labelledby="atlas-heading">
      <h3 id="atlas-heading" className="sr-only">A schematic plan of where Victorino builds</h3>
      <div className="vx-atlas">
        <div ref={stageRef} className="vx-atlas__stage" onPointerMove={trace}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" >
            <defs>
              <linearGradient id="atlas-sea" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#dfe6e5" /><stop offset="100%" stopColor="#cfdcda" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#atlas-sea)" />
<path d="M16 0 C26 6 22 14 27 21 C32 28 25 36 29 44 C33 52 27 60 31 68 C35 76 30 86 34 100 L100 100 L100 0 Z" fill="#f3f4f5" stroke="none" />
            <path d="M16 0 C26 6 22 14 27 21 C32 28 25 36 29 44 C33 52 27 60 31 68 C35 76 30 86 34 100" fill="none" stroke="#1e2b30" strokeWidth=".45" opacity=".5" />
            <path d="M13 0 C23 6 19 14 24 21 C29 28 22 36 26 44 C30 52 24 60 28 68 C32 76 27 86 31 100" fill="none" stroke="#ffffff" strokeWidth=".35" opacity=".7" />
            <path d="M46 4 Q58 26 50 48 Q44 68 56 96" fill="none" stroke="#1e2b30" strokeWidth=".35" strokeDasharray="2 2" opacity=".35" />
            <path d="M100 34 Q74 40 52 52" fill="none" stroke="#1e2b30" strokeWidth=".3" strokeDasharray="1.5 2.5" opacity=".3" />
            {[20, 40, 60, 80].map(line => <line key={line} x1="0" y1={line} x2="100" y2={line} stroke="#1e2b30" strokeWidth=".12" opacity=".14" />)}
            {[20, 40, 60, 80].map(line => <line key={line} x1={line} y1="0" x2={line} y2="100" stroke="#1e2b30" strokeWidth=".12" opacity=".14" />)}
          </svg>
          <span className="vx-atlas__crosshair" aria-hidden="true" />
          <span className="vx-mono vx-atlas__sea" aria-hidden="true">THE ARABIAN SEA</span>
          {places.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className="vx-atlas__pin"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              aria-pressed={active === index}
              aria-label={`${item.name}, ${item.region}`}
              data-cursor="LOOK"
              onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(index); }}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <i aria-hidden="true" />
              <span>{item.name}</span>
            </button>
          ))}
          <span className="vx-mono vx-bracket vx-atlas__legend" aria-hidden="true">Schematic · not to scale</span>
        </div>
        <div className="vx-atlas__card" aria-live="polite">
          <div className="vx-atlas__card-image" key={place.name}>
            <img src={place.image} srcSet={imageSet(place.image)} sizes="(max-width: 1000px) 90vw, 30vw" alt={place.alt} loading="lazy" />
            <span className="vx-atlas__note">Inspiration imagery</span>
          </div>
          <p className="vx-mono">{place.region} &nbsp;·&nbsp; {place.coords}</p>
          <h3>{place.name}</h3>
          <p className="vx-atlas__title">{place.title}</p>
          <p className="vx-atlas__copy">{place.text}</p>
          <Link href={place.href} className="vx-link">{place.cta} <ArrowUpRightIcon size={15} /></Link>
          <div className="vx-atlas__dots" role="group" aria-label="Locations">
            {places.map((item, index) => (
              <button key={item.name} type="button" aria-pressed={active === index} aria-label={item.name} onClick={() => setActive(index)}>
                <MapPinIcon size={11} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
