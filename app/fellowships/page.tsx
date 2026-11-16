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
  { label: "Optica Global Fellowship and Elevation Guidance", meta: "Active Advisory", href: "/projects/senior-fellow-nominations" },
  { label: "National Thesis Recognition and Support Concept", meta: "Planning Track", href: "/projects/thesis-recognition-concept" },
  { label: "Browse Egyptian and Global Funding Index", meta: "Resources Directory", href: "/resources?category=grants" },
] as const

export default function FellowshipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Awards and Mobility"
        title="Fellowships and Grants."
        intro="Advisory pathways linking Egyptian students, doctoral fellows, and optical faculty to competitive grants and member elevations."
      />

      <section className="section-space">
        <div className="container-page space-y-12">
          <ScrollReveal>
            <div className="grid gap-6 md:grid-cols-3">
              {FELLOWSHIP_TRACKS.map((track) => (
                <article key={track.index} className="site-card p-6">
                  <span className="font-mono text-xs font-bold text-[var(--gold)]">{track.index}</span>
                  <h2 className="mt-3 text-lg font-semibold text-[var(--ink)]">{track.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{track.body}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
              {FELLOWSHIP_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="event-row flex flex-wrap items-center justify-between gap-4 py-5 px-3 min-h-[48px]"
                >
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      {item.meta}
                    </span>
                    <span className="mt-1 block text-base font-semibold text-[var(--ink)]">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-link inline-flex items-center gap-1">
                    <span>Open</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
