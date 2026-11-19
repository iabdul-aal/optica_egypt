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

const domainsById = new Map<DomainId, Domain>(getAllDomains().map((d) => [d.id, d]))
const membersById = new Map<string, Member>(getActiveMembers().map((m) => [m.id, m]))
const chaptersById = new Map<string, Chapter>(getAllChapters().map((c) => [c.id, c]))
const resourcesById = new Map<string, Resource>(getAllResources().map((r) => [r.id, r]))

export function getDomainsByIds(ids: DomainId[]): Domain[] {
  return ids.map((id) => domainsById.get(id)).filter((d): d is Domain => Boolean(d))
}

export function getMembersByIds(ids: string[]): Member[] {
  return ids.map((id) => membersById.get(id)).filter((m): m is Member => Boolean(m))
}

export function getChaptersByIds(ids: string[]): Chapter[] {
  return ids.map((id) => chaptersById.get(id)).filter((c): c is Chapter => Boolean(c))
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
  return project.resourceIds
    .map((id) => resourcesById.get(id))
    .filter((r): r is Resource => Boolean(r))
}
