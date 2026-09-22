import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { EventCard } from "@/components/sections/EventCard"
import { HeroSection } from "@/components/sections/HeroSection"
import { ImpactMetrics } from "@/components/sections/ImpactMetrics"
import { NewsSection } from "@/components/sections/NewsSection"
import { OpticaHeritage } from "@/components/sections/OpticaHeritage"
import { ResearchExplorer } from "@/components/sections/ResearchExplorer"
import { CommunityBubbles } from "@/components/sections/CommunityBubbles"
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
        <section className="section-space relative overflow-hidden bg-[var(--surface)]">
          <div className="scientific-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="container-page relative">
            <div className="grid gap-10 border-b border-[var(--line)] pb-9 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
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
                  <article className="border-t border-[var(--line)] pt-4" key={node.title}>
                    <p className="font-mono text-[0.68rem] font-bold text-[var(--gold)]">0{index + 1}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{node.title}</h3>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{node.detail}</p>
                  </article>
                ))}
              </div>
              {/* Interactive Moving Bubbles Diagram */}
              <div className="order-1 relative py-2 sm:py-4 lg:order-2">
                <CommunityBubbles diagramLabel={dictionary.home.community.diagramLabel} />
              </div>
            </div>

            <Link href={localizedHref("en", "/community")} className="text-link mt-10">
              {dictionary.home.community.action} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>
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
              <Link
                href={localizedHref("en", "/events")}
                className="text-link justify-self-start sm:justify-self-end"
              >
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
