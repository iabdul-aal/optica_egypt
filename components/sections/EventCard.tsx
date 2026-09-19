import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"
import { formatEventDate, formatEventFormat, formatEventStatus } from "@/lib/formatting"
import { getLocalizedText, localizedHref, type Dictionary, type Locale } from "@/lib/locales"
import type { Event } from "@/types/event"

type EventCardProps = {
  event: Event
  locale: Locale
  dictionary: Dictionary
}

export function EventCard({ event, locale, dictionary }: EventCardProps) {
  return (
    <article className="event-row grid gap-5 py-7 sm:grid-cols-[9rem_1fr_auto] sm:items-start sm:gap-7">
      <time dateTime={event.date} className="font-mono text-sm font-bold tracking-tight text-[var(--gold)]">
        {formatEventDate(event.date, locale, { day: "2-digit", month: "short", year: "numeric" })}
      </time>
      <div>
        <p className="eyebrow">{formatEventStatus(event.status, locale)} / {formatEventFormat(event.format, locale)}</p>
        <h3 className="mt-3 max-w-2xl text-xl font-semibold leading-snug tracking-tight text-[var(--ink)]">
          <Link href={localizedHref(locale, `/events/${event.id}`)} className="transition-colors hover:text-[var(--gold)]">
            {getLocalizedText(event.title, locale)}
          </Link>
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">{getLocalizedText(event.description, locale)}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-5 text-[var(--ink-soft)]">
          {event.startTime && <span>{event.startTime}{event.timezone ? ` ${event.timezone}` : ""}</span>}
          <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-[var(--gold)]" /> {getLocalizedText(event.location, locale)}</span>
        </div>
      </div>
      <Link href={localizedHref(locale, `/events/${event.id}`)} className="text-link w-fit sm:mt-1">
        {dictionary.events.viewEvent} <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </article>
  )
}
