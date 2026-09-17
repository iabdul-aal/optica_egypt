"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const otherLocale = locale === "en" ? "ar" : "en"
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-[var(--accent-secondary)] text-[#09131F] font-bold rounded-md shadow-lg outline-none focus:ring-2 focus:ring-[#00ADEF]"
      >
        {tc("skip_to_content")}
      </a>

      <header
        style={{ borderBottom: "1px solid var(--border)", background: "var(--background)" }}
        className="sticky top-0 z-50 backdrop-blur-md bg-opacity-95"
      >
        <div className="container-page flex items-center justify-between py-3 gap-4">
          {/* Brand Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0" aria-label="Optica Egypt Home">
            <Image
              src="/assets/brand/egypt/logo/optica-egypt-logo.png"
              alt="Optica Egypt Local Section"
              width={140}
              height={44}
              className="h-9 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {ROUTES.map(({ key, path }) => {
              const href = `/${locale}${path}`
              const active = pathname === href || (path !== "" && pathname.startsWith(href))
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group",
                    active
                      ? "text-[var(--accent-secondary)] bg-[var(--accent-gold-muted)] font-semibold"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(key)}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--accent-secondary)] transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100",
                      active && "scale-x-100",
                      locale === "ar" && "origin-right"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href={otherPath}
              className="text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--accent-secondary)] transition-colors px-2 py-1.5 rounded-md hover:bg-[var(--surface)]"
              aria-label="Toggle language"
            >
              {tc("toggle_language")}
            </Link>
            <ThemeToggle />
            <Link href={`/${locale}/join`} className="btn-primary text-sm py-2 px-4 shadow-sm">
              {t("join")}
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label={mobileMenuOpen ? tc("close_menu") : tc("open_menu")}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Tablet Hamburger (hidden on lg and sm) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label={mobileMenuOpen ? tc("close_menu") : tc("open_menu")}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-x-0 top-[61px] bottom-0 z-40 bg-[var(--background)]/98 backdrop-blur-lg border-b border-[var(--border)] overflow-y-auto p-6 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation links">
              {ROUTES.map(({ key, path }) => {
                const href = `/${locale}${path}`
                const active = pathname === href || (path !== "" && pathname.startsWith(href))
                return (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between",
                      active
                        ? "text-[var(--accent-secondary)] bg-[var(--accent-gold-muted)] font-semibold"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{t(key)}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />}
                  </Link>
                )
              })}
            </nav>

            <div className="pt-6 border-t border-[var(--border)] flex flex-col gap-4 mt-6">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm text-[var(--foreground-muted)]">{locale === "en" ? "Language" : "اللغة"}</span>
                <Link
                  href={otherPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[var(--accent-secondary)] px-3 py-1.5 rounded-md bg-[var(--surface)]"
                >
                  {tc("toggle_language")}
                </Link>
              </div>

              <Link
                href={`/${locale}/join`}
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary text-center py-3 w-full justify-center text-base"
              >
                {t("join")}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}