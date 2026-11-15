"use client"
export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <section className="section-space">
      <div className="container-page">
        <div className="site-card max-w-xl p-8">
          <h1 className="text-2xl font-semibold">
            The workspace is temporarily unavailable.
          </h1>
          <p className="mt-4 text-[var(--ink-soft)]">
            We could not load recruitment data. Please try again.
          </p>
          <button onClick={reset} className="btn-primary mt-6 min-h-12">
            Try again
          </button>
        </div>
      </div>
    </section>
  )
}
