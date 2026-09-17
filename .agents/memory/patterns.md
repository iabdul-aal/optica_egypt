# Patterns

Recurring patterns that work well in this codebase. Append one line per
discovery. Format: `YYYY-MM-DD: <pattern description>`.

## Established patterns

- All data-driven content (events, members, news, outreach) is stored in
  `data/*.json` files and loaded through typed loaders in `lib/`. Never
  hardcode records in JSX components.
- Chapter identity fields (name, founding year, email, social handles) are
  derived from `data/site_config.json` via `lib/site-config.ts`. Reference
  `siteConfig.name` in components; never hardcode.
- Bilingual strings use next-intl message files (`messages/en.json` and
  `messages/ar.json`). The `useTranslations()` hook is the only permitted
  way to render user-facing text in components.
- RTL layout is applied automatically via `dir="rtl"` on the root `html`
  element when the active locale is `ar`. No manual RTL overrides in JSX.
- The two-button system is enforced globally: `.btn-primary` (solid teal)
  for primary call-to-action only; `.btn-secondary` (outlined chip) for
  every other link and action.
- Upcoming events are filtered from `data/events.json` by comparing
  `event.date` to the current date at build time via `lib/events.ts`.
  Past events are archived automatically; no manual curation needed.
- Page-level containers use `.container-page` (max-w-5xl) or
  `.container-layout` (max-w-6xl) only; no ad-hoc horizontal padding.
- Event and outreach cards use `.list-row` OOCSS class with
  `border-t border-border/60 first:border-t-0` for ruled separators.
- Officer role ordering on the Leadership page follows the canonical
  sequence defined in `lib/members.ts`: President, Vice President,
  Secretary, Treasurer, then committee leads alphabetically.
- 2026-09-17: UI smoke verification uses Playwright (`e2e/smoke.test.ts`)
  checking both `/en/` and `/ar/` locale routes for status 200, nav
  presence, and zero browser console errors.

- 2026-09-17: Member photo filename encodes all data fields: FirstName_LastName_Position_Email_LinkedIn.png — agent parses and processes with zero user steps via member-onboarding skill.
- 2026-09-17: One asset file per purpose — no light/dark duplicates. CSS [data-theme] tokens handle appearance. Single exception: print-specific logo variant.
- 2026-09-17: 3D scenes always wrapped in SceneWrapper.tsx providing Suspense + mobile detection + prefers-reduced-motion fallback returning a static WebP.
- 2026-09-17: GSAP ScrollTrigger always uses Lenis scroll proxy. Never use ScrollTrigger without the proxy when Lenis is active or scroll conflicts occur.
- 2026-09-17: useFrame for per-frame 3D updates, never useState — setState causes React re-renders that break 60fps.
- 2026-09-17: RTL GSAP animations use a directionMultiplier constant (1 for LTR, -1 for RTL) to flip x-offset values.
- 2026-09-17: Asset generation progress tracked in .agents/memory/asset-status.md — update [x] when any asset is generated.
- 2026-09-17: Cinematic spec (.agents/context/cinematic-spec.md) is the single source of truth for all animation contracts — read before any motion change.
