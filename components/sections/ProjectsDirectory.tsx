"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FUNDING_LABELS, LIFECYCLE_LABELS, TRACK_LABELS } from "@/lib/projects"
import type { Project, ProjectTrack } from "@/types/project"

interface ProjectsDirectoryProps {
  projects: Project[]
  initialTrack?: string
}

const VALID_TRACKS = new Set<string>(["open-pda", "training", "fellowships", "outreach"])

export function ProjectsDirectory({
  projects,
  initialTrack = "all",
}: ProjectsDirectoryProps) {
  const safeInitial = VALID_TRACKS.has(initialTrack) ? initialTrack : "all"
  const [selectedTrack, setSelectedTrack] = useState<string>(safeInitial)

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("track")
    if (param && VALID_TRACKS.has(param)) {
      setSelectedTrack(param)
    }
  }, [])

  const tracks = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of projects) {
      counts.set(p.track, (counts.get(p.track) || 0) + 1)
    }
    return [
      { id: "all", label: "All", count: projects.length },
      ...(["open-pda", "training", "fellowships", "outreach"] as ProjectTrack[]).map((t) => ({
        id: t,
        label: TRACK_LABELS[t],
        count: counts.get(t) || 0,
      })),
    ]
  }, [projects])

  const filtered = useMemo(() => {
    if (selectedTrack === "all") return projects
    return projects.filter((p) => p.track === selectedTrack)
  }, [projects, selectedTrack])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects by track">
          {tracks.map((track) => {
            const active = selectedTrack === track.id
            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedTrack(track.id)}
                className={`inline-flex min-h-[48px] items-center gap-2 rounded-sm px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  active
                    ? "bg-[var(--gold)] text-[#15110a]"
                    : "border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)]"
                }`}
              >
                <span>{track.label}</span>
                <span className="opacity-75">{track.count}</span>
              </button>
            )
          })}
        </div>
        <span className="font-mono text-xs text-[var(--gold)] font-bold">
          {filtered.length} of {projects.length} Initiatives
        </span>
      </div>

      {/* Unified Architectural Ledger (Zero Stacked Small Boxes) */}
      <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
        {filtered.map((project, index) => (
          <article
            key={project.id}
            className="event-row grid gap-4 py-7 px-3 md:grid-cols-[3rem_12rem_1fr_auto] md:items-start md:gap-6"
          >
            <span className="font-mono text-sm font-bold text-[var(--gold)]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="space-y-1.5">
              <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                {TRACK_LABELS[project.track]}
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">
                {LIFECYCLE_LABELS[project.lifecycle]}
              </span>
              <span className="block font-mono text-[10px] text-[var(--ink-faint)]">
                {FUNDING_LABELS[project.funding]}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[var(--ink)]">
                <Link href={`/projects/${project.slug}`} className="hover:text-[var(--gold)] transition-colors">
                  {project.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
                {project.summary}
              </p>
              <span className="mt-3 inline-block font-mono text-[11px] text-[var(--ink-faint)]">
                {project.resourceIds.length} linked tool{project.resourceIds.length === 1 ? "" : "s"}
              </span>
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="text-link inline-flex min-h-[48px] items-center gap-1 justify-self-start md:justify-self-end"
            >
              <span>Inspect Spec</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
