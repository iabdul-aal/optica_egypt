"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Calendar } from "lucide-react"
import { DISPATCH_KIND_LABELS } from "@/lib/dispatches"
import { formatDateISO } from "@/lib/formatting"
import type { Dispatch, DispatchKind } from "@/types/dispatch"

interface UpdatesDirectoryProps {
  dispatches: Dispatch[]
  availableKinds: DispatchKind[]
  initialKind?: string
}

export function UpdatesDirectory({
  dispatches,
  availableKinds,
  initialKind = "all",
}: UpdatesDirectoryProps) {
  const validInitial =
    availableKinds.includes(initialKind as DispatchKind) ? initialKind : "all"
  const [selectedKind, setSelectedKind] = useState<string>(validInitial)

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("kind")
    if (param && availableKinds.includes(param as DispatchKind)) {
      setSelectedKind(param)
    }
  }, [availableKinds])

  const filtered = useMemo(() => {
    if (selectedKind === "all") return dispatches
    return dispatches.filter((d) => d.kind === selectedKind)
  }, [dispatches, selectedKind])

  return (
    <div className="space-y-8">
      {availableKinds.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-6" role="tablist" aria-label="Filter updates">
          <button
            type="button"
            role="tab"
            aria-selected={selectedKind === "all"}
            onClick={() => setSelectedKind("all")}
            className={`min-h-[48px] rounded-sm px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer ${
              selectedKind === "all"
                ? "bg-[var(--gold)] text-[#09131F]"
                : "border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--ink-soft)]"
            }`}
          >
            All ({dispatches.length})
          </button>
          {availableKinds.map((kind) => {
            const active = selectedKind === kind
            const count = dispatches.filter((d) => d.kind === kind).length
            return (
              <button
                key={kind}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedKind(kind)}
                className={`min-h-[48px] rounded-sm px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer ${
                  active
                    ? "bg-[var(--gold)] text-[#09131F]"
                    : "border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--ink-soft)]"
                }`}
              >
                {DISPATCH_KIND_LABELS[kind]} ({count})
              </button>
            )
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="site-card p-8">
          <p className="text-base font-semibold text-[var(--ink)]">
            No confirmed updates match this view yet.
          </p>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Confirmed events, technical tutorials, and announcements will appear here once published.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {filtered.map((item) => (
            <article key={item.id} className="py-7 grid gap-4 md:grid-cols-[11rem_1fr_auto] md:items-start">
              <div className="space-y-1">
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  {DISPATCH_KIND_LABELS[item.kind]}
                </span>
                <time dateTime={item.dateISO} className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-faint)]">
                  <Calendar size={12} aria-hidden="true" />
                  {formatDateISO(item.dateISO)}
                </time>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--ink)]">
                  <Link href={`/updates/${item.slug}`} className="hover:text-[var(--gold)] transition-colors">
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
                  {item.summary}
                </p>
              </div>
              <Link
                href={`/updates/${item.slug}`}
                className="btn-secondary min-h-[48px] justify-self-start md:justify-self-end"
              >
                <span>Open Record</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
