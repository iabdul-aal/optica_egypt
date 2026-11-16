import { randomUUID } from "node:crypto"
import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { boundedJson, sameOrigin } from "@/lib/http"
import { getStaffIdentity } from "@/lib/staff"
import { publicConfig, serviceClient } from "@/lib/supabase/server"
import { takeAuthRate } from "@/lib/auth-rate"

export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 })
  let staff: Awaited<ReturnType<typeof getStaffIdentity>>
  try {
    staff = await getStaffIdentity()
  } catch {
    return NextResponse.json({ error: "Sign-in temporarily unavailable." }, { status: 503 })
  }
  if (!staff?.user.email)
    return NextResponse.json({ error: "Sign in to continue." }, { status: 401 })
  let body: unknown
  try { body = await boundedJson(request, 3000) } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
  const parsed = z.object({
    currentPassword: z.string().min(1).max(256),
    password: z.string().min(12).max(256).regex(/[a-zA-Z]/).regex(/[0-9]/)
  }).safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: "Use at least 12 characters with a letter and a number." }, { status: 400 })
  const { currentPassword, password } = parsed.data
  if (password === currentPassword)
    return NextResponse.json({ error: "Choose a different password from your temporary or current password." }, { status: 400 })
  try {
    if (!(await takeAuthRate(request, `password-change:${staff.user.id}`, 10)))
      return NextResponse.json({ error: "Too many attempts. Please try again in 10 minutes." }, { status: 429 })
    const { url, key } = publicConfig()
    const verifier = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
    const { data: verified, error: verifyError } = await verifier.auth.signInWithPassword({
      email: staff.user.email, password: currentPassword
    })
    if (verifyError || verified.user?.id !== staff.user.id)
      return NextResponse.json({ error: "Your current password is incorrect." }, { status: 400 })
    const admin = serviceClient()
    const { error } = await admin.auth.admin.updateUserById(staff.user.id, {
      password,
      app_metadata: {
        recruitment_password_change_required: false,
        recruitment_credential_version: randomUUID()
      }
    })
    if (error) throw error
    const { error: revokeError } = await verifier.auth.signOut({ scope: "global" })
    if (revokeError) throw revokeError
    const { error: sessionError } = await staff.db.auth.signInWithPassword({ email: staff.user.email, password })
    if (sessionError) throw sessionError
    return NextResponse.json({ saved: true }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ error: "Unable to finish updating your password. Try signing in with your new password if it was saved." }, { status: 503 })
  }
}
