import sectionAwardsData from "@/data/section_awards.json"

export interface SectionAwardGained {
  id: string
  year: string
  title: string
  conferringBody: string
  category: string
  badge: string
  description: string
  citation: string
}

export interface SectionMilestone {
  metric: string
  label: string
  subtext: string
}

export interface SectionAwardsData {
  eyebrow: string
  title: string
  intro: string
  overview: {
    summary: string
    quote: string
  }
  awardsGained: SectionAwardGained[]
  milestones: SectionMilestone[]
}

export function getSectionAwardsData(): SectionAwardsData {
  return sectionAwardsData
}

export function getSectionAwardsGained(): SectionAwardGained[] {
  return sectionAwardsData.awardsGained
}

export function getSectionMilestones(): SectionMilestone[] {
  return sectionAwardsData.milestones
}
