import Link from "next/link"
import { Globe, Award, BookOpen, ExternalLink, ArrowUpRight } from "lucide-react"
import { localizedHref, type Locale } from "@/lib/locales"

type Props = { locale: Locale }

export function OpticaHeritage({ locale }: Props) {
  return (
    <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_0.9fr] lg:gap-16 lg:items-center">
          {/* Left: narrative */}
          <div>
            <p className="eyebrow">Global affiliation</p>
            <h2 className="section-title mt-3 max-w-2xl">
              Backed by the world&apos;s leading optics society.
            </h2>
            <p className="lede mt-5 max-w-2xl">
              Optica is dedicated to promoting the generation, application, and archiving of knowledge
              in optics and photonics. As the official local section in Egypt, we provide members with
              direct access to Optica technical groups, student travel grants, and peer-reviewed journals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.optica.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit Optica <ExternalLink size={14} aria-hidden="true" />
              </a>
              <Link href={localizedHref(locale, "/about")} className="btn-secondary">
                About the section <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right: credential boxes */}
          <div className="divide-y divide-[var(--line-subtle)] border-y border-[var(--line-subtle)]">
            <div className="flex items-start gap-4 py-6">
              <Award size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--ink-faint)]">Affiliation</p>
                <p className="mt-1 font-semibold text-[var(--ink)]">Official Local Section</p>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
                  Approved by Optica on 10 September 2026. Chartered representation across Egyptian universities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-6">
              <BookOpen size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--ink-faint)]">Publications</p>
                <p className="mt-1 font-semibold text-[var(--ink)]">Optica Publishing Group</p>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
                  Direct conduits to premier peer-reviewed journals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-6">
              <Globe size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--ink-faint)]">Fellowship</p>
                <p className="mt-1 font-semibold text-[var(--ink)]">180+ Countries Network</p>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
                  Connecting local researchers to international laboratories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}