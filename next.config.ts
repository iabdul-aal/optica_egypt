import type { NextConfig } from "next"

const config: NextConfig = {
  compress: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "https://optica-egypt.com",
  },
  async redirects() {
    return [
      { source: "/governance", destination: "/about#governance", permanent: true },
      { source: "/awards", destination: "/about#governance", permanent: true },
      { source: "/recognitions", destination: "/about#governance", permanent: true },
      { source: "/leadership", destination: "/about#leadership", permanent: true },
      { source: "/press", destination: "/about#press", permanent: true },
      { source: "/partners", destination: "/join?type=partner", permanent: true },
      { source: "/community", destination: "/projects", permanent: true },
      { source: "/fellowships", destination: "/projects?track=fellowships", permanent: true },
      { source: "/outreach", destination: "/projects?track=outreach", permanent: true },
      { source: "/programs", destination: "/projects?track=training", permanent: true },
      { source: "/open-source", destination: "/projects?track=open-pda", permanent: true },
      { source: "/conferences", destination: "/projects?track=training", permanent: true },
      { source: "/education", destination: "/projects?track=training", permanent: true },
      { source: "/competitions", destination: "/projects?track=open-pda", permanent: true },
      { source: "/events", destination: "/updates?kind=event", permanent: true },
      { source: "/events/:path*", destination: "/updates", permanent: true },
      { source: "/news", destination: "/updates?kind=announcement", permanent: true },
      { source: "/blogs", destination: "/updates?kind=article", permanent: true },
      { source: "/gallery", destination: "/updates?kind=media", permanent: true },
      { source: "/volunteer", destination: "/join?type=committee", permanent: true },
      { source: "/recruitment", destination: "/join?type=committee", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/people/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/branding/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/docs/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}

export default config
