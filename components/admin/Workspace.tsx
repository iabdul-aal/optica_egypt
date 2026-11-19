import Link from "next/link"
import { ArrowUpRight, LayoutDashboard, ShieldCheck, Users } from "lucide-react"
import type { StaffRole } from "@/lib/recruitment"

export function Workspace({
  role,
  email,
  activeSection = "applications",
  children,
}: {
  role: StaffRole
  email?: string
  activeSection?: "applications" | "submissions" | "staff"
  children: React.ReactNode
}) {
  const navItemClass = (section: "applications" | "submissions" | "staff") =>
    `flex min-h-12 items-center gap-3 rounded-sm border px-4 text-sm transition-colors ${
      activeSection === section
        ? "border-[var(--gold)] bg-[var(--surface)] text-[var(--gold)] font-semibold"
        : "border-transparent text-[var(--ink-soft)] hover:border-[var(--line)] hover:text-[var(--ink)]"
    }`

  return (
    <section className="min-h-screen border-t border-[var(--line)] bg-[var(--canvas)]">
      <div className="container-layout grid gap-8 py-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:h-fit">
          <div className="flex items-center gap-3">
            <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3">
              <ShieldCheck size={23} className="text-[var(--gold)]" />
            </div>
            <div>
              <p className="font-semibold">Optica Egypt</p>
              <p className="font-mono text-xs text-[var(--ink-faint)]">
                OPERATIONS
              </p>
            </div>
          </div>
          <nav
            aria-label="Recruitment workspace"
            className="flex flex-wrap gap-2 lg:flex-col"
          >
            <Link
              href="/admin"
              aria-current={activeSection === "applications" ? "page" : undefined}
              className={navItemClass("applications")}
            >
              <LayoutDashboard size={17} />
              Applications
            </Link>
            <Link
              href="/admin?queue=submissions"
              aria-current={activeSection === "submissions" ? "page" : undefined}
              className={navItemClass("submissions")}
            >
              <Users size={17} />
              Desk inquiries
            </Link>
            {role === "admin" && (
              <Link
                href="/admin/staff"
                aria-current={activeSection === "staff" ? "page" : undefined}
                className={navItemClass("staff")}
              >
                <Users size={17} />
                Team access
              </Link>
            )}
          </nav>
          <div className="hidden border-t border-[var(--line)] pt-5 lg:block">
            <p className="text-xs text-[var(--ink-faint)]">Signed in as</p>
            <p className="mt-1 break-all text-sm text-[var(--ink-soft)]">
              {email}
            </p>
            <span className="mt-3 inline-flex rounded-full border border-[var(--gold)] px-3 py-1 font-mono text-xs capitalize text-[var(--gold)]">
              {role}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-start">
            <Link
              href="/join"
              className="inline-flex min-h-12 items-center gap-2 text-sm text-[var(--ink-soft)] hover:text-[var(--gold)]"
            >
              View join hub <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/admin/change-password"
              className="inline-flex min-h-12 items-center text-sm text-[var(--ink-soft)] hover:text-[var(--gold)]"
            >
              Change password
            </Link>
            <form action="/auth/logout" method="post">
              <button className="min-h-12 text-sm text-[var(--ink-faint)] hover:text-[var(--ink)] cursor-pointer">
                Sign out
              </button>
            </form>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
