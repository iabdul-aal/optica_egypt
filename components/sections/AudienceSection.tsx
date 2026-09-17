import { useTranslations } from "next-intl"

const SEGMENTS = ["students","researchers","industry","startups"] as const

export function AudienceSection() {
  const t = useTranslations("home.audience")
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container-page">
        <h2 className="text-3xl font-bold mb-10 text-center">{t("heading")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((key) => (
            <div key={key} className="card p-6">
              <h3 className="text-gold font-semibold mb-3">{t(`${key}.title`)}</h3>
              <p className="text-muted text-sm leading-relaxed">{t(`${key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}