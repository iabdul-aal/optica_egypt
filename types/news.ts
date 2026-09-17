export interface NewsItem {
  id: string
  title: { en: string; ar: string }
  summary: { en: string; ar: string }
  date: string
  category: "announcement" | "achievement" | "update" | "opportunity"
  url?: string
  published: boolean
}
