import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { getUpcomingEvents } from "@/lib/events"
import { getLatestNews } from "@/lib/news"
import { HeroSection } from "@/components/sections/HeroSection"
import { AudienceSection } from "@/components/sections/AudienceSection"
import { EventsPreview } from "@/components/sections/EventsPreview"
import { NewsSection } from "@/components/sections/NewsSection"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home.hero" })
  return { title: t("eyebrow") }
}

export default function HomePage() {
  const upcomingEvents = getUpcomingEvents(3)
  const latestNews = getLatestNews(3)

  return (
    <>
      <HeroSection />
      <AudienceSection />
      <EventsPreview events={upcomingEvents} />
      <NewsSection news={latestNews} />
    </>
  )
}