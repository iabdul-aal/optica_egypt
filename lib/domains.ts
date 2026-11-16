import domainsData from "@/data/domains.json"
import type { Domain } from "@/types/domain"

const domains = domainsData as Domain[]

export function getAllDomains(): Domain[] {
  return domains
}
