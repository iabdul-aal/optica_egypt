import type { Locale } from "@/lib/locales"

export function formatEventDate(date: string, _locale: Locale, options: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(new Date(`${date}T12:00:00`))
}

export function formatEventFormat(format: "in_person" | "online" | "hybrid", _locale: Locale) {
  const labels: Record<string, string> = {
    in_person: "In person",
    online: "Online",
    hybrid: "Hybrid",
  }
  return labels[format] ?? format
}

export function formatEventStatus(status: string, _locale: Locale) {
  const labels: Record<string, string> = {
    draft: "In preparation",
    upcoming: "Upcoming",
    registration_open: "Registration open",
    registration_closing: "Registration closing soon",
    sold_out: "Full",
    completed: "Completed",
    cancelled: "Cancelled",
  }
  return labels[status] ?? status
}
