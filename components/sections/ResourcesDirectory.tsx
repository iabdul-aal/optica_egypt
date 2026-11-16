"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Search, X } from "lucide-react"
import type { MembershipTier } from "@/lib/membership"
import type { Resource } from "@/types/resource"

interface ResourcesDirectoryProps {
  resources: Resource[]
  membershipTiers: MembershipTier[]
  usedInProjectCount: Record<string, number>
  initialCategory?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  software: "Software",
  grants: "Grants",
  learning: "Learning",
  journals: "Journals",
  membership: "Optica Tiers",
}

export function ResourcesDirectory({
  resources,
  membershipTiers,
  usedInProjectCount,
  initialCategory = "all",
}: ResourcesDirectoryProps) {
  const validInitial = initialCategory in CATEGORY_LABELS ? initialCategory : "all"
  const [selectedCategory, setSelectedCategory] = useState<string>(validInitial)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category")
    if (param && param in CATEGORY_LABELS) {
      setSelectedCategory(param)
    }
  }, [])

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of resources) {
      counts.set(r.category, (counts.get(r.category) || 0) + 1)
    }
    const ordered = ["all", "software", "grants", "learning", "journals", "membership"]
    return ordered.map((key) => ({
      id: key,
      label: CATEGORY_LABELS[key] || key,
      count:
        key === "all"
          ? resources.length
          : key === "membership"
            ? membershipTiers.length
            : counts.get(key) || 0,
    }))
  }, [resources, membershipTiers])

  const filteredResources = useMemo(() => {
    if (selectedCategory === "membership") return []
    const q = query.trim().toLowerCase()
    return resources.filter((resource) => {
      if (selectedCategory !== "all" && resource.category !== selectedCategory) {
        return false
      }
      if (!q) return true
      return (
        resource.title.toLowerCase().includes(q) ||
        resource.description.toLowerCase().includes(q) ||
        resource.tags.join(" ").toLowerCase().includes(q) ||
        resource.category.toLowerCase().includes(q)
      )
    })
  }, [resources, selectedCategory, query])

  const hasFilter = selectedCategory !== "all" || query.trim() !== ""

  return (
    <div className="space-y-8">
      <div className="border-b border-[var(--line)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Curated Directory</p>
          <h2 className="section-title mt-2">Software, Grants, and Optica Pathways.</h2>
        </div>
        {selectedCategory !== "membership" && (
          <span className="font-mono text-xs text-[var(--gold)] font-bold">
            {filteredResources.length} of {resources.length} Verified Entries
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter resources by category"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex min-h-[48px] items-center gap-2 rounded-sm px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  active
                    ? "bg-[var(--gold)] text-[#09131F]"
                    : "border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-sm px-1.5 py-0.5 text-[10px] ${
                    active
                      ? "bg-[#09131F]/15 text-[#09131F]"
                      : "bg-[var(--surface)] text-[var(--ink-faint)]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {selectedCategory !== "membership" && (
          <div className="relative w-full lg:w-72">
            <Search
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-faint)]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, grants..."
              aria-label="Search resources"
              className="min-h-[48px] w-full rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] pl-10 pr-4 py-2.5 text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--gold)] focus:outline-none"
            />
          </div>
        )}
      </div>

      {selectedCategory === "membership" ? (
        <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
          {membershipTiers.map((tier, idx) => (
            <article key={tier.id} className="py-7 grid gap-6 md:grid-cols-[3rem_1fr_auto] md:items-start">
              <span className="font-mono text-sm font-bold text-[var(--gold)]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  {tier.tag} · {tier.pricingNote}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold text-[var(--ink)]">{tier.name}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
                  {tier.valueProposition}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href={tier.opticaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary min-h-[48px]"
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <Link
                  href="/join?type=committee"
                  className="btn-secondary min-h-[48px]"
                >
                  <span>Local Committee Intake</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-8 text-center">
          <p className="text-base font-semibold text-[var(--ink)]">
            No resources match the current filter.
          </p>
          {hasFilter && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all")
                setQuery("")
              }}
              className="btn-secondary mt-5 inline-flex min-h-[48px] items-center gap-1.5 cursor-pointer"
            >
              <X size={14} aria-hidden="true" />
              <span>Reset Resource Filter</span>
            </button>
          )}
        </div>
      ) : (
        <div className="border-y border-[var(--line)]">
          {filteredResources.map((resource, index) => {
            const linkedCount = usedInProjectCount[resource.id] || 0
            return (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-4 border-b border-[var(--line-subtle)] py-6 transition-colors hover:bg-[var(--surface-raised)] sm:grid-cols-[3rem_9rem_1fr_auto] sm:items-start sm:gap-6 px-2 last:border-b-0"
              >
                <span className="font-mono text-sm font-bold text-[var(--gold)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-1">
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                    {resource.category}
                  </span>
                  <span className="block font-mono text-[10px] text-[var(--ink-faint)]">
                    {resource.accessReq}
                  </span>
                </div>
                <div>
                  <span className="block text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                    {resource.title}
                  </span>
                  <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
                    {resource.description}
                  </span>
                  <span className="mt-2.5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-[var(--ink-faint)]">
                    <span>Verified {resource.lastVerifiedISO}</span>
                    {linkedCount > 0 && (
                      <span className="text-[var(--gold)]">
                        Linked in {linkedCount} project{linkedCount === 1 ? "" : "s"}
                      </span>
                    )}
                  </span>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="text-[var(--gold)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
