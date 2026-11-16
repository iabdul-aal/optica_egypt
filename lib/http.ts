import { NextRequest } from "next/server"

const DEFAULT_ALLOWED_PUBLIC_ORIGINS = ["https://iabdul-aal.me"]

function getAllowedPublicOrigins(): Set<string> {
  const configured = (process.env.ALLOWED_PUBLIC_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  return new Set([...DEFAULT_ALLOWED_PUBLIC_ORIGINS, ...configured])
}

export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin")
  return !origin || origin === request.nextUrl.origin
}

export function isAllowedPublicOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin")
  if (!origin || origin === request.nextUrl.origin) return true
  return getAllowedPublicOrigins().has(origin)
}

export function publicCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get("origin")
  if (!origin || origin === request.nextUrl.origin || !getAllowedPublicOrigins().has(origin)) {
    return {}
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  }
}

export async function boundedJson(request: NextRequest, maxBytes = 16000) {
  const reader = request.body?.getReader()
  if (!reader) throw new Error("Empty request")
  let size = 0
  const chunks: Uint8Array[] = []
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.length
    if (size > maxBytes) {
      await reader.cancel()
      throw new Error("Request too large")
    }
    chunks.push(value)
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown
}
