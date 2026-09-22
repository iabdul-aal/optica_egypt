import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Compass, CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getDictionary, localizedHref } from "@/lib/locales"

export const metadata: Metadata = {
  title: "Community",
  description: "Connect with Egypt's photonics community spanning student chapters, research groups, university faculty, and industrial pioneers.",
  alternates: {
    canonical: "/community/",
  },
}

export default function CommunityPage() {
  const dictionary = getDictionary("en")
  const groups = Object.entries(dictionary.community.groups).map(([key, group]) => ({
    key,
    ...group,
  }))

  return (
    <>
      <PageHeader eyebrow={dictionary.community.eyebrow} title={dictionary.community.title} intro={dictionary.community.intro} />
      <section className="section-space">
        <div className="container-page grid gap-12 lg:grid-cols-[.78fr_1.22fr] items-start">
          <ScrollReveal animation="fade-up" delay={30}>
            <div className="lg:sticky lg:top-28 space-y-6">
              <p className="eyebrow">{dictionary.community.systemEyebrow}</p>
              <h2 className="section-title mt-2">{dictionary.community.systemTitle}</h2>
              <p className="lede mt-4">{dictionary.community.systemBody}</p>

              <div className="pt-6 border-t border-[var(--line-subtle)] space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-medium text-[var(--ink-soft)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  <span>5 Ecosystem Pathways</span>
                  <span className="text-[var(--line)]">·</span>
                  <span>Open Access</span>
                </div>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                  Every pathway is built around concrete, practical outcomes designed to eliminate institutional silos and accelerate Egypt&apos;s photonics capacity.
                </p>
              </div>

              <Link href={localizedHref("en", "/join?interest=community")} className="btn-primary mt-6">
                {dictionary.community.action} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {groups.map((group, index) => (
              <ScrollReveal key={group.key} animation="fade-up" delay={index * 40}>
                <article className="group rounded-xl border border-[var(--line)] bg-[var(--surface-raised)]/25 hover:bg-[var(--surface-raised)]/60 hover:border-[var(--gold)]/40 p-6 sm:p-8 transition-all duration-300 relative shadow-xs">
                  {/* Card Header: Pathway Index, Track, and Audience Role */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--gold)]/15 text-[11px] font-semibold text-[var(--gold)] font-mono">
                        0{index + 1}
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-[var(--ink-soft)]">
                        {group.tag}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--ink-soft)] font-medium bg-[var(--surface)] px-3 py-1 rounded-full border border-[var(--line-subtle)]">
                      {group.audience}
                    </span>
                  </div>

                  {/* Title and Strategic Focus */}
                  <div className="mt-5 space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--ink-soft)] font-light max-w-2xl">
                      {group.focus}
                    </p>
                  </div>

                  {/* Strategic Deliverables */}
                  <div className="mt-6 pt-5 border-t border-[var(--line-subtle)]">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-faint)] mb-3">
                      {dictionary.community.outcomesLabel}
                    </h4>
                    <ul className="space-y-3">
                      {group.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-3 text-sm text-[var(--ink-soft)] leading-relaxed font-light">
                          <CheckCircle2 size={16} className="mt-0.5 text-[var(--gold)] shrink-0 opacity-90" aria-hidden="true" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Pathway and Action */}
                  <div className="mt-6 pt-5 border-t border-[var(--line-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-[var(--ink-soft)] leading-relaxed flex items-start gap-2.5 max-w-lg">
                      <Compass size={16} className="text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-[var(--ink)]">{dictionary.community.pathwayLabel}: </strong>
                        {group.entryPoint}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href={localizedHref("en", `/join?tier=${group.key}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[var(--gold)] text-[#09131F] hover:bg-[var(--gold-pale)] transition-all shadow-xs font-sans"
                      >
                        <span>Membership Benefits</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-[var(--line)] bg-[var(--surface)] py-14">
        <div className="container-page">
          <div className="grid border border-[var(--line)] md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <article className="bg-[var(--surface)] p-6 sm:p-8 transition-colors duration-200 hover:bg-[var(--surface-raised)]">
              <p className="eyebrow">01 / DISCOVER</p>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--ink)]">Find the right room.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">Start with an event, resource, or shared technical interest.</p>
            </article>
            <article className="bg-[var(--surface)] p-6 sm:p-8 transition-colors duration-200 hover:bg-[var(--surface-raised)]">
              <p className="eyebrow">02 / CONTRIBUTE</p>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--ink)]">Bring a useful perspective.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">A question, a skill, a proposal, or practical experience can move a conversation forward.</p>
            </article>
            <article className="bg-[var(--surface)] p-6 sm:p-8 transition-colors duration-200 hover:bg-[var(--surface-raised)]">
              <p className="eyebrow">03 / CONTINUE</p>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--ink)]">Build a real connection.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">Follow up through a human coordinator when a collaboration, chapter, or event needs care.</p>
            </article>
          </div>
          <ScrollReveal animation="fade-up" delay={50}>
            <p className="mt-8 max-w-3xl text-xl font-semibold leading-tight tracking-tight text-[var(--ink)]">{dictionary.community.statement}</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
