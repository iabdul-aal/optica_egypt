import { createHmac } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { applicationSchema } from "@/lib/recruitment-validation"
import { boundedJson, sameOrigin } from "@/lib/http"
import { serviceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 }
    )
  let body: unknown
  try {
    body = await boundedJson(request)
  } catch {
    return NextResponse.json(
      { error: "Invalid or oversized application." },
      { status: 400 }
    )
  }
  const parsed = applicationSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json(
      {
        error:
          "Please check all required fields. Motivation must contain at least 30 characters."
      },
      { status: 400 }
    )
  try {
    const db = serviceClient()
    const ip = (
      request.headers.get("x-vercel-forwarded-for") ||
      request.headers.get("x-forwarded-for") ||
      "local"
    )
      .split(",")[0]
      .trim()
    const fingerprint = (value: string) =>
      createHmac("sha256", process.env.SUPABASE_SECRET_KEY!)
        .update(value)
        .digest("hex")
    for (const [value, limit] of [
      [`application-ip:${ip}`, 20],
      [`application-email:${parsed.data.email}`, 5]
    ] as const) {
      const { data, error } = await db.rpc("recruitment_take_rate", {
        p_key: fingerprint(value),
        p_limit: limit,
        p_seconds: 3600
      })
      if (error) throw error
      if (!data)
        return NextResponse.json(
          { error: "Too many attempts. Please try again in an hour." },
          { status: 429, headers: { "Retry-After": "3600" } }
        )
    }
    const { data, error } = await db.rpc("submit_recruitment", {
      p_data: parsed.data
    })
    if (error) throw error
    return NextResponse.json(
      { code: data },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    )
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not save your application. Your details remain in the form; please try again."
      },
      { status: 503 }
    )
  }
}
