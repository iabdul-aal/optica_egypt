import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Laptop,
  Trophy,
  Users,
  Video,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getEducationContests,
  getPhotonicsSchool,
  getWebinars,
} from "@/lib/education"
import { getDictionary } from "@/lib/locales"

export const metadata: Metadata = {
  title: "Education and Technical Training",
  description: "Egypt Photonics School, Distinguished Webinar Series, and student design contests. Advanced academic upskilling for optics and photonics.",
  alternates: {
    canonical: "/education/",
  },
}

export default function EducationPage() {
  const dictionary = getDictionary("en")
  const school = getPhotonicsSchool()
  const webinars = getWebinars()
  const contests = getEducationContests()

  return (
    <>
      <PageHeader
        eyebrow={dictionary.education.eyebrow}
        title={dictionary.education.title}
        intro={dictionary.education.intro}
      />

      {/* ── Triad Pillar Quick Overview ──────────────────────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-8">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            <a
              href="#school"
              className="site-card p-6 border-l-4 border-l-[var(--gold)] hover:border-[var(--gold)] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  Pillar 01
                </span>
                <GraduationCap size={18} className="text-[var(--gold)]" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                Photonics Seasonal School
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                Five-day intensive winter camp with daily hands-on CAD laboratories in silicon photonics and FDTD simulation.
              </p>
            </a>

            <a
              href="#webinars"
              className="site-card p-6 border-l-4 border-l-[var(--gold)] hover:border-[var(--gold)] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  Pillar 02
                </span>
                <Video size={18} className="text-[var(--gold)]" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                Distinguished Webinars
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                Virtual masterclasses featuring international Optica Traveling Lecturers and Egyptian diaspora pioneers.
              </p>
            </a>

            <a
              href="#contests"
              className="site-card p-6 border-l-4 border-l-[var(--gold)] hover:border-[var(--gold)] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  Pillar 03
                </span>
                <Trophy size={18} className="text-[var(--gold)]" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                Student Contests
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                Software-Defined Photonics Hackathon and physical silicon Chipathon turning theory into working systems.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ── Pillar 1: Flagship Photonics School ──────────────────────────────── */}
      <section id="school" className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-3">
              <GraduationCap size={14} aria-hidden="true" />
              <span>{school.eyebrow}</span>
            </div>
            <h2 className="section-title">{school.name}</h2>
            <p className="font-mono text-sm text-[var(--gold)] mt-1">
              {school.edition} · {school.tagline}
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ink-soft)] max-w-4xl">
              {school.description}
            </p>

            {/* School Logistics Summary Strip */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-6 border-t border-[var(--line-subtle)]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Host Institutions
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">{school.hostInstitution}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Scheduled Dates
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--gold)] mt-0.5">{school.dates}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Delivery Format
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">{school.format}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  Tuition and Funding
                </span>
                <p className="font-semibold text-xs sm:text-sm text-[var(--ink)] mt-0.5">{school.tuition}</p>
              </div>
            </div>
          </div>

          {/* School Modules Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                  Curriculum Modules and Syllabi
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1">
                  Five foundational lectures designed to bring attendees from basic physics to silicon tapeout readiness.
                </p>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs text-[var(--gold)]">
                5 Intensive Modules
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {school.modules.map((mod) => (
                <div key={mod.id} className="site-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--gold)]">
                        MODULE {mod.number}
                      </span>
                    </div>
                    <h4 className="mt-4 text-base font-bold text-[var(--ink)] leading-snug">
                      {mod.title}
                    </h4>
                    <p className="mt-2.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                      {mod.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider block">
                      Lead Instructor:
                    </span>
                    <p className="text-xs font-medium text-[var(--ink)] mt-0.5">
                      {mod.instructor}
                    </p>
                  </div>
                </div>
              ))}

              {/* Hands-on Laboratory Highlight Card */}
              <div className="site-card p-6 bg-[var(--surface-raised)] border-l-4 border-l-[var(--gold)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                    <Laptop size={14} />
                    <span>Applied Computing</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-[var(--ink)]">
                    Daily 3-Hour Hands-on CAD Laboratories
                  </h4>
                  <p className="mt-2.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                    Every afternoon, participants run gdsfactory Python scripts and Meep electromagnetic wave simulations on cloud compute instances, completing a DRC-clean photonic component.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider block font-bold">
                    Official Certification
                  </span>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    {school.certificate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* School Highlights and CTA */}
          <div className="site-card p-6 sm:p-8 bg-[var(--surface-raised)] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h4 className="text-lg font-bold text-[var(--ink)]">
                Ready to participate in the Egypt Photonics Winter School?
              </h4>
              <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                Applications open for senior undergraduates, M.Sc. and Ph.D. researchers, and faculty members from all Egyptian engineering and science faculties. Scholarships available for out-of-Cairo university students.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/join" className="btn-primary">
                Apply for Winter School <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/volunteer" className="btn-secondary">
                Host / Sponsor School <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillar 2: Distinguished Webinar Series ──────────────────────────── */}
      <section id="webinars" className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
              <Video size={14} />
              <span>{webinars.eyebrow}</span>
            </div>
            <h2 className="section-title">{webinars.title}</h2>
            <p className="lede max-w-3xl mt-3">
              {webinars.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-[var(--ink-soft)]">
              {webinars.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Webinars Schedule List */}
          <div className="space-y-6">
            {webinars.schedule.map((talk) => (
              <div key={talk.id} className="site-card p-6 sm:p-8 border-l-4 border-l-[var(--gold)]">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--ink-faint)]">
                      <span className="rounded-sm bg-[var(--surface)] border border-[var(--line)] px-2.5 py-0.5 text-[var(--gold)] font-bold">
                        {talk.status}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-[var(--gold)]" />
                        {talk.date} · {talk.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video size={13} className="text-[var(--gold)]" />
                        {talk.platform}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                      {talk.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-[var(--ink)]">{talk.speaker}</span>
                      <span className="text-[var(--ink-faint)]">·</span>
                      <span className="text-[var(--ink-soft)]">{talk.role}</span>
                    </div>

                    <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                      {talk.abstract}
                    </p>
                  </div>

                  <div className="shrink-0 flex lg:flex-col gap-3">
                    <Link href={talk.registrationUrl} className="btn-primary whitespace-nowrap">
                      Register for Webinar <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                    <Link href="/events" className="btn-secondary whitespace-nowrap">
                      View All Events <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillar 3: Contests and Student Challenges ─────────────────────────── */}
      <section id="contests" className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
              <Trophy size={14} />
              <span>{contests.eyebrow}</span>
            </div>
            <h2 className="section-title">{contests.title}</h2>
            <p className="lede max-w-3xl mt-3">
              {contests.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {contests.items.map((contest) => (
              <div key={contest.id} className="site-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--gold)] uppercase">
                      {contest.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">
                    {contest.title}
                  </h3>

                  <p className="mt-1 font-mono text-[11px] text-[var(--gold)]">
                    {contest.category}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {contest.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <Link href={contest.href} className="btn-secondary w-full justify-between">
                    <span>Explore Challenge</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Educational Mentorship and Diaspora Support */}
          <div className="mt-12 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                  <Users size={14} />
                  <span>Egyptian Photonics Diaspora and Academic Mentors</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                  Are you an Egyptian researcher abroad or university professor?
                </h3>
                <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                  Contribute to national education by delivering a distinguished webinar, mentoring a hackathon team, or co-organizing a module at the next seasonal school.
                </p>
              </div>
              <Link href="/volunteer" className="btn-primary shrink-0">
                Join Education Committee <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
