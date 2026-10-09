"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const targetScale = useRef(1);

  useEffect(() => {
    // Only enable for desktop / fine pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("awwwards-cursor");
    requestAnimationFrame(() => setEnabled(true));

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      const isInputField = !!target?.closest("input, textarea, select");
      const isInteractive = !!target?.closest("a, button, [role='button'], label, [data-interactive]");

      setIsInput(isInputField);

      if (cursorTarget) {
        const next = cursorTarget.getAttribute("data-cursor") || "";
        setLabel(next);
        setIsHovered(true);
        targetScale.current = 1;
      } else if (isInteractive) {
        setLabel("");
        setIsHovered(true);
        targetScale.current = 1;
      } else {
        setLabel("");
        setIsHovered(false);
        targetScale.current = 1;
      }
    };

    const handleMouseDown = () => {
      setIsDown(true);
      targetScale.current = 0.85;
    };

    const handleMouseUp = () => {
      setIsDown(false);
      targetScale.current = 1;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    let raf = 0;
    const render = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18;
      scale.current += (targetScale.current - scale.current) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale.current})`;
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("awwwards-cursor");
    };
  }, []);

  if (!enabled) return null;

  const hasLabel = label.length > 0;
  const hideCustom = !isVisible || isInput;

  return (
    <>
      {/* Precision Inner Dot — Zero Latency Pointer */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[99999] rounded-full transition-opacity duration-200 ease-out will-change-transform ${
          hideCustom ? "opacity-0" : hasLabel ? "opacity-0" : "opacity-100"
        } ${
          isHovered
            ? "h-2 w-2 bg-[#D49B44] shadow-[0_0_10px_rgba(212,155,68,0.9)]"
            : "h-1.5 w-1.5 bg-[#D49B44] shadow-[0_0_6px_rgba(212,155,68,0.6)] mix-blend-difference"
        }`}
      />

      {/* Trailing Luxury Aura Ring / Dynamic Pill */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[99998] flex items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          hideCustom ? "opacity-0" : "opacity-100"
        } ${
          hasLabel
            ? "h-[76px] w-[76px] bg-[#0C1A14]/92 text-[#FAF8F5] border border-[#D49B44]/50 shadow-[0_16px_36px_rgba(0,0,0,0.4)] backdrop-blur-md"
            : isHovered
            ? "h-14 w-14 border border-[#D49B44] bg-[#D49B44]/15 backdrop-blur-[2px] shadow-[0_0_16px_rgba(212,155,68,0.25)]"
            : isDown
            ? "h-7 w-7 border border-[#D49B44]/80 bg-[#D49B44]/25"
            : "h-9 w-9 border border-[#FAF8F5]/60 mix-blend-difference shadow-sm"
        }`}
      >
        {hasLabel && (
          <div className="flex flex-col items-center justify-center px-1 text-center select-none animate-in fade-in zoom-in-95 duration-200">
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.22em] text-[#D49B44] leading-tight">
              {label}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D49B44] mt-1 shadow-[0_0_4px_#D49B44]" />
          </div>
        )}
      </div>
    </>
  );
}
