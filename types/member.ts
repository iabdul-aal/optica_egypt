export interface Member {
  id: string
  name: { en: string }
  role: { en: string }
  term: string
  tier: "executive" | "operational" | "advisory"
  institution: { en: string }
  foundingRole?: string
  isFounder?: boolean
  isInitiator?: boolean
  isFirstPresident?: boolean
  linkedin?: string
  email?: string
  website?: string
  opticaId?: string
  photo?: string
  bio: { en: string }
  academicBackground?: string
  professionalFocus?: string
  specializedSector?: string
  achievements?: string
  order: number
  active: boolean
}
