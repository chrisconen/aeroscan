# Interactive service experiences

The pet search, search-and-rescue, building survey and patrol pages now use a shared cinematic experience component and an interactive image explorer. The previous homepage design and the other pages are retained. Existing service information, contact actions, FAQs and pricing remain below the new sections. The building page's old generic portfolio grid is replaced by the defect explorer.

## Visual content and provenance

Eleven new AI illustrations are saved as WebP under `public/images/experiences/`: a wet golden retriever, reunion, wet cat, running horses, fictional satellite-style search map, four building defects, forest patrol and industrial patrol. Labels distinguish illustrations and the fictional map from actual field evidence or live monitoring.

Animal/map/patrol images are 1536 × 1024. The image tool returned building illustrations at 1672 × 941 despite the requested 4K brief; these files have not been upscaled or represented as actual 4K footage. The service's 4K video capability is separate from the website's illustrative image resolution. Generated PNG originals remain in the local Codex image output directory; the optimized WebP files are included in the repository and require no generation step to build the site.

## Interaction

`src/data/experiences.ts` contains coordinates, labels and explanations. `HotspotExplorer.astro` implements accessible scene tabs, click-to-open points, alternative text buttons, Escape dismissal and a native modal for image enlargement. Point placement follows the actual displayed image bounds. On mobile, explanations flow below the image so they do not cover other points. Pulses and scroll reveals respect reduced-motion preferences. Content and scene changes never leave the browser.

`ServiceExperience.astro` composes the image-led sections; `src/styles/experience.css` contains their scoped visual rules. The pet page places the hopeful reunion directly after the rain-soaked opening. Pet/rescue pages include a five-point search map and expandable animal cards. The survey has four selectable building images; the patrol explorer has two scenarios with seven points.

## Assumptions, boundaries and failure modes

The map is a fictional demonstration, not an operational map, live satellite feed, known missing animal location or real route. The patrol images do not identify actual suspects. Illustrations cannot establish theft, structural diagnosis or successful rescue. Copy distinguishes suspicious activity from established wrongdoing and regular flights from uninterrupted airborne coverage. Site content does not promise a successful rescue or guaranteed evidentiary admissibility.

No dependencies, third-party map SDK, tracking service, server endpoint or new personal-data collection were added. The existing contact and external links retain their prior destinations. No outbound message was sent. The client stores no hotspot selections. If JavaScript is unavailable, the first image, navigation links and existing service content remain; interactive controls require JavaScript. Large future copy changes or different image crops need a new coordinate/layout check. Full-resolution detail inspection should eventually use the user's genuine field photographs, with the same reusable point data structure.

## Validation

`npm run build` builds 27 routes. `python scripts/verify-redesign.py --experiences` checks all four changed routes at desktop, tablet and mobile widths, each hotspot and tab, alternative point links, Escape dismissal, enlargement dialogs, animal disclosures, reduced-motion behavior and shared navigation/form/cookie regression checks. Screenshots and the report are saved in `artifacts/experiences/`.
