import { test, expect } from "@playwright/test"
import { createClient } from "@supabase/supabase-js"
import { randomUUID } from "node:crypto"

const ready = Boolean(process.env.SUPABASE_SECRET_KEY && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
test.use({ trace: "off", screenshot: "off", video: "off" })
test.describe("staff temporary passwords", () => {
  test.skip(!ready, "Requires live Supabase credentials")
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  const runId = randomUUID()
  const email = `optica-test-password-${runId}@example.test`
  const password = `Initial-${randomUUID()}-Aa9!`
  const newPassword = `Changed-${randomUUID()}-Aa9!`
  let id = ""
  const service = ready ? createClient(url, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false }
  }) : null
  test.beforeAll(async () => {
    const { data, error } = await service!.auth.admin.createUser({
      email, password, email_confirm: true,
      app_metadata: { recruitment_password_change_required: true, recruitment_credential_version: runId }
    })
    expect(error).toBeNull()
    id = data.user!.id
    expect((await service!.from("recruitment_staff").insert({ user_id: id, email, role: "recruiter" })).error).toBeNull()
  })
  test.afterAll(async () => { if (id) await service!.auth.admin.deleteUser(id) })

  test("first login requires a new password and old credentials cannot bypass the gate", async ({ page }) => {
    const oldSession = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
    expect((await oldSession.auth.signInWithPassword({ email, password })).error).toBeNull()
    expect((await oldSession.rpc("recruitment_role")).data).toBeNull()
    expect((await oldSession.from("recruitment_applications").select("*")).data).toEqual([])
    // Users cannot lift the restriction by editing their own profile metadata.
    await oldSession.auth.updateUser({ data: { recruitment_password_change_required: false } })
    expect((await oldSession.rpc("recruitment_role")).data).toBeNull()
    expect((await oldSession.rpc("set_recruitment_staff", { p_email: email, p_role: "admin" })).error?.code).toBe("42501")

    await page.goto("/admin/login")
    await page.getByLabel("Staff email", { exact: true }).fill(email)
    await page.getByLabel("Password", { exact: true }).fill(password)
    await page.getByRole("button", { name: "Sign in", exact: true }).click()
    await expect(page).toHaveURL(/\/admin\/change-password$/)
    await page.goto("/admin")
    await expect(page).toHaveURL(/\/admin\/change-password$/)
    const denied = await page.request.post("/api/admin/staff", { data: { email, role: "admin" } })
    expect(denied.status()).toBe(401)
    const crossOrigin = await page.request.post("/auth/change-password", {
      headers: { origin: "https://untrusted.example" }, data: { currentPassword: password, password: newPassword }
    })
    expect(crossOrigin.status()).toBe(403)
    const weak = await page.request.post("/auth/change-password", { data: { currentPassword: password, password: "short" } })
    expect(weak.status()).toBe(400)
    const reuse = await page.request.post("/auth/change-password", { data: { currentPassword: password, password } })
    expect(reuse.status()).toBe(400)
    const wrong = await page.request.post("/auth/change-password", { data: { currentPassword: "WrongPassword123!", password: newPassword } })
    expect(wrong.status()).toBe(400)

    await page.getByLabel("Current or temporary password", { exact: true }).fill(password)
    await page.getByLabel("New password", { exact: true }).fill(newPassword)
    await page.getByLabel("Confirm new password", { exact: true }).fill(newPassword)
    await page.screenshot({ path: "../../outputs/staff-password-change.png", fullPage: true })
    await page.getByRole("button", { name: "Save password and continue", exact: true }).click()
    await expect(page).toHaveURL(/\/admin$/)
    await expect(page.getByRole("navigation", { name: "Recruitment workspace" })).toBeVisible()
    expect((await service!.auth.admin.getUserById(id)).data.user!.app_metadata.recruitment_password_change_required).toBe(false)
    // The old token is denied even after the forced-change flag has been cleared.
    expect((await oldSession.rpc("recruitment_role")).data).toBeNull()
    expect((await oldSession.from("recruitment_applications").select("*")).data).toEqual([])
    expect((await oldSession.rpc("review_recruitment", {
      p_id: randomUUID(), p_status: "accepted", p_note: "Attempt", p_version: 0
    })).error?.code).toBe("42501")
    const fresh = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
    expect((await fresh.auth.signInWithPassword({ email, password })).error).not.toBeNull()
    expect((await fresh.auth.signInWithPassword({ email, password: newPassword })).error).toBeNull()
    expect((await fresh.rpc("recruitment_role")).data).toBe("recruiter")
    await page.getByRole("button", { name: "Sign out", exact: true }).click()
    await expect(page).toHaveURL(/\/admin\/login$/)
    await page.getByLabel("Staff email", { exact: true }).fill(email)
    await page.getByLabel("Password", { exact: true }).fill(newPassword)
    await page.getByRole("button", { name: "Sign in", exact: true }).click()
    await expect(page).toHaveURL(/\/admin$/)
  })
})
