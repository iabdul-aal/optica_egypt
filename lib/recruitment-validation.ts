import { z } from "zod"
import { committees, stages } from "./recruitment.ts"

const text = (min: number, max: number) => z.string().trim().min(min).max(max)
export const applicationSchema = z.object({
  name: text(2, 120),
  email: z
    .email()
    .max(254)
    .transform((v) => v.toLowerCase()),
  university: text(2, 160),
  studyLevel: z.enum(["Undergraduate", "Postgraduate", "Researcher", "Other"]),
  committee: z.enum(committees),
  skills: text(0, 2000),
  motivation: text(30, 3000),
  availability: text(2, 160),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
  submissionId: z.uuid()
})
export const reviewSchema = z.object({
  status: z.enum(stages),
  note: text(0, 3000),
  version: z.number().int().nonnegative()
})
