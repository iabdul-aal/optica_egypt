import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { getLatestNews } from "@/lib/news"
import { getUpcomingEvents } from "@/lib/events"
import { HeroSection } from "@/components/sections/HeroSection"
import { ImpactMetrics } from "@/components/sections/ImpactMetrics"
import { EventCard } from "@/components/sections/EventCard"
import { NewsSection } from "@/components/sections/NewsSection"
import { ResearchExplorer } from "@/components/sections/ResearchExplorer"

export const metadata: Metadata = {
  title: "Optica Egypt Local Section",
  description: "A meeting point for Egypt's optics and photonics community.",
}

const communityNodes = [
  ["Students", "Emerging questions"],
  ["Researchers", "Ideas in motion"],
  ["Academia", "Learning environments"],
  ["Industry", "Applied perspective"],
  ["Startups", "New pathways"],
] as const

export default function HomePage() {
  const events = getUpcomingEvents(3)
  const news = getLatestNews(3)

  return (
    <>
      <HeroSection />
      <ImpactMetrics />

      <section className="section-space relative overflow-hidden bg-[#0a0c0d]">
        <div className="scientific-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-page relative">
          <div className="grid gap-10 border-b border-white/15 pb-9 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">Community system</p>
              <h2 className="section-title mt-3 max-w-xl">Knowledge moves when the right people can meet.</h2>
            </div>
            <p className="lede max-w-lg lg:justify-self-end">Optica Egypt brings five parts of a scientific ecosystem into conversation—without flattening their different perspectives.</p>
          </div>

          <div className="mt-10 grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="order-2 grid gap-x-7 gap-y-6 sm:grid-cols-2 lg:order-1">
              {communityNodes.map(([title, detail], index) => (
                <article className="border-t border-white/15 pt-4" key={title}>
                  <p className="font-mono text-[0.68rem] font-bold text-[var(--gold)]">0{index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{title}</h3>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">{detail}</p>
                </article>
              ))}
            </div>
            <div className="order-1 relative py-2 sm:py-4 lg:order-2">
              <svg viewBox="0 0 620 360" className="relative h-auto w-full" fill="none" aria-label="A conceptual optical network connecting the Optica Egypt community">
                <path d="M310 181L118 74M310 181L464 68M310 181L506 190M310 181L425 301M310 181L150 289" stroke="#d1a247" strokeWidth="2" strokeDasharray="5 8" opacity="0.8" />
                <path d="M118 74L464 68M464 68L506 190M506 190L425 301M425 301L150 289M150 289L118 74" stroke="#5b615d" strokeWidth="1.5" opacity="0.8" />
                <circle cx="310" cy="181" r="67" fill="#151b1c" stroke="#d1a247" strokeWidth="2" />
                <circle cx="310" cy="181" r="47" stroke="#f3efe7" strokeWidth="1" opacity="0.35" />
                {[[118, 74], [464, 68], [506, 190], [425, 301], [150, 289]].map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="20" fill="#171c1d" stroke="#d1a247" strokeWidth="2" />)}
                <text x="310" y="176" fill="#f3efe7" textAnchor="middle" fontSize="14" fontFamily="Arial" fontWeight="700">OPTICA</text>
                <text x="310" y="196" fill="#d1a247" textAnchor="middle" fontSize="12" fontFamily="Arial" fontWeight="700">EGYPT</text>
                <text x="118" y="42" fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">STUDENTS</text>
                <text x="464" y="37" fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">RESEARCHERS</text>
                <text x="550" y="195" fill="#b8b1a4" fontSize="12" fontFamily="Arial">ACADEMIA</text>
                <text x="429" y="337" fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">INDUSTRY</text>
                <text x="118" y="327" fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">STARTUPS</text>
              </svg>
              <p className="relative mt-3 border-t border-white/10 pt-3 font-mono text-[0.65rem] tracking-[0.08em] text-[var(--gold)]">CONCEPTUAL NETWORK / KNOWLEDGE FLOWS BOTH WAYS</p>
            </div>
          </div>
          <Link href="/community" className="text-link mt-10">Explore the community <ArrowDownRight size={14} /></Link>
        </div>
      </section>

      <section className="section-space bg-[#111416]">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/15 pb-8">
            <div>
              <p className="eyebrow">Calendar / 2026</p>
              <h2 className="section-title mt-3">The next places to connect.</h2>
            </div>
            <Link href="/events" className="text-link">View all events <ArrowUpRight size={14} /></Link>
          </div>
          <div>{events.map((event) => <EventCard event={event} key={event.id} />)}</div>
        </div>
      </section>

      <ResearchExplorer />
      <NewsSection news={news} />

      <section className="section-space bg-[#080a0b]">
        <div className="container-page grid gap-10 lg:grid-cols-[.5fr_1.5fr] lg:items-center">
          <svg className="h-auto w-full max-w-[15rem]" viewBox="0 0 260 112" fill="none" aria-hidden="true">
            <path d="M43 56H217" stroke="#d1a247" strokeWidth="1.5" />
            <circle cx="43" cy="56" r="12" fill="#101416" stroke="#d1a247" strokeWidth="2" />
            <circle cx="130" cy="56" r="18" fill="#101416" stroke="#f3efe7" strokeWidth="2" />
            <circle cx="217" cy="56" r="12" fill="#101416" stroke="#d1a247" strokeWidth="2" />
            <text x="43" y="92" fill="#b8b1a4" textAnchor="middle" fontSize="9" fontFamily="Arial">OPTICA</text>
            <text x="130" y="92" fill="#f3efe7" textAnchor="middle" fontSize="9" fontFamily="Arial" fontWeight="700">EGYPT</text>
            <text x="217" y="92" fill="#b8b1a4" textAnchor="middle" fontSize="9" fontFamily="Arial">COMMUNITY</text>
          </svg>
          <div>
            <p className="eyebrow">A wider field of view</p>
            <h2 className="section-title mt-3 max-w-2xl">Local work, connected to the global optics and photonics community.</h2>
            <p className="lede mt-5 max-w-2xl">The Local Section is a place to discover opportunities, exchange knowledge, and make connections that extend beyond Egypt.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="btn-secondary" href="https://www.optica.org" target="_blank" rel="noreferrer">Visit Optica <ArrowUpRight size={14} /></a>
              <Link className="btn-primary" href="/join">Join the community <ArrowUpRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
