import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Handshake } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getConfirmedPartners, getPartnershipModels } from "@/lib/governance"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Partners",
  description:
    "Academic, industry, and open-hardware collaboration models with Optica Egypt and verified institutional partner registry.",
  path: "/partners",
})

export default function PartnersPage() {
  const models = getPartnershipModels()
  const partners = getConfirmedPartners()

  return (
    <>
      <PageHeader
        eyebrow="Institutional Collaboration"
        title="Partnerships and Alliances."
        intro="Optica Egypt builds structured academic, open-source photonic foundry, and training collaborations across Egypt and international partner networks."
      />

      <section className="section-space">
        <div className="container-page space-y-12">
          <ScrollReveal>
            <div>
              <p className="eyebrow">Collaboration Frameworks</p>
              <h2 className="section-title mt-2">Active Partnership Models</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {models.map((model) => (
                  <article key={model.id} className="site-card p-6 flex flex-col justify-between gap-4">
                    <div>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)]">
                        <Handshake size={15} aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-[var(--ink)]">{model.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{model.scope}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="site-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">Public Registry</p>
                  <h2 className="section-title mt-1">
                    Confirmed Institutional Partners ({partners.length})
                  </h2>
                </div>
                <Link href="/join?type=partner" className="btn-primary min-h-[48px]">
                  <span>Submit Partner Proposal</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
              {partners.length === 0 ? (
                <p className="text-sm text-[var(--ink-soft)] max-w-2xl">
                  Formal institutional agreements and memoranda of understanding are executed and published here once the charter enters active operation. Proposals submitted through the unified participation desk are routed directly to the Executive Committee.
                </p>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {partners.map((partner) => (
                    <div key={partner.id} className="border border-[var(--line-subtle)] p-5 rounded-sm space-y-2">
                      <span className="font-mono text-[10px] font-bold uppercase text-[var(--gold)]">
                        {partner.category}
                      </span>
                      <h3 className="text-base font-semibold text-[var(--ink)]">{partner.name}</h3>
                      <p className="text-sm text-[var(--ink-soft)]">{partner.scope}</p>
                      {partner.url && (
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link inline-flex min-h-[48px] items-center gap-1"
                        >
                          <span>Visit partner site</span>
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
