"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { GraduationCap, Microscope, Building2, Rocket } from "lucide-react"

const SEGMENTS = [
  { key: "students", icon: GraduationCap, accent: "#00ADEF" },
  { key: "researchers", icon: Microscope, accent: "#D4AF37" },
  { key: "industry", icon: Building2, accent: "#00ADEF" },
  { key: "startups", icon: Rocket, accent: "#D4AF37" },
] as const

export function AudienceSection() {
  const t = useTranslations("home.audience")

  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Subtle background glow */}
      <div className="container-page relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">{t("heading")}</h2>
          <div className="w-16 h-1 bg-[var(--accent-secondary)] mx-auto rounded-full" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map(({ key, icon: Icon, accent }) => (
            <div
              key={key}
              className="card p-8 flex flex-col items-start transition-all duration-300 hover:translate-y-[-4px] group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}30`,
                  color: accent,
                }}
              >
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent-secondary)] transition-colors">
                {t(`${key}.title`)}
              </h3>
              <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
                {t(`${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}