"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowRight } from "lucide-react"

const ROUTES = [
  { key: "home",       path: "" },
  { key: "about",      path: "/about" },
  { key: "events",     path: "/events" },
  { key: "community",  path: "/community" },
  { key: "leadership", path: "/leadership" },
  { key: "outreach",   path: "/outreach" },
  { key: "resources",  path: "/resources" },
] as const

export function Header() {
  const t = useTranslations("nav")
  const tc = useTranslations("common")
  const locale = useLocale()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const otherLocale = locale === "en" ? "ar" : "en"
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-[var(--accent-secondary)] text-[#010E17] font-bold rounded-full shadow-xl"
      >
        {tc("skip_to_content")}
      </a>

      {/* Modern Floating Header Bar (Entor Tech & Akhetonics inspired) */}
      <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-2.5 rounded-full bg-[#010E17]/85 dark:bg-[#010E17]/85 backdrop-blur-xl border border-[#D4AF37]/25 shadow-2xl transition-all">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center shrink-0 pr-4" aria-label="Optica Egypt Home">
            <Image
              src="/assets/brand/egypt/logo/optica-egypt-logo.png"
              alt="Optica Egypt Local Section"
              width={160}
              height={48}
              className="h-9 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Centered Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {ROUTES.map(({ key, path }) => {
              const href = `/${locale}${path}`
              const active = pathname === href || (path !== "" && pathname.startsWith(href))
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200",
                    active
                      ? "text-[#D4AF37] bg-[rgba(212,175,55,0.15)] shadow-inner"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(key)}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switch Pill */}
            <Link
              href={otherPath}
              className="px-3 py-1 rounded-full text-xs font-bold text-slate-300 hover:text-[#D4AF37] hover:bg-white/5 border border-white/10 transition-colors"
            >
              {tc("toggle_language")}
            </Link>

            <ThemeToggle />

            {/* Join CTA Pill Button */}
            <Link
              href={`/${locale}/join`}
              className="btn-primary text-xs py-2 px-5"
            >
              <span>{t("join")}</span>
              <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label={mobileMenuOpen ? tc("close_menu") : tc("open_menu")}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Tablet Hamburger (hidden on lg & sm) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label={mobileMenuOpen ? tc("close_menu") : tc("open_menu")}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Akhetonics-inspired Hairline Glow Line */}
        <div className="max-w-7xl mx-auto mt-2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-[#010E17]/95 backdrop-blur-2xl border border-[#D4AF37]/30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
            role="dialog"
            aria-modal="true"
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
                      "px-4 py-3 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-between",
                      active
                        ? "text-[#D4AF37] bg-[rgba(212,175,55,0.15)]"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{t(key)}</span>
                    {active && <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                  </Link>
                )
              })}
            </nav>

            <div className="pt-5 border-t border-white/10 flex flex-col gap-3 mt-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-slate-400">{locale === "en" ? "Language" : "اللغة"}</span>
                <Link
                  href={otherPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#D4AF37] px-3 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30"
                >
                  {tc("toggle_language")}
                </Link>
              </div>

              <Link
                href={`/${locale}/join`}
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary text-center py-3 w-full justify-center text-sm"
              >
                <span>{t("join")}</span>
                <ArrowRight size={16} className={locale === "ar" ? "rotate-180" : ""} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}