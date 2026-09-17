"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import type { NewsItem } from "@/types/news"
import { ArrowRight, Radio } from "lucide-react"
import Link from "next/link"

export function NewsSection({ news }: { news: NewsItem[] }) {
  const t = useTranslations("home.news")
  const locale = useLocale()

  return (
    <section className="py-24 bg-[#000000] border-t border-white/10 relative overflow-hidden">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/10 mb-3">
              <Radio size={12} className="text-[#fa8716]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#fa8716]">
                {locale === "en" ? "DISPATCHES and BULLETINS" : "النشرات والبيانات الرسمية"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t("heading")}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            DISPATCH FREQUENCY: WEEKLY
          </span>
        </div>

        {/* 3-Column Akhetonics Technical Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {news.map((item) => {
            const title = item.title[locale as "en" | "ar"] || item.title.en
            const summary = item.summary[locale as "en" | "ar"] || item.summary.en

            return (
              <div
                key={item.id}
                className="reticle-box p-6 border border-white/10 hover:border-[#fa8716] bg-[#02060B] flex flex-col justify-between h-full transition-colors duration-150"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fa8716]/10 text-[#fa8716] border border-[#fa8716]/30">
                      [ {item.category.toUpperCase()} ]
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <span className="text-[#5CB1A2] font-mono">{"//"}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base md:text-lg mb-2 leading-snug text-white">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">
                    {summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300 hover:text-[#fa8716] transition-colors">
                  <Link href={`/${locale}/events`} className="inline-flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <span>{locale === "en" ? "Read Details" : "تفاصيل الإعلان"}</span>
                    <ArrowRight size={12} className={locale === "ar" ? "rotate-180" : ""} />
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