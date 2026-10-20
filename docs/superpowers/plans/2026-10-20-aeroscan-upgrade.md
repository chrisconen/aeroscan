# AeroScan service discovery upgrade

**Goal:** Present all seven services on a new visual homepage, add substantive metal detection and aerial media pages, and guide visitors to an informed enquiry.

**Architecture:** Retain the static Astro site and existing service experiences. Use one service catalog for the homepage, navigation, enquiry choices and structured offer data. Client-side selection is progressive enhancement; all services remain available without JavaScript.

**Tech stack:** Astro 6, TypeScript, CSS, existing Playwright verification.

- [x] Create `src/data/catalog.ts`, `src/data/metal-detection.ts`; describe realistic use cases and conditions without unverified performance claims.
- [x] Replace `src/pages/index.astro`; add `src/styles/upgrade.css` and `src/components/home/ServiceFinder.astro`.
- [x] Create `src/pages/femdetektoros-kereses.astro` and `src/pages/dronos-foto-video.astro`; integrate navigation and contact service selection.
- [x] Optimize generated photographic assets into local WebP files, preserve provenance, and attempt the requested Grok video.
- [x] Build and verify new interactions, all routes, mobile layout, reduced motion, metadata, keyboard navigation and no-JavaScript fallback. Never send a real enquiry during tests.
- [ ] Publish through the existing AeroScan deployment when available and verify the live result.

Trust boundaries: Formspree handles submitted personal data; external maps/fonts remain existing integrations. URL parameters may select only known service IDs and are never inserted as HTML. Generated imagery is illustration, not documentary evidence. Detector feasibility, permissions, terrain and recoverability need individual assessment. No archaeology, explosive clearance, utility safety certification or guaranteed recovery is advertised.
