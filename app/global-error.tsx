"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Home, RefreshCcw } from "lucide-react"
import "@/app/globals.css"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global system error:", error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-latin antialiased bg-[var(--canvas,#090c0d)] text-[var(--ink,#f7f2e8)]">
        <section className="scientific-grid relative min-h-screen flex items-center justify-center py-20 px-6 sm:px-8">
          <div className="container-page max-w-2xl text-center">
            <p className="eyebrow text-[var(--danger)]">System Error</p>

            <h1 className="mt-6 text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
              A critical application error occurred.
            </h1>

            <p className="mt-4 max-w-lg mx-auto text-base text-[var(--ink-soft)] leading-relaxed">
              The root layout encountered an unhandled failure. Retry loading or return to the main portal.
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
                <RefreshCcw size={15} /> Try again
              </button>
              <Link href="/" className="btn-secondary inline-flex min-h-[48px] items-center gap-2">
                <Home size={15} /> Return to homepage <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}
