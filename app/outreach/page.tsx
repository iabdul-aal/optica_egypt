import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"

export const metadata: Metadata = { title: "Outreach", description: "Outreach and education from Optica Egypt." }

const programs = [
  ["01", "Optics in schools", "Accessible demonstrations that make the behaviour of light feel memorable and real."],
  ["02", "Campus workshops", "Practical sessions and conversations for students who want to go further."],
  ["03", "Public demonstrations", "A more visible, more approachable story about the technologies changing everyday life."],
  ["04", "Mentorship", "Relationships that help early-career people imagine their next step in photonics."],
] as const

export default function OutreachPage() {
  return <>
    <PageHeader eyebrow="Outreach" title="Make the wonder of light easy to reach." intro="Our outreach programmes are designed to turn a first moment of curiosity into a practical starting point for the next generation." />
    <section className="section-space bg-[#101416]">
      <div className="container-page">
        <div className="grid gap-7 border-b border-white/15 pb-8 md:grid-cols-[1fr_.8fr] md:items-end"><div><p className="eyebrow">Programmes</p><h2 className="section-title mt-3">Science works best when it is shared.</h2></div><p className="text-sm leading-6 text-[var(--ink-soft)] md:justify-self-end">Starting points for schools, campuses, and communities around Egypt.</p></div>
        <div className="mt-2 divide-y divide-white/10">{programs.map(([number, title, copy]) => <article key={title} className="grid gap-3 py-7 sm:grid-cols-[4rem_12rem_1fr] sm:gap-6"><p className="font-mono text-sm font-bold text-[var(--gold)]">{number}</p><h2 className="text-lg font-semibold text-[var(--ink)]">{title}</h2><p className="max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{copy}</p></article>)}</div>
      </div>
    </section>
    <section className="section-space"><div className="container-page border-y border-white/15 py-10"><p className="eyebrow">Host a workshop</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-[var(--ink)]">Bring a hands-on photonics experience to your campus or school.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">Tell us about your group and we will start a conversation about what could be useful.</p><Link href="/join" className="btn-primary mt-7">Request an outreach visit <ArrowUpRight size={15} /></Link></div></section>
  </>
}
