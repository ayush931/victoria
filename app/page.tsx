"use client";
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroStage from '@/components/sections/HeroStage';
import ShaderCanvas from '@/components/effects/ShaderCanvas';
import GoaMapSection from '@/components/sections/GoaMapSection';
import ConciergeModal from '@/components/modals/ConciergeModal';
import ScrollFilm, { type Shot } from '@/components/effects/ScrollFilm';
import DragGallery, { type GalleryItem } from '@/components/effects/DragGallery';
import { Magnetic } from '@/components/effects/Magnetic';
import { ArrowUpRightIcon } from '@/components/ui/Icons';
import {
  Compare, Mono, RecordList, SectionHead, StatRow, TabStack,
  type Record, type StackItem,
} from '@/components/ui/Instrument';
import { media } from '@/lib/media';
import { VEIL_FRAGMENT, MONSOON_FRAGMENT } from '@/lib/shaders';
import { openEnquiry, useEnquiry } from '@/lib/enquiry';

const SITE_STATS = [
  { value: '408 m²', label: 'Typical plot' },
  { value: '310 m²', label: 'Built-up area' },
  { value: '8.8 m', label: 'Ridge height' },
];

const METHOD_IMAGES = [media.goa, '/images/method-plan.svg', media.interior, '/images/method-detail.svg', media.villa, media.interior];

const METHOD = [
  { n: '01', title: 'Walk the land', text: 'We survey the plot, its trees, the water table and the light before anything is drawn.', figure: '1 wk' },
  { n: '02', title: 'Schematic', text: 'Plans, sections and a physical model. The house is decided here; everything after is detail.', figure: '6–10 wk' },
  { n: '03', title: 'Tender', text: 'A priced bill of quantities, so the figure you approve is the figure you build to.', figure: '4 wk' },
  { n: '04', title: 'Working drawings', text: 'Issued in packages ahead of each trade, with joinery drawn to the section.', figure: '14 sets' },
  { n: '05', title: 'On site', text: 'The people who drew it are on site every week. Nothing mature is cleared without talking to you first.', figure: '14–18 mo' },
  { n: '06', title: 'Handover', text: 'Services commissioned and documented, followed by a 24-month defects period.', figure: '24 mo' },
];

const SURVEY_STATS = [
  { value: '13', label: 'Villas at Curtorim' },
  { value: '±2 cm', label: 'Setting-out tolerance' },
  { value: '11 yrs', label: 'Building in Salcete' },
];

const FABRIC: StackItem[] = [
  {
    name: 'Laterite',
    value: '450 mm',
    text: 'Load-bearing laterite blocks cut within the district, laid in lime mortar. The wall breathes through the monsoon instead of trapping it.',
    image: media.villa,
    alt: 'Laterite masonry wall under a deep eave',
  },
  {
    name: 'Lime',
    value: '3 coats',
    text: 'Lime plaster, floated and burnished, finished in a mineral wash. It takes the Goan light softly and can be repaired rather than replaced.',
    image: media.interior,
    alt: 'Lime-plastered interior wall in morning light',
  },
  {
    name: 'Teak',
    value: '38 mm',
    text: 'Seasoned teak for frames, shutters and the balcão. Joinery is cut at our Verna works, so a window fits the opening it was measured for.',
    image: media.interior,
    alt: 'Teak window frame and shutter detail',
  },
];

const PROGRAMME: StackItem[] = [
  {
    name: 'Ground',
    value: '164 m²',
    text: 'Balcão, entrance hall, a long room opening both ways, kitchen with a working courtyard, and one bedroom that can take a stair-free life.',
    image: media.interior,
    alt: 'Open ground-floor living space',
  },
  {
    name: 'Upper',
    value: '146 m²',
    text: 'Three bedrooms under the pitch, each with its own shade. The landing is wide enough to work from, with a shuttered opening to the garden.',
    image: media.villa,
    alt: 'Upper floor of a contemporary Goan villa',
  },
  {
    name: 'Outside',
    value: '7.4 m',
    text: 'A pool on the quiet side, deck in local stone, and the fruit trees that were on the plot before we were. Nothing mature is cleared.',
    image: media.goa,
    alt: 'Garden, pool and palms',
  },
];

const DILIGENCE: Record[] = [
  {
    title: 'Title and conversion',
    grade: 'low',
    note: 'Clear',
    body: 'Sanad conversion and Form I & XIV are produced before any agreement is drawn. Where a plot sits inside a village panchayat boundary we also confirm the construction licence route, since that governs what can be built and how tall.',
  },
  {
    title: 'CRZ and water table',
    grade: 'moderate',
    note: 'Site specific',
    body: 'Coastal Regulation Zone distance is measured, not assumed, and recorded on the survey. Inland plots near Curtorim lake are tested for water table through the monsoon before foundations are designed — it changes the plinth, not the plan.',
  },
  {
    title: 'Monsoon performance',
    grade: 'moderate',
    note: 'Designed for',
    body: 'Roof pitch, eave overhang and plinth height are set against 2,800 mm of annual rainfall. Deep eaves keep water off the wall face, and the laterite and lime build lets a wall that does get wet dry outward rather than hold damp.',
  },
  {
    title: 'Handover and defects',
    grade: 'low',
    note: '24 months',
    body: 'Services are commissioned and documented at handover, with a 24-month defects period covering workmanship. Our Verna works holds the joinery drawings, so a replacement shutter years later is cut to the original section.',
  },
];

const STRIP: GalleryItem[] = [
  { image: media.villa, alt: 'Villa elevation under a deep eave', title: 'Elevation', note: 'South face' },
  { image: media.interior, alt: 'Long room with light from two sides', title: 'Long room', note: 'Cross-lit' },
  { image: media.goa, alt: 'Palms along the Goan shore', title: 'Shoreline', note: '12 min west' },
  { image: media.interior, alt: 'Lime and teak material detail', title: 'Materials', note: 'Laterite, lime, teak' },
  { image: media.villa, alt: 'Garden and pool of a villa', title: 'Garden', note: 'Trees retained' },
  { image: media.goa, alt: 'Evening light over the Arabian Sea', title: 'Evening', note: 'Every day' },
];

/** The film behind each section. 4K premium non-shaking videos matching the luxury coastal theme. */
const FILM = {
  coastal: { src: '/videos/coastal-aerial-hd.mp4', poster: '/images/goa-coast-1600.webp' },
  architectural: { src: '/videos/architectural-villa-hd.mp4', poster: '/images/interior-1600.webp' },
  villa: { src: '/videos/luxury-villa-hd.mp4', poster: '/images/villa-1600.webp' },
};

const SHOTS: Shot[] = [
  { section: 'top', ...FILM.coastal, veil: 0, move: 'push' },
  // Background removed for clean reading through steps 01-05/06
  { section: 'site', ...FILM.coastal, veil: 1, move: 'push' },
  { section: 'survey', ...FILM.coastal, veil: 1, move: 'push' },
  { section: 'reel', ...FILM.coastal, veil: 0, move: 'rise' },
  { section: 'fabric', ...FILM.coastal, veil: 1, move: 'push' },
  { section: 'programme', ...FILM.coastal, veil: 1, move: 'push' },
  { section: 'drawing', ...FILM.coastal, veil: 1, move: 'push' },
  { section: 'method', ...FILM.coastal, veil: 1, move: 'push' },
  // Film reveals dynamically at monsoon band (after method) and enquiry
  { section: 'monsoon', ...FILM.villa, veil: 0, move: 'push' },
  { section: 'diligence', ...FILM.villa, veil: 1, move: 'push' },
  { section: 'enquire', ...FILM.architectural, veil: 0, move: 'push' },
];

export default function HomePage() {
  const enquiry = useEnquiry("Nature's Cove — Curtorim");

  return (
    <>
      <Navbar overHero />
      <ScrollFilm shots={SHOTS} />

      <main className="vx-page vx-page--index" data-calm>
        <HeroStage />

        <section id="site" data-chapter="Site" className="vx-section">
          <div className="vx-wrap">
            <SectionHead index="2" title="Site" left="Curtorim · Salcete" right="Where it stands" />
            <div className="vx-split" style={{ marginTop: 'clamp(28px, 4vh, 56px)' }}>
              <p className="vx-lede">
                Thirteen villas on lake-facing land in Curtorim, twenty minutes from Margao and a short
                drive from the sea. The plots were set out around the trees already growing there,
                so no two are quite the same shape.
              </p>
              <div className="vx-stack-gap">
                <table className="vx-spec">
                  <tbody>
                    <tr><th scope="row">Location</th><td>Curtorim, Salcete, South Goa</td></tr>
                    <tr><th scope="row">Plots</th><td>13 bespoke row villas</td></tr>
                    <tr><th scope="row">Orientation</th><td>Long axis north–south, openings east and west</td></tr>
                    <tr><th scope="row">Approach</th><td>Village road, 20 min to Margao, 25 min to Colva</td></tr>
                  </tbody>
                </table>
                <Link href="/residences/natures-cove" className="vx-link">
                  Open the residence record <ArrowUpRightIcon size={14} />
                </Link>
              </div>
            </div>
            <div style={{ marginTop: 'clamp(36px, 6vh, 72px)' }}>
              <StatRow stats={SITE_STATS} />
            </div>
          </div>
        </section>

        <section id="survey" data-heading-motion="spread" data-chapter="Survey" className="vx-section">
          <div className="vx-wrap">
            <SectionHead index="3" title="Survey" left="Atlas" right="Where we build" />
            <div style={{ marginTop: 'clamp(28px, 4vh, 56px)' }}>
              <StatRow stats={SURVEY_STATS} />
            </div>
            <div style={{ marginTop: 'clamp(36px, 6vh, 72px)' }}>
              <GoaMapSection />
            </div>
          </div>
        </section>

        <section id="reel" data-chapter="Film" className="vx-reel" aria-label="Reference film of the Goan coast">
          <div className="vx-reel__stick">
            <Mono className="vx-band__mono">Reference film · mood, not built work</Mono>
            <h2>Low light, from both sides.</h2>
            <p>Every plan starts with the sun. The long axis runs north to south, so morning light comes in from one side and the evening breeze from the other.</p>
          </div>
        </section>

        <section id="fabric" data-heading-motion="fold" data-chapter="Fabric" className="vx-section">
          <div className="vx-wrap">
            <SectionHead index="4" title="Fabric" left="Materials" right="What it is made of" />
            <div style={{ marginTop: 'clamp(28px, 4vh, 56px)' }}>
              <TabStack items={FABRIC} label="Fabric" distortion="water" footLeft="Fabric" footRight="Spec" />
            </div>
          </div>
        </section>

        <section id="programme" data-chapter="Programme" className="vx-section">
          <div className="vx-wrap">
            <SectionHead index="5" title="Programme" left="Plan" right="How it is lived in" />
            <div style={{ marginTop: 'clamp(28px, 4vh, 56px)' }}>
              <TabStack items={PROGRAMME} label="Programme" distortion="glass" footLeft="Programme" footRight="Area" />
            </div>
            <div style={{ marginTop: 'clamp(40px, 6vh, 80px)' }}>
              <DragGallery label="The residence in detail" items={STRIP} />
            </div>
          </div>
        </section>

        <section id="drawing" data-heading-motion="slide" data-chapter="Drawing" className="vx-section">
          <div className="vx-wrap">
            <SectionHead index="6" title="Drawing" left="Studio" right="Sketch to building" />
            <div className="vx-split" style={{ marginTop: 'clamp(28px, 4vh, 56px)' }}>
              <Compare
                before={media.interior}
                after={media.villa}
                beforeLabel="Schematic"
                afterLabel="Built"
                beforeAlt="Early schematic interior study"
                afterAlt="The built villa in its garden"
              />
              <div className="vx-stack-gap">
                <p className="vx-lede">
                  Every home is taken through three sets of drawings — schematic, tender and
                  working — by the same people. Whoever drew the eave is on site when it is built.
                </p>
                <table className="vx-spec">
                  <tbody>
                    <tr><th scope="row">Schematic</th><td>6–10 weeks, including site survey</td></tr>
                    <tr><th scope="row">Tender</th><td>4 weeks, with a priced bill of quantities</td></tr>
                    <tr><th scope="row">Working</th><td>Issued in packages, ahead of each trade</td></tr>
                    <tr><th scope="row">On site</th><td>14–18 months for a single residence</td></tr>
                  </tbody>
                </table>
                <Link href="/about" className="vx-link">How the bureau works <ArrowUpRightIcon size={14} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="method" data-chapter="Method" className="vx-section" style={{ paddingBottom: 0 }}>
          <div className="vx-wrap">
            <SectionHead index="7" title="From land to living." left="Our approach" right="Your home, taking shape" />
          </div>
          <div className="vx-hs" data-hscroll>
            <div className="vx-hs__head">
              <Mono>Step <span data-hscroll-count>01</span> / 06</Mono>
              <span className="vx-hs__bar" aria-hidden="true"><i /></span>
              <div className="vx-method-controls"><button type="button" onClick={() => window.dispatchEvent(new CustomEvent('victorino:method-step', { detail: -1 }))} aria-label="Previous stage">←</button><button type="button" onClick={() => window.dispatchEvent(new CustomEvent('victorino:method-step', { detail: 1 }))} aria-label="Next stage">→</button><a href="#monsoon">Skip journey ↗</a></div>
            </div>
            <div className="vx-hs__track" data-hscroll-track>
              {METHOD.map((step, index) => (
                <article key={step.n} className="vx-hs__panel">
                  <div className="vx-method-visual"><img src={METHOD_IMAGES[index]} alt={["Goan landscape inspiration", "Concept floor-plan illustration", "Interior design inspiration", "Roof and eave concept illustration", "Villa architecture inspiration", "Completed interior inspiration"][index]} loading="lazy" decoding="async" /><span>{index === 1 || index === 3 ? "CONCEPT STUDY" : "DESIGN INSPIRATION"}</span></div>
                  <span className="vx-hs__numeral" aria-hidden="true">{step.n}</span>
                  <div className="vx-hs__body">
                    <Mono>Stage {step.n}</Mono>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="monsoon" className="vx-band" data-chapter="Monsoon" aria-label="Designed for the monsoon">
          <div className="vx-band__frame">
            <ShaderCanvas fragment={MONSOON_FRAGMENT} pointer="window" maxDpr={1.25} />
            <div className="vx-band__scrim" />
            <div className="vx-band__copy">
              <Mono className="vx-band__mono">Designed for the rain</Mono>
              <h2>2,800 mm of rain.<br />Built to shed it.</h2>
              <p>Eaves, plinth and walls are designed around a Goan monsoon, so the house dries from the inside out instead of holding damp.</p>
            </div>
          </div>
        </section>

        <section id="diligence" data-chapter="Diligence" className="vx-section">
          <div className="vx-wrap">
            <SectionHead index="8" title="Diligence" left="Record" right="What we check first" />
            <p className="vx-lede" style={{ margin: 'clamp(24px, 3vh, 40px) 0' }}>
              Buying land in Goa goes wrong in a few well-known ways. We clear these four before
              a single drawing is started.
            </p>
            <RecordList records={DILIGENCE} />
          </div>
        </section>

        <section id="enquire" data-chapter="Enquire" className="vx-enquire">
          <ShaderCanvas fragment={VEIL_FRAGMENT} className="vx-enquire__veil" pointer="element" />
          <div className="vx-enquire__scrim" />
          <div className="vx-wrap vx-split vx-enquire__inner">
            <h2 data-anim-owned className="vx-display" style={{ fontSize: 'clamp(38px, 5.6vw, 92px)' }}>
              Come and walk the land.
            </h2>
            <div className="vx-stack-gap">
              <p className="vx-lede">
                Viewings run on weekday mornings, while the light is still low. We show you the plot,
                then the drawings, then a villa under construction.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <Magnetic>
                  <button type="button" className="vx-button vx-button--light" onClick={() => openEnquiry("Nature's Cove — Curtorim")}>
                    Arrange a viewing <ArrowUpRightIcon size={14} />
                  </button>
                </Magnetic>
                <Link href="/contact" className="vx-button vx-button--ghost vx-button--ghost-light">
                  Studio details <ArrowUpRightIcon size={14} />
                </Link>
              </div>
              <Mono>Stock imagery and film are reference, not a record of built work</Mono>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ConciergeModal isOpen={enquiry.isOpen} onClose={enquiry.close} preselectedResidence={enquiry.residence} />
    </>
  );
}
