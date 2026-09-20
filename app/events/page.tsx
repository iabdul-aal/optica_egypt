import type { Metadata } from "next"
import { EventCard } from "@/components/sections/EventCard"
import { PageHeader } from "@/components/sections/PageHeader"
import { getUpcomingEvents } from "@/lib/events"
import { getDictionary } from "@/lib/locales"

export const metadata: Metadata = {
  title: "Events",
  description: "Explore upcoming events, workshops, symposiums, and scientific seminars organized by Optica Egypt Local Section.",
  alternates: {
    canonical: "/events/",
  },
}

export default function EventsPage() {
  const dictionary = getDictionary("en")
  const events = getUpcomingEvents()

  return (
    <>
      <PageHeader eyebrow={dictionary.events.eyebrow} title={dictionary.events.title} intro={dictionary.events.intro} />
      <section className="section-space">
        <div className="container-page">
          <div className="section-split-heading">
            <div>
              <p className="eyebrow">{dictionary.events.programmeEyebrow}</p>
              <h2 className="section-title">{dictionary.events.programmeTitle}</h2>
            </div>
            <p className="lede">{dictionary.events.programmeIntro}</p>
          </div>
          {events.length === 0 ? (
            <div className="border-b border-white/10 py-10">
              <h3 className="text-xl font-semibold text-[var(--ink)]">{dictionary.events.emptyTitle}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{dictionary.events.emptyBody}</p>
            </div>
          ) : (
            <div>{events.map((event) => <EventCard event={event} locale="en" dictionary={dictionary} key={event.id} />)}</div>
          )}
        </div>
      </section>
    </>
  )
}
