import type { MetadataRoute } from "next"
import { getAllEvents } from "@/lib/events"
import { getActiveMembers } from "@/lib/members"
import { getAllChapters } from "@/lib/chapters"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

const BASE_URL = siteConfig.seo.siteUrl.replace(/\/$/, "")

const STATIC_ROUTES = [
  // Homepage
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },

  // Section
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/leadership", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/awards", changeFrequency: "monthly" as const, priority: 0.85 },

  // Community
  { path: "/community", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/chapters", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/fellowships", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/outreach", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/volunteer", changeFrequency: "monthly" as const, priority: 0.85 },

  // Program
  { path: "/events", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/conferences", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/education", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/competitions", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/open-source", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/resources", changeFrequency: "monthly" as const, priority: 0.8 },

  // Insights
  { path: "/news", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/blogs", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/gallery", changeFrequency: "monthly" as const, priority: 0.75 },

  // Primary Action
  { path: "/join", changeFrequency: "monthly" as const, priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const events = getAllEvents().filter((e) => e.published)
  const members = getActiveMembers()
  const chapters = getAllChapters()

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}/`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const eventEntries = events.map((event) => ({
    url: `${BASE_URL}/events/${event.id}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const registrationEntries = events.map((event) => ({
    url: `${BASE_URL}/events/${event.id}/register/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }))

  const memberEntries = members.map((member) => ({
    url: `${BASE_URL}/leadership/${member.id}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const chapterEntries = chapters.map((ch) => ({
    url: `${BASE_URL}/chapters/${ch.id}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticEntries, ...eventEntries, ...registrationEntries, ...memberEntries, ...chapterEntries]
}
