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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-[#fa8716] text-black font-mono font-bold text-xs uppercase tracking-wider"
      >
        {tc("skip_to_content")}
      </a>

      {/* Sleek Precision Engineering Top Bar (Akhetonics & Entor Tech Standard) */}
      <header className="sticky top-0 z-50 w-full bg-[#000000]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center shrink-0 pr-6" aria-label="Optica Egypt Home">
            <Image
              src="/assets/brand/egypt/logo/optica-egypt-logo.png"
              alt="Optica Egypt Local Section"
              width={150}
              height={42}
              className="h-8 md:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Centered Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {ROUTES.map(({ key, path }) => {
              const href = `/${locale}${path}`
              const active = pathname === href || (path !== "" && pathname.startsWith(href))
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "py-5 text-[11px] font-mono uppercase tracking-widest transition-colors relative",
                    active
                      ? "text-[#fa8716] font-bold"
                      : "text-slate-400 hover:text-white font-medium"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(key)}
                  {active && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#fa8716]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switch */}
            <Link
              href={otherPath}
              className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:text-[#fa8716] hover:border-[#fa8716] border border-white/10 transition-colors"
            >
              {tc("toggle_language")}
            </Link>

            <ThemeToggle />

            {/* Join CTA Button */}
            <Link
              href={`/${locale}/join`}
              className="btn-primary text-xs py-2 px-4"
            >
              <span>{t("join")}</span>
              <ArrowRight size={13} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 focus:outline-none"
              aria-label={mobileMenuOpen ? tc("close_menu") : tc("open_menu")}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Tablet Hamburger (hidden on lg & sm) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 focus:outline-none"
              aria-label={mobileMenuOpen ? tc("close_menu") : tc("open_menu")}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden w-full bg-[#000000] border-b border-white/10 p-6 shadow-2xl animate-in fade-in duration-150"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation links">
              {ROUTES.map(({ key, path }) => {
                const href = `/${locale}${path}`
                const active = pathname === href || (path !== "" && pathname.startsWith(href))
                return (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between border-b border-white/5",
                      active
                        ? "text-[#fa8716] font-bold bg-white/[0.03]"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.02]"
                    )}
                  >
                    <span>{t(key)}</span>
                    {active && <span className="text-[#fa8716] font-mono text-xs">{"//"} ACTIVE</span>}
                  </Link>
                )
              })}
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{locale === "en" ? "LOCALE" : "اللغة"}</span>
                <Link
                  href={otherPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono uppercase tracking-wider text-[#fa8716] px-3 py-1 border border-[#fa8716]/40"
                >
                  {tc("toggle_language")}
                </Link>
              </div>

              <Link
                href={`/${locale}/join`}
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary text-center py-2.5 w-full justify-center text-xs"
              >
                <span>{t("join")}</span>
                <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}