import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

const SITE_URL = siteConfig.seo.siteUrl.replace(/\/$/, "")
const DEFAULT_OG_IMAGE = `${SITE_URL}/branding/FullOnBlack.png`

interface BuildPageMetadataInput {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  publishedTime?: string
  image?: {
    url: string
    width?: number
    height?: number
    alt?: string
  }
}

/** Build consistent canonical, OpenGraph, and Twitter metadata for public pages. */
export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  image,
}: BuildPageMetadataInput): Metadata {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`
  const fullUrl = normalizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`
  const resolvedImageUrl = image
    ? image.url.startsWith("http")
      ? image.url
      : `${SITE_URL}${image.url}`
    : DEFAULT_OG_IMAGE

  const ogImage = {
    url: resolvedImageUrl,
    width: image?.width ?? 1080,
    height: image?.height ?? 1080,
    alt: image?.alt || title,
  }

  return {
    title,
    description,
    alternates: { canonical: normalizedPath },
    openGraph: {
      type,
      locale: "en_US",
      siteName: siteConfig.name,
      url: fullUrl,
      title,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      images: [ogImage],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [resolvedImageUrl],
    },
  }
}
