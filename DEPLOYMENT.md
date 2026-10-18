# Deploy TrialQueue to Vercel

1. Open https://vercel.com/new and import `PrajaktaAdlytica/trialqueue-site` from GitHub.
2. Use the repository root (`./`). Framework preset: **Vite**. Production branch: **main**.
3. The committed `vercel.json` sets install command `npm ci`, build command `npm run build`, and output directory `dist/client`. Node version is **24.x** in `package.json`. No environment variables are required for this concept preview.
4. Click **Deploy**. Open the generated URL and check the intro, favicon, navigation, `/demo`, and `/request-pilot`. Refresh a supporting page to check the SPA fallback.
5. For a custom domain, open project Settings → Domains, add your owned domain, and apply the exact DNS records Vercel supplies at your domain provider. Wait for verification and HTTPS.

Future pushes to main trigger production deployments when this repository is connected to Vercel. Pull requests can receive preview deployments.

This deploys a concept website, not a clinical product: forms only prepare local drafts, authentication is unavailable, and no analytics or backend is configured. The brand kit is at `/brand-kit/index.html`. Editable intro sources are under `src/remotion` and `src/ProtocolSurface.tsx`; run `npm run studio` locally to inspect the film.

Official reference: https://vercel.com/docs/frameworks/frontend/vite
