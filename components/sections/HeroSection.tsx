import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Link from "next/link"

export function HeroSection() {
  const t = useTranslations("home.hero")
  const locale = useLocale()
  return (
    <section style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", minHeight: "80vh" }}
      className="flex items-center relative overflow-hidden">
      <div className="container-page py-24 relative z-10">
        <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-4">{t("eyebrow")}</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight whitespace-pre-line">
          {t("title")}
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">{t("subtitle")}</p>
        <div className="flex flex-wrap gap-4">
          <Link href={`/${locale}/join`} className="btn-primary">{t("cta_primary")}</Link>
          <Link href={`/${locale}/events`} className="btn-secondary">{t("cta_secondary")}</Link>
        </div>
      </div>
    </section>
  )
}