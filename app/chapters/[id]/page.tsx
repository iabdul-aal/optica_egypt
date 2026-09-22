import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Globe, Instagram, Linkedin, Mail, MapPin, Sparkles, UserCheck } from "lucide-react"
import { getAllChapters, getChapterById } from "@/lib/chapters"
import { siteConfig } from "@/lib/site-config"

type ChapterDetailPageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllChapters().map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: ChapterDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const chapter = getChapterById(id)
  if (!chapter) return { title: "Student Chapter" }

  const title = `${chapter.shortName || chapter.name} | Optica Egypt`
  const description = `${chapter.name} hosted at ${chapter.university}. ${chapter.description.slice(0, 150)}...`
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")

  return {
    title,
    description,
    alternates: {
      canonical: `/chapters/${chapter.id}/`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/chapters/${chapter.id}/`,
      images: [`${siteUrl}/assets/brand/optica-egypt-logo.png`],
    },
  }
}

export default async function ChapterDetailPage({ params }: ChapterDetailPageProps) {
  const { id } = await params
  const chapter = getChapterById(id)
  if (!chapter) notFound()

  return (
    <section className="section-space scientific-grid min-h-[75vh]">
      <div className="container-page">
        {/* Back navigation */}
        <Link href="/chapters" className="text-link inline-flex items-center gap-2 mb-10">
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to student chapters</span>
        </Link>

        {/* Chapter Header Banner */}
        <div className="site-card p-6 sm:p-10 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line-subtle)] pb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              <Sparkles size={13} aria-hidden="true" />
              {chapter.status}
            </span>
            <span className="text-xs font-mono text-[var(--ink-faint)]">
              {chapter.charteredYear ? `Chartered: ${chapter.charteredYear}` : `Target: ${chapter.targetYear}`}
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
              <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed max-w-2xl">
                {chapter.campus || chapter.faculty}
              </p>
            </div>

            {/* Social & Contact Actions */}
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {chapter.socials?.email && (
                <a
                  href={`mailto:${chapter.socials.email}`}
                  className="btn-primary"
                >
                  <Mail size={14} />
                  <span>Email Chapter</span>
                </a>
              )}
              {chapter.socials?.linkedin && (
                <a
                  href={chapter.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
              {chapter.socials?.website && (
                <a
                  href={chapter.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Globe size={14} />
                  <span>Website</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
              {chapter.socials?.instagram && (
                <a
                  href={chapter.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Two-Column Details */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-8">
            {/* Overview */}
            <div className="site-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[var(--ink)]">About the Chapter</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ink-soft)]">
                {chapter.description}
              </p>
            </div>

            {/* Research & Focus Areas */}
            {chapter.focusAreas && (
              <div className="site-card p-6 sm:p-8">
                <h2 className="text-lg font-bold text-[var(--ink)]">Technical Focus and Initiatives</h2>
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

            {/* Activities & Highlights */}
            {chapter.highlights && (
              <div className="site-card p-6 sm:p-8">
                <h2 className="text-lg font-bold text-[var(--ink)]">Activities and Accomplishments</h2>
                <ul className="mt-4 space-y-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                  {chapter.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="text-[var(--gold)] font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="site-card p-6">
              <p className="eyebrow">Academic Oversight</p>
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)] shrink-0">
                  <UserCheck size={18} />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)]">Faculty Advisor</span>
                  <p className="font-semibold text-sm text-[var(--ink)] mt-0.5">
                    {chapter.facultyAdvisor || "Chapter Faculty Coordinator"}
                  </p>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">
                    {chapter.advisorDepartment || chapter.faculty}
                  </p>
                </div>
              </div>
            </div>

            <div className="site-card p-6">
              <p className="eyebrow">Campus Geography</p>
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)]">Location</span>
                  <p className="font-semibold text-sm text-[var(--ink)] mt-0.5">
                    {chapter.city}, Egypt
                  </p>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">
                    {chapter.campus || chapter.faculty}
                  </p>
                </div>
              </div>
            </div>

            <div className="site-card p-6 border-l-2 border-l-[var(--gold)]">
              <h3 className="font-bold text-sm text-[var(--ink)]">Connect with the Chapter</h3>
              <p className="mt-2 text-xs text-[var(--ink-soft)] leading-relaxed">
                Interested in attending campus seminars, collaborating on student projects, or joining this chapter as a member?
              </p>
              <div className="mt-4">
                <Link href="/volunteer" className="btn-primary w-full justify-center text-xs">
                  Connect via Student Affairs <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
