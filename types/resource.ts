export interface Resource {
  id: string
  title: { en: string }
  description: { en: string }
  url: string
  category: "journal" | "conference" | "funding" | "learning" | "tool" | "community"
  tags: string[]
  free: boolean
}
