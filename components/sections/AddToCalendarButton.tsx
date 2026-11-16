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
    <div className={compact ? "flex flex-wrap items-center gap-2.5" : "mt-4 flex flex-wrap items-center gap-2.5"}>
      <button
        type="button"
        onClick={() => downloadEventIcs(event)}
        className="inline-flex min-h-[48px] items-center gap-2 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2 text-xs font-semibold text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors cursor-pointer"
      >
        <CalendarPlus size={14} className="text-[var(--gold)]" aria-hidden="true" />
        <span>Download .ICS</span>
      </button>
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center gap-2 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2 text-xs font-semibold text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors"
      >
        <span>Google Calendar</span>
        <ExternalLink size={12} aria-hidden="true" />
      </a>
    </div>
  )
}
