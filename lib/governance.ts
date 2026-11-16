import governanceData from "@/data/governance.json"
import { getActiveMembers } from "@/lib/members"

export interface CharterRecord {
  approvalDate: string
  approvalISO: string
  parentOrganization: string
  parentUrl: string
  contactEmail: string
  hqContact: string
  currentStanding: string
}

export interface BylawStandard {
  id: string
  number: string
  title: string
  requirement: string
  sectionStatus: string
}

export interface ExecutiveSeatAlignment {
  constitutionalSeat: string
  memberId: string
  holderName: string
  institution: string
  term: string
  opticaId: string
}

export interface AnnualReportItem {
  id: string
  title: string
  sourceFile: string
  description: string
}

export interface PartnershipModel {
  id: string
  title: string
  scope: string
}

export interface PartnerEntry {
  id: string
  name: string
  category: string
  url?: string
  scope: string
}

export interface SectionRecognition {
  id: string
  year: string
  title: string
  conferringBody: string
  category: string
  citation: string
}

export function getGovernanceOverview() {
  return {
    eyebrow: governanceData.eyebrow,
    title: governanceData.title,
    intro: governanceData.intro,
  }
}

export function getCharterRecord(): CharterRecord {
  return governanceData.charterRecord
}

export function getBylawStandards(): BylawStandard[] {
  return governanceData.bylawStandards
}

export function getExecutiveAlignment(): ExecutiveSeatAlignment[] {
  const members = new Map(getActiveMembers().map((m) => [m.id, m]))
  return governanceData.executiveAlignment.map((seat) => {
    const member = members.get(seat.memberId)
    return {
      constitutionalSeat: seat.constitutionalSeat,
      memberId: seat.memberId,
      holderName: member?.name || seat.memberId,
      institution: member?.institution || "",
      term: member?.term || "Inaugural Charter Term",
      opticaId: member?.opticaId || "",
    }
  })
}

export function getAnnualReportScope(): AnnualReportItem[] {
  return governanceData.annualReportScope
}

export function getPartnershipModels(): PartnershipModel[] {
  return governanceData.partnershipModels
}

export function getConfirmedPartners(): PartnerEntry[] {
  return governanceData.partners as PartnerEntry[]
}

export function getSectionRecognitions(): SectionRecognition[] {
  return governanceData.recognitions as SectionRecognition[]
}
