"use client";

import React, { useState, useRef, useCallback } from "react";

interface SketchSliderProps {
  sketchImage?: string;
  realityImage?: string;
  title?: string;
  caption?: string;
}

export default function SketchSlider({
  sketchImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
  realityImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop",
  title = "From Sketch to Sanctuary",
  caption = "Early-stage charcoal outlines distilled into precise Goan architectural frameworks.",
}: SketchSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  }, []);

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="w-full py-24 md:py-36 bg-[#F7F5F0] text-[#121210] border-b border-[#121210]/10">
      <div className="w-full px-6 md:px-12 max-w-[1720px] mx-auto">
        {/* Kononenko-inspired Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#B38F5B] block mb-3 font-medium">
            PRECISION IN DEVELOPMENT • PROCESS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#121210] font-light mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#7E796E] leading-relaxed">
            {caption} Drag the brass cursor to inspect the transition between architectural blueprint logic and built reality.
          </p>
        </div>

        {/* Interactive Comparison Viewport */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          className="relative w-full h-[440px] sm:h-[580px] md:h-[700px] overflow-hidden rounded-sm select-none cursor-ew-resize bg-[#08130F] border border-[#121210]/10"
          data-cursor="DRAG"
        >
          {/* Base Layer: Reality (Finished Residence) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={realityImage}
              alt="Built Reality — Nature's Cove Villa"
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
              draggable={false}
            />
            <div className="absolute bottom-6 right-6 bg-[#08130F]/85 backdrop-blur-md px-4 py-2 text-[10px] font-mono tracking-widest text-[#FAF8F5] uppercase rounded-sm border border-[#FAF8F5]/10">
              02 / BUILT REALITY • CURTORIM
            </div>
          </div>

          {/* Top Layer: Architectural Monochrome Sketch / Blueprint (Clipped by clipPath) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={sketchImage}
              alt="Architectural Blueprint Sketch"
              className="w-full h-full object-cover object-center filter grayscale contrast-[1.6] invert"
              draggable={false}
            />
            <div className="absolute inset-0 bg-[#08130F]/20 mix-blend-multiply" />
            <div className="absolute bottom-6 left-6 bg-[#08130F]/85 backdrop-blur-md px-4 py-2 text-[10px] font-mono tracking-widest text-[#C5A880] uppercase rounded-sm border border-[#FAF8F5]/10">
              01 / ARCHITECTURAL SCHEMATIC
            </div>
          </div>

          {/* Divider Line & Brass Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#C5A880] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#08130F] border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-2xl">
              <span className="text-[10px] font-mono tracking-tighter">⇄</span>
            </div>
          </div>
        </div>

        {/* Bottom Explanatory Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#121210]/10 text-xs font-sans text-[#7E796E] mt-6">
          <p>
            <strong className="text-[#121210] font-serif block text-sm mb-1">Conceptual Blueprint Phase</strong>
            We begin with the essentials — hand sketches, microclimate diagrams, and structural volumes.
            Here we test the logic of space, the solar angles of Curtorim, and the cross-ventilation corridors.
          </p>
          <p>
            <strong className="text-[#121210] font-serif block text-sm mb-1">Precision Execution Phase</strong>
            The sketch takes on tactile permanence. Hand-cut laterite blocks are laid with millimeter precision,
            Burma teak rafters are jointed by master carpenters, and honed travertine pools are filled.
          </p>
        </div>
      </div>
    </section>
  );
}
