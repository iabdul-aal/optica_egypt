import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Globe, Linkedin, Mail, ShieldCheck, Sparkles } from "lucide-react"
import { getActiveMembers, getMemberById } from "@/lib/members"
import { getAssetPath } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

type MemberProfilePageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getActiveMembers().map((member) => ({ id: member.id }))
}

export async function generateMetadata({ params }: MemberProfilePageProps): Promise<Metadata> {
  const { id } = await params
  const member = getMemberById(id)
  if (!member) return { title: "Officer Profile" }

  const name = member.name.en
  const role = member.role.en
  const title = `${name} — ${role} | Optica Egypt`
  const description = `${name} serves as ${role} for the Optica Egypt Local Section. ${member.institution.en}`
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")

  return {
    title,
    description,
    alternates: {
      canonical: `/leadership/${member.id}/`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/leadership/${member.id}/`,
      images: [member.photo ? `${siteUrl}${member.photo}` : `${siteUrl}/assets/brand/optica-egypt-logo.png`],
    },
  }
}

export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const { id } = await params
  const member = getMemberById(id)
  if (!member) notFound()

  const name = member.name.en
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  const hasPhoto = Boolean(member.photo)

  const tierLabels = {
    executive: "Executive Committee Officer",
    operational: "Operational Committee Chair",
    advisory: "Senior Faculty Advisory Board",
  }

  return (
    <section className="section-space scientific-grid min-h-[75vh]">
      <div className="container-page">
        {/* Back navigation */}
        <Link href="/leadership" className="text-link inline-flex items-center gap-2 mb-10">
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to leadership directory</span>
        </Link>

        <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          {/* ── Left Column: Portrait & Quick Details ── */}
          <div className="site-card p-6 sm:p-8 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="relative aspect-[2/3] w-full max-w-[320px] overflow-hidden rounded-sm bg-[var(--surface-raised)] border border-[var(--line)] shadow-lg">
              {hasPhoto ? (
                <Image
                  src={getAssetPath(member.photo!)}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover object-top grayscale contrast-110 brightness-[0.9] hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="scientific-grid flex h-full w-full items-end justify-between p-6 text-[var(--gold)]">
                  <span className="text-6xl font-semibold tracking-[-0.1em]">{initials}</span>
                  <span className="font-mono text-xs tracking-widest">OPTICA EGYPT</span>
                </div>
              )}
            </div>

            <div className="mt-6 w-full space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                <ShieldCheck size={13} aria-hidden="true" />
                {tierLabels[member.tier]}
              </span>

              <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                {name}
              </h1>

              <p className="font-mono text-xs uppercase tracking-wider text-[var(--gold)]">
                {member.role.en}
              </p>

              {member.institution.en && (
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                  {member.institution.en}
                </p>
              )}

              {member.specializedSector && (
                <p className="text-xs font-mono text-[var(--ink-faint)]">
                  Sector: <strong className="text-[var(--ink)]">{member.specializedSector}</strong>
                </p>
              )}

              {member.opticaId && (
                <div className="pt-2 border-t border-[var(--line-subtle)] text-xs font-mono text-[var(--ink-faint)]">
                  <span>Optica Member ID: </span>
                  <strong className="text-[var(--gold)]">{member.opticaId}</strong>
                </div>
              )}

              {/* Social Channels */}
              <div className="pt-4 border-t border-[var(--line-subtle)] flex flex-wrap gap-2 justify-center sm:justify-start">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--line)] bg-[var(--surface)] text-xs font-medium text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                  >
                    <Mail size={13} />
                    <span>Email</span>
                  </a>
                )}
                {member.linkedin && member.linkedin !== "none" && (
                  <a
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--line)] bg-[var(--surface)] text-xs font-medium text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                  >
                    <Linkedin size={13} />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--line)] bg-[var(--surface)] text-xs font-medium text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                  >
                    <Globe size={13} />
                    <span>Website</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Right Column: Biography & Background Details ── */}
          <div className="space-y-8">
            {/* Biography */}
            <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[var(--gold)] mb-4">
                <Sparkles size={16} aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Professional Biography
                </span>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--ink)]">
                {member.bio.en || "Biography details are being updated by the section secretariat."}
              </p>
            </div>

            {/* Structured Academic & Professional Information */}
            <div className="grid gap-5 sm:grid-cols-2">
              {member.academicBackground && (
                <div className="site-card p-6">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                    Academic Background
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {member.academicBackground}
                  </p>
                </div>
              )}

              {member.professionalFocus && (
                <div className="site-card p-6">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                    Professional Focus
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {member.professionalFocus}
                  </p>
                </div>
              )}
            </div>

            {member.achievements && (
              <div className="site-card p-6">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  Key Achievements and Contributions
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {member.achievements}
                </p>
              </div>
            )}

            {/* Committee Engagement Card */}
            <div className="site-card p-6 border-l-2 border-l-[var(--gold)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-base text-[var(--ink)]">Connect with the Section Leadership</h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1">
                  Have inquiries about academic collaborations, student chapter sponsorships, or technical seminars?
                </p>
              </div>
              <Link href="/join" className="btn-primary shrink-0">
                Get Involved <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
