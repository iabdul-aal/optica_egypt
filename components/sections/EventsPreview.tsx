"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import type { Event } from "@/types/event"
import { EventCard } from "./EventCard"
import { Calendar, MapPin, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"

export function EventsPreview({ events }: { events: Event[] }) {
  const t = useTranslations("home.events_preview")
  const locale = useLocale()

  return (
    <section className="py-24 bg-[#010E17] border-b border-[#D4AF37]/20">
      <div className="container-page">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#D4AF37]/30 mb-3">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                {locale === "en" ? "Calendar & Roadmap" : "الأجندة والفعاليات"}
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

        {/* Flagship Event Spotlight Card (Entor Tech & Modern style) */}
        <div className="glass-panel-gold p-8 md:p-12 mb-12 relative overflow-hidden bg-[#02121C]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                  {locale === "en" ? "FLAGSHIP SYMPOSIUM" : "المؤتمر السنوي الافتتاحي"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-slate-300">
                  {locale === "en" ? "HYBRID · CAIRO & ONLINE" : "حضور شخصي وعبر الإنترنت"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-snug">
                {locale === "en"
                  ? "Inaugural Egyptian Photonics Workshop & Scientific Symposium 2026"
                  : "المؤتمر العلمي وورشة العمل الافتتاحية لعلوم الضوئيات بمصر 2026"}
              </h3>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                {locale === "en"
                  ? "A landmark national gathering uniting university students, optical engineering faculty, telecom operators, and laser industry experts. Featuring technical keynotes, lab demonstrations, and publication tracks."
                  : "ملتقى علمي وطني يجمع طلاب الجامعات وأعضاء هيئة التدريس وشركات الاتصالات وخبراء صناعة الليزر، يتضمن محاضرات تقنية وتجارب معملية وعروضاً بحثية."}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#D4AF37]" />
                  <span>{locale === "en" ? "Season 1 · Nov 2026" : "الموسم الأول · نوفمبر 2026"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#00B4FF]" />
                  <span>{locale === "en" ? "Cairo University Campus" : "حرم جامعة القاهرة والقاعات المركزية"}</span>
                </div>
              </div>

              <Link href={`/${locale}/join`} className="btn-primary text-xs py-3 px-8">
                <span>{locale === "en" ? "Register Early Interest" : "تسجيل الاهتمام المسبق"}</span>
                <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
              </Link>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 p-6 rounded-2xl bg-[#010E17]/80 border border-white/10">
              <p className="text-xs uppercase font-mono font-bold text-[#D4AF37] mb-2">
                {locale === "en" ? "SYMPOSIUM TRACKS" : "محاور المؤتمر"}
              </p>
              {[
                locale === "en" ? "Silicon Photonics & PIC Design" : "تصميم رقائق السيليكون الضوئية",
                locale === "en" ? "Laser Processing & Biophotonics" : "معالجة المواد بالليزر والضوئيات الحيوية",
                locale === "en" ? "Quantum Optics & Encryption" : "البصريات الكمية والتشفير الآمن",
                locale === "en" ? "Academic Grants & Fellowships" : "المنح الأكاديمية والزمالات الدولية",
              ].map((track, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={14} className="text-[#00B4FF] shrink-0" />
                  <span>{track}</span>
                </div>
              ))}
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