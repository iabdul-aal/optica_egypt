import { siteConfig } from "@/lib/site-config"

export function getSiteUrlSafe(): string {
  return siteConfig.seo.siteUrl.replace(/\/$/, "")
}
