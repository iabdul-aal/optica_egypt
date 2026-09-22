export interface OutreachItem {
  id: string
  title: { en: string }
  description: { en: string }
  date: string
  location: { en: string }
  reach: number // number of people reached
  imageUrl?: string
  published: boolean
}
