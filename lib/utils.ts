import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string | undefined | null): string {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_PAGES === "true" ? "/optica_egypt" : "")
  if (!basePath) return path
  if (path.startsWith(basePath)) return path
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${basePath}${cleanPath}`
}
