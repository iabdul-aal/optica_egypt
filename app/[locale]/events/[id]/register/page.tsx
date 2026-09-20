import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { EventRegistrationForm } from "@/components/sections/EventRegistrationForm"
import { getAllEvents, getEventById } from "@/lib/events"
import { siteConfig } from "@/lib/site-config"
import { isLocale, localizedHref, type Locale } from "@/lib/locales"

type EventRegistrationPageProps = { params: Promise<{ locale: string; id: string }> }

export function generateStaticParams() {
  return getAllEvents().map((event) => ({ id: event.id }))
}

export async function generateMetadata({ params }: EventRegistrationPageProps): Promise<Metadata> {
  const { id } = await params
  const event = getEventById(id)
  const isEarly = event?.status === "upcoming"
  return event
    ? { title: `${isEarly ? "Early Register" : "Register"} — ${event.title.en}` }
    : { title: "Event registration" }
}

export default async function EventRegistrationPage({ params }: EventRegistrationPageProps) {
  const { id, locale: requestedLocale } = await params
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "en"
  const event = getEventById(id)
  if (!event) notFound()

  const isEarly = event.status === "upcoming"

  return (
    <section className="section-space scientific-grid min-h-[70vh]">
      <div className="container-page grid gap-12 lg:grid-cols-[.86fr_1.14fr]">
        <div>
          <Link href={localizedHref(locale, `/events/${event.id}`)} className="text-link">
            <ArrowLeft size={14} /> Event details
          </Link>
          <p className="eyebrow mt-10">
            {isEarly ? "Early event registration" : "Event registration"}
          </p>
          <h1 className="section-title mt-3">{event.title.en}</h1>
          <div className="mt-7 border-y border-white/15 py-5 text-sm leading-6 text-[var(--ink-soft)]">
            <p>
              {event.date}
              {event.startTime && (
                <><span className="mx-2 text-[var(--gold)]">/</span>{event.startTime}</>
              )}
            </p>
            <p className="mt-2">{event.location.en}</p>
          </div>
        </div>
        <div className="border-y border-white/15 py-8 sm:px-2">
          <EventRegistrationForm
            eventTitle={event.title.en}
            eventDate={event.date}
            email={siteConfig.email}
          />
        </div>
      </div>
    </section>
  )
}
