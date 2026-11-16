import "server-only"
import { createHmac } from "node:crypto"
import type { NextRequest } from "next/server"
import { serviceClient } from "@/lib/supabase/server"

export async function takeAuthRate(request: NextRequest, action: string, limit: number) {
  const db = serviceClient()
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  for (const [key, max] of [[action, limit], [`auth-ip:${ip}`, 60]] as const) {
    const hash = createHmac("sha256", process.env.SUPABASE_SECRET_KEY!).update(key).digest("hex")
    const { data, error } = await db.rpc("recruitment_take_rate", {
      p_key: hash, p_limit: max, p_seconds: 600
    })
    if (error) throw error
    if (!data) return false
  }
  return true
}
