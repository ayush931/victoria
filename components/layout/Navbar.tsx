"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AmbientAudio from "@/components/effects/AmbientAudio";
import { MenuIcon, CloseIcon, ArrowUpRightIcon } from "@/components/ui/Icons";

interface NavbarProps {
  onOpenConcierge?: () => void;
}

function NavbarContent({ onOpenConcierge }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Index,", href: "/" },
    { label: "Work,", href: "/work" },
    { label: "Villas,", href: "/villas" },
    { label: "Nature's Cove,", href: "/residences/natures-cove" },
    { label: "Heritage,", href: "/about" },
    { label: "Journal,", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#B84A39] z-[10001] transition-transform duration-100 ease-out origin-left pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress / 100})`, width: "100%" }}
      />

      {/* Main Luxury Header */}
      <header
        className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#F8F5EF]/88 backdrop-blur-xl border-b border-[#173E40]/10 text-[#173E40] shadow-[0_8px_30px_rgba(14,39,37,0.06)]"
            : `py-7 ${pathname === "/" ? "text-[#FAF8F5]" : "text-[#173E40]"}`
        }`}
      >
        <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex flex-col tracking-tight text-left select-none"
            data-cursor="HOME"
          >
            <span className="text-base sm:text-lg font-sans font-medium uppercase tracking-[0.28em] text-current leading-none">
              VICTORINO
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.22em] text-[#B84A39] uppercase leading-none font-semibold">
                LUXURY HOMES
              </span>
              <span className="text-[9px] font-serif italic text-current/60 leading-none">
                • Goa
              </span>
            </div>
          </Link>

          {/* Desktop Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-5 text-[13px] font-sans tracking-[0.08em]">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`arch-link py-1 transition-colors duration-300 ${
                        isActive
                          ? "text-[#B84A39] font-medium"
                          : "text-current/80 hover:text-current"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-5 sm:gap-7">
            {/* Ambient Soundscape */}
            <div className="hidden sm:block">
              <AmbientAudio />
            </div>

            {/* Enquire Ghost Button */}
            <button
              type="button"
              onClick={onOpenConcierge}
              className="relative hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.22em] border border-current/30 hover:border-[#B38F5B] hover:text-[#B38F5B] transition-all duration-500 rounded-sm group overflow-hidden"
              data-cursor="VIP ENQUIRE"
            >
              <span>Enquire</span>
              <ArrowUpRightIcon
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-current"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#08130F] text-[#FAF8F5] flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#B38F5B]">
              NAVIGATION DIRECTORY
            </span>
            <ul className="flex flex-col gap-5 text-2xl font-serif">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#B38F5B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 pt-8 border-t border-[#FAF8F5]/10">
            <AmbientAudio />
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge?.();
              }}
              className="w-full py-4 text-center text-xs font-sans tracking-[0.25em] uppercase bg-[#B38F5B] text-[#08130F] font-semibold"
            >
              Book Private Viewing
            </button>
            <div className="text-[11px] font-sans text-[#FAF8F5]/50 flex justify-between">
              <span>Curtorim • Margao • Verna</span>
              <span>15.2894° N, 74.0247° E</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Navbar(props: NavbarProps) {
  return (
    <Suspense fallback={null}>
      <NavbarContent {...props} />
    </Suspense>
  );
}

