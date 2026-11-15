import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getStaff } from "@/lib/staff"
import { roles } from "@/lib/recruitment"
import { boundedJson, sameOrigin } from "@/lib/http"

export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 }
    )
  const staff = await getStaff()
  if (!staff)
    return NextResponse.json({ error: "Sign in to continue." }, { status: 401 })
  if (staff.role !== "admin")
    return NextResponse.json(
      { error: "Administrator access required." },
      { status: 403 }
    )
  let body: unknown
  try {
    body = await boundedJson(request)
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
  const parsed = z
    .object({ email: z.email().max(254), role: z.enum(roles).nullable() })
    .safeParse(body)
  if (!parsed.success)
    return NextResponse.json(
      { error: "Check the email and role." },
      { status: 400 }
    )
  const { error } = await staff.db.rpc("set_recruitment_staff", {
    p_email: parsed.data.email,
    p_role: parsed.data.role
  })
  if (error)
    return NextResponse.json(
      {
        error: [
          "Create this staff user in Supabase Authentication first.",
          "The last administrator cannot be removed."
        ].includes(error.message)
          ? error.message
          : "Unable to change staff access."
      },
      { status: 400 }
    )
  return NextResponse.json({ saved: true })
}
