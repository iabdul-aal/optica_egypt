import rawResources from "@/data/resources.json"
import type { Resource } from "@/types/resource"

const resources: Resource[] = rawResources as Resource[]

export function getAllResources(): Resource[] {
  return resources
}

export function getResourcesByIds(ids: string[]): Resource[] {
  const idSet = new Set(ids)
  return resources.filter((r) => idSet.has(r.id))
}
