import type { DomainId } from "./domain"

export interface Member {
  id: string
  name: string
  role: string
  foundingRole?: string
  isFounder?: boolean
  isInitiator?: boolean
  isFirstPresident?: boolean
  tier: "executive" | "operational" | "advisory"
  term: string
  institution: string
  academicBackground?: string
  professionalFocus?: string
  specializedSector?: string
  achievements?: string
  domainIds: DomainId[]
  linkedin?: string
  email?: string
  website?: string
  opticaId?: string
  photo: string
  bio: string
  order: number
  active: boolean
}
