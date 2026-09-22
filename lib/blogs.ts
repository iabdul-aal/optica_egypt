import blogsData from "@/data/blogs.json"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  author: string
  readTime: string
  category: string
  tags: string[]
}

export function getAllBlogs(): BlogPost[] {
  return blogsData.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogById(id: string): BlogPost | undefined {
  return blogsData.find((b) => b.id === id || b.slug === id)
}
