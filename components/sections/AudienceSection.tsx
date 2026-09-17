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
    <section className="py-24 bg-[#02121C] border-b border-[#D4AF37]/20 relative overflow-hidden">
      <div className="container-page relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#D4AF37]/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00B4FF]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                {locale === "en" ? "National Ecosystem" : "المنظومة الوطنية"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t("heading")}
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
            {locale === "en"
              ? "Bridging Egypt’s scientific potential with real-world optical engineering opportunities."
              : "تمكين الكفاءات المصرية وربط الأبحاث الأكاديمية بالصناعات المتقدمة."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map(({ key, icon: Icon, accent, tag }) => (
            <div
              key={key}
              className="relative group p-8 rounded-none border border-white/10 hover:border-[#fa8716] bg-[#010E17] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,135,22,0.15)]"
            >
              {/* Technical crosshair markings (Akhetonics style) */}
              <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono opacity-40 group-hover:opacity-100 transition-opacity">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono opacity-40 group-hover:opacity-100 transition-opacity">+</span>

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div
                    className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      background: `${accent}15`,
                      border: `1px solid ${accent}35`,
                      color: accent,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400">
                    {tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#fa8716] transition-colors">
                  {t(`${key}.title`)}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                  {t(`${key}.body`)}
                </p>
              </div>

              <Link
                href={`/${locale}/community`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00B4FF] group-hover:text-[#fa8716] pt-4 border-t border-white/10 transition-colors"
              >
                <span>{locale === "en" ? "Explore Pathway" : "استكشف المسار"}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}