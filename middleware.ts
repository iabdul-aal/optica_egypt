import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, possibleLocale] = pathname.split("/")

  if (possibleLocale === "en") return NextResponse.next()

  // Redirect Arabic paths to English equivalent
  if (possibleLocale === "ar") {
    const rest = pathname.slice(3) || "/"
    const destination = rest === "/" ? "/en" : `/en${rest}`
    return NextResponse.redirect(new URL(destination, request.url), 308)
  }

  // Redirect root and all non-locale paths to /en
  const destination = pathname === "/" ? "/en" : `/en${pathname}`
  return NextResponse.redirect(new URL(destination, request.url), 307)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ],
}
