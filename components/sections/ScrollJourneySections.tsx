import React from "react";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

const STOPS = [
  {
    number: "01",
    title: "The village, at its own pace",
    place: "CURTORIM · LAKE COUNTRY",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1800&auto=format&fit=crop",
    tone: "Warm laterite homes, quiet lanes, and the silver light of the lake.",
  },
  {
    number: "02",
    title: "A home made for the breeze",
    place: "BALCÃO · EVERYDAY RITUAL",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1800&auto=format&fit=crop",
    tone: "Shaded verandas open to palms, rain, and long afternoons together.",
  },
  {
    number: "03",
    title: "The Arabian Sea, just beyond",
    place: "SOUTH GOA · COASTAL LIVING",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop",
    tone: "Wide, sunlit shores and a slower return home after the sea.",
  },
  {
    number: "04",
    title: "Monsoon green, all around",
    place: "KONKAN · SEASONAL LANDSCAPE",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1800&auto=format&fit=crop",
    tone: "Coconut groves and paddy fields change with every season.",
  },
];

const PRINCIPLES = [
  {
    number: "01 / EARTH",
    title: "Laterite with a living texture",
    copy: "Hand-dressed local stone gives each home its warm, grounded character and a connection to the Goan soil.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    number: "02 / SHADE",
    title: "A balcão made for the breeze",
    copy: "Deep eaves, timber, and generous verandas soften the afternoon sun and make room for unhurried living.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2000&auto=format&fit=crop",
  },
  {
    number: "03 / WATER",
    title: "Life shaped around water",
    copy: "Courtyards, plunge pools, and nearby lake country bring the cooling presence of water into daily life.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop",
  },
];

export function CoastalSideScrollSection() {
  return (
    <section data-horizontal-scroll className="relative overflow-x-clip bg-[#F1EBE0] text-[#173E40] py-24 md:py-32">
      <div className="mx-auto mb-12 flex w-full max-w-[1720px] flex-col justify-between gap-6 px-6 md:mb-16 md:flex-row md:items-end md:px-12">
        <div>
          <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8A6740]">A SENSE OF PLACE · SOUTH GOA</span>
          <h2 className="max-w-3xl font-serif text-4xl font-light leading-[1.02] sm:text-6xl">From lake country <span className="italic text-[#618A7B]">to the open sea.</span></h2>
        </div>
        <p className="max-w-sm text-sm font-light leading-relaxed text-[#173E40]/70">A little of the landscape, architecture, and everyday rhythm that makes a home in Goa feel like nowhere else.</p>
      </div>

      <div className="scroll-horizontal-window relative h-[58vh] min-h-[420px] max-h-[720px] overflow-hidden px-6 md:px-12">
        <div data-horizontal-track className="flex h-full w-max gap-4 pr-6 md:gap-7 md:pr-12">
          {STOPS.map((stop) => (
            <article key={stop.number} className="group relative h-full w-[82vw] max-w-[980px] min-w-[310px] overflow-hidden rounded-sm bg-[#173E40] md:w-[74vw]">
              <img src={stop.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091B1D]/90 via-[#091B1D]/10 to-[#091B1D]/10" />
              <div className="absolute left-6 top-6 flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-white/85 md:left-9 md:top-9">
                <span className="text-[#D6B77D]">{stop.number}</span><span>{stop.place}</span>
              </div>
              <div className="absolute inset-x-6 bottom-7 flex items-end justify-between gap-6 text-white md:inset-x-9 md:bottom-10">
                <div className="max-w-xl">
                  <h3 className="mb-3 font-serif text-3xl font-light leading-tight sm:text-5xl">{stop.title}</h3>
                  <p className="max-w-lg text-xs leading-relaxed text-white/75 sm:text-sm">{stop.tone}</p>
                </div>
                <span className="mb-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/45 md:flex"><ArrowUpRightIcon size={17} /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-5 flex max-w-[1720px] justify-end px-6 text-[9px] font-mono uppercase tracking-[0.2em] text-[#173E40]/50 md:px-12">Scroll to travel across Goa <span className="ml-3 text-[#8A6740]">→</span></div>
    </section>
  );
}

export function LayeredLivingSection() {
  return (
    <section data-stack-scroll className="relative bg-[#102725] py-24 text-[#FAF8F5] md:py-32">
      <div className="mx-auto mb-12 w-full max-w-[1720px] px-6 md:mb-16 md:px-12">
        <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D6B77D]">A HOME IN HARMONY · GOAN MATERIALS</span>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-serif text-4xl font-light leading-[1.02] sm:text-6xl">A slower kind of luxury, <span className="italic text-[#8EB6A6]">layer by layer.</span></h2>
          <p className="max-w-sm text-sm font-light leading-relaxed text-white/65">The best details do more than look beautiful. They shape the light, air, and pace of a day.</p>
        </div>
      </div>

      <div data-stack-stage className="mx-auto flex w-full max-w-[1420px] flex-col gap-8 px-6 md:px-12">
        {PRINCIPLES.map((item, index) => (
          <article key={item.number} data-stack-card className="relative isolate flex min-h-[54vh] overflow-hidden rounded-sm border border-white/10 bg-[#183733] md:min-h-[64vh]">
            <img src={item.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#091B1D]/90 via-[#091B1D]/48 to-[#091B1D]/10" />
            <div className="flex w-full flex-col justify-between p-7 sm:p-10 md:p-14">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/70"><span>{item.number}</span><span>THE NATURE&apos;S COVE APPROACH</span></div>
              <div className="max-w-2xl">
                <h3 className="mb-4 font-serif text-3xl font-light leading-tight sm:text-5xl md:text-6xl">{item.title}</h3>
                <p className="max-w-xl text-sm font-light leading-relaxed text-white/75 sm:text-base">{item.copy}</p>
              </div>
              <div className="h-px w-full bg-white/25"><span className="block h-px w-20 bg-[#D6B77D]" style={{ width: `${((index + 1) / PRINCIPLES.length) * 100}%` }} /></div>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-6 max-w-[1420px] px-6 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 md:px-12">Scroll to reveal the next layer</div>
    </section>
  );
}
