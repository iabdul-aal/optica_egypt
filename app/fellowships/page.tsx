import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Fellowships",
  description:
    "Fellowship coordination, Optica Foundation award cycles, and research mobility support mapped by Optica Egypt.",
  path: "/fellowships",
})

const FELLOWSHIP_TRACKS = [
  {
    index: "01",
    title: "Optica Foundation Awards",
    body: "Application calendar guidance for FiO/CLEO travel grants, Siegman International School, Women Scholars, and Amplify fellowships.",
  },
  {
    index: "02",
    title: "National Thesis and Prototype Support",
    body: "Structured advisory pathways pairing undergraduate and graduate optical engineering proposals with domestic grant calls.",
  },
  {
    index: "03",
    title: "Senior Member and Fellow Elevations",
    body: "Local endorsement introductions connecting experienced Egyptian researchers with Senior Faculty Advisors.",
  },
] as const

const FELLOWSHIP_LINKS = [
  {
    label: "Optica Global Fellowship and Elevation Guidance",
    meta: "Active Advisory",
    detail: "Checklist and endorsement guidance for Optica Senior Member and Fellow nominations.",
    href: "/projects/senior-fellow-nominations",
  },
  {
    label: "National Thesis Recognition and Support Concept",
    meta: "Planning Track",
    detail: "Framework supporting graduation and postgraduate optical thesis prototypes in Egypt.",
    href: "/projects/thesis-recognition-concept",
  },
  {
    label: "Egyptian and Global Funding Index",
    meta: "Resources Directory",
    detail: "Filter domestic STDF and ASRT calls alongside Optica Foundation award deadlines.",
    href: "/resources?category=grants",
  },
] as const

export default function FellowshipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Awards and Mobility"
        title="Fellowships and Grants"
        intro="Advisory pathways linking Egyptian students, doctoral fellows, and optical faculty to competitive grants and member elevations."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <ScrollReveal>
            <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
              <div className="lg:sticky lg:top-28 space-y-4">
                <p className="eyebrow">Mobility Framework</p>
                <h2 className="section-title">Three pathways connecting researchers to funding.</h2>
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                  Optica Egypt curates society travel fellowships alongside Egyptian graduation and postgraduate grant calendars without duplicating external funding portals.
                </p>
              </div>

              <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
                {FELLOWSHIP_TRACKS.map((track) => (
                  <article key={track.index} className="py-6">
                    <span className="font-mono text-xs font-bold text-[var(--gold)]">{track.index}</span>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{track.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{track.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="border-t border-[var(--line)] pt-10 grid gap-8 md:grid-cols-3 md:divide-x divide-[var(--line-subtle)]">
              {FELLOWSHIP_LINKS.map((item) => (
                <article
                  key={item.href}
                  className="md:px-6 first:md:pl-0 last:md:pr-0 flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      {item.meta}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-[var(--ink)]">{item.label}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{item.detail}</p>
                  </div>
                  <Link
                    href={item.href}
                    className="text-link inline-flex min-h-[48px] items-center gap-1 self-start"
                  >
                    <span>Inspect pathway</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
