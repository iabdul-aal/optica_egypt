import { NextRequest, NextResponse } from "next/server"
import {
  NO_STORE_HEADERS,
  boundedJson,
  isAllowedPublicOrigin,
  publicCorsHeaders,
} from "@/lib/http"
import { logServerError } from "@/lib/logger"
import { extractClientIp, takeRateLimits } from "@/lib/rate-limit"
import { applicationSchema } from "@/lib/recruitment-validation"
import { isSupabaseConfigured, serviceClient } from "@/lib/supabase/server"

export async function OPTIONS(request: NextRequest) {
  if (!isAllowedPublicOrigin(request)) {
    return new NextResponse(null, { status: 403, headers: NO_STORE_HEADERS })
  }
  return new NextResponse(null, {
    status: 204,
    headers: publicCorsHeaders(request),
  })
}

export async function POST(request: NextRequest) {
  const headers = { ...NO_STORE_HEADERS, ...publicCorsHeaders(request) }
  if (!isAllowedPublicOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403, headers: NO_STORE_HEADERS }
    )
  }
  let body: unknown
  try {
    body = await boundedJson(request)
  } catch {
    return NextResponse.json(
      { error: "Invalid or oversized application." },
      { status: 400, headers }
    )
  }
  const parsed = applicationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Please check all required fields. Motivation must contain at least 30 characters.",
      },
      { status: 400, headers }
    )
  }
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "We could not save your application. Your details remain in the form; please try again.",
      },
      { status: 503, headers }
    )
  }
  try {
    const ip = extractClientIp(request)
    const allowed = await takeRateLimits(
      [
        [`application-ip:${ip}`, 20],
        [`application-email:${parsed.data.email}`, 5],
      ],
      3600
    )
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again in an hour." },
        { status: 429, headers: { "Retry-After": "3600", ...headers } }
      )
    }
    const db = serviceClient()
    const { data, error } = await db.rpc("submit_recruitment", {
      p_data: parsed.data,
    })
    if (error) throw error
    return NextResponse.json(
      { code: data },
      { status: 201, headers }
    )
  } catch (err) {
    logServerError("/api/recruitment", "submit_recruitment_failed", err, 503)
    return NextResponse.json(
      {
        error:
          "We could not save your application. Your details remain in the form; please try again.",
      },
      { status: 503, headers }
    )
  }
}
