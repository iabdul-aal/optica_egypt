"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export type HubKey = "section" | "community" | "programs" | "insights"

const HUB_CONFIG: Record<
  HubKey,
  { heading: string; tabs: readonly { label: string; href: string }[] }
> = {
  section: {
    heading: "Section Hub:",
    tabs: [
      { label: "About", href: "/about" },
      { label: "Governance", href: "/governance" },
      { label: "Leadership", href: "/leadership" },
      { label: "Partners", href: "/partners" },
    ],
  },
  community: {
    heading: "Community Hub:",
    tabs: [
      { label: "Chapters", href: "/chapters" },
      { label: "Fellowships", href: "/fellowships" },
      { label: "Outreach", href: "/outreach" },
      { label: "Volunteer", href: "/volunteer" },
    ],
  },
  programs: {
    heading: "Programs Hub:",
    tabs: [
      { label: "Projects", href: "/projects" },
      { label: "Events", href: "/events" },
      { label: "Open-Source", href: "/open-source" },
      { label: "Resources", href: "/resources" },
    ],
  },
  insights: {
    heading: "Insights Hub:",
    tabs: [
      { label: "Updates", href: "/updates" },
      { label: "News", href: "/news" },
      { label: "Blogs", href: "/blogs" },
      { label: "Press", href: "/press" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
}

function resolveHubFromPath(pathname: string): HubKey | null {
  for (const [key, config] of Object.entries(HUB_CONFIG) as [HubKey, (typeof HUB_CONFIG)[HubKey]][]) {
    if (
      config.tabs.some(
        (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`)
      )
    ) {
      return key
    }
  }
  return null
}

export function HubSubnav({ group }: { group?: HubKey }) {
  const pathname = usePathname()
  const activeGroup = group ?? resolveHubFromPath(pathname)
  if (!activeGroup) return null

  const config = HUB_CONFIG[activeGroup]

  return (
    <nav
      aria-label={`${config.heading.replace(":", "")} sub-navigation`}
      className="border-b border-[var(--line)] bg-[var(--surface-raised)]"
    >
      <div className="container-page flex items-center gap-2 overflow-x-auto py-1.5">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)] mr-2 shrink-0">
          {config.heading}
        </span>
        {config.tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex min-h-[48px] items-center rounded-sm px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors",
                isActive
                  ? "bg-[var(--gold)] text-[#15110a]"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--line-subtle)]"
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
