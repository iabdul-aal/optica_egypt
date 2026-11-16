import { NextRequest } from "next/server"

export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin")
  return !origin || origin === request.nextUrl.origin
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
