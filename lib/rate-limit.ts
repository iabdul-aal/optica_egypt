import "server-only"
import { createHmac } from "node:crypto"
import type { NextRequest } from "next/server"
import { serviceClient } from "@/lib/supabase/server"

export function extractClientIp(request: NextRequest): string {
  const raw =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    "local"
  return raw.split(",")[0]?.trim() || "local"
}

export function fingerprintRateKey(value: string): string {
  const secret = process.env.SUPABASE_SECRET_KEY
  if (!secret) throw new Error("Rate-limit HMAC secret is unavailable")
  return createHmac("sha256", secret).update(value).digest("hex")
}

export async function takeRateLimits(
  buckets: readonly (readonly [key: string, limit: number])[],
  windowSeconds: number
): Promise<boolean> {
  const db = serviceClient()
  for (const [key, limit] of buckets) {
    const { data, error } = await db.rpc("recruitment_take_rate", {
      p_key: fingerprintRateKey(key),
      p_limit: limit,
      p_seconds: windowSeconds,
    })
    if (error) throw error
    if (!data) return false
  }
  return true
}
