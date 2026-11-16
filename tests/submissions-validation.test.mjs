import { test } from "node:test"
import assert from "node:assert/strict"
import { applicationSchema, reviewSchema } from "../lib/recruitment-validation.ts"
import { submissionReviewSchema, submissionSchema } from "../lib/submissions-validation.ts"

const validUuid = "11111111-1111-4111-8111-111111111111"

test("applicationSchema accepts valid committee applications and normalizes email", () => {
  const parsed = applicationSchema.safeParse({
    name: "Nour El-Din",
    email: "NOUR@Example.Org",
    university: "Cairo University",
    studyLevel: "Undergraduate",
    committee: "Outreach",
    skills: "Workshop coordination",
    motivation: "Contributing to university optics outreach workshops across Cairo campuses.",
    availability: "3 hours per week",
    consent: true,
    website: "",
    submissionId: validUuid,
  })
  assert.equal(parsed.success, true)
  if (parsed.success) {
    assert.equal(parsed.data.email, "nour@example.org")
  }
})

test("applicationSchema rejects short motivations and filled honeypots", () => {
  const parsed = applicationSchema.safeParse({
    name: "Nour El-Din",
    email: "nour@example.org",
    university: "Cairo University",
    studyLevel: "Undergraduate",
    committee: "Outreach",
    skills: "",
    motivation: "Too short",
    availability: "3h",
    consent: true,
    website: "https://spam.example",
    submissionId: validUuid,
  })
  assert.equal(parsed.success, false)
})

test("submissionSchema accepts multi-intent desk requests and rejects unknown intents", () => {
  const ok = submissionSchema.safeParse({
    intent: "partner_proposal",
    name: "Dr. Omar Zaki",
    email: "OMAR@university.edu.eg",
    affiliation: "Alexandria Photonics Lab",
    targetRef: "seasonal-photonics-school",
    details: "Proposing an optics seasonal school session hosted in Alexandria.",
    topicOrTrack: "Campus Hosting",
    deadlineOrDate: "Autumn 2026",
    opticaId: "",
    consent: true,
    website: "",
    submissionId: validUuid,
  })
  assert.equal(ok.success, true)
  if (ok.success) {
    assert.equal(ok.data.email, "omar@university.edu.eg")
    assert.equal(ok.data.intent, "partner_proposal")
  }

  const badIntent = submissionSchema.safeParse({
    intent: "invalid_intent",
    name: "Dr. Omar Zaki",
    email: "omar@university.edu.eg",
    affiliation: "Alexandria Photonics Lab",
    details: "Detailed message exceeding minimum length.",
    consent: true,
    submissionId: validUuid,
  })
  assert.equal(badIntent.success, false)
})

test("review schemas enforce valid workflow states and non-negative version", () => {
  assert.equal(reviewSchema.safeParse({ status: "interview", note: "Invite", version: 0 }).success, true)
  assert.equal(reviewSchema.safeParse({ status: "interview", note: "Invite", version: -1 }).success, false)
  assert.equal(submissionReviewSchema.safeParse({ status: "scheduled", note: "Booked", version: 2 }).success, true)
  assert.equal(submissionReviewSchema.safeParse({ status: "bogus", note: "", version: 0 }).success, false)
})
