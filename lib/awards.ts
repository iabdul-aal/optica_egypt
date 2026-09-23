import awardsData from "@/data/awards.json"

export interface SectionAward {
  id: string
  title: string
  category: string
  eyebrow: string
  description: string
  eligibility: string
  prize: string
  deadline: string
}

export interface GlobalFellowship {
  id: string
  title: string
  organization: string
  grant: string
  description: string
  url: string
  scope: string
}

export interface ElevationTier {
  tier: string
  experience: string
  perks: string
  support: string
}

export interface ElevationsSection {
  eyebrow: string
  title: string
  description: string
  tiers: ElevationTier[]
}

export interface AwardsData {
  sectionAwards: SectionAward[]
  globalFellowships: GlobalFellowship[]
  elevations: ElevationsSection
}

export function getAwardsData(): AwardsData {
  return awardsData
}

export function getSectionAwards(): SectionAward[] {
  return awardsData.sectionAwards
}

export function getGlobalFellowships(): GlobalFellowship[] {
  return awardsData.globalFellowships
}

export function getElevations(): ElevationsSection {
  return awardsData.elevations
}
