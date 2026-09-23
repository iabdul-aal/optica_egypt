import competitionsData from "@/data/competitions.json"

export interface CompetitionTrack {
  id: string
  number: string
  title: string
  focus: string
  description: string
  tools: string[]
  exampleTopics: string[]
}

export interface CompetitionPhase {
  phase: string
  timeline: string
  description: string
}

export interface CompetitionRubricItem {
  criterion: string
  weight: string
  description: string
}

export interface CompetitionAward {
  place: string
  reward: string
  perks: string
}

export interface RelatedContest {
  id: string
  name: string
  category: string
  description: string
  href: string
}

export function getCompetitionsData() {
  return competitionsData
}

export function getFlagshipHackathon() {
  return competitionsData.flagship
}

export function getCompetitionTracks(): CompetitionTrack[] {
  return competitionsData.tracks
}

export function getCompetitionPhases(): CompetitionPhase[] {
  return competitionsData.phases
}

export function getCompetitionRubric(): CompetitionRubricItem[] {
  return competitionsData.rubric
}

export function getCompetitionAwards(): CompetitionAward[] {
  return competitionsData.awards
}

export function getRelatedContests(): RelatedContest[] {
  return competitionsData.relatedContests
}
