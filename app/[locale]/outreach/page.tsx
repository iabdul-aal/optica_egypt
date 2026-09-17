import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { getAllOutreach } from "@/lib/outreach"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "outreach" })
  return { title: t("heading") }
}

export default function OutreachPage() {
  const t = useTranslations("outreach")
  const items = getAllOutreach()

  return (
    <div className="section container-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">{t("heading")}</h1>
      <p className="text-muted mb-8">{t("subheading")}</p>
      <hr className="divider-gold mb-10" />
      {items.length === 0 ? (
        <div className="empty-state"><p>{t("empty")}</p></div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map(item => (
            <div key={item.id} className="card p-6">
              <p className="text-xs text-muted mb-2">{item.date}</p>
              <h3 className="font-semibold mb-2">{item.title.en}</h3>
              <p className="text-muted text-sm">{item.description.en}</p>
              {item.reach > 0 && (
                <p className="text-teal text-sm mt-3 font-semibold">{item.reach} {t("reach_label")}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}