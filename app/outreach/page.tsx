import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Outreach",
  description:
    "Campus demonstration formats, International Day of Light initiatives, and student outreach coordination across Egypt.",
  path: "/outreach",
})

const OUTREACH_FORMATS = [
  {
    index: "01",
    title: "Optical Bench Demonstrations",
    body: "Portable diffraction, polarization, and geometric optics kits built for school classrooms and engineering open days.",
  },
  {
    index: "02",
    title: "International Day of Light",
    body: "Coordinated May programming connecting university chapters and public science spaces around optical physics demonstrations.",
  },
  {
    index: "03",
    title: "Campus Startup Clinics",
    body: "Introductory orientation clinics for university teams organizing new Optica student chapters across Egypt.",
  },
] as const

const OUTREACH_LINKS = [
  { label: "Egyptian School and Campus Optics Roadshow", meta: "Initiative Spec", href: "/projects/stem-campus-outreach" },
  { label: "Student Chapters and National Charter Map", meta: "Community Network", href: "/chapters" },
  { label: "Request Campus Speaker or Outreach Session", meta: "Participation Desk", href: "/join?type=speaker" },
] as const

export default function OutreachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Public Engagement"
        title="Science Outreach."
        intro="Structured demonstration kits and regional campus visits introducing students across Egypt to optics and photonics."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <ScrollReveal>
            <div className="grid border-y border-[var(--line)] divide-y md:divide-y-0 md:grid-cols-3 md:divide-x divide-[var(--line-subtle)]">
              {OUTREACH_FORMATS.map((item) => (
                <article key={item.index} className="py-7 md:px-7 first:md:pl-0 last:md:pr-0">
                  <span className="font-mono text-xs font-bold text-[var(--gold)]">{item.index}</span>
                  <h2 className="mt-3 text-lg font-semibold text-[var(--ink)]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
              {OUTREACH_LINKS.map((item) => (
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
