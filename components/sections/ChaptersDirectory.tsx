"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronDown, MapPin, UserCheck } from "lucide-react"
import type { Chapter } from "@/lib/chapters"

interface ChaptersDirectoryProps {
  chapters: Chapter[]
}

type FilterMode = "all" | "chartered" | "formation"

const INITIAL_VISIBLE_LIMIT = 6

export function ChaptersDirectory({ chapters }: ChaptersDirectoryProps) {
  const [filter, setFilter] = useState<FilterMode>("all")
  const [expandedId, setExpandedId] = useState<string | null>(chapters[0]?.id || null)
  const [showAll, setShowAll] = useState(false)

  const counts = useMemo(() => {
    let chartered = 0
    let formation = 0
    for (const ch of chapters) {
      if (ch.charteredYear) chartered += 1
      else formation += 1
    }
    return { all: chapters.length, chartered, formation }
  }, [chapters])

  const filtered = useMemo(() => {
    if (filter === "chartered") return chapters.filter((ch) => Boolean(ch.charteredYear))
    if (filter === "formation") return chapters.filter((ch) => !ch.charteredYear)
    return chapters
  }, [chapters, filter])

  const visibleChapters = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE_LIMIT)
  const hasMore = filtered.length > INITIAL_VISIBLE_LIMIT

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <p className="eyebrow">Campus Registry</p>
          <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">
            Active and Prospective Branches ({chapters.length})
          </h2>
        </div>

        <div
          className="inline-flex flex-wrap items-center gap-1 border border-[var(--line-subtle)] bg-[var(--surface)] p-1"
          role="group"
          aria-label="Filter chapters by standing"
        >
          {(
            [
              { id: "all", label: `All (${counts.all})` },
              { id: "chartered", label: `Chartered (${counts.chartered})` },
              { id: "formation", label: `In Formation (${counts.formation})` },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(tab.id)
                  setShowAll(false)
                }}
                className={`min-h-[48px] px-3 py-1 font-mono text-[11px] uppercase tracking-wider border transition-colors cursor-pointer ${
                  active
                    ? "border-[var(--gold)] bg-[var(--surface-raised)] text-[var(--ink)] font-bold"
                    : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="divide-y divide-[var(--line-subtle)] border-b border-[var(--line)]">
        {visibleChapters.map((ch, idx) => {
          const isExpanded = expandedId === ch.id
          const profileLabel =
            ch.id === "auc"
              ? "View Full AUC Profile"
              : `View ${ch.shortName.replace(" Student Chapter", "")} Profile`

          return (
            <article key={ch.id} className="py-4">
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`chapter-panel-${ch.id}`}
                  onClick={() => setExpandedId(isExpanded ? null : ch.id)}
                  className="group flex flex-1 items-start justify-between gap-3 text-left min-h-[48px] py-1 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span className="mt-0.5 font-mono text-xs font-bold text-[var(--gold)] shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                        {ch.status}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                        {ch.name}
                      </h3>
                      <p className="font-mono text-xs text-[var(--ink-faint)]">
                        {ch.university} · {ch.city}
                      </p>
                    </div>
                  </div>

                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--line-subtle)] text-[var(--ink-soft)] group-hover:border-[var(--gold)] group-hover:text-[var(--gold)] transition-colors">
                    <ChevronDown
                      size={15}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-[var(--gold)]" : ""}`}
                    />
                  </span>
                </button>
              </div>

              {isExpanded && (
                <div
                  id={`chapter-panel-${ch.id}`}
                  className="mt-3 pl-7 space-y-4 border-t border-[var(--line-subtle)] pt-4"
                >
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
                    {ch.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    {ch.campus && (
                      <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                        <MapPin size={14} className="mt-0.5 text-[var(--gold)] shrink-0" aria-hidden="true" />
                        <span>{ch.campus}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                      <UserCheck size={14} className="mt-0.5 text-[var(--gold)] shrink-0" aria-hidden="true" />
                      <span>{ch.facultyAdvisor || "Faculty Advisor in Coordination"}</span>
                    </div>
                  </div>

                  {ch.focusAreas && ch.focusAreas.length > 0 && (
                    <p className="font-mono text-[11px] text-[var(--gold)]">
                      {ch.focusAreas.slice(0, 4).join(" · ")}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-2 pl-7 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/chapters/${ch.id}`}
                  className="text-link inline-flex min-h-[48px] items-center gap-1"
                >
                  <span>{profileLabel}</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="btn-secondary w-full justify-center min-h-[48px]"
        >
          <span>
            {showAll
              ? "Show fewer chapters"
              : `Show all ${filtered.length} chapters`}
          </span>
        </button>
      )}
    </div>
  )
}
