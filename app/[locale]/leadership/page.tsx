import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { getActiveMembers } from "@/lib/members"
import { MemberCard } from "@/components/sections/MemberCard"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "leadership" })
  return { title: t("heading") }
}

export default function LeadershipPage() {
  const t = useTranslations("leadership")
  const members = getActiveMembers()

  return (
    <div className="section container-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">{t("heading")}</h1>
      <p className="text-muted mb-8">{t("subheading")}</p>
      <hr className="divider-gold mb-10" />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map(m => <MemberCard key={m.id} member={m} />)}
      </div>
    </div>
  )
}