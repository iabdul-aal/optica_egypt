"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { OpticalWaveguideDiagram } from "@/components/sections/OpticalWaveguideDiagram"

const PhotonicsChipScene = dynamic(
  () => import("@/components/3d/PhotonicsChipScene").then((mod) => mod.PhotonicsChipScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-full flex items-center justify-center p-4 sm:p-6">
        <OpticalWaveguideDiagram monochromeHover={false} transparent />
      </div>
    ),
  }
)

export function HeroSection() {
  return (
    <section className="hero-shell">
      <div className="hero-copy-wrap container-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Optica Egypt Local Section</p>
          <h1 className="display-title">
            A shared field of view for Egypt&apos;s optics and photonics community.
          </h1>
          <p className="lede">
            Chartered 10 September 2026 under Optica bylaws. Connecting university laboratories, student chapters, and open-source photonics engineering across Egypt.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="btn-primary min-h-[48px]">
              Explore Initiatives <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/chapters" className="btn-secondary min-h-[48px]">
              Student Chapters
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-model-wrap">
        <PhotonicsChipScene />
      </div>
    </section>
  )
}
