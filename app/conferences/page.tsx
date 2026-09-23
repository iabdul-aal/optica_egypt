import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  FileText,
  Trophy,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getAuthorGuidelines,
  getConferenceCommittees,
  getConferenceDeadlines,
  getConferenceRegistration,
  getConferenceTracks,
  getFlagshipConference,
} from "@/lib/conferences"
import { getDictionary } from "@/lib/locales"

export const metadata: Metadata = {
  title: "Conferences and Symposia",
  description: "Egypt Photonics Conference (EPC 2027). The premier annual peer-reviewed scientific conference in optics, photonics, and quantum technologies.",
  alternates: {
    canonical: "/conferences/",
  },
}

export default function ConferencesPage() {
  const dictionary = getDictionary("en")
  const flagship = getFlagshipConference()
  const tracks = getConferenceTracks()
  const deadlines = getConferenceDeadlines()
  const committees = getConferenceCommittees()
  const registration = getConferenceRegistration()
  const guidelines = getAuthorGuidelines()

  return (
    <>
      <PageHeader
        eyebrow={dictionary.conferences.eyebrow}
        title={dictionary.conferences.title}
        intro={dictionary.conferences.intro}
      />

      {/* ── Flagship Conference Hero Spotlight ──────────────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-12">
        <div className="container-page">
          <div className="site-card p-6 sm:p-10 border-l-4 border-l-[var(--gold)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--line-subtle)]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  <Trophy size={14} aria-hidden="true" />
                  <span>{flagship.eyebrow}</span>
                </div>
                <h2 className="section-title mt-3">
                  {flagship.name} ({flagship.acronym})
                </h2>
                <p className="font-mono text-xs sm:text-sm text-[var(--gold)] mt-1">
                  {flagship.edition} · {flagship.motto}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link href="/join" className="btn-primary">
                  Submit Paper / Abstract <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/events" className="btn-secondary">
                  Routine Events Calendar <ArrowUpRight size={14} aria-hidden="true" />
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
                  Conference Dates
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--gold)] mt-0.5">{flagship.dates}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Host Institutions
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">{flagship.venue}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Program Format
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">{flagship.format}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Publication Digest
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">Indexed DOI Proceedings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call for Papers: Technical Tracks ───────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-12">
            <p className="eyebrow">Call for Papers (CFP)</p>
            <h2 className="section-title mt-3">Five peer-reviewed technical conference tracks.</h2>
            <p className="lede max-w-3xl mt-4">
              Authors are invited to submit original, unpublished research papers and extended abstracts describing theoretical, experimental, and applied advances in photonics.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <div key={track.id} className="site-card p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                    <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2 py-0.5 text-[10px] text-[var(--gold)] font-bold">
                      TRACK {track.number}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold tracking-tight text-[var(--ink)] leading-snug">
                    {track.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {track.scope}
                  </p>

                  <div className="mt-5 space-y-2">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
                      Topics of Interest
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[var(--ink-soft)]">
                      {track.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <Link href="/join" className="btn-secondary w-full justify-between">
                    <span>Submit to Track {track.number}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Author Guidelines Card */}
            <div className="site-card p-6 sm:p-8 bg-[var(--surface-raised)] border-l-4 border-l-[var(--gold)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                  <FileText size={14} />
                  <span>Author Guidelines</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">
                  Submission and Manuscript Policy
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                  {guidelines.pageLimit}
                </p>
                <div className="mt-4 p-3 rounded-sm bg-[var(--surface)] border border-[var(--line)]">
                  <span className="font-mono text-[10px] uppercase text-[var(--gold)] tracking-wider block font-bold">
                    Peer Review Standard:
                  </span>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">
                    {guidelines.peerReview}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                <p className="text-[11px] text-[var(--ink-faint)] leading-relaxed">
                  {guidelines.templates}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Important Dates Timeline ────────────────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-6 mb-8">
            <p className="eyebrow">Conference Roadmap</p>
            <h2 className="section-title mt-2">Important Deadlines and Milestones.</h2>
            <p className="text-xs text-[var(--ink-soft)] mt-2">
              Mark your calendar for key submission dates, review notifications, and registration deadlines.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deadlines.map((item, index) => (
              <div key={item.milestone} className="site-card p-5 border-l-2 border-l-[var(--gold)]">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                  <span className="text-[var(--gold)] font-bold">STAGE 0{index + 1}</span>
                  <span className="rounded-sm bg-[var(--surface)] border border-[var(--line)] px-2 py-0.5 text-[10px]">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-[var(--ink)]">{item.milestone}</h3>
                <div className="mt-3 flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--gold)]">
                  <Calendar size={13} />
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conference Committees and Leadership ────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <p className="eyebrow">Academic Governance</p>
            <h2 className="section-title mt-2">Conference Leadership and Technical Program Committee.</h2>
            <p className="lede max-w-3xl mt-4">
              Guided by distinguished Egyptian faculty, IEEE and Optica senior members, and research fellows dedicated to rigorous peer review.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* General Chairs */}
            <div className="site-card p-6">
              <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold tracking-wider block mb-3">
                General Co-Chairs
              </span>
              <div className="space-y-4">
                {committees.generalChairs.map((chair) => (
                  <div key={chair.name} className="border-b border-[var(--line-subtle)] pb-3 last:border-0 last:pb-0">
                    <p className="font-semibold text-sm text-[var(--ink)]">{chair.name}</p>
                    <p className="text-xs text-[var(--ink-soft)] mt-0.5">{chair.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TPC Chairs */}
            <div className="site-card p-6">
              <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold tracking-wider block mb-3">
                Technical Program Chairs
              </span>
              <div className="space-y-4">
                {committees.tpcChairs.map((chair) => (
                  <div key={chair.name} className="border-b border-[var(--line-subtle)] pb-3 last:border-0 last:pb-0">
                    <p className="font-semibold text-sm text-[var(--ink)]">{chair.name}</p>
                    <p className="text-xs text-[var(--ink-soft)] mt-0.5">{chair.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Publication Chairs */}
            <div className="site-card p-6">
              <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold tracking-wider block mb-3">
                Publication and Proceedings
              </span>
              <div className="space-y-4">
                {committees.publicationChairs.map((chair) => (
                  <div key={chair.name} className="border-b border-[var(--line-subtle)] pb-3 last:border-0 last:pb-0">
                    <p className="font-semibold text-sm text-[var(--ink)]">{chair.name}</p>
                    <p className="text-xs text-[var(--ink-soft)] mt-0.5">{chair.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Steering Committee */}
            <div className="site-card p-6">
              <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold tracking-wider block mb-3">
                Organizing Secretariat
              </span>
              <div className="space-y-3">
                {committees.steeringCommittee.map((member) => (
                  <div key={member.name} className="border-b border-[var(--line-subtle)] pb-2.5 last:border-0 last:pb-0">
                    <p className="font-semibold text-xs text-[var(--ink)]">{member.name}</p>
                    <p className="text-[11px] text-[var(--ink-soft)]">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Registration Packages and Exhibition ──────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <p className="eyebrow">Participation</p>
            <h2 className="section-title mt-2">Registration Packages and Industry Exhibition.</h2>
            <p className="lede max-w-3xl mt-4">
              Tiered registration supporting authors, students, and industry partners with transparent academic pricing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {registration.map((tier) => (
              <div key={tier.tier} className="site-card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">{tier.tier}</h3>
                  <p className="font-mono text-base font-bold text-[var(--gold)] mt-2">{tier.fee}</p>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">{tier.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <Link href="/join" className="btn-secondary w-full justify-center text-xs">
                    Register for Conference
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Connection to Routine Events Banner */}
          <div className="mt-12 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                <Calendar size={14} />
                <span>Routine Section Activities</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                Looking for monthly seminars, workshops, and lab visits?
              </h3>
              <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                While the Egypt Photonics Conference is our flagship annual research summit, Optica Egypt organizes ongoing in-person and virtual events throughout the academic year.
              </p>
            </div>
            <Link href="/events" className="btn-primary shrink-0">
              View Events Calendar <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
