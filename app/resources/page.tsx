import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Cpu,
  GraduationCap,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getDictionary, getLocalizedText } from "@/lib/locales"
import { getAllResources } from "@/lib/resources"

export const metadata: Metadata = {
  title: "Resources and Funding Hub",
  description: "Curated optics and photonics resources: Egyptian government grants (ITIDA, ASRT, STDF), zero-cost cloud CAD tools, and open journals.",
  alternates: {
    canonical: "/resources/",
  },
}

export default function ResourcesPage() {
  const dictionary = getDictionary("en")
  const resources = getAllResources()

  return (
    <>
      <PageHeader eyebrow={dictionary.resources.eyebrow} title={dictionary.resources.title} intro={dictionary.resources.intro} />

      {/* ── Graduation Projects and Government Funding Accelerator ───────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-10">
        <div className="container-page">
          <div className="site-card p-6 sm:p-10 border-l-4 border-l-[var(--gold)]">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                  <GraduationCap size={15} />
                  <span>National Capstone Support Initiative</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                  Senior Graduation Projects and Research Grant Acceleration
                </h2>

                <p className="text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
                  Are you an Egyptian senior engineering team building a capstone in optics, photonics, optical communications, or MEMS? Optica Egypt helps you navigate domestic government funding, access zero-cost cloud design tools, and pair with international diaspora co-advisors.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 pt-2">
                  <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3.5">
                    <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold block">
                      ITIDA ITAC Grants
                    </span>
                    <p className="text-xs font-semibold text-[var(--ink)] mt-1">
                      Up to 50,000 EGP
                    </p>
                    <p className="text-[11px] text-[var(--ink-soft)] mt-0.5">
                      Graduation project funding for electronics and photonics prototypes.
                    </p>
                  </div>

                  <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3.5">
                    <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold block">
                      ASRT Mashrouy
                    </span>
                    <p className="text-xs font-semibold text-[var(--ink)] mt-1">
                      Prototyping Funds
                    </p>
                    <p className="text-[11px] text-[var(--ink-soft)] mt-0.5">
                      National Academy grants supporting applied engineering graduation capstones.
                    </p>
                  </div>

                  <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3.5">
                    <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold block">
                      Diaspora Co-Mentors
                    </span>
                    <p className="text-xs font-semibold text-[var(--ink)] mt-1">
                      1-on-1 Guidance
                    </p>
                    <p className="text-[11px] text-[var(--ink-soft)] mt-0.5">
                      Remote co-supervision with Egyptian researchers and professors abroad.
                    </p>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-3">
                <Link href="/volunteer" className="btn-primary whitespace-nowrap">
                  <span>Request Capstone Mentorship</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/about#strategy" className="btn-secondary whitespace-nowrap">
                  <span>View National Strategy</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curated Resources Directory ────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Curated Directory</p>
              <h2 className="section-title mt-2">Tools, Grants, and Learning Repositories.</h2>
              <p className="text-xs text-[var(--ink-soft)] mt-2">
                Open tools that run at zero cost, government funding links, and peer-reviewed journals.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--gold)] font-bold">
              {resources.length} Verified Entries
            </span>
          </div>

          <div className="border-y border-[var(--line)]">
            {resources.map((resource, index) => (
              <ScrollReveal key={resource.id} animation="fade-up" delay={index * 30}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-4 border-b border-[var(--line-subtle)] py-7 transition-colors hover:bg-[var(--line-subtle)] sm:grid-cols-[3.5rem_8.5rem_1fr_auto] sm:items-start sm:gap-6"
                >
                  <span className="px-1 font-mono text-sm font-bold text-[var(--gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="px-1 text-[0.68rem] font-bold tracking-[0.12em] text-[var(--ink-soft)]">
                    {resource.category.toUpperCase()}{resource.free ? ` / ${dictionary.resources.free.toUpperCase()}` : ""}
                  </span>
                  <span className="px-1">
                    <span className="block text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                      {getLocalizedText(resource.title, "en")}
                    </span>
                    <span className="mt-2 block max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
                      {getLocalizedText(resource.description, "en")}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {resource.tags.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink-faint)]">
                          #{t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="px-1 text-[var(--gold)]">
                    <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="sr-only">{dictionary.resources.visit}</span>
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Zero Hardware Callout */}
          <div className="mt-12 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--gold)] uppercase">
                <Cpu size={14} />
                <span>Zero Cleanroom Barrier</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                Do not have access to cleanrooms or advanced lasers?
              </h3>
              <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                Our open-source computational photonics tracks teach you layout automation, electromagnetic simulation, and neural surrogate models using free cloud notebooks that run on any regular laptop.
              </p>
            </div>
            <Link href="/open-source" className="btn-secondary shrink-0">
              <span>Explore Open Source Program</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
