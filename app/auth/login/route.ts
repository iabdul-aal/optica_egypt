import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sessionClient, serviceClient } from "@/lib/supabase/server"
import { boundedJson, sameOrigin } from "@/lib/http"
import { takeAuthRate } from "@/lib/auth-rate"

export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 })
  let body: unknown
  try { body = await boundedJson(request, 2000) } catch {
    return NextResponse.json({ error: "Invalid sign-in details." }, { status: 400 })
  }
  const result = z.object({
    email: z.email().max(254), password: z.string().min(1).max(256)
  }).safeParse(body)
  if (!result.success)
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 })
  try {
    const email = result.data.email.toLowerCase().trim()
    if (!(await takeAuthRate(request, `password-login:${email}`, 10)))
      return NextResponse.json({ error: "Too many attempts. Please try again in 10 minutes." }, { status: 429 })
    const auth = await sessionClient()
    const { data, error } = await auth.auth.signInWithPassword({ email, password: result.data.password })
    if (error || !data.user)
      return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 })
    const { data: staff, error: staffError } = await serviceClient()
      .from("recruitment_staff").select("user_id").eq("user_id", data.user.id).maybeSingle()
    if (staffError) throw staffError
    if (!staff) {
      await auth.auth.signOut()
      return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 })
    }
    return NextResponse.json({
      redirect: data.user.app_metadata.recruitment_password_change_required === true
        ? "/admin/change-password" : "/admin"
    }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ error: "Sign-in temporarily unavailable." }, { status: 503 })
  }
}
