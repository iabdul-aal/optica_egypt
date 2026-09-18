import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "@/components/sections/ContactForm"
import { PageHeader } from "@/components/sections/PageHeader"

export const metadata: Metadata = { title: "Join Optica Egypt", description: "Join the Optica Egypt Local Section." }

const reasons = ["Meet people who care about the same questions.", "Find talks, resources, and learning opportunities.", "Build relationships across Egypt's photonics community."]

export default function JoinPage() {
  return <>
    <PageHeader eyebrow="Join Optica Egypt" title="Your next connection could change your trajectory." intro="Membership is open to students, researchers, faculty, professionals, and anyone excited by the science and application of light." />
    <section className="section-space"><div className="container-page grid gap-12 lg:grid-cols-[.82fr_1.18fr]"><div><p className="eyebrow">Why join</p><h2 className="section-title mt-3">Come as you are. Grow from there.</h2><ul className="mt-8 grid gap-0 border-y border-white/15">{reasons.map((reason, index) => <li key={reason} className="flex gap-4 border-b border-white/10 py-4 text-sm leading-6 text-[var(--ink-soft)] last:border-b-0"><span className="font-mono text-[var(--gold)]">0{index + 1}</span>{reason}</li>)}</ul><div className="mt-9 flex flex-wrap items-center gap-7 sm:gap-9"><a href={siteConfig.joinFormUrl} target="_blank" rel="noreferrer" className="btn-primary">Open membership form <ArrowUpRight size={14} /></a><a href={`mailto:${siteConfig.email}`} className="btn-secondary">Email us <ArrowUpRight size={14} /></a></div></div><ContactForm /></div></section>
  </>
}
