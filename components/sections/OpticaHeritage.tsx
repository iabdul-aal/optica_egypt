import Link from "next/link"
import { ArrowUpRight, Award, BookOpen, ExternalLink, Globe } from "lucide-react"

export function OpticaHeritage() {
  return (
    <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_0.9fr] lg:gap-16 lg:items-center">
          <div>
            <p className="eyebrow">Global Affiliation</p>
            <h2 className="section-title mt-3 max-w-2xl">
              Local work connected to the global optics and photonics network.
            </h2>
            <p className="lede mt-5 max-w-2xl">
              Optica advances the generation, application, and archiving of optical science worldwide. Operating under Optica Local Section bylaws, Optica Egypt links regional university laboratories and student chapters to international technical groups, travel grants, and Optica Publishing Group journals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.optica.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-h-[48px]"
              >
                Visit Optica <ExternalLink size={14} aria-hidden="true" />
              </a>
              <Link href="/about" className="btn-secondary min-h-[48px]">
                About the Section <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-[var(--line-subtle)] border-y border-[var(--line-subtle)]">
            <div className="flex items-start gap-4 py-6">
              <Award size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                  Affiliation
                </p>
                <p className="mt-1 font-semibold text-[var(--ink)]">Official Local Section</p>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
                  Charter approved by Optica on 10 September 2026 under Local Section bylaws.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 py-6">
              <BookOpen size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                  Publications
                </p>
                <p className="mt-1 font-semibold text-[var(--ink)]">Optica Publishing Group</p>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
                  Direct pathways to peer-reviewed journals and society proceedings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 py-6">
              <Globe size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                  Lectures and Mobility
                </p>
                <p className="mt-1 font-semibold text-[var(--ink)]">Traveling Lecturer Pathway</p>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
                  Connecting Egyptian student chapters and host labs with international speakers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
