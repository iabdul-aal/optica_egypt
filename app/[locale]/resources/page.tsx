import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { getAllResources } from "@/lib/resources"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "resources" })
  return { title: t("heading") }
}

export default function ResourcesPage() {
  const t = useTranslations("resources")
  const resources = getAllResources()

  return (
    <div className="section container-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">{t("heading")}</h1>
      <p className="text-muted mb-8">{t("subheading")}</p>
      <hr className="divider-gold mb-10" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resources.map(r => (
          <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="card p-6 block">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-muted">{r.category}</span>
              {r.free && <span className="text-xs text-teal font-semibold">{t("free_badge")}</span>}
            </div>
            <h3 className="font-semibold mb-2 leading-snug">{r.title.en}</h3>
            <p className="text-muted text-sm leading-relaxed">{r.description.en}</p>
            <p className="text-teal text-sm mt-4 font-medium">{t("visit")} →</p>
          </a>
        ))}
      </div>
    </div>
  )
}