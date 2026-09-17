"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { GraduationCap, Microscope, Building2, Rocket, ArrowUpRight } from "lucide-react"

const SEGMENTS = [
  {
    key: "students",
    icon: GraduationCap,
    accent: "#00B4FF",
    tag: "TALENT and ACADEMY",
  },
  {
    key: "researchers",
    icon: Microscope,
    accent: "#D4AF37",
    tag: "R and D LABS",
  },
  {
    key: "industry",
    icon: Building2,
    accent: "#00B4FF",
    tag: "TELECOM and INDUSTRY",
  },
  {
    key: "startups",
    icon: Rocket,
    accent: "#D4AF37",
    tag: "DEEPTECH VENTURES",
  },
] as const

export function AudienceSection() {
  const t = useTranslations("home.audience")
  const locale = useLocale()

  return (
    <section className="py-20 bg-[#000000] border-b border-white/10 relative overflow-hidden">
      <div className="container-page relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/10 mb-3">
              <span className="w-1.5 h-1.5 bg-[#fa8716]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#fa8716]">
                {locale === "en" ? "National Ecosystem" : "المنظومة الوطنية"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t("heading")}
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed font-mono">
            {locale === "en"
              ? "Bridging Egypt’s scientific potential with real-world optical engineering opportunities."
              : "تمكين الكفاءات المصرية وربط الأبحاث الأكاديمية بالصناعات المتقدمة."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map(({ key, icon: Icon, tag }, idx) => (
            <div
              key={key}
              className="reticle-box p-6 border border-white/10 hover:border-[#fa8716] bg-[#02060B] flex flex-col justify-between transition-colors duration-150"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                  <div className="tech-icon-box">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-slate-500">
                    {"//"} 0{idx + 1}
                  </span>
                </div>

                <p className="text-[10px] font-mono uppercase tracking-widest text-[#fa8716] mb-2">
                  {tag}
                </p>

                <h3 className="text-lg font-bold text-white mb-3">
                  {t(`${key}.title`)}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">
                  {t(`${key}.body`)}
                </p>
              </div>

              <Link
                href={`/${locale}/community`}
                className="inline-flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-[#fa8716] pt-3 border-t border-white/10 transition-colors"
              >
                <span>{locale === "en" ? "Explore Pathway" : "استكشف المسار"}</span>
                <ArrowUpRight size={14} className="text-[#fa8716]" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}