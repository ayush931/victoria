# Victorino Luxury Homes

A Next.js website for a Goa real-estate and architecture studio.

Run `npm run dev` for local development. `npm run build` creates the production build; `npm start` serves it. Dependencies are declared in package.json.

The homepage focuses on discovering Goa real estate: an architectural villa film, linked residences, a Nature’s Cove feature, lifestyle photography, neighbourhoods, design details, a viewing guide, buyer FAQs and enquiries. GSAP and Locomotive Scroll v5 coordinate distinct scroll sequences: a photographic Goa scene, an architectural image reveal, a horizontal viewing guide, an About-page drawing timeline, opposing oversized type and a footer wordmark wave. Small screens and reduced-motion preferences receive static layouts. Content remains visible before JavaScript loads and when returning through browser history. Local 4K image sources have responsive WebP variants; the hero film uses an HD derivative with a persistent poster and pauses offscreen. Original 4K films are retained. Stock photography is labeled as inspiration.

Contact and modal enquiries share validation and a review step. Visitors can explicitly submit to the studio database with contact permission, or continue to WhatsApp and press Send there. Reviewing a draft alone does not submit it.

Cookie choices are Accept, Reject and Essentials, with settings access in the footer and a linked Privacy Policy page. Current saved choices are respected across reloads. Optional event analytics is consent-gated and responds to revocation. The new disclosure uses consent storage version v2.

See DESIGN.md for visual and interaction decisions, MEDIA-CREDITS.md for asset sources, and premium-audit.json for the static audit. Verify changes with `npm run lint` and `npm run build`, plus browser checks of scrolling, forms, keyboard interactions and mobile layouts.


## Victoria admin dashboard (Neon + Prisma)

Open `/victoria-admin-panel`. There are no default or hard-coded credentials. The public dashboard shell contains no private records; every data endpoint verifies a database session.

1. Copy `.env.example` to `.env` or `.env.local`. Set `DATABASE_URL` to your Neon pooled PostgreSQL connection string and `DIRECT_URL` to the direct connection string. Set `APP_ORIGIN` to the exact public website origin, e.g. `https://your-domain.example`. Keep Neon TLS verification enabled. Never use `NEXT_PUBLIC_` for database URLs.
2. Run `npm install`, `npm run db:generate`, then `npm run db:migrate`.
3. The initial owner account has been provisioned in the configured database. Its one-time setup script has been removed. Sign in using the login block below, change the password in My account, and create additional admins from the dashboard.
4. Start with `npm run dev` or deploy normally. Node 22.12+ is required. Set `TRUST_PROXY=true` only when a trusted proxy overwrites forwarding headers; otherwise audit IP is reported as unknown.
5. Schedule `npm run analytics:prune` **daily** on your hosting scheduler. It deletes activity and inactive visitor identifiers older than 90 days, expired sessions and expired rate-limit buckets. It keeps enquiries and administrator audits. Dashboard activity queries exclude expired records even before the job runs. Monitor the command's exit status. No scheduler is silently installed on your machine.

### Initial owner login

```text
Admin URL: /victoria-admin-panel
Local URL: http://localhost:3000/victoria-admin-panel

```

This block contains the initial password in plain text. Change it in My account after signing in and remove this block before sharing or publishing the repository.

### Access and data behavior

The owner creates/disables admins, resets passwords, revokes sessions, changes collection settings and deletes enquiries. Other admins view visitors/enquiries and update enquiry status. Audit logs are owner-only. Password hashes use scrypt; opaque session verifiers are stored hashed in PostgreSQL. Cookies are HttpOnly, SameSite=Strict and Secure on HTTPS. Sessions last up to 12 hours, expire after 30 minutes of inactivity, and each successful login atomically replaces the account's previous session. Failed sign-ins are rate-limited in PostgreSQL. Admin requests are audited; credentials and tokens never enter audit metadata.

Anonymous visitors only appear after accepting analytics. The site records page paths, link destinations (paths only), website control actions, scroll-depth milestones and presence heartbeats. Query strings, input values, passwords, recordings, fingerprinting and visitor IP addresses are not collected. Accept/reject changes are honored live. Browsers and bots cannot be reliably distinguished. “Active” means a heartbeat in the last two minutes. Overview and visitor timelines refresh every 30 seconds while visible; background polling does not extend an idle admin session. Revocation stops future events and clears the visitor identifier; historic consented events age out under retention.

The enquiry form's Review step stays local. “Send enquiry to the studio” saves contact details only after a visitor checks the explicit contact-permission box. The WhatsApp handoff remains optional and separate. An enquiry can be saved even if analytics was declined; activity is linked only when analytics consent was also given. Enquiries remain until owner deletion. Access to the PostgreSQL account itself should be restricted and backups encrypted by the host. No login URL is a substitute for authentication.

### Verification

`npm run build`, `npm run lint`, and `npm run test:admin` (unit/API validation). For the database integration suite, create a disposable local PostgreSQL database with a name ending `_test`, migrate it, then set `TEST_DATABASE_URL` when running the tests. The integration suite refuses remote or non-test databases. No live Neon connection was supplied during implementation; apply migrations and create your owner against your own database using the steps above.
