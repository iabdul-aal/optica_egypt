import { useTranslations } from "next-intl"
import type { NewsItem } from "@/types/news"
import { Badge } from "@/components/ui/Badge"

export function NewsSection({ news }: { news: NewsItem[] }) {
  const t = useTranslations("home.news")
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container-page">
        <h2 className="text-3xl font-bold mb-8">{t("heading")}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {news.map(item => (
            <div key={item.id} className="card p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="gold">{item.category}</Badge>
                <span className="text-xs text-muted">{item.date}</span>
              </div>
              <h3 className="font-semibold mb-2 leading-snug">{item.title.en}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.summary.en}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}