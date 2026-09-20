# Brand Architecture

Optica Egypt Local Section ,  Brand Identity System

This document defines which brand elements are immutable global assets and
which are local Egypt design choices. Every developer, designer, and agent
working on this site must read this document before touching any logo, color,
or visual asset.

---

## The two-layer principle

```
LAYER 1: GLOBAL OPTICA ,  IMMUTABLE
  Everything owned and governed by Optica (the parent organization).
  Source: Official Chapter Toolkit at optica.org.
  Rule: No modification of any kind. No recreation. No approximation.

LAYER 2: EGYPT LOCAL ,  CHANGEABLE
  Everything created specifically for the Optica Egypt Local Section.
  Source: This repository, Egypt brand assets folder.
  Rule: Must never be presented as official Optica corporate material.
       Must never be merged with or overlaid on the official Optica logo.
```

These two layers must remain physically separated in the repository and
visually separated on every page.

---

## What is immutable (Layer 1)

| Element | Value | Source |
|---|---|---|
| Official logo | Optica horizontal logo (black container, white container) | Chapter Toolkit |
| Official name | Optica | Optica brand guidelines |
| Official tagline | Advancing Optics and Photonics Worldwide | Optica brand guidelines |
| Trademark | Optica is a registered trademark | Legal ,  do not alter |
| Logo clear space | Height of the Optica "O" mark on all four sides | Logo usage guidelines |

No agent, developer, or designer may alter any of these. When in doubt,
contact Optica at studentchapters@optica.org.

---

## What is local (Layer 2)

| Element | Description | Location |
|---|---|---|
| Egypt wordmark | "Optica Egypt Local Section" typographic mark | `public/assets/brand/egypt/logo/` |
| Egypt icon | Standalone Egyptian motif (pyramid, wave, solar disc) | `public/assets/brand/egypt/iconography/` |
| Gold palette | `#d4af37`, `#f4c95d`, `#8c641e` ,  Egypt design tokens | `app/globals.css` |
| Wave patterns | Nile-wave SVG system for dividers and backgrounds | `public/assets/brand/egypt/patterns/` |
| Hero imagery | Pyramid/sky/light-beam layered hero system | `public/assets/brand/egypt/hero/` |
| Local campaign tagline | "Connecting Talent. Advancing Photonics." | Changeable each chapter year |
| Egyptian motifs | Pyramid, Eye, Nile wave, solar disc ,  supporting graphics only | `public/assets/brand/egypt/iconography/` |
| Typography (display) | Montserrat or Poppins for headings ,  LOCAL choice, not Optica spec | `app/globals.css` |
| Typography (body) | Inter ,  LOCAL choice | `app/globals.css` |

---

## The non-compliant logo problem

The current primary logo concept (shown in design mockups) integrates the
Eye of Horus / pyramid motif directly INTO the Optica wordmark, replacing
or augmenting the official Optica letterforms. This constitutes modification
of the official Optica logo and is prohibited under Optica's logo usage policy.

Reference: https://www.optica.org/about/newsroom/optica_logos_guidelines/

### What the logo CANNOT be
```
[OPTICA wordmark with Eye of Horus embedded] EGYPT
```
This merges Layers 1 and 2 into a single mark, which implies modification
of the official Optica corporate identity.

### What the logo MUST be
```
[Official Optica logo ,  untouched]  |  Optica Egypt Local Section
                                        [Egypt motif / wordmark ,  separate]
```
The official logo and the Egypt local mark sit side-by-side, separated by
a thin vertical rule. Neither mark touches the other.

---

## Repository asset separation

```
public/assets/brand/
├── global-optica/                  ← LAYER 1: official Optica assets only
│   ├── logos/
│   │   ├── optica-horizontal-black.png    ← from Chapter Toolkit
│   │   ├── optica-horizontal-white.png    ← from Chapter Toolkit
│   │   ├── optica-horizontal-black.svg
│   │   └── optica-horizontal-white.svg
│   ├── brand-guidelines/
│   │   └── optica-logo-usage.pdf          ← official PDF from optica.org
│   └── legal/
│       └── optica-logo-license.txt        ← usage terms
│
└── egypt/                          ← LAYER 2: Egypt local assets
    ├── logo/
    │   ├── optica-egypt-wordmark.svg
    │   ├── optica-egypt-wordmark-dark.svg
    │   ├── optica-egypt-wordmark-light.svg
    │   ├── optica-egypt-horizontal.svg
    │   ├── optica-egypt-icon.svg
    │   ├── optica-egypt-favicon.svg
    │   └── optica-egypt-social-avatar.png
    ├── patterns/
    │   ├── wave-gold.svg
    │   ├── wave-gold-subtle.svg
    │   ├── wave-white.svg
    │   └── wave-footer.svg
    ├── iconography/
    │   ├── pyramid-line.svg
    │   ├── nile-wave.svg
    │   ├── solar-disc.svg
    │   └── egyptian-geometric.svg
    ├── hero/
    │   ├── desktop/
    │   ├── tablet/
    │   ├── mobile/
    │   └── layers/
    │       ├── bg-pyramids.webp
    │       ├── bg-sky-dark.webp
    │       ├── bg-sky-light.webp
    │       ├── light-beam.svg
    │       ├── wave-overlay.svg
    │       └── foreground-glow.webp
    ├── social/
    │   ├── instagram/
    │   ├── linkedin/
    │   └── profile/
    └── documentation/
        ├── BRAND_GUIDELINES.md         ← this system documented for designers
        └── ASSET_LICENSES.md
```

---

## Hero image system

The hero must be built as a layered composition, not a single flattened image.
Combining SVG layers with CSS allows responsive adaptation without re-exporting.

```
Layer order (bottom to top):
1. bg-sky-dark.webp or bg-sky-light.webp      ← background gradient sky
2. bg-pyramids.webp                           ← Egypt landscape silhouette
3. wave-overlay.svg                           ← animated gold light wave
4. light-beam.svg                             ← photonics light ray element
5. foreground-glow.webp                       ← subtle teal/gold glow
6. Typography + logo lockup (CSS/HTML)        ← rendered by the browser
```

Responsive hero sizes required (all in WebP):
- Desktop: 2560x1200, 1920x900, 1440x700
- Tablet: 1024x600
- Mobile: 768x500, 375x600 (@2x)

---

## Color system: two distinct palettes

### Optica official (immutable ,  use only for official logo containers)
| Color | Hex | Notes |
|---|---|---|
| Optica Teal | `#00adef` | From Optica brand materials |

### Egypt local design tokens (CSS variables in `app/globals.css`)
| Token | Hex | Role |
|---|---|---|
| `--accent` | `#00adef` | Harmonized with Optica teal for UI elements |
| `--accent-hover` | `#007bb5` | Teal hover state |
| `--accent-secondary` | `#d4af37` | Egypt primary gold |
| `--gold-bright` | `#f4c95d` | Light gold for glow and highlights |
| `--gold-dark` | `#8c641e` | Dark gold for borders |
| `--navy` | `#09131f` | Dark page background |
| `--charcoal` | `#1a1f26` | Secondary dark surface |
| `--foreground` | `#1e293b` | Body text (light mode) |
| `--background` | `#ffffff` | Page background (light mode) |

The gold palette is an Egypt local creative choice.
It is NOT documented as an official Optica color specification.

---

## Typography: local choices, not Optica specifications

Optica does not publicly mandate typefaces for local sections.
The following are Egypt local design-system decisions:

| Role | Font | Notes |
|---|---|---|
| Display / headings | Montserrat | Google Fonts ,  local choice |
| Body / UI | Inter | Google Fonts ,  local choice |

Never label these as "Optica official fonts."

---

## Footer affiliation statement (required on every page)

> Optica Egypt Local Section ,  Part of Optica, Advancing Optics and Photonics Worldwide.

The phrase "Advancing Optics and Photonics Worldwide" is Optica's official tagline
and must not be omitted or altered.

---

## Pre-launch checklist (brand compliance)

- [ ] Official section status confirmed with Optica (studentchapters@optica.org).
- [ ] Official Optica logos downloaded from the Chapter Toolkit and stored in
      `public/assets/brand/global-optica/logos/` without modification.
- [ ] No Egypt motifs are merged with the official Optica logo.
- [ ] Local logo system files do not incorporate the Optica "O" mark.
- [ ] The current non-compliant logo concept is NOT used on any public page.
- [ ] Side-by-side lockup (official + local) is implemented correctly in navigation.
- [ ] Footer affiliation statement includes the official Optica tagline.
- [ ] Clear space rule is respected on all official logo placements.
- [ ] All local assets are clearly labeled as Egypt local, not global Optica.
- [ ] `BRAND_ARCHITECTURE.md` is committed and linked from `README.md`.
