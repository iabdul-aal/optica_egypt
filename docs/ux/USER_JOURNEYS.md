# User Journeys

## Journey 1 ,  Student Discovery

WHO: Egyptian physics or engineering student, 18–25
TRIGGER: Professor mentions Optica, or sees Instagram post
GOAL: Understand what the section offers and join
DEVICE: Mobile (primary), Desktop

STEPS:
1. Lands on / (home)
2. Reads hero ,  "Connecting Talent. Advancing Photonics."
3. Scrolls ,  sees audience card "Students"
4. Looks for events ,  sees empty state "First event coming soon"
5. Navigates to /about ,  reads mission and vision
6. Navigates to /join ,  reads body, clicks "Apply to Join"
7. External form opens

DECISION POINTS:
- Hero: "Is this for me?" → audience cards must answer yes clearly
- Events: "Is anything happening?" → empty state must not feel like abandonment
- Join: "Is this worth my time?" → body copy must establish value

FRICTION:
- No events visible (honest empty state required ,  not blank)
- No photos on leadership yet (placeholder needed)
- Join form is external ,  transition must feel deliberate not broken

SUCCESS: User submits join form
NEXT JOURNEY: Receives confirmation, attends first event

---

## Journey 2 ,  Event Registration

WHO: Student or researcher who heard about a specific event
TRIGGER: WhatsApp message or Instagram story with event name
GOAL: Register for the event
DEVICE: Mobile

STEPS:
1. Clicks shared link or navigates to /events
2. Sees event card with title, date, location, type badge
3. Reads description
4. Clicks "Register" → opens external registration URL
5. Completes registration on external form

FRICTION:
- Currently zero events ,  entire journey is blocked
- Fix: first event must be added to events.json before this journey exists

SUCCESS: User registered for event
NEXT JOURNEY: Attends event, joins section

---

## Journey 3 ,  Leadership Verification

WHO: University professor, industry professional, Optica staff
TRIGGER: Received outreach from a section member
GOAL: Verify the section is real, credible, and well-organized
DEVICE: Desktop

STEPS:
1. Navigates to /leadership
2. Sees grid of member cards
3. Reads name, role, institution
4. Hovers ,  LinkedIn icon appears
5. Clicks LinkedIn → verifies profile
6. Trust established

FRICTION:
- Photos missing (shows broken image until Drive uploads processed)
- LinkedIn not filled for all members yet

SUCCESS: Verifier trusts the section, responds positively to outreach
FIX NEEDED: Member photo fallback (gold initials on navy) for missing photos

---

## Journey 4 ,  Resource Discovery

WHO: Researcher looking for photonics resources
TRIGGER: Hears section has curated resources
GOAL: Find a useful journal, conference, or tool
DEVICE: Desktop

STEPS:
1. Navigates to /resources
2. Scans 5 resource cards
3. Clicks "Visit" on relevant resource
4. External site opens in new tab

FRICTION: Only 5 resources currently ,  limited value
FIX: Add more resources to data/resources.json regularly