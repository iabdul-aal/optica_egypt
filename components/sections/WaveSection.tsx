"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"

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
  const [activeBand, setActiveBand] = useState<"cband" | "visible" | "quantum">("cband")

  return (
    <section className="relative w-full border-y border-white/10 bg-[#000000] overflow-hidden py-16">
      <div className="container-page mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                SCENE B // COHERENT INTERFERENCE EXPERIMENT
              </span>
            </div>
            <h2 className="editorial-headline text-white">
              Wave Interference and Superposition Dynamics
            </h2>
          </div>

          {/* Interactive band selectors & Mathematical Telemetry */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px]">
            <span className="text-slate-500 hidden sm:inline">λ FRINGE: β = λD/d</span>
            {[
              { id: "cband", label: "1550 nm (C-Band)" },
              { id: "visible", label: "532 nm (Nd:YAG)" },
              { id: "quantum", label: "810 nm (SPDC)" },
            ].map((band) => (
              <button
                key={band.id}
                onClick={() => setActiveBand(band.id as "cband" | "visible" | "quantum")}
                className={`uppercase tracking-wider px-3.5 py-1.5 transition-colors border ${
                  activeBand === band.id
                    ? "bg-[#fa8716] border-[#fa8716] text-black font-bold"
                    : "bg-black border-white/15 text-slate-400 hover:border-white/40 hover:text-white"
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

        {/* Real-time optical bench telemetry tags */}
        <div className="absolute top-4 left-6 z-10 hidden sm:flex items-center gap-3">
          <span className="px-2.5 py-1 text-[10px] font-mono bg-black/90 border border-white/15 text-slate-300">
            SLIT SEPARATION: 250 µm
          </span>
          <span className="px-2.5 py-1 text-[10px] font-mono bg-black/90 border border-white/15 text-slate-300">
            COHERENCE LENGTH: &gt; 10 km
          </span>
        </div>
        <div className="absolute bottom-4 right-6 z-10 hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#00e660]" />
          <span className="text-[10px] font-mono text-[#00e660] bg-black/90 px-2.5 py-1 border border-[#00e660]/30">
            PHASE-LOCKED // VERIFIED
          </span>
        </div>
      </div>
    </section>
  )
}