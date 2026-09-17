"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import type { Event } from "@/types/event"
import { EventCard } from "./EventCard"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

export function EventsPreview({ events }: { events: Event[] }) {
  const t = useTranslations("home.events_preview")
  const locale = useLocale()

  return (
    <section className="py-24 bg-[#000000] border-b border-white/10 relative">
      <div className="container-page">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                {locale === "en" ? "CALENDAR AND SYMPOSIUMS" : "الأجندة والفعاليات"}
              </span>
            </div>
            <h2 className="editorial-headline text-white">
              {t("heading")}
            </h2>
          </div>
          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white pb-1 border-b border-white/20 hover:border-[#fa8716] transition-all self-start sm:self-auto"
          >
            <span>{t("view_all")}</span>
            <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
          </Link>
        </div>

        {/* Flagship Event Spotlight: Architectural Symposium Spread */}
        <div className="p-8 sm:p-12 md:p-14 mb-16 bg-[#02060B] border border-white/10 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px]">
                <span className="px-2.5 py-1 font-bold bg-[#fa8716] text-black uppercase tracking-wider">
                  {locale === "en" ? "FLAGSHIP SYMPOSIUM 2026" : "المؤتمر السنوي الافتتاحي"}
                </span>
                <span className="px-2.5 py-1 text-slate-300 border border-white/10">
                  {locale === "en" ? "HYBRID · CAIRO AND ONLINE" : "حضور شخصي وعبر الإنترنت"}
                </span>
                <span className="px-2.5 py-1 text-[#00e660] border border-[#00e660]/30">
                  {locale === "en" ? "CALL FOR PAPERS" : "تقديم الأبحاث متاح"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {locale === "en"
                  ? "Inaugural Egyptian Photonics Workshop and Scientific Symposium 2026"
                  : "المؤتمر العلمي وورشة العمل الافتتاحية لعلوم الضوئيات بمصر 2026"}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                {locale === "en"
                  ? "A landmark national gathering uniting university students, optical engineering faculty, telecom operators, and laser industry experts. Featuring technical keynotes, lab demonstrations, and peer-reviewed publication tracks."
                  : "ملتقى علمي وطني يجمع طلاب الجامعات وأعضاء هيئة التدريس وشركات الاتصالات وخبراء صناعة الليزر، يتضمن محاضرات تقنية وتجارب معملية وعروضاً بحثية."}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#fa8716]" />
                  <span>{locale === "en" ? "Season 1 · Nov 2026" : "الموسم الأول · نوفمبر 2026"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#5CB1A2]" />
                  <span>{locale === "en" ? "Cairo University Campus" : "حرم جامعة القاهرة والقاعات المركزية"}</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href={`/${locale}/join`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fa8716] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <span>{locale === "en" ? "Register Early Interest" : "تسجيل الاهتمام المسبق"}</span>
                  <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
                </Link>
              </div>
            </div>

            {/* Right Column: Symposium Tracks Docket */}
            <div className="lg:col-span-4 p-6 bg-[#000000] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[10px]">
                <span className="text-[#fa8716] font-bold tracking-wider uppercase">
                  {locale === "en" ? "TECHNICAL TRACKS" : "محاور المؤتمر"}
                </span>
                <span className="text-slate-500">4 SESSIONS</span>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  locale === "en" ? "Silicon Photonics and PIC Design" : "تصميم رقائق السيليكون الضوئية",
                  locale === "en" ? "Laser Processing and Biophotonics" : "معالجة المواد بالليزر والضوئيات الحيوية",
                  locale === "en" ? "Quantum Optics and Encryption" : "البصريات الكمية والتشفير الآمن",
                  locale === "en" ? "Academic Grants and Fellowships" : "المنح الأكاديمية والزمالات الدولية",
                ].map((track, i) => (
                  <div key={i} className="py-3 flex items-start gap-3 text-xs">
                    <span className="editorial-label text-[#5CB1A2] text-[10px] mt-0.5">
                      {"//"} 0{i + 1}
                    </span>
                    <span className="text-slate-200 font-sans">{track}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regular Events Docket */}
        {events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}