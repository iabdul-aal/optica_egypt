"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import type { NewsItem } from "@/types/news"
import { Calendar, ArrowRight, Radio } from "lucide-react"
import Link from "next/link"

export function NewsSection({ news }: { news: NewsItem[] }) {
  const t = useTranslations("home.news")
  const locale = useLocale()

  return (
    <section className="py-24 bg-[#000000] border-t border-white/10 relative overflow-hidden">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
              <Radio size={12} className="text-[#fa8716] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
                {locale === "en" ? "DISPATCHES & BULLETINS" : "النشرات والبيانات الرسمية"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t("heading")}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            DISPATCH FREQUENCY: WEEKLY
          </span>
        </div>

        {/* 3-Column Akhetonics Technical Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => {
            const title = item.title[locale as "en" | "ar"] || item.title.en
            const summary = item.summary[locale as "en" | "ar"] || item.summary.en

            return (
              <div
                key={item.id}
                className="relative p-7 rounded-none border border-white/10 hover:border-[#fa8716] bg-[#010E17] flex flex-col justify-between h-full transition-all duration-300 group hover:shadow-[0_0_20px_rgba(250,135,22,0.15)]"
              >
                <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono opacity-30 group-hover:opacity-100 transition-opacity">+</span>
                <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono opacity-30 group-hover:opacity-100 transition-opacity">+</span>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fa8716]/15 text-[#fa8716] border border-[#fa8716]/30">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <Calendar size={13} className="text-[#00B4FF]" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base md:text-lg mb-2.5 leading-snug text-white group-hover:text-[#fa8716] transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 font-light">
                    {summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#00B4FF] group-hover:text-[#fa8716] transition-colors">
                  <Link href={`/${locale}/events`} className="inline-flex items-center gap-1.5">
                    <span>{locale === "en" ? "Read Details" : "تفاصيل الإعلان"}</span>
                    <ArrowRight size={13} className={locale === "ar" ? "rotate-180" : ""} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}