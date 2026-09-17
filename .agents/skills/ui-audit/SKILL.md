---
name: ui-audit
description: >
  Visual and structural verification of the static site output using Playwright.
  Invoke after `npm run build` as the verify step in the agentic workflow.
  Scaffolds playwright.config.ts and a smoke test suite if absent.
metadata:
  author: optica-egypt-local-section
  version: "2.0.0"
---

# UI Audit — Playwright Verification

Structural smoke testing of the Next.js static export. This is the verify
step in the plan -> implement -> review -> verify workflow.

## Prerequisites

- `npm run build` has completed and `out/` is populated.
- Node.js 18+ is available.

## Workflow

### 1. Check for Playwright config

If `playwright.config.ts` does not exist, scaffold it (see below).

### 2. Install browsers (first run only)

```bash
npx playwright install --with-deps chromium
```

### 3. Serve the static export

```bash
npx serve out -p 3000
```

Wait 2 seconds for the server to start before running tests.

### 4. Run tests

```bash
npx playwright test --reporter=list
```

### 5. Review output

All tests must pass before reporting the task as complete. If a test fails,
fix the code, rebuild, and rerun.

## Minimum smoke test checklist

| Check | What to verify |
|---|---|
| Homepage EN loads | `/en/` returns 200 and contains chapter name |
| Homepage AR loads | `/ar/` returns 200 and contains Arabic chapter name |
| Navigation present | `<nav>` exists with all seven nav items in both locales |
| Events page | `/en/events/` returns 200 and lists at least one event |
| Leadership page | `/en/leadership/` returns 200 and lists officers |
| Outreach page | `/en/outreach/` returns 200 |
| Resources page | `/en/resources/` returns 200 |
| Join Us page | `/en/join/` returns 200 |
| No broken internal links | No internal `<a href>` returns 404 |
| Metadata present | `<meta name="description">` is non-empty on every page |
| No console errors | Browser console is error-free on both locale homepages |
| dir attribute | `/ar/` root `<html>` element has `dir="rtl"` |

## Scaffold: `e2e/smoke.test.ts`

If this file does not exist, create it:

```typescript
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

const enPages = [
  { path: "/en/", label: "homepage-en" },
  { path: "/en/about/", label: "about-en" },
  { path: "/en/events/", label: "events-en" },
  { path: "/en/leadership/", label: "leadership-en" },
  { path: "/en/outreach/", label: "outreach-en" },
  { path: "/en/resources/", label: "resources-en" },
  { path: "/en/join/", label: "join-en" },
];

const arPages = [
  { path: "/ar/", label: "homepage-ar" },
  { path: "/ar/events/", label: "events-ar" },
  { path: "/ar/leadership/", label: "leadership-ar" },
];

for (const { path, label } of [...enPages, ...arPages]) {
  test(`${label} loads without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    const response = await page.goto(BASE + path);
    expect(response?.status()).toBe(200);
    expect(errors).toHaveLength(0);
  });
}

test("english navigation contains all seven items", async ({ page }) => {
  await page.goto(BASE + "/en/");
  const nav = page.locator("nav");
  await expect(nav).toContainText("Home");
  await expect(nav).toContainText("About");
  await expect(nav).toContainText("Events");
  await expect(nav).toContainText("Leadership");
  await expect(nav).toContainText("Outreach");
  await expect(nav).toContainText("Resources");
  await expect(nav).toContainText("Join Us");
});

test("arabic homepage has dir=rtl", async ({ page }) => {
  await page.goto(BASE + "/ar/");
  const dir = await page.locator("html").getAttribute("dir");
  expect(dir).toBe("rtl");
});

test("english homepage has dir=ltr", async ({ page }) => {
  await page.goto(BASE + "/en/");
  const dir = await page.locator("html").getAttribute("dir");
  expect(dir).toBe("ltr");
});
```

## Scaffold: `playwright.config.ts`

If this file does not exist, create it:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npx serve out -p 3000",
    port: 3000,
    reuseExistingServer: true,
  },
});
```

## Token-efficiency note

When running in a limited context window, use targeted selectors rather than
full-page screenshots:

- Prefer `page.locator("nav").textContent()` over `page.screenshot()`.
- Prefer `response.status()` checks over DOM-heavy assertions.
- Reserve screenshots for genuine visual regression tasks only.
