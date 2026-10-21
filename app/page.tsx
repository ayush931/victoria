"use client";
import Link from 'next/link';
import { useRef } from 'react';
import { useHomeScrollMotion } from '@/components/effects/HomeScrollMotion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroStage from '@/components/sections/HeroStage';
import CoastalScrollStory from '@/components/sections/CoastalScrollStory';
import ViewingJourney from '@/components/sections/ViewingJourney';
import ConciergeModal from '@/components/modals/ConciergeModal';
import { media, imageSet } from '@/lib/media';
import { openEnquiry, useEnquiry } from '@/lib/enquiry';

const HOMES = [
  { name: 'Nature’s Cove', location: 'Curtorim · South Goa', type: 'Row villas', image: media.villa, href: '/residences/natures-cove', caption: 'Room to put down roots.' },
  { name: 'Quinta da Rosa', location: 'Salcete · South Goa', type: 'Private residence', image: media.interior, href: '/residences/quinta-da-rosa', caption: 'A little more space to be.' },
  { name: 'Casa do Sol', location: 'Assagao · North Goa', type: 'Premium home', image: media.goa, href: '/residences/casa-do-sol', caption: 'Make every day a getaway.' },
];

export default function Home() {
  const enquiry = useEnquiry();
  const ref = useRef<HTMLElement>(null);
  useHomeScrollMotion(ref);
  return <>
    <Navbar overHero />
    <main ref={ref} id="main-content" className="estate-home">
      <HeroStage />
      <section className="estate-intro estate-wrap">
        <p className="estate-label">Rooted in Goa. Made for you.</p>
        <div><h2>A home is more than<br />an address. <em>It’s a feeling.</em></h2><p>Morning light across the veranda. An open door to the garden. Time for the things that matter. Our villas and residences bring together thoughtful architecture and the everyday pleasure of living in Goa.</p><Link className="estate-text-link" href="/about">Get to know Victorino <span aria-hidden="true">↗</span></Link></div>
      </section>
      <CoastalScrollStory />
      <section id="residences" className="estate-collection estate-wrap">
        <div className="estate-section-head"><div><p className="estate-label">The collection / 01</p><h2 data-scrub-heading data-anim-owned><span>Find your </span><em>place.</em></h2></div><Link href="/villas" className="estate-text-link">View all villas <span aria-hidden="true">↗</span></Link></div>
        <div className="estate-properties">{HOMES.map((home, index) => <Link key={home.href} href={home.href} className={`estate-property estate-property--${index}`}>
          <div className="estate-property__image"><img src={home.image} srcSet={imageSet(home.image)} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" alt={`${home.name} — architectural and lifestyle inspiration`} loading="lazy" /><span className="estate-property__arrow" aria-hidden="true">↗</span><span className="estate-property__type">{home.type}</span></div>
          <div className="estate-property__meta"><span>{home.location}</span><span>0{index + 1}</span></div><h3>{home.name}</h3><p>{home.caption}</p>
        </Link>)}</div><p className="estate-image-note">Photography presents architectural and lifestyle inspiration. Request project imagery and current details with your enquiry.</p>
      </section>
      <section className="estate-feature estate-wrap">
        <div className="estate-feature__image"><div className="estate-feature__reveal"><img data-scroll data-scroll-speed="0.08" src={media.villa} srcSet={imageSet(media.villa)} sizes="(max-width: 800px) 92vw, 55vw" alt="Villa architecture inspiration with open terraces and greenery" loading="lazy" /></div><span>Architecture inspiration</span></div>
        <div className="estate-feature__copy"><p className="estate-label">In focus / Nature’s Cove</p><h2>Closer to nature.<br /><em>Closer to you.</em></h2><p>A collection of 13 row villas in Curtorim, South Goa. Discover a quieter village setting and a home that gives you room to settle in.</p><dl><div><dt>Setting</dt><dd>Curtorim, South Goa</dd></div><div><dt>Collection</dt><dd>13 row villas</dd></div></dl><Link href="/residences/natures-cove" className="estate-button">Discover Nature’s Cove <span aria-hidden="true">↗</span></Link><button className="estate-text-link" type="button" onClick={() => openEnquiry('Nature’s Cove')}>Ask about a viewing <span aria-hidden="true">↗</span></button></div>
      </section>
      <section className="estate-living estate-wrap" data-anim-owned>
        <div className="estate-section-head"><div><p className="estate-label">Beyond the front door / 02</p><h2><span data-living-line>The Goa you’ll</span><span data-living-line>want to <em>come home to.</em></span></h2></div><p>Village lanes. Green horizons. Long, unhurried afternoons. Find a setting that feels like you.</p></div>
        <figure className="estate-living__visual"><div className="estate-living__frame"><img data-scroll data-scroll-speed="0.1" src={media.goa} srcSet={imageSet(media.goa)} sizes="92vw" alt="Aerial view of Goa’s coastline, palm trees and the Arabian Sea" loading="lazy" /></div><figcaption><i className="estate-living__caption-rule" aria-hidden="true" /><span>A sense of place</span><span>Goa, India · Lifestyle inspiration</span></figcaption></figure>
        <div className="estate-living__notes"><div><span>01 / The setting</span><h3>Life, at your pace.</h3><p>Explore South Goa’s village neighbourhoods and North Goa’s vibrant surroundings.</p></div><div><span>02 / The home</span><h3>Space for your everyday.</h3><p>Browse villas and premium homes, then find out which layout suits the way you live.</p></div><div><span>03 / The next step</span><h3>See it for yourself.</h3><p>Speak with our team about project details, availability and arranging a personal visit.</p></div></div>
      </section>
      <section className="estate-neighbourhoods estate-wrap">
        <div className="estate-section-head"><div><p className="estate-label">Choose your surroundings / 03</p><h2>A place that feels<br /><em>like your Goa.</em></h2></div><p>Start with the neighbourhood. Then discover the home that belongs in your everyday life.</p></div>
        <div className="estate-neighbourhoods__grid">
          {[{ name: 'Curtorim', region: 'South Goa', text: 'A village setting for an unhurried everyday. Explore Nature’s Cove and speak with us about the surrounding neighbourhood.', link: '/residences/natures-cove', cta: 'Explore Nature’s Cove', number: '01' }, { name: 'Salcete', region: 'South Goa', text: 'Find room for family life in South Goa. Discover Quinta da Rosa and arrange a visit to experience its setting for yourself.', link: '/residences/quinta-da-rosa', cta: 'Explore Quinta da Rosa', number: '02' }, { name: 'Assagao', region: 'North Goa', text: 'Consider a home in North Goa. Discover Casa do Sol, then ask our team about its location and the places around it.', link: '/residences/casa-do-sol', cta: 'Explore Casa do Sol', number: '03' }].map(place => <article key={place.name}><div><span>{place.region}</span><span>{place.number}</span></div><h3>{place.name}</h3><p>{place.text}</p><Link href={place.link} className="estate-text-link">{place.cta} ↗</Link></article>)}
        </div>
      </section>
      <section className="estate-design estate-wrap" data-anim-owned>
        <div className="estate-design__visual"><img data-scroll data-scroll-speed="0.07" src={media.interior} srcSet={imageSet(media.interior)} sizes="(max-width: 800px) 92vw, 55vw" alt="Interior inspiration: a generous living room with natural finishes and garden light" loading="lazy" /><span>Interior inspiration</span></div>
        <div className="estate-design__copy"><p className="estate-label">The everyday, considered / 04</p><h2>Good design.<br /><em>Better days.</em></h2><p>Look beyond the first impression. The right home should feel just as good on an ordinary Tuesday as it does on the day you first walk through the door.</p><div className="estate-design__details"><article><span>01</span><div><h3>Room for your routines</h3><p>Consider where you gather, where you work, and how your family’s needs might change.</p></div></article><article><span>02</span><div><h3>A connection outdoors</h3><p>Explore how a home opens to its surroundings, from the living spaces to the outdoor areas.</p></div></article><article><span>03</span><div><h3>Details you can experience</h3><p>Ask to see the finishes, understand the layout and review the specifications for your chosen residence.</p></div></article></div><Link href="/premium-homes" className="estate-text-link">Explore premium homes ↗</Link></div>
      </section>
      <ViewingJourney />
      <section id="buyer-questions" className="estate-faq estate-wrap">
        <div><p className="estate-label">A few helpful answers / 06</p><h2>Before you<br /><em>make a move.</em></h2><p>Have something else in mind?<br /><Link href="/contact" className="estate-text-link">Speak with our team ↗</Link></p></div>
        <div className="estate-faq__items">{[
          { q: 'How do I arrange a property viewing?', a: 'Use any enquiry button to share your contact details, residence of interest and preferred visit date. Review the draft, continue in WhatsApp and press Send to contact our team. We will discuss the visit with you; selecting a date does not confirm an appointment.' },
          { q: 'Where can I find pricing and availability?', a: 'Availability and pricing can change. Contact the team about a specific residence to request current details, including the quoted price and applicable charges. The homepage does not display live inventory.' },
          { q: 'Can I explore a home while I am outside Goa?', a: 'Yes. Start by sharing the residence you are interested in and where you are based. Ask our team what current project imagery, layout information or remote viewing options are available before planning a visit.' },
          { q: 'Are the homepage photographs of the properties?', a: 'The homepage uses credited stock photography and film as architectural and lifestyle inspiration. These are not photographs of Victorino projects. Ask our team for imagery and specifications for your selected residence.' },
          { q: 'What should I review before making a decision?', a: 'Ask for the project-specific layout, specifications, payment schedule, charges, timelines and relevant approvals and ownership documents. Review the information with your own professional advisers before entering an agreement.' },
        ].map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
      </section>
      <div className="estate-scroll-ribbon" aria-hidden="true" data-anim-owned><span data-ribbon-line>Live a little slower.</span><em data-ribbon-line>Stay a little longer.</em></div>
      <section className="estate-visit estate-wrap"><p className="estate-label">Your next chapter</p><h2>Let’s find your<br /><em>home in Goa.</em></h2><div><p>A first home, a family retreat, a fresh start.<br />Tell us what you’re looking for.</p><button type="button" className="estate-button" onClick={() => openEnquiry()}>Arrange a conversation <span aria-hidden="true">↗</span></button><Link href="/premium-homes" className="estate-text-link">Explore premium homes ↗</Link></div></section>
    </main>
    <Footer />
    <ConciergeModal isOpen={enquiry.isOpen} onClose={enquiry.close} preselectedResidence={enquiry.residence} />
  </>;
}
