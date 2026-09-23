export interface Resource {
  id: string
  title: { en: string }
  description: { en: string }
  url: string
  category: "journal" | "conference" | "funding" | "grants" | "learning" | "tool" | "software" | "community"
  tags: string[]
  free: boolean
}
