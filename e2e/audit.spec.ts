import fs from "node:fs"
import path from "node:path"
import { test, expect, type Page } from "@playwright/test"

const membersData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/members.json"), "utf8")
) as { id: string; name: string }[]

const pressData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/press.json"), "utf8")
) as { mediaKit: { assets: { id: string; downloadUrl: string; format: string }[] } }

const PUBLIC_AND_AUTH_UI_ROUTES = [
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
  "/admin/login",
] as const

function monitorRuntime(page: Page) {
  const pageErrors: Error[] = []
  const consoleErrors: string[] = []
  page.on("pageerror", (err) => pageErrors.push(err))
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text())
  })
  return { pageErrors, consoleErrors }
}

async function switchTheme(page: Page, target: "dark" | "light") {
  const current = await page.locator("html").getAttribute("data-theme")
  if (current === target) return
  const btn = page.getByRole("button", {
    name: target === "light" ? /Switch to light theme/i : /Switch to dark theme/i,
  }).first()
  await expect(btn).toBeVisible()
  await btn.click()
  await expect(page.locator("html")).toHaveAttribute("data-theme", target)
}

async function assertAllImagesLoaded(page: Page) {
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll("img"))
          const broken: string[] = []
          for (const img of imgs) {
            const style = getComputedStyle(img)
            if (style.display === "none" || style.visibility === "hidden") continue
            const rect = img.getBoundingClientRect()
            if (rect.width === 0 && rect.height === 0) continue
            if (!img.complete || img.naturalWidth === 0) {
              img.scrollIntoView({ block: "center" })
              broken.push(img.currentSrc || img.getAttribute("src") || img.alt || "unknown-img")
              break
            }
          }
          return broken
        }),
      { timeout: 10_000 }
    )
    .toEqual([])
}

test("all 16 leadership profiles render cleanly with loaded assets and 48px controls", async ({
  page,
}) => {
  test.setTimeout(120_000)
  const { pageErrors, consoleErrors } = monitorRuntime(page)

  expect(membersData.length).toBe(16)
  for (const member of membersData) {
    const res = await page.goto(`/leadership/${member.id}`, { waitUntil: "load" })
    expect(res?.status()).toBeLessThan(400)
    await expect(page.getByRole("heading", { level: 1 })).toContainText(member.name)
    await assertAllImagesLoaded(page)

    const links = page.locator("main a[href^='mailto:'], main a[href*='linkedin.com'], main a[href^='http']")
    const count = await links.count()
    for (let i = 0; i < count; i++) {
      const box = await links.nth(i).boundingBox()
      if (box) expect(box.height).toBeGreaterThanOrEqual(48)
    }
  }

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("all canonical routes pass 1440x900 desktop checks across dark and light themes", async ({
  page,
}) => {
  test.setTimeout(150_000)
  await page.setViewportSize({ width: 1440, height: 900 })
  const { pageErrors, consoleErrors } = monitorRuntime(page)

  for (const route of PUBLIC_AND_AUTH_UI_ROUTES) {
    const res = await page.goto(route, { waitUntil: "domcontentloaded" })
    expect(res?.status()).toBeLessThan(400)
    await expect(page.locator("header")).toBeVisible()
    await expect(page.locator("main")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()

    for (const theme of ["dark", "light"] as const) {
      await switchTheme(page, theme)
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))
      expect(overflow.scrollWidth, `Desktop ${theme} overflow on ${route}`).toBeLessThanOrEqual(overflow.clientWidth)
    }
    await assertAllImagesLoaded(page)
  }

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("all canonical routes pass 375x812 mobile overflow, theme parity, and 16px input rules", async ({
  page,
}) => {
  test.setTimeout(150_000)
  await page.setViewportSize({ width: 375, height: 812 })
  const { pageErrors, consoleErrors } = monitorRuntime(page)
  const overflowFailures: string[] = []

  for (const route of PUBLIC_AND_AUTH_UI_ROUTES) {
    const res = await page.goto(route, { waitUntil: "domcontentloaded" })
    expect(res?.status()).toBeLessThan(400)

    for (const theme of ["dark", "light"] as const) {
      await switchTheme(page, theme)
      const metrics = await page.evaluate(() => {
        const badInputs: string[] = []
        document.querySelectorAll("input, textarea, select").forEach((el) => {
          const style = getComputedStyle(el)
          if (style.display !== "none" && parseFloat(style.fontSize) < 16) {
            badInputs.push(`${el.tagName}:${style.fontSize}`)
          }
        })
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          badInputs,
        }
      })
      if (metrics.scrollWidth > metrics.clientWidth) {
        overflowFailures.push(`${route} (${theme}): ${metrics.scrollWidth} > ${metrics.clientWidth}`)
      }
      expect(metrics.badInputs, `Sub-16px inputs on ${route} (${theme})`).toEqual([])
    }
  }

  expect(overflowFailures).toEqual([])
  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("press media kit assets, brand icons, llms docs, manifest, robots.txt, and sitemap.xml return 200 and pass SEO checks", async ({
  page,
}) => {
  const { pageErrors, consoleErrors } = monitorRuntime(page)
  const staticEndpoints = [
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.webmanifest",
    "/llms.txt",
    "/llms-full.txt",
    "/favicon.ico",
    "/icon.png",
    "/apple-icon.png",
    "/branding/FullOnBlack.png",
    ...pressData.mediaKit.assets.map((a) => a.downloadUrl),
  ]

  for (const endpoint of staticEndpoints) {
    const res = await page.request.get(endpoint)
    expect(res.status(), `Failed status for ${endpoint}`).toBe(200)
    expect((await res.body()).byteLength).toBeGreaterThan(50)
  }

  const sitemapText = await (await page.request.get("/sitemap.xml")).text()
  expect(sitemapText).toContain("https://optica-egypt.com/")
  expect(sitemapText).toContain("https://optica-egypt.com/about</loc>")
  expect(sitemapText).toContain("https://optica-egypt.com/projects/open-photonics-pda</loc>")
  expect(sitemapText).not.toContain("localhost")

  const robotsText = await (await page.request.get("/robots.txt")).text()
  expect(robotsText).toContain("https://optica-egypt.com/sitemap.xml")
  expect(robotsText).toContain("/admin")

  await page.goto("/chapters/auc", { waitUntil: "domcontentloaded" })
  const aucTitle = await page.title()
  expect(aucTitle).not.toMatch(/Optica Egypt \| Optica Egypt/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://optica-egypt.com/chapters/auc"
  )

  await page.goto("/admin/login", { waitUntil: "domcontentloaded" })
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/docs/optica-egypt-fact-sheet.html", { waitUntil: "domcontentloaded" })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("interactive workflows: relational graph, ChaptersMap, Resources search, Press copy, Join portal", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  const { pageErrors, consoleErrors } = monitorRuntime(page)

  // Relational navigation: Home -> Project -> Officer
  await page.goto("/projects/open-photonics-pda", { waitUntil: "load" })
  await expect(page.getByRole("heading", { name: "Open-Source Photonics Working Group" })).toBeVisible()
  await page.getByRole("link", { name: /Khaled Ramadan/i }).click()
  await page.waitForURL("**/leadership/khaled-ramadan")
  await expect(page.getByRole("link", { name: /Open-Source Photonics Working Group/i })).toBeVisible()

  // ChaptersMap zoom & AUC detail
  await page.goto("/chapters", { waitUntil: "load" })
  const zoomIn = page.getByRole("button", { name: "Zoom in map" })
  await zoomIn.click()
  await page.getByRole("button", { name: "Reset map to full country view" }).click()
  await page.getByRole("link", { name: /View Full AUC Profile/i }).click()
  await page.waitForURL("**/chapters/auc")

  // Resources reset
  await page.goto("/resources", { waitUntil: "load" })
  await page.getByLabel("Search resources").fill("no-match-photonics-xyz")
  await expect(page.getByText("No resources match the current filter.")).toBeVisible()
  await page.getByRole("button", { name: /Reset Resource Filter/i }).click()
  await expect(page.getByText("13 of 13 Verified Entries")).toBeVisible()

  // Press boilerplate copy
  await page.goto("/press", { waitUntil: "load" })
  await page.getByRole("button", { name: "Copy Boilerplate", exact: true }).click()
  await expect(page.getByRole("button", { name: "Copied", exact: true })).toBeVisible()

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test("join portal mocked 201 flows for both recruitment and section desk submissions", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  const { pageErrors, consoleErrors } = monitorRuntime(page)

  // 1. Offline /api/recruitment returns 503 alert cleanly
  await page.goto("/join", { waitUntil: "load" })
  await expect(page.getByRole("tab", { name: "Committee Application" })).toHaveAttribute("aria-controls", "panel-recruitment")
  await page.getByLabel("Full name", { exact: true }).fill("Nour El-Din")
  await page.getByLabel("Email address", { exact: true }).fill("nour@example.org")
  await page.getByLabel("University or institution").fill("Cairo University")
  await page.getByLabel("Study level").selectOption("Undergraduate")
  await page.getByLabel("Preferred committee").selectOption("Outreach")
  await page.getByLabel("Why would you like to join?").fill("Excited to contribute to campus optics workshops and student engagement.")
  await page.getByLabel("Availability").fill("3 hours per week")
  await page.locator('#panel-recruitment input[name="consent"]').check()
  await page.getByRole("button", { name: "Submit application" }).click()
  await expect(page.locator("#panel-recruitment").getByRole("alert")).toContainText(/could not save your application/i, {
    timeout: 15_000,
  })

  // 2. Mocked 201 on /api/submissions verifies unified desk confirmation receipt
  await page.route("**/api/submissions", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ code: "OPT-EG-2026-DESK99" }),
    })
  })
  await page.goto("/join?type=partner&ref=seasonal-photonics-school", { waitUntil: "load" })
  await expect(page.getByRole("tab", { name: /Chapter, Partner, or Press Desk/i })).toHaveAttribute("aria-selected", "true")
  await page.fill("#intake-name", "Dr. Omar Zaki")
  await page.fill("#intake-email", "omar.zaki@university.edu.eg")
  await page.fill("#intake-affiliation", "Alexandria Photonics Lab")
  await page.fill("#intake-details", "Interested in hosting an inaugural technical seminar on campus.")
  await page.locator('#panel-desk input[name="consent"]').check()
  await page.getByRole("button", { name: "Submit Request", exact: true }).click()
  await expect(page.getByText("OPT-EG-2026-DESK99")).toBeVisible({ timeout: 15_000 })

  // 3. Mocked 201 on /api/recruitment verifies confirmation code + Copy reference
  await page.route("**/api/recruitment", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ code: "OPT-EG-2026-MOCK99" }),
    })
  })
  await page.goto("/recruitment", { waitUntil: "load" })
  await page.waitForURL(/\/join\?type=committee/)
  await page.getByLabel("Full name", { exact: true }).fill("Nour El-Din")
  await page.getByLabel("Email address", { exact: true }).fill("nour@example.org")
  await page.getByLabel("University or institution").fill("Cairo University")
  await page.getByLabel("Study level").selectOption("Undergraduate")
  await page.getByLabel("Preferred committee").selectOption("Outreach")
  await page.getByLabel("Why would you like to join?").fill("Excited to contribute to campus optics workshops and student engagement.")
  await page.getByLabel("Availability").fill("3 hours per week")
  await page.locator('#panel-recruitment input[name="consent"]').check()
  await page.getByRole("button", { name: "Submit application" }).click()
  await expect(page.getByText("OPT-EG-2026-MOCK99")).toBeVisible({ timeout: 15_000 })
  await page.getByRole("button", { name: /Copy reference/i }).click()
  await expect(page.getByRole("button", { name: /Copied/i })).toBeVisible()

  expect(pageErrors).toEqual([])
  expect(consoleErrors.filter((c) => !c.includes("503"))).toEqual([])
})

test("forms reject HTML 405/404 responses cleanly without Unexpected token '<' JSON errors", async ({
  page,
}) => {
  const { pageErrors } = monitorRuntime(page)
  const html405 =
    "<html>\n<head><title>405 Not Allowed</title></head>\n<body><center><h1>405 Not Allowed</h1></center></body>\n</html>"

  await page.route("**/api/recruitment", async (route) => {
    await route.fulfill({
      status: 405,
      contentType: "text/html",
      body: html405,
    })
  })
  await page.route("**/api/submissions", async (route) => {
    await route.fulfill({
      status: 405,
      contentType: "text/html",
      body: html405,
    })
  })

  // 1. Committee recruitment form preserves entries and avoids SyntaxError on HTML 405
  await page.goto("/join?type=committee", { waitUntil: "load" })
  await page.getByLabel("Full name", { exact: true }).fill("Nour El-Din")
  await page.getByLabel("Email address", { exact: true }).fill("nour@example.org")
  await page.getByLabel("University or institution").fill("Cairo University")
  await page.getByLabel("Study level").selectOption("Undergraduate")
  await page.getByLabel("Preferred committee").selectOption("Outreach")
  await page
    .getByLabel("Why would you like to join?")
    .fill("Excited to contribute to campus optics workshops and student engagement.")
  await page.getByLabel("Availability").fill("3 hours per week")
  await page.locator('#panel-recruitment input[name="consent"]').check()
  await page.getByRole("button", { name: "Submit application" }).click()

  const recruitmentAlert = page.locator("#panel-recruitment").getByRole("alert")
  await expect(recruitmentAlert).toBeVisible({ timeout: 15_000 })
  await expect(recruitmentAlert).toContainText(/could not save your application/i)
  await expect(recruitmentAlert).not.toContainText(/Unexpected token|not valid JSON/i)
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Nour El-Din")

  // 2. Unified intake desk preserves entries and avoids SyntaxError on HTML 405
  await page.goto("/join?type=partner", { waitUntil: "load" })
  await page.fill("#intake-name", "Dr. Omar Zaki")
  await page.fill("#intake-email", "omar.zaki@university.edu.eg")
  await page.fill("#intake-affiliation", "Alexandria Photonics Lab")
  await page.fill("#intake-details", "Interested in hosting an inaugural technical seminar on campus.")
  await page.locator('#panel-desk input[name="consent"]').check()
  await page.getByRole("button", { name: "Submit Request", exact: true }).click()

  const deskAlert = page.locator("#panel-desk").getByRole("alert")
  await expect(deskAlert).toBeVisible({ timeout: 15_000 })
  await expect(deskAlert).toContainText(/temporarily unavailable/i)
  await expect(deskAlert).not.toContainText(/Unexpected token|not valid JSON/i)
  await expect(page.locator("#intake-name")).toHaveValue("Dr. Omar Zaki")

  expect(pageErrors).toEqual([])
})

test("admin unavailable boundaries and API/auth CSRF + malformed resilience", async ({
  page,
}) => {
  const { pageErrors, consoleErrors } = monitorRuntime(page)

  // /admin/login offline state
  await page.goto("/admin/login", { waitUntil: "load" })
  await page.getByLabel("Staff email", { exact: true }).fill("staff@example.org")
  await page.getByLabel("Password", { exact: true }).fill("NotARealPassword123")
  await page.getByRole("button", { name: "Sign in", exact: true }).click()
  await expect(page.locator("form").getByRole("alert")).toContainText(/temporarily unavailable/i, {
    timeout: 15_000,
  })

  // Unconfigured /admin routes render AdminUnavailable deterministically with 0 React SSR errors
  for (const adminRoute of [
    "/admin",
    "/admin/staff",
    "/admin/change-password",
    "/admin/applications/00000000-0000-0000-0000-000000000000",
    "/admin/submissions/00000000-0000-0000-0000-000000000000",
  ]) {
    await page.goto(adminRoute, { waitUntil: "domcontentloaded" })
    await expect(page.getByRole("heading", { name: "The workspace is temporarily unavailable." })).toBeVisible()
    await expect(page.getByRole("button", { name: "Try again" })).toBeVisible()
  }

  // CSRF & validation checks across all API/auth routes
  const crossHeaders = { origin: "https://untrusted.example" }
  expect((await page.request.post("/api/recruitment", { headers: crossHeaders, data: {} })).status()).toBe(403)
  expect((await page.request.post("/api/submissions", { headers: crossHeaders, data: {} })).status()).toBe(403)
  expect((await page.request.patch("/api/admin/applications/11111111-1111-1111-1111-111111111111", { headers: crossHeaders, data: {} })).status()).toBe(403)
  expect((await page.request.patch("/api/admin/submissions/11111111-1111-1111-1111-111111111111", { headers: crossHeaders, data: {} })).status()).toBe(403)
  expect((await page.request.post("/api/admin/staff", { headers: crossHeaders, data: {} })).status()).toBe(403)
  expect((await page.request.post("/auth/login", { headers: crossHeaders, data: {} })).status()).toBe(403)
  expect((await page.request.post("/auth/change-password", { headers: crossHeaders, data: {} })).status()).toBe(403)
  expect((await page.request.post("/auth/logout", { headers: crossHeaders })).status()).toBe(403)

  // CORS preflight allows trusted GitHub Pages mirror origin and blocks untrusted origins
  expect((await page.request.fetch("/api/submissions", { method: "OPTIONS", headers: crossHeaders })).status()).toBe(403)
  const trustedPreflight = await page.request.fetch("/api/submissions", {
    method: "OPTIONS",
    headers: { origin: "https://iabdul-aal.me" },
  })
  expect(trustedPreflight.status()).toBe(204)
  expect(trustedPreflight.headers()["access-control-allow-origin"]).toBe("https://iabdul-aal.me")

  expect((await page.request.post("/api/recruitment", { data: {} })).status()).toBe(400)
  expect((await page.request.post("/api/submissions", { data: {} })).status()).toBe(400)
  expect((await page.request.post("/auth/login", { data: {} })).status()).toBe(400)
  expect((await page.request.patch("/api/admin/applications/11111111-1111-1111-1111-111111111111", { data: {} })).status()).toBe(503)
  expect((await page.request.patch("/api/admin/submissions/11111111-1111-1111-1111-111111111111", { data: {} })).status()).toBe(503)
  expect((await page.request.post("/api/admin/staff", { data: {} })).status()).toBe(503)
  expect((await page.request.post("/auth/change-password", { data: {} })).status()).toBe(503)

  const callbackRes = await page.request.get("/auth/callback?code=bad", { maxRedirects: 0 })
  expect(callbackRes.status()).toBe(307)
  expect(callbackRes.headers().location).toMatch(/\/admin\/login\?error=link$/)

  const logoutRes = await page.request.post("/auth/logout", { maxRedirects: 0 })
  expect(logoutRes.status()).toBe(303)
  expect(logoutRes.headers().location).toMatch(/\/admin\/login$/)

  expect(pageErrors).toEqual([])
  expect(
    consoleErrors.filter(
      (c) => !c.includes("503") && !c.includes("500") && !c.includes("400") && !c.includes("403")
    )
  ).toEqual([])
})
