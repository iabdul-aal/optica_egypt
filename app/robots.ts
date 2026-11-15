import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

const BASE_URL = siteConfig.seo.siteUrl.replace(/\/$/, "")

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/auth"],
      },
      {
        userAgent: [
          "Googlebot",
          "Google-Extended",
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot-Extended",
          "Amazonbot",
          "Bytespider",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/admin", "/api", "/auth"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
