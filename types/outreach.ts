export interface OutreachItem {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  date: string
  location: { en: string; ar: string }
  reach: number         // number of people reached
  imageUrl?: string
  published: boolean
}
