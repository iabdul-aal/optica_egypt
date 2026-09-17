import rawOutreach from "@/data/outreach.json"
import type { OutreachItem } from "@/types/outreach"

const outreach: OutreachItem[] = rawOutreach as OutreachItem[]

export function getAllOutreach(): OutreachItem[] {
  return outreach.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
