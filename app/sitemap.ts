import type { MetadataRoute } from "next"

const BASE_URL = "https://optica-egypt.vercel.app"
const LOCALES = ["en", "ar"]
const ROUTES = ["", "/about", "/events", "/community", "/leadership", "/outreach", "/resources", "/join"]

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  )
}
