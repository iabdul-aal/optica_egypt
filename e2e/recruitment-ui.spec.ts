import { test, expect } from "@playwright/test"

test("recruitment stays usable on mobile and supports both themes", async ({
  page
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/recruitment")
  await expect(
    page.getByRole("heading", { name: /Bring your curiosity/ })
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth
    )
  ).toBe(true)
  await page
    .getByRole("button", { name: "Switch to light theme", exact: true })
    .click()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light")
  expect(
    await page
      .getByLabel("Full name", { exact: true })
      .evaluate((el) => getComputedStyle(el).fontSize)
  ).toBe("16px")
  await page.screenshot({
    path: "../../outputs/recruitment-mobile.png",
    fullPage: true
  })
  await page
    .getByRole("button", { name: "Switch to dark theme", exact: true })
    .click()
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.screenshot({
    path: "../../outputs/recruitment-form.png",
    fullPage: true
  })
})
