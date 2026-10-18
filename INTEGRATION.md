# Particle wave integration

The existing application is React/Vite. It now supports TSX and Tailwind CSS v4, and includes shadcn-compatible aliases and configuration. Existing JavaScript remains supported; a full application migration was unnecessary.

## Locations

- `components/ui/particle-wave.tsx`: reusable Three.js background, adapted from the supplied component.
- `components/ui/demo.tsx`: standalone example, not a route on the marketing site.
- `components.json`: shadcn configuration.
- `lib/utils.ts`: shared `cn` helper.
- `src/tailwind.css`: Tailwind theme and utilities; preflight is omitted to preserve the site's existing reset.
- `src/styles.css` and `src/scrolly.css`: existing design and motion styles.
- `tsconfig.json` and `vite.config.mjs`: TypeScript and Vite `@/*` alias, pointing at the project root.

`components/ui` did not exist previously; components were defined in `src/App.jsx`. It is now created at the project root as requested. The folder is a predictable home for reusable UI and lets shadcn's CLI resolve imports and place future components consistently. React itself does not require this folder.

## Setup already performed

Installed `three`, `clsx`, `tailwind-merge`, `typescript`, `@types/react`, `@types/react-dom`, `@types/three`, `tailwindcss`, and `@tailwindcss/vite`. Registered the Tailwind Vite plugin, imported utilities, configured aliases, and added `npm run typecheck`.

On another checkout, run `npm install`, `npm run typecheck`, and `npm run build`. The configuration is already initialized; do not run a fresh shadcn init over the existing styles. Future shadcn additions can use `npx shadcn@latest add <component>`; inspect generated changes and apply the TrialQueue tokens. For a fresh project, `npx shadcn@latest init` can perform initial CLI setup.

Official references: [Tailwind/Vite installation](https://tailwindcss.com/docs/installation/using-vite), [shadcn configuration](https://ui.shadcn.com/docs/components-json).

## Usage and adaptations

`<ParticleWave paused={still} color="#B9BEB5" />` is lazy-loaded into `.hero-wave`, an absolute transparent layer underneath the editorial hero. Canvas dimensions follow its container, not the whole window. `className` remains supported. No image assets, external data, context provider, or new icon library are needed.

The source's sinusoidal vertex shader is preserved. Theme colour is optional; TrialQueue passes its brand colour explicitly. The redundant per-frame colour allocations and unused mouse state were replaced with a real subtle pointer-driven perspective shift. The canvas remains transparent instead of painting a white/black full-screen background.

Animations follow the shared pause control and OS reduced motion, suspend offscreen or in hidden tabs, and dispose observers, RAF, geometry, material, and renderer on unmount. Desktop uses 40,000 points, mobile uses 8,100, with capped pixel ratio and 30fps scheduling. WebGL failure leaves the rest of the hero usable. No scroll listener, pin or scroll geometry is introduced by the wave.

## Scroll chapter and audience preview additions

`src/MotionDirector.js` now drives reversible01–03 protocol,01–05 module and01–03 audience chapters. Click and keyboard selection seek the same driver, including product-menu deep links. Fixed panel dimensions stabilize pin spacing. At775×804 the full module and audience stages fit and pin; the taller protocol uses a sticky summary and ordinary-scroll progression. Narrow screens retain ordinary flow with sticky chapter controls. Shared pause keeps the current chapter and resynchronizes playback after pin geometry is restored.

`src/RoleVideos.tsx` contains three distinct six-second,30fps Remotion compositions, embedded with `@remotion/player`: DirectorFilm (bounded pilot scope), CoordinatorFilm (dated evidence and unknown status), and NetworkFilm (fictional site permission readiness). They are live frame-based video previews rather than exported MP4 files. All use original, synthetic UI and retain visible concept/synthetic labels. Playback stops offscreen, when hidden, under the shared motion control, or through the local pause button. A full-content still frame is used for an initially reduced-motion preview.

Dependencies: `remotion` and `@remotion/player` at4.0.534, lazily loaded as a separate preview chunk. The Player emits its upstream license notice in the console; no license acknowledgement or acceptance was supplied. Review the dependency's terms as part of a production handoff. See [Player examples](https://www.remotion.dev/docs/player/examples) and [custom controls](https://www.remotion.dev/docs/player/custom-controls).

## Supporting pages and light-run — 18 October 2026

The user authorized the rest of the IA. `AppRoot.jsx` wraps the shared shell in BrowserRouter and MotionProvider. `SupportPages.jsx` implements the 26 supporting routes; `DemoWorkbench.jsx` provides the nine-record synthetic preview; `site.js` centralizes page links and guides; `usePageMotion.js` owns page-scoped motion; `pages.css` extends the brand system. See README.md for the full route map.

A second ParticleWave instance uses `color="#637B68"` within `.light-wave`. The sticky host stays one viewport tall through `.light-run`, preserving bounded WebGL dimensions. Both waves use shared pause, OS reduced motion and visibility suspension.

Shared header/footer links reach real client routes. Homepage module details and role workflows link to the corresponding supporting pages. No backend, credentials, outgoing forms, analytics or external systems are connected. Inquiry forms prepare editable local text drafts with a clear not-sent state. Sign-in is a polished unavailable preview.
