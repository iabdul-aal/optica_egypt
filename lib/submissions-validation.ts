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
