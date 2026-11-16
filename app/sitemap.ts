import type { MetadataRoute } from "next"
import { getAllChapters } from "@/lib/chapters"
import { getAllDispatches } from "@/lib/dispatches"
import { getActiveMembers } from "@/lib/members"
import { getAllProjects } from "@/lib/projects"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

const BASE_URL = siteConfig.seo.siteUrl.replace(/\/$/, "")
const TRAILING_SLASH = process.env.GITHUB_PAGES === "true"

function toUrl(path: string): string {
  if (path === "") return `${BASE_URL}/`
  return `${BASE_URL}${path}${TRAILING_SLASH ? "/" : ""}`
}

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/governance", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/leadership", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/partners", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/chapters", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/fellowships", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/outreach", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/volunteer", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/projects", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/events", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/open-source", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/resources", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/updates", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/news", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/blogs", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/press", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/gallery", changeFrequency: "monthly" as const, priority: 0.75 },
  { path: "/join", changeFrequency: "monthly" as const, priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const members = getActiveMembers()
  const chapters = getAllChapters()
  const projects = getAllProjects()
  const dispatches = getAllDispatches()

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: toUrl(route.path),
      lastModified: new Date("2026-11-16"),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...members.map((m) => ({
      url: toUrl(`/leadership/${m.id}`),
      lastModified: new Date("2026-11-16"),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...chapters.map((c) => ({
      url: toUrl(`/chapters/${c.id}`),
      lastModified: new Date("2026-11-16"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: toUrl(`/projects/${p.slug}`),
      lastModified: new Date("2026-11-16"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...dispatches.map((d) => ({
      url: toUrl(`/updates/${d.slug}`),
      lastModified: new Date(d.dateISO),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]
}
