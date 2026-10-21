"use client";
import React from "react";
import { Reveal, FadeUp } from "@/components/effects/TextReveal";

/** Shared opening for every subpage: bracketed label row, oversized headline, hairline, meta. */
export default function PageHero({
  index,
  eyebrow,
  title,
  description,
  meta = [],
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  meta?: string[];
}) {
  return (
    <section className="vx-section vx-pagehero">
      <div className="vx-wrap">
        <FadeUp>
          <div className="vx-head__meta">
            <span className="vx-mono vx-bracket">{eyebrow}</span>
            <span className="vx-mono vx-bracket">15.2894° N · 74.0247° E</span>
          </div>
        </FadeUp>
        <div className="vx-head" style={{ marginTop: 8 }}>
          <span className="vx-head__index" aria-hidden="true">{index}</span>
          <Reveal as="h1" className="vx-display" lines={[title]} />
        </div>
        <hr className="vx-rule vx-head__rule" />
        {(description || meta.length > 0) && (
          <div className="vx-split" style={{ marginTop: "clamp(24px, 4vh, 44px)" }}>
            {description ? <FadeUp delay={0.15}><p className="vx-lede" style={{ color: "var(--ink-soft)" }}>{description}</p></FadeUp> : <span />}
            {meta.length > 0 && (
              <FadeUp delay={0.25}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px" }}>
                  {meta.map((item) => <span key={item} className="vx-mono">{item}</span>)}
                </div>
              </FadeUp>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
