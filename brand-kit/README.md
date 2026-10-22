# TrialQueue - Logo & Favicon Kit

Approved identity: Review Turn. Visual system: Night Ledger. Prepared 18 October 2026.

## Start here

Open `index.html` for the visual kit. The logo symbol and outlined lettering preserve the approved artwork. This is an organized vector handoff, not a new identity or a trademark clearance.

- `logo-svg/`: 16 vector masters. Horizontal lockup, symbol, wordmark and stacked lockup; each in primary (ink/coral), reverse (bone/coral), monochrome ink and monochrome bone.
- `favicon-svg/`: 8 square vector masters: default dark tile, light tile, coral tile, adaptive transparent, primary transparent, Safari monochrome, maskable and Apple touch.
- `pdf/TrialQueue-Vector-Masters.pdf`: 18 vector artboards, including the cover, all 16 logo masters and favicon variants. Logo geometry is paths; it is not an embedded bitmap.
- `png/`: transparent logo compatibility exports, in two sizes for every master.
- `web/`: ready-to-install SVG, 16/24/32/48/64/96/128/256 PNG favicons, 16/32/48/64 ICO, 180px Apple icon, 192/512 icons, separate 192/512 maskable icons and manifest.
- `palette.json`: RGB colours and sizing recommendations.
- `preview/favicon-size-proof.png`: actual-pixel small-size proof.
- `fonts/`: licensed local fonts for the visual kit; logos do not require fonts.

## Which file to use

Use the horizontal lockup in the website navbar and documents. Use the symbol when the brand name is already present or space is constrained. Use the stacked lockup in tall compositions. Use the wordmark only when the symbol is shown elsewhere in the same context.

Use the default dark-tile favicon on both light and dark browser chrome. It maintains its own contrast. The adaptive transparent SVG is optional and changes the body with the browser colour scheme; it is not the default website asset. Safari uses a one-colour vector mask and the supplied coral tint. Apple uses a full-bleed square because the platform handles its corner mask. Maskable artwork stays within the central 80%-diameter safe circle; do not replace it with the ordinary rounded favicon.

## Clear space, sizes and colour

Keep clear space of at least one quarter of the symbol height around logo artwork. Recommended minimum CSS widths: horizontal lockup 120px, wordmark 96px, stacked lockup 120px, symbol 24px. The dedicated favicon artwork is the 16px exception. Use the supplied PNG at its intended native pixel size for raster favicon output.

Ink #181B1A / Bone #ECE9DE / Coral #D78069. All supplied files are RGB digital masters. For a print job, have the printer map colours to its output profile and proof the result; no universal CMYK or spot-colour match is claimed.

Do not stretch, rotate, recolour individual pieces, add strokes, retype the wordmark or bake effects into these masters. The two monochrome variants are ink and bone, not pure process black or paper white. Select the appropriate reverse artwork for a dark background. Artwork includes no external references, raster images, live text or proprietary font requirement.

## Website installation (already applied)

The site uses `/assets/favicon/` plus `/favicon.ico` for legacy automatic discovery. HTML declarations:

```html
<link rel="icon" href="/assets/favicon/favicon.ico?v=2" sizes="any" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16.png?v=2" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32.png?v=2" />
<link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg?v=2" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png?v=2" />
<link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg?v=2" color="#D78069" />
<link rel="manifest" href="/assets/favicon/site.webmanifest?v=2" />
```

Browser favicon caching may retain an older icon until a tab is reopened. The versioned URLs above request the new files. The manifest supplies icons only; it does not install a service worker or create product/PWA capabilities. The working brand, domain and trademark clearance remain unverified.
