import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getUpcomingEvents } from "@/lib/events"
import { getLatestNews } from "@/lib/news"
import { HeroSection } from "@/components/sections/HeroSection"
import { AudienceSection } from "@/components/sections/AudienceSection"
import { EventsPreview } from "@/components/sections/EventsPreview"
import { NewsSection } from "@/components/sections/NewsSection"
import { WaveSection } from "@/components/sections/WaveSection"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home.hero" })
  return {
    title: `${t("eyebrow")} | Connecting Talent, Advancing Photonics`,
    description: t("subtitle"),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const upcomingEvents = getUpcomingEvents(3)
  const latestNews = getLatestNews(3)

  return (
    <>
      <HeroSection />
      <AudienceSection />
      {/* 3D Scene B: Wave Interference Strip */}
      <WaveSection />
      <EventsPreview events={upcomingEvents} />
      <NewsSection news={latestNews} />
    </>
  )
}