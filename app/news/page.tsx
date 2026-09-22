import type { Metadata } from "next"
import { ArrowUpRight, Calendar } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
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
            <div className="border-y border-[var(--line)]">
              {newsItems.map((item, index) => (
                <ScrollReveal key={item.id} animation="fade-up" delay={index * 40}>
                  <div className="group grid gap-4 border-b border-[var(--line-subtle)] py-8 sm:grid-cols-[7rem_1fr_auto] sm:items-start sm:gap-6">
                    {/* Left column: date + category */}
                    <div className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--gold)] uppercase">
                        <Calendar size={11} aria-hidden="true" />
                        {formatDate(item.date)}
                      </span>
                      <span className="text-[0.62rem] font-bold tracking-[0.1em] text-[var(--ink-faint)] uppercase">
                        {dictionary.news.categories[item.category]}
                      </span>
                    </div>

                    {/* Main content */}
                    <div>
                      <h2 className="text-lg font-semibold leading-snug text-[var(--ink)]">
                        {getLocalizedText(item.title, "en")}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
                        {getLocalizedText(item.summary, "en")}
                      </p>
                    </div>

                    {/* External link arrow if URL provided */}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[var(--gold)] transition-colors hover:text-[var(--gold-pale)]"
                        aria-label={`${dictionary.news.readMore}: ${getLocalizedText(item.title, "en")}`}
                      >
                        {dictionary.news.readMore}
                        <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
