---
name: image-to-code
description: >
  Image-first workflow for implementing or redesigning visual sections of the
  Optica Egypt Local Section website. Generate a design reference image first,
  deeply analyze it against site constraints, then implement. Invoke when asked
  to redesign, create a new page section, or improve visual quality.
metadata:
  author: optica-egypt-local-section
  version: "2.0.0"
---

# Image-First Website Design to Code

For any visually important task, follow this mandatory order:

1. Generate a design reference image that matches the site design system.
2. Deeply analyze the generated image before writing any code.
3. Implement the frontend to match the analysis.

Do not begin with freeform coding. The image is the design source of truth.
The code is the translation layer.

## Active baseline configuration (site-specific)

| Parameter | Value | Meaning |
|---|---|---|
| DESIGN_VARIANCE | 2 | Conventional, constrained; matches existing pages |
| VISUAL_DENSITY | 3 | Generous whitespace; community reading comfort |
| ART_DIRECTION | 3 | Warm but restrained; no bold creative statements |
| IMPLEMENTATION_CLARITY | 10 | Every image must be directly buildable |
| SPACING_GENEROSITY | 9 | Breathable; wide margins, comfortable line heights |
| ANALYSIS_PRECISION | 10 | Deep extraction of spacing, type scale, and layout |
| UI_SIMPLICITY_DISCIPLINE | 10 | Aggressively reduce chrome and decorative elements |
| BILINGUAL_READINESS | 10 | Every layout must work in both LTR and RTL directions |

## Site design constraints (must be reflected in every generated image)

### Color
- Background: white (`#ffffff`) or near-white (`#f8fafc`).
- Text: dark neutral (`#1e293b`).
- Primary accent: Optica teal (`#00adef`) used for headings, links, buttons, borders.
- Secondary accent: warm gold (`#f5a623`) for event badges, highlights only.
- No neon, no multi-accent palettes, no broad gradients.
- Generate images in light mode by default.

### Typography
- Latin: Inter or equivalent clean sans-serif.
- Arabic: Noto Naskh Arabic or equivalent high-quality Arabic typeface.
- Hierarchy through size and weight only.
- Body line length: 65-75 characters.
- No negative letter spacing.
- No large display text outside the hero section.

### Layout
- Wide margins, narrow reading measures.
- Ruled sections (thin top border in teal or neutral) over decorative card clusters.
- Cards permitted for events, members, outreach; border-radius 8 px or less.
- No card-in-card nesting.
- Every layout must visually work mirrored (RTL).

### Bilingual design requirements
- When generating a section that contains text, always show both the English
  and Arabic label in the image to confirm the layout handles both scripts.
- Arabic text flows right-to-left. Ensure buttons, icons, and alignment
  mirror correctly in the RTL version.

## Anti-patterns (never produce in a generated image)

- Dark hero sections or full-bleed dark backgrounds.
- Card-in-card nesting.
- Neon accent colors or colors outside the token set.
- Animated entrance implications (motion blur, ghost states).
- More than two button styles.
- Hardcoded English-only labels without Arabic equivalent shown.
- Glassmorphism, heavy drop shadows, or excessive blur.
- Startup or SaaS visual language.

## Mandatory workflow

### Step 1: Generate images (one per section)

- One distinct section = one dedicated image.
- Do not compress multiple sections into one unreadable layout board.
- Always generate fresh images for new tasks.
- Show the section in LTR (English) by default. If the task is bilingual,
  generate a second image showing the RTL (Arabic) variant.

### Step 2: Deep analysis

Before writing any code, inspect the generated image and extract:

- Exact visible text (headline, sub-headline, labels) in both languages.
- Typography scale relationships (heading, body, caption, label).
- Spacing relationships (section padding, internal gaps, line heights).
- Button types and positions.
- Card structure and border treatment.
- Color usage per region.
- Grid or layout structure.
- RTL mirroring implications (icon direction, text alignment, button order).
- Anything still unclear (trigger a re-generate if needed).

### Step 3: Map to design tokens

Every observed detail maps to an existing token in `app/globals.css`:

- Colors: `var(--accent)`, `var(--accent-secondary)`, `var(--foreground)`, etc.
- Radius: `rounded-lg` (8 px) maximum.
- Buttons: `.btn-primary` or `.btn-secondary` only.
- Containers: `.container-page` or `.container-layout`.

### Step 4: Implement

Write the component using TypeScript, React, and Tailwind.
No inline `style={}` for values expressible as Tailwind or token classes.
Use semantic HTML. Use OOCSS utility classes from `globals.css`.
All user-facing strings must use `useTranslations()`, not hardcoded text.

### Step 5: Verify

Run `npm run check`. Then invoke the `design-compliance` skill to self-audit.
Also invoke the `content-localization` skill to confirm bilingual parity.
