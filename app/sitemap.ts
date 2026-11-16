import type { MetadataRoute } from "next"
import { getAllChapters } from "@/lib/chapters"
import { getAllDispatches } from "@/lib/dispatches"
import { getActiveMembers } from "@/lib/members"
import { getAllProjects } from "@/lib/projects"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

const BASE_URL = siteConfig.seo.siteUrl.replace(/\/$/, "")

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/chapters", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/projects", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/resources", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/updates", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/join", changeFrequency: "monthly" as const, priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const members = getActiveMembers()
  const chapters = getAllChapters()
  const projects = getAllProjects()
  const dispatches = getAllDispatches()

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: route.path === "" ? `${BASE_URL}/` : `${BASE_URL}${route.path}`,
      lastModified: new Date("2026-11-16"),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...members.map((m) => ({
      url: `${BASE_URL}/leadership/${m.id}`,
      lastModified: new Date("2026-11-16"),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...chapters.map((c) => ({
      url: `${BASE_URL}/chapters/${c.id}`,
      lastModified: new Date("2026-11-16"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: new Date("2026-11-16"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...dispatches.map((d) => ({
      url: `${BASE_URL}/updates/${d.slug}`,
      lastModified: new Date(d.dateISO),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]
}
