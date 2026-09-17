"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useLocale } from "next-intl"

function BeamFallbackVector() {
  return (
    <div className="relative w-full h-[260px] md:h-[320px] flex items-center justify-center bg-[#010E17] overflow-hidden">
      <svg className="w-full max-w-2xl h-auto px-4" viewBox="0 0 600 240" fill="none">
        {/* Incident collimated beam */}
        <line x1="20" y1="120" x2="250" y2="120" stroke="#fa8716" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="250" cy="120" r="4" fill="#fa8716" />

        {/* Precision Prism with subtle internal refraction */}
        <polygon points="250,50 340,190 160,190" stroke="#D4AF37" strokeWidth="1.5" fill="#051827" fillOpacity="0.8" />
        <line x1="250" y1="120" x2="285" y2="120" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

        {/* Dispersed Spectral Beams (Snell's law) */}
        <line x1="285" y1="120" x2="580" y2="65" stroke="#EF4444" strokeWidth="2" />
        <line x1="285" y1="120" x2="580" y2="82" stroke="#F97316" strokeWidth="2" />
        <line x1="285" y1="120" x2="580" y2="99" stroke="#EAB308" strokeWidth="2" />
        <line x1="285" y1="120" x2="580" y2="116" stroke="#10B981" strokeWidth="2" />
        <line x1="285" y1="120" x2="580" y2="133" stroke="#00B4FF" strokeWidth="2" />
        <line x1="285" y1="120" x2="580" y2="150" stroke="#3B82F6" strokeWidth="2" />
        <line x1="285" y1="120" x2="580" y2="167" stroke="#8B5CF6" strokeWidth="2" />

        {/* Axis line */}
        <line x1="285" y1="120" x2="580" y2="120" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#010E17] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  )
}

const BeamScene = dynamic(
  () => import("@/components/3d/BeamScene").then((m) => m.BeamScene),
  {
    ssr: false,
    loading: () => <BeamFallbackVector />,
  }
)

export function BeamSection() {
  const locale = useLocale()

  return (
    <div className="reticle-box w-full mb-12 border border-white/15 bg-[#000000] relative">
      {/* Instrumentation Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-2.5 border-b border-white/10 bg-[#02060B]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#fa8716]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#fa8716]">
            {locale === "en" ? "OPTICAL BENCH // SCENE C : EQUILATERAL PRISM DISPERSION" : "منصة التجارب البصرية · تفريق الضوء عبر موشور زجاجي"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
          <span>INCIDENCE: 45.0°</span>
          <span className="text-[#5CB1A2]">INDEX n: 1.517 (BK7)</span>
          <span className="hidden sm:inline text-[#00e660]">SPECTRUM: 380-750 nm</span>
        </div>
      </div>

      <BeamScene />
    </div>
  )
}