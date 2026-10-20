# AeroScan October 2026 upgrade

## Implementation

The homepage now exposes all seven services without a slider or hidden categories. A single catalog feeds navigation, city-page service cards, enquiry choices and JSON-LD offers. The homepage includes service discovery, reasons to choose AeroScan, workflow, metal detector feature, FAQs, locations and direct contact actions.

`/femdetektoros-kereses` describes 12 use cases across private, commercial and water-side searches, with a progressively enhanced filter, eight FAQs, planning information and explicit feasibility conditions. `/dronos-foto-video` provides a dedicated destination for the existing aerial media service. The contact form preserves its existing Formspree destination; known service IDs are preselected through a URL parameter. Canonicals omit query strings. City JSON-LD retains the actual Bodonhely business address rather than inventing a local branch.

## Evidence and content boundaries

- New operational figures, credentials, prices, recovery rates and detection depths were not invented. The old homepage's unverified 24/7 and 100+ mission claims were removed.
- Detector equipment specifications, water rating, permissions and availability are not evidenced in the repository. All new detector use cases are conditional on assessment, equipment suitability and required permissions.
- No archaeological treasure hunting, explosive clearance, excavation safety approval or certified utility location is offered.
- Regulatory reference checked on 2026-10-20: [68/2018. (IV. 9.) Korm. rendelet, particularly §§29 and 52](https://njt.jog.gov.hu/jogszabaly/2018-68-20-22.14). Site copy gives a general permission-check requirement and does not claim a business exemption.
- MiMo `opencode/mimo-v2.6-flash-free` contributed a content review. Its unverified suggestions concerning coin hunting, consent-only permissions, ownership of finds and implied safety clearance were rejected. Final copy was separately reviewed.
- Generated scenes are labeled as illustrations. Existing case-study/legacy-page claims were not independently authenticated in this redesign.

## Media provenance

Built-in image generation produced:

1. `public/images/upgrade/aerial-hero.webp` — prompt: cinematic photorealistic 16:9 Hungarian river valley through dense forest at sunrise, low mist, realistic compact industrial quadcopter on the right, dark forest on the left for live text, deep petrol/green shadows, warm sunrise; no text, logo or watermark; conceptual illustration.
2. `public/images/upgrade/metal-search.webp` — prompt: cinematic photorealistic 16:9 low-angle lakeshore metal detection scene, realistic black open search coil parallel to grass, anonymous operator cropped at hands, a small gold wedding band, central European lake/reeds, warm afternoon light; no text, brands, relics or military objects; conceptual illustration.

Original PNGs remain in `C:/Users/HpPc/.codex/generated_images/01a157f2-4373-7e30-b750-1380e57e0780`. Copies were encoded as WebP at quality 86 for the project.

Grok CLI generated `public/videok/aeroscan-hero.mp4`: prompt requested a 6-second 16:9 slow aerial flight above a misty Hungarian forest and river at sunrise, photorealistic teal shadows/warm sunlight, no text/logos/audio. Observed output: H.264, 1280×720, 6.041667 seconds, no audio stream. The clip starts only after explicit user action; it pauses when offscreen or when the browser tab becomes hidden.

`public/images/upgrade/diver-poster.webp` is a frame at 2 seconds of the existing `public/videok/Balaton-buvar-kereses.mp4`. The source is presented as an existing demonstration video, not authenticated operational evidence. Its portrait composition is retained in the video player.

## Trust boundaries and failure modes

The site stays static: no new backend, tracking system, credential or runtime dependency. Only an intentional visitor form submission reaches the existing Formspree provider. Existing Google Fonts and Maps integrations remain external dependencies. URL parameters are allowlisted against existing select options, and task-result text uses `textContent`; user input is never inserted into HTML.

All services, use cases and native FAQ disclosures work without JavaScript. Filters appear only once initialized. Video failure leaves the poster image available and exposes an error status. Reduced-motion settings disable decorative transitions and never trigger playback.

Long-term: add new services through `catalog.ts`; keep commercial feasibility descriptions in sync with actual equipment and permissions. Generated visuals must not be repurposed as customer references. New dependencies were not added.

## Verification

- `npm run build`: static Astro build.
- `python scripts/verify-upgrade.py`: five widths from 320–1440px; three main upgraded routes; images, overflow, all seven enquiry handoffs, parameter rejection, canonical URLs, all detector filters, keyboard FAQ, play/pause/offscreen pause, reduced motion, mobile navigation, JSON-LD and no-JavaScript fallback.
- `python scripts/verify-redesign.py`: 29 routes on desktop and mobile plus existing contact validation and cookie behavior. No real enquiry is submitted.
- Browser screenshots and JSON results live under ignored `artifacts/upgrade` and `artifacts/redesign`.
- Independent source review found missing illustration disclosure on city service cards; alt text and a visible caption were added.
