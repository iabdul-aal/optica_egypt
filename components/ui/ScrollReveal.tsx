"use client"

import { useEffect, useRef, useState } from "react"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right"
  delay?: number
}

export function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  // Render visible by default during SSR and initial paint so crawlers,
  // full-page views, print layouts, and hash jumps never see blank gaps.
  const [stage, setStage] = useState<"visible" | "staged">("visible")

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    // Only stage elements that begin well below the initial viewport fold.
    if (rect.top <= window.innerHeight + 40) return

    setStage("staged")

    const reveal = () => setStage("visible")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: "140px 0px 140px 0px" }
    )

    observer.observe(element)
    // Failsafe reveal so long-page captures or programmatic jumps never stay hidden.
    const safetyTimer = window.setTimeout(reveal, 450)

    return () => {
      observer.disconnect()
      window.clearTimeout(safetyTimer)
    }
  }, [])

  const isVisible = stage === "visible"

  const motionClass =
    animation === "fade-in"
      ? isVisible
        ? "opacity-100"
        : "opacity-0"
      : animation === "slide-left"
        ? isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-4"
        : animation === "slide-right"
          ? isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4"
          : isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "420ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      className={`${motionClass} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
