"use client"

import React from "react"
import dynamic from "next/dynamic"

const BeamScene = dynamic(
  () => import("@/components/3d/BeamScene").then((m) => m.BeamScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[260px] md:h-[320px] flex items-center justify-center bg-[#09131F]">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--accent-secondary)] border-t-transparent animate-spin" />
      </div>
    ),
  }
)

export function BeamSection() {
  return (
    <div className="w-full mb-14 rounded-2xl overflow-hidden border border-[var(--border)] bg-[#09131F] shadow-lg">
      <BeamScene />
    </div>
  )
}