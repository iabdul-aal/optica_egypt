import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { getDictionary, localizedHref } from "@/lib/locales"

export const metadata: Metadata = {
  title: "Community",
  description: "Connect with Egypt's photonics community spanning student chapters, research groups, university faculty, and industrial pioneers.",
  alternates: {
    canonical: "/community/",
  },
}

export default function CommunityPage() {
  const dictionary = getDictionary("en")
  const groups = Object.values(dictionary.community.groups)

  return (
    <>
      <PageHeader eyebrow={dictionary.community.eyebrow} title={dictionary.community.title} intro={dictionary.community.intro} />
      <section className="section-space">
        <div className="container-page grid gap-12 lg:grid-cols-[.84fr_1.16fr]">
          <div>
            <p className="eyebrow">{dictionary.community.systemEyebrow}</p>
            <h2 className="section-title mt-3">{dictionary.community.systemTitle}</h2>
            <p className="lede mt-6">{dictionary.community.systemBody}</p>
            <Link href={localizedHref("en", "/join?interest=community")} className="btn-primary mt-8">
              {dictionary.community.action} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="border-y border-white/15">
            {groups.map((group, index) => (
              <article key={group.title} className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[3.2rem_11rem_1fr] sm:gap-6 last:border-b-0">
                <span className="font-mono text-sm font-bold text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="text-lg font-semibold text-[var(--ink)]">{group.title}</h2>
                <p className="text-sm leading-6 text-[var(--ink-soft)]">{group.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-[var(--surface)] py-14">
        <div className="container-page">
          <div className="grid gap-px border-y border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            <article className="bg-[var(--surface)] p-6">
              <p className="eyebrow">01 / DISCOVER</p>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--ink)]">Find the right room.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">Start with an event, resource, or shared technical interest.</p>
            </article>
            <article className="bg-[var(--surface)] p-6">
              <p className="eyebrow">02 / CONTRIBUTE</p>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--ink)]">Bring a useful perspective.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">A question, a skill, a proposal, or practical experience can move a conversation forward.</p>
            </article>
            <article className="bg-[var(--surface)] p-6">
              <p className="eyebrow">03 / CONTINUE</p>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--ink)]">Build a real connection.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">Follow up through a human coordinator when a collaboration, chapter, or event needs care.</p>
            </article>
          </div>
          <p className="mt-8 max-w-3xl text-xl font-semibold leading-tight tracking-tight text-[var(--ink)]">{dictionary.community.statement}</p>
        </div>
      </section>
    </>
  )
}
