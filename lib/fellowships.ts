import fellowshipsData from "@/data/fellowships.json"

export interface ThesisCategory {
  level: string
  scope: string
  prize: string
  eligibility: string
}

export interface BestThesisAward {
  title: string
  eyebrow: string
  description: string
  categories: ThesisCategory[]
  evaluationCriteria: string[]
  deadline: string
}

export interface EligibleExpense {
  category: string
  items: string
}

export interface ThesisFund {
  title: string
  eyebrow: string
  grantAmount: string
  description: string
  eligibleExpenses: EligibleExpense[]
  applicationProcess: string[]
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

export interface FellowshipsData {
  eyebrow: string
  title: string
  intro: string
  bestThesisAward: BestThesisAward
  thesisFund: ThesisFund
  globalFellowships: GlobalFellowship[]
  elevations: ElevationsSection
}

export function getFellowshipsData(): FellowshipsData {
  return fellowshipsData
}

export function getBestThesisAward(): BestThesisAward {
  return fellowshipsData.bestThesisAward
}

export function getThesisFund(): ThesisFund {
  return fellowshipsData.thesisFund
}

export function getGlobalFellowships(): GlobalFellowship[] {
  return fellowshipsData.globalFellowships
}

export function getElevations(): ElevationsSection {
  return fellowshipsData.elevations
}
