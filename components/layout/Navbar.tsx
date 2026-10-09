"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AmbientAudio from "@/components/effects/AmbientAudio";
import { MenuIcon, CloseIcon, ArrowUpRightIcon } from "@/components/ui/Icons";

function NavbarContent({ onOpenConcierge }: { onOpenConcierge?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
      setIsScrolled(y > 40);
      // hide on scroll down, reveal on up (SOTY nav behaviour)
      if (!menuOpen) {
        if (y > 500 && y > lastY.current + 4) setHidden(true);
        else if (y < lastY.current - 4 || y < 500) setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // stagger menu links on open
  useEffect(() => {
    if (!menuOpen) return;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      gsap.fromTo(
        "[data-menu-link]",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.06, delay: 0.1 }
      );
      gsap.fromTo("[data-menu-fade]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, delay: 0.4 });
    };
    void run();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Index", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Villas", href: "/villas" },
    { label: "Nature's Cove", href: "/residences/natures-cove" },
    { label: "Heritage", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] w-full bg-[#B84A39] z-[10001] origin-left pointer-events-none"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <header
        className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled && !menuOpen
            ? "py-3 bg-[#F8F5EF]/85 backdrop-blur-xl border-b border-[#173E40]/10 text-[#173E40] shadow-[0_8px_30px_rgba(14,39,37,0.08)]"
            : `py-5 md:py-6 ${menuOpen ? "text-[#FAF8F5]" : pathname === "/" ? "text-[#FAF8F5]" : "text-[#173E40]"}`
        }`}
      >
        <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto flex items-center justify-between">
          <Link href="/" className="group flex flex-col select-none" data-cursor="HOME">
            <span className="text-base sm:text-lg font-sans font-medium uppercase tracking-[0.28em] leading-none">
              Victorino
            </span>
            <span className="mt-1 text-[10px] font-sans tracking-[0.24em] text-[#B84A39] uppercase font-semibold leading-none">
              Luxury Homes <span className="font-serif italic normal-case tracking-normal text-current/60">• Goa</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-5 text-[13px] font-sans tracking-[0.06em]">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`arch-link py-1 ${pathname === item.href ? "text-[#B84A39] font-medium" : "text-current/75 hover:text-current"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:block">
              <AmbientAudio />
            </div>
            <button
              type="button"
              onClick={onOpenConcierge}
              data-cursor="VIP ENQUIRE"
              className="relative hidden sm:inline-flex items-center gap-2 overflow-hidden rounded-full border border-current/30 px-5 py-2.5 text-[11px] font-sans uppercase tracking-[0.22em] transition-colors duration-500 hover:border-[#D49B44] hover:text-[#D49B44]"
            >
              <span>Enquire</span>
              <ArrowUpRightIcon size={12} />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
              data-cursor="MENU"
            >
              {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
            {/* desktop menu trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="hidden lg:inline-flex p-2 text-[11px] font-sans uppercase tracking-[0.25em]"
              data-cursor="MENU"
            >
              Menu +
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay menu — desktop + mobile */}
      <div
        className={`fixed inset-0 z-[9990] bg-[#08130F] text-[#FAF8F5] flex flex-col justify-between px-6 md:px-12 pt-28 pb-8 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          menuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="max-w-[1720px] mx-auto w-full flex-1 flex flex-col justify-center">
          <span data-menu-fade className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#D49B44] mb-6">
            Navigation Directory — 15.2894°N
          </span>
          <ul className="flex flex-col">
            {navLinks.map((item, i) => (
              <li key={item.label} className="border-b border-[#FAF8F5]/10 overflow-hidden">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  data-menu-link
                  className="menu-link group flex items-baseline gap-4 py-3 md:py-4"
                >
                  <span className="font-mono text-[10px] text-[#D49B44]">0{i + 1}</span>
                  <span className="font-serif font-light text-4xl sm:text-5xl md:text-7xl tracking-tight group-hover:text-[#D49B44] transition-colors">
                    {item.label}
                  </span>
                  <span aria-hidden>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div data-menu-fade className="max-w-[1720px] mx-auto w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#FAF8F5]/10">
          <div className="flex items-center gap-6">
            <AmbientAudio />
            <span className="text-[11px] font-sans text-[#FAF8F5]/50">Curtorim • Margao • Verna</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-3 border border-[#FAF8F5]/25 rounded-full text-[11px] uppercase tracking-[0.22em]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenConcierge?.();
              }}
              className="px-6 py-3 bg-[#D49B44] text-[#08130F] rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold"
            >
              Book Private Viewing
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Navbar(props: { onOpenConcierge?: () => void }) {
  return (
    <Suspense fallback={null}>
      <NavbarContent {...props} />
    </Suspense>
  );
}
