import type { Event } from "@/types/event"
import { Badge } from "@/components/ui/Badge"
import { useTranslations } from "next-intl"

export function EventCard({ event }: { event: Event }) {
  const t = useTranslations("events")
  return (
    <div className="card p-6 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="teal">{event.type}</Badge>
        <span className="text-xs text-muted">{event.date}</span>
      </div>
      <h3 className="font-semibold mb-2 leading-snug flex-1">{event.title.en}</h3>
      <p className="text-muted text-sm leading-relaxed mb-4">{event.description.en}</p>
      <p className="text-xs text-muted">{event.location.en}</p>
      {event.registrationUrl && (
        <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 text-sm justify-center">
          {t("register")}
        </a>
      )}
    </div>
  )
}