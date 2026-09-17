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
    <section className="py-24 bg-[#010E17] border-b border-[#D4AF37]/20">
      <div className="container-page">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-3">
              <span className="w-1.5 h-1.5 bg-[#fa8716]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
                {locale === "en" ? "Calendar and Roadmap" : "الأجندة والفعاليات"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t("heading")}
            </h2>
          </div>
          <Link href={`/${locale}/events`} className="btn-secondary text-xs py-2.5 px-6 self-start sm:self-auto">
            <span>{t("view_all")}</span>
            <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
          </Link>
        </div>

        {/* Flagship Event Spotlight Card (Akhetonics & Entor Tech Standard) */}
        <div className="reticle-box p-8 md:p-12 mb-12 bg-[#010E17]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-2.5 py-1 text-[11px] font-mono font-bold bg-[#fa8716]/15 text-[#fa8716] border border-[#fa8716]/40">
                  {locale === "en" ? "FLAGSHIP SYMPOSIUM" : "المؤتمر السنوي الافتتاحي"}
                </span>
                <span className="px-2.5 py-1 text-[11px] font-mono bg-white/10 text-slate-300 border border-white/10">
                  {locale === "en" ? "HYBRID · CAIRO and ONLINE" : "حضور شخصي وعبر الإنترنت"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-snug">
                {locale === "en"
                  ? "Inaugural Egyptian Photonics Workshop and Scientific Symposium 2026"
                  : "المؤتمر العلمي وورشة العمل الافتتاحية لعلوم الضوئيات بمصر 2026"}
              </h3>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                {locale === "en"
                  ? "A landmark national gathering uniting university students, optical engineering faculty, telecom operators, and laser industry experts. Featuring technical keynotes, lab demonstrations, and publication tracks."
                  : "ملتقى علمي وطني يجمع طلاب الجامعات وأعضاء هيئة التدريس وشركات الاتصالات وخبراء صناعة الليزر، يتضمن محاضرات تقنية وتجارب معملية وعروضاً بحثية."}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-300 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#fa8716]" />
                  <span>{locale === "en" ? "Season 1 · Nov 2026" : "الموسم الأول · نوفمبر 2026"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#5CB1A2]" />
                  <span>{locale === "en" ? "Cairo University Campus" : "حرم جامعة القاهرة والقاعات المركزية"}</span>
                </div>
              </div>

              <Link href={`/${locale}/join`} className="btn-primary text-xs py-3 px-8">
                <span>{locale === "en" ? "Register Early Interest" : "تسجيل الاهتمام المسبق"}</span>
                <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
              </Link>
            </div>

            <div className="lg:col-span-4 flex flex-col p-6 border border-white/10 bg-black/60">
              <p className="text-[11px] uppercase font-mono font-bold text-[#fa8716] mb-4 pb-2 border-b border-white/10">
                {locale === "en" ? "SYMPOSIUM TRACKS" : "محاور المؤتمر"}
              </p>
              <div className="space-y-0">
                {[
                  locale === "en" ? "Silicon Photonics and PIC Design" : "تصميم رقائق السيليكون الضوئية",
                  locale === "en" ? "Laser Processing and Biophotonics" : "معالجة المواد بالليزر والضوئيات الحيوية",
                  locale === "en" ? "Quantum Optics and Encryption" : "البصريات الكمية والتشفير الآمن",
                  locale === "en" ? "Academic Grants and Fellowships" : "المنح الأكاديمية والزمالات الدولية",
                ].map((track, i) => (
                  <div key={i} className="tech-list-row text-xs py-2.5">
                    <span className="font-mono text-[#5CB1A2] text-[10px]">{"//"} 0{i + 1}</span>
                    <span className="text-slate-200 font-sans">{track}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regular Events (if any) */}
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