import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  MapPin,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { PartnerInquiryForm } from "@/components/sections/PartnerInquiryForm"
import {
  getPartnersData,
  getPartnerCategories,
  getPartnershipModels,
  getPartnerMetrics,
} from "@/lib/partners"

export const metadata: Metadata = {
  title: "Partners",
  description: "Explore Optica Egypt's strategic alliances across academic faculties, deep-tech industry champions, and national science funding authorities.",
  alternates: {
    canonical: "/partners/",
  },
}

export default function PartnersPage() {
  const data = getPartnersData()
  const categories = getPartnerCategories()
  const models = getPartnershipModels()
  const metrics = getPartnerMetrics()

  const categoryIcons: Record<string, React.ReactNode> = {
    academic: <GraduationCap size={16} aria-hidden="true" className="text-[var(--gold)]" />,
    industry: <Building2 size={16} aria-hidden="true" className="text-[var(--gold)]" />,
    government: <Landmark size={16} aria-hidden="true" className="text-[var(--gold)]" />,
  }

  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        intro={data.intro}
      />

      {/* ── Alliances Overview and Strategic Impact ───────────────────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-10">
        <div className="container-page">
          <div className="site-card p-6 sm:p-10 border-l-4 border-l-[var(--gold)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--line-subtle)]">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  <Handshake size={14} aria-hidden="true" />
                  <span>National Photonics Coalition</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mt-2">
                  Catalyzing Innovation Through Multi-Sector Alliances
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)] mt-3">
                  {data.overview.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a href="#partner-inquiry" className="btn-primary">
                  <span>Propose an Alliance</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <Link href="/about" className="btn-secondary">
                  <span>Section Strategy</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5">
                  <span className="font-mono text-2xl font-bold text-[var(--gold)]">
                    {m.metric}
                  </span>
                  <p className="text-xs font-semibold text-[var(--ink)] mt-1.5">
                    {m.label}
                  </p>
                  <p className="text-[11px] text-[var(--ink-soft)] mt-1 leading-relaxed">
                    {m.subtext}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categorized Partners Directory ─────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page space-y-16">
          {categories.map((category) => (
            <div key={category.id} className="space-y-6">
              <div className="border-b border-[var(--line)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                    {categoryIcons[category.id] || <Layers size={14} />}
                    <span>{category.title}</span>
                  </div>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">
                    {category.tagline}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                  {category.partners.length} Active Collaborators
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="site-card p-6 flex flex-col justify-between hover:border-[var(--gold)]/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--gold)] font-bold uppercase">
                          {partner.role}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-[var(--ink-faint)] shrink-0">
                          <MapPin size={11} aria-hidden="true" />
                          <span>{partner.city}</span>
                        </div>
                      </div>

                      <h3 className="mt-4 text-base sm:text-lg font-bold tracking-tight text-[var(--ink)]">
                        {partner.name}
                      </h3>
                      <p className="text-xs font-medium text-[var(--gold)] mt-0.5">
                        {partner.department}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                        {partner.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {partner.focusAreas.map((area) => (
                          <span
                            key={area}
                            className="rounded-sm border border-[var(--line-subtle)] bg-[var(--surface-raised)] px-2 py-0.5 text-[10px] font-medium text-[var(--ink-soft)]"
                          >
                            {area}
                          </span>
                        ))}
                      </div>

                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-soft)] hover:text-[var(--gold)] transition-colors pt-1"
                      >
                        <span>Visit Institutional Portal</span>
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Partnership Collaboration Models ───────────────────────────────── */}
      <section className="section-space border-t border-[var(--line)] bg-[var(--surface-raised)]">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-6 mb-10">
            <p className="eyebrow">Collaboration Frameworks</p>
            <h2 className="section-title mt-2">How Organizations Partner With Optica Egypt</h2>
            <p className="text-xs text-[var(--ink-soft)] mt-2">
              Three structured engagement tracks built to maximize impact and scientific output within Egypt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((model) => (
              <div key={model.id} className="site-card p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[var(--gold)]">
                    Model {model.number}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-[var(--ink)]">
                    {model.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {model.description}
                  </p>

                  <div className="mt-6 space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                      Key Alliance Deliverables:
                    </p>
                    <ul className="space-y-2">
                      {model.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-[var(--ink-soft)]">
                          <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Partner Intake Form ───────────────────────────────── */}
      <section id="partner-inquiry" className="section-space">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="eyebrow">Initiate an Alliance</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mt-2">
                Partner With Optica Egypt
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">
                Connect your university faculty, laboratory, corporate engineering department, or state agency to Egypt&apos;s unified photonics network.
              </p>
            </div>

            <div className="site-card p-6 sm:p-10 border-t-4 border-t-[var(--gold)]">
              <PartnerInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
