# Optica Egypt Local Section — Agent Configuration

The **Optica Egypt Local Section** website is the official digital presence of the
Optica Egypt chapter, connecting students, researchers, universities, industry, and
startups across Egypt to the global photonics community.

---

## Project Structure

| Path | Type | Purpose |
| ---- | ---- | ------- |
| `app/` | Directory | Next.js App Router pages and layouts |
| `components/` | Directory | Reusable React components |
| `components/3d/` | Directory | React Three Fiber scene components |
| `lib/` | Directory | Core logic, data loaders, site configuration |
| `public/assets/` | Directory | All static assets (organized, see Asset Map below) |
| `data/site_config.json` | File | Single source of truth for chapter identity |
| `data/events.json` | File | Events database |
| `data/members.json` | File | Officer directory (drives Leadership page) |
| `data/outreach.json` | File | Outreach activities |
| `data/news.json` | File | Announcements feed |
| `data/resources.json` | File | Curated Optica resources |
| `messages/en.json` | File | English locale strings |
| `messages/ar.json` | File | Arabic locale strings |
| `docs/DESIGN.md` | File | Full design system (cinematic + scientific layer) |
| `docs/CONTENT.md` | File | Writing style and content governance |
| `docs/PRODUCT.md` | File | Product purpose, audience, brand principles |
| `docs/BRAND_ARCHITECTURE.md` | File | Two-layer brand system |
| `docs/ASSET_PROMPTS.md` | File | AI generation prompts for every asset |
| `docs/LEADERSHIP_PHOTOS.md` | File | Photo editing workflow and file system |
| `docs/MEMBER_MESSAGE.md` | File | Template message to collect member photos |
| `docs/PHOTO_EDIT_PROMPT.md` | File | Unified ChatGPT prompt for portrait editing |
| `.agents/skills/` | Directory | Invokable skill files |
| `.agents/memory/decisions.md` | File | Architecture Decision Log |
| `.agents/memory/patterns.md` | File | Recurring patterns that work |
| `.agents/memory/anti-patterns.md` | File | Things tried and reverted |
| `.agents/memory/asset-status.md` | File | Live asset generation progress tracker |
| `.agents/context/cinematic-spec.md` | File | 3D scenes and animation contracts |

---

## Asset Map

```
public/
  assets/
    brand/
      egypt/
        logo/         ← all logo SVG and PNG variants
        hero/layers/  ← sky, pyramids, glow, wave, beam layers
        patterns/     ← wave SVGs, corner accents, border
        iconography/  ← pyramid, eye, nile, solar motifs
        icons/        ← community icon set (photonics theme)
    social/           ← social media templates
    events/           ← event branding templates
    photography/      ← lab, community, egypt, event photos
  people/
    leadership/       ← firstname-lastname.jpg per officer
  og/                 ← OG social preview images
  favicon.ico
  icon-192.png
  icon-512.png
  maskable-512.png
  site.webmanifest
```

**Rules:**
- One file per person in `people/leadership/`. No variants. Filename = `data/members.json` id + `.jpg`.
- No light/dark duplicates for any asset. CSS tokens handle theming, not files.
- Photos are JPEG 85% at 800x1000px (4:5). All other images are WebP 85%.
- SVGs for all waves, icons, and logo marks.

---

## Quick Reference

### Languages and Tooling

- Languages: TypeScript, JavaScript, GLSL
- Package Manager: npm
- Framework: Next.js 14+ App Router, static export
- Styling: Tailwind CSS + custom design tokens (dark-first)
- 3D: React Three Fiber + @react-three/drei + @react-three/postprocessing
- Animation: GSAP (scroll) + Framer Motion (UI transitions) + Lenis (smooth scroll)
- Internationalization: next-intl, static routing /en/ and /ar/
- Theme: next-themes, class strategy, dark-first, persisted in localStorage

### Commands

```bash
npm run dev          # Start local development server
npm run build        # Compile static HTML production export
npm run lint         # ESLint check
npm run typecheck    # TypeScript check
npm run check        # Full verification (lint + typecheck) — always run before pushing
npx playwright test --reporter=list   # UI smoke tests
```

---

## Agentic Workflow Protocol

```
plan -> implement -> self-review -> verify
```

1. **Plan** — invoke `research-first`. Read source files, trace data flow,
   check `.agents/memory/decisions.md`, write a one-paragraph plan.

2. **Implement** — write the change. Follow all universal rules.
   Route specialized tasks to skills (see Skills Registry below).

3. **Self-review** — invoke `design-compliance` on all touched files.
   Does this match `docs/DESIGN.md`, the cinematic layer in
   `.agents/context/cinematic-spec.md`, and the bilingual parity rules?

4. **Verify** — `npm run check`. Fix all errors. For UI changes after build,
   run `npx playwright test` via `ui-audit` skill.

5. **Memory** — update `.agents/memory/` with any new patterns, anti-patterns,
   or architecture decisions before closing the task.

### Photo Processing Protocol (when user forwards a member photo)

When a photo is received named as:
`FirstName_LastName_Position_Email_LinkedIn.png`

Execute these steps automatically with no user interaction required:

1. Parse filename: split on underscore, extract all five fields.
2. Derive id: lowercase firstname-lastname (hyphens).
3. Edit photo using the prompt in `docs/PHOTO_EDIT_PROMPT.md`
   (dark navy bg, gold rim light, teal fill, 4:5 crop).
4. Save edited photo to `public/assets/people/leadership/[id].jpg`.
5. Map position string to bilingual role using the role map in `data/members-roles.md`.
6. Append member entry to `data/members.json` with all fields populated.
7. Report completion. Never ask the user to do any of these steps.

### Multi-Agent Orchestration Note

When a task spans multiple domains, decompose it:
- **Context isolation**: give each sub-task only the files it needs.
- **Handoff contracts**: document output state in one paragraph before next sub-task.
- **Shared state**: `data/*.json` files are the only shared state. Never duplicate data.

---

## Skills Registry

| Skill | Trigger | What it does |
|---|---|---|
| `research-first` | Any non-trivial task (default) | Read, trace, plan, enforce memory |
| `design-compliance` | "review UI", "check design", "audit" | Audit against `docs/DESIGN.md` + cinematic spec |
| `image-to-code` | "redesign", "new section", "visual quality" | Image-first design, bilingual, RTL-aware |
| `ui-audit` | "run tests", "verify build", "check site" | Playwright smoke tests, both locales |
| `content-localization` | "translate", "Arabic", "bilingual", "RTL" | Enforce EN/AR parity and RTL layout |
| `event-management` | "add event", "workshop", "seminar", "calendar" | Add/archive events in events.json |
| `brand-compliance` | "logo", "brand", "Optica brand", "colors" | Two-layer brand rules, approved logo |
| `member-onboarding` | "photo received", "add member", member photo forwarded | Auto-process member photo, update members.json |
| `3d-scene` | "3D scene", "WebGL", "fiber optic", "wave", "beam" | Three.js/R3F scene contracts, performance rules |
| `asset-tracker` | "asset status", "what is generated", "assets done" | Check .agents/memory/asset-status.md progress |

---

## Universal Rules

1. **Verify before pushing.** `npm run check` is non-negotiable.

2. **Dark-first design.** The site is dark-mode primary (`#09131F` background).
   Light mode is a toggle. Every component must look correct in both.
   CSS variables handle theming; never duplicate assets for light vs dark.

3. **No asset duplication.** One file per asset. No light.jpg + dark.jpg pairs.
   CSS `[data-theme="light"]` token swaps handle appearance changes.

4. **Cinematic layer is real.** Animations, transitions, hover effects, and 3D
   scenes are intentional design requirements, not optional enhancements.
   Always implement them. Always wrap in `prefers-reduced-motion` fallback.

5. **Three 3D scenes are contractual.** They are named and specced:
   - Scene A: Fiber Optic River (homepage hero)
   - Scene B: Wave Interference (homepage mid-section, scroll-driven)
   - Scene C: Laser Beamsplitter (events page, mouse-interactive)
   All three require `<Suspense>` + static WebP fallback for mobile.
   Full spec in `.agents/context/cinematic-spec.md`.

6. **Bilingual parity is absolute.** Every user-facing string requires both
   `en` and `ar` keys. No exceptions. Use `content-localization` skill.

7. **All records live in data/*.json.** Events, members, news, outreach, resources.
   Never hardcode records in JSX. Components receive typed props from `lib/` loaders.

8. **Identity is in site_config.json.** Chapter name, founding year, email,
   social handles. `lib/site-config.ts` exposes them. Never hardcode in JSX.

9. **Character rules — enforced everywhere:**
   - `&` as a connective: forbidden. Write "and".
   - Em-dash U+2014: forbidden. Use comma, semicolon, or new sentence.
   - "OSA" or "Optical Society": forbidden. Write "Optica".
   - Arabic text must use Arabic punctuation: ، ؛ ؟

10. **Member photos: one file, agent handles everything.**
    Filename schema: `FirstName_LastName_Position_Email_LinkedIn.png`
    Agent parses, edits, saves, and updates members.json.
    No manual steps. No user involvement after forwarding the photo.

11. **Accessibility is non-negotiable.** WCAG AA contrast on all text.
    All images: descriptive `alt` in both EN and AR. Keyboard navigation.
    `prefers-reduced-motion`: all animations must have a 0ms fallback.

12. **Automation-first.** Before any static field, ask: can this update itself?
    Events auto-archive. News is JSON-driven. Member list is JSON-driven.

13. **Brand compliance.** Approved logo: dark navy + OPTICA white bold + EGYPT gold
    + Eye of Horus + pyramids mark. This is the official approved mark for the section.
    Never flag it as a violation. `docs/BRAND_ARCHITECTURE.md` has full rules.

14. **Memory maintenance.** New pattern: append to `patterns.md`.
    Failed approach: append to `anti-patterns.md`.
    Architectural decision: add ADL entry to `decisions.md`.
    Asset generated: update `asset-status.md`.

15. **Clean workspace.** `.next/`, `out/`, `node_modules/` are never committed.

---

## Design System Summary (Quick Reference)

Full specification: `docs/DESIGN.md`

| Token | Value | Use |
|---|---|---|
| `--background` | `#09131F` (dark) / `#FFFFFF` (light) | Page background |
| `--surface` | `#1A1F26` (dark) / `#F8FAFC` (light) | Card backgrounds |
| `--accent` | `#00ADEF` | Primary CTA, links, teal elements |
| `--accent-secondary` | `#D4AF37` | Gold highlights, headings, icon accents |
| `--foreground` | `#F1F5F9` (dark) / `#1E293B` (light) | Body text |
| `--border` | `rgba(212,175,55,0.15)` (dark) | Card and divider borders |

**Typography**: Montserrat (display headings) + Inter (body EN) + Noto Naskh Arabic (body AR)
**Radius**: `rounded-lg` (8px) maximum on cards
**Buttons**: `.btn-primary` solid teal / `.btn-secondary` outlined only
**Motion**: GSAP scroll-triggered + Framer Motion page transitions + Lenis smooth scroll
**3D post-processing**: Bloom (threshold 0.3, strength 1.5) + Vignette on all three scenes

---

## Navigation (8 items)

Home / About / Events / Community / Leadership / Outreach / Resources / Join Us

Do not add or remove items without updating `components/navigation.tsx` and `docs/PRODUCT.md`.

---

## Page Inventory

| Page | Route | Key data source |
|---|---|---|
| Home | `/` | events.json (upcoming 3), news.json (latest 3) |
| About | `/about` | site_config.json |
| Events | `/events` | events.json (filterable, all) |
| Community | `/community` | members.json, outreach.json |
| Leadership | `/leadership` | members.json |
| Outreach | `/outreach` | outreach.json |
| Resources | `/resources` | resources.json |
| Join Us | `/join` | site_config.json |
