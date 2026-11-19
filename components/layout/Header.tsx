"use client"

import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { BrandCrest } from "@/components/ui/BrandCrest"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"

interface NavLinkItem {
  label: string
  href: string
}

interface NavGroupItem {
  label: string
  items: readonly NavLinkItem[]
}

const NAV_GROUPS: readonly NavGroupItem[] = [
  {
    label: "Section",
    items: [
      { label: "About", href: "/about" },
      { label: "Governance", href: "/governance" },
      { label: "Leadership", href: "/leadership" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Chapters", href: "/chapters" },
      { label: "Fellowships", href: "/fellowships" },
      { label: "Outreach", href: "/outreach" },
      { label: "Volunteer", href: "/volunteer" },
    ],
  },
  {
    label: "Programs",
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Events", href: "/events" },
      { label: "Open-Source", href: "/open-source" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Updates", href: "/updates" },
      { label: "News", href: "/news" },
      { label: "Blogs", href: "/blogs" },
      { label: "Press", href: "/press" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null)
  const [suppressedGroup, setSuppressedGroup] = useState<string | null>(null)
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const desktopNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsOpen(false)
    setOpenDesktopGroup(null)
    setExpandedGroup(null)
  }, [pathname])

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        setOpenDesktopGroup(null)
      }
    }
    function handleOutsideClick(event: MouseEvent) {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setOpenDesktopGroup(null)
      }
    }
    window.addEventListener("keydown", closeOnEscape)
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      window.removeEventListener("keydown", closeOnEscape)
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  function isCurrent(href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
  }

  function isGroupActive(items: readonly NavLinkItem[]) {
    return items.some((item) => isCurrent(item.href))
  }

  return (
    <>
      <header className="site-header">
        <div className="container-layout header-inner">
          <Link href="/" className="brand-mark" aria-label="Optica Egypt Local Section">
            <BrandCrest className="h-8 w-auto shrink-0 text-[var(--gold)]" />
            <span className="brand-copy">
              <span className="brand-optica">Optica Egypt</span>
              <span className="brand-section">LOCAL SECTION</span>
            </span>
          </Link>

          <nav ref={desktopNavRef} className="desktop-navigation" aria-label="Main navigation">
            {NAV_GROUPS.map((group) => {
              const active = isGroupActive(group.items)
              const open = openDesktopGroup === group.label
              const suppressed = suppressedGroup === group.label
              const menuId = `desktop-submenu-${group.label.toLowerCase()}`
              return (
                <div
                  key={group.label}
                  className={cn(
                    "nav-group",
                    open && "nav-group-open",
                    suppressed && "nav-group-suppressed"
                  )}
                  onMouseLeave={() => {
                    setSuppressedGroup((cur) => (cur === group.label ? null : cur))
                    setOpenDesktopGroup((cur) => (cur === group.label ? null : cur))
                  }}
                >
                  <button
                    type="button"
                    className={cn("nav-link nav-group-trigger", active && "nav-link-current")}
                    aria-expanded={open}
                    aria-controls={menuId}
                    onClick={() => {
                      setSuppressedGroup(null)
                      setOpenDesktopGroup((cur) => (cur === group.label ? null : group.label))
                    }}
                  >
                    <span>{group.label}</span>
                    <ChevronDown size={13} aria-hidden="true" className="nav-group-chevron" />
                  </button>
                  <div
                    id={menuId}
                    className="nav-dropdown"
                    aria-label={`${group.label} submenu`}
                  >
                    {group.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        aria-current={isCurrent(sub.href) ? "page" : undefined}
                        onClick={(e) => {
                          setOpenDesktopGroup(null)
                          setSuppressedGroup(group.label)
                          e.currentTarget.blur()
                        }}
                        className={cn(
                          "nav-dropdown-link",
                          isCurrent(sub.href) && "nav-dropdown-link-current"
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <Link href="/join" className="btn-primary desktop-join">
              Join
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        inert={!isOpen || undefined}
        className={cn(
          "mobile-navigation",
          isOpen ? "mobile-navigation-open" : "mobile-navigation-closed"
        )}
      >
        <div className="container-layout mobile-navigation-list">
          <nav className="space-y-1" aria-label="Mobile navigation">
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={cn("mobile-nav-link min-h-[48px]", pathname === "/" && "text-[var(--gold)]")}
              onClick={() => {
                if (pathname === "/") setIsOpen(false)
              }}
            >
              Home
            </Link>

            {NAV_GROUPS.map((group) => {
              const expanded = expandedGroup === group.label
              const active = isGroupActive(group.items)
              return (
                <div key={group.label} className="mobile-nav-group">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setExpandedGroup(expanded ? null : group.label)}
                    className={cn(
                      "mobile-nav-link mobile-nav-group-toggle min-h-[48px]",
                      active && "mobile-nav-link-active"
                    )}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      size={15}
                      aria-hidden="true"
                      className={cn("mobile-nav-chevron", expanded && "mobile-nav-chevron-open")}
                    />
                  </button>
                  {expanded && (
                    <div className="mobile-nav-sub-list">
                      {group.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          aria-current={isCurrent(sub.href) ? "page" : undefined}
                          className={cn(
                            "mobile-nav-sub-link min-h-[48px]",
                            isCurrent(sub.href) && "mobile-nav-sub-link-current"
                          )}
                          onClick={() => {
                            if (pathname === sub.href) setIsOpen(false)
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <Link
              href="/join"
              className="btn-primary mobile-join min-h-[48px]"
              onClick={() => {
                if (pathname === "/join") setIsOpen(false)
              }}
            >
              Join
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
