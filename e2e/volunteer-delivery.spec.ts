import { test, expect } from "@playwright/test"

test("unconfigured /join section desk fails closed without saving client localStorage fakes", async ({ page }) => {
  await page.goto("/join?type=partner", { waitUntil: "load" })

  const deskTab = page.getByRole("tab", { name: /Chapter, Partner, or Press Desk/i })
  await expect(deskTab).toHaveAttribute("aria-selected", "true")

  await page.fill("#intake-name", "Dr. Omar Zaki")
  await page.fill("#intake-email", "omar.zaki@university.edu.eg")
  await page.fill("#intake-affiliation", "Alexandria Photonics Lab")
  await page.fill("#intake-details", "Interested in hosting an inaugural technical seminar on campus.")
  await page.locator('#panel-desk input[name="consent"]').check()
  await page.getByRole("button", { name: "Submit Request", exact: true }).click()

  await expect(page.locator("#panel-desk").getByRole("alert")).toContainText(/temporarily unavailable|could not save/i, {
    timeout: 15_000,
  })
  await expect(page.getByLabel("Full Name *", { exact: true })).toHaveValue("Dr. Omar Zaki")
  const storageCount = await page.evaluate(() => window.localStorage.length)
  expect(storageCount).toBeLessThanOrEqual(1) // only optional theme preference
})
