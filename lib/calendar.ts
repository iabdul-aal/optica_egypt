/**
 * Client-side iCalendar (.ics) and Google Calendar URL generators for events.
 */

export interface CalendarEventInput {
  id: string
  title: string
  date: string
  startTime?: string
  location?: string
  description?: string
  url?: string
  durationHours?: number
}

function parseStartUtcIso(dateStr: string, startTime?: string, durationHours = 2): { start: string; end: string } {
  const [yearStr, monthStr, dayStr] = dateStr.split("-")
  const timeMatch = startTime?.match(/(\d{1,2}):(\d{2})/)
  const localHour = timeMatch ? Number(timeMatch[1]) : 18
  const localMinute = timeMatch ? Number(timeMatch[2]) : 0

  // Cairo standard time (EET) is UTC+2
  const startUtcMs = Date.UTC(
    Number(yearStr),
    Number(monthStr) - 1,
    Number(dayStr),
    localHour - 2,
    localMinute,
    0
  )
  const endUtcMs = startUtcMs + durationHours * 60 * 60 * 1000

  const formatIcs = (ms: number) => {
    const d = new Date(ms)
    const pad = (n: number) => String(n).padStart(2, "0")
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  }

  return {
    start: formatIcs(startUtcMs),
    end: formatIcs(endUtcMs),
  }
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
}

function buildEventIcs(input: CalendarEventInput): string {
  const { start, end } = parseStartUtcIso(input.date, input.startTime, input.durationHours)
  const nowStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Optica Egypt Local Section//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${input.id}@optica-egypt.com`,
    `DTSTAMP:${nowStamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcsText(input.title)}`,
  ]

  if (input.location) {
    lines.push(`LOCATION:${escapeIcsText(input.location)}`)
  }
  if (input.description) {
    lines.push(`DESCRIPTION:${escapeIcsText(input.description)}`)
  }
  if (input.url) {
    lines.push(`URL:${input.url}`)
  }

  lines.push("END:VEVENT", "END:VCALENDAR")
  return lines.join("\r\n")
}

export function buildGoogleCalendarUrl(input: CalendarEventInput): string {
  const { start, end } = parseStartUtcIso(input.date, input.startTime, input.durationHours)
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${start}/${end}`,
  })
  if (input.location) params.set("location", input.location)
  if (input.description) params.set("details", input.description)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function downloadEventIcs(input: CalendarEventInput): void {
  if (typeof window === "undefined") return
  const ics = buildEventIcs(input)
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `${input.id}.ics`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
