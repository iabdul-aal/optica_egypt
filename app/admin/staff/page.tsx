import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { requireStaff } from "@/lib/staff"
import { Workspace } from "@/components/admin/Workspace"
import { StaffForm } from "@/components/admin/StaffForm"
export const metadata: Metadata = {
  title: "Recruitment Team Access",
  robots: { index: false, follow: false }
}
export const dynamic = "force-dynamic"
export default async function StaffPage() {
  const staff = await requireStaff()
  if (staff.role !== "admin") redirect("/admin")
  const { data, error } = await staff.db
    .from("recruitment_staff")
    .select("user_id,email,role")
    .order("created_at")
  if (error) throw new Error("Unable to load staff")
  return (
    <Workspace role={staff.role} email={staff.user.email}>
      <p className="eyebrow">Administration</p>
      <h1 className="mt-2 text-3xl font-semibold">
        The team behind the chapter.
      </h1>
      <p className="mt-3 text-sm text-[var(--ink-soft)]">
        Admin: team access and reviews. Recruiter: reviews. Viewer: read-only
        monitoring.
      </p>
      <div className="mt-8 grid items-start gap-7 xl:grid-cols-2">
        <div className="site-card overflow-hidden">
          <h2 className="border-b border-[var(--line)] p-6 text-lg font-semibold">
            Staff members
          </h2>
          {data?.map((member) => (
            <div
              key={member.user_id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] p-5 last:border-0"
            >
              <span className="break-all text-sm">{member.email}</span>
              <span className="font-mono text-xs uppercase text-[var(--gold)]">
                {member.role}
              </span>
            </div>
          ))}
        </div>
        <StaffForm />
      </div>
    </Workspace>
  )
}
