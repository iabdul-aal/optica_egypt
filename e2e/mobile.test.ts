import { test, expect } from "@playwright/test"

test.use({ viewport: { width: 375, height: 812 } })

test("mobile navigation drawer opens with full viewport height and navigates properly", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(500)

  // 1. Menu toggle is visible
  const menuButton = page.locator(".menu-toggle")
  await expect(menuButton).toBeVisible()

  // 2. Click menu toggle to open drawer
  await menuButton.click()
  await page.waitForTimeout(400)

  const drawer = page.locator("#mobile-navigation")
  await expect(drawer).toBeVisible()

  // 3. Verify drawer has full mobile height (> 700px)
  const box = await drawer.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.height).toBeGreaterThan(600)

  // 4. Test "Section" group accordion and navigation to /about
  const sectionToggle = page.locator("#mobile-navigation button:has-text('Section')")
  await expect(sectionToggle).toBeVisible()
  await sectionToggle.click()
  await page.waitForTimeout(200)

  const aboutLink = page.locator("#mobile-navigation a[href='/about']")
  await expect(aboutLink).toBeVisible()
  await aboutLink.click()
  await page.waitForURL("**/about")
  expect(page.url()).toContain("/about")

  // 5. Open menu on /about and test "Program" -> /conferences
  await menuButton.click()
  await page.waitForTimeout(300)

  const programToggle = page.locator("#mobile-navigation button:has-text('Program')")
  await expect(programToggle).toBeVisible()
  await programToggle.click()
  await page.waitForTimeout(200)

  const confLink = page.locator("#mobile-navigation a[href='/conferences']")
  await expect(confLink).toBeVisible()
  await confLink.click()
  await page.waitForURL("**/conferences")
  expect(page.url()).toContain("/conferences")

  // 6. Open menu on /conferences and test "Join" direct button
  await menuButton.click()
  await page.waitForTimeout(300)

  const joinBtn = page.locator("#mobile-navigation a[href='/join']")
  await expect(joinBtn).toBeVisible()
  await joinBtn.click()
  await page.waitForURL("**/join")
  expect(page.url()).toContain("/join")
})
