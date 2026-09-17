"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useLocale } from "next-intl"
import { Activity } from "lucide-react"

function WaveFallbackVector() {
  return (
    <div className="relative w-full h-[280px] md:h-[360px] flex items-center justify-center bg-[#010E17] overflow-hidden">
      <svg className="w-full h-full opacity-40" viewBox="0 0 1000 400" preserveAspectRatio="none">
        {[40, 80, 120, 160, 200, 240, 280].map((r, i) => (
          <g key={i}>
            <circle cx="360" cy="200" r={r} fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="6 6" opacity={0.9 - i * 0.1} />
            <circle cx="640" cy="200" r={r} fill="none" stroke="#00B4FF" strokeWidth="1.2" strokeDasharray="6 6" opacity={0.9 - i * 0.1} />
          </g>
        ))}
        {/* Interference constructive node axis */}
        <line x1="500" y1="20" x2="500" y2="380" stroke="#fa8716" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000]" />
    </div>
  )
}

const WaveScene = dynamic(
  () => import("@/components/3d/WaveScene").then((m) => m.WaveScene),
  {
    ssr: false,
    loading: () => <WaveFallbackVector />,
  }
)

export function WaveSection() {
  const locale = useLocale()
  const [activeBand, setActiveBand] = useState<"cband" | "visible" | "quantum">("cband")

  return (
    <section className="relative w-full border-y border-white/10 bg-[#000000] overflow-hidden py-12">
      <div className="container-page mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
              <Activity size={12} className="text-[#fa8716]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
                {locale === "en" ? "PHYSICAL SIMULATION · SCENE B" : "المحاكاة الفيزيائية · المشهد الثاني"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {locale === "en" ? "Coherent Wave Interference & Superposition Dynamics" : "تراكب الموجات الضوئية وأنماط التداخل المتشاكه"}
            </h3>
          </div>

          {/* Interactive band selectors (Akhetonics & Entor Tech pill style) */}
          <div className="flex items-center gap-2">
            {[
              { id: "cband", label: "1550 nm (C-Band)", freq: "193.4 THz" },
              { id: "visible", label: "532 nm (Green Nd:YAG)", freq: "563.5 THz" },
              { id: "quantum", label: "810 nm (SPDC Single)", freq: "370.1 THz" },
            ].map((band) => (
              <button
                key={band.id}
                onClick={() => setActiveBand(band.id as "cband" | "visible" | "quantum")}
                className={`text-[11px] font-mono px-3 py-1.5 rounded-full transition-all border ${
                  activeBand === band.id
                    ? "bg-[#fa8716]/20 border-[#fa8716] text-white shadow-[0_0_12px_rgba(250,135,22,0.3)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {band.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <WaveScene />
        {/* Real-time schematic overlay tags */}
        <div className="absolute top-4 left-6 z-10 hidden sm:flex items-center gap-3">
          <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-black/70 border border-white/10 text-slate-300 backdrop-blur">
            SLIT SEPARATION: 250 µm
          </span>
          <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-black/70 border border-white/10 text-slate-300 backdrop-blur">
            COHERENCE LENGTH: &gt; 10 km
          </span>
        </div>
        <div className="absolute bottom-4 right-6 z-10 hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-mono text-emerald-400 bg-black/80 px-2.5 py-1 rounded border border-emerald-500/30">
            PHASE-LOCKED
          </span>
        </div>
      </div>
    </section>
  )
}