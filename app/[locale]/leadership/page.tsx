import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getActiveMembers } from "@/lib/members"
import { MemberCard } from "@/components/sections/MemberCard"

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

  const execMembers = members.filter((m) => m.order <= 4)
  const operationalMembers = members.filter((m) => m.order > 4)

  return (
    <div className="bg-[#000000] text-white">
      {/* Editorial Header */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                {locale === "en" ? "SECTION GOVERNANCE AND OFFICERS // ROSTER" : "الهيئة القيادية والتنظيمية // السجل الرسمي"}
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              {locale === "en"
                ? "Elected officers and technical leaders directing Optica Egypt Local Section initiatives, university alliances, and international outreach."
                : "الهيئة الإدارية والضباط المتخصصون في قيادة مبادرات قسم أوبتيكا مصر والتحالفات الجامعية والأنشطة الدولية."}
            </p>
          </div>
        </div>
      </section>

      {/* Tier 1: Executive Committee */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#fa8716] block mb-2">
                {locale === "en" ? "PRIMARY EXECUTIVE" : "الهيئة التنفيذية الأولى"}
              </span>
              <h2 className="editorial-headline text-white">
                {locale === "en" ? "Executive Committee" : "المكتب التنفيذي"}
              </h2>
            </div>
            <span className="editorial-label text-slate-400">4 OFFICERS</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {execMembers.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Tier 2: Operational Chairs and Technical Officers */}
      <section className="py-20 md:py-24">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#5CB1A2] block mb-2">
                {locale === "en" ? "FUNCTIONAL DIRECTORS" : "المكاتب التخصصية"}
              </span>
              <h2 className="editorial-headline text-white">
                {locale === "en" ? "Operational Officers and Technical Chairs" : "الضباط واللجان التخصصية"}
              </h2>
            </div>
            <span className="editorial-label text-slate-400">
              {operationalMembers.length} {locale === "en" ? "OFFICERS" : "ضباط"}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {operationalMembers.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

