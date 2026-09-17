import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getActiveMembers } from "@/lib/members"
import { MemberCard } from "@/components/sections/MemberCard"
import { Shield, Users } from "lucide-react"

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
    title: `${t("heading")} | Optica Egypt Local Section`,
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

  // Executive Committee (Order 1-4) vs Operational and Technical Chairs (Order 5+)
  const execMembers = members.filter((m) => m.order <= 4)
  const operationalMembers = members.filter((m) => m.order > 4)

  return (
    <div className="section container-page py-16 md:py-24">
      {/* Header Eyebrow */}
      <div className="max-w-4xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-4">
          <span className="w-1.5 h-1.5 bg-[#fa8716]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
            {locale === "en" ? "SECTION GOVERNANCE AND OFFICERS" : "الهيئة القيادية والتنظيمية"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
          {t("heading")}
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {locale === "en"
            ? "Elected officers and technical leaders directing Optica Egypt Local Section initiatives, university alliances, and international outreach."
            : "الهيئة الإدارية والضباط المتخصصون في قيادة مبادرات قسم أوبتيكا مصر والتحالفات الجامعية والأنشطة الدولية."}
        </p>
      </div>

      {/* Tier 1: Executive Committee */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Shield size={18} className="text-[#fa8716]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {locale === "en" ? "Executive Committee" : "المكتب التنفيذي"}
            </h2>
          </div>
          <span className="text-xs font-mono text-[#fa8716]">4 OFFICERS</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {execMembers.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </div>

      {/* Tier 2: Operational Chairs and Technical Officers */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Users size={18} className="text-[#5CB1A2]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {locale === "en" ? "Operational Officers and Technical Chairs" : "الضباط واللجان التخصصية"}
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5CB1A2]">
            {operationalMembers.length} {locale === "en" ? "OFFICERS" : "ضباط"}
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {operationalMembers.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </div>
    </div>
  )
}
