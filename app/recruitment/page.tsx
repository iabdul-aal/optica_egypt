import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, FlaskConical, Globe2, Users } from "lucide-react"
import { RecruitmentForm } from "@/components/sections/RecruitmentForm"

export const metadata: Metadata = { title: "Chapter Recruitment", description: "Apply to join Optica Egypt's chapter community and committees.", alternates: { canonical: "/recruitment" } }

export default function RecruitmentPage() {
  return <section className="section-space scientific-grid">
    <div className="container-page">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6"><p className="eyebrow">Community / Recruitment</p><Link href="/admin" className="inline-flex min-h-12 items-center gap-2 text-sm text-[var(--ink-soft)]">Staff workspace <ArrowUpRight size={15} /></Link></div>
      <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)] px-3 py-2 font-mono text-xs text-[var(--gold)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> Chapter membership</span>
          <h1 className="display-title mt-7">Bring your curiosity.<br /><span className="text-[var(--gold)]">Build your chapter.</span></h1>
          <p className="lede mt-6 max-w-lg">Join a community shaping the future of optics and photonics in Egypt. Share your interests, find your committee, and turn ideas into impact.</p>
          <div className="mt-10 space-y-6 border-y border-[var(--line)] py-7">
            {[[Users, "Find your people", "Meet students, researchers, and mentors who share your curiosity."], [FlaskConical, "Learn by contributing", "Help build workshops, outreach, and open source photonics programs."], [Globe2, "Make a local impact", "Connect your university to Egypt’s wider scientific community."]].map(([Icon, title, text]) => { const Mark = Icon as typeof Users; return <div key={String(title)} className="flex gap-4"><Mark size={21} className="mt-1 shrink-0 text-[var(--gold)]" /><div><h2 className="font-semibold">{String(title)}</h2><p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">{String(text)}</p></div></div> })}
          </div>
          <p className="mt-6 font-mono text-xs leading-6 text-[var(--ink-faint)]">01 Apply → 02 Committee review → 03 Meet the team</p>
        </div>
        <RecruitmentForm />
      </div>
    </div>
  </section>
}
