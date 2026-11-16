import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { OpticalWaveguideDiagram } from "@/components/sections/OpticalWaveguideDiagram"

export function HeroSection() {
  return (
    <section className="section-space border-b border-[var(--line)] bg-[var(--canvas)]">
      <div className="container-page grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="eyebrow">Optica Egypt Local Section</p>
          <h1 className="display-title mt-4">
            Photonics coordination across Egyptian universities and labs.
          </h1>
          <p className="lede mt-5 max-w-xl">
            Chartered 10 September 2026 under Optica bylaws, connecting student chapters, researchers, and open-source simulation workflows across Egypt.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary min-h-[48px]">
              Explore Projects <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/resources" className="btn-secondary min-h-[48px]">
              Tools and Grants
            </Link>
          </div>
        </div>

        <OpticalWaveguideDiagram />
      </div>
    </section>
  )
}
