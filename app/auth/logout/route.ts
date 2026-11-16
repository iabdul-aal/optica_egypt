import { NextRequest, NextResponse } from "next/server"
import { sessionClient } from "@/lib/supabase/server"
import { sameOrigin } from "@/lib/http"
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return new NextResponse(null, { status: 403 })
  try {
    const db = await sessionClient()
    await db.auth.signOut()
  } catch {
    /* Allow logout redirect even when Supabase config is absent. */
  }
  return NextResponse.redirect(new URL("/admin/login", request.url), 303)
}
