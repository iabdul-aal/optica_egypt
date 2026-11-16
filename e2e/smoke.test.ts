import { test, expect, type Page } from "@playwright/test"

const CANONICAL_ROUTES = [
  "/",
  "/about",
  "/leadership/abdulaziz-albadawi",
  "/chapters",
  "/chapters/auc",
  "/projects",
  "/projects/open-photonics-pda",
  "/resources",
  "/updates",
  "/updates/optica-egypt-charter-approval",
  "/join",
] as const

const LEGACY_REDIRECTS = [
  { from: "/governance", targetPattern: /\/about(?:#governance)?\/?$/, expectedHeading: /Charter, Governance, and Founding Team/i },
  { from: "/awards", targetPattern: /\/about(?:#governance)?\/?$/, expectedHeading: /Charter, Governance, and Founding Team/i },
  { from: "/recognitions", targetPattern: /\/about(?:#governance)?\/?$/, expectedHeading: /Charter, Governance, and Founding Team/i },
  { from: "/leadership", targetPattern: /\/about(?:#leadership)?\/?$/, expectedHeading: /Charter, Governance, and Founding Team/i },
  { from: "/press", targetPattern: /\/about(?:#press)?\/?$/, expectedHeading: /Charter, Governance, and Founding Team/i },
  { from: "/programs", targetPattern: /\/projects\?track=training/, expectedHeading: /Projects, Working Groups, and Open Calls/i },
  { from: "/open-source", targetPattern: /\/projects\?track=open-pda/, expectedHeading: /Projects, Working Groups, and Open Calls/i },
  { from: "/fellowships", targetPattern: /\/projects\?track=fellowships/, expectedHeading: /Projects, Working Groups, and Open Calls/i },
  { from: "/events", targetPattern: /\/updates\?kind=event/, expectedHeading: /Updates and Events/i },
  { from: "/recruitment", targetPattern: /\/join\?type=committee/, expectedHeading: /Join Optica Egypt/i },
  { from: "/volunteer", targetPattern: /\/join\?type=committee/, expectedHeading: /Join Optica Egypt/i },
] as const

function attachRuntimeMonitors(page: Page) {
  const pageErrors: Error[] = []
  const consoleErrors: string[] = []
  page.on("pageerror", (err) => pageErrors.push(err))
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text())
  })
  return { pageErrors, consoleErrors }
}

async function assertNoNextErrorOverlay(page: Page) {
  await expect(page.locator("text=OPTICAL FAULT DETECTED")).toHaveCount(0)
  await expect(page.locator("text=Unhandled Runtime Error")).toHaveCount(0)
  await expect(page.locator("text=Application error: a client-side exception")).toHaveCount(0)
}

for (const route of CANONICAL_ROUTES) {
  test(`${route} : loads cleanly with zero errors`, async ({ page }) => {
    const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
    const response = await page.goto(route, { waitUntil: "domcontentloaded" })
    expect(response?.status()).toBeLessThan(400)
    await assertNoNextErrorOverlay(page)
    await expect(page.locator("header")).toBeVisible()
    await expect(page.locator("main")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()
    await page.waitForTimeout(250)
    expect(pageErrors).toEqual([])
    expect(consoleErrors).toEqual([])
  })
}

for (const redirect of LEGACY_REDIRECTS) {
  test(`legacy URL ${redirect.from} redirects cleanly to ${redirect.targetPattern}`, async ({ page }) => {
    const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
    await page.goto(redirect.from, { waitUntil: "domcontentloaded" })
    await page.waitForURL(redirect.targetPattern)
    await expect(page.getByRole("heading", { name: redirect.expectedHeading })).toBeVisible()
    expect(pageErrors).toEqual([])
    expect(consoleErrors).toEqual([])
  })
}

test("unknown route renders custom 404 recovery cleanly", async ({ page }) => {
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  const response = await page.goto("/non-existent-route", { waitUntil: "domcontentloaded" })
  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { name: /This optical path does not exist/i })).toBeVisible()
  expect(pageErrors).toEqual([])
  expect(consoleErrors.filter((t) => !t.includes("404"))).toEqual([])
})

test("homepage SVG waveguide hero, theme toggle, and announcement link work", async ({ page }) => {
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/", { waitUntil: "networkidle" })

  await expect(page.getByRole("img", { name: /silicon photonic add-drop microring resonator/i })).toBeVisible()

  await page.getByRole("button", { name: /Switch to light theme/i }).first().click()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light")
  await page.getByRole("button", { name: /Switch to dark theme/i }).first().click()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")

  const newsLink = page.locator("article h3 a", { hasText: "Optica Egypt Local Section Officially Approved" })
  await expect(newsLink).toBeVisible()
  await expect(newsLink).toHaveAttribute("href", "/about")

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("/about verifies charter date, bylaws, executive alignment, and recognitions state", async ({ page }) => {
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/about", { waitUntil: "domcontentloaded" })

  await expect(page.getByText("10 September 2026").first()).toBeVisible()
  await expect(page.getByRole("heading", { name: "Optica Local Section Governance Standards" })).toBeVisible()
  await expect(page.getByText(/30% of section membership/i)).toBeVisible()
  await expect(page.getByRole("link", { name: /Abdulaziz Albadawi/i }).first()).toBeVisible()
  await expect(page.getByText("Confirmed section recognitions will appear here as they are awarded.")).toBeVisible()

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("/resources filters Grants tab and searches ITIDA cleanly", async ({ page }) => {
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/resources", { waitUntil: "networkidle" })

  const grantsTab = page.getByRole("tab", { name: /Grants/i })
  await grantsTab.click()
  await expect(grantsTab).toHaveAttribute("aria-selected", "true")
  await expect(page.getByText("4 of 13 Verified Entries")).toBeVisible()

  const searchInput = page.getByLabel("Search resources")
  await searchInput.fill("ITIDA")
  await expect(page.getByText("1 of 13 Verified Entries")).toBeVisible()
  await expect(page.getByText("ITIDA ITAC Graduation Project Funding")).toBeVisible()

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})
