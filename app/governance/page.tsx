import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GovernanceDetailsSection } from "@/components/sections/GovernanceDetailsSection"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Governance",
  description:
    "Optica Local Section bylaws, constitutional executive seats, annual reporting scope, and section recognitions for Optica Egypt.",
  path: "/governance",
})

export default function GovernancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Constitutional Framework"
        title="Governance and Bylaws"
        intro="Optica Egypt operates under Optica Local Section bylaws with verifiable executive stewardship, member threshold governance, and annual reporting accountability."
      />

      <section className="section-space">
        <div className="container-page space-y-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line-subtle)] pb-6">
            <p className="text-sm text-[var(--ink-soft)]">
              Charter approval credentials and institutional records live in the charter overview.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-secondary min-h-[48px]">
                <span>Charter Record</span>
              </Link>
              <Link href="/leadership" className="btn-primary min-h-[48px]">
                <span>Leadership Roster</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <ScrollReveal>
            <GovernanceDetailsSection />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
