import "server-only"
import { redirect } from "next/navigation"
import { cache } from "react"
import { sessionClient } from "@/lib/supabase/server"
import { roles, type StaffRole } from "@/lib/recruitment"

export const getStaffIdentity = cache(async () => {
  const db = await sessionClient()
  const {
    data: { user },
    error
  } = await db.auth.getUser()
  if (error || !user) return null
  const { data } = await db
    .from("recruitment_staff")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle()
  if (!data || !roles.includes(data.role)) return null
  return { db, user, role: data.role as StaffRole }
})
export async function getStaff() {
  const staff = await getStaffIdentity()
  if (!staff || staff.user.app_metadata.recruitment_password_change_required === true)
    return null
  const { data: role, error } = await staff.db.rpc("recruitment_role")
  if (error || !roles.includes(role)) return null
  return { ...staff, role: role as StaffRole }
}
export async function requireStaff() {
  const identity = await getStaffIdentity()
  if (identity?.user.app_metadata.recruitment_password_change_required === true)
    redirect("/admin/change-password")
  const staff = await getStaff()
  if (!staff) redirect("/admin/login")
  return staff
}
