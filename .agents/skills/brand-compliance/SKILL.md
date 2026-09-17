---
name: brand-compliance
description: >
  Enforces Optica official brand guidelines and chapter identity rules for the
  Optica Egypt Local Section website. Invoke before adding any logo, badge,
  official Optica visual element, or co-branded material.
metadata:
  author: optica-egypt-local-section
  version: "2.0.0"
---

# Optica Brand Compliance

## The single most important rule

**The official Optica logo must never be modified.**
Placing Egyptian visual elements (pyramids, the Eye of Horus, hieroglyphs,
waves) inside or merged with the Optica wordmark or Optica "O" mark is a
direct violation of Optica's logo policy. Optica explicitly prohibits
alteration and distortion of its logos.
Reference: https://www.optica.org/about/newsroom/optica_logos_guidelines/

The correct identity architecture is two separate layers:

```
Layer 1 — IMMUTABLE (global Optica brand)
  Official Optica logo, untouched, sourced from the Chapter Toolkit.

Layer 2 — LOCAL (Egypt visual identity)
  Egyptian wordmark, motifs, gold palette, and wave patterns
  placed ADJACENT to — never merged with — the official Optica mark.
```

The current concept image (optica-egypt-primary with the Eye of Horus
integrated into the OPTICA wordmark) is NON-COMPLIANT and must not be
used as the primary logo on any public-facing page.

---

## Brand hierarchy

```
OPTICA
  Advancing Optics and Photonics Worldwide    ← official Optica tagline (immutable)

  Egypt Local Section
    Connecting Talent. Advancing Photonics.  ← local campaign line (changeable)
```

The official Optica tagline must not be replaced by the local campaign line.
Both must coexist in the footer and About page in this order.

---

## Two-asset-folder rule

All brand assets in `public/assets/brand/` are divided into two folders
that must never be mixed:

```
public/assets/brand/
├── global-optica/          ← official assets from Optica Chapter Toolkit ONLY
│   ├── logos/              ← do not modify any file here
│   ├── brand-guidelines/   ← Optica official PDF
│   └── legal/              ← Optica logo license text
└── egypt/                  ← Egypt local creative assets
    ├── logo/               ← Egypt local wordmark and marks
    ├── patterns/           ← wave and geometric SVGs
    ├── iconography/        ← custom icons
    ├── hero/               ← layered hero images
    ├── social/             ← social media templates
    └── documentation/      ← local brand guidelines
```

Agents must never copy files from `egypt/` into `global-optica/` or vice versa.
Any image that combines an official Optica mark with Egypt visual elements
must live in `egypt/` and must not present itself as an official Optica asset.

---

## Official Optica assets

These must come from Optica itself, not be AI-generated or recreated.
Download from the official Chapter Toolkit at:
https://www.optica.org/get_involved/students/chapter_toolkit/

Required files (store in `public/assets/brand/global-optica/logos/`):
- `optica-horizontal-black.png` — preferred online logo (white-on-black container)
- `optica-horizontal-white.png` — black-on-white-container variant
- `optica-horizontal-black.svg` — SVG version if provided
- `optica-horizontal-white.svg` — SVG version if provided

Do not use the old OSA logo or any pre-2021 Optica branding.

---

## Egypt local identity assets

The following local assets are permitted and encouraged. They must:
1. Never incorporate the official Optica wordmark or "O" mark.
2. Always be clearly labeled as "Optica Egypt Local Section" assets.
3. Live in `public/assets/brand/egypt/`.

Local logo system (`egypt/logo/`):
- `optica-egypt-wordmark.svg` — Egypt wordmark only (no Optica "O")
- `optica-egypt-wordmark-dark.svg`
- `optica-egypt-wordmark-light.svg`
- `optica-egypt-horizontal.svg` — horizontal lockup with Local Section text
- `optica-egypt-icon.svg` — standalone Egypt icon/motif (pyramid, wave, eye)
- `optica-egypt-favicon.svg`
- `optica-egypt-social-avatar.png`

Egyptian motifs (`egypt/iconography/`):
pyramid, wave (Nile), solar disc, geometric patterns — as supporting graphics
ONLY, never as part of the Optica logo.

---

## Correct co-presentation of both layers

On every page that shows an Optica affiliation, the layout must be:

```
[Official Optica logo]  |  Optica Egypt Local Section wordmark
```

- The official logo and the local wordmark are side-by-side with a thin separator.
- The official Optica logo is on the leading edge (left in LTR, right in RTL).
- Both marks must have equal vertical height and matched visual weight.
- Clear space equal to the Optica "O" height must surround the official logo.

Never superimpose, merge, or overlap the two marks.

---

## Color system: Optica official vs. Egypt local

These are TWO different color sets. Do not confuse them.

### Optica official (immutable — from Optica brand guidelines)
| Color | Hex | Use |
|---|---|---|
| Optica Teal | `#00adef` | On official Optica logo containers only |

### Egypt local design tokens (in `app/globals.css` as CSS variables)
| Token | Value | Use |
|---|---|---|
| `--accent` | `#00adef` | Primary accent (teal, harmonized with Optica teal) |
| `--accent-hover` | `#007bb5` | Hover state |
| `--accent-secondary` | `#d4af37` | Egypt primary gold (highlights, badges) |
| `--gold-bright` | `#f4c95d` | Light gold for glow effects |
| `--gold-dark` | `#8c641e` | Dark gold for borders |
| `--navy` | `#09131f` | Dark background |
| `--charcoal` | `#1a1f26` | Secondary dark background |

The gold palette (`--accent-secondary`, `--gold-bright`, `--gold-dark`) is
a LOCAL Egypt design choice, not an official Optica color specification.
Label it clearly as such in any documentation.

---

## Tagline usage

| Tagline | Owner | Usage |
|---|---|---|
| "Advancing Optics and Photonics Worldwide" | Optica (immutable) | Footer affiliation line, About page |
| "Connecting Talent. Advancing Photonics." | Egypt local (changeable) | Hero headline, event materials |

Never substitute the local tagline for the official Optica tagline.
The footer affiliation block must always read:
  EN: "Optica Egypt Local Section — Part of Optica, Advancing Optics and Photonics Worldwide."
  AR: "القسم المحلي المصري لـ Optica — جزء من Optica، نحو تقدم علم البصريات والفوتونيات عالميًا."

---

## Pre-launch verification

Before the site goes public, verify:
- [ ] Official section status confirmed with Optica (studentchapters@optica.org).
- [ ] No Egypt motifs are merged with or overlaid on the official Optica logo.
- [ ] All files in `global-optica/` are sourced directly from the Chapter Toolkit.
- [ ] Local logo system files in `egypt/logo/` do not incorporate the Optica "O" mark.
- [ ] Footer affiliation line includes the official Optica tagline.
- [ ] Both logo layers (official + local) can be presented side-by-side correctly.
- [ ] Clear space rule is implemented on all official logo placements.
- [ ] Alt text is present on all logo images in both Arabic and English.
- [ ] Social links derive from `siteConfig.social`, not hardcoded strings.
- [ ] `docs/BRAND_ARCHITECTURE.md` is up to date and committed.
