import rawNews from "@/data/news.json"
import type { NewsItem } from "@/types/news"

const news: NewsItem[] = rawNews as NewsItem[]

export function getAllNews(): NewsItem[] {
  return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getLatestNews(limit = 3): NewsItem[] {
  return getAllNews().slice(0, limit)
}
