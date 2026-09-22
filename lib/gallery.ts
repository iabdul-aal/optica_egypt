import galleryData from "@/data/gallery.json"

export interface GalleryItem {
  id: string
  title: string
  category: "Events" | "Workshops" | "Lab Visits" | "Community"
  date: string
  location: string
  caption: string
  aspectRatio: string
  theme: "gold" | "teal" | "indigo"
}

export function getAllGalleryItems(): GalleryItem[] {
  return galleryData as GalleryItem[]
}

export function getGalleryCategories(): string[] {
  const categories = new Set(galleryData.map((item) => item.category))
  return ["All", ...Array.from(categories)]
}
