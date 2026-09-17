import rawResources from "@/data/resources.json"
import type { Resource } from "@/types/resource"

const resources: Resource[] = rawResources as Resource[]

export function getAllResources(): Resource[] {
  return resources
}

export function getResourcesByCategory(category: string): Resource[] {
  return resources.filter((r) => r.category === category)
}
