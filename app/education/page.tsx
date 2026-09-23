import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  Laptop,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getCadBootcamp,
  getEducationalPathways,
  getPhotonicsSchool,
  getUniversityHosting,
} from "@/lib/education"
import { getDictionary } from "@/lib/locales"

export const metadata: Metadata = {
  title: "Education and Technical Training",
  description: "Egypt Photonics Seasonal School, hands-on CAD simulation bootcamps, and academic training pathways for Egyptian university students and researchers.",
  alternates: {
    canonical: "/education/",
  },
}

export default function EducationPage() {
  const dictionary = getDictionary("en")
  const school = getPhotonicsSchool()
  const bootcamp = getCadBootcamp()
  const pathways = getEducationalPathways()
  const hosting = getUniversityHosting()

  return (
    <>
      <PageHeader
        eyebrow={dictionary.education.eyebrow}
        title={dictionary.education.title}
        intro={dictionary.education.intro}
      />

      {/* ── Flagship Seasonal School Spotlight ──────────────────────────────── */}
      <section className="section-space">
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

            {/* School Logistics Strip */}
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

          {/* Curriculum Modules Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                  Five Core Curriculum Modules
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1">
                  Structured foundational syllabus designed to take students from electromagnetic fundamentals to silicon layout readiness.
                </p>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs text-[var(--gold)]">
                5 Academic Modules
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

              {/* Certification and Accreditation Card */}
              <div className="site-card p-6 bg-[var(--surface-raised)] border-l-4 border-l-[var(--gold)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                    <BookOpen size={14} />
                    <span>Official Certification</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-[var(--ink)]">
                    Accredited Certificate of Completion
                  </h4>
                  <p className="mt-2.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                    Participants who complete the five lecture modules, pass daily notebook exercises, and submit a DRC-clean layout receive an official certificate endorsed by Optica Egypt and academic partners.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider block font-bold">
                    Eligibility
                  </span>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    {school.eligibility}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hands-on CAD and Simulation Bootcamps ───────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
              <Laptop size={14} />
              <span>{bootcamp.eyebrow}</span>
            </div>
            <h2 className="section-title">{bootcamp.title}</h2>
            <p className="lede max-w-3xl mt-3">
              {bootcamp.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {bootcamp.tools.map((tool) => (
              <div key={tool.name} className="site-card p-6 border-l-4 border-l-[var(--gold)]">
                <span className="font-mono text-xs font-bold text-[var(--gold)] uppercase block">
                  Core Toolstack
                </span>
                <h4 className="mt-2 text-base font-bold text-[var(--ink)]">
                  {tool.name}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                  {tool.purpose}
                </p>
              </div>
            ))}
          </div>

          {/* School Highlights Trio */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {school.highlights.map((h) => (
              <div key={h.title} className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
                  <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0" />
                  <span>{h.title}</span>
                </div>
                <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Educational Pathways: Progression Stages ────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-10">
            <p className="eyebrow">Progression Architecture</p>
            <h2 className="section-title mt-2">Structured Stages of Technical Progression.</h2>
            <p className="lede max-w-3xl mt-4">
              How students advance from introductory university coursework to national competitions and graduation project capstones.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pathways.map((path) => (
              <div key={path.stage} className="site-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--gold)] font-bold">
                    <span>{path.stage}</span>
                    <span className="text-[var(--ink-faint)] font-normal">{path.level}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">
                    {path.focus}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {path.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Distinct Cross-Links to Other Programs */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="site-card p-6 sm:p-8 flex flex-col justify-between border-l-4 border-l-[var(--gold)]">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--gold)] uppercase">
                  Apply Your Knowledge
                </span>
                <h4 className="mt-2 text-lg font-bold text-[var(--ink)]">
                  Looking for competitive challenges and hackathons?
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                  Test your skills in the Software-Defined Photonics Hackathon, the physical silicon Chipathon, or the student capstone championship.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                <Link href="/competitions" className="btn-secondary w-full justify-between">
                  <span>Explore Competitions</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="site-card p-6 sm:p-8 flex flex-col justify-between border-l-4 border-l-[var(--gold)]">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--gold)] uppercase">
                  Live Guest Lectures
                </span>
                <h4 className="mt-2 text-lg font-bold text-[var(--ink)]">
                  Looking for upcoming seminars and traveling lectures?
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                  Explore our live section calendar for monthly technical talks, distinguished guest lectures, and visiting Optica traveling lecturers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                <Link href="/events" className="btn-secondary w-full justify-between">
                  <span>View Events Calendar</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* University Host Rotation Callout */}
          <div className="mt-12 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                <Building2 size={14} />
                <span>{hosting.eyebrow}</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                {hosting.title}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                {hosting.description}
              </p>
            </div>
            <Link href="/volunteer" className="btn-primary shrink-0">
              Apply to Host School <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
