import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getCharterRecord } from "@/lib/governance"
import { getActiveMembers } from "@/lib/members"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { getAssetPath } from "@/lib/utils"

export const metadata: Metadata = buildPageMetadata({
  title: "About Optica Egypt",
  description:
    "Charter verification record, institutional identity, and directory of governance, leadership, partnerships, and press documentation for Optica Egypt.",
  path: "/about",
})

export default function AboutPage() {
  const charter = getCharterRecord()
  const memberCount = getActiveMembers().length

  const sectionDirectory = [
    {
      index: "01",
      title: "Governance and Bylaws",
      summary: "Optica Local Section compliance metrics, constitutional seats, and December reporting scope.",
      href: "/governance",
      cta: "Inspect governance",
    },
    {
      index: "02",
      title: `Founding Leadership (${memberCount})`,
      summary: "Executive Committee, Operational Chairs, and Senior Faculty Advisors for the inaugural term.",
      href: "/leadership",
      cta: "View leadership roster",
    },
    {
      index: "03",
      title: "Partnerships",
      summary: "University hosting models, open-hardware collaborations, and verified partner registry.",
      href: "/partners",
      cta: "Explore partnerships",
    },
    {
      index: "04",
      title: "Press and Brand Kit",
      summary: "Official institutional boilerplate, emblem downloads, color specifications, and typography.",
      href: "/press",
      cta: "Open press kit",
    },
  ] as const

  return (
    <>
      <PageHeader
        eyebrow="Section Record"
        title="About Optica Egypt"
        intro="Verified charter record, institutional identity, and gateway to governance, founding officers, academic partnerships, and media resources."
      />

      {/* Institutional Identity and Verified Charter Ledger */}
      <section id="overview" className="section-space scroll-mt-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <div className="space-y-5">
            <p className="eyebrow">Institutional Identity</p>
            <h2 className="section-title">Local volunteer coordination under Optica bylaws.</h2>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
              The Optica Egypt Local Section operates across Egyptian universities and optics laboratories to connect student chapters, faculty advisors, and researchers with global Optica resources. Global Optica membership billing and Society publications remain administered directly on optica.org.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={getAssetPath("/docs/optica-egypt-fact-sheet.html")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary min-h-[48px]"
              >
                <FileText size={15} aria-hidden="true" />
                <span>Charter Fact Sheet (A4)</span>
              </a>
              <Link href="/join" className="btn-primary min-h-[48px]">
                <span>Join or Contact</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <dl className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
            {[
              ["Charter Approval", charter.approvalDate],
              ["Current Standing", charter.currentStanding],
              ["Parent Organization", charter.parentOrganization],
              ["Section Desk Email", charter.contactEmail],
              ["Official Domain", siteConfig.officialDomain],
            ].map(([term, val]) => (
              <div key={term} className="flex flex-wrap items-center justify-between gap-2 py-4">
                <dt className="font-mono text-xs text-[var(--ink-faint)]">{term}</dt>
                <dd className="text-sm font-semibold text-[var(--ink)] break-all">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Integrated Editorial Index Row Layout (Zero Redundant Boxes) */}
      <section className="section-space border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="container-page space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Section Records</p>
              <h2 className="section-title mt-2">Dedicated Section Subpages</h2>
            </div>
          </div>

          <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
            {sectionDirectory.map((item, idx) => (
              <ScrollReveal key={item.href} delay={idx * 45}>
                <Link
                  href={item.href}
                  className="event-row grid gap-3 py-6 px-3 md:grid-cols-[4rem_16rem_1fr_auto] md:items-center min-h-[48px]"
                >
                  <span className="font-mono text-xs font-bold text-[var(--gold)]">{item.index}</span>
                  <h3 className="text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{item.summary}</p>
                  <span className="text-link inline-flex items-center gap-1 justify-self-start md:justify-self-end">
                    <span>{item.cta}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
