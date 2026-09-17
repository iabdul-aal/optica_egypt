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
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#010E17] bg-tech-grid border-b border-[#D4AF37]/20 pt-8 pb-16">
      {/* Ambient Photonics Glow Fields (Cyan & Gold) */}
      <div className="absolute top-1/4 left-1/12 w-[500px] h-[500px] bg-[#00B4FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-[550px] h-[550px] bg-[#D4AF37]/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Background Pyramids Sunset & Optical Wave Layer (hidden on Arabic to prevent English watermark bleed) */}
      <div className={`absolute inset-0 z-0 pointer-events-none mix-blend-screen ${locale === "ar" ? "hidden" : "opacity-30"}`}>
        <Image
          src="/assets/brand/egypt/hero/optica-egypt-hero-banner.png"
          alt="Giza Pyramids and Optics Wave"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010E17] via-[#010E17]/90 to-[#010E17]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010E17] via-transparent to-[#010E17]" />
      </div>

      <div className="container-page relative z-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Official Chapter Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30 mb-8 backdrop-blur-md shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-[#00B4FF] animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
              {t("eyebrow")}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[11px] font-medium tracking-wider text-slate-300">
              {locale === "en" ? "Official Chapter" : "القسم الرسمي بمصر"}
            </span>
          </div>

          {/* Bold Modern Tech Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[1.08] mb-6">
            <span className="text-white block">
              {locale === "en" ? "Connecting Talent." : "ربط الكفاءات."}
            </span>
            <span className="text-gold-gradient block mt-2">
              {locale === "en" ? "Advancing Photonics." : "وتطوير علوم الضوئيات."}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed font-light">
            {t("subtitle")}
          </p>

          {/* Pill CTA Buttons with Icons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
            <Link href={`/${locale}/join`} className="btn-primary py-4 px-8 text-sm">
              <span>{t("cta_primary")}</span>
              <ArrowRight size={16} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
            <Link href={`/${locale}/events`} className="btn-secondary py-4 px-8 text-sm">
              <span>{t("cta_secondary")}</span>
              <ArrowRight size={16} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>

          {/* Modern Hashtag Chips (inspired by Entor Tech) */}
          <div className="flex flex-wrap items-center gap-2.5">
            {TAGS.map(({ label, icon: Icon }, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors cursor-default"
              >
                <Icon size={12} className="text-[#00B4FF]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: High-Tech Photonic Core & Circuit Visualizer (Akhetonics inspired) */}
        <div className="lg:col-span-5 w-full">
          <div className="glass-panel-gold p-6 md:p-8 relative overflow-hidden bg-[#010E17]/80">
            {/* Header of the visualizer card */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#00B4FF] animate-ping" />
                <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37]">
                  PHOTONIC BUS · SYS 2026
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                1550 nm C-BAND
              </span>
            </div>

            {/* Glowing Technical SVG Optical Circuit Graphic */}
            <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#02121C]/90 border border-[#00B4FF]/20 p-6">
              {/* Concentric optical laser circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full border border-[#D4AF37]/15 animate-pulse" />
                <div className="w-56 h-56 rounded-full border border-[#00B4FF]/20" />
                <div className="w-40 h-40 rounded-full border border-[#D4AF37]/25" />
              </div>

              {/* High-Tech Circuit & Laser Ray Diagram */}
              <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none">
                {/* Central Optical Processing Core */}
                <rect x="140" y="140" width="120" height="120" rx="20" stroke="#D4AF37" strokeWidth="2" fill="#010E17" fillOpacity="0.9" />
                <rect x="155" y="155" width="90" height="90" rx="12" stroke="#00B4FF" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                
                {/* Pyramid Silhouette inside Core */}
                <polygon points="200,175 235,225 165,225" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.8" />
                
                {/* Central Laser Point */}
                <circle cx="200" cy="200" r="8" fill="#00B4FF" />
                <circle cx="200" cy="200" r="18" stroke="#00B4FF" strokeWidth="1.5" strokeOpacity="0.5" className="animate-ping" />

                {/* Laser Waveguides Left */}
                <path d="M 0 160 H 140" stroke="#00B4FF" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M 0 200 H 140" stroke="#D4AF37" strokeWidth="2.5" />
                <path d="M 0 240 H 140" stroke="#00B4FF" strokeWidth="2" strokeDasharray="6 4" />

                {/* Laser Waveguides Right */}
                <path d="M 260 160 H 400" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M 260 200 H 400" stroke="#00B4FF" strokeWidth="2.5" />
                <path d="M 260 240 H 400" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" />

                {/* Laser Waveguides Top & Bottom */}
                <path d="M 200 0 V 140" stroke="#D4AF37" strokeWidth="2" />
                <path d="M 200 260 V 400" stroke="#00B4FF" strokeWidth="2" />

                {/* Corner Optical Rings */}
                <circle cx="100" cy="100" r="16" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
                <circle cx="300" cy="100" r="16" stroke="#00B4FF" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
                <circle cx="100" cy="300" r="16" stroke="#00B4FF" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
                <circle cx="300" cy="300" r="16" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />

                {/* Diagonal Interconnects */}
                <path d="M 112 112 L 155 155" stroke="#D4AF37" strokeWidth="1.5" />
                <path d="M 288 112 L 245 155" stroke="#00B4FF" strokeWidth="1.5" />
                <path d="M 112 288 L 155 245" stroke="#00B4FF" strokeWidth="1.5" />
                <path d="M 288 288 L 245 245" stroke="#D4AF37" strokeWidth="1.5" />
              </svg>

              {/* Status Indicator */}
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#00B4FF] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4FF] animate-pulse" />
                ALL-OPTICAL SIGNAL SYNCHRONIZED
              </div>
            </div>

            {/* Bottom Info Strip */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/10 text-center">
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Carrier Wavelength</p>
                <p className="text-sm font-bold text-white font-mono mt-0.5">1550 nm (Telecom)</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Section Status</p>
                <p className="text-sm font-bold text-[#D4AF37] font-mono mt-0.5">ACTIVE and GROWING</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}