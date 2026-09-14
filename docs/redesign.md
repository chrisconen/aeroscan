# AeroScan visual redesign

## Scope and source

The reference is the user-provided `webiste-mockup.webp`. The homepage follows its section order, photographic composition, angled transitions, typography hierarchy and white/ice-blue/charcoal palette. Text, links, navigation and icons are rendered as HTML/SVG, not embedded in a screenshot.

`public/images/redesign/landscape-plate.webp` is an AI-assisted cleanup of that reference, with text and interface elements removed. It is 1024 × 1536 pixels and 293,082 bytes. It is a reconstruction, not the original layered artwork; literal pixel identity is not guaranteed. Do not describe the generated scenic illustrations as documentary photographs of AeroScan operations.

The reference's “24/7” and “100+ successful missions” copy is reproduced as supplied by the user; it was not independently verified. Existing service and project descriptions were retained. Only the existing Facebook and YouTube destinations are linked. EN is a noninteractive indication because the project contains only Hungarian content.

## Implementation

- Shared layout: `BaseLayout.astro`, `Header.astro`, `Navigation.astro`, `Brand.astro`, `Footer.astro`.
- Visual tokens and responsive rules: `src/styles/global.css`.
- Homepage: `src/pages/index.astro`.
- Shared line icons: `src/components/Icon.astro`.
- Reference gallery: `src/pages/referenciak.astro`, reusing existing portfolio assets.
- All service, city, article, contact and legal pages inherit the shared visual system.
- Existing contact-form and diving-page changes are preserved.

The desktop scene plate and section heights share a coordinate system based on the reference's aspect ratio. Changing homepage copy substantially requires checking section height and text overlap. Mobile uses separate layouts and larger background scaling to keep adjacent image bands out of view. Replacing the plate with separately exported source images would make future independent section changes easier.

## Trust boundaries and failure modes

The site remains a static Astro build. No backend, authentication, storage API, dependency or credential was introduced. The contact form still sends to the existing Formspree endpoint only after a visitor submits it. The existing Google Maps embed and Google Fonts remain external dependencies. Cookie preference remains device-local storage. External social and partner links use `noopener noreferrer`.

No real contact message was sent during verification. Frontend validation is not a substitute for the existing form provider's server-side validation. External font availability can affect line breaks; local screenshots verify the loaded-font layout. The AI-cleaned imagery and mockup statistics require separate content review if used as factual marketing evidence.

## Verification

Run `npm run build` and, with `npm run dev -- --host 127.0.0.1` running, `python scripts/verify-redesign.py`.

The browser check covers 27 routes at 1440px and 390px, checks HTTP status, one H1, missing images, broken same-page anchors, horizontal overflow and JavaScript errors, and exercises mobile navigation, local email confirmation validation and cookie dismissal. Screenshots and a JSON report are written to `artifacts/redesign/` for review.
