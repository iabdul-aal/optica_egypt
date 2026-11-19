import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { NO_STORE_HEADERS, boundedJson, sameOrigin } from "@/lib/http"
import { logServerError } from "@/lib/logger"
import { roles } from "@/lib/recruitment"
import { getStaff } from "@/lib/staff"

export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403, headers: NO_STORE_HEADERS }
    )
  let staff: Awaited<ReturnType<typeof getStaff>>
  try {
    staff = await getStaff()
  } catch (err) {
    logServerError("/api/admin/staff", "get_staff_failed", err, 503)
    return NextResponse.json(
      { error: "Workspace temporarily unavailable." },
      { status: 503, headers: NO_STORE_HEADERS }
    )
  }
  if (!staff)
    return NextResponse.json(
      { error: "Sign in to continue." },
      { status: 401, headers: NO_STORE_HEADERS }
    )
  if (staff.role !== "admin")
    return NextResponse.json(
      { error: "Administrator access required." },
      { status: 403, headers: NO_STORE_HEADERS }
    )
  let body: unknown
  try {
    body = await boundedJson(request)
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }
  const parsed = z
    .object({ email: z.email().max(254), role: z.enum(roles).nullable() })
    .safeParse(body)
  if (!parsed.success)
    return NextResponse.json(
      { error: "Check the email and role." },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  const { error } = await staff.db.rpc("set_recruitment_staff", {
    p_email: parsed.data.email,
    p_role: parsed.data.role,
  })
  if (error) {
    const knownMessages = [
      "Create this staff user in Supabase Authentication first.",
      "The last administrator cannot be removed.",
    ]
    if (!knownMessages.includes(error.message)) {
      logServerError("/api/admin/staff", "set_recruitment_staff_failed", error, 400)
    }
    return NextResponse.json(
      {
        error: knownMessages.includes(error.message)
          ? error.message
          : "Unable to change staff access.",
      },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }
  return NextResponse.json({ saved: true }, { headers: NO_STORE_HEADERS })
}
