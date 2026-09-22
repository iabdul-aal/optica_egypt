import { test, expect } from "@playwright/test"

const ROUTES = [
  "/",
  "/about",
  "/events",
  "/events/inauguration-ceremony-section-kickoff",
  "/events/inauguration-ceremony-section-kickoff/register",
  "/community",
  "/leadership",
  "/outreach",
  "/resources",
  "/news",
  "/join",
]

for (const route of ROUTES) {
  test(`${route} : loads cleanly with zero optical faults or runtime errors`, async ({ page }) => {
    const pageErrors: Error[] = []
    page.on("pageerror", (err) => {
      pageErrors.push(err)
    })

    const response = await page.goto(route, { waitUntil: "domcontentloaded" })
    expect(response?.status()).toBeLessThan(400)

    // Verify error boundary did NOT trigger
    await expect(page.locator("text=OPTICAL FAULT DETECTED")).toHaveCount(0)
    await expect(page.locator("text=An unexpected optical aberration occurred")).toHaveCount(0)

    // Structural elements exist
    await expect(page.locator("header")).toBeVisible()
    await expect(page.locator("main")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()

    // Wait 1.5s for client-side hydration, 3D scenes, and animations to mount
    await page.waitForTimeout(1500)

    // Check no unhandled runtime errors were logged by the browser
    expect(pageErrors).toEqual([])
  })
}

test("unknown route renders 404 optical path interrupted page cleanly", async ({ page }) => {
  const pageErrors: Error[] = []
  page.on("pageerror", (err) => {
    pageErrors.push(err)
  })

  await page.goto("/non-existent-route")
  await expect(page.locator("text=Optical Path Interrupted / 404")).toBeVisible()
  await expect(page.locator("text=OPTICAL FAULT DETECTED")).toHaveCount(0)
  expect(pageErrors).toEqual([])
})