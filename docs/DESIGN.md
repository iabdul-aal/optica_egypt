# Design System

Optica Egypt Local Section website. A light, community-focused site designed
for students, researchers, and outreach partners reading on desktop and mobile
in academic and public settings. The visual scene is an open invitation to
the optics and photonics community in Egypt, so the design stays bright,
welcoming, and content-led.

---

## Design tokens

All tokens are defined in `app/globals.css`. Always reference these tokens;
never use raw hex or rgb values not in this list.

### Light mode

| Token | Value | Use |
|---|---|---|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#1e293b` | Primary text |
| `--surface` | `#f8fafc` | Subtle surface lift (cards, inputs) |
| `--card` | `#ffffff` | Card background |
| `--card-foreground` | `#1e293b` | Card text |
| `--accent` | `#00adef` | Primary accent (Optica teal) |
| `--accent-hover` | `#007bb5` | Hover/active state of teal |
| `--accent-foreground` | `#ffffff` | Text on teal backgrounds |
| `--accent-secondary` | `#f5a623` | Secondary accent (warm gold, highlights only) |
| `--accent-secondary-foreground` | `#1e293b` | Text on gold backgrounds |
| `--muted` | `#f1f5f9` | Muted background |
| `--muted-foreground` | `#64748b` | Muted/subdued text |
| `--border` | `#e2e8f0` | Default border |
| `--input` | `#e2e8f0` | Input border |
| `--ring` | `#00adef` | Focus ring |
| `--radius` | `0.5rem` (8 px) | Base border radius |
| `--destructive` | `#ef4444` | Error/danger state |

### Dark mode

| Token | Value |
|---|---|
| `--background` | `#0f172a` |
| `--foreground` | `#f1f5f9` |
| `--surface` | `#1e293b` |
| `--card` | `#1e293b` |
| `--accent` | `#00adef` |
| `--accent-hover` | `#38bdf8` |
| `--muted-foreground` | `#94a3b8` |
| `--border` | `#334155` |

### Radius scale

| Token | Value |
|---|---|
| `--radius-sm` | 4 px |
| `--radius-md` | 6 px |
| `--radius-lg` | 8 px (base) |

Content cards must not exceed `--radius-lg` (8 px). Large decorative radius
values (`rounded-2xl`, `rounded-3xl`, `rounded-full`) are forbidden on
content containers.

---

## Typography

### Latin text

Font family: Inter (loaded via `next/font/google`) with system-ui fallback.
Font feature settings: kern and liga enabled.

### Type scale (Tailwind classes in use)

| Role | Classes | Notes |
|---|---|---|
| Hero headline | `text-4xl font-bold` | Homepage only |
| Page title | `text-2xl font-semibold` | One per page |
| Section heading | `text-xl font-semibold` | H2 equivalent |
| Card heading | `text-base font-semibold` | Within list rows |
| Body | `text-sm leading-relaxed` | Default prose |
| Caption / metadata | `text-xs text-muted-foreground` | Date, venue, type |
| Badge label | `text-[10px] font-semibold uppercase tracking-wide` | Event type badges |

### Line length

Body copy: 65-75 characters. Use `max-w-prose` or equivalent.
Do not use `max-w-full` for paragraph text.

### Prohibited

- Negative letter spacing on any text.
- Display text larger than `text-4xl` outside the hero.
- New font families beyond the approved design system.
- Italic as a stylistic device (italic is reserved for citations and `<em>`).

---

## Layout

### Page containers

| Class | Max-width | Use |
|---|---|---|
| `.container-page` | 5xl (64 rem) | Page-level content |
| `.container-layout` | 6xl (72 rem) | Header and footer alignment |

Do not invent ad-hoc `px-` values at page level.

### Navigation

Seven items only: Home, About, Events, Leadership, Outreach, Resources, Join Us.
Do not add items without updating `components/navigation.tsx` and
consulting `docs/PRODUCT.md`. The locale switcher (AR / EN) appears at the
far end of the navigation bar and is not counted as a nav item.

### Section rhythm

- Sections are separated by generous vertical space (`py-12` or `py-16`).
- Use `border-t border-border` to introduce horizontal rules between sections.
- Prefer ruled sections over decorative card clusters for grouping.

### Cards

Permitted for repeated records: events, members, outreach, resources.
- Border radius: `rounded-lg` (8 px) maximum.
- Background: `var(--card)` with `border border-border`.
- No card-in-card nesting.
- No drop shadows beyond `shadow-sm`.

### RTL layout

RTL is applied automatically via `dir="rtl"` on the root `html` element.
Do not use `rtl:` Tailwind overrides for layout properties already handled
by the root direction. Use `rtl:` only for specific visual adjustments that
the root direction does not cover (e.g., rotating a directional chevron icon).

---

## OOCSS utility classes

Defined in `app/globals.css`. Use these instead of inventing custom classes.

| Class | Purpose |
|---|---|
| `.shell-primary` | Primary container with surface background |
| `.shell-secondary` | Secondary card with card background |
| `.filter-row` | Horizontal flex row for filter controls |
| `.list-shell` | Vertical list container |
| `.list-row` | Single row with top border separator |
| `.btn-primary` | Solid teal fill button (primary CTA only) |
| `.btn-secondary` | Outlined chip button (all other actions) |
| `.badge-event` | Teal event type badge |
| `.badge-highlight` | Gold highlight badge |
| `.container-page` | Main page content container |
| `.container-layout` | Header and footer container |

---

## Component inventory

| File | Purpose | Key constraints |
|---|---|---|
| `navigation.tsx` | Site header with logo, seven nav links, locale switcher | Identity from `siteConfig`; no hardcoded nav items |
| `footer.tsx` | Page footer with social links and Optica affiliation | Identity from `siteConfig` |
| `hero-section.tsx` | Homepage hero with chapter tagline | Community voice; no marketing copy |
| `event-card.tsx` | Single event row with date, type, title, actions | Data from `data/events.json`; `.btn-secondary` only |
| `events-list.tsx` | Filterable list of upcoming and past events | Loader from `lib/events.ts` |
| `member-card.tsx` | Officer card with photo, role, and links | Data from `data/members.json` |
| `leadership-grid.tsx` | Leadership page grid of officer cards | Sorted by `lib/members.ts` ROLE_ORDER |
| `outreach-record.tsx` | Single outreach activity card with impact metrics | Data from `data/outreach.json` |
| `news-feed.tsx` | Latest announcements feed | Data from `data/news.json`; no hardcoded news |
| `resource-card.tsx` | Single curated resource link card | Data from `data/resources.json` |
| `locale-switcher.tsx` | AR / EN toggle in navigation | Uses next-intl `Link`; not a plain `<a>` |

---

## Two-button system law

Exactly two button or trigger styles are permitted across the entire site:

1. `.btn-primary` (solid teal): the single primary call-to-action per page
   only (e.g., "Join Us", "Register for Event", "View All Events").
2. `.btn-secondary` (outlined chip): all other links and actions (navigation
   links, social handles, resource downloads, event detail links, filter chips).

Do not introduce a third style.

---

## Motion

Motion is minimal and functional:

- Short `transition-colors` and `transition-all duration-200` on interactive
  elements only.
- No entrance animations, parallax, hover-lift, glow effects, or
  scroll-driven decoration.
- The `prefers-reduced-motion` block in `globals.css` sets all transitions
  and animations to 0.01 ms.

---

## Agent compliance checklist

Before submitting any UI change, verify each item passes:

- [ ] All colors reference tokens from `app/globals.css`.
- [ ] No border radius larger than `rounded-lg` on content cards.
- [ ] No card-in-card nesting.
- [ ] No new font families introduced.
- [ ] No negative letter spacing on text.
- [ ] No entrance animations.
- [ ] No `prefers-reduced-motion` bypass.
- [ ] Buttons use `.btn-primary` or `.btn-secondary` only.
- [ ] `.btn-primary` used for at most one CTA per page.
- [ ] No `&` connective or em-dash in any string.
- [ ] `npm run check` passes.
