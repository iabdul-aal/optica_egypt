"use client"

import React from "react"
import type { Event } from "@/types/event"
import { Badge } from "@/components/ui/Badge"
import { useTranslations, useLocale } from "next-intl"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

export function EventCard({ event }: { event: Event }) {
  const t = useTranslations("events")
  const locale = useLocale()

  const title = event.title[locale as "en" | "ar"] || event.title.en
  const description = event.description[locale as "en" | "ar"] || event.description.en
  const location = event.location[locale as "en" | "ar"] || event.location.en

  return (
    <div className="card p-6 flex flex-col justify-between h-full transition-all duration-300 hover:translate-y-[-4px]">
      <div>
        <div className="flex items-center justify-between mb-4 gap-2">
          <Badge variant="teal" className="capitalize text-xs font-semibold">
            {event.type}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Calendar size={14} />
            <span>{event.date}</span>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2 leading-snug">{title}</h3>
        <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--border)] mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)] mb-4">
          <MapPin size={14} className="text-[var(--accent-secondary)]" />
          <span className="truncate">{location}</span>
        </div>

        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2 w-full justify-center flex items-center gap-2"
          >
            <span>{t("register")}</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  )
}