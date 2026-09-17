import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "join" })
  return { title: t("heading") }
}

export default function JoinPage() {
  const t = useTranslations("join")
  return (
    <div className="section container-page">
      <div className="container-narrow">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{t("heading")}</h1>
        <p className="text-teal text-lg mb-8">{t("subheading")}</p>
        <hr className="divider-gold mb-8" />
        <p className="text-muted leading-relaxed mb-8">{t("body")}</p>
        <a href={siteConfig.joinFormUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mb-14">
          {t("cta")}
        </a>
        <div className="mt-14 pt-10 border-t" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xl font-semibold mb-2">{t("contact_heading")}</h2>
          <p className="text-muted mb-4">{t("contact_body")}</p>
          <a href={`mailto:${siteConfig.email}`} className="btn-secondary">{siteConfig.email}</a>
        </div>
      </div>
    </div>
  )
}