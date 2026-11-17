import Link from "next/link"
import { ArrowUpRight, Calendar } from "lucide-react"
import { DISPATCH_KIND_LABELS, getAllDispatches } from "@/lib/dispatches"
import { formatDateISO } from "@/lib/formatting"
import type { DispatchKind } from "@/types/dispatch"

interface DispatchCategorySectionProps {
  kind: DispatchKind
  emptyMessage: string
  ctaLabel?: string
  ctaHref?: string
}

export function DispatchCategorySection({
  kind,
  emptyMessage,
  ctaLabel = "View all updates",
  ctaHref = "/updates",
}: DispatchCategorySectionProps) {
  const items = getAllDispatches().filter((d) => d.kind === kind)

  if (items.length === 0) {
    return (
      <div className="border-y border-[var(--line)] py-10 sm:py-12 space-y-5">
        <p className="eyebrow">{DISPATCH_KIND_LABELS[kind]} Archive</p>
        <p className="text-base text-[var(--ink-soft)] max-w-2xl">{emptyMessage}</p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link href={ctaHref} className="btn-primary min-h-[48px]">
            <span>{ctaLabel}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/updates" className="btn-secondary min-h-[48px]">
            <span>All Updates</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
      {items.map((item) => (
        <article
          key={item.id}
          className="event-row py-7 px-3 grid gap-4 md:grid-cols-[11rem_1fr_auto] md:items-start"
        >
          <div className="space-y-1">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
              {DISPATCH_KIND_LABELS[item.kind]}
            </span>
            <time
              dateTime={item.dateISO}
              className="inline-flex items-center gap-1 font-mono text-xs text-[var(--ink-faint)]"
            >
              <Calendar size={12} aria-hidden="true" />
              {formatDateISO(item.dateISO)}
            </time>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--ink)]">{item.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
              {item.summary}
            </p>
          </div>
          <Link
            href={`/updates/${item.slug}`}
            className="text-link inline-flex min-h-[48px] items-center gap-1 justify-self-start md:justify-self-end"
          >
            <span>Read dispatch</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  )
}
