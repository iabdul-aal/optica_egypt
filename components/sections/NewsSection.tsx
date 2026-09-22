import Link from "next/link"
import { ArrowUpRight, Calendar } from "lucide-react"
import type { NewsItem } from "@/types/news"
import { getLocalizedText, localizedHref, type Dictionary, type Locale } from "@/lib/locales"

type NewsSectionProps = {
  news: NewsItem[]
  locale: Locale
  dictionary: Dictionary
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function NewsSection({ news, locale, dictionary }: NewsSectionProps) {
  return (
    <section className="section-space border-y border-[var(--line-subtle)] bg-[var(--surface-raised)]">
      <div className="container-page">
        <div className="section-split-heading">
          <div>
            <p className="eyebrow">{dictionary.home.news.eyebrow}</p>
            <h2 className="section-title">{dictionary.home.news.title}</h2>
          </div>
          <Link href={localizedHref(locale, "/news")} className="text-link justify-self-start sm:justify-self-end">
            <span>View all news</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
        {news.length === 0 ? (
          <div className="py-10">
            <h3 className="text-xl font-semibold text-[var(--ink)]">{dictionary.home.news.emptyTitle}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{dictionary.home.news.emptyBody}</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-raised)]/70 hover:border-[var(--gold)]/40 p-6 transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold px-2.5 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] text-[11px] capitalize">
                      {item.category}
                    </span>
                    <time dateTime={item.date} className="text-[var(--ink-soft)] font-medium text-xs flex items-center gap-1">
                      <Calendar size={11} className="text-[var(--ink-faint)]" aria-hidden="true" />
                      {formatDate(item.date)}
                    </time>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors leading-snug">
                    {getLocalizedText(item.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] line-clamp-3 leading-relaxed font-light">
                    {getLocalizedText(item.summary, locale)}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--gold)]">
                  <span>Read update</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
