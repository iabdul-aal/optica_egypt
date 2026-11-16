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

export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim().replace(/\/+$/, "")
  if (!apiBase) return cleanPath
  return `${apiBase}${cleanPath}`
}

/**
 * Safely parse a fetch Response that is expected to return JSON, preventing
 * raw HTML error pages (such as 404/405 static-host responses) from leaking
 * `SyntaxError: Unexpected token '<'` into client form alerts.
 */
export async function readJsonResponse<T extends { error?: string }>(
  response: Response,
  fallbackError: string
): Promise<T> {
  const raw = await response.text()
  let parsed: T | null = null

  if (raw) {
    try {
      parsed = JSON.parse(raw) as T
    } catch {
      parsed = null
    }
  }

  if (!response.ok) {
    throw new Error(parsed?.error || fallbackError)
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error(fallbackError)
  }

  return parsed
}

/**
 * Map fetch/AbortError/TypeError exceptions into consistent user-facing form messages.
 */
export function formatSubmitError(
  err: unknown,
  messages: { timeoutMessage: string; unavailableMessage: string }
): string {
  if (err instanceof Error) {
    if (err.name === "TimeoutError") return messages.timeoutMessage
    if (err instanceof TypeError) return messages.unavailableMessage
    return err.message || messages.unavailableMessage
  }
  return messages.unavailableMessage
}
