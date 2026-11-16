import type { Metadata } from "next"
import { Layers } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { RecruitmentForm } from "@/components/sections/RecruitmentForm"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { committees } from "@/lib/recruitment"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Volunteer",
  description:
    "Working committees and verified volunteer application form for researchers and students joining Optica Egypt operations.",
  path: "/volunteer",
})

const COMMITTEE_SUMMARY: Record<(typeof committees)[number], string> = {
  "Technical Program": "Coordinates seminars, lecture series, and photonic workshop curricula.",
  "Open Source Photonics": "Maintains open-PDK layout tutorials, Meep simulations, and gdsfactory workflows.",
  Outreach: "Delivers university optics demonstrations and International Day of Light activities.",
  "Science Communication": "Prepares technical summaries, event dispatches, and bilingual educational briefs.",
  "Chapter Mentorship": "Assists student branches across Egypt with charter reactivation and Optica reporting.",
  Operations: "Supports member onboarding, scheduling logistics, and section governance records.",
}

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Standing Committees"
        title="Volunteer with Optica Egypt."
        intro="Optica Egypt relies on dedicated technical and operational committee contributors across Egyptian universities and research centers."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <ScrollReveal>
            <div>
              <p className="eyebrow">Working Groups</p>
              <h2 className="section-title mt-2">Six Standing Committees</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {committees.map((committee) => (
                  <article key={committee} className="site-card p-6 space-y-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)]">
                      <Layers size={15} aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold text-[var(--ink)]">{committee}</h3>
                    <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                      {COMMITTEE_SUMMARY[committee]}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-start border-t border-[var(--line)] pt-12">
              <div className="space-y-3">
                <p className="eyebrow">Committee Intake</p>
                <h2 className="section-title">Submit a Committee Application</h2>
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                  Applications are recorded directly in the section operations database with an immediate reference code for tracking interview scheduling and placement.
                </p>
              </div>
              <RecruitmentForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
