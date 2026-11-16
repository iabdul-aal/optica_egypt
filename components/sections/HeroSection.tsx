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
        <OpticalWaveguideDiagram />
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
            Photonics coordination across Egyptian universities and labs.
          </h1>
          <p className="lede">
            Chartered 10 September 2026 under Optica bylaws, connecting student chapters, researchers, and open-source simulation workflows across Egypt.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="btn-primary min-h-[48px]">
              Explore Projects <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/resources" className="btn-secondary min-h-[48px]">
              Tools and Grants
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
