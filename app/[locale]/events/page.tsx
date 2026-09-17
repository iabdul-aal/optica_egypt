import { Calendar, Compass } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getAllEvents } from "@/lib/events"
import { EventCard } from "@/components/sections/EventCard"
import { BeamSection } from "@/components/sections/BeamSection"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "events" })
  return {
    title: t("heading"),
    description: t("subheading"),
  }
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "events" })
  const events = getAllEvents()

  const now = new Date()
  const upcoming = events.filter((e) => new Date(e.date) >= now)
  const past = events.filter((e) => new Date(e.date) < now)

  return (
    <div className="section container-page py-16">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">{t("heading")}</h1>
        <p className="text-[var(--foreground-muted)] text-lg leading-relaxed">{t("subheading")}</p>
      </div>

      {/* 3D Scene C: Laser Beamsplitter */}
      <BeamSection />

      <hr className="divider-gold mb-12" />

      {/* Upcoming Events Section */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="text-[var(--accent-secondary)]" size={20} />
          <h2 className="text-2xl font-bold text-[var(--accent-secondary)]">{t("filter_upcoming")}</h2>
        </div>

        {upcoming.length === 0 ? (
          <div className="empty-state p-12 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="w-12 h-12 rounded-full bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--accent-secondary)]">
              <Compass size={22} />
            </div>
            <p className="text-[var(--foreground-muted)] max-w-md mx-auto text-base leading-relaxed">
              {t("empty_upcoming")}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      {/* Past Events Section (if any) */}
      {past.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6 text-[var(--foreground-muted)]">{t("filter_past")}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}