import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { LeadershipRosterSection } from "@/components/sections/LeadershipRosterSection"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Leadership",
  description:
    "Founding Executive Committee, Operational Committee, and Senior Faculty Advisory Board leading Optica Egypt.",
  path: "/leadership",
})

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Founding Roster"
        title="Section Leadership."
        intro="Elected executive officers, operational committee leads, and senior faculty advisors guiding Optica Egypt through its inaugural charter term."
      />

      <section className="section-space">
        <div className="container-page space-y-12">
          <ScrollReveal>
            <LeadershipRosterSection />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="site-card p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Working Committees</p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--ink)]">
                  Contribute to Optica Egypt Operations
                </h2>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  Researchers and students can apply to serve on technical program, open-source photonics, outreach, or mentorship committees.
                </p>
              </div>
              <Link href="/volunteer" className="btn-primary min-h-[48px]">
                <span>Explore Volunteer Committees</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
