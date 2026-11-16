import projectsData from "@/data/projects.json"
import type {
  FundingStatus,
  Project,
  ProjectLifecycle,
  ProjectTrack,
} from "@/types/project"

const projects = projectsData as Project[]

export const TRACK_LABELS: Record<ProjectTrack, string> = {
  "open-pda": "Open-Source PDA",
  training: "Training and Symposia",
  fellowships: "Fellowships and Elevations",
  outreach: "Campus Outreach",
}

export const LIFECYCLE_LABELS: Record<ProjectLifecycle, string> = {
  planning: "Planning Stage",
  "seeking-partners": "Seeking Partners",
  "open-for-signup": "Open for Signup",
  active: "Active",
  completed: "Completed",
}

export const FUNDING_LABELS: Record<FundingStatus, string> = {
  "unfunded-concept": "Unfunded Concept",
  "partner-supported": "Partner Supported",
  "optica-funded": "Optica Pathway",
}

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || p.id === slug)
}
