"use client"

import { CalendarPlus, ExternalLink } from "lucide-react"
import { buildGoogleCalendarUrl, downloadEventIcs, type CalendarEventInput } from "@/lib/calendar"

export function AddToCalendarButton({
  event,
  compact = false,
}: {
  event: CalendarEventInput
  compact?: boolean
}) {
  const googleUrl = buildGoogleCalendarUrl(event)

  return (
    <div className={compact ? "flex flex-wrap items-center gap-3" : "mt-4 flex flex-wrap items-center gap-3"}>
      <button
        type="button"
        onClick={() => downloadEventIcs(event)}
        className="btn-secondary min-h-[48px]"
      >
        <CalendarPlus size={14} className="text-[var(--gold)]" aria-hidden="true" />
        <span>Download .ICS</span>
      </button>
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary min-h-[48px]"
      >
        <span>Google Calendar</span>
        <ExternalLink size={12} aria-hidden="true" />
      </a>
    </div>
  )
}
