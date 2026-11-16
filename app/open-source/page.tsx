import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
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
    tools: "gdsfactory, KLayout, SiEPIC-Tools",
  },
  {
    step: "02",
    title: "Mode and FDTD Verification",
    body: "Finite-difference eigenmode and FDTD electromagnetic simulation across 1550 nm C-band and 1310 nm O-band silicon-on-insulator stacks.",
    tools: "Meep FDTD, Femwell",
  },
  {
    step: "03",
    title: "Open-PDK MPW Preparation",
    body: "Team circuit verification, foundry design-rule compliance, and fabrication-ready GDSII submissions contingent on sponsor shuttles.",
    tools: "Open PDKs, Colab Notebooks",
  },
] as const

const RELATED_PATHS = [
  { label: "Open-Source Photonics Working Group", meta: "Working Group", href: "/projects/open-photonics-pda" },
  { label: "Egypt Open Photonic Chipathon Concept", meta: "Design Challenge", href: "/projects/photonic-chipathon" },
  { label: "Browse Free Photonics Software Index", meta: "Resources Directory", href: "/resources?category=software" },
] as const

export default function OpenSourcePage() {
  return (
    <>
      <PageHeader
        eyebrow="Open Hardware and PDA"
        title="Open-Source Photonics."
        intro="Browser-accessible silicon photonics design workflows designed for Egyptian undergraduate capstones, research theses, and hardware working groups."
      />

      <section className="section-space">
        <div className="container-page space-y-12">
          <ScrollReveal>
            <div className="grid gap-6 md:grid-cols-3">
              {PIPELINE_STAGES.map((stage) => (
                <article key={stage.step} className="site-card p-6 flex flex-col justify-between gap-5">
                  <div>
                    <span className="font-mono text-xs font-bold text-[var(--gold)]">{stage.step}</span>
                    <h2 className="mt-3 text-lg font-semibold text-[var(--ink)]">{stage.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{stage.body}</p>
                  </div>
                  <p className="border-t border-[var(--line-subtle)] pt-3 font-mono text-[11px] text-[var(--gold)]">
                    {stage.tools}
                  </p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
              {RELATED_PATHS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="event-row flex flex-wrap items-center justify-between gap-4 py-5 px-3 min-h-[48px]"
                >
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      {item.meta}
                    </span>
                    <span className="mt-1 block text-base font-semibold text-[var(--ink)]">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-link inline-flex items-center gap-1">
                    <span>Open</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
