# Project Baseline

Generated: 2026-09-17

## Framework
Next.js 15 · React 19 · TypeScript 5 strict · Tailwind CSS v4
App Router · Server Components by default · next-intl static i18n

## Rendering Strategy
Static generation (Vercel). No ISR, no SSR currently.
All data loaded at build time from data/*.json via lib/ loaders.

## Routes
/en/ /en/about /en/events /en/community /en/leadership
/en/outreach /en/resources /en/join
+ /ar/* mirrors (16 routes total)

## Data Layer
data/*.json → lib/*.ts (typed loaders) → app/[locale]/page.tsx (server components)
No database. No API. No auth.

## Component Architecture
```
ui/       — Button, Badge, ThemeToggle (atoms)
sections/ — HeroSection, EventCard, MemberCard, NewsSection, etc.
3d/       — SceneWrapper (stub), FiberScene, WaveScene, BeamScene (not yet built)
layout/   — Header, Footer
providers/— ThemeProvider (next-themes)
```

## Missing (as of baseline)
- LenisProvider — smooth scroll not yet wired
- SceneWrapper — stub exists in plan, not yet created
- All 3 R3F scenes — not yet implemented
- Mobile nav — Header desktop-only currently
- Skip-to-content link — not yet in Header
- Tailwind config — no tailwind.config.ts yet (using v4 CSS-first)
- Contact form — Join page has link but no Formspree form
- OG images — not yet generated
- JSON-LD structured data — not yet implemented
- Leader photos — awaiting Drive uploads

## CI/CD
GitHub Actions: lint + typecheck on PR and push to main.
Vercel: auto-deploy on push to main (not yet connected — manual step needed).

## Test Coverage
Playwright smoke tests: 14 tests (7 routes × 2 locales).
Unit tests: none yet.
Integration tests: none yet.

## Security Posture
Headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy ✓
Secrets in repo: none ✓
Member emails: gitignored (members-private.json) ✓
Internal docs: gitignored (.agents/, docs/MEMBER_*) ✓

## Performance Baseline
Not yet measured (site not deployed).
Target: Lighthouse ≥ 90 desktop, ≥ 75 mobile.

## Accessibility Baseline
focus-visible styles in globals.css ✓
prefers-reduced-motion in globals.css ✓
semantic layout structure in locale layout ✓
Skip-to-content: NOT YET IMPLEMENTED
Mobile nav keyboard trap: NOT YET MITIGATED