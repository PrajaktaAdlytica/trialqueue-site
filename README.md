# TrialQueue — complete concept website

Research-stage website and isolated synthetic demo. Built with React 19, Vite, React Router, GSAP/ScrollTrigger, Three.js and Remotion Player. Branding follows the approved Night Ledger / Review Turn kit. Fonts and approved SVG assets are local.

## Preview

The working production preview is http://localhost:4175/ . Supporting pages use client routing with real URLs, breadcrumbs, mobile navigation, active states, a shared footer and a branded 404.

## Page map

27 named routes including the homepage, plus the catch-all 404:

- `/` — original scroll-led homepage with sage particle field throughout the light-run.
- `/why-trialqueue` — user-controlled operational handoff comparison and alternatives.
- `/platform` — five-stage source handoff and synthetic object model.
- `/products` and `/products/trial-desk`, `/products/trial-review`, `/products/trial-proof`, `/products/trial-signal`, `/products/trial-report` — exact five offers with distinct interactive previews.
- `/solutions`, `/solutions/academic-centers`, `/solutions/site-networks`, `/solutions/research-informatics-cro` — responsibility-led pages with three different diagram films.
- `/demo` — version switching, nine fictional records, dated evidence excerpts, coordinator attribution, reversible simulated source checks, locked educational drafts and denominator-based illustrative reports.
- `/evidence` — confidence ledger, proposed endpoint, baseline, guardrails, pilot gates, stop rule, interviews, advertising A/B angles and internal tracking proposal.
- `/governance` — source, human review and permission boundaries with a scroll-traced approval path.
- `/pilot` — hypothesis pricing, funding-route comparison, evaluation stages and readiness requirements.
- `/request-pilot` — role-aware local inquiry draft, optional module preselection, editable confirmation and text download.
- `/resources` and three guides: `/resources/protocol-version-review`, `/resources/registry-local-data`, `/resources/retrospective-pilot` — filtered library, source links and reading progress.
- `/company`, `/contact`, `/sign-in`, `/legal/privacy`, `/legal/terms` — mission, business inquiry, unavailable authentication and explicitly draft preview notices.

## Motion and accessibility

Native scrolling remains in place. Existing homepage pins run only if the complete stage fits; mobile uses normal document flow. Chapter tabs remain synchronized with scrolling. A shared pause control and OS reduced motion apply across routes. Three.js fields and role films suspend offscreen or in hidden tabs. Page motion uses paper handoffs, lateral review lanes, a traced governance path, changing report bars, architectural brand movement and readable section reveals. It does not recreate Hear's recognizable figures or sequences.

The added light-run Three.js canvas is transparent, sage `#637B68`, one viewport tall and sticky within that section. It never allocates a renderer as tall as the whole page. Navigation supports keyboard focus, Escape/outside dismissal, modal mobile focus, and normal Back/Forward URL navigation. All clinical examples remain visibly synthetic; demo window labels stay sticky during long previews.

## Product boundaries

No real people, PHI, live connections, patient outreach, clinical writes, diagnosis/treatment, automated eligibility or enrollment. Source checks are local simulations. Drafts cannot be sent. Counts are derived from nine fictional records; no accuracy, time savings, adoption, ROI, security certification or compliance is claimed.

The inquiry and contact forms prepare drafts in browser memory only. They do not send email, save leads or call a CRM. A downloaded draft is a user-controlled local file. The sign-in fields are disabled and accept no credentials. No analytics, advertising pixels, campaigns, checkout or live submissions are installed. Draft legal content needs a verified operator and legal review before live collection. Branding/domain/trademark clearance is unverified.

Pricing remains a hypothesis: $1,500 per active protocol per month plus $5,000 site onboarding. Pilot readiness is not demonstrated. Required gates and the stop rule appear on the site.

## Development and handoff

```sh
npm install
npm run dev
npm run typecheck
npm run build
npm run test:sites
npm run preview -- --host 127.0.0.1 --port 4175
```

`dist/client` is the static website; `dist/server/index.js` and `dist/.openai/hosting.json` preserve the existing Sites package. Client routes require the supplied SPA fallback on static hosting. No deployment was performed.

`components/ui/particle-wave.tsx` follows the root component path, with `@` resolving to project root. `src/tailwind.css` contains Tailwind utilities; `src/styles.css`, `src/scrolly.css` and `src/pages.css` contain the established design system. `components.json` provides shadcn-compatible structure. No extra context provider is needed for the wave beyond the shared motion provider.

## Sources

- [ClinicalTrials.gov study-data structure](https://clinicaltrials.gov/data-api/about-api/study-data-structure)
- [ClinicalTrials.gov protocol definitions](https://clinicaltrials.gov/policy/protocol-definitions)
- [HHS research use of PHI](https://www.hhs.gov/hipaa/for-professionals/special-topics/research/index.html)
- [NIH protocol modifications](https://irbo.nih.gov/conducting-your-study/protocol-modifications/)
- [React Router declarative routing](https://reactrouter.com/start/declarative/routing)

The UI links primary sources next to the relevant limitations. Vendor references are contextual, with unverified specifics clearly identified. Remotion's own licensing notice is retained; review its current license before a commercial production rollout.

## Option 3 opening film — The Living Protocol

A 6.8-second introduction opens on the fictional protocol and translucent source vellum. The paper gently recedes and dissolves into the live charcoal hero. Outgoing print disappears before the incoming headline, so the two text layers do not overlap. The actual website navbar fades in from5.15–6.7s and never appears inside the film.

The live implementation mounts `src/ProtocolSurface.tsx` once. `src/IntroExperience.tsx` uses one GSAP clock and direct local transform/opacity updates; it does not use Remotion Player, per-frame React commits or page-wide CSS variables. The animated paper has no backdrop blur. Hero text does not scale. CSS transitions do not compete with the timeline. Shared choreography lives in `src/intro-motion.ts`.

Pause/Resume, Skip, Escape, scroll/touch skip, motion-preference bypass, hidden-tab suspension and Watch intro replay are retained. Skip advances the same choreography rather than starting a second competing animation. Late asset readiness cannot restart a skipped intro. Deep links and supporting routes bypass it.

Remotion Studio remains an editable preview, using the same paper surface and choreography with408 frames at60fps, available at http://localhost:4186/ via `npm run studio`. Its hero is a preview stand-in; the website reveals the actual live DOM hero. No MP4 was exported. The paper texture is an original generated material.

## Vercel deployment

See [DEPLOYMENT.md](DEPLOYMENT.md). The repository includes Vercel settings for the `dist/client` output and client-side route fallback. Node 24.x, `npm ci`, `npm run build`; no environment variables required.
