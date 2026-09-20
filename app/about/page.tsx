import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getDictionary } from "@/lib/locales"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Optica Egypt Local Section, our mission, vision, and strategic pillars advancing photonics in Egypt.",
  alternates: {
    canonical: "/about/",
  },
}

export default function AboutPage() {
  const dictionary = getDictionary("en")
  const pillars = Object.values(dictionary.about.pillars)

  return (
    <>
      <PageHeader eyebrow={dictionary.about.eyebrow} title={dictionary.about.title} intro={dictionary.about.intro} />
      <section className="section-space">
        <ScrollReveal animation="fade-up" delay={30}>
          <div className="container-page grid gap-9 border-b border-white/15 pb-11 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="eyebrow">{dictionary.about.purposeEyebrow}</p>
              <h2 className="section-title mt-3">{dictionary.about.purposeTitle}</h2>
            </div>
            <p className="lede max-w-2xl lg:pt-8">{dictionary.about.purposeBody}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={50}>
          <div className="container-page mt-12 grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="group/pillar px-1 py-7 md:px-7 transition-colors duration-200 hover:bg-white/[0.02]">
                <p className="font-mono text-sm font-bold text-[var(--gold)]">{pillar.number}</p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--ink)] group-hover/pillar:text-white transition-colors">{pillar.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--ink-soft)]">{pillar.body}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Key Milestones ────────────────────────────────────────── */}
        <div className="container-page mt-16 grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-2">
          <ScrollReveal animation="fade-up" delay={40}>
            <div className="site-card p-6">
              <p className="eyebrow">Charter Approval</p>
              <p className="mt-2 font-mono text-xl font-bold text-[var(--gold)]">10 September 2026</p>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                Optica formally approved the establishment of the Optica Egypt Local Section, welcoming Egypt into the global optics society.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={80}>
            <div className="site-card p-6">
              <p className="eyebrow">Inauguration Ceremony</p>
              <p className="mt-2 font-mono text-xl font-bold text-[var(--gold)]">1 November 2026</p>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                Section kick-off gathering bringing together university faculties, researchers, students, and industry partners. Details to follow.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
