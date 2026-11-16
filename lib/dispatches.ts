import dispatchesData from "@/data/dispatches.json"
import type { Dispatch, DispatchKind } from "@/types/dispatch"

const dispatches = (dispatchesData as Dispatch[])
  .filter((item) => item.published)
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO))

export const DISPATCH_KIND_LABELS: Record<DispatchKind, string> = {
  announcement: "Announcement",
  event: "Event",
  article: "Article",
  media: "Media",
}

export function getAllDispatches(): Dispatch[] {
  return dispatches
}

export function getLatestDispatches(limit = 3): Dispatch[] {
  return dispatches.slice(0, limit)
}

export function getDispatchBySlug(slug: string): Dispatch | undefined {
  return dispatches.find((item) => item.slug === slug || item.id === slug)
}

export function getPublishedDispatchKinds(): DispatchKind[] {
  const present = new Set(dispatches.map((item) => item.kind))
  return (["event", "announcement", "article", "media"] as DispatchKind[]).filter((k) =>
    present.has(k)
  )
}
