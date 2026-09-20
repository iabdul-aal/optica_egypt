import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { EventCard } from "@/components/sections/EventCard"
import { HeroSection } from "@/components/sections/HeroSection"
import { ImpactMetrics } from "@/components/sections/ImpactMetrics"
import { NewsSection } from "@/components/sections/NewsSection"
import { OpticaHeritage } from "@/components/sections/OpticaHeritage"
import { ResearchExplorer } from "@/components/sections/ResearchExplorer"
import { WaveSection } from "@/components/sections/WaveSection"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getUpcomingEvents } from "@/lib/events"
import { getDictionary, localizedHref } from "@/lib/locales"
import { getLatestNews } from "@/lib/news"

export default function HomePage() {
  const dictionary = getDictionary("en")
  const events = getUpcomingEvents(3)
  const news = getLatestNews(3)
  const nodes = Object.values(dictionary.home.community.nodes)

  return (
    <>
      <HeroSection locale="en" dictionary={dictionary} />

      {/* ── Learn / Exchange / Build strip ───────────────────────── */}
      <ScrollReveal animation="fade-up" delay={40}>
        <ImpactMetrics />
      </ScrollReveal>

      {/* ── Community: pentagon network diagram ────────────────── */}
      <ScrollReveal animation="fade-up" delay={60}>
        <section className="section-space relative overflow-hidden bg-[#0a0c0d]">
          <div className="scientific-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="container-page relative">
            <div className="grid gap-10 border-b border-white/15 pb-9 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <p className="eyebrow">{dictionary.home.community.eyebrow}</p>
                <h2 className="section-title mt-3 max-w-xl">{dictionary.home.community.title}</h2>
              </div>
              <p className="lede max-w-lg lg:justify-self-end">{dictionary.home.community.intro}</p>
            </div>

            <div className="mt-10 grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              {/* Node cards */}
              <div className="order-2 grid gap-x-7 gap-y-6 sm:grid-cols-2 lg:order-1">
                {nodes.map((node, index) => (
                  <article className="border-t border-white/15 pt-4" key={node.title}>
                    <p className="font-mono text-[0.68rem] font-bold text-[var(--gold)]">0{index + 1}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{node.title}</h3>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{node.detail}</p>
                  </article>
                ))}
              </div>
              {/* SVG polygon diagram */}
              <div className="order-1 relative py-2 sm:py-4 lg:order-2">
                <svg
                  viewBox="0 0 620 360"
                  className="relative h-auto w-full"
                  fill="none"
                  aria-label={dictionary.home.community.diagramLabel}
                >
                  <path d="M310 181L118 74M310 181L464 68M310 181L506 190M310 181L425 301M310 181L150 289" stroke="#d1a247" strokeWidth="2" strokeDasharray="5 8" opacity="0.8" />
                  <path d="M118 74L464 68M464 68L506 190M506 190L425 301M425 301L150 289M150 289L118 74" stroke="#5b615d" strokeWidth="1.5" opacity="0.8" />
                  <circle cx="310" cy="181" r="67" fill="#151b1c" stroke="#d1a247" strokeWidth="2" />
                  <circle cx="310" cy="181" r="47" stroke="#f3efe7" strokeWidth="1" opacity="0.35" />
                  {([[118, 74], [464, 68], [506, 190], [425, 301], [150, 289]] as [number, number][]).map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="20" fill="#171c1d" stroke="#d1a247" strokeWidth="2" />
                  ))}
                  <text x="310" y="176" fill="#f3efe7" textAnchor="middle" fontSize="14" fontFamily="Arial" fontWeight="700">OPTICA</text>
                  <text x="310" y="196" fill="#d1a247" textAnchor="middle" fontSize="12" fontFamily="Arial" fontWeight="700">EGYPT</text>
                  <text x="118" y="42"  fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">STUDENTS</text>
                  <text x="464" y="37"  fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">RESEARCHERS</text>
                  <text x="550" y="195" fill="#b8b1a4" fontSize="12" fontFamily="Arial">ACADEMIA</text>
                  <text x="429" y="337" fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">INDUSTRY</text>
                  <text x="118" y="327" fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">STARTUPS</text>
                </svg>
              </div>
            </div>

            <Link href={localizedHref("en", "/community")} className="text-link mt-10">
              {dictionary.home.community.action} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Contractual 3D Scene B: Wave Interference ─────────────── */}
      <ScrollReveal animation="fade-up" delay={50}>
        <WaveSection />
      </ScrollReveal>

      {/* ── Events ──────────────────────────────────────────────── */}
      <ScrollReveal animation="fade-up" delay={50}>
        <section className="section-space bg-[var(--surface)]">
          <div className="container-page">
            <div className="section-split-heading">
              <div>
                <p className="eyebrow">{dictionary.home.events.eyebrow}</p>
                <h2 className="section-title">{dictionary.home.events.title}</h2>
              </div>
              <Link href={localizedHref("en", "/events")} className="text-link">
                {dictionary.home.events.action} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
            {events.length === 0 ? (
              <div className="border-b border-[var(--line-subtle)] py-10">
                <h3 className="text-xl font-semibold text-[var(--ink)]">{dictionary.home.events.emptyTitle}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{dictionary.home.events.emptyBody}</p>
              </div>
            ) : (
              <div>{events.map((event) => <EventCard event={event} locale="en" dictionary={dictionary} key={event.id} />)}</div>
            )}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={50}>
        <ResearchExplorer locale="en" dictionary={dictionary} />
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={50}>
        <NewsSection news={news} locale="en" dictionary={dictionary} />
      </ScrollReveal>

      {/* ── Global affiliation ───────────────────────────────────── */}
      <ScrollReveal animation="fade-up" delay={50}>
        <OpticaHeritage locale="en" />
      </ScrollReveal>
    </>
  )
}
