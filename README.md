# Optica Egypt Local Section

Official web platform for the Optica Egypt Local Section (`https://optica-egypt.com`), connecting university student chapters, faculty advisors, researchers, and engineers across Egypt with open-source photonics tools, initiatives, and Optica networks.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Node 24 server runtime on Vercel) |
| Language Policy | Strict English-only across UI, data, metadata, and intake |
| Styling | Tailwind CSS v4, semantic CSS custom properties (`#090c0d` / `#f8f9fa` / `#d7ae5b`) |
| Diagrams and 3D | Interactive Three.js / React Three Fiber silicon photonic chip (`PhotonicsChipScene`) with deterministic inline SVG waveguide fallback (`OpticalWaveguideDiagram`) and vector Egypt chapter map |
| Theme | `next-themes`, dark-first with light-mode parity |
| Database and Auth | Supabase Postgres, Auth, and row-level security (`/api/recruitment`, `/api/submissions`, `/admin`) |
| SEO and Discovery | Canonical metadata (`lib/seo.ts`), Schema.org JSON-LD, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt` |
| CI/CD | GitHub Actions (`npm run check`, `npm run test:unit`, `npm run build`) |

## Getting Started

```bash
npm ci
# Copy .env.example to .env.local and add Supabase keys to test live recruitment and desk forms.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev         # Local development server
npm run lint        # ESLint across codebase
npm run typecheck   # TypeScript compiler check
npm run validate    # Deterministic schema, foreign-key, asset, and editorial checks
npm run check       # Full static gate (lint + typecheck + validate)
npm run test:unit   # Zod intake and review schema unit tests
npm run build       # Production Next.js server build
npm run test        # Playwright E2E smoke, SEO, mobile, and audit tests
npm run test:live   # Live Supabase recruitment and RLS integration tests (.env.local)
```

## Architecture

Public routes follow a grouped 4-menu navigation hierarchy (`Section`: `/about`, `/governance`, `/leadership`, `/partners`; `Community`: `/chapters`, `/fellowships`, `/outreach`, `/volunteer`; `Programs`: `/projects`, `/events`, `/open-source`, `/resources`; `Insights`: `/updates`, `/news`, `/blogs`, `/press`, `/gallery`; plus `/join`, `/`, and detail routes `/leadership/[id]`, `/chapters/[id]`, `/projects/[slug]`, `/updates/[slug]`), with permanent `308` redirects in `next.config.ts` mapping merged legacy aliases (`/awards`, `/recognitions`, `/community`, `/programs`, `/conferences`, `/education`, `/competitions`, `/recruitment`).

Structured content lives in `data/`:

| File | Content |
|---|---|
| `data/site_config.json` | Section identity, `info@optica-egypt.com`, social handles, canonical `https://optica-egypt.com` |
| `data/governance.json` | Charter approval (`10 September 2026`), bylaws, constitutional officer seats, and honest empty partner/recognition states |
| `data/members.json` | 16 active founding officers and faculty advisors with WebP portraits (`public/people/leadership/*.webp`) |
| `data/domains.json` | Active Egyptian photonics research domains |
| `data/chapters.json` | Chartered AUC student chapter record and national chapter checklist |
| `data/projects.json` | Open-source PDA, training, fellowships, and campus outreach tracks with milestone and foreign-key links |
| `data/dispatches.json` | Published announcements, events, articles, and media dispatches |
| `data/resources.json` | Verified license-free photonics tools (`gdsfactory`, `Meep`, `SiEPIC-Tools`, `Femwell`), domestic grants, and journals |
| `data/membership_tiers.json` | Optica Global membership cohorts and pathways |
| `data/press.json` | Official press boilerplate and brand kit downloads (`public/branding/*`, `public/docs/optica-egypt-fact-sheet.html`) |

## Deployment and Google Search Console Setup

Deploy on Vercel using Node.js 24 and configure environment variables per `.env.example`:

- Apply all SQL migrations in `supabase/migrations/` in chronological order (`202611050001_recruitment.sql` through `202611160001_submissions.sql`).
- Provision staff accounts from a private roster file outside this checkout via `scripts/provision-staff.mjs`.
- Set `NEXT_PUBLIC_SITE_URL=https://optica-egypt.com`.
- Verify ownership in Google Search Console via domain DNS TXT record (recommended) or by setting `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel environment variables, then submit `https://optica-egypt.com/sitemap.xml`.
