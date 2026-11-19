import rawMembers from "@/data/members.json"
import type { Member } from "@/types/member"

const activeMembers: Member[] = (rawMembers as Member[])
  .filter((m) => m.active)
  .sort((a, b) => a.order - b.order)

const membersById = new Map<string, Member>(activeMembers.map((m) => [m.id, m]))
const executiveMembers = activeMembers.filter((m) => m.tier === "executive")
const operationalMembers = activeMembers.filter((m) => m.tier === "operational")
const advisoryMembers = activeMembers.filter((m) => m.tier === "advisory")

export function getActiveMembers(): Member[] {
  return activeMembers
}

export function getExecutiveMembers(): Member[] {
  return executiveMembers
}

export function getOperationalMembers(): Member[] {
  return operationalMembers
}

export function getAdvisoryMembers(): Member[] {
  return advisoryMembers
}

export function getMemberById(id: string): Member | undefined {
  return membersById.get(id)
}
