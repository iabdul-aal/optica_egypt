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
        title="Section Leadership"
        intro="Elected executive officers, operational committee leads, and senior faculty advisors guiding Optica Egypt through its inaugural charter term."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <LeadershipRosterSection />

          <ScrollReveal delay={60}>
            <div className="border-t border-[var(--line)] pt-10 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="eyebrow">Working Committees</p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">
                  Contribute to Optica Egypt Operations
                </h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Researchers and students can review standing committees across programming, open-source photonics, outreach, and chapter mentorship.
                </p>
              </div>
              <Link href="/volunteer" className="btn-primary min-h-[48px] shrink-0">
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
