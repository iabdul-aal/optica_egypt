import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, UserRound } from "lucide-react"
import { notFound } from "next/navigation"
import { formatEventDate, formatEventFormat, formatEventStatus } from "@/lib/formatting"
import { getAllEvents, getEventById } from "@/lib/events"
import { getDictionary, getLocalizedText, localizedHref } from "@/lib/locales"
import { siteConfig } from "@/lib/site-config"

type EventPageProps = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return getAllEvents().map((event) => ({ id: event.id }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params
  const event = getEventById(id)
  if (!event) return { title: "Event not found" }

  const title = getLocalizedText(event.title, "en")
  const description = getLocalizedText(event.description, "en")
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")
  const eventUrl = `${siteUrl}/events/${event.id}/`

  return {
    title,
    description,
    alternates: {
      canonical: `/events/${event.id}/`,
    },
    openGraph: {
      type: "article",
      title: `${title} | Optica Egypt Local Section`,
      description,
      url: eventUrl,
      images: [
        {
          url: `${siteUrl}/assets/brand/optica-egypt-logo.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Optica Egypt`,
      description,
      images: [`${siteUrl}/assets/brand/optica-egypt-logo.png`],
    },
  }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params
  const dictionary = getDictionary("en")
  const event = getEventById(id)
  if (!event) notFound()

  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")
  const registrationAvailable = event.status === "registration_open" || event.status === "registration_closing"

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: getLocalizedText(event.title, "en"),
    description: getLocalizedText(event.description, "en"),
    startDate: event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      event.format === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : event.format === "hybrid"
          ? "https://schema.org/MixedEventAttendanceMode"
          : "https://schema.org/OfflineEventAttendanceMode",
    location:
      event.format === "online"
        ? {
            "@type": "VirtualLocation",
            url: `${siteUrl}/events/${event.id}/`,
          }
        : {
            "@type": "Place",
            name: getLocalizedText(event.location, "en"),
            address: {
              "@type": "PostalAddress",
              addressLocality: "Cairo",
              addressCountry: "EG",
            },
          },
    image: [`${siteUrl}/assets/brand/optica-egypt-logo.png`],
    organizer: {
      "@type": "Organization",
      name: "Optica Egypt Local Section",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/events/${event.id}/register/`,
      price: "0",
      priceCurrency: "USD",
      availability: registrationAvailable ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    },
    performer: event.speakers.map((speaker) => ({
      "@type": "Person",
      name: speaker.name,
      jobTitle: speaker.role || undefined,
      worksFor: speaker.institution
        ? {
            "@type": "Organization",
            name: speaker.institution,
          }
        : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <section className="scientific-grid border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="container-page py-10 sm:py-14">
          <Link href={localizedHref("en", "/events")} className="text-link">
            <ArrowLeft size={14} aria-hidden="true" /> {dictionary.eventDetail.backToEvents}
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="eyebrow">{formatEventStatus(event.status, "en")} / {formatEventFormat(event.format, "en")}</p>
              <h1 className="display-title mt-4 max-w-3xl text-[clamp(2.35rem,4.8vw,4.8rem)]">
                {getLocalizedText(event.title, "en")}
              </h1>
            </div>
            <div className="border-l-0 border-[var(--line)] pt-1 lg:border-l lg:pl-8">
              <p className="font-mono text-xl font-bold text-[var(--gold)]">
                {formatEventDate(event.date, "en", { weekday: "long" })}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                {event.startTime ?? dictionary.common.pending}
                {event.timezone ? ` ${event.timezone}` : ""}{" "}
                <span className="mx-2 text-[var(--gold)]">/</span>{" "}
                {getLocalizedText(event.location, "en")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <article>
            <p className="eyebrow">{dictionary.eventDetail.aboutEyebrow}</p>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-[var(--ink-soft)]">
              {getLocalizedText(event.description, "en")}
            </p>
            {event.tags.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-2 border-t border-[var(--line)] pt-5">
                {event.tags.map((tag) => (
                  <span className="border border-[var(--line)] px-3 py-1.5 text-xs font-bold tracking-wide text-[var(--gold-pale)]" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
          <aside className="border-y border-[var(--line)] py-6">
            <p className="eyebrow">{dictionary.eventDetail.informationEyebrow}</p>
            <dl className="mt-5 grid gap-5 text-sm">
              <div className="flex gap-3 text-[var(--ink-soft)]">
                <CalendarDays size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                <div>
                  <dt className="font-semibold text-[var(--ink)]">{dictionary.eventDetail.when}</dt>
                  <dd className="mt-1">
                    {formatEventDate(event.date, "en")}
                    <br />
                    {event.startTime ?? dictionary.common.pending}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3 text-[var(--ink-soft)]">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                <div>
                  <dt className="font-semibold text-[var(--ink)]">{dictionary.eventDetail.where}</dt>
                  <dd className="mt-1">{getLocalizedText(event.location, "en")}</dd>
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
              <Link href={localizedHref("en", `/events/${event.id}/register`)} className="btn-primary mt-7">
                {dictionary.eventDetail.register} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ) : (
              <div className="mt-7 flex flex-col items-start gap-4">
                <p className="border-l-2 border-[var(--gold)] pl-4 text-sm leading-6 text-[var(--ink-soft)]">
                  {dictionary.events.registrationUnavailable}
                </p>
                <Link href={localizedHref("en", `/events/${event.id}/register`)} className="btn-primary">
                  {dictionary.eventDetail.earlyRegister} <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}
