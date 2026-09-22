"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const INSIGHTS_TABS = [
  { label: "News and Announcements", href: "/news" },
  { label: "Blogs and Perspectives", href: "/blogs" },
  { label: "Photo Gallery", href: "/gallery" },
]

export function InsightsNav() {
  const pathname = usePathname()

  return (
    <div className="border-b border-[var(--line)] bg-[var(--surface-raised)]">
      <div className="container-page flex items-center gap-2 overflow-x-auto py-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)] mr-2 shrink-0">
          Insights Hub:
        </span>
        {INSIGHTS_TABS.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "rounded-sm px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
                isActive
                  ? "bg-[var(--gold)] text-[#09131F]"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--line-subtle)]"
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
