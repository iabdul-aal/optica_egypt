import Link from "next/link"
import { ArrowUpRight, Award, BookOpen, ExternalLink, Globe } from "lucide-react"

export function OpticaHeritage() {
  return (
    <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
      <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow">Parent Society</p>
          <h2 className="section-title mt-3 max-w-xl">
            Chartered within the global Optica network.
          </h2>
          <p className="lede mt-4 max-w-xl">
            Optica Egypt connects Egyptian students, researchers, and engineers to Optica publications, traveling lecturers, and student chapter programs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.optica.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary min-h-[48px]"
            >
              Visit Optica <ExternalLink size={14} aria-hidden="true" />
            </a>
            <Link href="/about" className="btn-secondary min-h-[48px]">
              Charter and Governance <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="divide-y divide-[var(--line-subtle)] border-y border-[var(--line-subtle)]">
          <div className="flex items-start gap-4 py-5">
            <Award size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[var(--ink)]">Local Section Standing</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Charter approved 10 September 2026 under Optica bylaws.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 py-5">
            <BookOpen size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[var(--ink)]">Optica Publishing Group</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Direct link to peer-reviewed journals and society proceedings.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 py-5">
            <Globe size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[var(--ink)]">Traveling Lecturer Pathway</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                International speaker hosting for Egyptian student chapters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
