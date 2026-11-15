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
| Recruitment | Supabase Postgres, Auth, and row-level security |
| CI/CD | GitHub Actions checks; Vercel CLI or optional Git integration |

## Getting Started

```bash
npm ci
# Copy .env.example to .env.local and add your Supabase configuration.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm run check     # Lint + typecheck (run before push)
npm run test:unit # Delivery regression tests
npm run test:live # Real Supabase recruitment tests (requires .env.local)
npx playwright test --reporter=list   # E2E smoke tests
```

## Content

Public editorial content lives in `data/`. Recruitment applications, staff roles,
and review history live in Supabase.

| File | Content |
|---|---|
| `data/site_config.json` | Chapter identity, email, social handles |
| `data/events.json` | Events database |
| `data/members.json` | Officer directory |
| `data/news.json` | Announcements |
| `data/blogs.json` | Technical articles and research spotlights |
| `data/gallery.json` | Photo and activity archive |
| `data/chapters.json` | Student chapters registry and campus map data |
| `data/open_source.json` | Open source photonics program, tools, and chipathon |
| `data/membership_tiers.json` | Audience-specific membership tiers, pricing, and benefits |
| `data/outreach.json` | Outreach activities |
| `data/resources.json` | Curated photonics resources |

## Internationalization

Shared navigation labels live in `messages/en.json`; page-level content also
lives in the route components and editorial data files.
Public pages use root paths with dark-mode primary and light-mode parity.
Staff pages and API routes render dynamically on the server.

## Agentic System

The root `AGENTS.md` and `.agents/` directory contain the full agentic configuration:
skills, memory logs (`decisions.md`, `patterns.md`, `anti-patterns.md`), context, and sitemap.

## Deployment

Use Node.js 24 and the Vercel Next.js framework preset. This app needs server
hosting for recruitment APIs and staff sessions; GitHub Pages static export is
not supported. The old Pages workflow has been removed.

Link the intended project explicitly, configure the environment variables in
`.env.example`, and deploy with the Vercel CLI or connect the repository through
Vercel's Git integration. Keep the server key secret. Preview deployments should
use a separate Supabase project; production credentials are not set for previews.

## Chapter recruitment

- `/recruitment`: application form and saved reference receipt.
- `/join`: chapter application form plus membership information.
- `/admin`: protected recruitment overview, filters, and application review.
- `/admin/staff`: administrator-only role management for existing Auth users.

Apply all SQL files in `supabase/migrations/` in order on a new Supabase project.
Provision staff from a private JSON roster outside the source checkout:

```bash
node --env-file=.env.local scripts/provision-staff.mjs /private/roster.json /private/credentials.csv
```

The roster is an array of objects with `name`, `email`, and `role` (`admin`,
`recruiter`, or `viewer`). The script generates a unique temporary password for
each account and writes it only to the private credentials CSV. Existing accounts
are left unchanged unless the entry explicitly sets `resetPassword: true`.
An optional `password` field supports an administrator-specified temporary password.
Never put roster files or credentials in the repository or deployment archive.

Staff sign in using email and password at `/admin/login`. They must replace
their temporary password at `/admin/change-password` before accessing applications,
reviews, or role management. New passwords require at least 12 characters, a
letter, and a number. The server verifies the current password, rotates a
server-controlled credential version, and revokes older sessions. RLS checks
the current restriction and version in `auth.users`, so directly calling the
database or editing profile metadata cannot bypass the restriction.

Share each staff member's own credentials privately. The script sends no emails,
and password sign-in does not depend on Supabase SMTP. Administrators can assign
roles through Team access; password resets use the provisioning script with
explicit authorization. Applicants do not need accounts.

See [the recruitment walkthrough](docs/engineering/RECRUITMENT_WALKTHROUGH.md)
for permissions, deployment details, verification, and remaining limitations.
