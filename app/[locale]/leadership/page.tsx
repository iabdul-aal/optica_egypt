import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getActiveMembers } from "@/lib/members"
import { MemberCard } from "@/components/sections/MemberCard"
import { Shield } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "leadership" })
  return {
    title: t("heading"),
    description: t("subheading"),
  }
}

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "leadership" })
  const members = getActiveMembers()

  return (
    <div className="section container-page py-16">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-4">
          <Shield size={14} className="text-[var(--accent-secondary)]" />
          <span className="text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider">
            {locale === "en" ? "Executive Board & Officers" : "الهيئة الإدارية والضباط"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">{t("heading")}</h1>
        <p className="text-[var(--foreground-muted)] text-lg leading-relaxed">{t("subheading")}</p>
      </div>

      <hr className="divider-gold mb-12" />

      {/* Officers Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
    </div>
  )
}