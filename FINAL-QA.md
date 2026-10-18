# Final handoff QA — 18 October 2026

## Passed
- TypeScript: `npm run typecheck`.
- Production bundle: `npm run build`.
- Hosting contract: `npm run test:sites` (4/4).
- Lockfile installation: `npm ci --ignore-scripts`, followed by typecheck/build/tests.
- 27 routes render at 1440px desktop; 26 supporting routes render at 390px mobile. No horizontal overflow or broken image elements detected after route content loads.
- Homepage intro reaches complete state with header opacity 1 at 775px; v3 SVG/PNG/ICO references are present.
- Mobile navigation opens and Escape dismisses it.
- Mobile pilot form with fictional QA data prepares a clearly unsent local draft.
- Demo protocol v1 → v2 changes synthetic case 003 from met → not met. Simulated source verification leaves uncertain case 002 unknown. Outreach stays disabled.
- No browser console errors observed in tested routes.
- Credential-pattern scan of source/configuration: no matches.
- Vercel build/output/install configuration and SPA deep-link fallback committed.

## Boundaries
- Forms and sign-in are frontend concept previews; no submission or authentication backend.
- No Vercel deployment or domain connection performed in this handoff.
- Build reports one existing ~521kB lazy Three.js chunk advisory. No performance benchmark or universal device/browser certification is claimed.
- Earlier intro/reduced-motion QA is documented in the project notes; this handoff does not replace full assistive-technology testing or a post-deployment check.
