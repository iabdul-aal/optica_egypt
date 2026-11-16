import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Calendar, Compass, Home, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="scientific-grid relative min-h-[80vh] flex items-center justify-center py-20 px-5 sm:px-8">
      <div className="container-page max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-[var(--gold)] uppercase">
          Optical Path Interrupted / 404
        </div>

        <p className="mt-8 font-mono text-7xl sm:text-9xl font-extrabold tracking-tight text-[var(--gold)] select-none">
          404
        </p>

        <h1 className="mt-6 text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
          This optical path does not exist.
        </h1>

        <p className="mt-4 max-w-xl mx-auto text-base text-[var(--ink-soft)] leading-relaxed">
          The requested page has moved or does not exist. Select one of the canonical destinations below.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary min-h-[48px]">
            <Home size={15} aria-hidden="true" /> Return to homepage <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/updates" className="btn-secondary min-h-[48px]">
            <Calendar size={15} aria-hidden="true" /> Explore updates
          </Link>
        </div>

        <div className="mt-12 border-t border-[var(--line)] pt-8 text-left grid gap-4 sm:grid-cols-3">
          <Link href="/projects" className="site-card p-4 hover:border-[var(--gold)] transition-colors min-h-[48px]">
            <Compass size={16} className="text-[var(--gold)]" aria-hidden="true" />
            <h2 className="mt-2 font-semibold text-sm text-[var(--ink)]">Projects</h2>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Working groups, Open-Source PDA, and outreach tracks.</p>
          </Link>
          <Link href="/about#leadership" className="site-card p-4 hover:border-[var(--gold)] transition-colors min-h-[48px]">
            <Users size={16} className="text-[var(--gold)]" aria-hidden="true" />
            <h2 className="mt-2 font-semibold text-sm text-[var(--ink)]">Leadership</h2>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Executive officers, operational leads, and faculty advisors.</p>
          </Link>
          <Link href="/resources" className="site-card p-4 hover:border-[var(--gold)] transition-colors min-h-[48px]">
            <Calendar size={16} className="text-[var(--gold)]" aria-hidden="true" />
            <h2 className="mt-2 font-semibold text-sm text-[var(--ink)]">Resources</h2>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Free simulation software and Egyptian research grants.</p>
          </Link>
        </div>
      </div>
    </section>
  )
}
