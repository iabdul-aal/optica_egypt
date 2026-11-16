import { test, expect, type Page } from "@playwright/test"

const CANONICAL_ROUTES = [
  "/",
  "/about",
  "/governance",
  "/leadership",
  "/leadership/abdulaziz-albadawi",
  "/partners",
  "/chapters",
  "/chapters/auc",
  "/fellowships",
  "/outreach",
  "/volunteer",
  "/projects",
  "/projects/open-photonics-pda",
  "/events",
  "/open-source",
  "/resources",
  "/updates",
  "/updates/optica-egypt-charter-approval",
  "/news",
  "/blogs",
  "/press",
  "/gallery",
  "/join",
] as const

const LEGACY_REDIRECTS = [
  { from: "/awards", targetPattern: /\/governance\/?$/, expectedHeading: /Governance and Bylaws/i },
  { from: "/recognitions", targetPattern: /\/governance\/?$/, expectedHeading: /Governance and Bylaws/i },
  { from: "/community", targetPattern: /\/chapters\/?$/, expectedHeading: /Student Chapters in Egypt/i },
  { from: "/programs", targetPattern: /\/projects\/?$/, expectedHeading: /Projects, Working Groups, and Open Calls/i },
  { from: "/conferences", targetPattern: /\/projects\?track=training/, expectedHeading: /Projects, Working Groups, and Open Calls/i },
  { from: "/education", targetPattern: /\/projects\?track=training/, expectedHeading: /Projects, Working Groups, and Open Calls/i },
  { from: "/competitions", targetPattern: /\/projects\?track=open-pda/, expectedHeading: /Projects, Working Groups, and Open Calls/i },
  { from: "/recruitment", targetPattern: /\/join\?type=committee/, expectedHeading: /Join Optica Egypt/i },
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

test("homepage photonic hero, theme toggle, and announcement link work", async ({ page }) => {
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/", { waitUntil: "networkidle" })

  await expect(page.getByRole("img", { name: /silicon photonic/i })).toBeVisible()

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

test("/about verifies charter date, official domain, bylaws, executive alignment, and recognitions state", async ({ page }) => {
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/about", { waitUntil: "domcontentloaded" })

  await expect(page.getByText("10 September 2026").first()).toBeVisible()
  await expect(page.getByText("optica-egypt.com").first()).toBeVisible()
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

test("/leadership renders 16 clean portrait cards without photo overlay taglines", async ({ page }) => {
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/leadership", { waitUntil: "domcontentloaded" })

  const frames = page.locator("article .aspect-\\[2\\/3\\]")
  await expect(frames).toHaveCount(16)
  for (let i = 0; i < 16; i++) {
    const text = (await frames.nth(i).textContent())?.trim() ?? ""
    expect(text).not.toMatch(/Section Initiator|First President|Co-Founder/i)
  }

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("homepage ecosystem constellation, pathways, research tabs, desktop click dropdowns, and hub subnav work cleanly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/", { waitUntil: "domcontentloaded" })

  // ImpactMetrics strip + Pentagon CommunityBubbles SVG
  await expect(page.getByRole("link", { name: /01\s*Learn/i })).toBeVisible()
  await expect(page.getByRole("img", { name: /Interactive network linking five pillars/i })).toBeVisible()

  // ResearchExplorer tab interaction
  const tabs = page.locator("#research-explorer [role='tab']")
  expect(await tabs.count()).toBeGreaterThan(1)
  await tabs.nth(1).click()
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true")

  // Desktop click-to-open dropdown toggles aria-expanded cleanly
  const sectionBtn = page.locator(".desktop-navigation button", { hasText: "Section" })
  await sectionBtn.click()
  await expect(sectionBtn).toHaveAttribute("aria-expanded", "true")
  await page.locator(".nav-dropdown a[href='/governance']").click()
  await page.waitForURL("**/governance")

  // Sibling HubSubnav bar navigates directly across section pages
  const partnersSubnav = page.getByLabel("Section Hub sub-navigation").getByRole("link", { name: "Partners" })
  await expect(partnersSubnav).toBeVisible()
  await partnersSubnav.click()
  await page.waitForURL("**/partners")

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})
