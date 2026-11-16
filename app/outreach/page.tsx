import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { TrackShowcaseSection } from "@/components/sections/TrackShowcaseSection"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Outreach",
  description:
    "Science outreach kits, university demonstration workshops, and International Day of Light initiatives coordinated by Optica Egypt.",
  path: "/outreach",
})

export default function OutreachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Public Engagement"
        title="Science Outreach."
        intro="Hands-on optical experiment kits, school outreach visits, and regional engagement programs introducing students across Egypt to optics and photonics."
      />

      <section className="section-space">
        <div className="container-page space-y-12">
          <ScrollReveal>
            <TrackShowcaseSection track="outreach" />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="site-card p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Host a Demonstration</p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--ink)]">
                  Coordinate an Outreach Activity with Optica Egypt
                </h2>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  Student chapters and faculty coordinators can request outreach kit documentation or volunteer speakers.
                </p>
              </div>
              <Link href="/chapters" className="btn-secondary min-h-[48px]">
                <span>Explore Student Chapters</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
