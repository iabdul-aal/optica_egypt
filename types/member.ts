export interface Member {
  id: string
  name: { en: string; ar: string }
  role: { en: string; ar: string }
  term: string
  institution: { en: string; ar: string }
  linkedin?: string
  bio: { en: string; ar: string }
  order: number
  active: boolean
}
