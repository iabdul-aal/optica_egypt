import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { committees } from "@/lib/recruitment"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Volunteer",
  description:
    "Overview of the six standing working committees supporting Optica Egypt operations and direct committee application link.",
  path: "/volunteer",
})

const COMMITTEE_SUMMARY: Record<(typeof committees)[number], string> = {
  "Technical Program": "Coordinates seminars, lecture series, and photonic workshop curricula.",
  "Open Source Photonics": "Maintains open-PDK layout tutorials, Meep simulations, and gdsfactory workflows.",
  Outreach: "Delivers university optics demonstrations and International Day of Light activities.",
  "Science Communication": "Prepares technical summaries, event dispatches, and educational briefs.",
  "Chapter Mentorship": "Assists student branches across Egypt with charter reactivation and Optica reporting.",
  Operations: "Supports member onboarding, scheduling logistics, and section governance records.",
}

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Standing Committees"
        title="Volunteer Committees"
        intro="Optica Egypt relies on six working committees coordinating programs, open hardware tooling, student mentorship, and outreach across Egypt."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <ScrollReveal>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 border-t border-[var(--line)] pt-8">
              {committees.map((committee, idx) => (
                <article key={committee} className="border-t border-[var(--line-subtle)] pt-5">
                  <span className="font-mono text-xs font-bold text-[var(--gold)]">
                    0{idx + 1}
                  </span>
                  <h2 className="mt-2 text-lg font-semibold text-[var(--ink)]">{committee}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {COMMITTEE_SUMMARY[committee]}
                  </p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="border-t border-[var(--line)] pt-10 flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <p className="eyebrow">Committee Intake</p>
                <h2 className="text-xl font-semibold text-[var(--ink)]">Apply to Join a Working Committee</h2>
                <p className="text-sm text-[var(--ink-soft)]">
                  Applications are logged in the section operations desk with an instant reference code for interview review.
                </p>
              </div>
              <Link href="/join?type=committee" className="btn-primary min-h-[48px] shrink-0">
                <span>Open Committee Application</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
