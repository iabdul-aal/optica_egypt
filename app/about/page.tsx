import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, FileText, Mail } from "lucide-react"
import { BoilerplateBox } from "@/components/sections/BoilerplateBox"
import { MemberCard } from "@/components/sections/MemberCard"
import { PageHeader } from "@/components/sections/PageHeader"
import {
  getAnnualReportScope,
  getBylawStandards,
  getCharterRecord,
  getConfirmedPartners,
  getExecutiveAlignment,
  getGovernanceOverview,
  getPartnershipModels,
  getSectionRecognitions,
} from "@/lib/governance"
import { getAdvisoryMembers, getExecutiveMembers, getOperationalMembers } from "@/lib/members"
import { getPressBoilerplate, getMediaKit } from "@/lib/press"
import { buildPageMetadata } from "@/lib/seo"
import { getSiteUrlSafe } from "@/lib/site-helpers"
import { getAssetPath } from "@/lib/utils"

export const metadata: Metadata = buildPageMetadata({
  title: "About, Governance, and Leadership",
  description:
    "Charter verification, Optica bylaw compliance, founding officer roster, partnerships, and press identity kit for the Optica Egypt Local Section.",
  path: "/about",
})

export default function AboutPage() {
  const governance = getGovernanceOverview()
  const charter = getCharterRecord()
  const bylaws = getBylawStandards()
  const seats = getExecutiveAlignment()
  const annualScope = getAnnualReportScope()
  const partners = getConfirmedPartners()
  const partnerModels = getPartnershipModels()
  const recognitions = getSectionRecognitions()

  const executive = getExecutiveMembers()
  const operational = getOperationalMembers()
  const advisory = getAdvisoryMembers()
  const totalMembers = executive.length + operational.length + advisory.length

  const boilerplate = getPressBoilerplate()
  const mediaKit = getMediaKit()
  const siteUrl = getSiteUrlSafe()

  return (
    <>
      <PageHeader
        eyebrow="Section Record"
        title="Charter, Governance, and Founding Team."
        intro="Verified standing of the Optica Egypt Local Section, constitutional officers, partnership scope, and official brand identity assets."
      />

      {/* Sticky Section Anchor Bar */}
      <nav
        aria-label="About sections"
        className="border-b border-[var(--line)] bg-[var(--surface-raised)]"
      >
        <div className="container-page flex flex-wrap gap-2 py-3">
          {[
            { label: "Charter", href: "#overview" },
            { label: "Governance", href: "#governance" },
            { label: "Leadership (16)", href: "#leadership" },
            { label: "Partners", href: "#partners" },
            { label: "Press Kit", href: "#press" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[48px] items-center rounded-sm border border-[var(--line)] bg-[var(--surface)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 1. Overview and Charter Table */}
      <section id="overview" className="section-space scroll-mt-24">
        <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <div className="space-y-4">
            <p className="eyebrow">Institutional Identity</p>
            <h2 className="section-title">Local volunteer coordination under Optica bylaws.</h2>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
              The Optica Egypt Local Section operates across Egyptian universities and industrial optics laboratories to connect student chapters, faculty advisors, and researchers with global Optica resources. Global Optica membership billing and Society publications remain administered directly on optica.org.
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

          <dl className="site-card divide-y divide-[var(--line-subtle)] p-6">
            {[
              ["Charter Approval", charter.approvalDate],
              ["Current Standing", charter.currentStanding],
              ["Parent Organization", charter.parentOrganization],
              ["Section Desk Email", charter.contactEmail],
              ["Official Domain", `${siteUrl}/`],
            ].map(([term, val]) => (
              <div key={term} className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0">
                <dt className="font-mono text-xs text-[var(--ink-faint)]">{term}</dt>
                <dd className="text-sm font-semibold text-[var(--ink)] break-all">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2. Governance and Bylaws */}
      <section id="governance" className="section-space scroll-mt-24 border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="container-page space-y-12">
          <div>
            <p className="eyebrow">{governance.eyebrow}</p>
            <h2 className="section-title mt-2">Optica Local Section Governance Standards</h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">{governance.intro}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {bylaws.map((item) => (
              <article key={item.id} className="site-card p-6">
                <span className="font-mono text-xs font-bold text-[var(--gold)]">{item.number}</span>
                <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.requirement}</p>
                <p className="mt-3 border-t border-[var(--line-subtle)] pt-3 font-mono text-xs text-[var(--gold)]">
                  {item.sectionStatus}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className="site-card p-6">
              <h3 className="text-lg font-semibold text-[var(--ink)]">Constitutional Executive Seats</h3>
              <div className="mt-4 divide-y divide-[var(--line-subtle)]">
                {seats.map((seat) => (
                  <div key={seat.memberId} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div>
                      <p className="font-mono text-xs text-[var(--gold)]">{seat.constitutionalSeat}</p>
                      <Link
                        href={`/leadership/${seat.memberId}`}
                        className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)] inline-flex min-h-[48px] items-center gap-1"
                      >
                        <span>{seat.holderName}</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--ink-soft)]">{seat.institution}</p>
                      <p className="font-mono text-[11px] text-[var(--ink-faint)]">
                        Optica ID {seat.opticaId}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="site-card p-6 space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-[var(--ink)]">Annual Reporting Scope</h3>
                <p className="mt-1 text-xs text-[var(--ink-soft)]">
                  Prepared annually for the 31 December Optica reporting cycle.
                </p>
              </div>
              <div className="divide-y divide-[var(--line-subtle)]">
                {annualScope.map((item) => (
                  <div key={item.id} className="py-3">
                    <p className="text-sm font-semibold text-[var(--ink)]">{item.title}</p>
                    <p className="mt-1 text-xs text-[var(--ink-soft)]">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--line-subtle)] pt-4">
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--ink-faint)]">
                  Section Recognitions ({recognitions.length})
                </p>
                <p className="mt-1 text-xs text-[var(--ink-soft)]">
                  {recognitions.length === 0
                    ? "Confirmed section recognitions will appear here as they are awarded."
                    : `${recognitions.length} recorded honors.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Founding Leadership Directory */}
      <section id="leadership" className="section-space scroll-mt-24 border-t border-[var(--line)]">
        <div className="container-page space-y-12">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
            <div>
              <p className="eyebrow">Founding Roster</p>
              <h2 className="section-title mt-2">
                {totalMembers} Active Officers and Faculty Advisors
              </h2>
            </div>
            <span className="font-mono text-xs text-[var(--gold)]">
              Term 2024–2026 / Inaugural Cycle
            </span>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="eyebrow mb-6">Executive Committee ({executive.length})</h3>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                {executive.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="eyebrow mb-6">Operational Committee ({operational.length})</h3>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                {operational.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="eyebrow mb-6">Senior Faculty Advisory Board ({advisory.length})</h3>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {advisory.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Partnerships */}
      <section id="partners" className="section-space scroll-mt-24 border-t border-[var(--line)] bg-[var(--surface-raised)]">
        <div className="container-page space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
            <div>
              <p className="eyebrow">Institutional Alliances</p>
              <h2 className="section-title mt-2">University, Lab, and Industry Partnerships</h2>
            </div>
            <Link href="/join?type=partner" className="btn-primary min-h-[48px]">
              <span>Submit Partnership Inquiry</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {partnerModels.map((model) => (
              <div key={model.id} className="site-card p-6">
                <h3 className="text-base font-semibold text-[var(--ink)]">{model.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{model.scope}</p>
              </div>
            ))}
          </div>

          <p className="text-xs font-mono text-[var(--ink-faint)]">
            {partners.length === 0
              ? "Confirmed institutional MOU agreements will appear here once finalized."
              : `${partners.length} active agreements recorded.`}
          </p>
        </div>
      </section>

      {/* 5. Press Kit and Official Marks */}
      <section id="press" className="section-space scroll-mt-24 border-t border-[var(--line)]">
        <div className="container-page space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
            <div>
              <p className="eyebrow">Media and Brand Kit</p>
              <h2 className="section-title mt-2">Official Boilerplate and Vector Marks</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${charter.contactEmail}`}
                className="btn-secondary min-h-[48px]"
              >
                <Mail size={14} aria-hidden="true" />
                <span>{charter.contactEmail}</span>
              </a>
              <Link href="/join?type=press" className="btn-primary min-h-[48px]">
                <span>Press Desk Form</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <BoilerplateBox
            title={boilerplate.title}
            body={boilerplate.body}
            short={boilerplate.short}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mediaKit.assets.map((asset) => (
              <a
                key={asset.id}
                href={getAssetPath(asset.downloadUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="site-card p-5 flex flex-col justify-between gap-4 hover:border-[var(--gold)] transition-colors min-h-[48px]"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[var(--gold)]">
                    {asset.format}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-[var(--ink)]">{asset.title}</h3>
                  <p className="mt-1 text-xs text-[var(--ink-soft)]">{asset.description}</p>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--gold)]">
                  Download / Open <ExternalLink size={12} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
