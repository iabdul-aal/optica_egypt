"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const SEGMENTS = [
  {
    key: "students",
    id: "01",
    tag: "TALENT AND ACADEMY",
    focus: "Undergraduate and Graduate Students",
  },
  {
    key: "researchers",
    id: "02",
    tag: "R AND D LABS",
    focus: "Faculty and Principal Investigators",
  },
  {
    key: "industry",
    id: "03",
    tag: "TELECOM AND INDUSTRY",
    focus: "Fiber Optics and Semiconductor Engineers",
  },
  {
    key: "startups",
    id: "04",
    tag: "DEEPTECH VENTURES",
    focus: "Hardware Prototyping and Spinouts",
  },
] as const

export function AudienceSection() {
  const t = useTranslations("home.audience")

  return (
    <section className="py-24 bg-[#000000] border-b border-white/10 relative">
      <div className="container-page">
        {/* Asymmetric Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authoritative Editorial Manifesto */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                NATIONAL ECOSYSTEM
              </span>
            </div>

            <h2 className="editorial-headline text-white">
              {t("heading")}
            </h2>

            <p className="editorial-lead text-slate-400">
              Connecting Egypt&apos;s scientific capacity directly to the global photonics frontier. Four specialized pathways designed to eliminate research silos and accelerate industrial innovation.
            </p>

            <div className="pt-6 border-t border-white/10 flex items-center gap-4 text-[10px] font-mono text-slate-500">
              <span>STATUS: OPEN ACCESS</span>
              <span>{"//"}</span>
              <span>100% SUBSIDIZED</span>
            </div>
          </div>

          {/* Right Column: Architectural Cohort Ledger */}
          <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
            {SEGMENTS.map(({ key, id, tag, focus }) => (
              <div
                key={key}
                className="py-8 sm:py-10 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  {/* Left Metadata Indicator */}
                  <div className="shrink-0 space-y-1">
                    <span className="editorial-label text-[#fa8716] font-bold">
                      {"//"} {id}
                    </span>
                    <p className="editorial-label text-[10px] text-slate-500">
                      {tag}
                    </p>
                  </div>

                  {/* Center Content */}
                  <div className="flex-1 max-w-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#fa8716] transition-colors">
                        {t(`${key}.title`)}
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-slate-500">
                      {focus}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed font-light pt-2">
                      {t(`${key}.body`)}
                    </p>
                  </div>

                  {/* Right Action */}
                  <div className="shrink-0 sm:self-center">
                    <Link
                      href="/community"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 group-hover:text-white py-2 px-3 border border-white/10 group-hover:border-[#fa8716] transition-all"
                    >
                      <span>Explore</span>
                      <ArrowUpRight size={14} className="text-[#fa8716]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}