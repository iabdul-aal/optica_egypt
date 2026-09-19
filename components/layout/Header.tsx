"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { localizedHref, type Dictionary, type Locale } from "@/lib/locales"
import { cn } from "@/lib/utils"

type HeaderProps = {
  locale: Locale
  dictionary: Dictionary
}

const navigation = [
  ["about", "/about"],
  ["community", "/community"],
  ["events", "/events"],
  ["leadership", "/leadership"],
  ["outreach", "/outreach"],
  ["resources", "/resources"],
] as const

export function Header({ locale, dictionary }: HeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const nextLocale: Locale = locale === "en" ? "ar" : "en"

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [])

  function isCurrent(path: string) {
    const href = localizedHref(locale, path)
    return pathname === href || (path !== "/" && pathname.startsWith(`${href}/`))
  }

  const unlocalizedPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, "") || "/"

  return (
    <header className="site-header">
      <div className="container-layout header-inner">
        <Link href={localizedHref(locale)} className="brand-mark" aria-label={dictionary.site.name}>
          <span className="brand-marker" aria-hidden="true" />
          <span className="brand-copy">
            <span className="brand-optica">Optica Egypt</span>
            <span className="brand-section">{locale === "ar" ? "قسم محلي" : "LOCAL SECTION"}</span>
          </span>
        </Link>

        <nav className="desktop-navigation" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
          {navigation.map(([key, path]) => (
            <Link
              key={path}
              href={localizedHref(locale, path)}
              aria-current={isCurrent(path) ? "page" : undefined}
              className={cn("nav-link", isCurrent(path) && "nav-link-current")}
            >
              {dictionary.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="language-link" href={localizedHref(nextLocale, unlocalizedPath)} lang={nextLocale}>
            {dictionary.nav.language}
          </Link>
          <Link href={localizedHref(locale, "/join")} className="btn-primary desktop-join">
            {dictionary.nav.join}
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? dictionary.common.closeMenu : dictionary.common.openMenu}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="mobile-navigation">
          <nav className="container-layout mobile-navigation-list" aria-label={locale === "ar" ? "التنقل على الهاتف" : "Mobile navigation"}>
            <Link href={localizedHref(locale)} className="mobile-nav-link" aria-current={isCurrent("/") ? "page" : undefined}>{dictionary.nav.home}</Link>
            {navigation.map(([key, path]) => (
              <Link key={path} href={localizedHref(locale, path)} className="mobile-nav-link" aria-current={isCurrent(path) ? "page" : undefined}>
                {dictionary.nav[key]}
              </Link>
            ))}
            <Link href={localizedHref(locale, "/join")} className="btn-primary mobile-join">{dictionary.nav.join}</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
