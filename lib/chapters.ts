import chaptersData from "@/data/chapters.json"

export interface ChapterSocials {
  email?: string
  linkedin?: string
  website?: string
  instagram?: string
}

export interface Chapter {
  id: string
  name: string
  shortName: string
  university: string
  status: string
  charteredYear?: number
  targetYear?: string
  campus?: string
  city: string
  governorate?: string
  coordinates: { x: number; y: number }
  facultyAdvisor?: string
  advisorDepartment?: string
  faculty?: string
  description: string
  focusAreas?: string[]
  socials?: ChapterSocials
  highlights?: string[]
}

export interface ChapterStat {
  label: string
  value: string
  detail: string
}

export interface RoadmapStep {
  step: string
  title: string
  body: string
}

export function getChapterStats(): ChapterStat[] {
  return chaptersData.stats
}

export function getCharteredChapters(): Chapter[] {
  return chaptersData.charteredChapters as Chapter[]
}

export function getPipelineChapters(): Chapter[] {
  return chaptersData.pipelineChapters as Chapter[]
}

export function getAllChapters(): Chapter[] {
  return [...chaptersData.charteredChapters, ...chaptersData.pipelineChapters] as Chapter[]
}

export function getChapterById(id: string): Chapter | undefined {
  return getAllChapters().find((c) => c.id === id)
}

export function getCharterRoadmap(): RoadmapStep[] {
  return chaptersData.charterRoadmap
}
