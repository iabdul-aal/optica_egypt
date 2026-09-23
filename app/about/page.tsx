import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Users,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getDictionary } from "@/lib/locales"
import { getStrategyData } from "@/lib/strategy"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Optica Egypt Local Section, our mission, vision, and strategic pillars advancing photonics in Egypt.",
  alternates: {
    canonical: "/about/",
  },
}

export default function AboutPage() {
  const dictionary = getDictionary("en")
  const pillars = Object.values(dictionary.about.pillars)
  const strategy = getStrategyData()

  return (
    <>
      <PageHeader eyebrow={dictionary.about.eyebrow} title={dictionary.about.title} intro={dictionary.about.intro} />

      {/* ── Section Purpose and Foundation Pillars ───────────────────────── */}
      <section className="section-space">
        <ScrollReveal animation="fade-up" delay={30}>
          <div className="container-page grid gap-9 border-b border-[var(--line)] pb-11 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="eyebrow">{dictionary.about.purposeEyebrow}</p>
              <h2 className="section-title mt-3">{dictionary.about.purposeTitle}</h2>
            </div>
            <p className="lede max-w-2xl lg:pt-8">{dictionary.about.purposeBody}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={50}>
          <div className="container-page mt-12">
            <div className="grid border border-[var(--line)] md:grid-cols-2">
              {pillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className={`group/pillar p-6 sm:p-8 transition-colors duration-200 hover:bg-[var(--line-subtle)] ${
                    index % 2 === 1 ? "md:border-l md:border-[var(--line)]" : ""
                  } ${index > 0 ? "border-t md:border-t-0" : ""} ${
                    index >= 2 ? "md:border-t md:border-[var(--line)]" : ""
                  }`}
                >
                  <p className="font-mono text-sm font-bold text-[var(--gold)]">{pillar.number}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--ink)] group-hover/pillar:text-[var(--gold)] transition-colors">{pillar.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--ink-soft)]">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Key Milestones ────────────────────────────────────────── */}
        <div className="container-page mt-16 grid gap-6 border-t border-[var(--line-subtle)] pt-12 sm:grid-cols-2">
          <ScrollReveal animation="fade-up" delay={40}>
            <div className="site-card p-6">
              <p className="eyebrow">Charter Approval</p>
              <p className="mt-2 font-mono text-xl font-bold text-[var(--gold)]">10 September 2026</p>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                Optica formally approved the establishment of the Optica Egypt Local Section, welcoming Egypt into the global optics society.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={80}>
            <div className="site-card p-6">
              <p className="eyebrow">Inauguration Ceremony</p>
              <p className="mt-2 font-mono text-xl font-bold text-[var(--gold)]">1 November 2026</p>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                Section kick-off gathering bringing together university faculties, researchers, students, and industry partners. Details to follow.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Strategic Blueprint: Economic Pragmatism for Egypt ──────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
        <div className="container-page">
          <ScrollReveal animation="fade-up" delay={30}>
            <div className="border-b border-[var(--line)] pb-8 mb-12">
              <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-3">
                <Cpu size={14} aria-hidden="true" />
                <span>{strategy.eyebrow}</span>
              </div>
              <h2 className="section-title">{strategy.title}</h2>
              <p className="lede max-w-3xl mt-4">
                {strategy.vision}
              </p>

              {/* Economic Realities Callout Strip */}
              <div className="mt-8 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 grid gap-6 md:grid-cols-2">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider block font-bold">
                    The Domestic Challenge:
                  </span>
                  <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed">
                    {strategy.economicContext.description}
                  </p>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-[var(--line-subtle)] pt-4 md:pt-0 md:pl-6">
                  <span className="font-mono text-[10px] uppercase text-[var(--gold)] tracking-wider block font-bold">
                    The Optica Egypt Response:
                  </span>
                  <p className="text-xs text-[var(--ink)] mt-2 leading-relaxed">
                    {strategy.economicContext.response}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Five Pragmatic Pillars */}
          <div className="space-y-8">
            {strategy.pillars.map((p, index) => (
              <ScrollReveal key={p.id} animation="fade-up" delay={index * 50}>
                <div className="site-card p-6 sm:p-8 border-l-4 border-l-[var(--gold)]">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[var(--gold)]">
                          PILLAR {p.number}
                        </span>
                        <span className="text-[var(--line)]">·</span>
                        <span className="font-mono text-xs text-[var(--ink-faint)] uppercase tracking-wider">
                          {p.tagline}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                        {p.title}
                      </h3>

                      <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                        {p.summary}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[var(--line-subtle)]">
                        <span className="font-mono text-[10px] uppercase text-[var(--gold)] tracking-wider block mb-2 font-bold">
                          Tactical Execution Plan:
                        </span>
                        <ul className="grid gap-2 sm:grid-cols-2 text-xs text-[var(--ink-soft)]">
                          {p.tactics.map((t) => (
                            <li key={t} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="shrink-0 lg:w-72 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-4 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider block">
                          Resource and Cost Model:
                        </span>
                        <p className="text-xs font-semibold text-[var(--ink)] mt-1.5 leading-snug">
                          {p.costModel}
                        </p>
                      </div>

                      <div className="mt-6 pt-3 border-t border-[var(--line-subtle)]">
                        <Link href="/resources" className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--gold)] hover:underline font-bold">
                          <span>Explore Tooling and Grants</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Strategic Partnership CTA Strip */}
          <div className="mt-12 site-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                <Users size={14} />
                <span>Government, University, and Corporate Partners</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                Are you an institution or sponsor looking to advance Egyptian optics?
              </h3>
              <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                We partner with Egyptian government bodies (ITIDA, ASRT, STDF), universities, and industry innovators to fund student capstones, sponsor tapeouts, and expand shared measurement access.
              </p>
            </div>
            <Link href="/volunteer" className="btn-primary shrink-0">
              <span>Partner With Optica Egypt</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
