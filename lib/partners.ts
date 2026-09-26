import partnersData from "@/data/partners.json"

export interface Partner {
  name: string
  department: string
  city: string
  role: string
  description: string
  focusAreas: string[]
  url: string
}

export interface PartnerCategory {
  id: string
  title: string
  tagline: string
  partners: Partner[]
}

export interface PartnershipModel {
  id: string
  number: string
  title: string
  description: string
  benefits: string[]
}

export interface PartnerMetric {
  metric: string
  label: string
  subtext: string
}

export interface PartnersData {
  eyebrow: string
  title: string
  intro: string
  overview: {
    summary: string
    quote: string
  }
  metrics: PartnerMetric[]
  categories: PartnerCategory[]
  partnershipModels: PartnershipModel[]
}

export function getPartnersData(): PartnersData {
  return partnersData
}

export function getPartnerCategories(): PartnerCategory[] {
  return partnersData.categories
}

export function getPartnershipModels(): PartnershipModel[] {
  return partnersData.partnershipModels
}

export function getPartnerMetrics(): PartnerMetric[] {
  return partnersData.metrics
}
