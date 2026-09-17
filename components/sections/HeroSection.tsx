"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import 3D FiberScene to keep initial bundle ultra-fast
const FiberScene = dynamic(
  () => import("@/components/3d/FiberScene").then((mod) => mod.FiberScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-[#09131F]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-secondary)] border-t-transparent animate-spin" />
      </div>
    ),
  }
)

export function HeroSection() {
  const t = useTranslations("home.hero")
  const locale = useLocale()

  return (
    <section
      style={{ borderBottom: "1px solid var(--border)", background: "var(--background)" }}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Background Ambient Optics Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ADEF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-page py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Text Content (Left 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <p className="text-[var(--accent)] text-xs font-semibold uppercase tracking-wider">
              {t("eyebrow")}
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] whitespace-pre-line">
            {t("title")}
          </h1>

          <p className="text-[var(--foreground-muted)] text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-normal">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link href={`/${locale}/join`} className="btn-primary text-base py-3 px-8 shadow-lg shadow-[#00ADEF]/15">
              {t("cta_primary")}
            </Link>
            <Link href={`/${locale}/events`} className="btn-secondary text-base py-3 px-8">
              {t("cta_secondary")}
            </Link>
          </div>
        </div>

        {/* 3D Scene A: Fiber Optic River (Right 5 Cols) */}
        <div className="lg:col-span-5 w-full h-[380px] sm:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl relative bg-[#09131F]">
          <FiberScene className="w-full h-full" />
        </div>
      </div>
    </section>
  )
}