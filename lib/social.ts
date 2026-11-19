import { siteConfig } from "@/lib/site-config"

export type SocialPlatformId =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "telegram"
  | "youtube"
  | "twitter"
  | "tiktok"

export interface SocialChannel {
  id: SocialPlatformId
  label: string
  category: string
  audienceNote: string
  suggestedHandle: string
  url: string | null
  handleLabel: string
  isActive: boolean
}

interface SocialChannelSpec {
  id: SocialPlatformId
  label: string
  category: string
  audienceNote: string
  suggestedHandle: string
  buildUrl: (rawValue: string) => string
  formatHandle: (rawValue: string) => string
}

function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "").replace(/^\/+|\/+$/g, "")
}

function isAbsoluteHttpUrl(raw: string): boolean {
  return /^https?:\/\//i.test(raw.trim())
}

const SOCIAL_SPECS: SocialChannelSpec[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    category: "Academic and Industry",
    audienceNote: "University faculty, photonics engineers, research groups, and Optica society announcements.",
    suggestedHandle: "optica-egypt-section",
    buildUrl: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim() : `https://www.linkedin.com/company/${normalizeHandle(raw)}`,
    formatHandle: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim().replace(/^https?:\/\/(www\.)?/i, "") : `@${normalizeHandle(raw)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    category: "Nationwide Campus Reach",
    audienceNote: "Broad public event announcements and university engineering community groups across Egypt.",
    suggestedHandle: "optica.egypt.section",
    buildUrl: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim() : `https://www.facebook.com/${normalizeHandle(raw)}`,
    formatHandle: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim().replace(/^https?:\/\/(www\.)?/i, "") : `@${normalizeHandle(raw)}`,
  },
  {
    id: "instagram",
    label: "Instagram",
    category: "Visual Campus Engagement",
    audienceNote: "Event reels, speaker announcements, chapter activities, and undergraduate outreach.",
    suggestedHandle: "@optica.egypt.section",
    buildUrl: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim() : `https://www.instagram.com/${normalizeHandle(raw)}/`,
    formatHandle: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim().replace(/^https?:\/\/(www\.)?/i, "") : `@${normalizeHandle(raw)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    category: "Direct Student Alerts",
    audienceNote: "Official broadcast channel for seminar reminders, registration openings, and chapter dispatches.",
    suggestedHandle: "Optica Egypt Channel",
    buildUrl: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim() : `https://whatsapp.com/channel/${normalizeHandle(raw)}`,
    formatHandle: () => "Official Channel",
  },
  {
    id: "telegram",
    label: "Telegram",
    category: "Technical and Grant Updates",
    audienceNote: "High-signal fellowship alerts, workshop files, and open-source photonics study groups.",
    suggestedHandle: "@optica_egypt_section",
    buildUrl: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim() : `https://t.me/${normalizeHandle(raw)}`,
    formatHandle: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim().replace(/^https?:\/\//i, "") : `@${normalizeHandle(raw)}`,
  },
  {
    id: "youtube",
    label: "YouTube",
    category: "Recorded Workshops",
    audienceNote: "Recorded technical seminars, Python Photonic Design Automation walkthroughs, and talks.",
    suggestedHandle: "@optica.egypt.section",
    buildUrl: (raw) => {
      if (isAbsoluteHttpUrl(raw)) return raw.trim()
      const clean = normalizeHandle(raw)
      return `https://www.youtube.com/@${clean}`
    },
    formatHandle: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim().replace(/^https?:\/\/(www\.)?/i, "") : `@${normalizeHandle(raw)}`,
  },
  {
    id: "twitter",
    label: "X",
    category: "Global Scientific Dialogue",
    audienceNote: "International optics dispatches, conference coverage, and Optica society coordination.",
    suggestedHandle: "@optica_egypt_ls",
    buildUrl: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim() : `https://x.com/${normalizeHandle(raw)}`,
    formatHandle: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim().replace(/^https?:\/\/(www\.)?/i, "") : `@${normalizeHandle(raw)}`,
  },
  {
    id: "tiktok",
    label: "TikTok",
    category: "Short-Form STEM Outreach",
    audienceNote: "Short-form optics explainers reaching high school and early undergraduate audiences across Egypt.",
    suggestedHandle: "@optica.egypt.section",
    buildUrl: (raw) => {
      if (isAbsoluteHttpUrl(raw)) return raw.trim()
      return `https://www.tiktok.com/@${normalizeHandle(raw)}`
    },
    formatHandle: (raw) =>
      isAbsoluteHttpUrl(raw) ? raw.trim().replace(/^https?:\/\/(www\.)?/i, "") : `@${normalizeHandle(raw)}`,
  },
]

export function getAllSocialChannels(): SocialChannel[] {
  const configured = siteConfig.social as Record<string, string | undefined>

  return SOCIAL_SPECS.map((spec) => {
    const raw = (configured[spec.id] || "").trim()
    const isActive = raw.length > 0

    return {
      id: spec.id,
      label: spec.label,
      category: spec.category,
      audienceNote: spec.audienceNote,
      suggestedHandle: spec.suggestedHandle,
      url: isActive ? spec.buildUrl(raw) : null,
      handleLabel: isActive ? spec.formatHandle(raw) : spec.suggestedHandle,
      isActive,
    }
  })
}

export function getActiveSocialChannels(): SocialChannel[] {
  return getAllSocialChannels().filter((channel) => channel.isActive && Boolean(channel.url))
}

export function getSocialSameAsUrls(): string[] {
  return Array.from(
    new Set(
      getActiveSocialChannels()
        .map((channel) => channel.url)
        .filter((url): url is string => Boolean(url))
    )
  )
}
