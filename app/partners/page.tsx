import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
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
        title="Partnerships and Alliances"
        intro="Optica Egypt builds structured academic, open-source photonic foundry, and training collaborations across Egypt and international partner networks."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <ScrollReveal>
            <div className="space-y-6">
              <div>
                <p className="eyebrow">Collaboration Frameworks</p>
                <h2 className="section-title mt-2">Active Partnership Models</h2>
              </div>
              <div className="grid border-y border-[var(--line)] divide-y md:divide-y-0 md:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-[var(--line-subtle)]">
                {models.map((model, idx) => (
                  <article
                    key={model.id}
                    className="py-7 md:px-6 first:md:pl-0 last:lg:pr-0"
                  >
                    <span className="font-mono text-xs font-bold text-[var(--gold)]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-[var(--ink)]">{model.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{model.scope}</p>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="border-t border-[var(--line)] pt-10 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
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
                <p className="text-sm leading-relaxed text-[var(--ink-soft)] max-w-2xl">
                  Formal institutional agreements and memoranda of understanding are executed and published here once the charter enters active operation. Proposals submitted through the unified participation desk are routed directly to the Executive Committee.
                </p>
              ) : (
                <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
                  {partners.map((partner) => (
                    <div key={partner.id} className="py-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase text-[var(--gold)]">
                          {partner.category}
                        </span>
                        <h3 className="mt-1 text-base font-semibold text-[var(--ink)]">{partner.name}</h3>
                        <p className="mt-1 text-sm text-[var(--ink-soft)] max-w-2xl">{partner.scope}</p>
                      </div>
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
