import pressData from "@/data/press.json"

export interface PressBoilerplate {
  title: string
  body: string
  short: string
}

export interface PressQuote {
  text: string
  speaker: string
  title: string
}

export interface PressRelease {
  id: string
  date: string
  dateISO: string
  location: string
  title: string
  summary: string
  lead: string
  quote?: PressQuote
  tags: string[]
}

export interface MediaAsset {
  id: string
  title: string
  format: string
  description: string
  downloadUrl: string
}

export interface BrandColor {
  name: string
  hex: string
  usage: string
}

export interface BrandTypography {
  name: string
  usage: string
}

export interface MediaKitData {
  assets: MediaAsset[]
  brandColors: BrandColor[]
  typography: BrandTypography[]
}

export interface PressCoverage {
  source: string
  date: string
  headline: string
  summary: string
  url: string
}

export interface PressData {
  eyebrow: string
  title: string
  intro: string
  boilerplate: PressBoilerplate
  pressReleases: PressRelease[]
  mediaKit: MediaKitData
  mediaCoverage: PressCoverage[]
}

export function getPressData(): PressData {
  return pressData
}

export function getPressReleases(): PressRelease[] {
  return pressData.pressReleases
}

export function getMediaKit(): MediaKitData {
  return pressData.mediaKit
}

export function getPressCoverage(): PressCoverage[] {
  return pressData.mediaCoverage
}

export function getPressBoilerplate(): PressBoilerplate {
  return pressData.boilerplate
}
