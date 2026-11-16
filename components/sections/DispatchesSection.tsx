import Link from "next/link"
import { ArrowUpRight, Calendar } from "lucide-react"
import { DISPATCH_KIND_LABELS } from "@/lib/dispatches"
import { formatDateISO } from "@/lib/formatting"
import type { Dispatch } from "@/types/dispatch"

export function DispatchesSection({ dispatches }: { dispatches: Dispatch[] }) {
  if (dispatches.length === 0) return null

  return (
    <section className="section-space border-y border-[var(--line-subtle)] bg-[var(--surface-raised)]">
      <div className="container-page">
        <div className="section-split-heading">
          <div>
            <p className="eyebrow">Verified Updates</p>
            <h2 className="section-title">Latest Dispatches</h2>
          </div>
          <Link href="/updates" className="text-link inline-flex min-h-[48px] items-center gap-1.5 justify-self-start sm:justify-self-end">
            <span>All updates</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className={`mt-8 grid gap-6 ${dispatches.length === 1 ? "max-w-2xl" : dispatches.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {dispatches.map((item) => {
            const href = item.externalUrl || `/updates/${item.slug}`
            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--gold)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      {DISPATCH_KIND_LABELS[item.kind]}
                    </span>
                    <time dateTime={item.dateISO} className="font-mono text-xs text-[var(--ink-faint)] flex items-center gap-1.5">
                      <Calendar size={12} aria-hidden="true" />
                      {formatDateISO(item.dateISO, { month: "short" })}
                    </time>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                    <Link href={href} className="after:absolute after:inset-0">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {item.summary}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-[var(--gold)]">
                  Read record <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
