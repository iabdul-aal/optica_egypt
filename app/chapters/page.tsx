import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Globe, Instagram, Linkedin, Mail, Sparkles } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { ChaptersMap } from "@/components/sections/ChaptersMap"
import {
  getChapterStats,
  getCharteredChapters,
  getPipelineChapters,
  getCharterRoadmap,
} from "@/lib/chapters"

export const metadata: Metadata = {
  title: "Student Chapters",
  description: "University Optica student chapters across Egypt, featuring the chartered AUC Student Chapter, campus statistics, geographic distribution map, and chartering roadmap.",
  alternates: {
    canonical: "/chapters/",
  },
}

export default function ChaptersPage() {
  const stats = getChapterStats()
  const chartered = getCharteredChapters()
  const pipeline = getPipelineChapters()
  const roadmap = getCharterRoadmap()

  return (
    <>
      <PageHeader
        eyebrow="University Network"
        title="Optica Student Chapters in Egypt."
        intro="Student chapters are the heartbeat of campus optics research. They organize hands-on technical workshops, invite international traveling lecturers, and connect students to global Optica fellowships."
      />

      {/* ── Key Statistics Row ────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-8">
        <div className="container-page grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <div key={s.label} className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                Metric 0{idx + 1}
              </span>
              <p className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
                {s.value}
              </p>
              <p className="text-xs font-semibold text-[var(--ink)]">{s.label}</p>
              <p className="text-[11px] text-[var(--ink-soft)] leading-tight">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Egypt Campus Geographic Hub and Map ─────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <p className="eyebrow">Geographic Distribution</p>
            <h2 className="section-title mt-3">Active and emerging university hubs across Egypt.</h2>
            <p className="lede max-w-2xl mt-4">
              Explore the chartered AUC Student Chapter in New Cairo and the active university chapters currently in formation across the Delta and Mediterranean coast.
            </p>
          </div>

          <ChaptersMap chartered={chartered} pipeline={pipeline} />
        </div>
      </section>

      {/* ── Active Chartered Chapter Spotlight: AUC ───────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                <Sparkles size={13} aria-hidden="true" />
                <span>Chartered University Chapter</span>
              </div>
              <h2 className="section-title mt-4">The American University in Cairo (AUC)</h2>
              <p className="text-xs font-mono text-[var(--ink-soft)] mt-1">
                School of Sciences and Engineering · Chartered in 2024 · New Cairo
              </p>
            </div>
            <Link href="/chapters/auc" className="btn-primary">
              View Full AUC Profile <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {chartered.map((ch) => (
            <div key={ch.id} className="site-card p-6 sm:p-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--ink)]">About the Chapter</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {ch.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
                    Core Technical and Research Focus
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ch.focusAreas?.map((area) => (
                      <span
                        key={area}
                        className="rounded-sm border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-xs font-mono text-[var(--ink)]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {ch.highlights && (
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
                      Recent Activities and Milestones
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-[var(--ink-soft)]">
                      {ch.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span className="text-[var(--gold)] mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar with Contacts and Advisor */}
              <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                      Campus Location
                    </span>
                    <p className="font-semibold text-sm text-[var(--ink)] mt-0.5">{ch.campus}</p>
                    <p className="text-xs text-[var(--ink-soft)]">{ch.city}, {ch.governorate}</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--line-subtle)]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                      Faculty Advisor
                    </span>
                    <p className="font-semibold text-sm text-[var(--ink)] mt-0.5">{ch.facultyAdvisor}</p>
                    <p className="text-xs text-[var(--ink-soft)]">{ch.advisorDepartment}</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--line-subtle)]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                      Official Chapter Channels
                    </span>
                    <div className="mt-3 grid gap-2">
                      {ch.socials?.email && (
                        <a
                          href={`mailto:${ch.socials.email}`}
                          className="inline-flex items-center gap-2 text-xs text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                        >
                          <Mail size={13} className="text-[var(--gold)]" />
                          <span>{ch.socials.email}</span>
                        </a>
                      )}
                      {ch.socials?.linkedin && (
                        <a
                          href={ch.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                        >
                          <Linkedin size={13} className="text-[var(--gold)]" />
                          <span>LinkedIn Page</span>
                          <ArrowUpRight size={11} />
                        </a>
                      )}
                      {ch.socials?.website && (
                        <a
                          href={ch.socials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                        >
                          <Globe size={13} className="text-[var(--gold)]" />
                          <span>University Physics Department</span>
                          <ArrowUpRight size={11} />
                        </a>
                      )}
                      {ch.socials?.instagram && (
                        <a
                          href={ch.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                        >
                          <Instagram size={13} className="text-[var(--gold)]" />
                          <span>Instagram</span>
                          <ArrowUpRight size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <Link href={`/chapters/${ch.id}`} className="btn-secondary w-full justify-center">
                    Read Detailed Profile <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Chapters in Pipeline ─────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-12">
            <p className="eyebrow">Emerging Campus Chapters</p>
            <h2 className="section-title mt-3">Universities currently in the chartering pipeline.</h2>
            <p className="lede max-w-2xl mt-4">
              Student researchers and faculty at these institutions are establishing executive committees, drafting bylaws, and preparing official charter packages.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pipeline.map((p, idx) => (
              <ScrollReveal key={p.id} animation="fade-up" delay={idx * 30}>
                <div className="site-card p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                      <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2 py-0.5 text-[10px] text-[var(--gold)]">
                        {p.status}
                      </span>
                      <span>Target: {p.targetYear}</span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">{p.university}</h3>
                    <p className="text-xs font-mono text-[var(--gold)] mt-1">{p.faculty}</p>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">{p.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                    <Link href="/volunteer" className="text-link text-xs">
                      Join this formation team <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Charter Roadmap ────────────────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-12">
            <p className="eyebrow">Charter Roadmap</p>
            <h2 className="section-title mt-3">How to launch an Optica Student Chapter at your campus.</h2>
            <p className="lede max-w-2xl mt-4">
              Optica provides formal recognition, startup funding, traveling lecturer visits, and conference fellowships for chartered student chapters.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((step) => (
              <div key={step.step} className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-sm font-bold text-[var(--gold)]">{step.step}</span>
                  <h3 className="mt-3 text-base font-semibold text-[var(--ink)]">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 site-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--ink)]">Ready to begin the chartering process?</h3>
              <p className="text-xs text-[var(--ink-soft)] mt-1">
                The Optica Egypt Section Student Affairs Committee provides mentorship and template constitution files.
              </p>
            </div>
            <Link href="/volunteer" className="btn-primary shrink-0">
              Connect with Chapter Liaison <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
