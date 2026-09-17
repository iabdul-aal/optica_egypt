"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import type { NewsItem } from "@/types/news"
import { Badge } from "@/components/ui/Badge"
import { Calendar, ArrowRight } from "lucide-react"

export function NewsSection({ news }: { news: NewsItem[] }) {
  const t = useTranslations("home.news")
  const tc = useTranslations("common")
  const locale = useLocale()

  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container-page">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("heading")}</h2>
          <div className="w-12 h-1 bg-[var(--accent)] rounded-full mt-3" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => {
            const title = item.title[locale as "en" | "ar"] || item.title.en
            const summary = item.summary[locale as "en" | "ar"] || item.summary.en

            return (
              <div key={item.id} className="card p-6 flex flex-col justify-between h-full transition-all duration-300 hover:translate-y-[-4px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="gold" className="capitalize text-xs">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                      <Calendar size={13} />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2.5 leading-snug">{title}</h3>
                  <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-4">
                    {summary}
                  </p>
                </div>

                {item.url && (
                  <a
                    href={item.url}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors pt-3 border-t border-[var(--border)]"
                  >
                    <span>{tc("read_more")}</span>
                    <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}