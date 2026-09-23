import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Award,
  Globe,
  GraduationCap,
  Medal,
  Trophy,
  Users,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getElevations,
  getGlobalFellowships,
  getSectionAwards,
} from "@/lib/awards"
import { getDictionary } from "@/lib/locales"

export const metadata: Metadata = {
  title: "Awards and Honors",
  description: "Recognizing scientific excellence, chapter leadership, and distinguished service across Egypt's optics and photonics community.",
  alternates: {
    canonical: "/awards/",
  },
}

export default function AwardsPage() {
  const dictionary = getDictionary("en")
  const sectionAwards = getSectionAwards()
  const globalFellowships = getGlobalFellowships()
  const elevations = getElevations()

  return (
    <>
      <PageHeader
        eyebrow={dictionary.awards.eyebrow}
        title={dictionary.awards.title}
        intro={dictionary.awards.intro}
      />

      {/* ── Awards Category Quick Jump ───────────────────────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-8">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            <a
              href="#section-awards"
              className="site-card p-6 border-l-4 border-l-[var(--gold)] hover:border-[var(--gold)] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  Category 01
                </span>
                <Trophy size={18} className="text-[var(--gold)]" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                Section Honors
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                National awards celebrating chapter excellence, student theses, early-career researchers, and lifetime service.
              </p>
            </a>

            <a
              href="#global-fellowships"
              className="site-card p-6 border-l-4 border-l-[var(--gold)] hover:border-[var(--gold)] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  Category 02
                </span>
                <Globe size={18} className="text-[var(--gold)]" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                Global Fellowships
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                Optica Foundation international travel grants, Siegman School fellowships, and Women Scholars awards.
              </p>
            </a>

            <a
              href="#elevations"
              className="site-card p-6 border-l-4 border-l-[var(--gold)] hover:border-[var(--gold)] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  Category 03
                </span>
                <Medal size={18} className="text-[var(--gold)]" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                Member Elevations
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                Nomination support and peer endorsements for Senior Member and Fellow elevation across Egyptian institutions.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 1: Local Section Awards ─────────────────────────────────── */}
      <section id="section-awards" className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-3">
              <Trophy size={14} aria-hidden="true" />
              <span>National Honors Program</span>
            </div>
            <h2 className="section-title">Optica Egypt Section Awards.</h2>
            <p className="lede max-w-3xl mt-4">
              Annual recognitions celebrating outstanding leadership, student chapter vitality, early-career breakthroughs, and academic research achievements across Egypt.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {sectionAwards.map((award) => (
              <div key={award.id} className="site-card p-6 sm:p-8 flex flex-col justify-between border-l-4 border-l-[var(--gold)]">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                    <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2.5 py-0.5 text-[10px] text-[var(--gold)] font-bold uppercase">
                      {award.eyebrow}
                    </span>
                    <span>{award.category}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)]">
                    {award.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {award.description}
                  </p>

                  <div className="mt-6 space-y-3 pt-4 border-t border-[var(--line-subtle)]">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider block">
                        Eligibility Criteria:
                      </span>
                      <p className="text-xs text-[var(--ink)] mt-0.5 font-medium">
                        {award.eligibility}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase text-[var(--gold)] tracking-wider block font-bold">
                        Honor and Award Package:
                      </span>
                      <p className="text-xs text-[var(--ink)] mt-0.5">
                        {award.prize}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[var(--gold)]">
                    {award.deadline}
                  </span>
                  <Link href="/join" className="btn-secondary text-xs">
                    <span>Nominate</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Global Optica Foundation Fellowships ─────────────────── */}
      <section id="global-fellowships" className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
              <Globe size={14} />
              <span>International Opportunities</span>
            </div>
            <h2 className="section-title">Optica Foundation Fellowships and Grants.</h2>
            <p className="lede max-w-3xl mt-4">
              Prestigious global fellowships and travel support programs available to active Egyptian student members and early-career researchers.
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

      {/* ── Section 3: Professional Elevations ──────────────────────────────── */}
      <section id="elevations" className="section-space">
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

                  <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-4">
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

          {/* Student Chapter Connection Callout */}
          <div className="mt-12 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                <GraduationCap size={14} />
                <span>Chapter Excellence Pathway</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                Looking to qualify your university for the Chapter of the Year Award?
              </h3>
              <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                Student chapters gain eligibility through active campus workshops, STEM outreach roadshows, and submitting verified annual activity reports to Optica Global.
              </p>
            </div>
            <Link href="/chapters" className="btn-primary shrink-0">
              Explore Chapters Network <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
