"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Chapters", href: "/chapters" },
  { label: "Projects", href: "/projects" },
  { label: "Resources", href: "/resources" },
  { label: "Updates", href: "/updates" },
] as const

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

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

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  function isCurrent(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header className="site-header">
        <div className="container-layout header-inner">
          <Link href="/" className="brand-mark" aria-label="Optica Egypt Local Section">
            <svg
              viewBox="294 298 529 436"
              className="h-8 w-auto shrink-0 text-[var(--gold)]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M765.566 531.627 L765.566 533.24 C712.997 531.598 711.769 518.534 665.557 500.173 C635.294 488.148 601.442 480.039 568.774 479.203 C545.327 478.603 515.843 483.042 492.961 488.881 C442.324 501.804 415.357 531.147 360.691 518.723 L360.691 515.497 C374.242 512.235 391.45 509.331 404.243 505.012 C420.633 499.478 439.202 487.585 455.861 480.816 C513.989 457.196 571.722 450.123 631.683 472.751 C662.4 484.343 688.045 506.261 715.562 517.916 C732.908 525.263 747.316 527.87 765.566 531.627 Z" />
              <path d="M511.322 451.545 L506.757 328.665 L393.074 442.347 L513.884 301.58 L681.379 481.192 C681.379 481.192 598.277 429.45 511.322 451.545 Z" />
              <path d="M650.545 437.975 L695.297 391.386 L819.379 536.876 L714.832 504.675 L692.936 406.784 L655.609 443.333 Z" />
              <path d="M297.927 484.033 L353.813 420.968 L386.365 450.883 L345.446 494.438 L348.426 438.794 L299.138 486.272 Z" />
              <path d="M442.467 567.629 C461.305 520.793 507.104 488.849 559.191 488.849 C597.774 488.849 632.36 506.302 655.466 533.728 C655.466 533.728 689.729 575.252 740.859 574.501 L740.859 583.087 C740.859 583.087 702.485 589.664 664.23 601.53 C642.092 634.726 675.363 678.045 626.131 730.173 L624.518 611.614 C574.728 654.766 536.557 729.367 459.582 729.367 C445.487 729.367 433.018 729.019 421.274 719.689 C385.966 691.637 419.548 629.682 465.055 656.827 C486.928 669.875 466.021 701.982 449.25 699.017 C435.596 696.603 435.117 679.364 455.954 676.943 C451.73 660.047 430.854 664.867 425.306 676.943 C423.524 680.821 423.653 691.339 425.12 695.742 C432.732 718.576 464.663 715.041 482.997 710.04 C517.096 700.741 564.03 653.974 595.758 617.983 C581.858 621.419 567.602 624.161 556.681 625.494 C513.1 630.814 470.583 625.647 428.627 613.264 C411.28 608.145 394.373 600.762 376.595 597.273 C368.479 595.681 360.142 595.089 351.755 594.849 L339.499 569.663 C372.485 567.837 381.48 578.445 421.986 585.834 C476.209 595.726 516.776 598.378 557.223 593.891 C536.174 592.479 519.537 574.958 519.537 553.552 C519.537 542.653 523.85 532.762 530.861 525.491 C508.649 532.538 489.908 547.668 478.294 567.629 Z M589.797 526.259 C596.381 533.451 600.399 543.032 600.399 553.552 C600.399 571.215 589.072 586.232 573.287 591.737 C595.568 588.244 618.351 582.611 643.863 574.854 C633.169 552.222 613.661 534.539 589.797 526.259 Z" />
            </svg>
            <span className="brand-copy">
              <span className="brand-optica">Optica Egypt</span>
              <span className="brand-section">LOCAL SECTION</span>
            </span>
          </Link>

          <nav className="desktop-navigation" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={cn("nav-link", isCurrent(item.href) && "nav-link-current")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <Link href="/join" className="btn-primary desktop-join hidden md:inline-flex">
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
        className={cn(
          "mobile-navigation md:hidden",
          isOpen ? "mobile-navigation-open" : "mobile-navigation-closed"
        )}
      >
        <div className="container-layout mobile-navigation-list">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={cn("mobile-nav-link min-h-[48px]", isCurrent(item.href) && "text-[var(--gold)]")}
                onClick={() => {
                  if (pathname === item.href) setIsOpen(false)
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-[var(--line-subtle)] flex flex-wrap gap-2">
              <Link href="/about#governance" className="mobile-nav-sub-link min-h-[48px]" onClick={() => setIsOpen(false)}>
                Governance
              </Link>
              <Link href="/about#leadership" className="mobile-nav-sub-link min-h-[48px]" onClick={() => setIsOpen(false)}>
                Leadership
              </Link>
              <Link href="/about#press" className="mobile-nav-sub-link min-h-[48px]" onClick={() => setIsOpen(false)}>
                Press Kit
              </Link>
            </div>
            <Link
              href="/join"
              className="btn-primary mobile-join min-h-[48px]"
              onClick={() => {
                if (pathname === "/join") setIsOpen(false)
              }}
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
