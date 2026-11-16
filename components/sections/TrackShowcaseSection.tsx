import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { FUNDING_LABELS, LIFECYCLE_LABELS, TRACK_LABELS, getAllProjects } from "@/lib/projects"
import { getAllResources } from "@/lib/resources"
import type { ProjectTrack } from "@/types/project"

interface TrackShowcaseSectionProps {
  track: ProjectTrack
  relatedResourceCategory?: string
  resourceSectionTitle?: string
}

export function TrackShowcaseSection({
  track,
  relatedResourceCategory,
  resourceSectionTitle,
}: TrackShowcaseSectionProps) {
  const projects = getAllProjects().filter((p) => p.track === track)
  const resources = relatedResourceCategory
    ? getAllResources().filter((r) => r.category === relatedResourceCategory)
    : []

  return (
    <div className="space-y-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="site-card p-6 flex flex-col justify-between gap-5"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  {TRACK_LABELS[project.track]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                  {LIFECYCLE_LABELS[project.lifecycle]}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-[var(--ink)]">{project.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                {project.summary}
              </p>
              <p className="mt-3 font-mono text-[11px] text-[var(--ink-faint)]">
                {FUNDING_LABELS[project.funding]}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-[var(--line-subtle)] pt-4">
              <Link
                href={`/projects/${project.slug}`}
                className="text-link inline-flex min-h-[48px] items-center gap-1"
              >
                <span>Inspect spec</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
              <Link
                href={`/join?type=${project.ctaIntent}&ref=${project.slug}`}
                className="inline-flex min-h-[48px] items-center text-xs font-mono text-[var(--ink-soft)] hover:text-[var(--gold)] ml-auto"
              >
                {project.ctaLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {resources.length > 0 && resourceSectionTitle && (
        <div className="border-t border-[var(--line)] pt-10 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Connected Directory</p>
              <h2 className="section-title mt-1">{resourceSectionTitle}</h2>
            </div>
            <Link href="/resources" className="text-link inline-flex min-h-[48px] items-center gap-1">
              <span>Full resources index</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-card p-5 flex flex-col justify-between gap-4 min-h-[48px]"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[var(--gold)]">
                    {item.costTier}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {item.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--gold)]">
                  <span>{item.accessReq}</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
