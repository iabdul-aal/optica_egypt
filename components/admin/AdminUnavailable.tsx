"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export function AdminUnavailable() {
  const router = useRouter()

  return (
    <section className="section-space">
      <div className="container-page">
        <div className="site-card max-w-xl p-8">
          <h1 className="text-2xl font-semibold">
            The workspace is temporarily unavailable.
          </h1>
          <p className="mt-4 text-[var(--ink-soft)]">
            Recruitment and submission storage credentials are not active in this environment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.refresh()}
              className="btn-primary min-h-12"
            >
              Try again
            </button>
            <Link href="/admin/login" className="btn-secondary min-h-12">
              Staff sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
