import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, UserRound } from "lucide-react"
import { notFound } from "next/navigation"
import { EventBanner } from "@/components/sections/EventBanner"
import { getAllEvents, getEventById } from "@/lib/events"

type EventPageProps = { params: Promise<{ id: string }> }

function displayDate(date: string) {
  return new Intl.DateTimeFormat("en", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`))
}

export function generateStaticParams() {
  return getAllEvents().map((event) => ({ id: event.id }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params
  const event = getEventById(id)
  return event ? { title: event.title.en, description: event.description.en } : { title: "Event not found" }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params
  const event = getEventById(id)
  if (!event) notFound()

  return <>
    <section className="scientific-grid border-b border-white/10 bg-[#0d1011]">
      <div className="container-page py-10 sm:py-14">
        <Link href="/events" className="text-link"><ArrowLeft size={14} /> All events</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div><p className="eyebrow">{event.type} / Event detail</p><h1 className="display-title mt-4 max-w-3xl text-[clamp(2.35rem,4.8vw,4.8rem)]">{event.title.en}</h1></div>
          <div className="border-l-0 border-white/15 pt-1 lg:border-l lg:pl-8"><p className="font-mono text-xl font-bold text-[var(--gold)]">{displayDate(event.date)}</p><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{event.time} <span className="mx-2 text-[var(--gold)]">/</span> {event.location.en}</p></div>
        </div>
      </div>
    </section>
    <EventBanner event={event} />
    <section className="section-space"><div className="container-page grid gap-12 lg:grid-cols-[1.2fr_.8fr]"><article><p className="eyebrow">About this event</p><p className="mt-5 max-w-3xl text-xl leading-9 text-[var(--ink-soft)]">{event.description.en}</p>{event.tags.length > 0 && <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5 font-mono text-[0.68rem] font-bold tracking-[0.08em] text-[var(--gold)]">{event.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}</article><aside className="border-y border-white/15 py-6"><p className="eyebrow">Event information</p><dl className="mt-5 grid gap-5 text-sm"><div className="flex gap-3 text-[var(--ink-soft)]"><CalendarDays size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" /><div><dt className="font-semibold text-[var(--ink)]">When</dt><dd className="mt-1">{displayDate(event.date)}<br />{event.time}</dd></div></div><div className="flex gap-3 text-[var(--ink-soft)]"><MapPin size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" /><div><dt className="font-semibold text-[var(--ink)]">Where</dt><dd className="mt-1">{event.location.en}</dd></div></div>{event.speaker && <div className="flex gap-3 text-[var(--ink-soft)]"><UserRound size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" /><div><dt className="font-semibold text-[var(--ink)]">Speaker</dt><dd className="mt-1">{event.speaker.name}<br />{event.speaker.role}<br />{event.speaker.institution}</dd></div></div>}</dl><Link href={`/events/${event.id}/register`} className="btn-primary mt-7">Register for this event <ArrowUpRight size={15} /></Link></aside></div></section>
  </>
}
