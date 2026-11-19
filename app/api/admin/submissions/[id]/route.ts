import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { NO_STORE_HEADERS, boundedJson, sameOrigin } from "@/lib/http"
import { logServerError } from "@/lib/logger"
import { canReview } from "@/lib/recruitment"
import { getStaff } from "@/lib/staff"
import { submissionReviewSchema } from "@/lib/submissions-validation"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!sameOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403, headers: NO_STORE_HEADERS }
    )
  }

  let staff: Awaited<ReturnType<typeof getStaff>>
  try {
    staff = await getStaff()
  } catch (err) {
    logServerError("/api/admin/submissions/[id]", "get_staff_failed", err, 503)
    return NextResponse.json(
      { error: "Workspace temporarily unavailable." },
      { status: 503, headers: NO_STORE_HEADERS }
    )
  }

  if (!staff) {
    return NextResponse.json(
      { error: "Sign in to continue." },
      { status: 401, headers: NO_STORE_HEADERS }
    )
  }

  if (!canReview(staff.role)) {
    return NextResponse.json(
      { error: "Your role is read-only." },
      { status: 403, headers: NO_STORE_HEADERS }
    )
  }

  const { id } = await params
  if (!z.uuid().safeParse(id).success) {
    return NextResponse.json(
      { error: "Invalid submission." },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }

  let body: unknown
  try {
    body = await boundedJson(request)
  } catch {
    return NextResponse.json(
      { error: "Invalid review." },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }

  const parsed = submissionReviewSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the review fields." },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }

  const { error } = await staff.db.rpc("review_submission", {
    p_id: id,
    p_status: parsed.data.status,
    p_note: parsed.data.note,
    p_version: parsed.data.version,
  })

  if (error) {
    if (error.code !== "PT409") {
      logServerError("/api/admin/submissions/[id]", "review_submission_failed", error, 400)
    }
    return NextResponse.json(
      {
        error:
          error.code === "PT409"
            ? "Submission updated by another officer. Refresh before saving."
            : "Unable to save this review.",
      },
      { status: error.code === "PT409" ? 409 : 400, headers: NO_STORE_HEADERS }
    )
  }

  return NextResponse.json({ saved: true }, { headers: NO_STORE_HEADERS })
}
