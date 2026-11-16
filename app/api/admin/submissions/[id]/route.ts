import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getStaff } from "@/lib/staff"
import { canReview } from "@/lib/recruitment"
import { submissionReviewSchema } from "@/lib/submissions-validation"
import { boundedJson, sameOrigin } from "@/lib/http"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!sameOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 }
    )
  }

  let staff: Awaited<ReturnType<typeof getStaff>>
  try {
    staff = await getStaff()
  } catch {
    return NextResponse.json(
      { error: "Workspace temporarily unavailable." },
      { status: 503 }
    )
  }

  if (!staff) {
    return NextResponse.json({ error: "Sign in to continue." }, { status: 401 })
  }

  if (!canReview(staff.role)) {
    return NextResponse.json(
      { error: "Your role is read-only." },
      { status: 403 }
    )
  }

  const { id } = await params
  if (!z.uuid().safeParse(id).success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 })
  }

  let body: unknown
  try {
    body = await boundedJson(request)
  } catch {
    return NextResponse.json({ error: "Invalid review." }, { status: 400 })
  }

  const parsed = submissionReviewSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the review fields." },
      { status: 400 }
    )
  }

  const { error } = await staff.db.rpc("review_submission", {
    p_id: id,
    p_status: parsed.data.status,
    p_note: parsed.data.note,
    p_version: parsed.data.version,
  })

  if (error) {
    return NextResponse.json(
      {
        error:
          error.code === "PT409"
            ? "Submission updated by another officer. Refresh before saving."
            : "Unable to save this review.",
      },
      { status: error.code === "PT409" ? 409 : 400 }
    )
  }

  return NextResponse.json({ saved: true })
}
