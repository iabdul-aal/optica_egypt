import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { getDictionary, localizedHref } from "@/lib/locales"

export const metadata: Metadata = {
  title: "Outreach",
  description: "Educational outreach, secondary school science initiatives, and regional university workshops by Optica Egypt.",
  alternates: {
    canonical: "/outreach/",
  },
}

export default function OutreachPage() {
  const dictionary = getDictionary("en")
  const programmes = Object.values(dictionary.outreach.programmes)

  return (
    <>
      <PageHeader eyebrow={dictionary.outreach.eyebrow} title={dictionary.outreach.title} intro={dictionary.outreach.intro} />
      <section className="section-space bg-[var(--surface)]">
        <div className="container-page">
          <div className="section-split-heading">
            <div>
              <p className="eyebrow">{dictionary.outreach.programmesEyebrow}</p>
              <h2 className="section-title">{dictionary.outreach.programmesTitle}</h2>
            </div>
            <p className="lede">{dictionary.outreach.programmesIntro}</p>
          </div>
          <div className="mt-2 divide-y divide-white/10">
            {programmes.map((programme) => (
              <article key={programme.title} className="grid gap-3 py-7 sm:grid-cols-[4rem_12rem_1fr] sm:gap-6">
                <p className="font-mono text-sm font-bold text-[var(--gold)]">{programme.number}</p>
                <h2 className="text-lg font-semibold text-[var(--ink)]">{programme.title}</h2>
                <p className="max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{programme.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-page border-y border-white/15 py-10">
          <p className="eyebrow">{dictionary.outreach.hostEyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-[var(--ink)]">
            {dictionary.outreach.hostTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
            {dictionary.outreach.hostBody}
          </p>
          <Link href={localizedHref("en", "/join?interest=outreach")} className="btn-primary mt-7">
            {dictionary.outreach.hostAction} <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
