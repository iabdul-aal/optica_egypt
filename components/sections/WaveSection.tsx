"use client"

import React from "react"
import dynamic from "next/dynamic"

const WaveScene = dynamic(
  () => import("@/components/3d/WaveScene").then((m) => m.WaveScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[280px] md:h-[360px] flex items-center justify-center bg-[#09131F]">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      </div>
    ),
  }
)

export function WaveSection() {
  return (
    <section className="relative w-full border-y border-[var(--border)] overflow-hidden bg-[#09131F]">
      <WaveScene />
    </section>
  )
}