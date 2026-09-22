# Optica Egypt Local Section

Official website for the Optica Egypt Local Section, connecting students, researchers, universities, industry, and startups across Egypt to the global photonics ecosystem.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15, React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, CSS custom properties |
| 3D | React Three Fiber, @react-three/drei |
| Animation | GSAP, Framer Motion, Lenis |
| i18n | Static English routes |
| Theme | next-themes, dark-first |
| Hosting | Vercel (free) |
| CI/CD | Vercel GitHub integration + GitHub Actions |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

## Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm run check     # Lint + typecheck (run before push)
npx playwright test --reporter=list   # E2E smoke tests
```

## Content

All content lives in `data/`. Adding or updating content never requires code changes.

| File | Content |
|---|---|
| `data/site_config.json` | Chapter identity, email, social handles |
| `data/events.json` | Events database |
| `data/members.json` | Officer directory |
| `data/news.json` | Announcements |
| `data/blogs.json` | Technical articles and research spotlights |
| `data/gallery.json` | Photo and activity archive |
| `data/open_source.json` | Open source photonics program, tools, and chipathon |
| `data/outreach.json` | Outreach activities |
| `data/resources.json` | Curated photonics resources |

## Internationalization

All strings live in `messages/en.json`.
Routes are statically generated at root paths with dark-mode primary and light-mode parity.

## Agentic System

The root `AGENTS.md` and `.agents/` directory contain the full agentic configuration:
skills, memory logs (`decisions.md`, `patterns.md`, `anti-patterns.md`), context, and sitemap.

## Deployment

Auto-deploys to Vercel on every push to `main`.
Preview deployments created for every pull request.