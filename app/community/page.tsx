import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
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
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--ink-faint)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                  <span>5 ECOSYSTEM PATHWAYS</span>
                  <span>{"//"}</span>
                  <span>OPEN ACCESS</span>
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

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {groups.map((group, index) => (
              <ScrollReveal key={group.key} animation="fade-up" delay={index * 40}>
                <article className="py-8 sm:py-10 transition-colors duration-200">
                  {/* Top Bar: Identifier, Category Tag, and Audience Scope */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[var(--gold)]">
                        {"//"} 0{index + 1}
                      </span>
                      <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-[var(--ink-faint)]">
                        {group.tag}
                      </span>
                    </div>
                    <span className="rounded-full bg-[var(--surface-raised)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--ink-soft)] border border-[var(--line-subtle)]">
                      {group.audience}
                    </span>
                  </div>

                  {/* Title and Primary Focus */}
                  <div className="mt-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {group.focus}
                    </p>
                  </div>

                  {/* Core Outcomes */}
                  <div className="mt-6 rounded-sm border border-[var(--line-subtle)] bg-[var(--surface-raised)]/50 p-4 sm:p-5">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      {dictionary.community.outcomesLabel}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {group.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden="true" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Immediate Pathway and CTA */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-sm border border-[var(--line-subtle)] bg-[var(--surface)] p-3.5 sm:p-4">
                    <div className="text-xs text-[var(--ink-soft)] leading-relaxed">
                      <span className="font-mono font-semibold uppercase text-[var(--gold)] mr-2">
                        {dictionary.community.pathwayLabel}:
                      </span>
                      <span>{group.entryPoint}</span>
                    </div>
                    <Link
                      href={localizedHref("en", `/join?interest=${group.key}`)}
                      className="inline-flex shrink-0 items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)] hover:text-[var(--gold-pale)] transition-colors"
                    >
                      <span>Connect</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
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
