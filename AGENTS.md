# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.


# Approved TrialQueue direction

- Homepage only until the user approves it. Supporting routes, live authentication and submissions remain separate work.
- Night Ledger: charcoal #181B1A, bone #ECE9DE, coral #D78069; DM Sans and DM Mono. Use the approved Review Turn outlined logo; do not retype or redraw it.
- Source of truth: ../../outputs/TrialQueue-Visual-Direction-2.png and ../../outputs/TrialQueue-Brand-Kit. The source image's earlier logo is superseded by Review Turn.
- Follow the coordinator-led protocol-version story and all five proposed offers in exact order. Synthetic data, visible uncertainty, source dates, human ownership and locked outreach are compulsory.
- Use native scroll. Coordinated scroll scenes may pin only when their full stage fits the viewport after fonts settle; preserve skip controls and ordinary mobile flow. Respect OS reduced motion and the shared pause control, including offscreen/hidden-tab suspension.
- The user supplied the approved editable SVG brand/diagram kit for reuse and animation. Retain those vector assets and Phosphor icons; do not substitute generated raster logos or screenshot-based UI.
- No real patients, PHI, clinical determinations, integrations, outgoing messages, payment, invented customer proof or compliance claims. Pilot price and readiness targets are hypotheses.

# Current user direction — original motion, 18 October 2026

The user likes the increased motion quality but rejected recognisable Hear sequences as too similar. The recording is a reference for craft and continuity only. Do not recreate its dot matrices morphing into overlapping rings, projected ellipse figures, expanding arch tunnel, circular coral wipe, or their sequence. TrialQueue's original motion language uses dated evidence slips, ruled review lanes, right-angle provenance paths stopping at a human checkpoint, and a horizontal paper handoff. Preserve native scroll, fit-tested pins, skip/pause and all product boundaries. Do not claim legal clearance or a legal conclusion from this design revision.

# Hero and scroll correction — 18 October 2026

The user rejected the small evidence-slip hero and rough scrolling. Preserve the reference's class of techniques (continuous backdrop, smooth scrubbing, fitting pins, transformations) with TrialQueue's own composition. Hero now uses a short editorial headline plus the exact pre-screen thesis as supporting copy, and a dimensional treatment of the approved Review Turn SVG. Do not revert to stacked miniature cards or recreate Hear's distinctive figures. Scroll animation and canvas must use one scrubbed timeline clock, resize must not tear down all scenes, and dynamic module tabs must remain user controlled rather than fighting scroll selection. Keep the native scroll, skip/pause and mobile fallbacks.

# Particle wave integration — 18 October 2026

The user supplied and requested the Three.js ParticleWave as a background. Place it as a transparent, bounded lower-hero layer beneath approved branding and text. Reuse its sinusoidal point-wave shader with brand colour, shared pause, OS reduced-motion, hidden/offscreen suspension, responsive density and renderer cleanup. Components now live in root components/ui, with @ resolving to project root; src/styles.css and src/scrolly.css remain existing site styles and src/tailwind.css provides utilities without preflight. Do not add unrelated stock images, icons or routes.

# Scroll chapter annotations — 18 October 2026

The user explicitly requests reversible scroll selection in protocol chapters01–03, module offers01–05 and all three audience roles, including the775px tablet layout. This supersedes the earlier instruction to leave module selection manual-only. Keep click/keyboard controls synchronized with the scroll position. Fit-tested module/audience pins may run from700px wide and740px high; use ordinary-scroll chapter progression for tall or smaller layouts. Keep module panels and audience stages a stable height to avoid pin jumps. Replace the common orbit visual with three distinct role-specific Remotion video previews: pilot scope, cited evidence review and governed network handoff. All previews stay synthetic and paused offscreen/hidden or under the shared motion control.

# Supporting-page authorization — 18 October 2026

The user now explicitly authorizes the remaining approved IA pages and a sage-coloured particle field across the light-run. This supersedes homepage-only scope. Retain the approved Night Ledger brand, source-linked synthetic workbench, exact five modules and original motion. Shared navigation must reach all supporting routes. Forms prepare local drafts only; authentication remains unavailable. No deployment, live data, external submissions or analytics collection is implied.

# Logo and favicon kit — 18 October 2026

The user requested a proper vector logo/favicon kit. Preserve the approved Review Turn geometry and outlined wordmark. The deliverable is `outputs/TrialQueue-Logo-Favicon-Kit`: 16 logo SVG masters, eight favicon SVG variants, vector PDF artboards, transparent PNG exports, multi-size ICO and separate Apple/maskable tiles. The live website uses the dark-tile favicon with v=2 asset URLs, root favicon.ico discovery and a monochrome Safari mask. The visual handoff is `/brand-kit/index.html`. Do not replace the approved mark with a newly generated symbol. Domain/trademark clearance is unverified.

# Approved intro — The Living Protocol, 18 October 2026

The user selected option 3: a warm macro protocol page, a translucent vellum source layer, then a continuous paper reveal into the existing live hero. No navbar belongs inside the intro. Keep the shared header hidden and inert during playback, then reveal it smoothly after the 6.6-second composition ends. The website uses a transparent Remotion Player over the real hero; Studio has a separate end-frame stand-in for preview only. Keep Pause, Skip, Escape, scroll/touch skip, replay, reduced-motion bypass, asset-failure fallback and hidden-tab suspension. Deep links and supporting routes bypass the intro. Mobile uses its own readable composition framing. Preserve the approved SVG and Night Ledger identity. Do not substitute a screenshot of the hero for the live website handoff.

# Continuous intro landing refinement — 18 October 2026

The user asked for an even smoother intro-to-hero handoff and gentle navbar fade as the hero lands. This supersedes the earlier separate navbar fade after playback. Use the shared `introLandingAt` frame clock for the paper reveal, live hero camera, header opacity/position and hero footer details. The film is now 7.2 seconds / 432 frames at 60fps. Paper exits from 3.85–6.45s; hero settles from 4.1–7.05s; the actual site header fades from 5.65–7.12s during the transparent landing. The Remotion film itself still has no navbar. Keep a restrained 3.5% camera settle and avoid a cut to a static hero. Pause must freeze the full handoff. Skip uses a gentle fallback transition; reduced-motion bypass and native scrolling remain intact.

# Intro handoff rebuild after smoothness feedback — 18 October 2026

The user rejected the longer 60fps frame-driven handoff as still not smooth. The live website now mounts `ProtocolSurface.tsx` once and uses one GSAP clock to update local compositor transforms and opacity directly. Do not reintroduce per-frame React Player rendering, document-wide CSS variables, backdrop blur on the moving vellum, text scaling, or CSS transitions on properties that the JavaScript timeline owns. The Remotion Studio composition remains an editable preview using the same surface and shared choreography. It is not the live playback engine.

The paper now pulls back only slightly and dissolves into the charcoal hero instead of whipping across the viewport. Protocol print and vellum clear before the hero headline appears, avoiding overlapping text. The complete sequence is 6.8 seconds; Studio is 408 frames at60fps. Actual navbar opacity fades from5.15–6.7s with no sliding. Native playback follows the display refresh clock. Skip advances the same choreography over0.9s; early skips must not be restarted by a late image decode. Natural completion and early/paused skip must leave hero/header opacity exactly1 and remove the temporary hero transform.

# GitHub handoff — 18 October 2026

User authorized pushing the complete current website to PrajaktaAdlytica/trialqueue-site. The repository root is this application, including the public vector brand kit and editable motion sources; exclude node_modules, dist, credentials and obsolete output snapshots. Vercel uses dist/client and the committed SPA fallback. Favicon v3 enlarges the approved mark within its dark tile for small-size legibility; preserve the mark geometry.
