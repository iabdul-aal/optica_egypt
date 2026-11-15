import { test, expect } from "@playwright/test"

test("unconfigured volunteer delivery shows an error and preserves entered fields", async ({ page }) => {
  test.skip(Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_VOLUNTEER_WEBHOOK_URL || process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK_URL), "This regression check requires an unconfigured backend")
  await page.goto("/volunteer")
  await page.getByLabel("Full name", { exact: true }).fill("Chapter Applicant")
  await page.getByLabel("Email address", { exact: true }).fill("applicant@example.org")
  await page.getByLabel("University or organisation").fill("Ain Shams University")
  await page.getByLabel("Preferred volunteer track").selectOption({ index: 1 })
  await page.getByLabel("Why would you like to volunteer with Optica Egypt?").fill("I would like to help run optics workshops for students.")
  await page.getByRole("button", { name: "Submit Volunteer Application" }).click()
  await expect(page.locator("form").getByRole("alert")).toHaveText("Applications are temporarily unavailable. Please check back later.")
  await expect(page.getByText("Application Recorded", { exact: true })).toHaveCount(0)
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Chapter Applicant")
  expect(await page.evaluate(() => localStorage.getItem("optica_egypt_volunteer_intake_v1"))).toBeNull()
})
