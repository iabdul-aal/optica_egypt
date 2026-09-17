# Optica Egypt — Website Asset Generation Guide

> **Your two source references — always have these open:**
>
> | | File | Already placed at |
> |---|---|---|
> | **LOGO** | `optica-egypt-logo.png` | `public/assets/brand/egypt/logo/` |
> | **BANNER** | `optica-egypt-banner.png` | `public/assets/brand/egypt/logo/` |

---

## How to use this guide

- Each **Session** = one tool, one browser tab, images attached **once at the start**
- Run prompts in the **same chat** — no re-attaching between prompts
- Every prompt has: the prompt text, the download filename, and the **exact folder** to drop the file into
- The only two things you ever do manually: **Squoosh** (photos → WebP) and **Vectorizer.ai** (PNG logos/icons → SVG)
- Hit your free limit on any tool? Log out, create a new free account, continue

---

## Free tools

| Tool | URL | Free limit workaround |
|---|---|---|
| ChatGPT | chat.openai.com | New free account when limit hit |
| Ideogram | ideogram.ai | New free account when limit hit |
| Vectorizer.ai | vectorizer.ai | 2 free per account — new account each time |
| Squoosh | squoosh.app | Unlimited, runs in browser, no account |
| Favicon generator | realfavicongenerator.net | Unlimited, no account |

---
---

## Session 1 — Logo Variants

**Tool:** ChatGPT — ideogram.ai as backup
**Start:** New chat → attach **LOGO + BANNER** → run all prompts in this session in the same chat.

---

### 1.1 — Light background logo

> Using both attached images as style reference, recreate the Optica Egypt logo on a pure white background `#FFFFFF`. Keep every element identical: same proportions, same layout, same Eye of Horus + pyramids icon. Change only: OPTICA text becomes dark navy `#09131F`. EGYPT stays gold `#D4AF37`. Icon stays gold. Laser beam stays gold. No shadows, no gradients on text.

| | |
|---|---|
| **Download as** | `logo-light-raw.png` |
| **Your step** | vectorizer.ai → download SVG |
| **Place at** | `public/assets/brand/egypt/logo/optica-egypt-logo-light.svg` |

---

### 1.2 — Standalone icon mark (no text)

> From the attached logo, isolate the Eye of Horus + pyramids combined mark as a standalone emblem with no text at all. Center it on a dark navy square `#09131F`. Eye and pyramids in gold `#D4AF37`. Add a very subtle teal `#00ADEF` horizontal light line through the center of the eye pupil. Equal padding all sides. Square format.

| | |
|---|---|
| **Download as** | `logo-icon-raw.png` |
| **Your step** | vectorizer.ai → download SVG |
| **Place at** | `public/assets/brand/egypt/logo/optica-egypt-icon.svg` |

---

### 1.3 — Favicon (ultra-simplified, readable at 16px)

> From the attached logo, create a severely simplified favicon. Square 512x512. Only the pyramid above the eye, both reduced to pure bold geometric shapes readable at 16 pixels. Gold `#D4AF37` on dark navy `#09131F` filling the entire square edge to edge. No fine detail, no text, no laser beam. Maximum contrast.

| | |
|---|---|
| **Download as** | `favicon-source.png` |
| **Your step** | realfavicongenerator.net → upload → set background `#09131F` → download zip → extract |
| **Place these** | `public/favicon.ico` `public/icon-192.png` `public/icon-512.png` `public/site.webmanifest` |

---

### 1.4 — Maskable PWA icon

> From the attached logo, create a maskable PWA icon. Square 512x512, entirely filled dark navy `#09131F` edge to edge. Eye of Horus + pyramids mark from the logo centered, sized to fit within the central 70% of the square only. Outer 15% on each side is pure dark navy with no mark elements. Gold mark, no text.

| | |
|---|---|
| **Download as** | `maskable-raw.png` |
| **Your step** | none |
| **Place at** | `public/maskable-512.png` |

---
---

## Session 2 — Hero Images

**Tool:** ChatGPT (or Ideogram if ChatGPT limit hit)
**Start:** New chat → attach **LOGO + BANNER** → run all in same chat.

---

### 2.1 — Desktop hero background (dark)

> Using both attached images as the visual reference, create a cinematic wide hero background at 1920x1080 or wider. Egyptian pyramids and sphinx at night reflecting in the Nile. Dramatic gold atmospheric lighting. A spectrum laser beam splits upward from the largest pyramid into a dark sky. A gold sine wave runs along the foreground matching the wave in the attached banner. Dark navy sky atmosphere `#09131F`. No text, no logos, no watermarks. Purely a background image.

| | |
|---|---|
| **Download as** | `hero-dark-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/brand/egypt/hero/layers/hero-desktop-dark.webp` |

---

### 2.2 — Desktop hero background (light / dawn)

> Same composition as previous but at golden hour dawn. Warm amber sunrise, sky from warm orange at horizon to pale blue above. Nile reflection catching the warm light. Same pyramids and sphinx placement. No beams, no gold wave — just the natural dawn scene. No text, no logos.

| | |
|---|---|
| **Download as** | `hero-light-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/brand/egypt/hero/layers/hero-desktop-light.webp` |

---

### 2.3 — Mobile hero (portrait)

> Same Egyptian pyramids sphinx Nile night scene from the attached references, recomposed for a tall portrait mobile viewport. Single large pyramid fills the upper center. Sphinx lower-left. Gold atmospheric glow. A diagonal spectrum beam in the upper area. Gold wave in the foreground. Dark navy sky. No text, no logos.

| | |
|---|---|
| **Download as** | `hero-mobile-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/brand/egypt/hero/layers/hero-mobile-dark.webp` |

---

### 2.4 — Pyramids base layer (no effects)

> Same Egyptian pyramids sphinx Nile scene, but completely clean. No light beams, no wave overlays, no glow, no spectrum. Just the natural dark night atmosphere with very subtle gold warmth at the horizon only. This is a base layer for CSS compositing. Wide 16:9. No text, no logos.

| | |
|---|---|
| **Download as** | `pyramids-base-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/brand/egypt/hero/layers/layer-pyramids.webp` |

---

### 2.5 — Spectrum beam layer

> Create a standalone spectrum beam layer. A single white beam enters from the upper-right at approximately 45 degrees. It disperses into spectrum color bands: indigo, blue, teal, green, yellow, orange, red. Each band has soft bloom and glow. Very dark near-black background. Wide 16:9 format. No pyramids, no text, just the beam on a near-black background.

| | |
|---|---|
| **Download as** | `spectrum-beam-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/brand/egypt/hero/layers/layer-spectrum-beam.webp` |

---

### 2.6 — Gold wave (for CSS overlay)

> Using the gold wave from the bottom of the attached banner as exact reference, recreate it as a clean standalone image. Single smooth organic flowing gold wave `#D4AF37` on a transparent or pure black background. No pyramids, no text, no other elements. Wide 16:9 or wider. The wave should curve naturally as in the banner.

| | |
|---|---|
| **Download as** | `wave-gold-raw.png` |
| **Your step** | vectorizer.ai → download SVG |
| **Place at** | `public/assets/brand/egypt/patterns/wave-gold.svg` |

---
---

## Session 3 — 3D Scene Static Fallbacks

These are the fallback images shown on mobile instead of the three interactive 3D WebGL scenes.

**Tool:** Ideogram (ideogram.ai) — free, no limit issues
**Start:** New account or existing. Each prompt is a separate generation.
Attach **LOGO** as style reference in each.

---

### 3.1 — Fiber Optic River fallback

> Cinematic visualization of glowing fiber optic cables against a dark navy background `#09131F`. Curved light tubes in gold `#D4AF37` and teal `#00ADEF`, photon particle points of light animating along them. Small pyramid silhouettes visible in the deep background. Same dark navy and gold palette as the attached reference. Wide 16:9. No text.

| | |
|---|---|
| **Download as** | `fiber-fallback-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/photography/scenes/scene-fiber-fallback.webp` |

---

### 3.2 — Wave Interference fallback

> Scientific visualization of wave interference from two point sources. Circular overlapping waves spreading outward. Bright gold `#D4AF37` at constructive interference peaks, dark navy `#09131F` at destructive nodes. Clean, mathematical, beautiful. Wide 16:9. No text.

| | |
|---|---|
| **Download as** | `wave-fallback-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/photography/scenes/scene-wave-fallback.webp` |

---

### 3.3 — Laser Beamsplitter fallback

> A coherent gold laser beam entering a glass prism from the left. The beam splits into a full rainbow spectrum exiting the prism. Soft bloom and glow on every beam. Dark navy background `#09131F`. Cinematic, photorealistic. Wide 16:9. No text.

| | |
|---|---|
| **Download as** | `beam-fallback-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/photography/scenes/scene-beam-fallback.webp` |

---
---

## Session 4 — Photography

**Tool:** Ideogram (ideogram.ai) — free
Each prompt is a separate generation. Attach **BANNER** as style reference.

---

### Lab photos (generate 3, vary angle each time)

> Egyptian university photonics research laboratory. Optical workbench with laser equipment, fiber optic cables, beam splitters, and lenses. Ambient lighting in warm gold and deep navy matching the attached reference. No people. Photorealistic. Wide 16:9.

| | |
|---|---|
| **Download each as** | `lab-01-raw.png` `lab-02-raw.png` `lab-03-raw.png` |
| **Your step** | Squoosh → WebP → quality 85 for each |
| **Place at** | `public/assets/photography/lab/lab-01.webp` etc. |

---

### Community photos (generate 3, vary composition)

> Diverse young Egyptian university students in a modern academic setting. Warm gold-tinted professional lighting matching the attached reference. Collaborative discussion around a table or workstation. Photorealistic. Wide 16:9.

| | |
|---|---|
| **Download each as** | `community-01-raw.png` etc. |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/photography/community/community-01.webp` etc. |

---

### Egypt landscape photos (generate 3, vary angle)

> Cinematic night view of the Egyptian pyramids of Giza and sphinx. Same dark navy sky and gold atmospheric glow as the attached reference. Nile reflection in the foreground. Photorealistic. Wide 16:9.

| | |
|---|---|
| **Download each as** | `egypt-01-raw.png` etc. |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/photography/egypt/egypt-01.webp` etc. |

---

### Event photos (generate 3, vary composition)

> Professional scientific seminar in a modern Egyptian university auditorium. Presenter at podium, attentive audience. Warm gold-toned professional lighting matching the attached reference. Photorealistic. Wide 16:9.

| | |
|---|---|
| **Download each as** | `event-01-raw.png` etc. |
| **Your step** | Squoosh → WebP → quality 85 |
| **Place at** | `public/assets/photography/events/event-01.webp` etc. |

---
---

## Session 5 — OG Social Preview Images

**Tool:** ChatGPT — new chat, attach **LOGO + BANNER**, run all 5 in order.
These appear when the site is shared on WhatsApp, LinkedIn, Twitter etc.

---

### 5.1 — Default OG

> Using both attached images, create a 1200x630 Open Graph preview image. Pyramid, sphinx, Nile, spectrum beam background matching the attached banner. Left side: Optica Egypt logo matching the attached logo. Right side: "Optica Egypt Local Section" in white, below it "Connecting Talent. Advancing Photonics." in gold italic. Gold wave along the bottom.

**Download as** `og-default-raw.png` → **Place at** `public/og/og-default.jpg`

### 5.2 — Events page OG
> Same layout. Replace tagline: "Events and Workshops" in teal.

**Download as** `og-events-raw.png` → **Place at** `public/og/og-events.jpg`

### 5.3 — Leadership page OG
> Same layout. Text: "Meet Our Leadership Team".

**Download as** `og-leadership-raw.png` → **Place at** `public/og/og-leadership.jpg`

### 5.4 — Community page OG
> Same layout. Text: "Join Egypt's Photonics Community".

**Download as** `og-community-raw.png` → **Place at** `public/og/og-community.jpg`

### 5.5 — Join page OG
> Same layout, warmer dawn lighting on the pyramids. Text: "Become Part of Optica Egypt".

**Download as** `og-join-raw.png` → **Place at** `public/og/og-join.jpg`

> Send all 5 raw files to agent — I convert to JPG and place them.

---
---

## Session 6 — Community Icons

**Tool:** ChatGPT — new chat, attach **LOGO + BANNER**, run all 12 in order.

**Add to every prompt:** *Flat line icon, 24×24 grid, 1.5px stroke, rounded caps, gold `#D4AF37` matching the attached logo, no fill, transparent background, square format.*

| Prompt | Download as | Place at |
|---|---|---|
| Horizontal beam with convex lens, light rays diverging both sides | `icon-photonics-raw.png` | `public/assets/brand/egypt/icons/icon-photonics.svg` |
| Small circle source left, three parallel lines as coherent beam | `icon-laser-raw.png` | `public/assets/brand/egypt/icons/icon-laser.svg` |
| Line curves 90° like optical fiber, starburst at output end | `icon-fiber-raw.png` | `public/assets/brand/egypt/icons/icon-fiber.svg` |
| Microscope side view, minimal geometric | `icon-research-raw.png` | `public/assets/brand/egypt/icons/icon-research.svg` |
| Two overlapping circles (Venn), diamond node in overlap | `icon-collaboration-raw.png` | `public/assets/brand/egypt/icons/icon-collaboration.svg` |
| Graduation mortarboard cap, front view | `icon-student-raw.png` | `public/assets/brand/egypt/icons/icon-student.svg` |
| Building outline with small gear overlaid | `icon-industry-raw.png` | `public/assets/brand/egypt/icons/icon-industry.svg` |
| Rocket launching 45° upward-right | `icon-startup-raw.png` | `public/assets/brand/egypt/icons/icon-startup.svg` |
| Open book with four-point star above it | `icon-outreach-raw.png` | `public/assets/brand/egypt/icons/icon-outreach.svg` |
| Three circles in triangle, connected by lines | `icon-networking-raw.png` | `public/assets/brand/egypt/icons/icon-networking.svg` |
| Two opposite arrows, small circle between | `icon-knowledge-raw.png` | `public/assets/brand/egypt/icons/icon-knowledge.svg` |
| Ascending staircase 3 steps, upward arrow at top | `icon-career-raw.png` | `public/assets/brand/egypt/icons/icon-career.svg` |

> **Your step for all 12:** vectorizer.ai (new account every 2 icons) → download SVG → rename (remove `-raw.png`, add `.svg`) → send all to agent.

---
---

## Complete website asset map

```
public/
├── favicon.ico
├── icon-192.png
├── icon-512.png
├── maskable-512.png
├── site.webmanifest
│
├── og/
│   ├── og-default.jpg
│   ├── og-events.jpg
│   ├── og-leadership.jpg
│   ├── og-community.jpg
│   └── og-join.jpg
│
├── people/
│   └── leadership/
│       └── [firstname-lastname].jpg   ← one per officer, agent places these
│
└── assets/
    └── brand/
        └── egypt/
            ├── logo/
            │   ├── optica-egypt-logo.png          ← SOURCE (already placed)
            │   ├── optica-egypt-banner.png        ← SOURCE (already placed)
            │   ├── optica-egypt-logo-light.svg    ← Session 1.1
            │   ├── optica-egypt-icon.svg          ← Session 1.2
            │   └── optica-egypt-logo-arabic.svg   ← optional
            │
            ├── hero/
            │   └── layers/
            │       ├── hero-desktop-dark.webp     ← Session 2.1
            │       ├── hero-desktop-light.webp    ← Session 2.2
            │       ├── hero-mobile-dark.webp      ← Session 2.3
            │       ├── layer-pyramids.webp        ← Session 2.4
            │       └── layer-spectrum-beam.webp   ← Session 2.5
            │
            ├── patterns/
            │   └── wave-gold.svg                 ← Session 2.6
            │
            └── icons/
                ├── icon-photonics.svg
                ├── icon-laser.svg
                ├── icon-fiber.svg
                ├── icon-research.svg
                ├── icon-collaboration.svg
                ├── icon-student.svg
                ├── icon-industry.svg
                ├── icon-startup.svg
                ├── icon-outreach.svg
                ├── icon-networking.svg
                ├── icon-knowledge.svg
                └── icon-career.svg               ← Session 6

    └── photography/
        ├── lab/          lab-01.webp  lab-02.webp  lab-03.webp
        ├── community/    community-01.webp  ...  community-03.webp
        ├── egypt/        egypt-01.webp  egypt-02.webp  egypt-03.webp
        ├── events/       event-01.webp  event-02.webp  event-03.webp
        └── scenes/
            ├── scene-fiber-fallback.webp          ← Session 3.1
            ├── scene-wave-fallback.webp           ← Session 3.2
            └── scene-beam-fallback.webp           ← Session 3.3
```

---

## Your only two manual steps — ever

1. **Squoosh** (squoosh.app) — any PNG from Ideogram or ChatGPT that is a photo: open → WebP → 85% → save with the name shown
2. **Vectorizer.ai** — any logo or icon PNG: upload → SVG → rename → send to agent

**Everything else the agent handles.** Send any downloaded file here and I place it, resize it, and update data files.
