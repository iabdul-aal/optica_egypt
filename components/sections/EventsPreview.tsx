"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import type { Event } from "@/types/event"
import { EventCard } from "./EventCard"
import { Calendar } from "lucide-react"

export function EventsPreview({ events }: { events: Event[] }) {
  const t = useTranslations("home.events_preview")
  const locale = useLocale()

  return (
    <section className="section container-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("heading")}</h2>
          <div className="w-12 h-1 bg-[var(--accent-secondary)] rounded-full mt-3" />
        </div>
        <Link href={`/${locale}/events`} className="btn-secondary text-sm py-2 px-4 self-start sm:self-auto">
          {t("view_all")}
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="empty-state p-12 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="w-12 h-12 rounded-full bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--accent-secondary)]">
            <Calendar size={22} />
          </div>
          <p className="text-[var(--foreground-muted)] max-w-md mx-auto text-base leading-relaxed">
            {t("empty")}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </section>
  )
}