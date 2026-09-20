import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const BASE_URL = "https://optica-egypt.vercel.app"
const ROUTES = ["", "/about", "/events", "/community", "/leadership", "/outreach", "/resources", "/join"]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }))
}
