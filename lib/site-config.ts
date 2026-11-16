import config from "@/data/site_config.json"

const CANONICAL_OFFICIAL_URL = config.seo.siteUrl.replace(/\/$/, "")

export const siteConfig = {
  ...config,
  officialUrl: CANONICAL_OFFICIAL_URL,
  officialDomain: CANONICAL_OFFICIAL_URL.replace(/^https?:\/\//, ""),
  seo: { ...config.seo, siteUrl: process.env.NEXT_PUBLIC_SITE_URL || config.seo.siteUrl },
}
