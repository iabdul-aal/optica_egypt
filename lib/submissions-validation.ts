import { z } from "zod"
import { submissionIntents, submissionStages } from "./submissions.ts"

const text = (min: number, max: number) => z.string().trim().min(min).max(max)

export const submissionSchema = z.object({
  intent: z.enum(submissionIntents),
  name: text(2, 120),
  email: z
    .email()
    .max(254)
    .transform((v) => v.toLowerCase()),
  affiliation: text(2, 160),
  targetRef: text(0, 120).optional().default(""),
  details: text(10, 3000),
  foundingMemberCount: text(0, 20).optional().default(""),
  facultyAdvisorName: text(0, 120).optional().default(""),
  partnershipScope: text(0, 120).optional().default(""),
  targetTimeline: text(0, 120).optional().default(""),
  sessionTitle: text(0, 200).optional().default(""),
  sessionFormat: text(0, 100).optional().default(""),
  preferredDate: text(0, 120).optional().default(""),
  eventName: text(0, 200).optional().default(""),
  attendanceMode: text(0, 60).optional().default(""),
  coverageSubject: text(0, 200).optional().default(""),
  publicationDeadline: text(0, 60).optional().default(""),
  inquirySubject: text(0, 200).optional().default(""),
  topicOrTrack: text(0, 200).optional().default(""),
  deadlineOrDate: text(0, 120).optional().default(""),
  opticaId: text(0, 40).optional().default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
  submissionId: z.uuid(),
})

export const submissionReviewSchema = z.object({
  status: z.enum(submissionStages),
  note: text(0, 3000),
  version: z.number().int().nonnegative(),
})
