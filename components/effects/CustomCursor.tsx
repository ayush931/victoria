"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      requestAnimationFrame(() => setEnabled(true));
    } else {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check for custom cursor attributes on hovered element
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      const isInteractive = target?.closest("a, button, [role='button'], input, textarea, select");

      if (cursorTarget) {
        setLabel(cursorTarget.getAttribute("data-cursor") || "");
        setIsHovered(true);
      } else if (isInteractive) {
        setLabel("");
        setIsHovered(true);
      } else {
        setLabel("");
        setIsHovered(false);
      }
    };

    let animationFrameId: number;
    const render = () => {
      // Smooth lerp for trailing ring
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Center pinpoint brass dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#B38F5B] transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />

      {/* Trailing luxury ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border transition-all duration-300 ease-[cubic-bezier(0.17,0.84,0.44,1)] ${
          label
            ? "-ml-9 -mt-9 h-[72px] w-[72px] bg-[#0B1914] border-[#B38F5B] text-[#FAF8F5] shadow-xl"
            : isHovered
            ? "-ml-6 -mt-6 h-12 w-12 border-[#B38F5B] bg-[#B38F5B]/10 backdrop-blur-[1px]"
            : "-ml-4 -mt-4 h-8 w-8 border-[#121210]/30"
        }`}
        style={{ willChange: "transform" }}
      >
        {label && (
          <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-[#FAF8F5] text-center px-1 font-medium select-none">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
