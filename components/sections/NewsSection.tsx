import type { NewsItem } from "@/types/news"
import { getLocalizedText, type Dictionary, type Locale } from "@/lib/locales"

type NewsSectionProps = {
  news: NewsItem[]
  locale: Locale
  dictionary: Dictionary
}

export function NewsSection({ news, locale, dictionary }: NewsSectionProps) {
  return (
    <section className="section-space border-y border-white/10 bg-[#0c0e0f]">
      <div className="container-page">
        <div className="section-split-heading">
          <div>
            <p className="eyebrow">{dictionary.home.news.eyebrow}</p>
            <h2 className="section-title">{dictionary.home.news.title}</h2>
          </div>
          <p className="lede">{dictionary.home.news.intro}</p>
        </div>
        {news.length === 0 ? (
          <div className="border-b border-white/10 py-10">
            <h3 className="text-xl font-semibold text-[var(--ink)]">{dictionary.home.news.emptyTitle}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{dictionary.home.news.emptyBody}</p>
          </div>
        ) : (
          <div>
            {news.map((item, index) => (
              <article className="grid grid-cols-[2.4rem_1fr] gap-x-3 gap-y-3 border-b border-white/10 py-7 md:grid-cols-[3.4rem_10.5rem_1fr] md:gap-x-6" key={item.id}>
                <span className="font-mono text-sm font-bold text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1 pt-0.5 md:pt-1">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--gold)]">
                    {item.category}
                  </span>
                  <time dateTime={item.date} className="font-mono text-xs text-[var(--ink-soft)] whitespace-nowrap">
                    {item.date}
                  </time>
                </div>
                <div className="col-span-2 md:col-span-1 md:col-start-3 md:row-start-1">
                  <h3 className="text-lg font-semibold leading-snug text-[var(--ink)]">{getLocalizedText(item.title, locale)}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">{getLocalizedText(item.summary, locale)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
