import type { DomainId } from "./domain"

export type DispatchKind = "announcement" | "event" | "article" | "media"

export interface DispatchEventMeta {
  startISO: string
  endISO: string
  timezone: "Africa/Cairo"
  format: "In-Person" | "Online" | "Hybrid"
  venue: string
  rsvpOpen: boolean
}

export interface DispatchMediaAsset {
  src: string
  alt: string
  caption?: string
}

export interface Dispatch {
  id: string
  slug: string
  kind: DispatchKind
  published: boolean
  dateISO: string
  historicalContext?: boolean
  title: string
  summary: string
  bodyMarkdown?: string
  authorIds: string[]
  projectId?: string
  domainIds: DomainId[]
  resourceIds: string[]
  externalUrl?: string
  eventMeta?: DispatchEventMeta
  mediaAssets?: DispatchMediaAsset[]
}
