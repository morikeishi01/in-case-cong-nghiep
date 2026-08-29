# IN CASE CÔNG NGHIỆP — Design Specification

> **Status:** Approved design — implementation plan references this document by stable anchors `[S1]`–`[S9]`.

---

## [S1] Objective

Single-page investor/partner website that communicates:

1. Capital requirement: 18–20 million VND startup baseline.
2. Unit economics: filament cost, machine rate, contribution margin per product tier.
3. Capacity & payback: utilization scenarios from conservative to aggressive with explicit payback timelines.
4. Risk disclosure: what breaks the model, sensitivity to owner salary, utilization thresholds.
5. Web build & hosting cost: market-rate estimates for the site itself, Hostinger deployment cost with official pricing.
6. 90-day execution plan: concrete milestones from purchase to first revenue.

The page must let a reader understand the full business case in under 3 minutes of scanning, with an interactive calculator for deeper exploration.

---

## [S2] Product Context

- **Brand:** IN CASE CÔNG NGHIỆP — industrial 3D-printed protective cases.
- **Current stage:** Pre-production. No login, no payment gateway, no database, no CMS.
- **This deliverable:** A static marketing/information site. Not an e-commerce store.
- **Domain:** To be deployed on Hostinger as a static site.

---

## [S3] Visual Foundations

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--blueprint` | `#073B66` | Primary headings, key UI accents, chart bars |
| `--deep` | `#042A49` | Dark backgrounds, hero section, footer |
| `--line` | `#65B8E8` | Borders, dividers, chart gridlines, link hover |
| `--paper` | `#F3F8FB` | Page background, card surfaces |
| `--signal` | `#F2C94C` | Warnings, key metrics highlight, CTA accent |
| `--ink` | `#102433` | Body text, table text |

### Typography

| Role | Font Stack | Notes |
|---|---|---|
| Headings | `Bahnschrift, 'Arial Narrow', sans-serif` | Condensed, industrial feel |
| Body | `'Segoe UI', system-ui, -apple-system, sans-serif` | System stack, no external fonts |
| Data/Code | `'Cascadia Code', 'Consolas', monospace` | Numbers, calculator output, code |

### Layout Grid

- Base unit: **24px**. All spacing is a multiple of 24px (or 12px for tight contexts).
- Max content width: 1180px (authoritative value in `tokens.css`; plan file retains original 960px estimate for historical reference).
- Border radius: **0–4px**. No rounded card corners. Sharp, industrial aesthetic.

---

## [S4] Accessibility

- **Contrast:** All text/background combinations must meet WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text).
- **Color labels:** Never use color alone to convey meaning. Pair with text labels, patterns, or icons.
- **Keyboard & focus:** All interactive elements (calculator inputs, sliders, buttons) must be keyboard-operable with visible focus indicators.
- **Responsive baseline:** Must be usable at 375px width (iPhone SE). No horizontal scroll.
- **Reduced motion:** Respect `prefers-reduced-motion`. Disable chart animations and transitions when set.

---

## [S5] Voice & Tone

- **Concise, technical, honest.** No marketing fluff, no superlatives without evidence.
- **Distinguish clearly:**
  - **Input** — user-supplied values (e.g., "I expect 35% utilization").
  - **Assumption** — model defaults we chose (e.g., "waste rate 10%").
  - **Model result** — computed output (e.g., "payback 4.69 months at base scenario").
- **Key line (displayed on page):**
  > "Lợi nhuận không nằm ở số gram nhựa; lợi nhuận nằm ở giá trị trên mỗi giờ máy."
- Language: Vietnamese primary, with technical terms in English where standard (e.g., "ROI", "payback", "contribution margin").

---

## [S6] Implementation

- **Framework:** Static site built with **Vite + vanilla TypeScript**. No React, no Vue, no framework runtime.
- **Assets:** All charts are **inline SVG or CSS**. No external charting library, no CDN, no runtime dependencies beyond Vite dev tooling.
- **Calculator:** Browser-only. All finance calculations run client-side with pure functions. No API calls.
- **SEO:** OpenGraph meta tags, semantic HTML (`<main>`, `<section>`, `<article>`, `<h1>`–`<h3>`), structured data where applicable.
- **Print CSS:** Dedicated print stylesheet for clean PDF export of the business case.
- **Source control:** GitHub **private** repository.
- **Deployment:** Hostinger static hosting (upload built `dist/` folder). GitHub Pages preview is **not** assumed available free for private repos.

---

## [S7] Anti-Patterns

The following are explicitly **excluded** from this design:

1. **No SaaS gradient backgrounds.** Solid colors only.
2. **No generic card grids with emoji icons.** Content is organized by information hierarchy, not decorative pattern.
3. **No unsupported claims.** Every number must trace to a formula in `finance.ts` or a cited source.
4. **No fake Bambu Lab sponsorship imagery.** The printer is a tool, not a brand endorsement.
5. **No 3D charts, excessive animation, or motion for motion's sake.** Charts are flat, readable, static SVG with optional hover tooltips.

---

## [S8] Decision Priorities

When trade-offs arise, resolve in this order:

1. **Verifiable numbers** — accuracy of financial model over visual appeal.
2. **Presentation flow** — logical reading order over visual density.
3. **Scenario comparison** — side-by-side clarity over single-scenario depth.
4. **Speed** — fast load, fast comprehension over feature richness.
5. **Decoration** — last priority. Only add visual elements that serve comprehension.

---

## [S9] Workflow

- **Source:** GitHub private repository.
- **Verification at each task:**
  - Responsive check at 375px, 768px, 1024px, 1440px.
  - Calculator output matches expected test values.
  - `npm run build` produces clean `dist/` with no errors.
  - Print CSS produces readable output.
- **No deployment until all tasks pass review.**

---

## Artifact Structure

The single page is composed of 11 sequential sections:

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | Brand name, tagline, key line from [S5], capital headline (18–20M VND) |
| 2 | **Investment Summary** | Breakdown: printer 12M, filament inventory 3M, baseline 18M |
| 3 | **Unit Economics** | Filament cost 300k/kg, waste 10%, effective 333.33 VND/g, machine rate 4,000 VND/h |
| 4 | **Product Examples** | Small (50g/2.5h/46.7k→100–120k), Medium (150g/6h/104k→230–280k), Large (400g/16h/242k→600–700k) |
| 5 | **Utilization Scenarios** | Conservative 20%, Base 35%, Strong 55% with payback timelines |
| 6 | **Interactive ROI Calculator** | User adjusts utilization %, sees payback, monthly recovery, contribution |
| 7 | **Business Hypotheses** | Explicit assumptions vs. model results, sensitivity notes |
| 8 | **90-Day Plan** | Week-by-week milestones from purchase to first revenue |
| 9 | **Web Build Cost** | Market estimates labeled as assumptions: static 5–8M, professional 8–15M, agency 15–30M, maintenance 1–3M/year |
| 10 | **Hostinger Cost** | Official pricing with promotional/prepaid labels, source URL, access date |
| 11 | **Conclusion CTA** | Summary, next steps, contact |

---

## Decision Trace

| Decision | Rationale | Alternative Rejected |
|---|---|---|
| Vite vanilla TS over React | Zero runtime overhead; page is static content + one calculator; no component state complexity | React/Next.js adds 40KB+ runtime for no benefit |
| Inline SVG charts over Chart.js/D3 | No external dependency; charts are 3 fixed scenarios + 1 interactive; SVG is printable and accessible | Chart.js adds 60KB+, requires canvas, poor print |
| System font stack over Google Fonts | Zero network requests; industrial aesthetic works with Bahnschrift/Arial Narrow; no FOUT | Google Fonts adds latency, GDPR concern, FOUT |
| Hostinger over Vercel/Netlify | User specified; Vietnamese market; static upload is simplest deployment | Vercel/Netlify require Git integration, may not support private repo free tier |
| Private GitHub repo | Business financials are sensitive; not ready for public disclosure | Public repo exposes unit economics to competitors |
| No database/CMS | Single page with hardcoded data; no user-generated content; data changes infrequently | Any DB adds complexity, cost, and attack surface for zero benefit |
| Vitest over Jest | Native Vite integration; same config; faster for TS projects | Jest requires额外 transform config for TS |
| Playwright for smoke tests | Cross-browser responsive verification; can screenshot at breakpoints | Manual testing is error-prone and not reproducible |

---

## Anti-Slop Check

| Check | Status |
|---|---|
| No emoji in headings or section titles | ✅ |
| No "Lorem ipsum" or placeholder text | ✅ |
| No generic "Learn more" / "Get started" CTAs without context | ✅ |
| Every financial number traces to a formula or cited source | ✅ |
| No unsupported market size claims | ✅ |
| No fake testimonials or social proof | ✅ |
| No decorative illustrations that don't convey information | ✅ |
| All color usage has semantic purpose | ✅ |
| No external CDN/font/runtime dependencies | ✅ |
| Hostinger prices sourced with URL and access date | ✅ |
