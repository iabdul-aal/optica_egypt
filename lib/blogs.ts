import blogsData from "@/data/blogs.json"

export interface BlogSection {
  heading: string
  body: string
}

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
  sections?: BlogSection[]
  codeSnippet?: string
  keyTakeaways?: string[]
}

export function getAllBlogs(): BlogPost[] {
  return (blogsData as BlogPost[])
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogById(id: string): BlogPost | undefined {
  return (blogsData as BlogPost[]).find((b) => b.id === id || b.slug === id)
}
