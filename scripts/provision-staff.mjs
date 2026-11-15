// Credentials belong in an input file outside the source checkout, never in git.
import { createClient } from "@supabase/supabase-js"
import { randomBytes, randomUUID } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { resolve, relative, isAbsolute } from "node:path"

const [input, output] = process.argv.slice(2)
if (!input || !output) throw new Error("Usage: node --env-file=.env.local scripts/provision-staff.mjs PRIVATE_INPUT.json PRIVATE_OUTPUT.csv")
for (const path of [input, output]) {
  const pathFromRepo = relative(process.cwd(), resolve(path))
  if (!pathFromRepo.startsWith("..") && !isAbsolute(pathFromRepo))
    throw new Error("Keep credential files outside the source checkout.")
}
const entries = JSON.parse(await readFile(input, "utf8"))
if (!Array.isArray(entries) || !entries.length) throw new Error("Expected a staff array")
const seen = new Set()
for (const entry of entries) {
  entry.email = entry.email?.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email || "") ||
      !["admin", "recruiter", "viewer"].includes(entry.role) || seen.has(entry.email))
    throw new Error("Invalid or duplicate roster entry")
  seen.add(entry.email)
}
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
})
const users = []
for (let page = 1; ; page++) {
  const { data, error } = await db.auth.admin.listUsers({ page, perPage: 100 })
  if (error) throw error
  users.push(...data.users)
  if (data.users.length < 100) break
}
const rows = [["Name", "Email", "Role", "Temporary password", "Login URL"]]
const csv = () => rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n") + "\r\n"
// Exclusive creation avoids overwriting credentials from an earlier run.
await writeFile(output, csv(), { flag: "wx", mode: 0o600 })
for (const entry of entries) {
  let user = users.find(u => u.email?.toLowerCase() === entry.email)
  if (user && !entry.resetPassword)
    throw new Error(`An account already exists for ${entry.email}; no password was changed. Explicit resetPassword authorization is required.`)
  const password = entry.password || `Opt-${randomBytes(18).toString("base64url")}-9a!`
  const attributes = { password, app_metadata: {
    recruitment_password_change_required: true,
    recruitment_credential_version: randomUUID()
  } }
  const result = user
    ? await db.auth.admin.updateUserById(user.id, attributes)
    : await db.auth.admin.createUser({ ...attributes, email: entry.email, email_confirm: true })
  if (result.error) throw result.error
  user = result.data.user
  rows.push([entry.name, entry.email, entry.role, password, "https://optica-egypt.com/admin/login"])
  await writeFile(output, csv(), { mode: 0o600 })
  const { error } = await db.from("recruitment_staff").upsert({ user_id: user.id, email: entry.email, role: entry.role })
  if (error) throw error
}
console.log(`Provisioned ${entries.length} staff accounts with mandatory password changes. Credentials saved privately; no emails sent.`)
