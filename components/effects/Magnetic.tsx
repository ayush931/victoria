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
      if (!el || !matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
      el.style.transition = 'transform 0.18s ease-out';
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${Math.max(-8, Math.min(8, x * strength))}px, ${Math.max(-8, Math.min(8, y * strength))}px, 0)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "translate3d(0,0,0)";

  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocusCapture={onLeave}
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
      ? "bg-[var(--signal)] text-[var(--forest-deep)] hover:text-[var(--on-dark)]"
      : variant === "dark"
      ? "bg-[var(--forest)] text-[var(--on-dark)] hover:text-[var(--forest-deep)]"
      : "border border-current hover:text-[var(--forest-deep)]";
  const fill = variant === "ghost" || variant === "dark" ? "bg-[var(--signal)]" : "bg-[var(--forest-deep)]";
  return (
    <Magnetic>
      <button
        {...props}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[0.6875rem] font-sans font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${styles} ${className}`}
      >
        <span className={`absolute inset-0 ${fill} translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0`} />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    </Magnetic>
  );
}
