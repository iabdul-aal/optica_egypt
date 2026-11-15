import config from "@/data/site_config.json"

export const siteConfig = {
  ...config,
  seo: { ...config.seo, siteUrl: process.env.NEXT_PUBLIC_SITE_URL || config.seo.siteUrl },
}

export type SiteConfig = typeof siteConfig
