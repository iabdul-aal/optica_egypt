import "server-only"
import type { NextRequest } from "next/server"
import { extractClientIp, takeRateLimits } from "@/lib/rate-limit"

export async function takeAuthRate(request: NextRequest, action: string, limit: number) {
  const ip = extractClientIp(request)
  return takeRateLimits(
    [
      [action, limit],
      [`auth-ip:${ip}`, 60],
    ],
    600
  )
}
