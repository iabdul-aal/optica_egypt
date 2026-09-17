import { test, expect } from "@playwright/test"

const LOCALES = ["en", "ar"]
const ROUTES = ["", "/about", "/events", "/community", "/leadership", "/outreach", "/resources", "/join"]

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    test(`[${locale}] ${route || "/"} — loads without error`, async ({ page }) => {
      await page.goto(`/${locale}${route}`)
      await expect(page).not.toHaveTitle(/error/i)
      await expect(page.locator("main")).toBeVisible()
      await expect(page.locator("header")).toBeVisible()
      await expect(page.locator("footer")).toBeVisible()
    })
  }
}