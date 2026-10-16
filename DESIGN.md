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

The direction combines editorial property discovery with cinematic coastal imagery: near-white paper, slate ink, hairline rules, oversized serif headlines, bracketed monospace labels and forest-green scenes. Runtime tokens and shared styling are owned by `app/globals.css`; this document records intent rather than creating a second theme. Secondary routes retain their existing layouts with shared navigation, footer and motion. Their base page background uses the same `--paper` token as the homepage, while photographs and dark feature panels remain distinct.

## Homepage and motion

The homepage is a property discovery experience: coastal film, a clear real-estate introduction, three linked residences, a Nature’s Cove feature, Goa lifestyle imagery and a viewing enquiry. Staggered portrait cards, large serif type and generous spacing create an editorial rhythm. Shared page backgrounds retain the existing paper token. Property imagery uses local responsive derivatives of credited 4K stock originals and is explicitly labeled inspiration.

Content is visible in server-rendered HTML and stays visible when navigating back. Do not hide headings, copy or cards while waiting for fonts, hydration, scroll observers or route transitions. No document-wide text splitting or entry curtain is used. GSAP adds short transform-only entrances after below-fold content enters view; contexts and observers clean up when the route is hidden or unmounted. Above-fold content is static and immediately readable. Reduced motion receives static content.

Locomotive Scroll v5 and GSAP share a ticker. The homepage uses one 1080p architectural villa film with a matching persistent poster, retaining the original 4K asset on disk. Playback pauses offscreen, in hidden tabs, under reduced motion, on data-saving connections and through a visible film control. The homepage has no fixed full-page film, continuous WebGL renderer or pinned multi-screen section.

The native pointer remains visible. Its decorative accent is disabled on touch and under reduced motion and hides inside forms and dialogs.

## Enquiry and consent

Contact and modal enquiries share `components/forms/EnquiryForm.tsx`, including inline validation, associated labels and first-invalid-field focus. Native select and date controls are deliberately browser-owned for reliable mobile interaction; ownership is recorded in `premium-ui.json`. The modal uses the native dialog focus boundary, Escape dismissal, scroll locking and trigger-focus restoration.

Enquiries are reviewed locally, then handed to the existing studio WhatsApp number. The visitor must press Send in WhatsApp. Never display a submitted success message before actual delivery; no backend delivery service is configured. Clipboard failure leaves selectable preview text available.

Cookie choices have equal emphasis: Accept, Reject and Essentials. Reject and Essentials both disable optional categories. Preferences remain current for 180 days and can be revised through the single footer Privacy settings control. Valid saved choices suppress the banner on later visits. The banner links to /privacy-policy, which documents current storage, enquiry and external-resource behavior. No optional trackers are installed. Future integrations must check consent before loading and handle revocation.

## Verification

Use the production build, ESLint and the premium static audit, plus browser checks for repeated bottom-to-top scrolling, form validation and review, modal keyboard dismissal, first-render visibility, browser Back/Forward navigation, reduced motion and narrow-screen overflow. Animation budgets are implementation limits, not a guarantee of frame rate on every device.

The homepage header measures its own hero instead of querying cached routes globally. It uses explicit ink on paper after the hero leaves view and remeasures after history navigation and resizing.

## Expanded discovery and subtle motion

The homepage now includes neighbourhoods, a design consideration section, a four-step viewing guide and native-disclosure buyer FAQs. Copy guides buyers toward current project information without inventing live availability, pricing or completion promises. Large feature, lifestyle and interior images use small Locomotive speed offsets with overscan; captions and interactive content remain stationary. The exploration anchor uses Locomotive scrolling with header clearance.

The footer owns a scoped GSAP context: visible JSX letter spans create a small scrubbed wordmark wave, headings and directory links enter with short staggered translations, and a decorative rule extends. No opacity-zero states, text DOM mutations, route curtains or layout pinning are used. Footer contexts and observers clean up when routes are hidden, unmounted or reduced motion changes. Link arrows and button icons respond to hover and keyboard focus. Magnetic movement is capped at eight pixels and disabled for coarse pointers and reduced motion.

Hero entry uses a short, transform-only settle inside a clipped film frame. Image parallax uses viewport-based overscan to keep every frame covered. Motion preferences update live: switching to reduced motion destroys the smooth-scroll engine, restores image transforms and reverts footer animation contexts.

## Reference-led scroll sequences

Motion study: https://en.manayerbamate.com/. Observed patterns include a held central scene, independently rotating layers, large moving typography and curved section transitions. Victorino translates these into original photography-based sequences; no reference artwork, text or source code is copied.

Each major sequence has a different mechanism:
- Homepage Goa scene: native sticky photographic composition with counter-moving type, independently tilted cards, a rotating seal and a curved handoff.
- Nature’s Cove: an arched image window opens into a full rectangular frame while its image retains gentle Locomotive depth.
- Property collection: alternating scroll-linked image tilt.
- Viewing guide: native sticky horizontal chapter track with previous/next controls and a skip link.
- About page: a courtyard concept diagram draws progressively beside a vertical reading timeline.
- Closing typography: two large lines travel in opposite directions through curved boundaries.
- Footer: a curved letter arrangement settles into the wordmark as it enters view.

## Scroll scene variations across routes

`components/sections/EditorialScrollScene.tsx` owns three reusable, scoped scene variants with styling in `editorial-scroll-scene.css`. Villas uses a photo fan that spreads from a loose stack; Premium Homes uses three tall panels travelling in alternating directions; About uses a collage of independently floating photographs; residence detail pages use the panel variation with their own inspiration galleries. Each holds a native sticky stage while the reader scrolls, with counter-moving decorative type, a rotating architectural seal and a progress rule. Captions and copy remain readable; photographs are explicitly labeled inspiration.

The homepage also opens its Goa panorama from a rounded window and unfolds its interior photograph in perspective with staggered detail rows. The original Goa story remains the reference composition. All new motion follows the existing GSAP/Locomotive driver, runs only at 1000px width and 760px height or larger with motion allowed, and reverts on preference changes or unmount. Smaller viewports, reduced motion and failed JavaScript use normal-flow photo grids. New scenes own their animation targets so generic entrance effects cannot overwrite them. Keep enquiry forms and essential controls static.

GSAP ScrollTrigger reads Locomotive’s existing scroll driver. Native CSS sticky scenes only enable after the motion module loads, on sufficiently large desktop viewports with no reduced-motion preference. Mobile, short screens, reduced motion and JavaScript failure keep readable document-flow layouts. Every scene owns and reverts its transforms, media queries and enhancement attributes when cached routes become inactive. Never add a loader or an opacity-zero content gate.

The Goa lifestyle section has a dedicated panoramic reveal: an oval coastal window expands to the full image, heading lines settle from opposite sides, the caption rule draws across, and three notes rise in sequence. This section enables motion from 900px width and 600px height so standard laptop viewports receive the scene; mobile and reduced motion remain static. Its section owns all animation targets, while Locomotive alone owns the image parallax.


## Light and dark themes

The header includes a keyboard-accessible Dark theme switch on every route and inside the mobile menu. The default follows the device colour scheme; an explicit light/dark choice is stored under `victorino-theme`, persists across navigation and reloads, and syncs across tabs. A small head script applies the palette before first paint. Storage failures still permit switching for the current visit. Clearing the saved choice restores device preference on the next sync.

`app/globals.css` owns both palettes. Dark uses neutral near-black paper `#0b0b0b`, charcoal raised surfaces `#171717`, black inset surfaces `#050505`, warm ink `#eeeae2`, secondary text `#bdbdbd` and copper accent `#d7a07d`. The large footer wordmark uses light silver `#c8cfce` in dark mode for clear visibility. Existing page utility colours use these semantic variables. Photo overlays and permanently dark feature panels use fixed `--on-dark`/`--on-light` colours so they retain contrast in either theme. Forms, dialogs, consent, navigation, footer and scroll scenes inherit the active palette; focus rings and error text adapt too. Theme changes do not animate layout or recolour photography.
