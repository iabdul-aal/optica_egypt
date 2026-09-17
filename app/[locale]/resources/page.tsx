import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getAllResources } from "@/lib/resources"
import { BookOpen, ExternalLink } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "resources" })
  return {
    title: t("heading"),
    description: t("subheading"),
  }
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "resources" })
  const resources = getAllResources()

  return (
    <div className="section container-page py-16">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-4">
          <BookOpen size={14} className="text-[var(--accent-secondary)]" />
          <span className="text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider">
            {locale === "en" ? "Curated Photonics Knowledge" : "مصادر ومراجع الضوئيات المعتمدة"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">{t("heading")}</h1>
        <p className="text-[var(--foreground-muted)] text-lg leading-relaxed">{t("subheading")}</p>
      </div>

      <hr className="divider-gold mb-12" />

      {/* Resource Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => {
          const title = r.title[locale as "en" | "ar"] || r.title.en
          const description = r.description[locale as "en" | "ar"] || r.description.en

          return (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-7 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-[var(--foreground-muted)] font-semibold">
                    {r.category}
                  </span>
                  {r.free && (
                    <span className="text-xs font-semibold text-[var(--accent)] px-2 py-0.5 rounded-full bg-[#00ADEF]/10 border border-[#00ADEF]/20">
                      {t("free_badge")}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg mb-2.5 leading-snug group-hover:text-[var(--accent-secondary)] transition-colors">
                  {title}
                </h3>
                <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-6">
                  {description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--accent)]">
                <span>{t("visit")}</span>
                <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}