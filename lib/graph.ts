import { getAllChapters } from "@/lib/chapters"
import { getAllDispatches } from "@/lib/dispatches"
import { getAllDomains } from "@/lib/domains"
import { getActiveMembers } from "@/lib/members"
import { getAllProjects } from "@/lib/projects"
import { getAllResources } from "@/lib/resources"
import type { Chapter } from "@/lib/chapters"
import type { Dispatch } from "@/types/dispatch"
import type { Domain, DomainId } from "@/types/domain"
import type { Member } from "@/types/member"
import type { Project } from "@/types/project"
import type { Resource } from "@/types/resource"

export function getDomainsByIds(ids: DomainId[]): Domain[] {
  const byId = new Map(getAllDomains().map((d) => [d.id, d]))
  return ids.map((id) => byId.get(id)).filter((d): d is Domain => Boolean(d))
}

export function getMembersByIds(ids: string[]): Member[] {
  const byId = new Map(getActiveMembers().map((m) => [m.id, m]))
  return ids.map((id) => byId.get(id)).filter((m): m is Member => Boolean(m))
}

export function getChaptersByIds(ids: string[]): Chapter[] {
  const byId = new Map(getAllChapters().map((c) => [c.id, c]))
  return ids.map((id) => byId.get(id)).filter((c): c is Chapter => Boolean(c))
}

export function getProjectsForMember(memberId: string): Project[] {
  return getAllProjects().filter((p) => p.leadMemberIds.includes(memberId))
}

export function getDispatchesForMember(memberId: string): Dispatch[] {
  return getAllDispatches().filter((d) => d.authorIds.includes(memberId))
}

export function getProjectsForChapter(chapterId: string): Project[] {
  return getAllProjects().filter((p) => p.chapterIds.includes(chapterId))
}

export function getDispatchesForProject(projectId: string): Dispatch[] {
  return getAllDispatches().filter((d) => d.projectId === projectId)
}

export function getResourcesForProject(project: Project): Resource[] {
  const byId = new Map(getAllResources().map((r) => [r.id, r]))
  return project.resourceIds
    .map((id) => byId.get(id))
    .filter((r): r is Resource => Boolean(r))
}
