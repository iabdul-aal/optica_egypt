import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { getAllResources } from "@/lib/resources"
import { PageHeader } from "@/components/sections/PageHeader"

export const metadata: Metadata = { title: "Resources", description: "Curated optics and photonics resources." }

export default function ResourcesPage() {
  const resources = getAllResources()
  return <>
    <PageHeader eyebrow="Resources" title="A practical shelf for learning and research." intro="A small, curated collection of tools, journals, opportunities, and starting points for the optics and photonics community." />
    <section className="section-space"><div className="container-page"><div className="border-y border-white/15">{resources.map((resource, index) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="group grid gap-4 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.025] sm:grid-cols-[3.5rem_8rem_1fr_auto] sm:items-start sm:gap-6"><span className="px-1 font-mono text-sm font-bold text-[var(--gold)]">0{index + 1}</span><span className="px-1 text-[0.68rem] font-bold tracking-[0.12em] text-[var(--ink-soft)]">{resource.category.toUpperCase()}{resource.free ? " / FREE" : ""}</span><span className="px-1"><span className="block text-lg font-semibold leading-snug text-[var(--ink)]">{resource.title.en}</span><span className="mt-2 block max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">{resource.description.en}</span></span><span className="px-1 text-[var(--gold)]"><ArrowUpRight size={18} /></span></a>)}</div></div></section>
  </>
}
