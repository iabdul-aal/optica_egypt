import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Globe, Linkedin, Mail, ShieldCheck } from "lucide-react"
import {
  getDispatchesForMember,
  getDomainsByIds,
  getProjectsForMember,
} from "@/lib/graph"
import { getActiveMembers, getMemberById } from "@/lib/members"
import { LIFECYCLE_LABELS } from "@/lib/projects"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { getAssetPath } from "@/lib/utils"

interface MemberPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return getActiveMembers().map((m) => ({ id: m.id }))
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { id } = await params
  const member = getMemberById(id)
  if (!member) return { title: "Member Not Found" }

  const title = `${member.name} | ${member.role}`
  const description = `${member.name} serves as ${member.role} for the Optica Egypt Local Section. ${member.institution}`

  return buildPageMetadata({
    title,
    description,
    path: `/leadership/${member.id}`,
    image: member.photo
      ? { url: member.photo, width: 720, height: 900, alt: member.name }
      : undefined,
  })
}

export default async function MemberProfilePage({ params }: MemberPageProps) {
  const { id } = await params
  const member = getMemberById(id)
  if (!member) notFound()

  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const tierLabels = {
    executive: "Executive Committee Officer",
    operational: "Operational Committee Chair",
    advisory: "Senior Faculty Advisory Board",
  }

  const domains = getDomainsByIds(member.domainIds)
  const projectsLed = getProjectsForMember(member.id)
  const dispatchesAuthored = getDispatchesForMember(member.id)
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")
  const sameAs = [
    ...(member.linkedin && member.linkedin !== "none"
      ? [`https://www.linkedin.com/in/${member.linkedin}`]
      : []),
    ...(member.website ? [member.website] : []),
  ]
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    affiliation: {
      "@type": "Organization",
      name: member.institution,
    },
    memberOf: {
      "@id": `${siteUrl}/#organization`,
    },
    url: `${siteUrl}/leadership/${member.id}`,
    ...(member.photo ? { image: `${siteUrl}${member.photo}` } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  return (
    <section className="section-space scientific-grid min-h-[75vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="container-page">
        <Link href="/leadership" className="text-link inline-flex min-h-[48px] items-center gap-2 mb-8">
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to leadership roster</span>
        </Link>

        <div className="grid gap-12 lg:grid-cols-[.76fr_1.24fr] lg:items-start">
          <aside className="group lg:sticky lg:top-28 border-t border-[var(--line)] pt-6 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="relative aspect-[2/3] w-full max-w-[320px] overflow-hidden bg-[var(--surface)]">
              {member.photo ? (
                <Image
                  src={getAssetPath(member.photo)}
                  alt={member.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="figure-bw object-cover object-top"
                />
              ) : (
                <div className="scientific-grid flex h-full w-full items-end justify-between p-6 text-[var(--gold)]">
                  <span className="text-6xl font-semibold tracking-[-0.1em]">{initials}</span>
                  <span className="font-mono text-xs tracking-widest">OPTICA EGYPT</span>
                </div>
              )}
            </div>

            <div className="mt-6 w-full space-y-3">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  <ShieldCheck size={13} aria-hidden="true" />
                  {tierLabels[member.tier]}
                </span>
                {member.isFounder && (
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-faint)]">
                    · {member.foundingRole || "Co-Founder"}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                {member.name}
              </h1>

              <p className="font-mono text-xs uppercase tracking-wider text-[var(--gold)] font-bold">
                {member.role}
              </p>

              <p className="text-sm text-[var(--ink-soft)]">{member.institution}</p>

              {member.opticaId && (
                <div className="pt-3 border-t border-[var(--line-subtle)] text-xs font-mono text-[var(--ink-faint)]">
                  Optica Member ID: <strong className="text-[var(--gold)]">{member.opticaId}</strong>
                </div>
              )}

              <div className="pt-4 border-t border-[var(--line-subtle)] flex flex-wrap gap-2 justify-center sm:justify-start">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="btn-secondary min-h-[48px]"
                  >
                    <Mail size={13} aria-hidden="true" />
                    <span>Email</span>
                  </a>
                )}
                {member.linkedin && member.linkedin !== "none" && (
                  <a
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary min-h-[48px]"
                  >
                    <Linkedin size={13} aria-hidden="true" />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                )}
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary min-h-[48px]"
                  >
                    <Globe size={13} aria-hidden="true" />
                    <span>Website</span>
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </aside>

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            <div className="py-7 first:pt-0">
              <p className="eyebrow">Biography</p>
              <p className="mt-3 text-base leading-relaxed text-[var(--ink)]">{member.bio}</p>
              {domains.length > 0 && (
                <p className="mt-5 font-mono text-xs text-[var(--gold)]">
                  {domains.map((domain) => domain.label).join(" · ")}
                </p>
              )}
            </div>

            {(member.academicBackground || member.professionalFocus) && (
              <div className="py-7 grid gap-8 sm:grid-cols-2">
                {member.academicBackground && (
                  <div>
                    <p className="eyebrow">Academic Background</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {member.academicBackground}
                    </p>
                  </div>
                )}
                {member.professionalFocus && (
                  <div>
                    <p className="eyebrow">Professional Focus</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {member.professionalFocus}
                    </p>
                  </div>
                )}
              </div>
            )}

            {member.achievements && (
              <div className="py-7">
                <p className="eyebrow">Key Distinctions</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {member.achievements}
                </p>
              </div>
            )}

            {projectsLed.length > 0 && (
              <div className="py-7">
                <p className="eyebrow">Section Projects Coordinated</p>
                <div className="mt-3 divide-y divide-[var(--line-subtle)]">
                  {projectsLed.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="event-row flex min-h-[48px] items-center justify-between gap-4 py-2 px-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--gold)]"
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

            {dispatchesAuthored.length > 0 && (
              <div className="py-7">
                <p className="eyebrow">Linked Dispatches</p>
                <div className="mt-3 divide-y divide-[var(--line-subtle)]">
                  {dispatchesAuthored.map((item) => (
                    <Link
                      key={item.id}
                      href={`/updates/${item.slug}`}
                      className="event-row flex min-h-[48px] items-center justify-between gap-4 py-2 px-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--gold)]"
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
