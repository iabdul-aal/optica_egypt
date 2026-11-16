import type { DomainId } from "./domain"
import type { SubmissionIntent } from "@/lib/submissions"

export type ProjectTrack = "open-pda" | "training" | "fellowships" | "outreach"
export type ProjectLifecycle =
  | "planning"
  | "seeking-partners"
  | "open-for-signup"
  | "active"
  | "completed"
export type FundingStatus =
  | "unfunded-concept"
  | "partner-supported"
  | "optica-funded"

export interface ProjectMilestone {
  label: string
  timeline: string
  state: "pending" | "in-progress" | "done"
}

export interface Project {
  id: string
  slug: string
  track: ProjectTrack
  lifecycle: ProjectLifecycle
  funding: FundingStatus
  title: string
  summary: string
  description: string
  leadMemberIds: string[]
  chapterIds: string[]
  domainIds: DomainId[]
  resourceIds: string[]
  requirements: string[]
  milestones: ProjectMilestone[]
  ctaIntent: SubmissionIntent
  ctaLabel: string
}
