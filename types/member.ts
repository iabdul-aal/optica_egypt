export interface Member {
  id: string
  name: { en: string; ar?: string }
  role: { en: string; ar?: string }
  term: string
  tier: "executive" | "operational" | "advisory"
  institution: { en: string; ar?: string }
  linkedin?: string
  email?: string
  photo?: string
  bio: { en: string; ar?: string }
  academicBackground?: string
  professionalFocus?: string
  specializedSector?: string
  achievements?: string
  order: number
  active: boolean
}
