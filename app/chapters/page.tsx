import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Award, Globe, GraduationCap, Info, Instagram, Linkedin, Mail, Sparkles, Users } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ChaptersMap } from "@/components/sections/ChaptersMap"
import {
  getChapterStats,
  getCharteredChapters,
  getCharterRoadmap,
} from "@/lib/chapters"

export const metadata: Metadata = {
  title: "Chapters",
  description: "University Optica student chapters across Egypt, featuring the chartered AUC Student Chapter, geographic distribution map, and nationwide university chartering roadmap.",
  alternates: {
    canonical: "/chapters/",
  },
}

export default function ChaptersPage() {
  const stats = getChapterStats()
  const chartered = getCharteredChapters()
  const roadmap = getCharterRoadmap()

  return (
    <>
      <PageHeader
        eyebrow="University Network"
        title="Optica Chapters in Egypt."
        intro="Student chapters are the campus cornerstone of optics and photonics research. They host technical workshops, invite international traveling lecturers, and connect students to global Optica fellowships and travel grants."
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
            <h2 className="section-title mt-3">University photonics presence across Egypt.</h2>
            <p className="lede max-w-2xl mt-4">
              Explore the chartered AUC Student Chapter in New Cairo. Currently, no other chapters exist in Egypt. The section actively supports students and faculty across all Egyptian universities in establishing new chapters.
            </p>
          </div>

          <ChaptersMap chartered={chartered} />
        </div>
      </section>

      {/* ── Chartered Chapter Spotlight: AUC ──────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-sm border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Sparkles size={13} aria-hidden="true" />
                <span>Chartered Chapter · Currently Inactive</span>
              </div>
              <h2 className="section-title mt-4">The American University in Cairo (AUC)</h2>
              <p className="text-xs font-mono text-[var(--ink-soft)] mt-1">
                School of Sciences and Engineering · Chartered in 2024 · New Cairo Campus
              </p>
            </div>
            <Link href="/chapters/auc" className="btn-primary">
              View Full AUC Profile <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {chartered.map((ch) => (
            <div key={ch.id} className="site-card p-6 sm:p-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
              <div className="space-y-6">
                {/* Reactivation Banner */}
                <div className="rounded-sm border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
                  <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    <strong className="text-[var(--ink)] block font-semibold mb-0.5">
                      Chapter Reactivation Notice
                    </strong>
                    The AUC chapter is Egypt&apos;s first chartered Optica chapter. While campus activities are currently inactive, the Optica Egypt Local Section is actively liaising with university faculty and student researchers to reconstitute the executive board for upcoming academic sessions.
                  </div>
                </div>

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
                      Activities and History
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

      {/* ── Nationwide University Charter Invitation ─────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-12">
            <p className="eyebrow">Nationwide Invitation</p>
            <h2 className="section-title mt-3">Charter an Optica Student Chapter at your university.</h2>
            <p className="lede max-w-2xl mt-4">
              No other university chapters currently exist in Egypt. Whether you study or teach at Cairo University, Ain Shams University, Alexandria University, Mansoura, Assiut, Zewail City, or any Egyptian institution, you can launch an official chapter.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="site-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)]">
                  <Award size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">Annual Chapter Grant</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                  Chartered chapters receive annual direct funding up to $2,000 USD from Optica Global to host seminars, purchase optical demonstration equipment, and organize campus science outreach.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] text-xs font-mono text-[var(--gold)]">
                Direct Global Sponsorship
              </div>
            </div>

            <div className="site-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)]">
                  <Globe size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">Traveling Lecturer Visits</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                  Invite renowned international researchers and industry leaders in silicon photonics, quantum optics, and laser science to visit your campus with travel costs sponsored by Optica.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] text-xs font-mono text-[var(--gold)]">
                International Speaker Program
              </div>
            </div>

            <div className="site-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)]">
                  <Users size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">Conference Travel Fellowships</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                  Active chapter officers and student members gain priority access to international travel grants for Frontiers in Optics (FiO) and Optica leadership conferences worldwide.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] text-xs font-mono text-[var(--gold)]">
                Global Leadership Network
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Charter Roadmap ────────────────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-12">
            <p className="eyebrow">Charter Roadmap</p>
            <h2 className="section-title mt-3">Four steps to launch an Optica Student Chapter.</h2>
            <p className="lede max-w-2xl mt-4">
              The Optica Egypt Local Section guides student founders and faculty advisors through every stage of the charter application process.
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
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
                <GraduationCap size={15} />
                <span>Start Your Campus Chapter</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)]">Ready to establish a chapter at your university?</h3>
              <p className="text-xs text-[var(--ink-soft)]">
                The Optica Egypt Student Affairs Committee provides mentorship, sample constitutions, and chartering support.
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
