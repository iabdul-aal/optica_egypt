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
            <p className="eyebrow">Section Bulletins</p>
            <h2 className="section-title">Latest Dispatches</h2>
          </div>
          <Link href="/updates" className="text-link inline-flex min-h-[48px] items-center gap-1.5 justify-self-start sm:justify-self-end">
            <span>All updates</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
          {dispatches.map((item) => {
            const href = item.externalUrl || `/updates/${item.slug}`
            return (
              <article
                key={item.id}
                className="event-row relative grid gap-3 py-6 px-3 md:grid-cols-[10rem_1fr_auto] md:items-center"
              >
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                    {DISPATCH_KIND_LABELS[item.kind]}
                  </span>
                  <time
                    dateTime={item.dateISO}
                    className="font-mono text-xs text-[var(--ink-faint)] flex items-center gap-1.5"
                  >
                    <Calendar size={12} aria-hidden="true" />
                    {formatDateISO(item.dateISO, { month: "short" })}
                  </time>
                </div>

                <h3 className="text-lg font-semibold text-[var(--ink)]">
                  <Link href={href} className="hover:text-[var(--gold)] transition-colors">
                    {item.title}
                  </Link>
                </h3>

                <Link
                  href={href}
                  className="text-link inline-flex min-h-[48px] items-center gap-1 justify-self-start md:justify-self-end"
                >
                  <span>Read record</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
