import Link from "next/link"
import { ArrowUpRight, Home } from "lucide-react"
import "@/app/globals.css"

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="font-latin antialiased bg-[#090c0d] text-[#f7f2e8]">
        <section className="scientific-grid relative min-h-screen flex items-center justify-center py-20 px-5 sm:px-8">
          <div className="container-page max-w-2xl text-center">
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

            <p className="mt-4 max-w-md mx-auto text-base text-[var(--ink-soft)] leading-relaxed">
              The requested page could not be located. You can navigate back to the main Optica Egypt Local Section portal.
            </p>

            <div className="mt-8 flex justify-center">
              <Link href="/en" className="btn-primary">
                <Home size={15} /> Enter Optica Egypt <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}
