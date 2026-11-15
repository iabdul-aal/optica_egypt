import { afterEach, beforeEach, test } from "node:test"
import assert from "node:assert/strict"
import { saveVolunteerApplication } from "../lib/db/volunteers.ts"

const keys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_VOLUNTEER_WEBHOOK_URL",
  "NEXT_PUBLIC_REGISTRATION_WEBHOOK_URL"
]
const originalEnv = Object.fromEntries(
  keys.map((key) => [key, process.env[key]])
)
const originalFetch = globalThis.fetch
const input = {
  name: " Applicant ",
  email: "APPLICANT@example.org",
  affiliation: "University",
  track: "Outreach",
  statement: "I would like to contribute."
}

beforeEach(() => {
  keys.forEach((key) => delete process.env[key])
})

afterEach(() => {
  globalThis.fetch = originalFetch
  for (const key of keys) {
    if (originalEnv[key] === undefined) delete process.env[key]
    else process.env[key] = originalEnv[key]
  }
})

function configureSupabase() {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co/"
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-public-key"
}

test("missing backend never produces a delivery receipt", async () => {
  globalThis.fetch = async () =>
    assert.fail("No destination should be contacted")
  await assert.rejects(
    saveVolunteerApplication(input),
    /temporarily unavailable/
  )
})

test("Supabase permission or database errors never produce a receipt", async () => {
  configureSupabase()
  for (const status of [400, 401, 403, 409, 500]) {
    globalThis.fetch = async () => new Response(null, { status })
    await assert.rejects(saveVolunteerApplication(input), /delivery failed/)
  }
})

test("network failure never produces a receipt", async () => {
  configureSupabase()
  globalThis.fetch = async () => {
    throw new TypeError("Network unavailable")
  }
  await assert.rejects(saveVolunteerApplication(input), /Network unavailable/)
})

test("successful delivery normalizes fields and writes once without requiring read access", async () => {
  configureSupabase()
  process.env.NEXT_PUBLIC_VOLUNTEER_WEBHOOK_URL = "https://example.org/webhook"
  let calls = 0
  globalThis.fetch = async (url, options) => {
    calls++
    assert.equal(
      url,
      "https://example.supabase.co/rest/v1/volunteer_applications"
    )
    assert.equal(options.headers.Prefer, "return=minimal")
    assert.equal(
      JSON.parse(options.body).applicant_email,
      "applicant@example.org"
    )
    return new Response(null, { status: 201 })
  }
  const receipt = await saveVolunteerApplication(input)
  assert.equal(calls, 1)
  assert.equal(receipt.name, "Applicant")
  assert.equal(receipt.status, "submitted")
  assert.match(receipt.id, /^OPT-EG-VOL-\d{4}-[0-9A-F]{12}$/)
})

test("legacy webhook must accept delivery before returning a receipt", async () => {
  process.env.NEXT_PUBLIC_VOLUNTEER_WEBHOOK_URL = "https://example.org/webhook"
  globalThis.fetch = async () => new Response(null, { status: 503 })
  await assert.rejects(saveVolunteerApplication(input), /delivery failed/)
  globalThis.fetch = async () => new Response(null, { status: 204 })
  assert.equal((await saveVolunteerApplication(input)).status, "submitted")
})
