"use client";

import React, { useRef, useCallback } from "react";

/** Magnetic wrapper — SOTY-style spring pull toward cursor */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "translate3d(0,0,0)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "transform 0.15s ease-out";
    }, 700);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{ transition: "transform 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}

/** Pill button with sliding fill — signature SOTY CTA */
export function MagneticButton({
  children,
  variant = "solid",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "dark";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles =
    variant === "solid"
      ? "bg-[#D49B44] text-[#0C1A14] hover:text-[#FAF8F5]"
      : variant === "dark"
      ? "bg-[#0C1A14] text-[#FAF8F5] hover:text-[#0C1A14]"
      : "border border-current hover:text-[#0C1A14]";
  const fill = variant === "ghost" ? "bg-[#D49B44]" : variant === "dark" ? "bg-[#D49B44]" : "bg-[#0C1A14]";
  return (
    <Magnetic>
      <button
        {...props}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[11px] font-sans font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${styles} ${className}`}
      >
        <span className={`absolute inset-0 ${fill} translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0`} />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    </Magnetic>
  );
}
