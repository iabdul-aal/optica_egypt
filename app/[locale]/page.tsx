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

      {/* ── Community — pentagon network diagram ────────────────── */}
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
                {/* Dashed gold spokes from centre to nodes */}
                <path
                  d="M310 181L118 74M310 181L464 68M310 181L506 190M310 181L425 301M310 181L150 289"
                  stroke="#d1a247" strokeWidth="2" strokeDasharray="5 8" opacity="0.8"
                />
                {/* Outer pentagon ring */}
                <path
                  d="M118 74L464 68M464 68L506 190M506 190L425 301M425 301L150 289M150 289L118 74"
                  stroke="#5b615d" strokeWidth="1.5" opacity="0.8"
                />
                {/* Centre circles */}
                <circle cx="310" cy="181" r="67" fill="#151b1c" stroke="#d1a247" strokeWidth="2" />
                <circle cx="310" cy="181" r="47" stroke="#f3efe7" strokeWidth="1" opacity="0.35" />
                {/* Node circles */}
                {([[118, 74], [464, 68], [506, 190], [425, 301], [150, 289]] as [number, number][]).map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="20" fill="#171c1d" stroke="#d1a247" strokeWidth="2" />
                ))}
                {/* Centre text */}
                <text x="310" y="176" fill="#f3efe7" textAnchor="middle" fontSize="14" fontFamily="Arial" fontWeight="700">OPTICA</text>
                <text x="310" y="196" fill="#d1a247" textAnchor="middle" fontSize="12" fontFamily="Arial" fontWeight="700">EGYPT</text>
                {/* Node labels */}
                <text x="118" y="42"  fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">STUDENTS</text>
                <text x="464" y="37"  fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">RESEARCHERS</text>
                <text x="550" y="195" fill="#b8b1a4" fontSize="12" fontFamily="Arial">ACADEMIA</text>
                <text x="429" y="337" fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">INDUSTRY</text>
                <text x="118" y="327" fill="#b8b1a4" textAnchor="middle" fontSize="12" fontFamily="Arial">STARTUPS</text>
              </svg>
              <p className="relative mt-3 border-t border-white/10 pt-3 font-mono text-[0.65rem] tracking-[0.08em] text-[var(--gold)]">
                CONCEPTUAL NETWORK / KNOWLEDGE FLOWS BOTH WAYS
              </p>
            </div>
          </div>

          <Link href={localizedHref(locale, "/community")} className="text-link mt-10">
            {dictionary.home.community.action} <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Events ──────────────────────────────────────────────── */}
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

      {/* ── Get involved ────────────────────────────────────────── */}
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
            <article className="site-card p-6">
              <p className="eyebrow">01</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--ink)]">{dictionary.involvement.membershipTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{dictionary.involvement.membershipBody}</p>
              <a href="https://www.optica.org/membership/join/individual/" target="_blank" rel="noopener noreferrer" className="btn-primary mt-7">
                {dictionary.involvement.membershipAction} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </article>
            <article className="site-card p-6">
              <p className="eyebrow">02</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--ink)]">{dictionary.involvement.volunteerTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{dictionary.involvement.volunteerBody}</p>
              <Link href={localizedHref(locale, "/join?interest=volunteer")} className="btn-secondary mt-7">{dictionary.involvement.volunteerAction}</Link>
            </article>
            <article className="site-card p-6">
              <p className="eyebrow">03</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--ink)]">{dictionary.involvement.partnerTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{dictionary.involvement.partnerBody}</p>
              <Link href={localizedHref(locale, "/join?interest=partner")} className="text-link mt-7">
                {dictionary.involvement.partnerAction} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
