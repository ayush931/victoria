# Victorino Luxury Homes

A Next.js website for a Goa real-estate and architecture studio.

Run `npm run dev` for local development. `npm run build` creates the production build; `npm start` serves it. Dependencies are declared in package.json.

The homepage focuses on discovering Goa real estate: an architectural villa film, linked residences, a Nature’s Cove feature, lifestyle photography, neighbourhoods, design details, a viewing guide, buyer FAQs and enquiries. GSAP and Locomotive Scroll v5 coordinate distinct scroll sequences: a photographic Goa scene, an architectural image reveal, a horizontal viewing guide, an About-page drawing timeline, opposing oversized type and a footer wordmark wave. Small screens and reduced-motion preferences receive static layouts. Content remains visible before JavaScript loads and when returning through browser history. Local 4K image sources have responsive WebP variants; the hero film uses an HD derivative with a persistent poster and pauses offscreen. Original 4K films are retained. Stock photography is labeled as inspiration.

Contact and modal enquiries share validation and a review step. Visitors explicitly continue to the studio’s existing WhatsApp number and press Send there; no backend submission service is configured.

Cookie choices are Accept, Reject and Essentials, with settings access in the footer and a linked Privacy Policy page. Current saved choices are respected across reloads. No optional trackers are installed. Any future tracker must consume consent before loading and respond to revocation.

See DESIGN.md for visual and interaction decisions, MEDIA-CREDITS.md for asset sources, and premium-audit.json for the static audit. Verify changes with `npm run lint` and `npm run build`, plus browser checks of scrolling, forms, keyboard interactions and mobile layouts.
