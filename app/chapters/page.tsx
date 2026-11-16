import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ChaptersMap } from "@/components/sections/ChaptersMap"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getCharteredChapters,
  getCharterRoadmap,
} from "@/lib/chapters"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Chapters",
  description:
    "University Optica student chapters in Egypt, featuring the chartered AUC chapter and national student chapter chartering steps.",
  path: "/chapters",
})

export default function ChaptersPage() {
  const chartered = getCharteredChapters()
  const roadmap = getCharterRoadmap()

  return (
    <>
      <PageHeader
        eyebrow="University Network"
        title="Student Chapters in Egypt."
        intro="Optica Egypt supports reactivation of the chartered AUC chapter and guides university teams nationwide starting new branches."
      />

      <section className="section-space">
        <div className="container-page space-y-12">
          <ChaptersMap chartered={chartered} />

          <div className="border-t border-[var(--line)] pt-10 grid gap-8 lg:grid-cols-2">
            {chartered.map((ch) => (
              <div key={ch.id} className="site-card p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <span className="inline-flex rounded-sm border border-[var(--gold)]/35 bg-[var(--gold)]/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-[var(--gold)]">
                    {ch.status}
                  </span>
                  <h2 className="mt-3 text-xl font-semibold text-[var(--ink)]">{ch.name}</h2>
                  <p className="mt-1 font-mono text-xs text-[var(--ink-faint)]">
                    {ch.campus} · Advisor: {ch.facultyAdvisor}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {ch.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/chapters/${ch.id}`} className="btn-primary min-h-[48px]">
                    <span>View Full AUC Profile</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href={`/join?type=chapter&ref=${ch.id}`} className="btn-secondary min-h-[48px]">
                    <span>Join Reactivation</span>
                  </Link>
                </div>
              </div>
            ))}

            <div className="site-card p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Charter Checklist</p>
                  <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">
                    Start a Chapter at Your University
                  </h2>
                </div>
                <Link href="/join?type=chapter" className="btn-primary min-h-[48px]">
                  <span>Request Support</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <div className="divide-y divide-[var(--line-subtle)]">
                {roadmap.map((step) => (
                  <div key={step.step} className="py-3 grid gap-2 sm:grid-cols-[2.5rem_1fr]">
                    <span className="font-mono text-xs font-bold text-[var(--gold)]">{step.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--ink)]">{step.title}</p>
                      <p className="mt-0.5 text-xs text-[var(--ink-soft)]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
