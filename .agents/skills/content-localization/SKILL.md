---
name: content-localization
description: >
  Enforces bilingual Arabic/English content parity and RTL layout rules for
  the Optica Egypt Local Section website. Invoke for any task involving
  translation, Arabic text, RTL layout, i18n, or locale message files.
metadata:
  author: optica-egypt-local-section
  version: "1.0.0"
---

# Content Localization — Bilingual Parity and RTL Rules

This site serves both Arabic and English audiences with equal quality.
Neither locale is a second-class citizen. Every task that touches
user-facing content must satisfy both language and direction requirements.

## Core principle

**No string may exist in one locale file without an equivalent in the other.**
This is enforced at build time. Any missing key will fail `npm run build`.

## Workflow

### Step 1: Identify all affected strings

Before writing any code, list every user-facing string introduced or modified
by the task. Include: headings, button labels, descriptions, alt text,
placeholder text, meta descriptions, and error messages.

### Step 2: Add keys to both locale files simultaneously

Open `messages/en.json` and `messages/ar.json` together. For every new string:

1. Choose a key following the existing naming convention:
   `PageName.componentOrSection.specificElement`
   Example: `Events.card.registerButton`

2. Add the English value to `messages/en.json`.

3. Add the Arabic value to `messages/ar.json`.
   - Use proper Modern Standard Arabic (MSA) for formal content.
   - Use Egyptian Arabic conventions for informal/community messages where
     appropriate, but maintain professionalism.
   - Arabic punctuation rules: use ، (Arabic comma) not , (Latin comma),
     use ؛ (Arabic semicolon) not ; (Latin semicolon),
     use ؟ (Arabic question mark) not ? (Latin question mark).
   - Do not use the `&` character as a connective in Arabic strings. Write
     the Arabic word "و" or restructure the sentence.

4. Verify no existing key is overridden accidentally.

### Step 3: Wire up in the component

Use `useTranslations('PageName')` at the component level:

```typescript
import { useTranslations } from "next-intl";

export function EventCard() {
  const t = useTranslations("Events");
  return (
    <button className="btn-primary">
      {t("card.registerButton")}
    </button>
  );
}
```

Never hardcode strings. Never import locale JSON directly.

### Step 4: Verify RTL layout

For every layout touched, confirm it renders correctly when `dir="rtl"` is
active. Key RTL checks:

| Element | LTR behavior | RTL expected |
|---|---|---|
| Text alignment | Left-aligned | Right-aligned |
| Flex row direction | Left to right | Right to left (auto via `dir`) |
| Icon + label pairs | Icon left, label right | Icon right, label left |
| Card actions row | Right-flush | Left-flush |
| Navigation | Logo left, links right | Logo right, links left |
| Form fields | Left-to-right input | Right-to-left input |

Do not use `rtl:` Tailwind prefix for layout properties already handled by
the root `dir` attribute. Use `rtl:` only for specific typographic or visual
adjustments that `dir` alone does not cover (e.g., rotating a directional icon).

### Step 5: Run parity check

After editing both locale files, run:

```bash
npm run check
```

If next-intl reports missing keys, fix them before proceeding.

## Arabic typography guidelines

- Font: Noto Naskh Arabic (loaded via `next/font/google` in `app/layout.tsx`).
- Font size: match the Inter scale. Arabic at the same `text-sm`/`text-base`
  classes will render slightly larger due to script metrics; this is intentional.
- Line height: use `leading-relaxed` for Arabic body text.
- Never use `tracking-tight` or negative letter spacing on Arabic text; Arabic
  connected script must not be letter-spaced.
- Numbers in Arabic content: use Western Arabic numerals (0-9) for dates and
  event numbers unless the content explicitly requires Eastern Arabic (٠١٢...).

## Forbidden patterns

- Hardcoded English or Arabic strings in JSX or TSX files.
- Latin punctuation inside Arabic-language strings (use Arabic punctuation).
- `rtl:` overrides for properties already handled by the root `dir` attribute.
- Placeholder Arabic text (e.g., "النص هنا"); always use real, reviewed Arabic.
- Machine-translated Arabic without human review for user-facing copy.
- Asymmetric locale files (a key in one file but not the other).
