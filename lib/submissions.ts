export const submissionIntents = [
  "chapter_charter",
  "partner_proposal",
  "speaker_proposal",
  "event_rsvp",
  "press_inquiry",
  "general_inquiry",
] as const

export type SubmissionIntent = (typeof submissionIntents)[number]

export const submissionIntentLabels: Record<SubmissionIntent, string> = {
  chapter_charter: "Student Chapter Charter",
  partner_proposal: "Partnership or Host Proposal",
  speaker_proposal: "Speaker or Workshop Proposal",
  event_rsvp: "Event Registration",
  press_inquiry: "Press Desk Inquiry",
  general_inquiry: "General Section Inquiry",
}

export const submissionStages = [
  "submitted",
  "under_review",
  "scheduled",
  "accepted",
  "declined",
] as const

export type SubmissionStage = (typeof submissionStages)[number]

export const submissionStageLabels: Record<SubmissionStage, string> = {
  submitted: "Submitted",
  under_review: "Under review",
  scheduled: "Scheduled",
  accepted: "Accepted",
  declined: "Declined",
}

export interface SubmissionRecord {
  id: string
  reference_code: string
  intent: SubmissionIntent
  applicant_name: string
  applicant_email: string
  affiliation: string
  target_ref: string
  payload: Record<string, string>
  status: SubmissionStage
  created_at: string
  updated_at: string
  version: number
}

export interface SubmissionReviewEvent {
  id: string
  actor_id: string
  old_status: SubmissionStage | null
  new_status: SubmissionStage
  note: string
  created_at: string
}
