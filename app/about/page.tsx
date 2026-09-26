import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Compass,
  Cpu,
  Eye,
  Globe,
  Sparkles,
  Users,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getDictionary } from "@/lib/locales"
import { getStrategyData } from "@/lib/strategy"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Optica Egypt Local Section, our vision, mission, core values, and strategic blueprint advancing photonics in Egypt.",
  alternates: {
    canonical: "/about/",
  },
}

export default function AboutPage() {
  const dictionary = getDictionary("en")
  const strategy = getStrategyData()

  const valueIcons = [Sparkles, BookOpen, Cpu, Users, Globe]

  return (
    <>
      <PageHeader eyebrow={dictionary.about.eyebrow} title={dictionary.about.title} intro={dictionary.about.intro} />

      {/* ── Vision and Mission ────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Vision Card */}
            <ScrollReveal animation="fade-up" delay={20}>
              <div className="site-card p-8 sm:p-10 relative overflow-hidden h-full flex flex-col justify-between border-t-2 border-t-[var(--gold)]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-6">
                    <Eye size={14} aria-hidden="true" />
                    <span>{dictionary.about.vision.eyebrow}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                    {dictionary.about.vision.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ink-soft)]">
                    {dictionary.about.vision.body}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--line-subtle)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--ink-faint)] uppercase tracking-wider">
                    Charter Strategic North Star
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--gold)]">2026—2030</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission Card */}
            <ScrollReveal animation="fade-up" delay={40}>
              <div className="site-card p-8 sm:p-10 relative overflow-hidden h-full flex flex-col justify-between border-t-2 border-t-[var(--gold)]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-6">
                    <Compass size={14} aria-hidden="true" />
                    <span>{dictionary.about.mission.eyebrow}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                    {dictionary.about.mission.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ink-soft)]">
                    {dictionary.about.mission.body}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--line-subtle)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--ink-faint)] uppercase tracking-wider">
                    Operational Execution Mandate
                  </span>
                  <Link href="/join" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--gold)] hover:underline">
                    <span>Join the Mission</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
        <div className="container-page">
          <ScrollReveal animation="fade-up" delay={20}>
            <div className="max-w-3xl mb-12">
              <p className="eyebrow">{dictionary.about.values.eyebrow}</p>
              <h2 className="section-title mt-3">{dictionary.about.values.title}</h2>
              <p className="lede mt-4">{dictionary.about.values.intro}</p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dictionary.about.values.items.map((val, index) => {
              const Icon = valueIcons[index] || Sparkles

              return (
                <ScrollReveal key={val.number} animation="fade-up" delay={30 + index * 30}>
                  <article className="site-card p-6 sm:p-8 h-full flex flex-col justify-between group transition-colors duration-200 hover:border-[var(--gold)]/50">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-bold text-[var(--gold)]">
                          VALUE {val.number}
                        </span>
                        <div className="p-2 rounded-sm bg-[var(--gold)]/10 text-[var(--gold)] group-hover:scale-110 transition-transform">
                          <Icon size={18} aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--ink)] tracking-tight group-hover:text-[var(--gold)] transition-colors">
                        {val.title}
                      </h3>
                      <p className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider mt-1">
                        {val.tagline}
                      </p>
                      <p className="mt-4 text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                        {val.body}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Strategic Blueprint: Economic Pragmatism for Egypt ──────────────── */}
      <section id="strategy" className="section-space border-t border-[var(--line)]">
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

      {/* ── Charter Milestones ────────────────────────────────────────── */}
      <section className="section-space border-t border-[var(--line)]">
        <div className="container-page">
          <ScrollReveal animation="fade-up" delay={20}>
            <div className="max-w-2xl mb-10">
              <p className="eyebrow">{dictionary.about.milestones.eyebrow}</p>
              <h2 className="section-title mt-3">{dictionary.about.milestones.title}</h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {dictionary.about.milestones.items.map((m, idx) => (
              <ScrollReveal key={m.tag} animation="fade-up" delay={40 + idx * 40}>
                <div className="site-card p-6 sm:p-8 h-full border-l-2 border-l-[var(--gold)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[var(--gold)]" aria-hidden="true" />
                      <span className="eyebrow">{m.tag}</span>
                    </div>
                    <p className="mt-3 font-mono text-xl font-bold text-[var(--gold)]">{m.date}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{m.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
