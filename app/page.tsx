import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getUpcomingEvents } from "@/lib/events"
import { getLatestNews } from "@/lib/news"
import { HeroSection } from "@/components/sections/HeroSection"
import { ImpactMetrics } from "@/components/sections/ImpactMetrics"
import { DomainsShowcase } from "@/components/sections/DomainsShowcase"
import { AudienceSection } from "@/components/sections/AudienceSection"
import { EventsPreview } from "@/components/sections/EventsPreview"
import { OpticaHeritage } from "@/components/sections/OpticaHeritage"
import { NewsSection } from "@/components/sections/NewsSection"
import { WaveSection } from "@/components/sections/WaveSection"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.hero")
  return {
    title: `${t("eyebrow")} | Connecting Talent, Advancing Photonics`,
    description: t("subtitle"),
  }
}

export default async function HomePage() {
  const upcomingEvents = getUpcomingEvents(3)
  const latestNews = getLatestNews(3)

  return (
    <>
      <HeroSection />
      <ImpactMetrics />
      <DomainsShowcase />
      <WaveSection />
      <AudienceSection />
      <EventsPreview events={upcomingEvents} />
      <OpticaHeritage />
      <NewsSection news={latestNews} />
    </>
  )
}
