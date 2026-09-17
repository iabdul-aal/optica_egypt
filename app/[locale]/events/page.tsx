import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { getAllEvents } from "@/lib/events"
import { EventCard } from "@/components/sections/EventCard"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "events" })
  return { title: t("heading") }
}

export default function EventsPage() {
  const t = useTranslations("events")
  const events = getAllEvents()
  const now = new Date()
  const upcoming = events.filter(e => new Date(e.date) >= now)
  const past = events.filter(e => new Date(e.date) < now)

  return (
    <div className="section container-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">{t("heading")}</h1>
      <p className="text-muted mb-8">{t("subheading")}</p>
      <hr className="divider-gold mb-10" />

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6 text-gold">{t("filter_upcoming")}</h2>
        {upcoming.length === 0 ? (
          <div className="empty-state">
            <p>{t("empty_upcoming")}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-6 text-muted">{t("filter_past")}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </section>
      )}
    </div>
  )
}