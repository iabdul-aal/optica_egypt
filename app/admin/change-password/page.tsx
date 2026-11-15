import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getStaffIdentity } from "@/lib/staff"
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm"

export const metadata: Metadata = {
  title: "Change Your Password", robots: { index: false, follow: false }
}
export const dynamic = "force-dynamic"

export default async function ChangePasswordPage() {
  const staff = await getStaffIdentity()
  if (!staff) redirect("/admin/login")
  return (
    <section className="section-space"><div className="container-page">
      <div className="site-card mx-auto max-w-md p-7 sm:p-10">
        <p className="eyebrow">Secure your account</p>
        <h1 className="mt-2 text-3xl font-semibold">Choose your own password.</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
          {staff.user.app_metadata.recruitment_password_change_required === true
            ? "Replace your temporary password to unlock the recruitment workspace."
            : "Update the password for your staff account."}
        </p>
        <p className="mt-3 break-all text-sm text-[var(--ink-faint)]">{staff.user.email}</p>
        <ChangePasswordForm />
        <form action="/auth/logout" method="post" className="mt-4">
          <button className="min-h-12 text-sm text-[var(--ink-soft)]">Sign out</button>
        </form>
      </div>
    </div></section>
  )
}
