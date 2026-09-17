import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Link from "next/link"
import type { Event } from "@/types/event"

export function EventsPreview({ events }: { events: Event[] }) {
  const t = useTranslations("home.events_preview")
  const locale = useLocale()
  return (
    <section className="section container-page">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl font-bold">{t("heading")}</h2>
        <Link href={`/${locale}/events`} className="btn-secondary text-sm">{t("view_all")}</Link>
      </div>
      {events.length === 0 ? (
        <div className="empty-state">
          <p>{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {events.map(e => (
            <div key={e.id} className="card p-6">
              <p className="text-xs text-muted mb-2">{e.date}</p>
              <h3 className="font-semibold mb-2">{e.title.en}</h3>
              <p className="text-muted text-sm leading-relaxed">{e.description.en}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}