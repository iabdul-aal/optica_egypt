"use client"

export interface VolunteerRecord {
  id: string
  name: string
  email: string
  affiliation: string
  track: string
  experience?: string
  statement: string
  status: "submitted" | "under_review" | "accepted"
  createdAt: string
}

export type VolunteerInput = {
  name: string
  email: string
  affiliation: string
  track: string
  experience?: string
  statement: string
}

const STORAGE_KEY = "optica_egypt_volunteer_intake_v1"

function generateVolunteerCode(): string {
  const year = new Date().getFullYear()
  const randomSegment = crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase()
  return `OPT-EG-VOL-${year}-${randomSegment}`
}

function getLocalVolunteers(): VolunteerRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as VolunteerRecord[]
  } catch {
    return []
  }
}

/**
 * Returns a receipt only after the configured backend accepts the application.
 * Supabase takes precedence over the legacy webhook. Applicant details are
 * never saved to browser storage as a substitute for delivery.
 */
export async function saveVolunteerApplication(input: VolunteerInput): Promise<VolunteerRecord> {
  const id = generateVolunteerCode()
  const createdAt = new Date().toISOString()
  const record: VolunteerRecord = {
    id,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    affiliation: input.affiliation.trim(),
    track: input.track.trim(),
    experience: input.experience?.trim() || undefined,
    statement: input.statement.trim(),
    status: "submitted",
    createdAt,
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const webhookUrl = process.env.NEXT_PUBLIC_VOLUNTEER_WEBHOOK_URL || process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK_URL

  if (supabaseUrl && supabaseKey) {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/volunteer_applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        application_code: record.id,
        applicant_name: record.name,
        applicant_email: record.email,
        affiliation: record.affiliation,
        track: record.track,
        experience: record.experience,
        statement: record.statement,
        status: record.status,
        created_at: record.createdAt,
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) throw new Error("Application delivery failed. Please try again.")
  } else if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "volunteer_application", ...record }),
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) throw new Error("Application delivery failed. Please try again.")
  } else {
    throw new Error("Applications are temporarily unavailable. Please check back later.")
  }

  return record
}

/**
 * Retrieves all stored volunteer applications.
 */
export function getVolunteers(): VolunteerRecord[] {
  return getLocalVolunteers()
}

/**
 * Exports stored volunteer applications to a CSV string.
 */
export function exportVolunteersCsv(): string {
  const records = getLocalVolunteers()
  const headers = ["Application Code", "Name", "Email", "Affiliation", "Track", "Experience", "Statement", "Status", "Submitted At"]
  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.email}"`,
    `"${r.affiliation.replace(/"/g, '""')}"`,
    `"${r.track.replace(/"/g, '""')}"`,
    `"${(r.experience || "").replace(/"/g, '""')}"`,
    `"${r.statement.replace(/"/g, '""')}"`,
    r.status,
    `"${r.createdAt}"`,
  ])

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")
}
