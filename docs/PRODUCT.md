# Product

## Register

community / chapter

---

## Users

The primary audience is students and early-career researchers in Egypt
interested in optics, photonics, and related fields. Secondary audiences
include faculty advisors, partner institutions, industry professionals, and
the broader Optica international community.

Visitors should be able to understand the chapter mission quickly, find
upcoming events, meet the leadership team, learn about outreach activities,
and access curated Optica resources without encountering unnecessary friction.

---

## Product Purpose

This website is the official digital presence of the Optica Egypt Local
Section. It serves three core functions:

1. **Community hub**: communicate upcoming events, workshops, and seminars
   to chapter members and the broader Egyptian optics community.

2. **Recruitment and membership**: help prospective members understand the
   chapter value and join Optica through the Join Us page.

3. **Outreach record**: document past outreach activities and community
   engagement for annual reporting and institutional visibility.

Success means a first-time visitor leaves with a clear understanding of what
the chapter does, when the next event is, and how to get involved.

---

## Brand Personality

Warm, welcoming, professionally serious.

The site should feel like the public face of an active, well-organized student
chapter that takes optics and photonics seriously while remaining accessible to
students at all stages. It communicates credibility through well-organized
content and consistent Optica branding, not through impressive visual effects.

---

## Anti-references

Avoid:
- SaaS landing pages, startup visual language, glassmorphism.
- Excessive animation, hero metric layouts, neon colors.
- Content that reads like a brochure or a recruitment pitch.
- Sections labeled "Vision", "Mission Statement", "Our Story" as standalone
  pages (the About page covers chapter mission in a single concise paragraph).
- Generic stock photography of people looking at screens or lasers.
- Phrases like "revolutionizing photonics in Egypt", "world-class research",
  "cutting-edge community", or similar superlative marketing language.
- First-person plural framing ("We are a leading chapter...").

---

## Design Principles

1. **Community over individual**: the site represents the chapter as a whole,
   not any single officer or founding member.

2. **Events first**: upcoming events are the most time-sensitive content and
   must be prominently surfaced on the homepage.

3. **Data-driven durability**: officer terms change, events pass, and outreach
   grows. Every piece of time-sensitive content must update from a data file,
   not a code change.

4. **Optica brand alignment**: the site must feel like a natural extension of
   the Optica brand family while having its own local character.

---

## Navigation constraints

Seven items, fixed: Home, About, Events, Leadership, Outreach, Resources, Join Us.

Do not add pages or navigation items without:
1. Updating `components/navigation.tsx`.
2. Updating this file with justification.
3. Updating the page inventory in `.agents/AGENTS.md`.
4. Updating the Playwright smoke tests in `e2e/smoke.test.ts`.

---

## Accessibility and inclusion

- Target WCAG AA contrast on all text and interactive elements.
- All images must have descriptive `alt` text.
- Navigation must be keyboard-accessible with visible focus states.
- Respect `prefers-reduced-motion` for all transitions and animations.
- PDF resources linked from the Resources page must include accessible
  alternatives or descriptions where possible.

---

## Annual reporting alignment

The Optica Annual Report for local sections requires documentation of:
- Number of events held and attendance figures.
- Outreach activities and estimated community reach.
- Officer roster with Optica membership status.

The `data/events.json` and `data/outreach.json` files are designed to make
this data extraction straightforward. Maintain accurate records throughout
the year so the annual report requires no back-filling.
