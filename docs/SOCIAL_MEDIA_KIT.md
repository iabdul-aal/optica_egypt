# Optica Egypt Local Section: Social Media and Domain Launch Kit

**Official Website:** https://optica-egypt.com/
**Official Contact Email:** info@optica-egypt.com
**Charter Approval Date:** 10 September 2026
**Parent Body:** Optica (formerly OSA, Washington, D.C.)

---

## 1. Handle Standardization Strategy

The section standardizes around `optica.egypt.section` wherever platforms support periods, paired with `optica-egypt-section` on LinkedIn and platform-valid variants where periods or character limits apply:

| Platform | Activation Status | Canonical Handle | Full URL / Destination | Separator and Length Rule |
|---|---|---|---|---|
| LinkedIn | Live (`data/site_config.json`) | `optica-egypt-section` | `https://www.linkedin.com/company/optica-egypt-section` | LinkedIn company URLs permit hyphens and disallow periods |
| Facebook | Live (`data/site_config.json`) | `optica.egypt.section` | `https://www.facebook.com/optica.egypt.section` | Facebook Page usernames permit alphanumeric characters and periods (5 to 50 chars) |
| Instagram | Preparing | `@optica.egypt.section` | `https://www.instagram.com/optica.egypt.section/` | Periods and underscores allowed; matches `optica.egypt.section` |
| YouTube | Preparing | `@optica.egypt.section` | `https://www.youtube.com/@optica.egypt.section` | Periods and hyphens allowed (3 to 30 chars); matches `optica.egypt.section` |
| TikTok | Preparing | `@optica.egypt.section` | `https://www.tiktok.com/@optica.egypt.section` | Periods and underscores allowed (up to 24 chars); matches `optica.egypt.section` |
| Telegram | Preparing | `@optica_egypt_section` | `https://t.me/optica_egypt_section` | Telegram usernames disallow periods and hyphens; uses underscores (5 to 32 chars) |
| X (Twitter) | Preparing | `@optica_egypt_ls` | `https://x.com/optica_egypt_ls` | X forbids periods and hyphens and caps usernames at 15 chars (`optica_egypt_ls` = 15 chars, "Optica Egypt Local Section") |
| WhatsApp | Preparing | `Optica Egypt Channel` | `https://whatsapp.com/channel/<invite-code>` | WhatsApp Channels assign a system-generated invite code; account username `@optica.egypt.section` |

> **Governance Notice:** Maintain explicit institutional separation between **Optica** (global society in Washington, D.C.) and **Optica Egypt Local Section** (chartered local volunteer section) in every bio, graphic, and announcement.

---

## 2. Audience Strategy Across Egypt

To reach Egyptian engineering, physics, and STEM audiences across Cairo, Giza, Alexandria, Delta governorates, Upper Egypt, and Sinai in strict English institutional communication:

1. **Facebook (`optica.egypt.section`):** Nationwide public bulletin board for Egyptian university campuses, engineering groups, and event announcements.
2. **LinkedIn (`optica-egypt-section`):** Primary network for faculty advisors, industry partners, research and development engineers, telecom/photonics startups, and international Optica liaison updates.
3. **WhatsApp Channel and Community (`Optica Egypt Channel`):** High-reliability alert feed for Egyptian undergraduates covering seminar reminders, registration deadlines, and location updates.
4. **Instagram (`@optica.egypt.section`):** Visual campus outreach covering event schedules, chapter highlights, speaker cards, and short lab explainers.
5. **YouTube (`@optica.egypt.section`):** Permanent archive for technical seminars, Python Photonic Design Automation tutorials (`gdsfactory`, Meep FDTD), and student colloquia.
6. **Telegram Channel (`@optica_egypt_section`):** High-signal feed for fellowship deadlines, open-source photonics study packets, dataset links, and technical workshop files.
7. **TikTok (`@optica.egypt.section`):** Short-form optics explainers reaching high school and early undergraduate audiences nationwide.
8. **X / Twitter (`@optica_egypt_ls`):** Real-time scientific conference coverage, international society coordination, and media dispatches within X's 15-character handle limit.

---

## 3. Verified Brand Assets for Profile Setup

Use only verified visual assets stored under `public/branding/`:

| Asset Slot | Verified File Path | Recommended Usage |
|---|---|---|
| Dark Square Profile Avatar | `public/branding/IconWhiteOnBlack.png` (or `.svg`) | LinkedIn logo, X avatar, Instagram profile image, YouTube icon, Telegram/WhatsApp avatar, TikTok avatar |
| Light Square Profile Avatar | `public/branding/IconOnWhite.png` (or `.svg`) | White-background directories and printed QR posters |
| Full Lockup Cards and Covers | `public/branding/FullOnBlack.png` (1080x1080), `public/branding/FullOnWhite.png` | Social sharing previews, page banners, pinned launch graphics |
| Overlay Wordmarks | `public/branding/FullOnTransparent.png` (or `.svg`), `public/branding/optica-egypt-logo-dark.svg`, `public/branding/optica-egypt-logo-light.svg` | Slide watermarks, video end-screens, partner graphics |
| Core Palette | `#090C0D` (Canvas Dark), `#D7AE5B` (Optica Gold), `#F8F9FA` (Light Ink / Canvas) | Canva/Figma templates and social thumbnails |
| Brand Fonts | `Montserrat` (headings) and `Inter` (body text) | All social cards and video lower-thirds |

---

## 4. Official English Bio Templates

Every bio uses strict English third-person institutional voice, links to `https://optica-egypt.com/`, and lists `info@optica-egypt.com` without ampersands (`&`) or em-dashes.

### Short Bio (Instagram, X, TikTok: under 160 characters)
> Official Optica Egypt Local Section (chartered 10 Sept 2026). Connecting Egyptian photonics students, researchers, and engineers. Info: optica-egypt.com | info@optica-egypt.com

### Standard About (LinkedIn, Facebook, YouTube, Telegram, WhatsApp)
> The Optica Egypt Local Section is a chartered volunteer section of Optica serving students, university chapters, faculty advisors, researchers, and photonics engineers across Egypt (charter approved 10 September 2026). Through workshops, open-source photonic design automation training, and regional academic coordination, the section connects local optics talent with the global photonics community.
> Website: https://optica-egypt.com/
> Contact: info@optica-egypt.com

---

## 5. First-Post Template (Website Launch and Recruitment)

### Launch Post (LinkedIn, Facebook, Telegram, WhatsApp, X)
> The Optica Egypt Local Section (chartered 10 September 2026) has published its official digital platform at https://optica-egypt.com/.
>
> Explore governing officer rosters, student chapter coordination pathways, Open-Source Photonic Design Automation (PDA) tracks, and volunteer recruitment at https://optica-egypt.com/join.
>
> Academic, student chapter, media, and industry inquiries can reach the section coordinator desk at info@optica-egypt.com.

---

## 6. Domain Email Setup Checklist (`info@optica-egypt.com`)

Before announcing external social handles broadly, section administrators should confirm DNS and inbox routing for `optica-egypt.com`:

1. Configure custom domain mail hosting (Google Workspace, Microsoft 365, Zoho Workplace, or Cloudflare Email Routing plus SMTP relay) to deliver `info@optica-egypt.com` to active section officer coordinators.
2. Publish valid **MX** records at the `optica-egypt.com` DNS registrar.
3. Publish **SPF** (`TXT` record), **DKIM** (`TXT`/`CNAME` selector keys), and **DMARC** (`_dmarc.optica-egypt.com`) records so confirmation receipts and partner replies do not land in spam folders.
4. Test both incoming delivery and outbound reply headers with `info@optica-egypt.com`, then add alias routing for university liaison inquiries if needed.
5. Verify SPF/DKIM pass status and update password/2FA backup owners among at least two elected officers.

---

## 7. How to Activate Preparing Channels on the Website

All 8 Egypt social channels are already wired into `data/site_config.json`, `lib/social.ts`, `components/layout/Footer.tsx`, `components/sections/SocialChannelsBand.tsx`, and `app/layout.tsx` (`sameAs` JSON-LD).

Whenever a new channel is officially created:

1. Open `data/site_config.json`.
2. Fill in the handle or full URL for the newly created account:
   - `"instagram": "optica.egypt.section"` (renders `https://www.instagram.com/optica.egypt.section/`)
   - `"youtube": "optica.egypt.section"` (renders `https://www.youtube.com/@optica.egypt.section`)
   - `"tiktok": "optica.egypt.section"` (renders `https://www.tiktok.com/@optica.egypt.section`)
   - `"telegram": "optica_egypt_section"` (renders `https://t.me/optica_egypt_section`)
   - `"twitter": "optica_egypt_ls"` (renders `https://x.com/optica_egypt_ls`)
   - `"whatsapp": "https://whatsapp.com/channel/<your-generated-invite-code>"`
3. Update `public/llms.txt` and `public/llms-full.txt` to list the newly live profile URLs.
4. Run `npm run check && npm run test:unit && npm run build` before deploying to `https://optica-egypt.com/`.

Footer icons, `/join#social-channels`, `/community#social-channels`, and Schema.org `sameAs` metadata automatically switch from `Preparing` to live clickable badges with zero code changes.
