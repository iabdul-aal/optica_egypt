"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"
import { FiberScene } from "@/components/3d/FiberScene"

export function HeroSection() {
  const t = useTranslations("home.hero")

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-[#000000] border-b border-white/10 overflow-hidden pt-8">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

      {/* Top Telemetry Datum Line */}
      <div className="container-page relative z-10 w-full pt-4 pb-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#fa8716]" />
          <span className="text-white font-bold tracking-wider">OPTICA EGYPT LOCAL SECTION</span>
          <span className="text-white/20">/</span>
          <span className="text-[#5CB1A2]">CHARTER 2026</span>
        </div>
        <div className="flex items-center gap-6">
          <span>COORDINATES: 30.0444° N, 31.2357° E</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-[#00e660]">SIGNAL: C-BAND 1550 NM</span>
        </div>
      </div>

      {/* Main Cinematic Split: Architectural Typography + 3D Fiber River */}
      <div className="container-page relative z-10 w-full my-auto py-12 md:py-16 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left/Center: Monumental Editorial Typography (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="editorial-label">
              {"//"} {t("eyebrow")}
            </span>
          </div>

          <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl xl:text-[6.5rem] tracking-tight text-white mb-8">
            <span className="block">Connecting Talent.</span>
            <span className="block text-[#fa8716] mt-1">Advancing Photonics.</span>
          </h1>

          <p className="editorial-lead max-w-xl mb-10 font-light">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link href="/join" className="btn-primary py-3.5 px-8 text-xs">
              <span>{t("cta_primary")}</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/events" className="btn-secondary py-3.5 px-8 text-xs">
              <span>{t("cta_secondary")}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Right: 3D Fiber Optic River (Scene A) integrated as full sculptural presence (5 Cols) */}
        <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
          {/* Subtle Hairline Frame with Coordinate Marks */}
          <div className="absolute inset-0 border border-white/10 pointer-events-none z-20">
            <span className="absolute top-2 left-2 text-[9px] font-mono text-slate-500 flex items-center gap-1">
              <Terminal size={10} /> 3D_SCENE_A // FIBER_RIVER
            </span>
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#fa8716]">
              1550nm WAVELENGTH
            </span>
          </div>

          {/* Interactive R3F Scene A Canvas */}
          <div className="w-full h-full relative z-10">
            <FiberScene className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Bottom Architectural Telemetry Datum Strip */}
      <div className="datum-line w-full bg-black/60 relative z-10">
        <div className="container-page py-4 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-[11px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">{"//"} SYSTEM CARRIER</span>
            <span className="text-white font-bold">1550 nm (ITU C-Band)</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">{"//"} GLOBAL AFFILIATION</span>
            <span className="text-white font-bold">Optica Global (DC)</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">{"//"} LAB NETWORK</span>
            <span className="text-[#5CB1A2] font-bold">6 Egyptian Universities</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">{"//"} REGISTRY STATUS</span>
            <span className="text-[#00e660] font-bold">OPEN // NO FEES</span>
          </div>
        </div>
      </div>
    </section>
  )
}