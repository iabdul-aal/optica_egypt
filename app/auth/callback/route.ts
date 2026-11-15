import { NextRequest, NextResponse } from "next/server"
import { sessionClient } from "@/lib/supabase/server"
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  if (code) {
    const db = await sessionClient()
    const { error } = await db.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL("/admin", request.url))
  }
  return NextResponse.redirect(new URL("/admin/login?error=link", request.url))
}
