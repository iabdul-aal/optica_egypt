import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Terminal,
  Trophy,
  Users,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getCompetitionAwards,
  getCompetitionPhases,
  getCompetitionRubric,
  getCompetitionTracks,
  getFlagshipHackathon,
  getRelatedContests,
} from "@/lib/competitions"

export const metadata: Metadata = {
  title: "Competitions and Hackathons",
  description: "Software-Defined Photonics Hackathon and technical design contests across Egypt. Build open-source software tools for photonics and AI models for optics.",
  alternates: {
    canonical: "/competitions/",
  },
}

export default function CompetitionsPage() {
  const flagship = getFlagshipHackathon()
  const tracks = getCompetitionTracks()
  const phases = getCompetitionPhases()
  const rubric = getCompetitionRubric()
  const awards = getCompetitionAwards()
  const relatedContests = getRelatedContests()

  return (
    <>
      <PageHeader
        eyebrow="Competitive Technical Programs"
        title="Competitions and Hackathons."
        intro={flagship.intro}
      />

      {/* ── Flagship Hackathon Hero Spotlight ─────────────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-12">
        <div className="container-page">
          <div className="site-card p-6 sm:p-10 border-l-4 border-l-[var(--gold)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--line-subtle)]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  <Terminal size={14} aria-hidden="true" />
                  <span>{flagship.eyebrow}</span>
                </div>
                <h2 className="section-title mt-3">{flagship.name}</h2>
                <p className="font-mono text-xs text-[var(--gold)] mt-1">
                  {flagship.edition} · {flagship.motto}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link href="/join" className="btn-primary">
                  Register as Competitor <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/volunteer" className="btn-secondary">
                  Apply as Mentor or Judge <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-[var(--ink-soft)] max-w-4xl">
              {flagship.description}
            </p>

            {/* Quick Metrics Strip */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-6 border-t border-[var(--line-subtle)]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Competition Format
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">{flagship.format}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Team Composition
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">{flagship.teamSize}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Code Licensing
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">{flagship.licensing}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Registration Window
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--gold)] mt-0.5">{flagship.registrationDeadline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Challenge Tracks ──────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-12">
            <p className="eyebrow">Challenge Architecture</p>
            <h2 className="section-title mt-3">Four challenge tracks for software and artificial intelligence builders.</h2>
            <p className="lede max-w-2xl mt-4">
              Select the track matching your skills. Whether writing Python automation scripts, training neural surrogates, or curating benchmark datasets, every project advances open-access optics.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {tracks.map((track) => (
              <div key={track.id} className="site-card p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                    <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2 py-0.5 text-[10px] text-[var(--gold)] font-bold">
                      TRACK {track.number}
                    </span>
                    <span>{track.focus}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)]">
                    {track.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {track.description}
                  </p>

                  {/* Example Problem Statements */}
                  <div className="mt-6 space-y-2">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
                      Example Challenge Topics
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[var(--ink-soft)]">
                      {track.exampleTopics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <span className="text-[10px] font-mono uppercase text-[var(--ink-faint)] tracking-wider block mb-2">
                    Recommended Toolchain:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline and Progression Phases ───────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Hackathon Roadmap</p>
            <h2 className="section-title mt-3">Seven-week build sprint from onboarding to grand finale.</h2>
            <p className="lede mt-4">
              A structured championship designed with weekly check-ins, mentor office hours, and peer feedback to take projects from concept to documented open-source release.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5">
                <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
                  <Users size={14} />
                  <span>Mentor Network</span>
                </div>
                <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed">
                  Every registered team is paired with an academic researcher or industry engineer specializing in Python PDA tooling, numerical simulation, or machine learning for optics.
                </p>
              </div>

              <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5">
                <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
                  <Code2 size={14} />
                  <span>Open Repositories</span>
                </div>
                <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed">
                  All submissions are hosted on GitHub under community-friendly open licenses, ensuring winning tools directly benefit students, research labs, and startups across Egypt.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {phases.map((phase) => (
              <div key={phase.phase} className="site-card p-5 sm:p-6 border-l-2 border-l-[var(--gold)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-semibold text-[var(--ink)] text-base">{phase.phase}</h3>
                  <span className="font-mono text-xs text-[var(--gold)] whitespace-nowrap">{phase.timeline}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Evaluation Rubric and Awards ───────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Judging Rubric */}
            <div>
              <div className="border-b border-[var(--line)] pb-6 mb-6">
                <p className="eyebrow">Scoring Standard</p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] mt-2">
                  Independent Technical Evaluation Rubric
                </h2>
                <p className="text-xs text-[var(--ink-soft)] mt-2">
                  Entries are scored by a technical jury comprising university professors, research fellows, and photonic layout engineers.
                </p>
              </div>

              <div className="space-y-4">
                {rubric.map((item) => (
                  <div key={item.criterion} className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[var(--ink)]">{item.criterion}</h3>
                      <span className="font-mono text-xs font-bold text-[var(--gold)]">{item.weight}</span>
                    </div>
                    <p className="text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards and Recognition */}
            <div>
              <div className="border-b border-[var(--line)] pb-6 mb-6">
                <p className="eyebrow">Honors and Prizes</p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] mt-2">
                  Championship Awards and Fellowships
                </h2>
                <p className="text-xs text-[var(--ink-soft)] mt-2">
                  Recognizing excellence with cash prizes, travel subsidies, and direct integration into the national open-source photonics stack.
                </p>
              </div>

              <div className="space-y-4">
                {awards.map((award) => (
                  <div key={award.place} className="site-card p-5 border-l-2 border-l-[var(--gold)]">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                      <Trophy size={14} />
                      <span>{award.place}</span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-[var(--ink)]">{award.reward}</h3>
                    <p className="text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed">{award.perks}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Contests Arena ────────────────────────────────────────── */}
      {relatedContests.length > 0 && (
        <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
          <div className="container-page">
            <div className="border-b border-[var(--line)] pb-6 mb-8">
              <p className="eyebrow">National Competition Arena</p>
              <h2 className="section-title mt-2">Additional Design Contests and Academic Challenges.</h2>
              <p className="text-xs text-[var(--ink-soft)] mt-2">
                Complementing the Software-Defined Hackathon with physical silicon tapeouts and student research poster competitions.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedContests.map((contest) => (
                <div key={contest.id} className="site-card p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--gold)] uppercase font-bold">
                      <Cpu size={14} />
                      <span>{contest.category}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--ink)] mt-3">
                      {contest.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-[var(--ink-soft)] mt-2">
                      {contest.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                    <Link href={contest.href} className="btn-secondary w-full justify-between">
                      <span>Explore {contest.name}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
