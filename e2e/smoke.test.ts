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
  await expect(page.getByRole("heading", { name: /Page not found/i })).toBeVisible()
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

test("/about and /governance keep clean non-redundant scopes and verified records", async ({ page }) => {
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/about", { waitUntil: "domcontentloaded" })

  await expect(page.getByText("10 September 2026").first()).toBeVisible()
  await expect(page.getByText("optica-egypt.com").first()).toBeVisible()
  await expect(page.getByRole("link", { name: /Inspect governance/i })).toBeVisible()
  await expect(page.getByRole("link", { name: /View leadership roster/i })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Optica Local Section Governance Standards" })).toHaveCount(0)

  await page.goto("/governance", { waitUntil: "domcontentloaded" })
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

test("/leadership renders 16 clean monochrome-at-rest portrait cards and loads reliably on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/leadership", { waitUntil: "domcontentloaded" })

  const frames = page.locator("article .aspect-\\[2\\/3\\]")
  await expect(frames).toHaveCount(16)
  for (let i = 0; i < 16; i++) {
    const text = (await frames.nth(i).textContent())?.trim() ?? ""
    expect(text).not.toMatch(/Section Initiator|First President|Co-Founder/i)
  }

  // Verify mobile viewport reveals cards without ScrollReveal trapping content invisible
  const firstCard = page.locator("main article").first()
  await expect(firstCard).toBeVisible()
  const cardOpacity = await firstCard.evaluate((el) => Number(getComputedStyle(el).opacity))
  expect(cardOpacity).toBe(1)

  // Verify no divider border above the card Profile action link
  const profileRowBorderTop = await firstCard
    .locator("a", { hasText: "Profile" })
    .locator("..")
    .evaluate((el) => getComputedStyle(el).borderTopWidth)
  expect(profileRowBorderTop).toBe("0px")

  const firstPortraitFilter = await page
    .locator("article .aspect-\\[2\\/3\\] img")
    .first()
    .evaluate((el) => getComputedStyle(el).filter)
  expect(firstPortraitFilter).toContain("grayscale")

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("homepage hero color 3D stage, research topic-specific 3D shapes, dropdowns, no HubSubnav, and chapters map work cleanly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  const { pageErrors, consoleErrors } = attachRuntimeMonitors(page)
  await page.goto("/", { waitUntil: "domcontentloaded" })

  // Hero 3D container is non-B&W and Section HubSubnav is absent
  await expect(page.locator(".hero-model-wrap .figure-bw")).toHaveCount(0)
  await expect(page.getByLabel("Section Hub sub-navigation")).toHaveCount(0)
  const heroModelBg = await page
    .locator(".hero-model-wrap")
    .evaluate((el) => getComputedStyle(el).backgroundColor)
  expect(heroModelBg).toBe("rgba(0, 0, 0, 0)")

  // ImpactMetrics strip + Pentagon CommunityBubbles SVG
  await expect(page.getByRole("link", { name: /01\s*Learn/i })).toBeVisible()
  await expect(page.getByRole("img", { name: /Interactive network linking five pillars/i })).toBeVisible()

  // ResearchExplorer renders topic-specific 3D shapes per domain tab
  const tabs = page.locator("#research-explorer [role='tab']")
  expect(await tabs.count()).toBe(5)
  await expect(page.locator("#research-explorer .research-shape--pic")).toBeVisible()
  await tabs.nth(1).click()
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true")
  await expect(page.locator("#research-explorer .research-shape--com")).toBeVisible()
  await tabs.nth(4).click()
  await expect(page.locator("#research-explorer .research-shape--qnt")).toBeVisible()

  // Desktop click-to-open dropdown toggles aria-expanded cleanly
  const sectionBtn = page.locator(".desktop-navigation button", { hasText: "Section" })
  await sectionBtn.click()
  await expect(sectionBtn).toHaveAttribute("aria-expanded", "true")
  await page.locator(".nav-dropdown a[href='/governance']").click()
  await page.waitForURL("**/governance")

  // Chapters map Focus AUC, Zewail City selector, and Reset controls work cleanly
  await page.goto("/chapters", { waitUntil: "domcontentloaded" })
  await expect(page.getByText("100%")).toBeVisible()
  await page.getByRole("button", { name: /Focus on AUC/i }).click()
  await expect(page.getByText("220%")).toBeVisible()
  await expect(page.getByText(/30°01' N/)).toBeVisible()
  await page.getByRole("button", { name: /Reset map/i }).click()
  await expect(page.getByText("100%")).toBeVisible()

  await page.getByRole("tab", { name: /Zewail City/i }).click()
  await expect(page.getByRole("heading", { name: "Zewail City Optica Student Chapter" }).first()).toBeVisible()
  await page.goto("/chapters/zewail-city", { waitUntil: "domcontentloaded" })
  await expect(page.getByRole("heading", { name: "Zewail City Optica Student Chapter" })).toBeVisible()

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})
