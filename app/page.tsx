import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { DispatchesSection } from "@/components/sections/DispatchesSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { OpticaHeritage } from "@/components/sections/OpticaHeritage"
import { ResearchExplorer } from "@/components/sections/ResearchExplorer"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getLatestDispatches } from "@/lib/dispatches"
import { getAllDomains } from "@/lib/domains"
import { FUNDING_LABELS, LIFECYCLE_LABELS, getAllProjects } from "@/lib/projects"
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

const AUDIENCE_PATHS = [
  {
    index: "01",
    title: "Students and Thesis Teams",
    summary: "Access license-free Python photonics simulation tools, domestic grants, and chapter startup support.",
    href: "/resources",
    label: "Explore Toolkit",
  },
  {
    index: "02",
    title: "Faculty and Research Labs",
    summary: "Co-host workshops, advise campus student chapters, and coordinate Senior or Fellow nominations.",
    href: "/partners",
    label: "Partner or Host",
  },
  {
    index: "03",
    title: "Volunteers and Committees",
    summary: "Join active working groups across technical programming, open-source PDA, or regional outreach.",
    href: "/volunteer",
    label: "Apply to Committee",
  },
] as const

export default function HomePage() {
  const dispatches = getLatestDispatches(3)
  const domains = getAllDomains()
  const featuredProjects = getAllProjects().slice(0, 3)

  return (
    <>
      <HeroSection />

      {/* Three concise audience entry points */}
      <section className="section-space bg-[var(--surface)]">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {AUDIENCE_PATHS.map((item, idx) => (
              <ScrollReveal key={item.index} delay={idx * 70}>
                <article className="site-card p-6 flex flex-col h-full justify-between gap-6">
                  <div>
                    <span className="font-mono text-xs font-bold text-[var(--gold)]">
                      {item.index}
                    </span>
                    <h2 className="mt-3 text-lg font-semibold text-[var(--ink)]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {item.summary}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="text-link inline-flex min-h-[48px] items-center gap-1.5 self-start"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <DispatchesSection dispatches={dispatches} />
      </ScrollReveal>

      {/* Highlighted Initiatives */}
      <section className="section-space bg-[var(--canvas)]">
        <div className="container-page">
          <div className="section-split-heading">
            <div>
              <p className="eyebrow">Working Groups and Roadmaps</p>
              <h2 className="section-title">Active Initiatives and Open Calls</h2>
            </div>
            <Link
              href="/projects"
              className="text-link inline-flex min-h-[48px] items-center gap-1.5 justify-self-start sm:justify-self-end"
            >
              <span>All projects</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 70}>
                <article className="site-card p-6 flex flex-col h-full justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                        {LIFECYCLE_LABELS[project.lifecycle]}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                        {FUNDING_LABELS[project.funding]}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-[var(--ink)]">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {project.summary}
                    </p>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-link inline-flex min-h-[48px] items-center gap-1 self-start"
                  >
                    <span>Inspect spec</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <ResearchExplorer domains={domains} />
      </ScrollReveal>

      <ScrollReveal>
        <OpticaHeritage />
      </ScrollReveal>
    </>
  )
}
