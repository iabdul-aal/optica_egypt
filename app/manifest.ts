import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#090c0d",
    theme_color: "#d7ae5b",
    lang: "en-US",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
