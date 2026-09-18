import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"

export const metadata: Metadata = { title: "Community", description: "The Optica Egypt community." }

const groups = [
  ["Students", "Discover a field, meet mentors, and make the next question easier to ask."],
  ["Researchers", "Exchange ideas, find collaborators, and connect work to a broader technical community."],
  ["Academia", "Create stronger links between learning environments, labs, and future careers."],
  ["Industry", "Share practical perspective and help connect research with real-world application."],
  ["Startups", "Explore a growing network of people building with light—from sensing to communications."],
] as const

export default function CommunityPage() {
  return <>
    <PageHeader eyebrow="Our community" title="Different paths. One shared wavelength." intro="Optica Egypt is a place to learn with people who care about the possibilities of light." />
    <section className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[.84fr_1.16fr]">
        <div><p className="eyebrow">The ecosystem</p><h2 className="section-title mt-3">A community is more than an audience.</h2><p className="lede mt-6">Each group brings a different kind of knowledge. The section exists to make those perspectives more visible to one another.</p><Link href="/join" className="btn-primary mt-8">Join the community <ArrowUpRight size={14} /></Link></div>
        <div className="border-y border-white/15">
          {groups.map(([title, copy], index) => <article key={title} className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[3.2rem_10.5rem_1fr] sm:gap-6 last:border-b-0"><span className="font-mono text-sm font-bold text-[var(--gold)]">0{index + 1}</span><h2 className="text-lg font-semibold text-[var(--ink)]">{title}</h2><p className="text-sm leading-6 text-[var(--ink-soft)]">{copy}</p></article>)}
        </div>
      </div>
    </section>
    <section className="border-y border-white/10 bg-[#0d1011] py-14">
      <div className="container-page grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><p className="font-mono text-xs font-bold leading-7 tracking-[0.12em] text-[var(--gold)]">QUESTION<br />↓<br />CONVERSATION<br />↓<br />CONNECTION</p><p className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-[var(--ink)]">The aim is simple: make it easier for people working with light to find each other.</p></div>
    </section>
  </>
}
