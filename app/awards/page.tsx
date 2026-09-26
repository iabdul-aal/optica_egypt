"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Trophy } from "lucide-react"

export default function AwardsRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/recognitions")
  }, [router])

  return (
    <div className="section-space container-page min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="site-card max-w-lg p-8 sm:p-10 border-l-4 border-l-[var(--gold)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)] mb-4">
          <Trophy size={24} aria-hidden="true" />
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          Redirecting to Section Recognitions
        </span>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mt-2">
          Section Recognitions
        </h1>
        <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-3 leading-relaxed">
          The Awards page has been officially renamed to <strong className="text-[var(--ink)]">Recognitions</strong> to distinguish section-level accolades from student and member fellowships.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/recognitions" className="btn-primary">
            <span>Proceed to Recognitions</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
