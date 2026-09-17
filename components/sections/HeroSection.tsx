"use client"

import React from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Cpu, Radio, Zap, Globe2 } from "lucide-react"

const TAGS = [
  { label: "#Photonics", icon: Zap },
  { label: "#Optics", icon: Radio },
  { label: "#IntegratedCircuits", icon: Cpu },
  { label: "#Egypt2026", icon: Globe2 },
]

export function HeroSection() {
  const t = useTranslations("home.hero")
  const locale = useLocale()

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#000000] bg-tech-grid border-b border-white/10 pt-12 pb-20">
      {/* Subtle Background Pyramids Sunset Layer (hidden on Arabic to prevent text bleed) */}
      <div className={`absolute inset-0 z-0 pointer-events-none mix-blend-screen ${locale === "ar" ? "hidden" : "opacity-20"}`}>
        <Image
          src="/assets/brand/egypt/hero/optica-egypt-hero-banner.png"
          alt="Giza Pyramids and Optics Wave"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/90 to-[#000000]/70" />
      </div>

      <div className="container-page relative z-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Typography & CTAs (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Official Chapter Eyebrow Tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/[0.03] border border-white/15 mb-8">
            <span className="w-1.5 h-1.5 bg-[#fa8716]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#fa8716]">
              {t("eyebrow")}
            </span>
            <span className="text-white/20 font-mono">/</span>
            <span className="text-[10px] font-mono tracking-wider text-slate-400">
              {locale === "en" ? "OFFICIAL CHAPTER" : "القسم الرسمي بمصر"}
            </span>
          </div>

          {/* Bold Modern Tech Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="text-white block">
              {locale === "en" ? "Connecting Talent." : "ربط الكفاءات."}
            </span>
            <span className="text-[#fa8716] block mt-1">
              {locale === "en" ? "Advancing Photonics." : "وتطوير علوم الضوئيات."}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-light">
            {t("subtitle")}
          </p>

          {/* Flat Sharp Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
            <Link href={`/${locale}/join`} className="btn-primary py-3 px-6 text-xs">
              <span>{t("cta_primary")}</span>
              <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
            <Link href={`/${locale}/events`} className="btn-secondary py-3 px-6 text-xs">
              <span>{t("cta_secondary")}</span>
              <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>

          {/* Modern Hashtag Chips (Entor Tech & Akhetonics Style) */}
          <div className="flex flex-wrap items-center gap-2">
            {TAGS.map(({ label }, idx) => (
              <div
                key={idx}
                className="tech-tag"
              >
                <span>[ {label.toUpperCase()} ]</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: High-Tech Photonic Core & Circuit Visualizer (Akhetonics inspired) */}
        <div className="lg:col-span-5 w-full">
          <div className="reticle-box p-6 bg-[#02060B] border border-white/15">
            {/* Header of the visualizer card */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#fa8716]" />
                <span className="tracking-widest text-[#fa8716] font-bold">
                  PHOTONIC BUS // SYS 2026
                </span>
              </div>
              <span className="px-2 py-0.5 border border-white/15 text-slate-300">
                1550 nm C-BAND
              </span>
            </div>

            {/* Glowing Technical SVG Optical Circuit Graphic */}
            <div className="relative aspect-square w-full flex items-center justify-center bg-[#000000] border border-white/10 p-4">
              {/* High-Tech Circuit & Laser Ray Diagram */}
              <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none">
                {/* Optical IC Core */}
                <rect x="140" y="140" width="120" height="120" stroke="#fa8716" strokeWidth="1.5" fill="#02060B" />
                <rect x="155" y="155" width="90" height="90" stroke="#5CB1A2" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                
                {/* Pyramid Glyph inside Core */}
                <polygon points="200,175 235,225 165,225" stroke="#fa8716" strokeWidth="1.2" fill="none" opacity="0.8" />
                
                {/* Central Point */}
                <circle cx="200" cy="200" r="5" fill="#5CB1A2" />

                {/* Laser Waveguides Left */}
                <path d="M 0 160 H 140" stroke="#5CB1A2" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 0 200 H 140" stroke="#fa8716" strokeWidth="2" />
                <path d="M 0 240 H 140" stroke="#5CB1A2" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Laser Waveguides Right */}
                <path d="M 260 160 H 400" stroke="#fa8716" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 260 200 H 400" stroke="#5CB1A2" strokeWidth="2" />
                <path d="M 260 240 H 400" stroke="#fa8716" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Laser Waveguides Top & Bottom */}
                <path d="M 200 0 V 140" stroke="#fa8716" strokeWidth="1.5" />
                <path d="M 200 260 V 400" stroke="#5CB1A2" strokeWidth="1.5" />

                {/* Corner Optical Rings */}
                <circle cx="100" cy="100" r="14" stroke="#fa8716" strokeWidth="1" strokeDasharray="3 2" fill="none" />
                <circle cx="300" cy="100" r="14" stroke="#5CB1A2" strokeWidth="1" strokeDasharray="3 2" fill="none" />
                <circle cx="100" cy="300" r="14" stroke="#5CB1A2" strokeWidth="1" strokeDasharray="3 2" fill="none" />
                <circle cx="300" cy="300" r="14" stroke="#fa8716" strokeWidth="1" strokeDasharray="3 2" fill="none" />

                {/* Diagonal Interconnects */}
                <path d="M 110 110 L 155 155" stroke="#fa8716" strokeWidth="1" />
                <path d="M 290 110 L 245 155" stroke="#5CB1A2" strokeWidth="1" />
                <path d="M 110 290 L 155 245" stroke="#5CB1A2" strokeWidth="1" />
                <path d="M 290 290 L 245 245" stroke="#fa8716" strokeWidth="1" />
              </svg>

              {/* Status Indicator */}
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-[#5CB1A2] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#5CB1A2]" />
                ALL-OPTICAL BUS // SYNCHRONIZED
              </div>
            </div>

            {/* Bottom Key-Value Telemetry Rows (Deep-Tech List Items) */}
            <div className="mt-4 pt-2 border-t border-white/10">
              <div className="tech-list-row">
                <span className="text-slate-400">CARRIER WAVELENGTH</span>
                <span className="text-white font-bold">1550 nm (ITU C-Band)</span>
              </div>
              <div className="tech-list-row">
                <span className="text-slate-400">SECTION STATUS</span>
                <span className="text-[#fa8716] font-bold">ACTIVE and GROWING</span>
              </div>
              <div className="tech-list-row">
                <span className="text-slate-400">OPTICAL TELEMETRY</span>
                <span className="text-[#00e660] font-bold">VERIFIED // LOW LOSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}