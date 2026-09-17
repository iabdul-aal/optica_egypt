# Anti-Patterns

Things that were tried and reverted, with reasons. Append one line per
discovery. Format: `YYYY-MM-DD: <what was tried> -> <reason reverted>`.

## Established anti-patterns

- Adding a third accent color -> violates design rule DR-C4; only Optica
  teal (`--accent`) and warm gold (`--accent-secondary`) are permitted.
- Using `rounded-2xl` or `rounded-3xl` on content cards -> violates DR-L1;
  maximum permitted radius is `rounded-lg` (8 px).
- Hardcoding event records in JSX -> breaks the data-driven architecture;
  always use `data/events.json` and `lib/events.ts` loader.
- Using `&` as a written connective in JSX strings or JSON -> forbidden by
  writing style rules; write "and".
- Using the Unicode em-dash (U+2014) in any file -> forbidden; use a comma,
  semicolon, or separate sentence.
- Adding entrance animations -> violates DR-M1; the `prefers-reduced-motion`
  guard in `globals.css` collapses them but they still produce a flash;
  do not introduce them.
- Shipping a page string in only one locale -> violates the bilingual parity
  rule; always add both `en` and `ar` keys before committing.
- Referencing "OSA" or "Optical Society" for the parent organization ->
  the correct name is "Optica"; update any occurrence found.
- Placing RTL override classes (`rtl:` Tailwind prefix) on individual
  elements when the root `dir` attribute already handles layout ->
  creates double-overrides and breaks edge cases on mixed-script pages.
- Hardcoding the chapter name, email, or social links in JSX -> all
  identity fields must come from `data/site_config.json` via `siteConfig`.
- Using `<meta httpEquiv="X-Frame-Options">` in HTML -> browsers log a
  console error; X-Frame-Options must be delivered as an HTTP header only.
- Importing locale message strings directly from JSON in components ->
  breaks next-intl tree-shaking; always use `useTranslations()` hook.
- 2026-09-17: Merging Egyptian motifs (Eye of Horus, pyramids) into the Optica
  wordmark to create a combined logo -> violates Optica logo modification policy;
  the two identity layers must remain physically separate (see ADL-003 and
  docs/BRAND_ARCHITECTURE.md).
- 2026-09-17: Labeling Egypt local color tokens (gold palette, dark navy) as
  official Optica colors -> inaccurate; Optica does not publicly specify accent
  colors for local sections; label all local tokens as Egypt design choices.
- 2026-09-17: Replacing the official Optica tagline with the local campaign line
  in the footer -> the official tagline "Advancing Optics and Photonics Worldwide"
  is immutable and must coexist with any local tagline.
- 2026-09-17: Using a single flattened hero image -> breaks responsive adaptation;
  build the hero as independent CSS-stacked layers (ADL-005).
