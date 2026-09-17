import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "community" })
  return { title: t("heading") }
}

export default function CommunityPage() {
  const t = useTranslations("community")
  const j = useTranslations("join")
  return (
    <div className="section container-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">{t("heading")}</h1>
      <p className="text-muted mb-8">{t("subheading")}</p>
      <hr className="divider-gold mb-10" />
      <div className="container-narrow">
        <p className="text-muted leading-relaxed mb-8">{j("body")}</p>
        <a href={siteConfig.joinFormUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {t("join_cta")}
        </a>
      </div>
    </div>
  )
}