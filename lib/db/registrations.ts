"use client"

export interface RegistrationRecord {
  id: string
  eventId: string
  eventTitle: string
  eventDate: string
  name: string
  email: string
  institution: string
  role?: string
  isEarlyBird: boolean
  status: "confirmed" | "waitlist"
  createdAt: string
}

export type RegistrationInput = {
  eventId: string
  eventTitle: string
  eventDate: string
  name: string
  email: string
  institution: string
  role?: string
  isEarlyBird?: boolean
}

const STORAGE_KEY = "optica_egypt_event_registrations_v1"

function generateConfirmationCode(): string {
  const year = new Date().getFullYear()
  const randomSegment = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `OPT-EG-${year}-${randomSegment}`
}

function getLocalRegistrations(): RegistrationRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as RegistrationRecord[]
  } catch {
    return []
  }
}

function saveLocalRegistration(record: RegistrationRecord): void {
  if (typeof window === "undefined") return
  try {
    const existing = getLocalRegistrations()
    const updated = [record, ...existing.filter((item) => item.id !== record.id)]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.warn("Unable to save registration to local storage:", error)
  }
}

/**
 * Saves an event registration directly to the database.
 * Supports:
 * 1. Supabase (PostgreSQL) if NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
 * 2. Custom Webhook / REST endpoint if NEXT_PUBLIC_REGISTRATION_WEBHOOK_URL is set.
 * 3. Persistent browser storage as resilient local database fallback with CSV export.
 */
export async function saveRegistration(input: RegistrationInput): Promise<RegistrationRecord> {
  const id = generateConfirmationCode()
  const createdAt = new Date().toISOString()
  const record: RegistrationRecord = {
    id,
    eventId: input.eventId,
    eventTitle: input.eventTitle,
    eventDate: input.eventDate,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    institution: input.institution.trim(),
    role: input.role?.trim() || undefined,
    isEarlyBird: Boolean(input.isEarlyBird),
    status: "confirmed",
    createdAt,
  }

  // 1. Always persist to client-side local database store
  saveLocalRegistration(record)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const webhookUrl = process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK_URL

  // 2. Insert into Supabase if configured
  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/event_registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          confirmation_code: record.id,
          event_id: record.eventId,
          event_title: record.eventTitle,
          event_date: record.eventDate,
          attendee_name: record.name,
          attendee_email: record.email,
          institution: record.institution,
          role: record.role,
          is_early_bird: record.isEarlyBird,
          status: record.status,
          created_at: record.createdAt,
        }),
      })

      if (!response.ok) {
        console.warn("Supabase registration returned non-200 status:", response.status)
      }
    } catch (err) {
      console.warn("Failed to reach Supabase endpoint, local record preserved:", err)
    }
  }

  // 3. Post to custom webhook / database endpoint if configured
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      })
    } catch (err) {
      console.warn("Failed to reach registration webhook, local record preserved:", err)
    }
  }

  return record
}

/**
 * Retrieves all stored registrations, optionally filtered by event ID.
 */
export function getRegistrations(eventId?: string): RegistrationRecord[] {
  const records = getLocalRegistrations()
  if (!eventId) return records
  return records.filter((item) => item.eventId === eventId)
}

/**
 * Exports stored registrations to a downloadable CSV string.
 */
export function exportRegistrationsCsv(eventId?: string): string {
  const records = getRegistrations(eventId)
  const headers = ["Confirmation Code", "Event ID", "Event Title", "Date", "Name", "Email", "Institution", "Role", "Early Bird", "Status", "Registered At"]
  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${r.eventId}"`,
    `"${r.eventTitle.replace(/"/g, '""')}"`,
    `"${r.eventDate}"`,
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.email}"`,
    `"${r.institution.replace(/"/g, '""')}"`,
    `"${(r.role || "").replace(/"/g, '""')}"`,
    r.isEarlyBird ? "Yes" : "No",
    r.status,
    `"${r.createdAt}"`,
  ])

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")
}
