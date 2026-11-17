import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { OpticalWaveguideDiagram } from "@/components/sections/OpticalWaveguideDiagram"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Open-Source Photonics",
  description:
    "Three-stage open-source photonic design automation workflow across Python GDSII layout, electromagnetic verification, and open-PDK readiness at Optica Egypt.",
  path: "/open-source",
})

const PIPELINE_STAGES = [
  {
    step: "01",
    title: "Schematic and GDSII Layout",
    body: "Parametric silicon waveguides, directional couplers, and DRC checks written reproducibly in Python without commercial seat licenses.",
    tools: "gdsfactory · KLayout · SiEPIC-Tools",
  },
  {
    step: "02",
    title: "Mode and FDTD Verification",
    body: "Finite-difference eigenmode and FDTD electromagnetic simulation across 1550 nm C-band and 1310 nm O-band silicon-on-insulator stacks.",
    tools: "Meep FDTD · Femwell",
  },
  {
    step: "03",
    title: "Open-PDK MPW Preparation",
    body: "Team circuit verification, foundry design-rule compliance, and fabrication-ready GDSII submissions contingent on sponsor shuttles.",
    tools: "Open PDKs · Colab Notebooks",
  },
] as const

export default function OpenSourcePage() {
  return (
    <>
      <PageHeader
        eyebrow="Open Hardware and PDA"
        title="Open-Source Photonics"
        intro="Browser-accessible silicon photonics design workflows built for Egyptian undergraduate capstones, research theses, and hardware working groups."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <ScrollReveal>
            <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
                {PIPELINE_STAGES.map((stage) => (
                  <article key={stage.step} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--gold)]">
                        {stage.step} / WORKFLOW STAGE
                      </span>
                      <span className="font-mono text-[11px] text-[var(--gold)]">{stage.tools}</span>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-[var(--ink)]">{stage.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{stage.body}</p>
                  </article>
                ))}
              </div>

              <div>
                <OpticalWaveguideDiagram />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="border-t border-[var(--line)] pt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="eyebrow">Working Group Action</p>
                <h2 className="section-title">Contribute Layouts or Simulation Benchmarks</h2>
                <p className="text-sm leading-relaxed text-[var(--ink-soft)] max-w-xl">
                  The Open-Source Photonics Working Group maintains reproducible Python layout templates, waveguide sweeps, and foundry preparation checklists open to Egyptian students and research groups.
                </p>
                <div className="pt-1 flex flex-wrap gap-3">
                  <Link href="/projects/open-photonics-pda" className="btn-primary min-h-[48px]">
                    <span>View Working Group Spec</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href="/join?type=committee" className="btn-secondary min-h-[48px]">
                    <span>Apply to Working Committee</span>
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-[var(--line-subtle)] border-y border-[var(--line-subtle)]">
                <Link
                  href="/projects/photonic-chipathon"
                  className="flex min-h-[48px] items-center justify-between gap-4 py-4 text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                >
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--gold)]">
                      Design Challenge
                    </span>
                    <span className="mt-0.5 block">Egypt Open Photonic Chipathon Concept</span>
                  </div>
                  <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
                </Link>
                <Link
                  href="/resources?category=software"
                  className="flex min-h-[48px] items-center justify-between gap-4 py-4 text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                >
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--gold)]">
                      Resources Directory
                    </span>
                    <span className="mt-0.5 block">Free Photonics Software Index (gdsfactory, Meep, KLayout)</span>
                  </div>
                  <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
