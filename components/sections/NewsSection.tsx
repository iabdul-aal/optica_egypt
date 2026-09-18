import type { NewsItem } from "@/types/news"

export function NewsSection({ news }: { news: NewsItem[] }) {
  return (
    <section className="section-space border-y border-white/10 bg-[#0c0e0f]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/15 pb-7">
          <div>
            <p className="eyebrow">Signal / 2026</p>
            <h2 className="section-title mt-3">News and opportunities</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[var(--ink-soft)]">Updates from the local section and the wider photonics field.</p>
        </div>
        <div>
          {news.map((item, index) => (
            <article className="grid grid-cols-[2.4rem_1fr] gap-x-3 gap-y-3 border-b border-white/10 py-7 md:grid-cols-[3.4rem_10.5rem_1fr] md:gap-x-6" key={item.id}>
              <span className="font-mono text-sm font-bold text-[var(--gold)]">0{index + 1}</span>
              <p className="pt-0.5 text-[0.64rem] font-bold leading-5 tracking-[0.11em] text-[var(--ink-soft)] md:pt-1">{item.category.toUpperCase()}<span className="mx-1.5 text-[var(--gold)]">/</span>{item.date}</p>
              <div className="col-span-2 md:col-span-1 md:col-start-3 md:row-start-1">
                <h3 className="text-lg font-semibold leading-snug text-[var(--ink)]">{item.title.en}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">{item.summary.en}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
