import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { Target, Eye, Globe, Calendar, ShieldCheck, Sparkles } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about" })
  return {
    title: t("heading"),
    description: t("mission"),
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "about" })

  return (
    <div className="section container-page py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-4">
          <Sparkles size={14} className="text-[var(--accent-secondary)]" />
          <span className="text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider">
            {siteConfig.name[locale as "en" | "ar"] || siteConfig.name.en}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          {t("heading")}
        </h1>
        <p className="text-lg md:text-xl text-[var(--foreground-muted)] mb-10 leading-relaxed font-light">
          {locale === "en"
            ? "Connecting researchers, students, and optics pioneers across Egypt with the global photonics frontier."
            : "ربط الباحثين والطلاب ورواد البصريات في جميع أنحاء مصر بالمجتمع العالمي لعلوم الضوئيات."}
        </p>

        <hr className="divider-gold mb-16" />

        {/* Mission & Vision Cards */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div className="card p-8 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#00ADEF]/10 border border-[#00ADEF]/25 flex items-center justify-center text-[#00ADEF] mb-6">
              <Target size={24} />
            </div>
            <h2 className="text-xl font-bold text-[var(--accent-secondary)] mb-4 flex items-center gap-2">
              {t("mission_label")}
            </h2>
            <p className="text-[var(--foreground-muted)] text-base leading-relaxed">
              {t("mission")}
            </p>
          </div>

          <div className="card p-8 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-6">
              <Eye size={24} />
            </div>
            <h2 className="text-xl font-bold text-[var(--accent-secondary)] mb-4 flex items-center gap-2">
              {t("vision_label")}
            </h2>
            <p className="text-[var(--foreground-muted)] text-base leading-relaxed">
              {t("vision")}
            </p>
          </div>
        </div>

        {/* Section Profile & Affiliation Grid */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[var(--surface-raised)] text-[var(--accent-secondary)]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] font-semibold mb-1">
                {t("founded_label")}
              </p>
              <p className="text-lg font-bold">{siteConfig.founded}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[var(--surface-raised)] text-[var(--accent)]">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] font-semibold mb-1">
                {t("affiliation_label")}
              </p>
              <p className="text-base font-semibold text-[var(--foreground)]">{t("affiliation")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 sm:col-span-2 lg:col-span-1">
            <div className="p-2.5 rounded-lg bg-[var(--surface-raised)] text-[var(--accent-secondary)]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--foreground-muted)] font-semibold mb-1">
                {locale === "en" ? "Status" : "الحالة"}
              </p>
              <p className="text-base font-semibold text-[var(--accent)]">
                {locale === "en" ? "Official Local Section" : "قسم محلي رسمي"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}