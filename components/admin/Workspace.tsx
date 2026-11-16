import Link from "next/link"
import { ArrowUpRight, LayoutDashboard, ShieldCheck, Users } from "lucide-react"
import type { StaffRole } from "@/lib/recruitment"

export function Workspace({
  role,
  email,
  children
}: {
  role: StaffRole
  email?: string
  children: React.ReactNode
}) {
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
                RECRUITMENT
              </p>
            </div>
          </div>
          <nav
            aria-label="Recruitment workspace"
            className="flex gap-2 lg:flex-col"
          >
            <Link
              href="/admin"
              className="flex min-h-12 items-center gap-3 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-4 text-sm"
            >
              <LayoutDashboard size={17} />
              Applications
            </Link>
            <Link
              href="/admin?queue=submissions"
              className="flex min-h-12 items-center gap-3 px-4 text-sm"
            >
              <Users size={17} />
              Desk inquiries
            </Link>
            {role === "admin" && (
              <Link
                href="/admin/staff"
                className="flex min-h-12 items-center gap-3 px-4 text-sm"
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
              className="inline-flex min-h-12 items-center gap-2 text-sm text-[var(--ink-soft)]"
            >
              View join hub <ArrowUpRight size={14} />
            </Link>
            <Link href="/admin/change-password" className="inline-flex min-h-12 items-center text-sm text-[var(--ink-soft)]">
              Change password
            </Link>
            <form action="/auth/logout" method="post">
              <button className="min-h-12 text-sm text-[var(--ink-faint)]">
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
