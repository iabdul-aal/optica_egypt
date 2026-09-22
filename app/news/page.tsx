import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Calendar } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { InsightsNav } from "@/components/sections/InsightsNav"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getDictionary, getLocalizedText } from "@/lib/locales"
import { getAllNews } from "@/lib/news"

export const metadata: Metadata = {
  title: "News",
  description: "Announcements, achievements, and updates from the Optica Egypt Local Section.",
  alternates: {
    canonical: "/news/",
  },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function NewsPage() {
  const dictionary = getDictionary("en")
  const newsItems = getAllNews().filter((item) => item.published)

  return (
    <>
      <InsightsNav />
      <PageHeader
        eyebrow={dictionary.news.eyebrow}
        title={dictionary.news.title}
        intro={dictionary.news.intro}
      />
      <section className="section-space">
        <div className="container-page">
          {newsItems.length === 0 ? (
            <p className="lede">{dictionary.news.noNews}</p>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {newsItems.map((item, index) => {
                const isInternal = item.url?.startsWith("/")
                const LinkComponent = isInternal ? Link : "a"
                const linkProps = isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" }

                return (
                  <ScrollReveal key={item.id} animation="fade-up" delay={index * 40}>
                    <article className="group relative rounded-xl border border-[var(--line)] bg-[var(--surface-raised)]/25 hover:bg-[var(--surface-raised)]/60 hover:border-[var(--gold)]/40 p-6 sm:p-8 transition-all duration-300 shadow-xs">
                      {/* Top Metadata Row: Category pill + Published date + Bulletin Type */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--gold)]/12 text-[var(--gold)] border border-[var(--gold)]/20 capitalize">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" aria-hidden="true" />
                            {dictionary.news.categories[item.category]}
                          </span>
                          <time dateTime={item.date} className="text-xs text-[var(--ink-soft)] font-medium flex items-center gap-1.5">
                            <Calendar size={13} className="text-[var(--ink-faint)] shrink-0" aria-hidden="true" />
                            {formatDate(item.date)}
                          </time>
                        </div>
                        <span className="text-[11px] font-mono text-[var(--ink-faint)] tracking-wider uppercase">
                          Official Bulletin
                        </span>
                      </div>

                      {/* Headline and Narrative */}
                      <div className="mt-5 space-y-3">
                        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors leading-snug">
                          {getLocalizedText(item.title, "en")}
                        </h2>
                        <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed font-light max-w-3xl">
                          {getLocalizedText(item.summary, "en")}
                        </p>
                      </div>

                      {/* Footer Action */}
                      {item.url && (
                        <div className="mt-6 pt-5 border-t border-[var(--line-subtle)] flex items-center justify-between">
                          <span className="text-xs text-[var(--ink-faint)]">
                            Optica Egypt Section Dispatch
                          </span>
                          <LinkComponent
                            href={item.url}
                            {...linkProps}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#09131F] transition-all font-sans"
                            aria-label={`${dictionary.news.readMore}: ${getLocalizedText(item.title, "en")}`}
                          >
                            <span>{dictionary.news.readMore}</span>
                            <ArrowUpRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </LinkComponent>
                        </div>
                      )}
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
