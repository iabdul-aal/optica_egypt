import { NextRequest, NextResponse } from "next/server"
import {
  NO_STORE_HEADERS,
  boundedJson,
  isAllowedPublicOrigin,
  publicCorsHeaders,
} from "@/lib/http"
import { logServerError } from "@/lib/logger"
import { extractClientIp, takeRateLimits } from "@/lib/rate-limit"
import { submissionSchema } from "@/lib/submissions-validation"
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
      { error: "Invalid or oversized submission." },
      { status: 400, headers }
    )
  }

  const parsed = submissionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Check all required fields. Details must contain at least 10 characters.",
      },
      { status: 400, headers }
    )
  }

  if (!isSupabaseConfigured() || !process.env.SUPABASE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "Online intake is temporarily unavailable. Use info@optica-egypt.com directly while your form details remain preserved.",
      },
      { status: 503, headers }
    )
  }

  try {
    const ip = extractClientIp(request)
    const allowed = await takeRateLimits(
      [
        [`submission-ip:${ip}`, 20],
        [`submission-email:${parsed.data.email}`, 6],
      ],
      3600
    )
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Try again in an hour." },
        { status: 429, headers: { "Retry-After": "3600", ...headers } }
      )
    }

    const optionalPayload = Object.fromEntries(
      Object.entries({
        foundingMemberCount: parsed.data.foundingMemberCount,
        facultyAdvisorName: parsed.data.facultyAdvisorName,
        partnershipScope: parsed.data.partnershipScope,
        targetTimeline: parsed.data.targetTimeline,
        sessionTitle: parsed.data.sessionTitle,
        sessionFormat: parsed.data.sessionFormat,
        preferredDate: parsed.data.preferredDate,
        eventName: parsed.data.eventName,
        attendanceMode: parsed.data.attendanceMode,
        coverageSubject: parsed.data.coverageSubject,
        publicationDeadline: parsed.data.publicationDeadline,
        inquirySubject: parsed.data.inquirySubject,
        topicOrTrack: parsed.data.topicOrTrack,
        deadlineOrDate: parsed.data.deadlineOrDate,
        opticaId: parsed.data.opticaId,
      }).filter(([, value]) => Boolean(value))
    )

    const db = serviceClient()
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
          ...optionalPayload,
        },
      },
    })

    if (error) throw error

    return NextResponse.json(
      { code },
      { status: 201, headers }
    )
  } catch (err) {
    logServerError("/api/submissions", "submit_intake_failed", err, 503)
    return NextResponse.json(
      {
        error:
          "Could not save your submission. Your details remain in the form; retry or write to info@optica-egypt.com.",
      },
      { status: 503, headers }
    )
  }
}
