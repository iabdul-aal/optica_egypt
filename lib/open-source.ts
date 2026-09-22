import openSourceData from "@/data/open_source.json"

export interface OpenSourcePillar {
  id: string
  number: string
  title: string
  summary: string
  tools: string[]
}

export interface PhotonicTool {
  name: string
  category: string
  description: string
  github: string
  status: string
}

export interface ChipathonPhase {
  phase: string
  timeline: string
  description: string
}

export function getOpenSourceProgram() {
  return openSourceData.program
}

export function getOpenSourcePillars(): OpenSourcePillar[] {
  return openSourceData.pillars
}

export function getOpenSourceToolstack(): PhotonicTool[] {
  return openSourceData.toolstack
}

export function getChipathonTimeline(): ChipathonPhase[] {
  return openSourceData.chipathonTimeline
}
