import rawMembers from "@/data/members.json"
import type { Member } from "@/types/member"

const members: Member[] = (rawMembers as Member[]).filter((m) => m.active)

export function getActiveMembers(): Member[] {
  return [...members].sort((a, b) => a.order - b.order)
}

export function getExecutiveMembers(): Member[] {
  return members.filter((m) => m.tier === "executive").sort((a, b) => a.order - b.order)
}

export function getOperationalMembers(): Member[] {
  return members.filter((m) => m.tier === "operational").sort((a, b) => a.order - b.order)
}

export function getAdvisoryMembers(): Member[] {
  return members.filter((m) => m.tier === "advisory").sort((a, b) => a.order - b.order)
}

export function getMemberById(id: string): Member | undefined {
  return members.find((m) => m.id === id)
}
