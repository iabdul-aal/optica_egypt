# Optica Egypt: Asset Location and Provision Guide

This document maps all static assets used by the website, their exact destination paths in the repository, recommended dimensions, and current in-code fallbacks.

---

## 1. 3D Scene Fallback Images (WebP)

These are shown on mobile devices (`< 768px`), for users with `prefers-reduced-motion: reduce`, or if WebGL encounters an issue.

| Scene | Exact Path | Dimensions | Recommended Content | Current In-Code Fallback |
|---|---|---|---|---|
| **Scene A: Fiber River** (Hero) | `public/assets/photography/scene-fiber-fallback.webp` | 1600 × 1000 px | Glowing optical fiber stream rising from pyramid base in dark navy (#09131F) | Active SVG laser/pyramid river graphic |
| **Scene B: Wave Interference** (Strip) | `public/assets/photography/scene-wave-fallback.webp` | 1600 × 500 px | Two-slit optical wave interference fringes with gold (#D4AF37) crests | Active SVG dual-source fringe pattern |
| **Scene C: Laser Beamsplitter** (Events) | `public/assets/photography/scene-beam-fallback.webp` | 1400 × 600 px | Laser beam splitting through equilateral glass prism into 7 rainbow spectrum rays | Active SVG dispersion prism graphic |

---

## 2. Leadership Portrait Photos

When officers provide their photos, place them at the exact paths below.
- **Aspect ratio:** 4:5 (recommended 800 × 1000 px)
- **Format:** PNG
- **Current in-code fallback:** Golden monogram initials on dark navy background with concentric optical rings.

| Officer | Role | Destination Path |
|---|---|---|
| Abdulaziz Albadawi | President | `public/people/leadership/abdulaziz-albadawi.png` |
| Khaled Ramadan | Vice President | `public/people/leadership/khaled-ramadan.png` |
| Mohamed Nader | Secretary | `public/people/leadership/mohammed-elsherbiny.png` |
| Arwa Elsherbiny | Treasurer | `public/people/leadership/arwa-elsherbiny.png` |
| Mariam Awd | Growth Officer | `public/people/leadership/mariam-awd.png` |
| Ahmed Magdy | Logistics Officer | `public/people/leadership/ahmed-magdy.png` |
| Mohammed Khedr | Outreach Officer | `public/people/leadership/mohammed-khedr.png` |
| Jannah Ahmed | Branding Officer | `public/people/leadership/jannah-ahmed.png` |
| Yahia Ghadiry | Activities Officer | `public/people/leadership/yahia-ghadiry.png` |
| Omar Ayoub | QA Officer | `public/people/leadership/omar-ayoub.png` |
| Abdelrhman Hassan | Volunteers Officer | `public/people/leadership/abdelrhman-hassan.png` |
| Islam Abduaal | Webmaster | `public/people/leadership/islam-abduaal.png` |
| Abdlrhman Hamza | Member | `public/people/leadership/abdlrhman-hamza.png` |
| Prof. Diaa Khalil | Senior Faculty Advisor | `public/people/leadership/diaa-khalil.png` |
| Prof. Yasser Sabry | Senior Faculty Advisor | `public/people/leadership/yasser-sabry.png` |
| Assoc. Prof. Salem Hegazy | Senior Faculty Advisor | `public/people/leadership/salem-hegazy.png` |

---

## 3. Brand and Social Sharing (OpenGraph)

| Asset | Exact Path | Dimensions | Purpose |
|---|---|---|---|
| **Default OG Card** | `public/og/og-default.jpg` | 1200 × 630 px | Facebook, LinkedIn, Twitter, WhatsApp rich previews |
| **Events OG Card** | `public/og/og-events.jpg` | 1200 × 630 px | Preview card for shared event links |
| **Leadership OG Card** | `public/og/og-leadership.jpg` | 1200 × 630 px | Preview card for the leadership team |

---

## 4. Site Icons and Favicon Package

| Asset | Exact Path | Dimensions |
|---|---|---|
| Favicon ICO | `public/favicon.ico` | 32 × 32 px |
| App Icon | `public/icon.png` | 512 × 512 px |
| Apple Touch Icon | `public/apple-icon.png` | 180 × 180 px |

---

## 5. Photography and Field Assets (For future gallery / events)

| Asset Category | Destination Folder | Purpose |
|---|---|---|
| Lab Photography | `public/assets/photography/lab/` | University labs, optical benches, laser setups |
| Community Events | `public/assets/photography/community/` | Meetups, gatherings, group photos |
| Outreach Roadshows | `public/assets/photography/events/` | School visits, university workshops |