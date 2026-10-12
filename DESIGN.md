---
version: alpha
name: Victorino Luxury Homes
description: Goa real estate with an unhurried coastal editorial identity.
colors:
  primary: '#1e2b30'
  background: '#f3f4f5'
  collection: '#eaebec'
  accent: '#b0643f'
  sand: '#d6a054'
typography:
  serif:
    fontFamily: Cormorant Garamond, Georgia, serif
  sans:
    fontFamily: Plus Jakarta Sans, system-ui, sans-serif
rounded:
  DEFAULT: '2px'
  pill: '99px'
spacing:
  section-gap: '110px'
  mobile-section-gap: '70px'
components:
  button: {}
  card: {}
  cookie-banner: {}
---

# Victorino coastal design

Victorino is a property-discovery and architectural brand site for people considering a home in Goa. English content serves Indian and overseas visitors. Preserve the established branding and routes; do not imply that stock photography or conceptual models depict completed projects.

## Visual system

The direction combines an architectural field notebook with cinematic coastal imagery: near-white paper, slate ink, hairline rules, oversized serif headlines, bracketed monospace labels and forest-green scenes. Runtime tokens and shared styling are owned by `app/globals.css`; this document records intent rather than creating a second theme. Secondary routes retain their existing layouts with shared navigation, footer and motion. Their base page background uses the same `--paper` token as the homepage, while photographs and dark feature panels remain distinct.

## Motion and performance

GSAP owns scroll choreography and Locomotive Scroll v5 owns smooth scrolling, driven by the same GSAP ticker. Never assign GSAP transforms and Locomotive speed to the same element. Motion mounts with the page footer after hydration, within Suspense for route data. Headline splits preserve explicit word spaces. Reduced-motion visitors receive readable static content, posters and vertical Method panels.

The hero opens from a framed film into full bleed, handing over between three statements. Its first media layer remains opaque throughout forward and reverse scrolling. A local poster and CSS background remain beneath the film. Only the selected visible hero video plays; the background film pauses while the hero is visible or reading sections cover it. Background playback uses local 1080p derivatives of retained 4K originals to limit decode and transfer costs. Video sources attach lazily and pause offscreen, in background tabs, under reduced motion or data saving.

Distinct surfaces use distinct effects: Fabric has GLSL sea-glass ripples; Programme has fluted-glass refraction; Monsoon has procedural rain; Drawing has masked lateral type. Shader rendering is capped at 30fps with bounded pixel ratio, pauses offscreen and preserves underlying imagery on decode or WebGL failure.

Method is a six-stage horizontal journey with alternating pale and dark panels, architectural imagery and authored plan/detail SVGs. Previous/next buttons and a skip link supplement scrolling. Mobile and reduced-motion layouts stack the stages vertically. Imagery is labeled design inspiration or concept study.

The native pointer remains visible. A small decorative accent follows fine-pointer movement and hides inside forms and dialogs, on touch and under reduced motion. No continuous cursor animation runs while idle.

## Enquiry and consent

Contact and modal enquiries share `components/forms/EnquiryForm.tsx`, including inline validation, associated labels and first-invalid-field focus. Native select and date controls are deliberately browser-owned for reliable mobile interaction; ownership is recorded in `premium-ui.json`. The modal uses the native dialog focus boundary, Escape dismissal, scroll locking and trigger-focus restoration.

Enquiries are reviewed locally, then handed to the existing studio WhatsApp number. The visitor must press Send in WhatsApp. Never display a submitted success message before actual delivery; no backend delivery service is configured. Clipboard failure leaves selectable preview text available.

Cookie choices have equal emphasis: Accept, Reject and Essentials. Reject and Essentials both disable optional categories. Preferences persist for up to 180 days and can be revised from the footer or persistent privacy control. No optional trackers are installed. Future integrations must check consent before loading and handle revocation.

## Verification

Use the production build, ESLint and the premium static audit, plus browser checks for repeated bottom-to-top scrolling, form validation and review, modal keyboard dismissal, Method controls, reduced motion and narrow-screen overflow. Animation budgets are implementation limits, not a guarantee of frame rate on every device.
