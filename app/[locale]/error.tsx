"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowUpRight, Home, RefreshCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Optical system runtime error:", error)
  }, [error])

  return (
    <section className="scientific-grid relative min-h-[80vh] flex items-center justify-center py-20 px-5 sm:px-8">
      {/* Amber/red accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--danger)]/50 to-transparent" />

      <div className="container-page max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-[var(--danger)] uppercase">
          <AlertTriangle size={14} className="text-[var(--danger)]" />
          Optical Fault Detected / 500
        </div>

        <h1 className="mt-8 text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
          An unexpected optical aberration occurred.
        </h1>

        <p className="mt-4 max-w-lg mx-auto text-base text-[var(--ink-soft)] leading-relaxed">
          The system encountered an unhandled disturbance while rendering this view. You can re-align the optical path by attempting to reload the component.
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-xs text-[var(--gold)]">
            Reference code: <span className="text-white/80">{error.digest}</span>
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCcw size={15} /> Re-align system (Try again)
          </button>
          <Link href="/en" className="btn-secondary inline-flex items-center gap-2">
            <Home size={15} /> Return to homepage <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
