import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Compass, Calendar, Users, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <section className="scientific-grid relative min-h-[80vh] flex items-center justify-center py-20 px-5 sm:px-8">
      {/* Laser line accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
      
      <div className="container-page max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-[var(--gold)] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          Optical Path Interrupted / 404
        </div>

        <p className="mt-8 font-mono text-7xl sm:text-9xl font-extrabold tracking-tight text-[var(--gold)] select-none">
          404
        </p>

        <h1 className="mt-6 text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
          This optical path does not exist.
        </h1>

        <p className="mt-4 max-w-xl mx-auto text-base text-[var(--ink-soft)] leading-relaxed">
          The requested beam could not resolve a target wavelength. The page may have been redirected, renamed, or temporarily diffracted into another spectrum.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home size={15} /> Return to homepage <ArrowUpRight size={14} />
          </Link>
          <Link href="/events" className="btn-secondary">
            <Calendar size={15} /> Explore events
          </Link>
        </div>

        {/* Helpful links grid */}
        <div className="mt-14 border-t border-white/10 pt-10 text-left">
          <p className="eyebrow text-center mb-6">Explore alternative optical routes</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/events"
              className="group rounded border border-white/10 bg-[var(--surface)]/80 p-4 transition-all hover:border-[var(--gold)] hover:bg-[var(--surface-raised)]"
            >
              <div className="flex items-center justify-between text-[var(--gold)]">
                <Calendar size={18} />
                <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h2 className="mt-3 font-semibold text-sm text-[var(--ink)]">Events and Workshops</h2>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">Upcoming inauguration, technical talks, and roadshows.</p>
            </Link>

            <Link
              href="/leadership"
              className="group rounded border border-white/10 bg-[var(--surface)]/80 p-4 transition-all hover:border-[var(--gold)] hover:bg-[var(--surface-raised)]"
            >
              <div className="flex items-center justify-between text-[var(--gold)]">
                <Users size={18} />
                <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h2 className="mt-3 font-semibold text-sm text-[var(--ink)]">Leadership and Team</h2>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">Executive officers, operational chairs, and faculty advisors.</p>
            </Link>

            <Link
              href="/about"
              className="group rounded border border-white/10 bg-[var(--surface)]/80 p-4 transition-all hover:border-[var(--gold)] hover:bg-[var(--surface-raised)]"
            >
              <div className="flex items-center justify-between text-[var(--gold)]">
                <Compass size={18} />
                <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h2 className="mt-3 font-semibold text-sm text-[var(--ink)]">About Section</h2>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">Mission, vision, charter governance, and history in Egypt.</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
