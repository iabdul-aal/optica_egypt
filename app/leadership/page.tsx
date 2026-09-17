import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getActiveMembers } from "@/lib/members"
import { MemberCard } from "@/components/sections/MemberCard"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("leadership")
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("subheading"),
  }
}

export default async function LeadershipPage() {
  const t = await getTranslations("leadership")
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
                SECTION GOVERNANCE AND OFFICERS // ROSTER
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              Elected officers and technical leaders directing Optica Egypt Local Section initiatives, university alliances, and international outreach.
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
                PRIMARY EXECUTIVE
              </span>
              <h2 className="editorial-headline text-white">
                Executive Committee
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
                FUNCTIONAL DIRECTORS
              </span>
              <h2 className="editorial-headline text-white">
                Operational Officers and Technical Chairs
              </h2>
            </div>
            <span className="editorial-label text-slate-400">
              {operationalMembers.length} OFFICERS
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
