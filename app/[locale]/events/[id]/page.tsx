import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, UserRound } from "lucide-react"
import { notFound } from "next/navigation"
import { formatEventDate, formatEventFormat, formatEventStatus } from "@/lib/formatting"
import { getAllEvents, getEventById } from "@/lib/events"
import { getDictionary, getLocalizedText, isLocale, localizedHref, type Locale } from "@/lib/locales"

type EventPageProps = { params: Promise<{ locale: string; id: string }> }

export function generateStaticParams() {
  return getAllEvents().map((event) => ({ id: event.id }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id, locale: requestedLocale } = await params
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "en"
  const event = getEventById(id)
  return event ? { title: getLocalizedText(event.title, locale), description: getLocalizedText(event.description, locale) } : { title: "Event not found" }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id, locale: requestedLocale } = await params
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "en"
  const dictionary = getDictionary(locale)
  const event = getEventById(id)
  if (!event) notFound()

  const registrationAvailable = event.status === "registration_open" || event.status === "registration_closing"

  return <>
    <section className="scientific-grid border-b border-white/10 bg-[var(--surface)]">
      <div className="container-page py-10 sm:py-14">
        <Link href={localizedHref(locale, "/events")} className="text-link"><ArrowLeft size={14} aria-hidden="true" /> {dictionary.eventDetail.backToEvents}</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div><p className="eyebrow">{formatEventStatus(event.status, locale)} / {formatEventFormat(event.format, locale)}</p><h1 className="display-title mt-4 max-w-3xl text-[clamp(2.35rem,4.8vw,4.8rem)]">{getLocalizedText(event.title, locale)}</h1></div>
          <div className="border-l-0 border-white/15 pt-1 lg:border-l lg:pl-8"><p className="font-mono text-xl font-bold text-[var(--gold)]">{formatEventDate(event.date, locale, { weekday: "long" })}</p><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{event.startTime ?? dictionary.common.pending}{event.timezone ? ` ${event.timezone}` : ""} <span className="mx-2 text-[var(--gold)]">/</span> {getLocalizedText(event.location, locale)}</p></div>
        </div>
      </div>
    </section>
    <section className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <article>
          <p className="eyebrow">{dictionary.eventDetail.aboutEyebrow}</p>
          <p className="mt-5 max-w-3xl text-xl leading-9 text-[var(--ink-soft)]">{getLocalizedText(event.description, locale)}</p>
          {event.tags.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-2 border-t border-white/15 pt-5">
              {event.tags.map((tag) => (
                <span className="border border-white/15 px-3 py-1.5 text-xs font-bold tracking-wide text-[var(--gold-pale)]" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
        <aside className="border-y border-white/15 py-6">
          <p className="eyebrow">{dictionary.eventDetail.informationEyebrow}</p>
          <dl className="mt-5 grid gap-5 text-sm">
            <div className="flex gap-3 text-[var(--ink-soft)]">
              <CalendarDays size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" />
              <div>
                <dt className="font-semibold text-[var(--ink)]">{dictionary.eventDetail.when}</dt>
                <dd className="mt-1">
                  {formatEventDate(event.date, locale)}
                  <br />
                  {event.startTime ?? dictionary.common.pending}
                </dd>
              </div>
            </div>
            <div className="flex gap-3 text-[var(--ink-soft)]">
              <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" />
              <div>
                <dt className="font-semibold text-[var(--ink)]">{dictionary.eventDetail.where}</dt>
                <dd className="mt-1">{getLocalizedText(event.location, locale)}</dd>
              </div>
            </div>
            {event.speakers.length > 0 && (
              <div className="flex gap-3 text-[var(--ink-soft)]">
                <UserRound size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                <div>
                  <dt className="font-semibold text-[var(--ink)]">{dictionary.eventDetail.speaker}</dt>
                  {event.speakers.map((speaker) => (
                    <dd className="mt-1" key={speaker.name}>
                      {speaker.name}
                      {speaker.role && <><br />{speaker.role}</>}
                      {speaker.institution && <><br />{speaker.institution}</>}
                    </dd>
                  ))}
                </div>
              </div>
            )}
          </dl>
          {registrationAvailable ? (
            <Link href={localizedHref(locale, `/events/${event.id}/register`)} className="btn-primary mt-7">
              {dictionary.eventDetail.register} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          ) : (
            <div className="mt-7 flex flex-col items-start gap-4">
              <p className="border-l-2 border-[var(--gold)] pl-4 text-sm leading-6 text-[var(--ink-soft)]">
                {dictionary.events.registrationUnavailable}
              </p>
              <Link href={localizedHref(locale, `/events/${event.id}/register`)} className="btn-primary">
                {dictionary.eventDetail.earlyRegister} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          )}
        </aside>
      </div>
    </section>
  </>
}
