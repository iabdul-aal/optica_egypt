import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"
import type { Event } from "@/types/event"

function eventDate(date: string) {
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`))
}

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="event-row grid gap-5 py-7 sm:grid-cols-[8.5rem_1fr_auto] sm:items-start sm:gap-7">
      <time dateTime={event.date} className="font-mono text-sm font-bold tracking-tight text-[var(--gold)]">{eventDate(event.date)}</time>
      <div>
        <p className="eyebrow">{event.type}</p>
        <h3 className="mt-3 max-w-2xl text-xl font-semibold leading-snug tracking-tight text-[var(--ink)]"><Link href={`/events/${event.id}`} className="transition-colors hover:text-[var(--gold)]">{event.title.en}</Link></h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">{event.description.en}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-5 text-[var(--ink-soft)]">
          {event.time && <span>{event.time}</span>}
          <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-[var(--gold)]" /> {event.location.en}</span>
        </div>
      </div>
      <Link href={`/events/${event.id}`} className="text-link w-fit sm:mt-1">View event <ArrowUpRight size={14} /></Link>
    </article>
  )
}
