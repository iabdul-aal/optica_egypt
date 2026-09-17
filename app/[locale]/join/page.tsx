import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "@/components/sections/ContactForm"
import { ArrowRight, Mail, Sparkles } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "join" })
  return {
    title: t("heading"),
    description: t("subheading"),
  }
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "join" })

  return (
    <div className="section container-page py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-4">
            <Sparkles size={14} className="text-[var(--accent)]" />
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
              {locale === "en" ? "Membership & Engagement" : "العضوية والمشاركة"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">{t("heading")}</h1>
          <p className="text-[var(--foreground-muted)] text-lg leading-relaxed">{t("subheading")}</p>
        </div>

        <hr className="divider-gold mb-12" />

        {/* Primary Application CTA Box */}
        <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[#09131F] p-8 md:p-12 mb-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("heading")}</h2>
            <p className="text-[var(--foreground-muted)] text-base mb-8 max-w-2xl leading-relaxed">
              {t("body")}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.joinFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-3.5 px-8 text-base font-bold inline-flex items-center gap-2.5 shadow-lg shadow-[#00ADEF]/20"
              >
                <span>{t("cta")}</span>
                <ArrowRight size={18} className={locale === "ar" ? "rotate-180" : ""} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-secondary py-3.5 px-6 text-sm font-semibold inline-flex items-center gap-2"
              >
                <Mail size={16} />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Inquiry Form */}
        <ContactForm />
      </div>
    </div>
  )
}