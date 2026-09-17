"use client"

import React from "react"
import type { Event } from "@/types/event"
import { useTranslations, useLocale } from "next-intl"
import { Calendar, MapPin, ExternalLink, User } from "lucide-react"
import Link from "next/link"

export function EventCard({ event }: { event: Event }) {
  const t = useTranslations("events")
  const locale = useLocale()

  const title = event.title[locale as "en" | "ar"] || event.title.en
  const description = event.description[locale as "en" | "ar"] || event.description.en
  const location = event.location[locale as "en" | "ar"] || event.location.en

  return (
    <div className="relative group p-6 rounded-none border border-white/10 hover:border-[#fa8716] bg-[#010E17] flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,135,22,0.15)]">
      {/* Corner crosshairs */}
      <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono opacity-30 group-hover:opacity-100 transition-opacity">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono opacity-30 group-hover:opacity-100 transition-opacity">+</span>

      <div>
        <div className="flex items-center justify-between mb-4 gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fa8716]/15 text-[#fa8716] border border-[#fa8716]/30">
            {event.type}
          </span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Calendar size={13} className="text-[#00B4FF]" />
            <span>{event.date}</span>
          </div>
        </div>

        <h3 className="font-bold text-base md:text-lg mb-2.5 leading-snug text-white group-hover:text-[#fa8716] transition-colors">
          {title}
        </h3>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-5 font-light line-clamp-3">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-white/10 mt-auto space-y-3">
        {event.speaker && (
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
            <User size={13} className="text-[#fa8716] shrink-0" />
            <span className="truncate">{event.speaker.name} · {event.speaker.institution}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <MapPin size={13} className="text-[#00B4FF] shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {event.registrationUrl && (
          <Link
            href={`/${locale}${event.registrationUrl}`}
            className="btn-primary text-xs py-2 w-full justify-center flex items-center gap-2 mt-2"
          >
            <span>{t("register")}</span>
            <ExternalLink size={13} />
          </Link>
        )}
      </div>
    </div>
  )
}