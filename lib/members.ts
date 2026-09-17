import rawMembers from "@/data/members.json"
import type { Member } from "@/types/member"

const ROLE_ORDER = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "Growth Officer",
  "Outreach Officer",
  "Activities Officer",
  "Logistics Officer",
  "QA Officer",
  "Volunteers Officer",
  "Webmaster",
  "Member",
]

const members: Member[] = (rawMembers as Member[]).filter((m) => m.active)

export function getActiveMembers(): Member[] {
  return [...members].sort((a, b) => {
    const ai = ROLE_ORDER.indexOf(a.role.en)
    const bi = ROLE_ORDER.indexOf(b.role.en)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })
}

export function getMemberById(id: string): Member | undefined {
  return members.find((m) => m.id === id)
}
