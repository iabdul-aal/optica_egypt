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
    <div className="reticle-box p-6 border border-white/10 hover:border-[#fa8716] bg-[#02060B] flex flex-col justify-between h-full transition-colors duration-150">
      <div>
        <div className="flex items-center justify-between mb-4 gap-2">
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fa8716]/10 text-[#fa8716] border border-[#fa8716]/30">
            [ {event.type.toUpperCase()} ]
          </span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <span className="text-[#5CB1A2] font-mono">{"//"}</span>
            <span>{event.date}</span>
          </div>
        </div>

        <h3 className="font-bold text-base md:text-lg mb-2.5 leading-snug text-white">
          {title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-5 font-light line-clamp-3">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-white/10 mt-auto space-y-2.5">
        {event.speaker && (
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
            <User size={12} className="text-[#fa8716] shrink-0" />
            <span className="truncate">{event.speaker.name} · {event.speaker.institution}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <MapPin size={12} className="text-[#5CB1A2] shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {event.registrationUrl && (
          <Link
            href={`/${locale}${event.registrationUrl}`}
            className="btn-primary text-xs py-2 w-full justify-center flex items-center gap-2 mt-3"
          >
            <span>{t("register")}</span>
            <ExternalLink size={12} />
          </Link>
        )}
      </div>
    </div>
  )
}