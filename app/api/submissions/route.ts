import { createHmac } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { submissionSchema } from "@/lib/submissions-validation"
import { boundedJson, sameOrigin } from "@/lib/http"
import { isSupabaseConfigured, serviceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 }
    )
  }

  let body: unknown
  try {
    body = await boundedJson(request)
  } catch {
    return NextResponse.json(
      { error: "Invalid or oversized submission." },
      { status: 400 }
    )
  }

  const parsed = submissionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Check all required fields. Details must contain at least 10 characters.",
      },
      { status: 400 }
    )
  }

  if (!isSupabaseConfigured() || !process.env.SUPABASE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "Online intake is temporarily unavailable. Use info@optica-egypt.com directly while your form details remain preserved.",
      },
      { status: 503 }
    )
  }

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
      [`submission-ip:${ip}`, 20],
      [`submission-email:${parsed.data.email}`, 6],
    ] as const) {
      const { data: allowed, error: rateError } = await db.rpc(
        "recruitment_take_rate",
        {
          p_key: fingerprint(value),
          p_limit: limit,
          p_seconds: 3600,
        }
      )
      if (rateError) throw rateError
      if (!allowed) {
        return NextResponse.json(
          { error: "Too many attempts. Try again in an hour." },
          { status: 429, headers: { "Retry-After": "3600" } }
        )
      }
    }

    const { data: code, error } = await db.rpc("submit_intake", {
      p_data: {
        submissionId: parsed.data.submissionId,
        intent: parsed.data.intent,
        name: parsed.data.name,
        email: parsed.data.email,
        affiliation: parsed.data.affiliation,
        targetRef: parsed.data.targetRef,
        payload: {
          details: parsed.data.details,
          topicOrTrack: parsed.data.topicOrTrack || "",
          deadlineOrDate: parsed.data.deadlineOrDate || "",
          opticaId: parsed.data.opticaId || "",
        },
      },
    })

    if (error) throw error

    return NextResponse.json(
      { code },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    )
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not save your submission. Your details remain in the form; retry or write to info@optica-egypt.com.",
      },
      { status: 503 }
    )
  }
}
