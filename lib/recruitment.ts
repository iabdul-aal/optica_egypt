export const committees = [
  "Technical Program",
  "Open Source Photonics",
  "Outreach",
  "Science Communication",
  "Chapter Mentorship",
  "Operations"
] as const
export const stages = [
  "submitted",
  "under_review",
  "interview",
  "accepted",
  "declined"
] as const
export const roles = ["admin", "recruiter", "viewer"] as const
export type StaffRole = (typeof roles)[number]
export type Stage = (typeof stages)[number]
export const stageLabels: Record<Stage, string> = {
  submitted: "Submitted",
  under_review: "Under review",
  interview: "Interview",
  accepted: "Accepted",
  declined: "Declined"
}
export interface Application {
  id: string
  application_code: string
  applicant_name: string
  applicant_email: string
  university: string
  study_level: string
  committee: string
  skills: string
  motivation: string
  availability: string
  status: Stage
  created_at: string
  updated_at: string
  version: number
}
export interface ReviewEvent {
  id: string
  actor_id: string
  old_status: Stage | null
  new_status: Stage
  note: string
  created_at: string
}
export function canReview(role: StaffRole) {
  return role === "admin" || role === "recruiter"
}
