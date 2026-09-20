# Engineering Gaps

Identified from baseline. Ordered by impact × risk.

## CRITICAL ,  Must fix before launch

### GAP-001: No mobile navigation
**Impact:** Users on mobile cannot access 7 of 8 pages.
**File:** `components/layout/Header.tsx`
**Fix:** Hamburger button + slide-out drawer with focus trap.
**Owner:** Frontend Engineer + Accessibility Engineer

### GAP-002: Skip-to-content link missing
**Impact:** Keyboard users must tab through entire header on every page.
**File:** `components/layout/Header.tsx`
**Fix:** First focusable element: `<a href="#main-content">Skip to content</a>`.
**Owner:** Accessibility Engineer

### GAP-003: Vercel not connected
**Impact:** Site is not publicly accessible.
**Fix:** vercel.com → New Project → import iabdul-aal/optica_egypt.
**Owner:** DevOps Engineer (2-minute manual step)

## HIGH ,  Fix before first event

### GAP-004: Three 3D scenes not implemented
**Impact:** Core cinematic requirement unmet. Site lacks differentiation.
**Files:** `components/3d/` (all files are stubs)
**Fix:** Implement SceneWrapper → Scene A → Scene B → Scene C in order.
**Owner:** Frontend Engineer using 3d-scene skill

### GAP-005: No Lenis smooth scroll
**Impact:** Animations cannot use GSAP ScrollTrigger proxy.
**File:** `components/providers/LenisProvider.tsx` (missing)
**Fix:** Create LenisProvider, add to locale layout, register ScrollTrigger proxy.

### GAP-006: No GSAP section animations
**Impact:** Pages are static ,  no scroll-triggered entrances.
**Fix:** Add useGSAP hook to each major section.

### GAP-007: Contact form not implemented
**Impact:** Join page has no way to contact the section.
**File:** `app/[locale]/join/page.tsx`
**Fix:** react-hook-form + Formspree endpoint.

## MEDIUM ,  Fix within first month

### GAP-008: No JSON-LD structured data
**Impact:** Events not eligible for Google rich results.
**File:** `app/[locale]/events/page.tsx`
**Fix:** Add Event schema when first event added to events.json.

### GAP-009: OG images missing
**Impact:** Social media shares show no preview image.
**Fix:** Generate from Sessions 1–6 (ASSET_PROMPTS.md), place in public/og/.

### GAP-010: Member photos missing
**Impact:** Leadership page shows broken images.
**Fix:** Receive photos via Drive → agent auto-processes via member-onboarding skill.

### GAP-011: Muted text contrast not verified
**Impact:** #94A3B8 on #09131F may not meet WCAG AA 4.5:1.
**Fix:** Measure with contrast checker. Lighten if needed.

### GAP-012: No Playwright tests in CI
**Impact:** Broken UI can be pushed without detection.
**File:** `.github/workflows/ci.yml`
**Fix:** Add build + Playwright steps after check step.

## LOW ,  Track and improve

### GAP-013: No unit tests on lib/ loaders
**Impact:** Data loader bugs caught only in E2E.

### GAP-014: No JSON-LD Organization schema on Home
**Impact:** Minor SEO improvement missed.

### GAP-015: Resources page has no category filter
**Impact:** Minor UX improvement (only 5 resources currently).