import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Award,
  Calendar,
  Medal,
  Trophy,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getRecognitionsData,
  getSectionRecognitions,
  getRecognitionMilestones,
} from "@/lib/recognitions"

export const metadata: Metadata = {
  title: "Recognitions",
  description: "Official record of international distinctions, global honors, and national recognitions conferred upon the Optica Egypt Local Section.",
  alternates: {
    canonical: "/recognitions/",
  },
}

export default function RecognitionsPage() {
  const data = getRecognitionsData()
  const recognitions = getSectionRecognitions()
  const milestones = getRecognitionMilestones()

  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        intro={data.intro}
      />

      {/* ── Section Honors Overview ─────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-10">
        <div className="container-page">
          <div className="site-card p-6 sm:p-10 border-l-4 border-l-[var(--gold)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--line-subtle)]">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  <Trophy size={14} aria-hidden="true" />
                  <span>Section Accolades and Honors</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mt-2">
                  Honoring National Excellence in Optics and Photonics
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)] mt-3">
                  {data.overview.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link href="/about" className="btn-secondary">
                  <span>About Our Mission</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/leadership" className="btn-primary">
                  <span>Meet Leadership</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Section Milestones Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {milestones.map((m) => (
                <div key={m.label} className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5">
                  <span className="font-mono text-2xl font-bold text-[var(--gold)]">
                    {m.metric}
                  </span>
                  <p className="text-xs font-semibold text-[var(--ink)] mt-1.5">
                    {m.label}
                  </p>
                  <p className="text-[11px] text-[var(--ink-soft)] mt-1 leading-relaxed">
                    {m.subtext}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Conferred Recognitions ─────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-6 mb-10">
            <p className="eyebrow">Conferred Distinctions</p>
            <h2 className="section-title mt-2">Major Accolades and Citations Gained by the Section</h2>
            <p className="text-xs text-[var(--ink-soft)] mt-2">
              Recognitions awarded by Optica Global, international foundations, and Egyptian academic consortia.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {recognitions.map((item) => (
              <div key={item.id} className="site-card p-6 sm:p-8 flex flex-col justify-between border-l-4 border-l-[var(--gold)]">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                    <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2.5 py-0.5 text-[10px] text-[var(--gold)] font-bold uppercase">
                      {item.badge}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-[var(--gold)]">
                      <Calendar size={13} />
                      {item.year}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)]">
                    {item.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[var(--ink-soft)]">
                    <Medal size={13} className="text-[var(--gold)] shrink-0" />
                    <span>Conferred by: {item.conferringBody}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {item.description}
                  </p>

                  {/* Official Citation Box */}
                  <div className="mt-6 rounded-sm border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-4">
                    <span className="font-mono text-[10px] uppercase text-[var(--gold)] tracking-wider block font-bold">
                      Official Citation:
                    </span>
                    <p className="text-xs italic text-[var(--ink)] mt-1.5 leading-relaxed">
                      &ldquo;{item.citation}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                  <span>{item.category}</span>
                  <span className="inline-flex items-center gap-1 text-[var(--gold)] font-bold">
                    <Award size={13} />
                    Verified Distinction
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Student Fellowships and Grants Cross-Link Banner */}
          <div className="mt-12 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                Looking for Student and Member Funding?
              </span>
              <h3 className="text-lg font-bold text-[var(--ink)]">
                Best Thesis Award and the Optica Egypt Thesis Fund
              </h3>
              <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                If you are a student, researcher, or faculty member seeking project grants, travel support, or competitive thesis awards, explore our Community Fellowships portal.
              </p>
            </div>
            <Link href="/fellowships" className="btn-primary shrink-0 self-start md:self-center">
              <span>Explore Fellowships and Grants</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
