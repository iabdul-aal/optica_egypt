import { NextRequest, NextResponse } from "next/server"
import { NO_STORE_HEADERS } from "@/lib/http"
import { logServerError } from "@/lib/logger"
import { isSupabaseConfigured, serviceClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const configured = Boolean(isSupabaseConfigured() && process.env.SUPABASE_SECRET_KEY)
  const deep = request.nextUrl.searchParams.get("deep") === "1"

  if (!deep || !configured) {
    return NextResponse.json(
      {
        status: "ok",
        service: "optica-egypt",
        database: configured ? "configured" : "unconfigured",
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: NO_STORE_HEADERS }
    )
  }

  try {
    const db = serviceClient()
    const { error } = await db
      .from("recruitment_staff")
      .select("user_id", { count: "exact", head: true })
    if (error) throw error

    return NextResponse.json(
      {
        status: "ok",
        service: "optica-egypt",
        database: "reachable",
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: NO_STORE_HEADERS }
    )
  } catch (err) {
    logServerError("/api/health", "database_probe_failed", err, 503)
    return NextResponse.json(
      {
        status: "degraded",
        service: "optica-egypt",
        database: "unreachable",
        timestamp: new Date().toISOString(),
      },
      { status: 503, headers: NO_STORE_HEADERS }
    )
  }
}
