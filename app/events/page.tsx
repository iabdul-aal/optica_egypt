import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Trophy } from "lucide-react"
import { EventCard } from "@/components/sections/EventCard"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
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

      {/* ── Flagship Conference Spotlight Banner ──────────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-8">
        <div className="container-page">
          <div className="site-card p-6 sm:p-8 border-l-4 border-l-[var(--gold)] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                <Trophy size={14} />
                <span>Flagship Annual Scientific Conference</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                Egypt Photonics Conference (EPC 2027)
              </h3>
              <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                Our premier three-day peer-reviewed conference featuring five technical tracks, keynote plenaries, and indexed DOI proceedings. Scheduled for April 18 – 20, 2027.
              </p>
            </div>
            <Link href="/conferences" className="btn-primary shrink-0">
              <span>Explore Flagship Conference</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">

          <ScrollReveal animation="fade-up" delay={60}>
            <div className="section-split-heading">
              <div>
                <p className="eyebrow">{dictionary.events.programmeEyebrow}</p>
                <h2 className="section-title">{dictionary.events.programmeTitle}</h2>
              </div>
              <p className="lede">{dictionary.events.programmeIntro}</p>
            </div>
          </ScrollReveal>

          {events.length === 0 ? (
            <ScrollReveal animation="fade-up" delay={80}>
              <div className="border-b border-[var(--line-subtle)] py-10">
                <h3 className="text-xl font-semibold text-[var(--ink)]">{dictionary.events.emptyTitle}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{dictionary.events.emptyBody}</p>
              </div>
            </ScrollReveal>
          ) : (
            <div>
              {events.map((event, index) => (
                <ScrollReveal key={event.id} animation="fade-up" delay={index * 60}>
                  <EventCard event={event} locale="en" dictionary={dictionary} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
