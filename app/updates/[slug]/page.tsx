import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Calendar, ExternalLink } from "lucide-react"
import { AddToCalendarButton } from "@/components/sections/AddToCalendarButton"
import { DISPATCH_KIND_LABELS, getAllDispatches, getDispatchBySlug } from "@/lib/dispatches"
import { formatDateISO } from "@/lib/formatting"
import { getMembersByIds } from "@/lib/graph"
import { getProjectBySlug } from "@/lib/projects"
import { getResourcesByIds } from "@/lib/resources"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export async function generateStaticParams() {
  return getAllDispatches().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getDispatchBySlug(slug)
  if (!item) return { title: "Update Not Found" }
  return buildPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/updates/${item.slug}`,
    type: "article",
    publishedTime: item.dateISO,
  })
}

export default async function UpdateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getDispatchBySlug(slug)
  if (!item) notFound()

  const authors = getMembersByIds(item.authorIds)
  const linkedProject = item.projectId ? getProjectBySlug(item.projectId) : undefined
  const linkedResources = getResourcesByIds(item.resourceIds)
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")
  const dispatchJsonLd =
    item.kind === "event" && item.eventMeta
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: item.title,
          description: item.summary,
          startDate: item.eventMeta.startISO,
          image: [`${siteUrl}/branding/FullOnBlack.png`],
          location: {
            "@type": "Place",
            name: item.eventMeta.venue,
          },
          organizer: {
            "@id": `${siteUrl}/#organization`,
          },
          url: `${siteUrl}/updates/${item.slug}`,
        }
      : {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: item.title,
          description: item.summary,
          datePublished: item.dateISO,
          image: [`${siteUrl}/branding/FullOnBlack.png`],
          publisher: {
            "@id": `${siteUrl}/#organization`,
          },
          url: `${siteUrl}/updates/${item.slug}`,
          inLanguage: "en-US",
        }

  return (
    <section className="section-space">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dispatchJsonLd) }}
      />
      <div className="container-page space-y-10">
        <Link href="/updates" className="text-link inline-flex min-h-[48px] items-center gap-2">
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to updates</span>
        </Link>

        <article className="border-t border-[var(--line)] pt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line-subtle)] pb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              {DISPATCH_KIND_LABELS[item.kind]}
            </span>
            <time dateTime={item.dateISO} className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-faint)]">
              <Calendar size={13} aria-hidden="true" />
              {formatDateISO(item.dateISO)}
            </time>
          </div>

          <h1 className="section-title max-w-4xl">
            {item.title}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-[var(--ink-soft)]">{item.summary}</p>

          {item.bodyMarkdown && (
            <div className="space-y-4 border-t border-[var(--line-subtle)] pt-6 max-w-3xl">
              {item.bodyMarkdown.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base leading-relaxed text-[var(--ink-soft)]">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {item.kind === "event" && item.eventMeta && (
            <div className="border-y border-[var(--line)] py-6 space-y-5">
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[var(--ink-faint)]">Format</span>
                  <span className="font-semibold text-[var(--ink)]">{item.eventMeta.format}</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[var(--ink-faint)]">Venue</span>
                  <span className="font-semibold text-[var(--ink)]">{item.eventMeta.venue}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <AddToCalendarButton
                  compact
                  event={{
                    id: item.id,
                    title: item.title,
                    date: item.eventMeta.startISO.slice(0, 10),
                    location: item.eventMeta.venue,
                    description: item.summary,
                  }}
                />
                {item.eventMeta.rsvpOpen && (
                  <Link
                    href={`/join?type=event&ref=${item.slug}`}
                    className="btn-primary min-h-[48px]"
                  >
                    <span>Register for Session</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </article>

        <div className="border-t border-[var(--line)] pt-8 grid gap-10 md:grid-cols-3">
          {authors.length > 0 && (
            <div className="border-t border-[var(--line-subtle)] pt-4 md:border-t-0 md:pt-0">
              <p className="eyebrow">Section Contacts</p>
              <div className="mt-3 divide-y divide-[var(--line-subtle)]">
                {authors.map((a) => (
                  <Link
                    key={a.id}
                    href={`/leadership/${a.id}`}
                    className="flex min-h-[48px] items-center justify-between text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)]"
                  >
                    <span>{a.name}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {linkedProject && (
            <div className="border-t border-[var(--line-subtle)] pt-4 md:border-t-0 md:pt-0">
              <p className="eyebrow">Related Project</p>
              <Link
                href={`/projects/${linkedProject.slug}`}
                className="mt-3 flex min-h-[48px] items-center justify-between text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)]"
              >
                <span>{linkedProject.title}</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          )}

          {linkedResources.length > 0 && (
            <div className="border-t border-[var(--line-subtle)] pt-4 md:border-t-0 md:pt-0">
              <p className="eyebrow">Connected Resources</p>
              <div className="mt-3 divide-y divide-[var(--line-subtle)]">
                {linkedResources.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-between text-sm font-medium text-[var(--ink)] hover:text-[var(--gold)]"
                  >
                    <span>{r.title}</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
