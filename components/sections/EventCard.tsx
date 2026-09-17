"use client"

import React from "react"
import type { Event } from "@/types/event"
import { useTranslations, useLocale } from "next-intl"
import { MapPin, ExternalLink, User } from "lucide-react"
import Link from "next/link"

export function EventCard({ event }: { event: Event }) {
  const t = useTranslations("events")
  const locale = useLocale()

  const title = event.title[locale as "en" | "ar"] || event.title.en
  const description = event.description[locale as "en" | "ar"] || event.description.en
  const location = event.location[locale as "en" | "ar"] || event.location.en

  return (
    <div className="p-6 sm:p-8 bg-[#02060B] border border-white/10 hover:border-[#fa8716] flex flex-col justify-between h-full transition-all group">
      <div>
        {/* Top Telemetry Row */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10 font-mono text-[10px]">
          <span className="editorial-label text-[#fa8716] font-bold">
            [{event.type.toUpperCase()}]
          </span>
          <span className="text-slate-400">
            {event.date}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-lg sm:text-xl mb-3 leading-snug text-white group-hover:text-[#fa8716] transition-colors">
          {title}
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
          {description}
        </p>
      </div>

      {/* Speaker and Venue Metadata */}
      <div className="pt-4 border-t border-white/10 mt-auto space-y-3 text-xs font-mono">
        {event.speaker && (
          <div className="flex items-center gap-2 text-slate-300">
            <User size={13} className="text-[#fa8716] shrink-0" />
            <span className="truncate">{event.speaker.name} · {event.speaker.institution}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-slate-400">
          <MapPin size={13} className="text-[#5CB1A2] shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {event.registrationUrl && (
          <div className="pt-3">
            <Link
              href={`/${locale}${event.registrationUrl}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-mono uppercase tracking-wider bg-white/[0.03] hover:bg-[#fa8716] text-white hover:text-black border border-white/10 hover:border-[#fa8716] transition-all"
            >
              <span>{t("register")}</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}