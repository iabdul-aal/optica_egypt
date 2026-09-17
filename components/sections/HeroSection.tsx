"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ArrowRight, Sparkles } from "lucide-react"

const FiberScene = dynamic(
  () => import("@/components/3d/FiberScene").then((mod) => mod.FiberScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-[#010F14]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-secondary)] border-t-transparent animate-spin" />
      </div>
    ),
  }
)

export function HeroSection() {
  const t = useTranslations("home.hero")
  const locale = useLocale()

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#010F14] border-b border-[var(--border)]">
      {/* Background Pyramids Sunset & Golden Wave Layer (from official brand sheet) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <Image
          src="/assets/brand/egypt/hero/optica-egypt-hero-banner.png"
          alt="Giza Pyramids and Optics Wave"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010F14] via-[#010F14]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010F14] via-transparent to-[#010F14]/70" />
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00B4FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-page py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Column: Typography & CTAs (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Section Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1F26]/90 border border-[var(--border)] mb-6 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-[var(--accent-secondary)]" />
            <p className="text-[var(--accent-secondary)] text-xs font-bold uppercase tracking-wider">
              {t("eyebrow")}
            </p>
          </div>

          {/* Heading with Two-Tone White & Gold */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15]">
            <span className="text-white block">
              {locale === "en" ? "Connecting Talent." : "ربط الكفاءات."}
            </span>
            <span className="text-gold-gradient block mt-1">
              {locale === "en" ? "Advancing Photonics." : "وتطوير علوم الضوئيات."}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[var(--foreground-muted)] text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-normal">
            {t("subtitle")}
          </p>

          {/* Pill CTA Buttons with Icons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link href={`/${locale}/join`} className="btn-primary py-3.5 px-8 text-base">
              <span>{t("cta_primary")}</span>
              <ArrowRight size={18} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
            <Link href={`/${locale}/events`} className="btn-secondary py-3.5 px-8 text-base">
              <span>{t("cta_secondary")}</span>
              <ArrowRight size={18} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Scene A (5 Cols) */}
        <div className="lg:col-span-5 w-full h-[380px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl relative bg-[#010F14]/80 backdrop-blur-sm group">
          <FiberScene className="w-full h-full" />
          <div className="absolute bottom-3 right-4 pointer-events-none text-[10px] uppercase tracking-widest text-[#D4AF37]/60 font-semibold">
            3D Fiber River
          </div>
        </div>
      </div>
    </section>
  )
}