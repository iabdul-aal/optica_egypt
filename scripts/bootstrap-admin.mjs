import { createClient } from "@supabase/supabase-js"

const email = process.argv[2]?.trim().toLowerCase()
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  throw new Error(
    "Usage: node --env-file=.env.local scripts/bootstrap-admin.mjs owner@example.org"
  )
const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)
const { count, error: countError } = await db
  .from("recruitment_staff")
  .select("user_id", { count: "exact", head: true })
  .eq("role", "admin")
if (countError) throw new Error(countError.message)
if (count)
  throw new Error(
    "An administrator already exists. Use Team access to manage roles."
  )
let user
for (let page = 1; ; page++) {
  const { data, error } = await db.auth.admin.listUsers({ page, perPage: 100 })
  if (error) throw new Error(error.message)
  user = data.users.find((u) => u.email?.toLowerCase() === email)
  if (user || data.users.length < 100) break
}
if (!user) {
  const { data, error } = await db.auth.admin.createUser({
    email,
    email_confirm: true
  })
  if (error) throw new Error(error.message)
  user = data.user
}
const { error } = await db
  .from("recruitment_staff")
  .insert({ user_id: user.id, email, role: "admin" })
if (error) throw new Error(error.message)
console.log(
  "First administrator role created. Use scripts/provision-staff.mjs with resetPassword: true to set its temporary password before signing in. No email was sent."
)
