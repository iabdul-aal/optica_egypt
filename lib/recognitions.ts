import recognitionsData from "@/data/recognitions.json"

export interface SectionRecognition {
  id: string
  year: string
  title: string
  conferringBody: string
  category: string
  badge: string
  description: string
  citation: string
}

export interface RecognitionMilestone {
  metric: string
  label: string
  subtext: string
}

export interface RecognitionsData {
  eyebrow: string
  title: string
  intro: string
  overview: {
    summary: string
    quote: string
  }
  recognitions: SectionRecognition[]
  milestones: RecognitionMilestone[]
}

export function getRecognitionsData(): RecognitionsData {
  return recognitionsData
}

export function getSectionRecognitions(): SectionRecognition[] {
  return recognitionsData.recognitions
}

export function getRecognitionMilestones(): RecognitionMilestone[] {
  return recognitionsData.milestones
}
