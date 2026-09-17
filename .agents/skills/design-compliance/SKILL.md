---
name: design-compliance
description: >
  Audit touched UI files against the Optica Egypt design system. Invoke when
  asked to "review my UI", "check design compliance", "audit components", or
  after completing any change that touches app/ or components/.
metadata:
  author: optica-egypt-local-section
  version: "2.0.0"
  argument-hint: <file-or-glob>
---

# Design Compliance Audit

Review files for compliance with the project design system defined in
`docs/DESIGN.md` and content rules in `docs/CONTENT.md`.

## Workflow

1. Read `docs/DESIGN.md` in full.
2. Read `docs/CONTENT.md` in full.
3. Read the specified files (or all files touched in the current task).
4. Check each file against every rule below.
5. Output a compliance report: one line per finding, format
   `[PASS|FAIL] <rule-id>: <file>: <detail>`.

## Design rules

### Color

- `DR-C1` No pure white (`#ffffff`) or pure black (`#000000`) in CSS or JSX
  `style` props. Use design tokens from `app/globals.css`.
- `DR-C2` No broad gradients. The only permitted gradient is the subtle
  hero teal glow already defined in `globals.css`.
- `DR-C3` No neon colors, multi-accent palettes, or colors outside the token set.
- `DR-C4` Primary accent is `var(--accent)` (Optica teal `#00adef`).
  Secondary accent is `var(--accent-secondary)` (warm gold `#f5a623`) for
  event badges and highlights only. No third accent color.
- `DR-C5` All CSS custom property values must use the hex tokens defined in
  `globals.css`. No raw `rgb()`, `hsl()`, or unlisted hex values.

### Typography

- `DR-T1` No negative letter spacing (`tracking-tighter` or inline
  `letter-spacing` with a negative value).
- `DR-T2` No large display typography outside the homepage hero section.
  `text-4xl` or larger is restricted to the hero block only.
- `DR-T3` No new font families. Latin text uses Inter; Arabic text uses
  Noto Naskh Arabic (both defined in `app/layout.tsx`).
- `DR-T4` Body copy line length must target 65-75 characters
  (`max-w-prose` or equivalent). Do not use `max-w-full` for paragraph text.

### Layout

- `DR-L1` Border radius must be `rounded-lg` (8 px) or less for content cards.
  Do not use `rounded-2xl`, `rounded-3xl`, or `rounded-full` on content
  containers.
- `DR-L2` No decorative card-in-card nesting.
- `DR-L3` Navigation contains exactly seven items: Home, About, Events,
  Leadership, Outreach, Resources, Join Us. Do not add or remove nav items
  without updating `components/navigation.tsx` and `docs/PRODUCT.md`.
- `DR-L4` Use `.container-page` or `.container-layout` for page-level
  horizontal padding. Do not invent ad-hoc `px-` values at page level.
- `DR-L5` RTL layout must be driven by the root `dir` attribute only.
  Do not add `rtl:` Tailwind overrides for layout properties already handled
  by the root direction.

### Motion

- `DR-M1` No entrance animations on page load.
- `DR-M2` No parallax, hover-lift, or scroll-driven decorations.
- `DR-M3` All transitions must be covered by the `prefers-reduced-motion`
  block already in `globals.css`.

### Buttons

- `DR-B1` Exactly two button styles are permitted: `.btn-primary` (solid teal)
  and `.btn-secondary` (outlined chip). No custom button styles.
- `DR-B2` `.btn-primary` is reserved for the single primary call-to-action per
  page (e.g., "Join Us", "Register for Event").
- `DR-B3` `.btn-secondary` is used for all other links and actions
  (navigation, social links, resource downloads, event details).

### Localization

- `DR-I1` Every user-facing string must be rendered via `useTranslations()`.
  No hardcoded English or Arabic strings in component JSX.
- `DR-I2` Every locale key present in `messages/en.json` must also exist
  in `messages/ar.json` with a non-empty value, and vice versa.

## Content rules

- `CR-1` No `&` as a connective. Write "and".
- `CR-2` No em-dash (U+2014). Restructure or use a comma or semicolon.
- `CR-3` Community voice: warm, inclusive, and professionally clear.
  No jargon chains or first-person framing.
- `CR-4` Parent organization is always "Optica". Never "OSA" or "Optical Society".
- `CR-5` Arabic text must use Arabic punctuation (، ؛ ؟), not Latin equivalents.

## Anti-patterns (never introduce)

- Dark hero sections or full-bleed dark backgrounds on content pages.
- Card-in-card nesting.
- Animated entrance choreography.
- Hardcoded chapter name, email, or social links in JSX.
- Strings in only one locale.
- Inline `style={}` for values expressible as Tailwind or token classes.
- Third accent colors beyond teal and warm gold.
