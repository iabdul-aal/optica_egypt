import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ShieldCheck } from "lucide-react"
import { GovernanceDetailsSection } from "@/components/sections/GovernanceDetailsSection"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getCharterRecord } from "@/lib/governance"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Governance",
  description:
    "Optica Local Section bylaws, constitutional executive seats, charter standing, and annual reporting scope for Optica Egypt.",
  path: "/governance",
})

export default function GovernancePage() {
  const charter = getCharterRecord()

  return (
    <>
      <PageHeader
        eyebrow="Constitutional Framework"
        title="Governance and Bylaws."
        intro="Optica Egypt operates under Optica Local Section bylaws with verifiable executive stewardship, member threshold governance, and annual reporting accountability."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <ScrollReveal>
            <div className="site-card p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Charter Verification Record</span>
                </div>
                <h2 className="text-xl font-semibold text-[var(--ink)]">
                  {charter.currentStanding}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                  Approved on <time dateTime={charter.approvalISO}>{charter.approvalDate}</time> by{" "}
                  <a
                    href={charter.parentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[var(--gold)]/60 underline-offset-4 hover:text-[var(--gold)]"
                  >
                    {charter.parentOrganization}
                  </a>{" "}
                  ({charter.hqContact}). Official coordination email: {charter.contactEmail}.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link href="/leadership" className="btn-primary min-h-[48px]">
                  <span>Leadership Roster</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/about" className="btn-secondary min-h-[48px]">
                  <span>Charter Overview</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <GovernanceDetailsSection />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
