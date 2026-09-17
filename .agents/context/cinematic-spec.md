# Cinematic Layer Specification

This file is the binding contract for all animation, motion, and 3D decisions.
Read this before touching any component that involves animation, transition,
hover state, scroll behavior, or 3D scene.

---

## Animation Stack

| Layer | Technology | Scope |
|---|---|---|
| Smooth scroll | Lenis (lerp 0.08) | Desktop only, native on mobile |
| Scroll-triggered | GSAP ScrollTrigger | Section entrances, Scene B |
| UI transitions | Framer Motion AnimatePresence | Page transitions, stagger groups |
| 3D scenes | React Three Fiber | Scenes A, B, C |
| Post-processing | @react-three/postprocessing | Bloom + Vignette on Scenes A and C |

---

## Page Transition Contract

Type: fade + translateY(20px) to 0
Duration: 200ms
Easing: ease-out
Trigger: AnimatePresence on route change
prefers-reduced-motion: duration collapses to 0.01ms via CSS

---

## Section Entrance Contract

Every section that enters the viewport animates in:
  initial: { opacity: 0, y: 20 }
  animate: { opacity: 1, y: 0 }
  transition: { duration: 0.4, ease: "easeOut" }

Stagger groups (cards, grids): 80ms between children.
Trigger: Framer Motion whileInView with once: true.
prefers-reduced-motion: no animation, render at final state.

---

## Hover State Contracts

Cards (EventCard, OfficerCard, ResourceCard):
  transform: scale(1.02)
  box-shadow: 0 0 0 1px var(--accent-secondary) (gold border glow)
  transition: 200ms ease

Buttons (.btn-primary):
  background: lighten 8%
  transition: 150ms ease

Navigation links:
  Gold underline slides in from left
  transform: scaleX(0) to scaleX(1), transform-origin: left
  transition: 200ms ease

Photonics icons (icon-photonics, icon-laser, icon-fiber-optic):
  transform: rotate(360deg)
  transition: 600ms ease

Officer cards (leadership grid):
  LinkedIn and email icons opacity: 0 to 1
  transform: translateY(4px) to 0

---

## Scroll Behavior Contract

Lenis initialization (app/[locale]/layout.tsx):
  new Lenis({ lerp: 0.08, smoothWheel: true })
  Disable on: window.innerWidth < 768 (mobile)
  Disable on: prefers-reduced-motion

ScrollTrigger must always use Lenis scroll proxy:
  ScrollTrigger.scrollerProxy(wrapper, {
    scrollTop(value) { ... },
    getBoundingClientRect() { ... }
  })

---

## Dark / Light Mode Contract

Strategy: next-themes class on <html> element
Default: dark (system prefers-color-scheme respected as initial)
Persist: localStorage key "theme"
Toggle: ThemeToggle component in navigation

CSS transition on theme change:
  background-color: 300ms ease
  color: 300ms ease
  border-color: 300ms ease

3D scenes on theme change:
  Dark: full color intensity, gold and teal at full brightness
  Light: scene background shifts to off-white, reduce bloom strength to 0.8

---

## prefers-reduced-motion Contract

In CSS (app/globals.css):
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }

In 3D components:
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  If true: render static fallback image, skip Canvas entirely

In GSAP:
  Check matchMedia before registering ScrollTrigger instances

---

## RTL Animation Adjustments

When locale is ar (dir="rtl"):
  Slide-in animations reverse direction (from left becomes from right)
  Nav underline: transform-origin changes to right
  GSAP x offsets: multiply by -1

Framer Motion handles RTL automatically when dir="rtl" is on html.
GSAP x values must be manually adjusted with a directionMultiplier constant.

---

## Cursor (Desktop Only)

A custom cursor dot follows the mouse:
  Default: 12px circle, border 2px solid gold #D4AF37
  On interactive element hover: scale to 32px, fill gold at 20% opacity
  On 3D canvas hover: collapse to 4px dot, gold fill

Disable: touch devices, prefers-reduced-motion

Component: components/ui/CinematicCursor.tsx
