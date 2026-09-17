# Member Photo Collection — Message Template

Send this message via WhatsApp, email, or your group chat.
Available in English and Arabic below.

---

## ENGLISH VERSION

Hi [Name],

We are building the official Optica Egypt Local Section website and need a professional photo from you for the Leadership page.

Please send your photo following these exact steps:

1. USE A CLEAR, RECENT PHOTO
   - Face and shoulders clearly visible
   - Good lighting (natural light near a window works perfectly)
   - Any background is fine — we will edit it
   - Minimum size: 800px wide
   - Format: PNG or JPG

2. NAME YOUR FILE EXACTLY LIKE THIS BEFORE SENDING:

   FirstName_LastName_Position_YourEmail_YourLinkedIn.png

   Example:
   Ahmed_Hassan_President_ahmed.hassan@gmail.com_ahmed-hassan.png

   Positions to use (pick exactly one):
     President
     VicePresident
     Secretary
     Treasurer
     EventsDirector
     OutreachDirector
     MediaDirector
     TechnicalDirector

   For LinkedIn: use only your username (the part after linkedin.com/in/)
   Example: if your profile is linkedin.com/in/ahmed-hassan-optics
   then write: ahmed-hassan-optics

   If you do not have LinkedIn yet write: none

3. SEND TO: [your WhatsApp number or email here]

   Deadline: [add deadline date here]

Thank you! Your photo will be professionally edited to match our brand before it goes on the site.

---

## ARABIC VERSION

أهلاً [الاسم]،

نحن نبني الموقع الرسمي لقسم أوبتيكا مصر المحلي ونحتاج إلى صورة احترافية منك لصفحة القيادة.

رجاءً أرسل صورتك باتباع الخطوات التالية بالضبط:

1. استخدم صورة واضحة وحديثة
   - يجب أن يظهر وجهك وكتفاك بوضوح
   - إضاءة جيدة (الضوء الطبيعي بجانب النافذة مثالي)
   - الخلفية غير مهمة — سنقوم بتعديلها
   - الحجم الأدنى: 800 بكسل عرضاً
   - الصيغة: PNG أو JPG

2. سمِّ الملف بالضبط على النحو التالي قبل الإرسال:

   الاسمالأول_اسمالعائلة_المنصب_بريدك_يوزرنيم-لينكد-إن.png

   مثال:
   Ahmed_Hassan_President_ahmed.hassan@gmail.com_ahmed-hassan.png

   المناصب المتاحة (اختر واحداً بالضبط):
     President           (الرئيس)
     VicePresident       (نائب الرئيس)
     Secretary           (الأمين)
     Treasurer           (أمين الصندوق)
     EventsDirector      (مدير الفعاليات)
     OutreachDirector    (مدير التوعية)
     MediaDirector       (مدير الإعلام)
     TechnicalDirector   (المدير التقني)

   بالنسبة للينكد إن: اكتب فقط اسم المستخدم (الجزء بعد linkedin.com/in/)
   مثال: إذا كان ملفك linkedin.com/in/ahmed-hassan-optics
   اكتب: ahmed-hassan-optics

   إذا لم يكن لديك لينكد إن بعد اكتب: none

3. أرسل إلى: [رقم واتساب أو بريد إلكتروني هنا]

   الموعد النهائي: [أضف التاريخ هنا]

شكراً! ستتم معالجة صورتك احترافياً لتتناسب مع هويتنا البصرية قبل نشرها على الموقع.

---
---

# AFTER RECEIVING A PHOTO — EDITING WORKFLOW

## Step 1: Parse the filename

When you receive: Ahmed_Hassan_President_ahmed.hassan@gmail.com_ahmed-hassan.png

Extract:
  First name   : Ahmed
  Last name    : Hassan
  Position     : President
  Email        : ahmed.hassan@gmail.com
  LinkedIn     : ahmed-hassan
  Photo file   : Ahmed_Hassan_President_ahmed.hassan@gmail.com_ahmed-hassan.png

Add to members.json:
  {
    "id": "ahmed-hassan",
    "name": { "en": "Ahmed Hassan", "ar": "أحمد حسن" },
    "role": { "en": "President", "ar": "الرئيس" },
    "term": "2024-2025",
    "institution": { "en": "Your University", "ar": "جامعتك" },
    "email": "ahmed.hassan@gmail.com",
    "linkedin": "ahmed-hassan",
    "photo": "ahmed-hassan.jpg",
    "bio": { "en": "", "ar": "" },
    "order": 1,
    "active": true
  }

## Step 2: Edit the photo using ChatGPT

Open ChatGPT image editing.
Attach ONE image only: the received member photo.

Use this prompt exactly — all style specs are written in, no reference images needed:

---
Edit the attached portrait photo for a professional scientific organization leadership page.

BACKGROUND
Remove the existing background completely.
Replace with a smooth dark navy background, hex #09131F.
Apply a very subtle radial gradient behind the subject:
slightly lighter charcoal #1A1F26 directly behind the head and shoulders,
fading smoothly to dark navy #09131F at all four edges.

LIGHTING
Apply this exact cinematic lighting setup — use it identically for every photo in this series:
Primary: a warm gold rim light (hex #D4AF37) coming from the upper-right.
It creates a soft highlight along the right side of the face, hair, and shoulder.
Fill: a very faint teal light (hex #00ADEF) on the left side.
Barely perceptible — just enough to prevent the left side from going fully dark.
Overall feel: premium, scientific, professional — like a TED speaker headshot or
a National Geographic contributor portrait.

CROP AND FRAMING
Head and shoulders composition.
The subject eyes should sit at approximately the upper-third horizontal line of the frame.
Centered horizontally with equal space on both sides.
Leave a small amount of breathing room above the head.
Portrait orientation, 4:5 aspect ratio.

QUALITY
Sharp focus on the face. Natural skin tones. No heavy retouching.
No skin smoothing that looks artificial. No artistic filters.
The person should look real, credible, and confident.

COLOR GRADING
Slightly cool-neutral overall tone.
The gold rim light is the only warm element in the image.
This makes all leadership photos look visually consistent when placed side by side
on the website, even though they were taken in different locations and conditions.

OUTPUT
The final image should be the person on the dark navy background described above.
No text, no overlays, no borders, no watermarks.
Portrait image ready for a professional website.
---

## Step 3: Save and rename

Download the result.
Resize to exactly 800x1000 pixels using Squoosh (squoosh.app).
Save as JPEG at 85% quality.
Rename to: ahmed-hassan.jpg  (firstname-lastname, lowercase, hyphens)

Place in: public/assets/people/leadership/ahmed-hassan.jpg

That is the only file needed for this member. Done.

---

# FILENAME PARSING REFERENCE

Received filename format:
  FirstName_LastName_Position_Email_LinkedIn.png

Split by underscore:
  [0] = First name
  [1] = Last name
  [2] = Position
  [3] = Email
  [4] = LinkedIn username

Output filename for site:
  [0]-[1] in lowercase, all hyphens = id field and photo filename

Position to role mapping for members.json:
  President       -> { "en": "President",          "ar": "الرئيس" }
  VicePresident   -> { "en": "Vice President",     "ar": "نائب الرئيس" }
  Secretary       -> { "en": "Secretary",           "ar": "الأمين" }
  Treasurer       -> { "en": "Treasurer",           "ar": "أمين الصندوق" }
  EventsDirector  -> { "en": "Events Director",    "ar": "مدير الفعاليات" }
  OutreachDirector-> { "en": "Outreach Director",  "ar": "مدير التوعية" }
  MediaDirector   -> { "en": "Media Director",     "ar": "مدير الإعلام" }
  TechnicalDirector->{ "en": "Technical Director", "ar": "المدير التقني" }

Display order on Leadership page:
  President = 1
  VicePresident = 2
  Secretary = 3
  Treasurer = 4
  EventsDirector = 5
  OutreachDirector = 6
  MediaDirector = 7
  TechnicalDirector = 8

