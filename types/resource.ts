import type { DomainId } from "./domain"

export interface Resource {
  id: string
  title: string
  description: string
  url: string
  category: "grants" | "software" | "learning" | "journals"
  costTier: "free" | "tier2-discount" | "grant"
  accessReq: string
  domainIds: DomainId[]
  tags: string[]
  lastVerifiedISO: string
  free: boolean
}
