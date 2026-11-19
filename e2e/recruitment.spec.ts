import { test, expect, type BrowserContext } from "@playwright/test"
import { createClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"
import { randomUUID } from "node:crypto"

const ready = Boolean(
  process.env.SUPABASE_SECRET_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)
test.use({ screenshot: "only-on-failure", trace: "retain-on-failure" })
test.describe("live chapter recruitment", () => {
  test.skip(!ready, "Run npm run test:live with a provisioned Supabase project")
  test.describe.configure({ mode: "serial" })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  const service = ready
    ? createClient(url, process.env.SUPABASE_SECRET_KEY!, {
        auth: { persistSession: false }
      })
    : null
  const runId = randomUUID().slice(0, 8)
  const users: Record<string, { id: string; email: string; password: string }> =
    {}
  let applicationId = ""
  let applicationCode = ""

  test.beforeAll(async () => {
    for (const role of ["admin", "recruiter", "viewer", "outsider"]) {
      const email = `optica-test-${role}-${runId}@example.test`
      const password = `Test-${randomUUID()}-Aa9!`
      const { data, error } = await service!.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      })
      expect(error).toBeNull()
      users[role] = { id: data.user!.id, email, password }
      if (role !== "outsider") {
        const result = await service!
          .from("recruitment_staff")
          .insert({ user_id: data.user!.id, email, role })
        expect(result.error).toBeNull()
      }
    }
  })
  test.afterAll(async () => {
    if (applicationId) {
      await service!
        .from("recruitment_reviews")
        .delete()
        .eq("application_id", applicationId)
      await service!
        .from("recruitment_applications")
        .delete()
        .eq("id", applicationId)
    }
    for (const user of Object.values(users))
      await service!.auth.admin.deleteUser(user.id)
  })
  async function authenticate(context: BrowserContext, role: string) {
    const cookieValues: { name: string; value: string }[] = []
    const auth = createServerClient(url, key, {
      cookies: {
        getAll: () => cookieValues,
        setAll(values) {
          cookieValues.splice(0, cookieValues.length, ...values)
        }
      }
    })
    const { error } = await auth.auth.signInWithPassword(users[role])
    expect(error).toBeNull()
    await context.addCookies(
      cookieValues.map((c) => ({
        name: c.name,
        value: c.value,
        url: "http://localhost:3000",
        sameSite: "Lax"
      }))
    )
    return auth
  }

  test("applicant submits, receives a persisted reference, and cannot read private data", async ({
    page
  }) => {
    await page.goto("/recruitment")
    await page
      .getByLabel("Full name", { exact: true })
      .fill(`Test Applicant ${runId}`)
    await page
      .getByLabel("Email address", { exact: true })
      .fill(`optica-applicant-${runId}@example.test`)
    await page.getByLabel("University or institution").fill("Test University")
    await page.getByLabel("Study level").selectOption("Undergraduate")
    await page.getByLabel("Preferred committee").selectOption("Outreach")
    await page
      .getByLabel("Relevant tools and skills (optional)")
      .fill("Workshop facilitation")
    await page
      .getByLabel("Why would you like to join?")
      .fill(
        "I would like to help run optics workshops and science outreach for students."
      )
    await page
      .getByLabel("Availability", { exact: true })
      .fill("3 hours per week")
    await page.getByRole("checkbox").check()
    const responsePromise = page.waitForResponse(
      (r) =>
        r.url().endsWith("/api/recruitment") && r.request().method() === "POST"
    )
    await page
      .getByRole("button", { name: "Submit application", exact: true })
      .click()
    const response = await responsePromise
    expect(response.status()).toBe(201)
    applicationCode = (await response.json()).code
    await expect(page.getByText(applicationCode, { exact: true })).toBeVisible()
    const { data, error } = await service!
      .from("recruitment_applications")
      .select("id,status")
      .eq("application_code", applicationCode)
      .single()
    expect(error).toBeNull()
    expect(data!.status).toBe("submitted")
    applicationId = data!.id
    const retry = await page.request.post("/api/recruitment", {
      data: response.request().postDataJSON()
    })
    expect(retry.status()).toBe(201)
    expect((await retry.json()).code).toBe(applicationCode)
    const duplicateCheck = await service!
      .from("recruitment_applications")
      .select("id", { count: "exact", head: true })
      .eq("application_code", applicationCode)
    expect(duplicateCheck.count).toBe(1)
    const anonymous = createClient(url, key)
    expect(
      (await anonymous.from("recruitment_applications").select("*")).error
    ).not.toBeNull()
    expect(
      (await anonymous.rpc("submit_recruitment", { p_data: {} })).error
    ).not.toBeNull()
    await page.screenshot({
      path: "../../outputs/recruitment-receipt.png",
      fullPage: true
    })
  })

  test("recruiter filters, saves a review, and sees persistent history", async ({
    page,
    context
  }) => {
    const auth = await authenticate(context, "recruiter")
    await page.goto(`/admin?q=${encodeURIComponent(runId)}`)
    await expect(
      page.getByText(`Test Applicant ${runId}`, { exact: true })
    ).toBeVisible()
    await page.getByText(`Test Applicant ${runId}`, { exact: true }).click()
    await page.getByRole("radio", { name: "Interview", exact: true }).check()
    await expect(
      page.getByRole("radio", { name: "Interview", exact: true })
    ).toBeChecked()
    await page
      .getByLabel("Internal note")
      .fill("Invite to a chapter introduction meeting.")
    await expect(
      page.getByRole("radio", { name: "Interview", exact: true })
    ).toBeChecked()
    const savedResponse = page.waitForResponse(
      (r) =>
        r.url().includes(`/api/admin/applications/${applicationId}`) &&
        r.request().method() === "PATCH"
    )
    await page.getByRole("button", { name: "Save review", exact: true }).click()
    const saved = await savedResponse
    expect(saved.request().postDataJSON().status).toBe("interview")
    expect(saved.status()).toBe(200)
    const persisted = await service!
      .from("recruitment_applications")
      .select("status")
      .eq("id", applicationId)
      .single()
    expect(persisted.data?.status).toBe("interview")
    await expect(page.getByText("Review saved.", { exact: true })).toBeVisible()
    await page.reload()
    await expect(
      page.getByText("Invite to a chapter introduction meeting.", {
        exact: true
      })
    ).toBeVisible()
    expect(
      (
        await auth.rpc("review_recruitment", {
          p_id: applicationId,
          p_status: "accepted",
          p_note: "Stale update",
          p_version: 0
        })
      ).error?.code
    ).toBe("PT409")
    expect(
      (
        await auth.rpc("set_recruitment_staff", {
          p_email: users.viewer.email,
          p_role: "admin"
        })
      ).error?.code
    ).toBe("42501")
    await page.screenshot({
      path: "../../outputs/recruitment-review.png",
      fullPage: true
    })
  })

  test("viewer sees applications but cannot mutate reviews or roles", async ({
    page,
    context
  }) => {
    const auth = await authenticate(context, "viewer")
    await page.goto(`/admin/applications/${applicationId}`)
    await expect(
      page.getByRole("heading", { name: "Read-only access", exact: true })
    ).toBeVisible()
    await expect(page.getByRole("button", { name: "Save review" })).toHaveCount(
      0
    )
    const denied = await page.request.patch(
      `/api/admin/applications/${applicationId}`,
      { data: { status: "accepted", note: "Attempt", version: 1 } }
    )
    expect(denied.status()).toBe(403)
    expect(
      (
        await auth.rpc("review_recruitment", {
          p_id: applicationId,
          p_status: "accepted",
          p_note: "Attempt",
          p_version: 1
        })
      ).error?.code
    ).toBe("42501")
    const staff = await page.request.post("/api/admin/staff", {
      data: { email: users.viewer.email, role: "admin" }
    })
    expect(staff.status()).toBe(403)
  })

  test("signed-in non-staff cannot access dashboard data or assign themselves a role", async ({
    page,
    context
  }) => {
    const auth = await authenticate(context, "outsider")
    await page.goto("/admin")
    await expect(page).toHaveURL(/\/admin\/login/)
    expect(
      (await auth.from("recruitment_applications").select("*")).data
    ).toEqual([])
    expect(
      (
        await auth.from("recruitment_staff").insert({
          user_id: users.outsider.id,
          email: users.outsider.email,
          role: "admin"
        })
      ).error
    ).not.toBeNull()
    expect(
      (
        await auth.rpc("set_recruitment_staff", {
          p_email: users.outsider.email,
          p_role: "admin"
        })
      ).error?.code
    ).toBe("42501")
  })

  test("administrator manages team access and sees recruitment metrics", async ({
    page,
    context
  }) => {
    await authenticate(context, "admin")
    await page.goto("/admin/staff")
    await page
      .getByLabel("Staff email", { exact: true })
      .fill(users.viewer.email)
    await page.getByLabel("Role").selectOption("recruiter")
    await page
      .getByRole("button", { name: "Update access", exact: true })
      .click()
    await expect(
      page.getByText("Staff access updated.", { exact: true })
    ).toBeVisible()
    const { data } = await service!
      .from("recruitment_staff")
      .select("role")
      .eq("user_id", users.viewer.id)
      .single()
    expect(data?.role).toBe("recruiter")
    await page.goto("/admin")
    await expect(
      page.getByRole("heading", { name: "A new cohort starts here." })
    ).toBeVisible()
    await page.screenshot({
      path: "../../outputs/recruitment-dashboard.png",
      fullPage: true
    })
  })

  test("invalid and cross-origin requests fail without inserting applications", async ({
    request
  }) => {
    expect(
      (await request.post("/api/recruitment", { data: {} })).status()
    ).toBe(400)
    expect(
      (
        await request.post("/api/recruitment", {
          headers: { origin: "https://example.test" },
          data: {}
        })
      ).status()
    ).toBe(403)
    expect(
      (
        await request.patch(`/api/admin/applications/${randomUUID()}`, {
          data: {}
        })
      ).status()
    ).toBe(401)
  })
})
