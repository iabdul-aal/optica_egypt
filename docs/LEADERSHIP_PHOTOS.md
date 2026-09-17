# Optica Egypt - Leadership Photos
## Photo System, Naming, and AI Editing Prompts

---

## DESIGN DECISION: ONE PHOTO PER PERSON, NO VARIANTS

Every member has exactly ONE photo file.
- No light version. No dark version. No square + circle variants.
- The CSS handles cropping, shape, and overlay. The photo is just the photo.
- This keeps the asset count small, the repo fast, and maintenance simple.

Background choice: DARK NAVY #09131F baked into every photo.
This matches the site dark mode (the primary mode) and works perfectly on
dark cards. On the light-mode Leadership page the card background is white
but the photo area stays dark — exactly like premium tech company team pages.

---

## FILE SYSTEM

public/
  assets/
    people/
      leadership/
        [firstname-lastname].jpg    ← one file per person, no variants

Rule: the photo filename = the member id in members.json.
If id is "ahmed-hassan" then the file is ahmed-hassan.jpg
The component resolves: /assets/people/leadership/{member.id}.jpg

---

## NAMING SYSTEM

  Pattern:  [firstname-lastname].jpg
  All lowercase. Hyphens between words. No spaces. No numbers unless needed.

  Examples:
    ahmed-hassan.jpg
    sara-el-sayed.jpg
    omar-abdel-aziz.jpg
    nour-ibrahim.jpg
    faculty-advisor-khaled-mansour.jpg   ← prefix for advisor if desired

  For members.json the id field matches exactly:
    "id": "ahmed-hassan"
    "photo": "ahmed-hassan.jpg"    ← always id + .jpg

---

## MEMBERS.JSON FIELDS (per person)

  id          string   Unique slug, matches photo filename without extension
                       Lowercase, hyphens. Example: "ahmed-hassan"

  name        object   { "en": "Ahmed Hassan", "ar": "أحمد حسن" }

  role        object   { "en": "President", "ar": "الرئيس" }
              Allowed roles (en):
                President / Vice President / Secretary / Treasurer /
                Events Director / Outreach Director / Media Director /
                Technical Director / Faculty Advisor

  term        string   "2024-2025"

  institution object   { "en": "Cairo University", "ar": "جامعة القاهرة" }

  email       string   firstname.lastname@example.com
                       Use personal or chapter email, not hardcoded in JSX

  linkedin    string   The username portion only (not the full URL)
                       Example: "ahmed-hassan-optics"
                       Component builds: https://linkedin.com/in/{linkedin}

  photo       string   Always: id + ".jpg"
                       Example: "ahmed-hassan.jpg"

  bio         object   { "en": "2-3 sentences.", "ar": "جملتان أو ثلاث." }
                       Keep under 280 characters per language.

  order       integer  Display order on the Leadership page. 1 = first shown.
                       President = 1, VP = 2, Secretary = 3, Treasurer = 4,
                       then other committee roles, Faculty Advisor last.

  active      boolean  true = show on site. false = archive (not deleted).

---

## PHOTO PREPARATION WORKFLOW

Step 1: Collect the original photo from each member.
        Any format, any background. At least 800px wide. Face clearly visible.

Step 2: Edit using ChatGPT (with the prompt below).
        Attach: the original photo + LOGO + BANNER as references.

Step 3: Download the result, resize to 800x1000px (4:5 ratio) using Squoosh.
        Save as JPEG at 85% quality.

Step 4: Rename following the naming system: firstname-lastname.jpg

Step 5: Place in: public/assets/people/leadership/

---

## PHOTO EDITING PROMPT (use for every member)

Tool: ChatGPT DALL-E 4o (image editing mode)
Attach three images:
  1. The member original photo
  2. LOGO (optica-egypt-logo.png)
  3. BANNER (optica-egypt-banner.png)

PROMPT:
I am attaching three images: a person photo, our Optica Egypt logo, and our Optica Egypt banner.

Edit the attached person photo to match our brand visual system:

BACKGROUND: Remove the existing background completely and replace it with
a smooth dark navy background #09131F, the same dark navy used throughout
our logo and banner. The background should be a very subtle radial gradient:
slightly lighter charcoal #1A1F26 directly behind the subject's head,
fading out to dark navy #09131F at the edges.

LIGHTING: Apply cinematic professional portrait lighting consistent across ALL member photos:
- Primary light: warm gold #D4AF37 coming from the upper-right, creating a
  subtle rim and highlight on the right side of the face and shoulder
- Fill light: very subtle teal #00ADEF on the left side, barely perceptible,
  just enough to prevent the left side from going fully dark
- The overall feel: professional, scientific, premium — like a National Geographic
  or TED speaker portrait

CROP AND FRAMING: Head and shoulders composition.
The subject's eyes should be at approximately the upper-third line.
Centered horizontally. Slight space above the head.
Portrait orientation, approximately 4:5 ratio.

QUALITY: Sharp, high-detail, professional photography quality.
No filters, no heavy retouching, no skin smoothing that looks artificial.
Natural professional look.

COLOR TONE: Slightly cool-neutral overall with the warm gold rim light as the
only warm element. This keeps all member photos visually consistent with each other
even though they were shot in different environments.

The goal is that when all leadership photos are placed side by side on a dark navy
grid, they look like they were all photographed in the same professional studio session.

OUTPUT: Portrait image on the dark navy background described above.

---

## ROLE LABELS (for members.json — both languages required)

  en                  ar
  President           الرئيس
  Vice President      نائب الرئيس
  Secretary           الأمين
  Treasurer           أمين الصندوق
  Events Director     مدير الفعاليات
  Outreach Director   مدير التوعية
  Media Director      مدير الإعلام
  Technical Director  المدير التقني
  Faculty Advisor     المستشار الأكاديمي

---

## LEADERSHIP PAGE LAYOUT

The Leadership page uses a CSS grid of member cards.
Each card (dark navy surface, rounded-lg):
  - Photo: 4:5 ratio, full width of the card, dark background blends into card
  - Name: large, white, Montserrat
  - Role: gold badge pill
  - Institution: small, muted
  - Icons row: email icon (mailto:) + LinkedIn icon (linkedin.com/in/)
  - Bio: expandable on click/tap, 2-3 sentences

Card order on page = order field in members.json.
Faculty Advisor gets a separate visually distinct row at the bottom.

NO baked-in overlays on the photos themselves.
NO name text burned into the photo files.
The component renders all text and badges from members.json data.
Photos are only the portrait. Everything else is CSS.

---

## WHAT NOT TO DO

- Do NOT save light and dark versions of the same photo. One file only.
- Do NOT bake the name, role, or any text into the photo file.
- Do NOT use PNG for photos (unnecessary file size). JPEG at 85% only.
- Do NOT store photos anywhere except public/assets/people/leadership/
- Do NOT hardcode any member data in JSX. All from members.json.
- Do NOT use different aspect ratios for different people. Always 4:5.
- Do NOT accept photos under 400px wide as source material.
