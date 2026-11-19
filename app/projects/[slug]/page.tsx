import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react"
import {
  getChaptersByIds,
  getDispatchesForProject,
  getDomainsByIds,
  getMembersByIds,
  getResourcesForProject,
} from "@/lib/graph"
import {
  FUNDING_LABELS,
  LIFECYCLE_LABELS,
  TRACK_LABELS,
  getAllProjects,
  getProjectBySlug,
} from "@/lib/projects"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project Not Found" }
  return buildPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  })
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const leads = getMembersByIds(project.leadMemberIds)
  const chapters = getChaptersByIds(project.chapterIds)
  const domains = getDomainsByIds(project.domainIds)
  const resources = getResourcesForProject(project)
  const dispatches = getDispatchesForProject(project.id)
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    creator: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-US",
  }

  return (
    <section className="section-space">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <div className="container-page space-y-12">
        <Link href="/projects" className="text-link inline-flex min-h-[48px] items-center gap-2">
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to projects</span>
        </Link>

        <div className="border-b border-[var(--line)] pb-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider">
            <span className="font-bold text-[var(--gold)]">{TRACK_LABELS[project.track]}</span>
            <span className="text-[var(--ink-faint)]">/</span>
            <span className="text-[var(--ink-soft)]">{LIFECYCLE_LABELS[project.lifecycle]}</span>
            <span className="text-[var(--ink-faint)]">/</span>
            <span className="text-[var(--ink-faint)]">{FUNDING_LABELS[project.funding]}</span>
          </div>

          <h1 className="section-title max-w-4xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-[var(--ink-soft)]">
            {project.description}
          </p>

          <div className="pt-2">
            <Link
              href={`/join?type=${project.ctaIntent}&ref=${project.slug}`}
              className="btn-primary min-h-[48px]"
            >
              <span>{project.ctaLabel}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
          <div className="divide-y divide-[var(--line)] border-b border-[var(--line)]">
            <section className="pb-8">
              <h2 className="text-lg font-semibold text-[var(--ink)]">Milestones</h2>
              <div className="mt-4 divide-y divide-[var(--line-subtle)]">
                {project.milestones.map((m) => (
                  <div key={m.label} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <span className="text-sm font-medium text-[var(--ink)]">{m.label}</span>
                    <span className="font-mono text-xs text-[var(--gold)]">{m.timeline}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-8">
              <h2 className="text-lg font-semibold text-[var(--ink)]">Current Requirements</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[var(--ink-soft)]">
                {project.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5">
                    <span className="text-[var(--gold)] font-bold" aria-hidden="true">-</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {resources.length > 0 && (
              <section className="py-8">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Connected Tools and Grants</h2>
                  <Link href="/resources" className="text-link inline-flex min-h-[48px] items-center text-xs">
                    Full directory
                  </Link>
                </div>
                <div className="mt-4 divide-y divide-[var(--line-subtle)]">
                  {resources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="event-row flex min-h-[48px] items-center justify-between gap-4 py-3 px-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--gold)]"
                    >
                      <span>{resource.title}</span>
                      <ExternalLink size={14} className="text-[var(--gold)] shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="divide-y divide-[var(--line)] border-t border-[var(--line)] lg:border-t-0">
            {leads.length > 0 && (
              <div className="pb-6 pt-6 lg:pt-0">
                <p className="eyebrow">Section Leads</p>
                <div className="mt-3 divide-y divide-[var(--line-subtle)]">
                  {leads.map((member) => (
                    <Link
                      key={member.id}
                      href={`/leadership/${member.id}`}
                      className="flex min-h-[48px] items-center justify-between gap-3 py-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)]"
                    >
                      <span>{member.name}</span>
                      <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                        {member.role}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {domains.length > 0 && (
              <div className="py-6">
                <p className="eyebrow">Technical Domains</p>
                <p className="mt-3 font-mono text-xs leading-relaxed text-[var(--gold)]">
                  {domains.map((d) => d.label).join(", ")}
                </p>
              </div>
            )}

            {chapters.length > 0 && (
              <div className="py-6">
                <p className="eyebrow">Campus Nodes</p>
                <div className="mt-3 divide-y divide-[var(--line-subtle)]">
                  {chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/chapters/${chapter.id}`}
                      className="flex min-h-[48px] items-center justify-between gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--gold)]"
                    >
                      <span>{chapter.shortName}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {dispatches.length > 0 && (
              <div className="py-6">
                <p className="eyebrow">Related Dispatches</p>
                <div className="mt-3 divide-y divide-[var(--line-subtle)]">
                  {dispatches.map((d) => (
                    <Link
                      key={d.id}
                      href={`/updates/${d.slug}`}
                      className="flex min-h-[48px] items-center justify-between gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--gold)]"
                    >
                      <span>{d.title}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
