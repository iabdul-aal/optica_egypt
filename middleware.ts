import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/en" || pathname === "/ar") {
    return NextResponse.redirect(new URL("/", request.url), 308)
  }

  if (pathname.startsWith("/en/") || pathname.startsWith("/ar/")) {
    const cleanPath = pathname.replace(/^\/(en|ar)/, "")
    return NextResponse.redirect(new URL(cleanPath || "/", request.url), 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
