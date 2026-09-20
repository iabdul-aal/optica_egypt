export interface NewsItem {
  id: string
  title: { en: string }
  summary: { en: string }
  date: string
  category: "announcement" | "achievement" | "update" | "opportunity"
  url?: string
  published: boolean
}
