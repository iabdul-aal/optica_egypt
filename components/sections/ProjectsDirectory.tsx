"use client"

import { useMemo, useState } from "react"
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
                    ? "bg-[var(--gold)] text-[#09131F]"
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="site-card p-6 flex flex-col justify-between gap-6 hover:border-[var(--gold)]/60 transition-colors"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-sm border border-[var(--gold)]/35 bg-[var(--gold)]/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  {LIFECYCLE_LABELS[project.lifecycle]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  {FUNDING_LABELS[project.funding]}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-[var(--ink)]">
                {project.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                {project.summary}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[var(--line-subtle)] pt-4">
              <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                {project.resourceIds.length} linked tool{project.resourceIds.length === 1 ? "" : "s"}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="text-link inline-flex min-h-[48px] items-center gap-1"
              >
                <span>Inspect Spec</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
