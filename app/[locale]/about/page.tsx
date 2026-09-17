import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about" })
  return { title: t("heading") }
}

export default function AboutPage() {
  const t = useTranslations("about")
  const c = useTranslations("common")
  return (
    <div className="section container-page">
      <div className="container-narrow">
        <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-3">{c("coming_soon")}</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("heading")}</h1>
        <hr className="divider-gold mb-8" />
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">{t("mission_label")}</h2>
            <p className="text-muted leading-relaxed">{t("mission")}</p>
          </div>
          <div>
            <h2 className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">{t("vision_label")}</h2>
            <p className="text-muted leading-relaxed">{t("vision")}</p>
          </div>
        </div>
        <div className="mt-10 flex gap-10 flex-wrap">
          <div>
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">{t("founded_label")}</p>
            <p>{siteConfig.founded}</p>
          </div>
          <div>
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">{t("affiliation_label")}</p>
            <p>{t("affiliation")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}