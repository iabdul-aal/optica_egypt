import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = new Set(["en", "ar"])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, possibleLocale] = pathname.split("/")

  if (locales.has(possibleLocale)) return NextResponse.next()

  const destination = pathname === "/" ? "/en" : `/en${pathname}`
  return NextResponse.redirect(new URL(destination, request.url), 307)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
