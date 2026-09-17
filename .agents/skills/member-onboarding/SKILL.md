---
name: member-onboarding
description: >
  Auto-process a received member photo. Parse the filename, edit the portrait
  to brand spec, save to the correct path, and update members.json.
  Triggered when a photo file named FirstName_LastName_Position_Email_LinkedIn.png
  is forwarded by the user. No manual steps required from the user.
metadata:
  author: optica-egypt-local-section
  version: "1.0.0"
---

# Member Onboarding Skill

Triggered when: user forwards a photo file named in the schema.
Output: edited portrait in public/assets/people/leadership/ + members.json updated.
User interaction required: zero.

## Step 1 — Parse Filename

Split filename (without extension) on underscore character.
Fields are positional:
  [0] = First name
  [1] = Last name
  [2] = Position (one of the 8 allowed role slugs)
  [3] = Email address
  [4] = LinkedIn username (or "none")

Derive:
  id    = [0]-[1] in all lowercase with hyphens. Example: ahmed-hassan
  photo = id + ".jpg"

## Step 2 — Map Position to Bilingual Role

| Position slug     | en                | ar                  | order |
|---|---|---|---|
| President         | President         | الرئيس              | 1 |
| VicePresident     | Vice President    | نائب الرئيس         | 2 |
| Secretary         | Secretary         | الأمين              | 3 |
| Treasurer         | Treasurer         | أمين الصندوق        | 4 |
| EventsDirector    | Events Director   | مدير الفعاليات      | 5 |
| OutreachDirector  | Outreach Director | مدير التوعية        | 6 |
| MediaDirector     | Media Director    | مدير الإعلام        | 7 |
| TechnicalDirector | Technical Director| المدير التقني       | 8 |

## Step 3 — Edit Portrait

Use the generate_image tool. Attach the received photo.
Apply this exact prompt (do not abbreviate it):

Edit the attached portrait photo for a professional scientific organization leadership page.

BACKGROUND: Remove the existing background completely. Replace with a smooth dark navy
background hex #09131F. Apply a very subtle radial gradient behind the subject:
slightly lighter charcoal #1A1F26 directly behind the head and shoulders, fading smoothly
to dark navy #09131F at all four edges.

LIGHTING: Apply this exact cinematic lighting setup:
Primary: warm gold rim light hex #D4AF37 from the upper-right. Creates a soft highlight
along the right side of the face, hair, and shoulder.
Fill: very faint teal light hex #00ADEF on the left side. Barely perceptible, just enough
to prevent the left side going fully dark.
Overall feel: premium, scientific, professional, like a TED speaker headshot.

CROP AND FRAMING: Head and shoulders. Eyes at the upper-third horizontal line.
Centered horizontally. Small space above the head. Portrait 4:5 aspect ratio.

QUALITY: Sharp focus, natural skin tones, no heavy retouching, no filters.

COLOR GRADING: Slightly cool-neutral overall. Gold rim is the only warm element.

OUTPUT: Person on dark navy background. No text. No overlays. No borders.

## Step 4 — Save Photo

Save the edited image to:
  public/assets/people/leadership/[id].jpg
Format: JPEG 85% quality. Dimensions: 800x1000px (4:5).

## Step 5 — Update members.json

Read current data/members.json. Append a new entry:

{
  "id": "[id]",
  "name": { "en": "[First] [Last]", "ar": "[ask user for Arabic name or leave empty string]" },
  "role": { "en": "[en role]", "ar": "[ar role]" },
  "term": "[current academic year, e.g. 2024-2025]",
  "institution": { "en": "", "ar": "" },
  "email": "[email]",
  "linkedin": "[linkedin or empty string if none]",
  "photo": "[id].jpg",
  "bio": { "en": "", "ar": "" },
  "order": [order from role map],
  "active": true
}

Leave institution and bio as empty strings. The user will fill them in later
or the member will provide them. Do not block completion on missing optional fields.

## Step 6 — Report

Confirm to the user:
- Photo saved at: public/assets/people/leadership/[id].jpg
- members.json updated with entry for [Full Name] as [Role EN]
- Fields left empty for user to fill: institution (EN + AR), bio (EN + AR), Arabic name
- Show a preview of the generated photo
