import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ChaptersMap } from "@/components/sections/ChaptersMap"
import { PageHeader } from "@/components/sections/PageHeader"
import { getAllChapters, getCharterRoadmap } from "@/lib/chapters"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Chapters",
  description:
    "University Optica student chapters in Egypt, featuring the chartered AUC chapter, the prospective Zewail City chapter in formation, and national chartering steps.",
  path: "/chapters",
})

export default function ChaptersPage() {
  const allChapters = getAllChapters()
  const roadmap = getCharterRoadmap()

  return (
    <>
      <PageHeader
        eyebrow="University Network"
        title="Student Chapters in Egypt"
        intro="Optica Egypt supports reactivation of the chartered AUC chapter, charter formation at Zewail City of Science and Technology, and new university branches nationwide."
      />

      <section className="section-space">
        <div className="container-page space-y-16">
          <ChaptersMap chapters={allChapters} />

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-5">
              <div className="border-b border-[var(--line)] pb-4">
                <p className="eyebrow">Campus Registry</p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">
                  Active and Prospective Branches ({allChapters.length})
                </h2>
              </div>

              <div className="divide-y divide-[var(--line-subtle)] border-b border-[var(--line)]">
                {allChapters.map((ch) => (
                  <article key={ch.id} className="py-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                        {ch.status}
                      </span>
                      <h3 className="text-lg font-semibold text-[var(--ink)]">{ch.name}</h3>
                      <p className="font-mono text-xs text-[var(--ink-faint)]">
                        {ch.university} · {ch.city}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 shrink-0">
                      <Link href={`/chapters/${ch.id}`} className="text-link inline-flex min-h-[48px] items-center gap-1">
                        <span>
                          {ch.id === "auc"
                            ? "View Full AUC Profile"
                            : `View ${ch.shortName.replace(" Student Chapter", "")} Profile`}
                        </span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-5 lg:border-l lg:border-[var(--line-subtle)] lg:pl-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
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
              <div className="divide-y divide-[var(--line-subtle)] border-b border-[var(--line)]">
                {roadmap.map((step) => (
                  <div key={step.step} className="py-4 grid gap-2 sm:grid-cols-[2.5rem_1fr]">
                    <span className="font-mono text-xs font-bold text-[var(--gold)]">{step.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--ink)]">{step.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{step.body}</p>
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
