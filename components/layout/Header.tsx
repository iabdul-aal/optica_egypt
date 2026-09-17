"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"

const ROUTES = [
  { key: "home",       path: "" },
  { key: "about",      path: "/about" },
  { key: "events",     path: "/events" },
  { key: "community",  path: "/community" },
  { key: "leadership", path: "/leadership" },
  { key: "outreach",   path: "/outreach" },
  { key: "resources",  path: "/resources" },
  { key: "join",       path: "/join" },
] as const

export function Header() {
  const t = useTranslations("nav")
  const tc = useTranslations("common")
  const locale = useLocale()
  const pathname = usePathname()
  const otherLocale = locale === "en" ? "ar" : "en"
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--background)" }} className="sticky top-0 z-50 backdrop-blur-sm">
      <div className="container-page flex items-center justify-between py-3 gap-6">
        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <Image
            src="/assets/brand/egypt/logo/optica-egypt-logo.png"
            alt="Optica Egypt Local Section"
            width={120}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {ROUTES.map(({ key, path }) => {
            const href = `/${locale}${path}`
            const active = pathname === href || (path !== "" && pathname.startsWith(href))
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "text-[var(--accent-secondary)] bg-[var(--accent-gold-muted)]"
                    : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                )}
              >
                {t(key)}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link href={otherPath} className="text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--accent-secondary)] transition-colors px-2 py-1">
            {tc("toggle_language")}
          </Link>
          <ThemeToggle />
          <Link href={`/${locale}/join`} className="btn-primary hidden sm:inline-flex text-sm py-2 px-4">
            {t("join")}
          </Link>
        </div>
      </div>
    </header>
  )
}