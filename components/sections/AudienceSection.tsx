import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const SEGMENTS = [
  {
    key: "students",
    id: "01",
    tag: "Talent and Academy",
    focus: "Undergraduate, Master's, and Doctoral Candidates",
    title: "Students and Early Career",
    body: "Transition from academic coursework to active research, hands-on laboratory experience, and international career trajectories.",
    outcomes: [
      "Hands-on experimental workshops and simulation tools",
      "Optica international travel grants and conference fellowships",
      "Faculty, industrial lab, and student chapter mentorship",
    ],
  },
  {
    key: "researchers",
    id: "02",
    tag: "R and D Labs",
    focus: "Faculty Members, Postdocs, and Research Scientists",
    title: "Researchers and Principal Investigators",
    body: "Accelerate high-impact research, establish international scientific collaborations, and publish in leading peer-reviewed journals.",
    outcomes: [
      "Cross-institutional collaboration across Egyptian research hubs",
      "Direct engagement with visiting scholars and traveling lecturers",
      "Shared visibility for laboratory facilities and joint proposals",
    ],
  },
  {
    key: "academia",
    id: "03",
    tag: "Higher Education",
    focus: "Department Chairs, Professors, and Curriculum Directors",
    title: "Academia and University Educators",
    body: "Enrich optics and photonics curricula with contemporary research standards and foster sustained institutional recognition.",
    outcomes: [
      "Modern computational photonics and lab demonstration modules",
      "Formal institutional chartering of recognized student chapters",
      "Structured industry liaison channels for student capstone projects",
    ],
  },
  {
    key: "industry",
    id: "04",
    tag: "Telecom and Manufacturing",
    focus: "Optical Engineers, Telecom Specialists, and Technical Directors",
    title: "Industry and Engineering",
    body: "Solve complex engineering bottlenecks, upskill technical workforces, and source specialized photonics engineering talent.",
    outcomes: [
      "Professional training in fiber optics and photonic integrated circuits",
      "Direct talent pipeline of physics and photonics graduates",
      "Collaborative R and D partnerships for prototyping and testing",
    ],
  },
  {
    key: "startups",
    id: "05",
    tag: "Deeptech Ventures",
    focus: "Hardware Founders, Spinout Teams, and Incubators",
    title: "Startups and Innovators",
    body: "Translate scientific discoveries into viable commercial hardware, secure fabrication access, and scale photonics ventures.",
    outcomes: [
      "Access to cleanrooms, testbeds, and MPW fabrication runs",
      "Specialized mentorship on photonics IP and commercialization",
      "Introductions to deeptech investors and innovation grant programs",
    ],
  },
] as const

export function AudienceSection() {
  return (
    <section className="py-24 bg-[var(--surface)] border-b border-[var(--line)] relative">
      <div className="container-page">
        {/* Asymmetric Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authoritative Editorial Manifesto */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[var(--gold)]" />
              <span className="editorial-label text-[var(--gold)]">
                NATIONAL ECOSYSTEM
              </span>
            </div>

            <h2 className="editorial-headline text-[var(--ink)]">
              Built for every layer of Egypt&apos;s photonics community.
            </h2>

            <p className="editorial-lead text-[var(--ink-soft)]">
              Connecting Egypt&apos;s scientific capacity directly to the global photonics frontier. Five specialized pathways designed to eliminate research silos and accelerate industrial innovation.
            </p>

            <div className="pt-6 border-t border-[var(--line-subtle)] flex items-center gap-3 text-xs text-[var(--ink-soft)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              <span>National Ecosystem</span>
              <span className="text-[var(--line)]">·</span>
              <span>Open Access</span>
            </div>
          </div>

          {/* Right Column: Architectural Cohort Ledger */}
          <div className="lg:col-span-8 space-y-6">
            {SEGMENTS.map(({ key, id, tag, focus, title, body, outcomes }) => (
              <div
                key={key}
                className="rounded-xl border border-[var(--line)] bg-[var(--surface-raised)]/25 hover:bg-[var(--surface-raised)]/60 hover:border-[var(--gold)]/40 p-6 sm:p-8 transition-all duration-300 relative"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--gold)]/15 text-[11px] font-semibold text-[var(--gold)] font-mono">
                      {id}
                    </span>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[var(--ink-soft)]">
                      {tag}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--ink-soft)] font-medium bg-[var(--surface)] px-3 py-1 rounded-full border border-[var(--line-subtle)]">
                    {focus}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] hover:text-[var(--gold)] transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed font-light">
                    {body}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[var(--line-subtle)]">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-faint)] mb-3">
                    Strategic Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {outcomes.map((outcome, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-3 text-sm text-[var(--ink-soft)] leading-relaxed font-light">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-[var(--line-subtle)] flex items-center justify-between">
                  <span className="text-xs text-[var(--ink-soft)]">Explore community pathway</span>
                  <Link
                    href="/community"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-md bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#09131F] transition-all"
                  >
                    <span>Explore Pathway</span>
                    <ArrowUpRight size={13} className="text-[var(--gold)]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}