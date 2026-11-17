"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Home, RefreshCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application runtime error:", error)
  }, [error])

  return (
    <section className="scientific-grid relative min-h-[80vh] flex items-center justify-center py-20 px-6 sm:px-8">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow text-[var(--danger)]">Runtime Error / 500</p>

        <h1 className="mt-6 text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
          An unexpected error occurred.
        </h1>

        <p className="mt-4 max-w-lg mx-auto text-base text-[var(--ink-soft)] leading-relaxed">
          This view encountered an unexpected failure while rendering. Try reloading the section or return to the homepage.
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-xs text-[var(--gold)]">
            Reference code: <span className="text-[var(--ink)]">{error.digest}</span>
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary inline-flex min-h-[48px] items-center gap-2 cursor-pointer"
          >
            <RefreshCcw size={15} /> Reload page
          </button>
          <Link href="/" className="btn-secondary inline-flex min-h-[48px] items-center gap-2">
            <Home size={15} /> Return to homepage <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
