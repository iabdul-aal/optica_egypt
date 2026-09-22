import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const SEGMENTS = [
  {
    key: "students",
    id: "01",
    tag: "TALENT AND ACADEMY",
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
    tag: "R AND D LABS",
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
    tag: "HIGHER EDUCATION",
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
    tag: "TELECOM AND MANUFACTURING",
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
    tag: "DEEPTECH VENTURES",
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

            <div className="pt-6 border-t border-[var(--line-subtle)] flex items-center gap-4 text-[10px] font-mono text-[var(--ink-faint)]">
              <span>STATUS: OPEN ACCESS</span>
              <span>{"//"}</span>
              <span>100% SUBSIDIZED</span>
            </div>
          </div>

          {/* Right Column: Architectural Cohort Ledger */}
          <div className="lg:col-span-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {SEGMENTS.map(({ key, id, tag, focus, title, body, outcomes }) => (
              <div
                key={key}
                className="py-8 sm:py-10 group hover:bg-[var(--line-subtle)]/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  {/* Left Metadata Indicator */}
                  <div className="shrink-0 space-y-1">
                    <span className="editorial-label text-[var(--gold)] font-bold">
                      {"//"} {id}
                    </span>
                    <p className="editorial-label text-[10px] text-[var(--ink-faint)]">
                      {tag}
                    </p>
                  </div>

                  {/* Center Content */}
                  <div className="flex-1 max-w-xl space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                        {title}
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-[var(--ink-faint)]">
                      {focus}
                    </p>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed font-light">
                      {body}
                    </p>
                    {/* Outcome Deliverables */}
                    <div className="pt-2">
                      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
                        Core Outcomes
                      </p>
                      <ul className="space-y-1.5">
                        {outcomes.map((outcome, oIdx) => (
                          <li key={oIdx} className="flex items-start gap-2.5 text-xs text-[var(--ink-soft)] leading-relaxed">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden="true" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="shrink-0 sm:self-center">
                    <Link
                      href="/community"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--ink-soft)] group-hover:text-[var(--ink)] py-2 px-3 border border-[var(--line-subtle)] group-hover:border-[var(--gold)] transition-all"
                    >
                      <span>Explore</span>
                      <ArrowUpRight size={14} className="text-[var(--gold)]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}