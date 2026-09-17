# Content Governance

Rules for all user-facing text on the Optica Egypt Local Section website.
Read this file before editing any static copy, page description, locale
message file, or data-file string field.

---

## Voice and Person

Use **third person** throughout all descriptive site text. Write
"The chapter organizes seminars..." rather than "We organize seminars..."
or "Our chapter organizes seminars...".

Exceptions:
- Call-to-action button labels use imperative voice: "Join Us", "Register",
  "Download Resources", "Contact the Chapter".
- The Join Us page may use second-person invitation language in the
  introductory paragraph only: "Become part of the Optica Egypt community."

Do not use first-person plural ("we", "our", "us") in descriptive or
explanatory text outside the explicitly permitted exceptions.

---

## Bilingual requirements

Every user-facing string must exist in both `messages/en.json` and
`messages/ar.json`. Strings must convey equivalent meaning; Arabic text
is not a direct word-for-word translation but a natural, readable rendering
of the same concept for an Arabic-speaking audience.

For Arabic content:
- Use Modern Standard Arabic (MSA) for formal content.
- Use accessible, clear language; avoid overly formal or archaic constructions.
- Use proper Arabic punctuation: ، (comma) ؛ (semicolon) ؟ (question mark).
- Numbers in Arabic strings: use Western Arabic numerals (0-9) for counts,
  dates, and statistics in body text unless the surrounding context is fully
  in Eastern Arabic numerals.

---

## Paragraph length

| Context | Target word count | Hard limit |
|---|---|---|
| Page hero description | 20-35 words, 1 sentence | 40 words |
| About page narrative paragraphs | 30-55 words each | 65 words |
| Event description | 25-45 words | 55 words |
| Outreach activity description | 20-40 words | 50 words |
| Section subtitle or secondary text | 12-25 words, 1 sentence | 30 words |
| Member bio (optional) | 20-40 words | 50 words |
| Resource description | 15-30 words | 35 words |
| Meta description (SEO) | 120-155 characters | 160 characters |

---

## Anti-repetition

1. No paragraph may use the same content word (noun, verb, or adjective)
   more than twice, unless it is a proper noun or an established technical
   compound (e.g., "photonics", "optics", "laser").

2. Across all page hero descriptions, any given content word may appear in
   at most three of the total pages.

3. Rotate synonyms proactively:
   - "organize" / "host" / "coordinate" / "run"
   - "community" / "chapter" / "network" / "group"
   - "seminar" / "talk" / "lecture" / "session"
   - "student" / "researcher" / "member" / "participant"
   - "outreach" / "engagement" / "education" / "public science"

---

## Page header structure

Every content page must follow this anatomy:

```
<p>  eyebrow   — section label in small muted text (e.g., "Events")
<h1> heading   — noun-phrase title (e.g., "Events and workshops")
<p>  descriptor — 1-sentence explanation, 20-35 words
```

Rules:
- All headings are noun phrases (no leading verbs).
- All descriptors are declarative sentences (subject-verb-object or passive).
- The eyebrow label must match the navigation label for that page.
- Both heading and descriptor must exist in both locale files.

---

## Label vocabulary

Use these canonical labels consistently across all pages and components:

| Concept | English label | Arabic label | Avoid |
|---|---|---|---|
| Navigation: home | Home | الرئيسية | Homepage, Main |
| Navigation: about | About | عن القسم | About Us |
| Navigation: events | Events | الفعاليات | Calendar, Activities |
| Navigation: leadership | Leadership | القيادة | Team, Officers, Board |
| Navigation: outreach | Outreach | التوعية | Community, Engagement |
| Navigation: resources | Resources | الموارد | Links, Materials |
| Navigation: join | Join Us | انضم إلينا | Register, Sign Up |
| Event type: seminar | Seminar | ندوة | Talk, Lecture (informal) |
| Event type: workshop | Workshop | ورشة عمل | Training |
| Event type: webinar | Webinar | ندوة إلكترونية | Online Talk |
| Parent org | Optica | Optica | OSA, Optical Society |

---

## Empty-state text

Empty states use a single sentence following this pattern:

> "[Items] will appear here as [condition]."

Example: "Upcoming events will appear here as they are scheduled."
Arabic: "ستظهر الفعاليات القادمة هنا فور إضافتها."

---

## Forbidden patterns

These rules apply to all text in all files (JSON, TSX, markdown, messages):

- The `&` character is forbidden as a written connective. Always write "and".
- The em-dash character (U+2014) is forbidden. Use a comma, semicolon, or
  a separate sentence.
- No first-person plural in descriptive text (see Voice section above).
- No marketing language: "cutting-edge", "world-class", "revolutionary",
  "leading", "top-tier", "state-of-the-art" applied to the chapter itself.
- No colloquialisms or overly casual language in formal section copy.
- No placeholder text of any kind ("Lorem ipsum", "Coming soon", "TBD")
  in committed files. Use the empty-state pattern instead.
- No hardcoded English or Arabic strings in JSX. Use `useTranslations()`.
- No Latin punctuation inside Arabic-language strings.
- "OSA", "Optical Society", or any pre-2021 Optica name for the parent org.
