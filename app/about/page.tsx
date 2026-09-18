import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/PageHeader"

export const metadata: Metadata = { title: "About Optica Egypt", description: "The mission of Optica Egypt Local Section." }

const pillars = [
  ["01", "Learn together", "Practical learning, technical exchange, and mentorship for every stage of an optics journey."],
  ["02", "Collaborate openly", "Stronger links between Egyptian universities, research groups, and industry partners."],
  ["03", "Make ideas matter", "A supportive path from curiosity and research to real-world impact."],
  ["04", "Connect globally", "A local gateway to the knowledge and opportunities across the wider Optica community."],
] as const

export default function AboutPage() {
  return <>
    <PageHeader eyebrow="About the section" title="A shared home for people who work with light." intro="Optica Egypt Local Section helps grow an open, connected photonics community across Egypt, in dialogue with the wider Optica network." />
    <section className="section-space">
      <div className="container-page grid gap-9 border-b border-white/15 pb-11 lg:grid-cols-[.85fr_1.15fr]">
        <div><p className="eyebrow">Our purpose</p><h2 className="section-title mt-3">Curiosity becomes capability when it has a community behind it.</h2></div>
        <p className="lede max-w-2xl lg:pt-8">We create welcoming points of entry to optics and photonics, then cultivate the relationships that help students, researchers, and professionals keep moving forward.</p>
      </div>
      <div className="container-page mt-12 grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        {pillars.map(([number, title, copy]) => <article key={title} className="px-1 py-7 md:px-7"><p className="font-mono text-sm font-bold text-[var(--gold)]">{number}</p><h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[var(--ink-soft)]">{copy}</p></article>)}
      </div>
    </section>
  </>
}
