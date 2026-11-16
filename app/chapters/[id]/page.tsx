import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Globe, Instagram, Linkedin, Mail, MapPin, UserCheck } from "lucide-react"
import { getAllChapters, getChapterById } from "@/lib/chapters"
import { getProjectsForChapter } from "@/lib/graph"
import { LIFECYCLE_LABELS } from "@/lib/projects"
import { buildPageMetadata } from "@/lib/seo"

interface ChapterDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return getAllChapters().map((chapter) => ({ id: chapter.id }))
}

export async function generateMetadata({ params }: ChapterDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const chapter = getChapterById(id)
  if (!chapter) return { title: "Chapter Not Found" }

  const title = chapter.shortName || chapter.name
  const description = `${chapter.name} hosted at ${chapter.university}. ${chapter.description.slice(0, 140)}`

  return buildPageMetadata({
    title,
    description,
    path: `/chapters/${chapter.id}`,
  })
}

export default async function ChapterDetailPage({ params }: ChapterDetailPageProps) {
  const { id } = await params
  const chapter = getChapterById(id)
  if (!chapter) notFound()

  const linkedProjects = getProjectsForChapter(chapter.id)

  return (
    <section className="section-space scientific-grid min-h-[75vh]">
      <div className="container-page">
        <Link href="/chapters" className="text-link inline-flex min-h-[48px] items-center gap-2 mb-8">
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to chapters</span>
        </Link>

        <div className="site-card p-6 sm:p-10 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line-subtle)] pb-4">
            <span className="rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              {chapter.status}
            </span>
            <span className="text-xs font-mono text-[var(--ink-faint)]">
              Chartered {chapter.charteredYear || "In Progress"}
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--gold)]">
                {chapter.university}
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
                {chapter.name}
              </h1>
              <p className="mt-3 text-sm text-[var(--ink-soft)] max-w-2xl">
                {chapter.campus || chapter.faculty}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {chapter.socials?.email && (
                <a href={`mailto:${chapter.socials.email}`} className="btn-primary min-h-[48px]">
                  <Mail size={14} aria-hidden="true" />
                  <span>Email Chapter</span>
                </a>
              )}
              {chapter.socials?.linkedin && (
                <a href={chapter.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary min-h-[48px]">
                  <Linkedin size={14} aria-hidden="true" />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
              {chapter.socials?.website && (
                <a href={chapter.socials.website} target="_blank" rel="noopener noreferrer" className="btn-secondary min-h-[48px]">
                  <Globe size={14} aria-hidden="true" />
                  <span>Website</span>
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
              {chapter.socials?.instagram && (
                <a href={chapter.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn-secondary min-h-[48px]">
                  <Instagram size={14} aria-hidden="true" />
                  <span>Instagram</span>
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-8">
            <div className="site-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[var(--ink)]">About the Chapter</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ink-soft)]">
                {chapter.description}
              </p>
            </div>

            {chapter.focusAreas && (
              <div className="site-card p-6 sm:p-8">
                <h2 className="text-lg font-bold text-[var(--ink)]">Technical Focus</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {chapter.focusAreas.map((area) => (
                    <div
                      key={area}
                      className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-4 flex items-center gap-3 text-xs font-medium text-[var(--ink)]"
                    >
                      <span className="h-2 w-2 rounded-full bg-[var(--gold)] shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {linkedProjects.length > 0 && (
              <div className="site-card p-6 sm:p-8">
                <h2 className="text-lg font-bold text-[var(--ink)]">Connected Section Initiatives</h2>
                <div className="mt-4 divide-y divide-[var(--line-subtle)]">
                  {linkedProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="flex min-h-[48px] items-center justify-between gap-4 py-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--gold)]"
                    >
                      <span>{project.title}</span>
                      <span className="font-mono text-xs text-[var(--gold)]">
                        {LIFECYCLE_LABELS[project.lifecycle]}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="site-card p-6">
              <p className="eyebrow">Faculty Oversight</p>
              <div className="mt-4 flex items-start gap-3">
                <UserCheck size={18} className="mt-0.5 text-[var(--gold)] shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-sm text-[var(--ink)]">
                    {chapter.facultyAdvisor || "Faculty Coordinator"}
                  </p>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">
                    {chapter.advisorDepartment || chapter.faculty}
                  </p>
                </div>
              </div>
            </div>

            <div className="site-card p-6">
              <p className="eyebrow">Campus Location</p>
              <div className="mt-4 flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-[var(--gold)] shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-sm text-[var(--ink)]">{chapter.city}, Egypt</p>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">{chapter.campus}</p>
                </div>
              </div>
            </div>

            <div className="site-card p-6 border-l-2 border-l-[var(--gold)]">
              <h3 className="font-bold text-sm text-[var(--ink)]">Connect with Chapter Desk</h3>
              <p className="mt-2 text-xs text-[var(--ink-soft)]">
                Join reactivation efforts or coordinate an inter-university workshop.
              </p>
              <Link
                href={`/join?type=chapter&ref=${chapter.id}`}
                className="btn-primary mt-4 min-h-[48px] w-full justify-center"
              >
                <span>Submit Chapter Request</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
