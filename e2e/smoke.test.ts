import { test, expect } from "@playwright/test"

const ROUTES = ["", "/about", "/events", "/community", "/leadership", "/outreach", "/resources", "/join"]

for (const route of ROUTES) {
  test(`[en-only] ${route || "/"} — loads without error`, async ({ page }) => {
    await page.goto(route || "/")
    await expect(page).not.toHaveTitle(/error/i)
    await expect(page.locator("main")).toBeVisible()
    await expect(page.locator("header")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()
  })
}

test("legacy /ar redirects to root", async ({ page }) => {
  await page.goto("/ar")
  expect(page.url()).toBe("http://localhost:3000/")
})

test("legacy /en redirects to root", async ({ page }) => {
  await page.goto("/en")
  expect(page.url()).toBe("http://localhost:3000/")
})