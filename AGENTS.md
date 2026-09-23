# Optica Egypt Local Section — Master Agentic Contract

> **Mission**: The official digital platform for the Optica Egypt Local Section, connecting students, researchers, faculty, industry, and startups across Egypt to the global optics and photonics ecosystem.

---

## 1. System Architecture and Stack

| Layer | Specification |
|---|---|
| Framework | Next.js 15 (App Router, Static Export `output: "export"`) |
| Runtime | React 19, TypeScript 5 (Strict Mode) |
| Styling | Tailwind CSS v4, Semantic CSS Custom Properties |
| 3D Visualization | React Three Fiber, Three.js, `@react-three/drei` (Damped Hover Springs) |
| Theming | `next-themes` (Dark-primary `#09131F`, Light `#F8FAFC`, Gold `#D4AF37`) |
| Data Layer | Structured JSON records in `data/`, typed loaders in `lib/` |
| Database | Universal client adapter (`lib/db/`) supporting Supabase, Webhooks, and Persistent Storage |
| Quality Gates | ESLint 9, TypeScript compiler (`tsc --noEmit`), Playwright E2E smoke tests |

---

## 2. Information Architecture and Sitemap

The site follows a scalable 4-group hierarchical taxonomy:

```
Optica Egypt
├── Section
│   ├── About (/about)
│   └── Leadership (/leadership, /leadership/[id])
├── Membership
│   ├── Overview (/community)
│   ├── Chapters (/chapters, /chapters/[id])
│   ├── Awards and Honors (/awards)
│   ├── Outreach Initiatives (/outreach)
│   └── Volunteer Portal (/volunteer)
├── Program
│   ├── Events and Technical Talks (/events, /events/[id], /events/[id]/register)
│   ├── Conferences and Symposia (/conferences, /conference)
│   ├── Education and Technical Training (/education)
│   ├── Open Source Photonics (/open-source)
│   ├── Competitions and Hackathons (/competitions, /hackathons)
│   └── Curated Resources (/resources)
├── Insights
│   ├── News and Announcements (/news)
│   ├── Blogs and Perspectives (/blogs)
│   └── Visual and Activity Gallery (/gallery)
└── Primary Action
    └── Get Involved / Join (/join)
```

---

## 3. Universal Quality and Brand Rules

1. **Verification Gate**: Always run `npm run check` (`eslint . && tsc --noEmit`) before completing any task. All builds must succeed with 0 errors.
2. **Zero Ampersands**: Never use `&` as a conjunction in text, copy, headings, or data fields. Write "and" exclusively.
3. **Brand Typography**:
   - Headings and display titles: **Montserrat** font family.
   - Body prose and UI labels: **Inter** font family.
   - Monospace codes and metrics: system monospaced stack.
4. **Theme Parity**:
   - Dark mode is primary; Light mode is fully supported.
   - Always use CSS theme variables: `border-[var(--line)]`, `text-[var(--ink)]`, `bg-[var(--surface)]`.
   - Never use hardcoded `border-white/*` or `text-white/*` classes that vanish or lose contrast in light mode.
5. **No External Email Registration**:
   - Forms (Events, Volunteers, Contact) must submit asynchronously in-page.
   - Never generate or trigger `mailto:` links for event or volunteer registrations.
   - Always display immediate confirmation receipts with unique confirmation codes (`OPT-EG-2026-XXXX`).
6. **Mobile First and Accessible**:
   - Navigation drawer must be a fixed viewport overlay with background scroll lock.
   - Minimum tap target size of 48px for interactive controls.
   - All input elements must enforce minimum `16px` font size to prevent disruptive iOS Safari viewport zoom.
   - 3D hero stage must remain responsive with `touch-action: pan-y` so users can scroll past without gesture traps.

---

## 4. Agentic Workflow Protocol

```
Research -> Plan -> Approve -> Implement -> Verify -> Document
```

1. **Research**: Read relevant source files, check `.agents/memory/decisions.md`, and verify existing data flows.
2. **Plan**: Formulate clean, minimal, non-breaking modifications. Seek user approval when adding architectural changes.
3. **Implement**: Write code conforming to brand rules, accessibility, and TypeScript strictness.
4. **Verify**: Execute `npm run check` and `npm run build`. Never push without clean verification.
5. **Document**: Update walkthrough and append architectural decisions to `.agents/memory/decisions.md`.

---

## 5. Skills Registry

| Skill | Purpose | Activation Trigger |
|---|---|---|
| `research-first` | Explore codebase, examine data structures, verify dependencies | Non-trivial feature additions or bug investigations |
| `design-compliance` | Ensure strict adherence to brand fonts, colors, and theme tokens | UI modifications, layouts, new pages |
| `ui-audit` | Run lint, typecheck, and Playwright verification | Pre-commit quality gates |
| `brand-compliance` | Enforce typography, zero ampersand rules, and logo integrity | Content updates, copywriting, asset additions |
| `open-source-photonics` | Guide PDA tooling, gdsfactory, PDK, and Chipathon content | Work on `/open-source` or technical programming |

---

## 6. Commands Quick Reference

```bash
npm run dev        # Launch Next.js local dev server
npm run lint       # Run ESLint across codebase
npm run typecheck  # Run TypeScript compiler typecheck
npm run check      # Full quality gate (lint + typecheck)
npm run build      # Compile production static export
```
