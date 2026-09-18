import type { Metadata } from "next"
import { getUpcomingEvents } from "@/lib/events"
import { EventCard } from "@/components/sections/EventCard"
import { PageHeader } from "@/components/sections/PageHeader"

export const metadata: Metadata = { title: "Events", description: "Events from Optica Egypt Local Section." }

export default function EventsPage() {
  const events = getUpcomingEvents()

  return <>
    <PageHeader eyebrow="Events and workshops" title="Find a room for your next question." intro="From first conversations to specialist sessions, our calendar brings Egypt's photonics community into the same room." />
    <section className="section-space">
      <div className="container-page">
        <div className="grid gap-7 border-b border-white/15 pb-8 md:grid-cols-[1fr_.72fr] md:items-end">
          <div><p className="eyebrow">Programme</p><h2 className="section-title mt-3">The calendar ahead.</h2></div>
          <p className="text-sm leading-6 text-[var(--ink-soft)] md:justify-self-end md:text-right">Dates, formats, and locations are organised for fast scanning.</p>
        </div>
        <div>{events.map((event) => <EventCard event={event} key={event.id} />)}</div>
      </div>
    </section>
  </>
}
