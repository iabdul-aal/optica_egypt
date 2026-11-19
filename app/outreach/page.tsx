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

export default function OutreachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Public Engagement"
        title="Science Outreach"
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
            <div className="bg-[var(--surface-raised)] border-y border-[var(--line)] p-7 sm:p-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="space-y-4">
                <p className="eyebrow">Host a Campus Demonstration</p>
                <h2 className="section-title">Bring Optics Demonstrations to Your Faculty or School</h2>
                <p className="text-sm leading-relaxed text-[var(--ink-soft)] max-w-xl">
                  Departments, STEM schools, and student clubs can coordinate experimental kits, Optica Traveling Lecturer sessions, or May International Day of Light visits through the outreach desk.
                </p>
                <div className="pt-2">
                  <Link href="/join?type=speaker" className="btn-primary min-h-[48px]">
                    <span>Request Campus Outreach Session</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="lg:border-l lg:border-[var(--line)] lg:pl-8 divide-y divide-[var(--line-subtle)] border-y border-[var(--line-subtle)] lg:border-y-0">
                <Link
                  href="/projects/stem-campus-outreach"
                  className="flex min-h-[48px] items-center justify-between gap-4 py-4 text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                >
                  <span>Egyptian School and Campus Optics Roadshow</span>
                  <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
                </Link>
                <Link
                  href="/chapters"
                  className="flex min-h-[48px] items-center justify-between gap-4 py-4 text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                >
                  <span>Student Chapters and National Charter Map</span>
                  <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
