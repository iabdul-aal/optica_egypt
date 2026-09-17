export interface Event {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  date: string          // ISO 8601 YYYY-MM-DD
  time?: string         // "18:00"
  location: { en: string; ar: string }
  type: "seminar" | "workshop" | "social" | "competition" | "webinar"
  speaker?: { name: string; role: string; institution: string }
  registrationUrl?: string
  imageUrl?: string
  tags: string[]
  published: boolean
}
