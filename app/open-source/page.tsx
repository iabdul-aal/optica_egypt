import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Terminal, Trophy, GitBranch, ExternalLink } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import {
  getOpenSourceProgram,
  getOpenSourcePillars,
  getOpenSourceToolstack,
  getChipathonTimeline,
} from "@/lib/open-source"

export const metadata: Metadata = {
  title: "Open Source",
  description: "Democratizing Photonic Integrated Circuit (PIC) design, open-source PDKs, and PDA tools across Egypt. Modeled after the global open-silicon movement, adapted for photonics.",
  alternates: {
    canonical: "/open-source/",
  },
}

export default function OpenSourcePage() {
  const program = getOpenSourceProgram()
  const pillars = getOpenSourcePillars()
  const tools = getOpenSourceToolstack()
  const timeline = getChipathonTimeline()

  return (
    <>
      <PageHeader
        eyebrow="Technical Program"
        title="Open Source."
        intro={program.intro}
      />

      {/* ── Philosophy Banner ─────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-6">
        <div className="container-page flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-[var(--gold)] animate-pulse" aria-hidden="true" />
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              Core Philosophy: {program.motto}
            </p>
          </div>
          <p className="text-xs text-[var(--ink-soft)] max-w-xl">
            Inspired by the global open-silicon movement, adapted for optics and photonics.
          </p>
        </div>
      </section>

      {/* ── Strategic Pillars ─────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8">
            <p className="eyebrow">Program Architecture</p>
            <h2 className="section-title mt-3">Six pillars enabling accessible optical chip innovation.</h2>
            <p className="lede max-w-2xl mt-4">
              From open Python design automation to AI-driven photonic tooling, we are building a continuous pipeline for Egyptian photonics talent.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.id} animation="fade-up" delay={index * 30}>
                <div className="site-card h-full p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-sm font-bold text-[var(--gold)]">{pillar.number}</span>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{pillar.summary}</p>
                  </div>
                  <div className="mt-6 border-t border-[var(--line-subtle)] pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.tools.map((t) => (
                        <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-sm border border-[var(--line)] text-[var(--ink-faint)] bg-[var(--surface)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open PDA Stack ────────────────────────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
            <div>
              <p className="eyebrow">Tooling and Frameworks</p>
              <h2 className="section-title mt-3">The Open Photonic Design Automation (PDA) Stack.</h2>
            </div>
            <p className="text-sm max-w-md text-[var(--ink-soft)]">
              No million-dollar licenses. Design, route, simulate, and verify optical chips using modern, verifiable open-source software.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool, index) => (
              <ScrollReveal key={tool.name} animation="fade-up" delay={index * 40}>
                <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--gold)]">
                        {tool.category}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[var(--line-subtle)] text-[var(--ink-faint)]">
                        {tool.status}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-[var(--ink)]">{tool.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{tool.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                    <a
                      href={tool.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--ink-soft)] hover:text-[var(--gold)] transition-colors"
                    >
                      <GitBranch size={13} aria-hidden="true" />
                      <span>View repository</span>
                      <ExternalLink size={11} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Egypt Photonic Chipathon ──────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1.5 text-xs text-[var(--gold)] font-mono uppercase">
              <Trophy size={14} aria-hidden="true" />
              <span>Flagship Contest</span>
            </div>
            <h2 className="section-title mt-4">Egypt Photonic Chipathon</h2>
            <p className="lede mt-4">
              Modeled after global open-silicon chipathons, teams from Egyptian universities compete to design, verify, and document novel silicon photonic circuits using open-source tools.
            </p>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
              Winning designs receive funded slots on regional and international Multi-Project Wafer (MPW) fabrication runs, followed by hands-on testing on optical bench testbeds.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/volunteer" className="btn-primary">
                Mentor a Chipathon Team <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/resources" className="btn-secondary">
                Explore PIC Tutorials <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {timeline.map((phase) => (
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

      {/* ── Software-Defined Photonics Hackathon ──────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1.5 text-xs text-[var(--gold)] font-mono uppercase">
              <Terminal size={14} aria-hidden="true" />
              <span>Hackathon Program</span>
            </div>
            <h2 className="section-title mt-4">Software-Defined</h2>
            <p className="lede mt-4">
              A flagship hackathon program to build software tools for photonics or AI models for photonics.
            </p>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
              Participants choose their challenge track: build a Python simulation library, train an inverse-design neural network, or develop an AI model that predicts photonic device performance from structural parameters. All winning projects are published under open-source licenses and integrated into the Optica Egypt open toolchain.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Software Tools Track", desc: "Open-source Python libraries for PIC design automation, FDTD pre/post-processing, or layout scripting." },
                { label: "AI Models Track", desc: "Machine learning or deep learning models for inverse design, fabrication prediction, or anomaly detection in photonics." },
                { label: "Open Datasets Track", desc: "Curated labeled datasets of photonic measurements or simulation results released under open data licenses." },
                { label: "Integration Track", desc: "Plugins, adapters, or workflow connectors linking existing tools like gdsfactory, Meep, or KLayout to new capabilities." },
              ].map((track) => (
                <div key={track.label} className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-4">
                  <h3 className="text-xs font-semibold font-mono text-[var(--gold)] uppercase tracking-wide">{track.label}</h3>
                  <p className="mt-1.5 text-xs text-[var(--ink-soft)] leading-relaxed">{track.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/volunteer" className="btn-primary">
                Join as Mentor or Judge <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/join" className="btn-secondary">
                Register as Participant <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { phase: "Phase 1: Kickoff and Team Formation", timeline: "Week 1", desc: "Participants form teams of 1 to 4, select a track, and receive onboarding materials on photonics software stacks and open datasets." },
              { phase: "Phase 2: Development Sprint", timeline: "Week 2 to 5", desc: "Intensive build phase with weekly check-ins, technical office hours with mentors, and intermediate milestone demos." },
              { phase: "Phase 3: Submission and Code Review", timeline: "Week 6", desc: "Teams submit GitHub repositories with documentation, reproducible demos, and a short technical report describing their contribution." },
              { phase: "Phase 4: Judging and Awards", timeline: "Week 7", desc: "Independent jury of researchers and engineers evaluates novelty, technical depth, reproducibility, and open-source quality. Top projects receive cash prizes and conference travel support." },
            ].map((phase) => (
              <div key={phase.phase} className="site-card p-5 sm:p-6 border-l-2 border-l-[var(--gold)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-semibold text-[var(--ink)] text-base">{phase.phase}</h3>
                  <span className="font-mono text-xs text-[var(--gold)] whitespace-nowrap">{phase.timeline}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quickstart Code Block ─────────────────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
        <div className="container-page">
          <div className="site-card p-6 sm:p-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Get Started in 60 Seconds</p>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] mt-2">
                Your first optical circuit in Python.
              </h2>
              <p className="text-sm leading-6 text-[var(--ink-soft)] mt-3">
                Install the open-source photonic design automation framework and run a ring resonator simulation directly on your laptop.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="https://gdsfactory.github.io/gdsfactory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open gdsfactory Docs <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5 font-mono text-xs text-[var(--ink)] overflow-x-auto">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[var(--line-subtle)] text-[var(--ink-faint)]">
                <Terminal size={14} />
                <span>terminal / python</span>
              </div>
              <pre className="space-y-1.5 leading-relaxed">
                <code><span className="text-[var(--ink-faint)]"># 1. Install gdsfactory</span></code>{"\n"}
                <code>pip install gdsfactory[full]</code>{"\n\n"}
                <code><span className="text-[var(--ink-faint)]"># 2. Design a Mach-Zehnder Interferometer</span></code>{"\n"}
                <code>import gdsfactory as gf</code>{"\n"}
                <code>c = gf.components.mzi()</code>{"\n"}
                <code>c.write_gds(&quot;mzi.gds&quot;)</code>{"\n"}
                <code>c.show()  <span className="text-[var(--ink-faint)]"># Opens KLayout viewer</span></code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
