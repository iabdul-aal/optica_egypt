import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Coins,
  FileText,
  Globe,
  GraduationCap,
  Medal,
  Trophy,
  Users,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getBestThesisAward,
  getElevations,
  getFellowshipsData,
  getGlobalFellowships,
  getThesisFund,
} from "@/lib/fellowships"

export const metadata: Metadata = {
  title: "Fellowships",
  description: "Best Thesis Award in Photonics, Optica Egypt Thesis Fund, and global Optica Foundation fellowships for Egyptian students and researchers.",
  alternates: {
    canonical: "/fellowships/",
  },
}

export default function FellowshipsPage() {
  const data = getFellowshipsData()
  const thesisAward = getBestThesisAward()
  const thesisFund = getThesisFund()
  const globalFellowships = getGlobalFellowships()
  const elevations = getElevations()

  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        intro={data.intro}
      />

      {/* ── Pillar 1: Best Thesis Award in Photonics ────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-3">
              <Trophy size={14} aria-hidden="true" />
              <span>{thesisAward.eyebrow}</span>
            </div>
            <h2 className="section-title">{thesisAward.title}</h2>
            <p className="lede max-w-3xl mt-4">
              {thesisAward.description}
            </p>
          </div>

          {/* Three Academic Levels Grid */}
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {thesisAward.categories.map((cat) => (
              <div key={cat.level} className="site-card p-6 flex flex-col justify-between border-l-4 border-l-[var(--gold)]">
                <div>
                  <span className="font-mono text-xs font-bold text-[var(--gold)] uppercase">
                    {cat.scope}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[var(--ink)] leading-snug">
                    {cat.level}
                  </h3>
                  <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] space-y-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[var(--gold)] tracking-wider block font-bold">
                        Prize and Recognition:
                      </span>
                      <p className="text-xs text-[var(--ink)] mt-0.5 font-medium">
                        {cat.prize}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider block">
                        Eligibility:
                      </span>
                      <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                        {cat.eligibility}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <Link href="/join" className="btn-secondary w-full justify-between text-xs">
                    <span>Submit Thesis</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Evaluation Rubric and Deadline Strip */}
          <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase text-[var(--gold)] tracking-wider block">
                  Evaluation Rubric
                </span>
                <ul className="grid gap-2 sm:grid-cols-2 text-xs text-[var(--ink-soft)]">
                  {thesisAward.evaluationCriteria.map((crit) => (
                    <li key={crit} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-4 text-center lg:text-left">
                <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider block">
                  Annual Submission Window:
                </span>
                <p className="font-mono text-xs font-bold text-[var(--gold)] mt-1">
                  {thesisAward.deadline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillar 2: Optica Egypt Thesis Fund ──────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
              <Coins size={14} />
              <span>{thesisFund.eyebrow}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <h2 className="section-title">{thesisFund.title}</h2>
              <span className="rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-sm font-bold text-[var(--gold)]">
                {thesisFund.grantAmount}
              </span>
            </div>
            <p className="lede max-w-3xl mt-4">
              {thesisFund.description}
            </p>
          </div>

          {/* Eligible Expense Categories */}
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {thesisFund.eligibleExpenses.map((exp) => (
              <div key={exp.category} className="site-card p-6 border-l-4 border-l-[var(--gold)]">
                <span className="font-mono text-xs font-bold text-[var(--gold)] uppercase block">
                  Eligible Expense
                </span>
                <h4 className="text-base font-bold text-[var(--ink)] mt-2">
                  {exp.category}
                </h4>
                <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed">
                  {exp.items}
                </p>
              </div>
            ))}
          </div>

          {/* Application Process and Submission CTA */}
          <div className="site-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                <FileText size={14} />
                <span>Application Process</span>
              </div>
              <ol className="space-y-2 text-xs text-[var(--ink-soft)] list-decimal list-inside leading-relaxed">
                {thesisFund.applicationProcess.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="font-mono text-xs text-[var(--gold)] pt-1 font-bold">
                {thesisFund.deadline}
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <Link href="/join" className="btn-primary">
                <span>Apply for Thesis Fund</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/volunteer" className="btn-secondary">
                <span>Contribute to Fund</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillar 3: Global Optica Foundation Fellowships ──────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
              <Globe size={14} />
              <span>Global Opportunities</span>
            </div>
            <h2 className="section-title">Optica Foundation Fellowships and Grants.</h2>
            <p className="lede max-w-3xl mt-4">
              Prestigious international travel support, summer school sponsorships, and academic scholarships available to active Egyptian student members.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {globalFellowships.map((fellowship) => (
              <div key={fellowship.id} className="site-card p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                      {fellowship.scope}
                    </span>
                    <span className="rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--gold)]">
                      {fellowship.organization}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold tracking-tight text-[var(--ink)]">
                    {fellowship.title}
                  </h3>

                  <div className="mt-2 inline-flex items-center gap-2 text-xs font-mono text-[var(--gold)] font-bold">
                    <Award size={13} />
                    <span>{fellowship.grant}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {fellowship.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <a
                    href={fellowship.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-between"
                  >
                    <span>Visit Optica Foundation Portal</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillar 4: Professional Member Elevations ────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
              <Medal size={14} />
              <span>{elevations.eyebrow}</span>
            </div>
            <h2 className="section-title">{elevations.title}</h2>
            <p className="lede max-w-3xl mt-4">
              {elevations.description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {elevations.tiers.map((tier) => (
              <div key={tier.tier} className="site-card p-6 sm:p-8 flex flex-col justify-between border-l-4 border-l-[var(--gold)]">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--gold)]">
                    <Users size={14} />
                    <span>{tier.experience}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                    {tier.tier}
                  </h3>

                  <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-4">
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider block">
                      Privileges and Distinction:
                    </span>
                    <p className="text-xs text-[var(--ink-soft)] mt-1 leading-relaxed">
                      {tier.perks}
                    </p>
                  </div>

                  <div className="rounded-sm border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-4">
                    <span className="font-mono text-[10px] uppercase text-[var(--gold)] tracking-wider block font-bold">
                      Section Nomination Support:
                    </span>
                    <p className="text-xs text-[var(--ink-soft)] mt-1 leading-relaxed">
                      {tier.support}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <Link href="/volunteer" className="btn-secondary w-full justify-between">
                    <span>Request Elevation Consultation</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Chapters and Community Connection */}
          <div className="mt-12 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                <GraduationCap size={14} />
                <span>Campus Chapter Network</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                Charter an Optica Student Chapter on your campus
              </h3>
              <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                Student chapters receive annual activity grants ($2,000+ USD), fully funded traveling lecturer visits, and priority fellowship consideration.
              </p>
            </div>
            <Link href="/chapters" className="btn-primary shrink-0">
              <span>Explore Chapters</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
