"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowUpRight, Home, RefreshCcw } from "lucide-react"
import "@/app/globals.css"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global optical system error:", error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-latin antialiased bg-[#090c0d] text-[#f7f2e8]">
        <section className="scientific-grid relative min-h-screen flex items-center justify-center py-20 px-5 sm:px-8">
          <div className="container-page max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-[var(--danger)] uppercase">
              <AlertTriangle size={14} className="text-[var(--danger)]" />
              System Level Optical Fault
            </div>

            <h1 className="mt-8 text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
              A critical optical system aberration occurred.
            </h1>

            <p className="mt-4 max-w-lg mx-auto text-base text-[var(--ink-soft)] leading-relaxed">
              The root layout encountered an unhandled system failure. Try re-aligning the system or return to the main portal.
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
      </body>
    </html>
  )
}
