import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, possibleLocale] = pathname.split("/")

  if (possibleLocale === "en") return NextResponse.next()

  // Redirect root and non-prefixed paths to /en
  const destination = pathname === "/" ? "/en" : `/en${pathname}`
  return NextResponse.redirect(new URL(destination, request.url), 307)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ],
}
