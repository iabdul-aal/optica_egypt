import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts")

const isGithubPages = process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPages ? "/optica_egypt" : "")

const config: NextConfig = {
  ...(isGithubPages ? { output: "export", basePath, trailingSlash: true } : {}),

  // Security headers (only applied in server mode)
  ...(!isGithubPages ? {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options",     value: "nosniff" },
            { key: "X-Frame-Options",            value: "DENY" },
            { key: "X-XSS-Protection",           value: "1; mode=block" },
            { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
            { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
          ],
        },
      ]
    },
  } : {}),

  // Suppress known R3F/drei peer dep warning
  transpilePackages: ["three"],

  // Image optimization
  images: {
    unoptimized: isGithubPages,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}

export default withNextIntl(config)
