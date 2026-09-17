---
name: event-management
description: >
  Structured workflow for adding and maintaining event records in the Optica
  Egypt Local Section website. Invoke when asked to add an event, new workshop,
  update the calendar, or record a seminar or outreach activity.
metadata:
  author: optica-egypt-local-section
  version: "1.0.0"
---

# Event Management

All event data lives in `data/events.json`. This skill governs how events
are added, updated, archived, and surfaced on the site.

## Event data schema

Every event record in `data/events.json` must follow this structure:

```json
{
  "id": "evt-YYYY-MM-slug",
  "type": "seminar | workshop | webinar | outreach | social | conference",
  "status": "upcoming | past",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "durationMinutes": 90,
  "location": {
    "type": "in-person | online | hybrid",
    "venue": "Room / Platform name",
    "address": "Full address or URL"
  },
  "speakers": [
    { "name": "Dr. Full Name", "affiliation": "Institution" }
  ],
  "registrationUrl": "https://... or null",
  "posterImage": "/images/events/evt-YYYY-MM-slug.webp or null",
  "tags": ["photonics", "lasers"],
  "title": {
    "en": "Event Title in English",
    "ar": "عنوان الفعالية بالعربية"
  },
  "description": {
    "en": "One or two sentence description in English.",
    "ar": "وصف الفعالية بجملة أو جملتين باللغة العربية."
  }
}
```

## Workflow for adding a new event

### Step 1: Gather required information

Before opening any file, confirm you have:
- Event title in both English and Arabic
- Date, time, and duration
- Location type and details
- Speaker name(s) and affiliation(s)
- Event type (seminar, workshop, webinar, outreach, social, conference)
- Registration URL (if available)

If any required field is missing, stop and request the information.
Do not add a record with placeholder values.

### Step 2: Generate a unique ID

Format: `evt-YYYY-MM-<slug>` where slug is a 2-4 word hyphenated lowercase
summary of the event title. Example: `evt-2026-10-photonics-seminar`.
Verify the ID does not already exist in `data/events.json`.

### Step 3: Determine status

- If `date` is in the future relative to today: `status: "upcoming"`.
- If `date` is today or in the past: `status: "past"`.

### Step 4: Read the current events file

Open `data/events.json` and read it in full before making any changes.
Understand the ordering (newest first within each status group).

### Step 5: Insert the record

Insert the new event record in the correct position:
- Upcoming events: sorted ascending by date (nearest first).
- Past events: sorted descending by date (most recent first).

### Step 6: Validate the JSON

After editing, verify the file is valid JSON:

```bash
node -e "JSON.parse(require('fs').readFileSync('data/events.json','utf8')); console.log('valid')"
```

### Step 7: Check localization

Verify both `title.en`, `title.ar`, `description.en`, and `description.ar`
are non-empty and use correct language and punctuation.
Arabic descriptions must use Arabic punctuation (، ؛ ؟).

### Step 8: Run verification

```bash
npm run check
```

Fix any TypeScript or lint errors before reporting completion.

## Archiving past events

Events are NOT deleted. When an event date passes, update `status` from
`"upcoming"` to `"past"`. The `lib/events.ts` loader automatically separates
upcoming from past events at build time. The Events page shows all past events
in a collapsible archive section.

## Outreach vs events

- Use `data/events.json` for public-facing scheduled events.
- Use `data/outreach.json` for recorded outreach activities with impact metrics
  (school visits, public lectures, science fair participation).
- An outreach activity that was also a scheduled event should appear in both
  files: use the event ID as a reference field in the outreach record.

## Forbidden patterns

- Adding an event with placeholder title or description in either language.
- Using `status: "upcoming"` for a date that has already passed.
- Duplicating an event record across multiple data files.
- Hardcoding event data in any JSX or TSX component.
- Setting `registrationUrl` to a URL that has not been verified as reachable.
