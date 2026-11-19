"use client"

import { StageReviewForm } from "@/components/admin/ReviewForm"
import {
  submissionStageLabels,
  submissionStages,
  type SubmissionRecord,
  type SubmissionStage,
} from "@/lib/submissions"

export function SubmissionReviewForm({
  submission,
}: {
  submission: Pick<SubmissionRecord, "id" | "status" | "version">
}) {
  return (
    <StageReviewForm<SubmissionStage>
      heading="Review submission"
      endpoint={`/api/admin/submissions/${submission.id}`}
      currentStatus={submission.status}
      version={submission.version}
      stageOptions={submissionStages}
      labels={submissionStageLabels}
      notePlaceholder="Add coordinator notes visible to authorized officers only."
      footerHint="Saving records your identity and time in the review history."
    />
  )
}
