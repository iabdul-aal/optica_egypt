import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Calendar, Compass, Home, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="scientific-grid relative min-h-[80vh] flex items-center justify-center py-20 px-6 sm:px-8">
      <div className="container-page max-w-3xl text-center">
        <p className="eyebrow">Error 404</p>

        <p className="mt-6 font-mono text-7xl sm:text-9xl font-extrabold tracking-tight text-[var(--gold)] select-none">
          404
        </p>

        <h1 className="mt-6 text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
          Page not found.
        </h1>

        <p className="mt-4 max-w-xl mx-auto text-base text-[var(--ink-soft)] leading-relaxed">
          The requested address has moved or does not exist. Choose one of the section destinations below.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary min-h-[48px]">
            <Home size={15} aria-hidden="true" /> Return to homepage <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/updates" className="btn-secondary min-h-[48px]">
            <Calendar size={15} aria-hidden="true" /> Explore updates
          </Link>
        </div>

        <div className="mt-14 border-t border-[var(--line)] pt-8 text-left grid gap-8 sm:grid-cols-3">
          <Link href="/projects" className="group border-t border-[var(--line-subtle)] pt-4 min-h-[48px] block hover:border-[var(--gold)] transition-colors">
            <Compass size={16} className="text-[var(--gold)]" aria-hidden="true" />
            <h2 className="mt-2 font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--gold)]">Projects</h2>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Working groups, Open-Source PDA, and outreach tracks.</p>
          </Link>
          <Link href="/leadership" className="group border-t border-[var(--line-subtle)] pt-4 min-h-[48px] block hover:border-[var(--gold)] transition-colors">
            <Users size={16} className="text-[var(--gold)]" aria-hidden="true" />
            <h2 className="mt-2 font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--gold)]">Leadership</h2>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Executive officers, operational leads, and faculty advisors.</p>
          </Link>
          <Link href="/resources" className="group border-t border-[var(--line-subtle)] pt-4 min-h-[48px] block hover:border-[var(--gold)] transition-colors">
            <Calendar size={16} className="text-[var(--gold)]" aria-hidden="true" />
            <h2 className="mt-2 font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--gold)]">Resources</h2>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Free simulation software and Egyptian research grants.</p>
          </Link>
        </div>
      </div>
    </section>
  )
}
