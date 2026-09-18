"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const PhotonicsChipScene = dynamic(
  () => import("@/components/3d/PhotonicsChipScene").then((module) => module.PhotonicsChipScene),
  {
    ssr: false,
    loading: () => <div className="h-full w-full scientific-grid bg-[#080a0b]" aria-hidden="true" />,
  }
)

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#080a0b]">
      <div className="scientific-grid absolute inset-0 opacity-75" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-[76%] border-l border-white/[0.06]" aria-hidden="true" />
      <div className="absolute inset-y-0 -right-[15%] w-full opacity-35 md:w-[74%] md:opacity-100" aria-hidden="true">
        <PhotonicsChipScene />
      </div>

      <div className="container-layout relative z-10 flex min-h-[calc(100svh-4.9rem)] items-end py-14 sm:py-18 lg:py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-[0.68rem] font-bold tracking-[0.16em] text-[var(--gold)]">
            <span className="block size-2 bg-[var(--gold)]" />
            <span>Optica Egypt / Local Section</span>
          </div>
          <h1 className="display-title mt-7 max-w-xl">The community shaping the future of light in Egypt.</h1>
          <p className="lede mt-7 max-w-lg">A meeting point for students, researchers, educators, industry professionals, and founders working across optics and photonics.</p>
          <div className="mt-9 flex flex-wrap items-center gap-7 sm:gap-9">
            <Link href="/events" className="btn-primary">Upcoming events <ArrowUpRight size={14} /></Link>
            <Link href="/community" className="btn-secondary">Explore community <ArrowUpRight size={14} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
