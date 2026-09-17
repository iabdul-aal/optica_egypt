"use client"

import React from "react"
import { useTranslations } from "next-intl"
import type { NewsItem } from "@/types/news"
import { ArrowRight, Radio } from "lucide-react"
import Link from "next/link"

export function NewsSection({ news }: { news: NewsItem[] }) {
  const t = useTranslations("home.news")

  return (
    <section className="py-24 bg-[#000000] border-t border-white/10 relative">
      <div className="container-page">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Radio size={12} className="text-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                DISPATCHES AND BULLETINS
              </span>
            </div>
            <h2 className="editorial-headline text-white">
              {t("heading")}
            </h2>
          </div>
          <span className="editorial-label text-slate-500">
            DISPATCH FREQUENCY: BI-WEEKLY // ARCHIVE: LIVE
          </span>
        </div>

        {/* 3-Column Editorial Gazette Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
          {news.map((item) => {
            const title = item.title.en
            const summary = item.summary.en

            return (
              <div
                key={item.id}
                className="py-8 px-6 md:px-8 flex flex-col justify-between group hover:bg-white/[0.015] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 font-mono text-[10px]">
                    <span className="editorial-label text-[#fa8716] font-bold">
                      [{item.category.toUpperCase()}]
                    </span>
                    <span className="text-slate-400">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg sm:text-xl mb-3 leading-snug text-white group-hover:text-[#fa8716] transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8 font-light">
                    {summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                  <Link href="/events" className="inline-flex items-center gap-2 uppercase tracking-wider text-[11px]">
                    <span>Read Dispatch</span>
                    <ArrowRight size={13} />
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