import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { EventRegistrationForm } from "@/components/sections/EventRegistrationForm"
import { getEventById } from "@/lib/events"
import { siteConfig } from "@/lib/site-config"

type EventRegistrationPageProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: EventRegistrationPageProps): Promise<Metadata> {
  const { id } = await params
  const event = getEventById(id)
  return event ? { title: `Register — ${event.title.en}` } : { title: "Event registration" }
}

export default async function EventRegistrationPage({ params }: EventRegistrationPageProps) {
  const { id } = await params
  const event = getEventById(id)
  if (!event) notFound()

  return <section className="section-space scientific-grid min-h-[70vh]"><div className="container-page grid gap-12 lg:grid-cols-[.86fr_1.14fr]"><div><Link href={`/events/${event.id}`} className="text-link"><ArrowLeft size={14} /> Event details</Link><p className="eyebrow mt-10">Event registration</p><h1 className="section-title mt-3">{event.title.en}</h1><div className="mt-7 border-y border-white/15 py-5 text-sm leading-6 text-[var(--ink-soft)]"><p>{event.date} <span className="mx-2 text-[var(--gold)]">/</span> {event.time}</p><p className="mt-2">{event.location.en}</p></div></div><div className="border-y border-white/15 py-8 sm:px-2"><EventRegistrationForm eventTitle={event.title.en} eventDate={event.date} email={siteConfig.email} /></div></div></section>
}
