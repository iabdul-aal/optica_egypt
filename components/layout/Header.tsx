"use client"

import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { localizedHref, type Dictionary, type Locale } from "@/lib/locales"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

type HeaderProps = {
  locale: Locale
  dictionary: Dictionary
}

// Single direct links (no dropdown)
type DirectNavItem = {
  kind: "direct"
  key: keyof Dictionary["nav"]
  path: string
}

// Grouped links with a dropdown panel
type GroupNavItem = {
  kind: "group"
  labelKey: keyof Dictionary["nav"]
  items: { key: keyof Dictionary["nav"]; path: string }[]
}

type NavItem = DirectNavItem | GroupNavItem

const navConfig: NavItem[] = [
  {
    kind: "group",
    labelKey: "groupAbout",
    items: [
      { key: "about", path: "/about" },
      { key: "leadership", path: "/leadership" },
    ],
  },
  {
    kind: "group",
    labelKey: "groupCommunity",
    items: [
      { key: "community", path: "/community" },
      { key: "outreach", path: "/outreach" },
    ],
  },
  {
    kind: "group",
    labelKey: "groupProgram",
    items: [
      { key: "events", path: "/events" },
      { key: "resources", path: "/resources" },
    ],
  },
  { kind: "direct", key: "news", path: "/news" },
]

export function Header({ locale, dictionary }: HeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  // Track which mobile group is expanded
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(false)
    setExpandedGroup(null)
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

  function isGroupActive(items: { path: string }[]) {
    return items.some((item) => isCurrent(item.path))
  }

  return (
    <header className="site-header">
      <div className="container-layout header-inner">
        <Link href={localizedHref(locale)} className="brand-mark" aria-label={dictionary.site.name}>
          <span className="brand-marker" aria-hidden="true" />
          <span className="brand-copy">
            <span className="brand-optica">Optica Egypt</span>
            <span className="brand-section">LOCAL SECTION</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navConfig.map((item) => {
            if (item.kind === "direct") {
              return (
                <Link
                  key={item.path}
                  href={localizedHref(locale, item.path)}
                  aria-current={isCurrent(item.path) ? "page" : undefined}
                  className={cn("nav-link", isCurrent(item.path) && "nav-link-current")}
                >
                  {dictionary.nav[item.key]}
                </Link>
              )
            }

            // Group with dropdown
            const active = isGroupActive(item.items)
            return (
              <div key={item.labelKey} className="nav-group">
                <button
                  type="button"
                  className={cn("nav-link nav-group-trigger", active && "nav-link-current")}
                  aria-haspopup="true"
                >
                  {dictionary.nav[item.labelKey]}
                  <ChevronDown size={11} aria-hidden="true" className="nav-group-chevron" />
                </button>
                <div className="nav-dropdown" role="menu">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.path}
                      href={localizedHref(locale, sub.path)}
                      role="menuitem"
                      aria-current={isCurrent(sub.path) ? "page" : undefined}
                      className={cn("nav-dropdown-link", isCurrent(sub.path) && "nav-dropdown-link-current")}
                    >
                      {dictionary.nav[sub.key]}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
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

      {/* Mobile navigation */}
      {isOpen && (
        <div id="mobile-navigation" className="mobile-navigation" ref={mobileRef}>
          <nav className="container-layout mobile-navigation-list" aria-label="Mobile navigation">
            <Link
              href={localizedHref(locale)}
              className="mobile-nav-link"
              aria-current={isCurrent("/") ? "page" : undefined}
            >
              {dictionary.nav.home}
            </Link>

            {navConfig.map((item) => {
              if (item.kind === "direct") {
                return (
                  <Link
                    key={item.path}
                    href={localizedHref(locale, item.path)}
                    className="mobile-nav-link"
                    aria-current={isCurrent(item.path) ? "page" : undefined}
                  >
                    {dictionary.nav[item.key]}
                  </Link>
                )
              }

              // Group accordion
              const groupKey = item.labelKey
              const isExpanded = expandedGroup === groupKey
              return (
                <div key={groupKey} className="mobile-nav-group">
                  <button
                    type="button"
                    className={cn(
                      "mobile-nav-link mobile-nav-group-toggle",
                      isGroupActive(item.items) && "mobile-nav-link-active"
                    )}
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedGroup(isExpanded ? null : groupKey)}
                  >
                    {dictionary.nav[groupKey]}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={cn("mobile-nav-chevron", isExpanded && "mobile-nav-chevron-open")}
                    />
                  </button>
                  {isExpanded && (
                    <div className="mobile-nav-sub-list">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.path}
                          href={localizedHref(locale, sub.path)}
                          className={cn("mobile-nav-sub-link", isCurrent(sub.path) && "mobile-nav-sub-link-current")}
                          aria-current={isCurrent(sub.path) ? "page" : undefined}
                        >
                          {dictionary.nav[sub.key]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <div className="flex items-center justify-between py-3 border-b border-[var(--line-subtle)] my-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">Theme</span>
              <ThemeToggle />
            </div>

            <Link href={localizedHref(locale, "/join")} className="btn-primary mobile-join">
              {dictionary.nav.join}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
