import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { DispatchesSection } from "@/components/sections/DispatchesSection"
import { EcosystemConstellationSection } from "@/components/sections/EcosystemConstellationSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { ImpactMetrics } from "@/components/sections/ImpactMetrics"
import { OpticaHeritage } from "@/components/sections/OpticaHeritage"
import { ResearchExplorer } from "@/components/sections/ResearchExplorer"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getLatestDispatches } from "@/lib/dispatches"
import { getAllDomains } from "@/lib/domains"
import { TRACK_LABELS, getAllProjects } from "@/lib/projects"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    path: "/",
  }),
  title: { absolute: siteConfig.seo.defaultTitle },
}

export default function HomePage() {
  const dispatches = getLatestDispatches(3)
  const domains = getAllDomains()
  const highlightedInitiatives = getAllProjects().slice(0, 3)

  return (
    <>
      <HeroSection />

      <ScrollReveal delay={40}>
        <ImpactMetrics />
      </ScrollReveal>

      <ScrollReveal delay={60}>
        <EcosystemConstellationSection />
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <DispatchesSection dispatches={dispatches} />
      </ScrollReveal>

      <section className="section-space bg-[var(--canvas)]">
        <div className="container-page">
          <div className="section-split-heading">
            <div>
              <p className="eyebrow">Working Groups and Roadmaps</p>
              <h2 className="section-title">Selected Section Initiatives</h2>
            </div>
            <Link
              href="/projects"
              className="text-link inline-flex min-h-[48px] items-center gap-1.5 justify-self-start sm:justify-self-end"
            >
              <span>Browse full index</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
            {highlightedInitiatives.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="event-row flex flex-wrap items-center justify-between gap-4 py-5 px-3 min-h-[48px]"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                    {TRACK_LABELS[project.track]}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-[var(--ink)]">{project.title}</h3>
                </div>
                <span className="text-link inline-flex items-center gap-1 shrink-0">
                  <span>View brief</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal delay={50}>
        <ResearchExplorer domains={domains} />
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <OpticaHeritage />
      </ScrollReveal>
    </>
  )
}
