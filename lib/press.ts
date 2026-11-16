import pressData from "@/data/press.json"

interface PressBoilerplate {
  title: string
  body: string
  short: string
}

interface MediaAsset {
  id: string
  title: string
  format: string
  description: string
  downloadUrl: string
}

interface BrandColor {
  name: string
  hex: string
  usage: string
}

interface BrandTypography {
  name: string
  usage: string
}

interface MediaKitData {
  assets: MediaAsset[]
  brandColors: BrandColor[]
  typography: BrandTypography[]
}

export function getMediaKit(): MediaKitData {
  return pressData.mediaKit
}

export function getPressBoilerplate(): PressBoilerplate {
  return pressData.boilerplate
}
