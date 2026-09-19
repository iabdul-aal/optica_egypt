import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { EventCard } from "@/components/sections/EventCard"
import { HeroSection } from "@/components/sections/HeroSection"
import { NewsSection } from "@/components/sections/NewsSection"
import { ResearchExplorer } from "@/components/sections/ResearchExplorer"
import { getUpcomingEvents } from "@/lib/events"
import { getDictionary, isLocale, localizedHref, type Locale } from "@/lib/locales"
import { getLatestNews } from "@/lib/news"

type PageProps = { params: Promise<{ locale: string }> }

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : "en"
}

export default async function HomePage({ params }: PageProps) {
  const { locale: requestedLocale } = await params
  const locale = resolveLocale(requestedLocale)
  const dictionary = getDictionary(locale)
  const events = getUpcomingEvents(3)
  const news = getLatestNews(3)
  const nodes = Object.values(dictionary.home.community.nodes)

  return (
    <>
      <HeroSection locale={locale} dictionary={dictionary} />

      <section className="section-space">
        <div className="container-page">
          <div className="section-split-heading">
            <div>
              <p className="eyebrow">{dictionary.home.community.eyebrow}</p>
              <h2 className="section-title">{dictionary.home.community.title}</h2>
            </div>
            <p className="lede">{dictionary.home.community.intro}</p>
          </div>
          <div className="mt-10 grid gap-px border-y border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-5">
            {nodes.map((node, index) => (
              <article key={node.title} className="bg-[var(--canvas)] px-5 py-7">
                <p className="font-mono text-xs font-bold text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-lg font-semibold text-[var(--ink)]">{node.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{node.detail}</p>
              </article>
            ))}
          </div>
          <Link href={localizedHref(locale, "/community")} className="text-link mt-8">
            {dictionary.home.community.action} <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section-space bg-[var(--surface)]">
        <div className="container-page">
          <div className="section-split-heading">
            <div>
              <p className="eyebrow">{dictionary.home.events.eyebrow}</p>
              <h2 className="section-title">{dictionary.home.events.title}</h2>
            </div>
            <Link href={localizedHref(locale, "/events")} className="text-link">
              {dictionary.home.events.action} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          {events.length === 0 ? (
            <div className="border-b border-[var(--line-subtle)] py-10">
              <h3 className="text-xl font-semibold text-[var(--ink)]">{dictionary.home.events.emptyTitle}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{dictionary.home.events.emptyBody}</p>
            </div>
          ) : (
            <div>{events.map((event) => <EventCard event={event} locale={locale} dictionary={dictionary} key={event.id} />)}</div>
          )}
        </div>
      </section>

      <ResearchExplorer locale={locale} dictionary={dictionary} />
      <NewsSection news={news} locale={locale} dictionary={dictionary} />

      <section className="section-space">
        <div className="container-page">
          <div className="section-split-heading">
            <div>
              <p className="eyebrow">{dictionary.involvement.eyebrow}</p>
              <h2 className="section-title">{dictionary.involvement.title}</h2>
            </div>
            <p className="lede">{dictionary.involvement.intro}</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <article className="site-card p-6"><p className="eyebrow">01</p><h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--ink)]">{dictionary.involvement.membershipTitle}</h3><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{dictionary.involvement.membershipBody}</p><a href="https://www.optica.org/membership/join/individual/" target="_blank" rel="noopener noreferrer" className="btn-primary mt-7">{dictionary.involvement.membershipAction} <ArrowUpRight size={14} aria-hidden="true" /></a></article>
            <article className="site-card p-6"><p className="eyebrow">02</p><h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--ink)]">{dictionary.involvement.volunteerTitle}</h3><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{dictionary.involvement.volunteerBody}</p><Link href={localizedHref(locale, "/join?interest=volunteer")} className="btn-secondary mt-7">{dictionary.involvement.volunteerAction}</Link></article>
            <article className="site-card p-6"><p className="eyebrow">03</p><h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--ink)]">{dictionary.involvement.partnerTitle}</h3><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{dictionary.involvement.partnerBody}</p><Link href={localizedHref(locale, "/join?interest=partner")} className="text-link mt-7">{dictionary.involvement.partnerAction} <ArrowUpRight size={14} aria-hidden="true" /></Link></article>
          </div>
        </div>
      </section>
    </>
  )
}
