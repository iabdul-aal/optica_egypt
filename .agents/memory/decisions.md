# Architecture Decision Log (ADL)

Records significant architectural decisions made during development.
Format: `## ADL-NNN: <title>` followed by Date, Status, Context, Decision, Consequences.

---

## ADL-001: Static export with next-intl for bilingual routing

**Date**: 2026-09-17
**Status**: Accepted

**Context**: The site must be bilingual (Arabic and English) and hosted as a
static export on GitHub Pages. Server-side rendering is not available.

**Decision**: Use Next.js App Router with `next-intl` in static mode. All
routes are prefixed with locale: `/en/...` and `/ar/...`. The root `/`
redirects to the browser preferred locale, falling back to English.

**Consequences**: All `useTranslations()` calls must be inside Client or
Server Components that receive the locale via the `[locale]` segment. The
`generateStaticParams` function must enumerate both locales for every dynamic
route. Locale switching must use next-intl `Link` component, not plain `<a>`.

---

## ADL-002: data/*.json as single shared state repository

**Date**: 2026-09-17
**Status**: Accepted

**Context**: Multiple pages and components need access to the same records
(events, members, news, outreach). Duplication would cause stale data.

**Decision**: All mutable records live exclusively in `data/*.json` files.
TypeScript loaders in `lib/` parse and validate these files at build time.
Components never import JSON directly; they receive typed props from loaders.

**Consequences**: Adding a record always means editing a `data/*.json` file.
New data fields require updating both the JSON file and the TypeScript type
in `types/`. Agents must read the relevant `data/` file before modifying
any component that consumes it.

---

## ADL-003: Two-layer brand architecture — global Optica immutable, Egypt local separate

**Date**: 2026-09-17
**Status**: Accepted

**Context**: The initial design concept merged Egyptian visual motifs (Eye of
Horus, pyramids) directly into the Optica wordmark. Optica's logo usage policy
explicitly prohibits modification, alteration, or distortion of its logos.

**Decision**: Adopt a strict two-layer brand architecture:
- Layer 1 (immutable): Official Optica logo sourced from the Chapter Toolkit,
  stored in `public/assets/brand/global-optica/`, never modified.
- Layer 2 (local): Egypt creative identity (wordmark, motifs, gold palette,
  wave patterns) stored in `public/assets/brand/egypt/`, presented adjacent
  to but never merged with the official Optica mark.

The non-compliant logo design (Egyptian eye integrated into OPTICA wordmark)
must not appear on any public page.

**Consequences**: The navigation and footer must use a side-by-side lockup:
[Official Optica logo] | [Egypt local wordmark]. Any future redesign must
preserve this separation. The brand-compliance skill must be invoked before
any logo or visual asset change. Full rules in `docs/BRAND_ARCHITECTURE.md`.

---

## ADL-004: Officer role ordering defined in lib/members.ts

**Date**: 2026-09-17
**Status**: Accepted

**Context**: The Leadership page must display officers in a consistent,
protocol-appropriate order across all terms and locale switches.

**Decision**: The canonical role order is: President, Vice President,
Secretary, Treasurer, then committee leads sorted alphabetically by role
title. This order is enforced in `lib/members.ts` as a `ROLE_ORDER` constant.
Components receive pre-sorted arrays; sorting never happens in JSX.

**Consequences**: Adding a new officer role requires updating `ROLE_ORDER`
in `lib/members.ts`. If a role is not in the list it falls to the end.

---

## ADL-005: Hero as layered SVG/WebP composition, not single flattened image

**Date**: 2026-09-17
**Status**: Accepted

**Context**: The Egypt visual concept is strong but requires responsive
adaptation across desktop, tablet, and mobile without quality loss or
multiple re-exports of the same composition.

**Decision**: Build the hero as independent CSS-stacked layers:
background sky WebP + pyramid silhouette WebP + wave SVG overlay + light-beam
SVG + foreground glow WebP + browser-rendered typography and logo lockup.
SVG layers are reused across dark and light modes by swapping color fills.

**Consequences**: Hero assets must be stored in `public/assets/brand/egypt/hero/layers/`.
The `HeroSection` component manages layer stacking via CSS `position: absolute`.
Agents must not flatten layers into a single image; they must edit the
appropriate layer file and verify all responsive breakpoints.

---

## ADL-006: Egypt local color tokens are distinct from Optica official colors

**Date**: 2026-09-17
**Status**: Accepted

**Context**: The gold palette (#d4af37, #f4c95d, #8c641e) and dark navy
(#09131f) are creative choices made for the Egypt local identity. Optica
does not publicly specify typefaces or accent colors for local sections.
Presenting these as "official Optica colors" would be inaccurate.

**Decision**: `app/globals.css` documents all local design tokens with a
comment clearly labeling them as "Egypt local design tokens" distinct from
the Optica official teal. The gold tokens map to `--accent-secondary` and
related variables. No token is named or described as an Optica corporate color.

**Consequences**: The design-compliance skill enforces the two-palette
distinction. Any PR that labels Egypt local colors as official Optica colors
will be rejected. The gold palette is subject to change by the chapter; the
teal (`--accent: #00adef`) is kept stable as it harmonizes with Optica teal.


---

## ADL-007: Dark-first design with single-file assets — no light/dark duplicates

**Date**: 2026-09-17
**Status**: Accepted

**Context**: An early asset plan proposed separate light and dark versions of
hero images and logo assets. This would double the asset count, increase repo
size, slow builds, and create a maintenance burden with no clear benefit.

**Decision**: The site is dark-mode primary. All photographic assets are
generated for dark mode only. CSS design tokens via `[data-theme="light"]`
handle light mode appearance changes. No asset file is duplicated for theming.
The single exception is optica-egypt-primary-light.svg (white-bg logo) which
is needed for print and white-background contexts, not for web theming.

**Consequences**: Components must never hardcode a dark or light image path.
They must use a single `src` from data and let CSS handle appearance.
3D scenes adapt via useThree() reading theme context, not by swapping textures.

---

## ADL-008: Member photos are agent-processed — zero manual steps for user

**Date**: 2026-09-17
**Status**: Accepted

**Context**: Leadership members send their photos named in a structured schema.
Processing these photos (background removal, relighting, crop, saving, and
members.json update) was originally documented as a manual user workflow.

**Decision**: All photo processing is handled by the agent via the
member-onboarding skill. The user forwards the received file. The agent
parses the filename, edits the photo to brand spec (dark navy bg, gold rim
light, teal fill, 4:5 crop), saves to the correct path, and updates
members.json. The user is never asked to open an image editor or rename files.

**Consequences**: The member-onboarding skill must be invoked on any message
that contains an image file whose name matches the schema pattern. The skill
file at .agents/skills/member-onboarding/SKILL.md is the single source of
truth for this workflow.

---

## ADL-009: Cinematic layer is a first-class requirement, not progressive enhancement

**Date**: 2026-09-17
**Status**: Accepted

**Context**: The original DESIGN.md stated "no entrance animations, no
parallax, no hover-lift". The user explicitly requested a cinematic, scientific
website with 3D models, animations, transitions, hover effects, light/dark,
and EN/AR.

**Decision**: The cinematic layer (GSAP scroll triggers, Framer Motion
transitions, three R3F scenes, custom cursor, Lenis smooth scroll) is a
binding architectural requirement. The "no animations" policy in the
original DESIGN.md is superseded. All animation specs live in
.agents/context/cinematic-spec.md which is the single source of truth.
The prefers-reduced-motion fallback is mandatory for every animated element.

**Consequences**: No component ships without its hover and entrance states.
No scene ships without its mobile/reduced-motion fallback. The design-compliance
skill must check against cinematic-spec.md in addition to DESIGN.md.

---

## ADL-010: Faculty Advisor role is excluded — Local Sections do not use it

**Date**: 2026-09-17
**Status**: Accepted

**Context**: The initial members.json schema and leadership page plan included
a Faculty Advisor role at the bottom of the leadership hierarchy.

**Decision**: Optica Local Sections are student-led and do not have a Faculty
Advisor role in the officer structure. The role is removed from all schemas,
role maps, display order constants, and documentation. The eight permitted
roles are: President, Vice President, Secretary, Treasurer, Events Director,
Outreach Director, Media Director, Technical Director.

**Consequences**: Any future PR adding a Faculty Advisor field to members.json
or the Leadership page must be rejected. Role order constant in lib/members.ts
contains exactly eight entries.

---

## ADL-011 — Hosting: Vercel free tier (not GitHub Pages)

**Date:** 2026-09-17
**Decision:** Deploy to Vercel free hobby plan, not GitHub Pages static export.
**Rationale:** Vercel supports full Next.js 15 features (Server Components, ISR, middleware, image optimization). GitHub Pages requires static export which disables these. Vercel auto-deploys on push, creates preview per PR, provides CDN and SSL free.
**Consequence:** No `output: export` in next.config.ts. Full Next.js features available now and as we scale.

---

## ADL-012 — npm legacy-peer-deps locked in .npmrc

**Date:** 2026-09-17
**Decision:** Added `.npmrc` with `legacy-peer-deps=true`.
**Rationale:** @react-three/fiber 8.x pulls optional Expo peer dependencies that conflict with React 19. Legacy peer deps flag resolves this without downgrading.
**Consequence:** All future `npm install` calls in this repo use legacy resolution automatically.

---

## ADL-013 — Start-small data model: empty arrays are valid

**Date:** 2026-09-17
**Decision:** events.json and outreach.json start as empty arrays `[]`. All pages handle this with graceful empty states.
**Rationale:** Section launched this week with zero portfolio. Fake data is worse than honest empty states. Every page checks length and renders a human-readable "coming soon" message.
**Consequence:** No placeholder or lorem ipsum data anywhere. Content grows by appending JSON objects.

---

## ADL-014 — line endings locked to LF via .gitattributes

**Date:** 2026-09-17
**Decision:** `.gitattributes` forces LF for all text files.
**Rationale:** Eliminates CRLF warnings on Windows dev machines and ensures consistent diffs across OS.
