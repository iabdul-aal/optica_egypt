import { test, expect, type Page } from "@playwright/test"

test.use({ viewport: { width: 375, height: 812 } })

async function assertNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
}

test("mobile flat navigation drawer opens at full height, navigates cleanly, and prevents overflow", async ({ page }) => {
  const pageErrors: Error[] = []
  const consoleErrors: string[] = []
  page.on("pageerror", (err) => pageErrors.push(err))
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text())
  })

  await page.goto("/", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(300)
  await assertNoHorizontalOverflow(page)

  const menuButton = page.locator(".menu-toggle")
  await expect(menuButton).toBeVisible()
  await menuButton.click()

  const drawer = page.locator("#mobile-navigation")
  await expect(drawer).toBeVisible()
  const box = await drawer.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.height).toBeGreaterThan(600)

  await page.locator("#mobile-navigation a[href='/projects']").click()
  await page.waitForURL("**/projects")
  await assertNoHorizontalOverflow(page)

  await menuButton.click()
  await expect(drawer).toBeVisible()
  await page.locator("#mobile-navigation a[href='/about']").click()
  await page.waitForURL("**/about")
  await assertNoHorizontalOverflow(page)

  await menuButton.click()
  await expect(drawer).toBeVisible()
  await page.locator("#mobile-navigation a[href='/join']").click()
  await page.waitForURL("**/join")
  await assertNoHorizontalOverflow(page)

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})
