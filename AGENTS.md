# Optica Egypt Local Section: Master Agentic Contract

> **Mission**: Verifiable digital ledger, chapter coordination desk, and open-source photonics resource hub for the Optica Egypt Local Section.

---

## 1. System Architecture and Stack

| Layer | Specification |
|---|---|
| Framework | Next.js 15 (App Router, Server-Rendered on Vercel, Node 24) |
| Language Policy | Strict English-only across all UI, data, metadata, and intake |
| Styling | Tailwind CSS v4, Semantic CSS Custom Properties (`#090c0d` / `#f8f9fa` / `#d7ae5b`) |
| Diagrams | Deterministic inline SVG optical diagrams (no WebGL hero overhead) |
| Data Layer | Relational strict-English JSON records in `data/`, typed graph loaders in `lib/` |
| Database | Supabase Postgres, Auth, and RLS (`/api/recruitment`, `/api/submissions`, `/admin`) |
| Quality Gates | ESLint 9, TypeScript compiler (`tsc --noEmit`), Deterministic Validation (`scripts/validate-site.mjs`), Unit Tests (`npm run test:unit`), Playwright E2E suite |

---

## 2. Canonical Sitemap (Lean 7-Hub Architecture)

```
Optica Egypt
├── Home (/)
├── About (/about: Charter overview, #governance, #leadership -> /leadership/[id], #partners, #press)
├── Chapters (/chapters, /chapters/[id]: Geographic map, AUC chapter, charter checklist)
├── Projects (/projects, /projects/[slug]: Unified open-pda, training, fellowships, outreach index)
├── Resources (/resources: Free EDA tools, domestic grants, journals, Optica tiers)
├── Updates (/updates, /updates/[slug]: Conditional event, news, article, and media dispatches)
├── Join (/join: Two-step Global vs Local overview, Committee Application, Unified Desk Form, Social Channels)
└── Staff Operations (/admin, /admin/applications/[id], /admin/submissions/[id], /admin/staff, /admin/login, /admin/change-password)
```

Deprecated legacy paths (`/governance`, `/awards`, `/recognitions`, `/leadership`, `/press`, `/partners`, `/community`, `/fellowships`, `/outreach`, `/programs`, `/open-source`, `/conferences`, `/education`, `/competitions`, `/events`, `/news`, `/blogs`, `/gallery`, `/volunteer`, `/recruitment`) permanently resolve via HTTP 308 rules in `next.config.ts`.

---

## 3. Universal Quality, Editorial, and Backend Rules

1. **Verification Gate**: Run `npm run check`, `npm run test:unit`, and `npm run build` cleanly before completing any task.
2. **Zero-Slop Editorial**: Third-person institutional voice, strict English-only copy, honest empty/planning states, compact word budgets without duplicated explanations, and zero promotional AI superlatives.
3. **Zero Ampersands and Zero Em-Dashes**: Write `and` exclusively; avoid Unicode em-dash (`U+2014`) across all prose, JSON, HTML, and JSX.
4. **Fail-Closed Postgres Intake**: Forms submit strictly to `/api/recruitment` or `/api/submissions`. Never store submitted form records or generate confirmation receipts via client `localStorage` or `mailto:`.
5. **Accessibility and Theme Parity**: Semantic CSS variables (`--canvas`, `--surface`, `--ink`, `--gold`, `--line`), `min-h-[48px]` interactive controls, `>= 16px` form inputs, and full-viewport mobile drawer outside `<header>` backdrop-filter context.

---

## 4. Commands Quick Reference

```bash
npm run dev         # Launch Next.js local dev server
npm run lint        # Run ESLint across codebase
npm run typecheck   # Run TypeScript compiler typecheck
npm run validate    # Run deterministic schema, foreign-key, asset, and editorial checks
npm run check       # Full quality gate (lint, typecheck, validate)
npm run test:unit   # Run Zod intake schema unit tests
npm run build       # Compile production server bundle
npm run test        # Run Playwright E2E smoke and audit suite
npm run test:live   # Run live Supabase recruitment and RLS tests (.env.local)
```
