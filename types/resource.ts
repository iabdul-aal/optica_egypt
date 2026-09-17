export interface Resource {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  url: string
  category: "journal" | "conference" | "funding" | "learning" | "tool" | "community"
  tags: string[]
  free: boolean
}
