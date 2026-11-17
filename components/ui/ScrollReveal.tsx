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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: "80px 0px 80px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const motionClass =
    animation === "fade-in"
      ? visible
        ? "opacity-100"
        : "opacity-0"
      : animation === "slide-left"
        ? visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-5"
        : animation === "slide-right"
          ? visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-5"
          : visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "460ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      className={`${motionClass} ${className}`}
    >
      {children}
    </div>
  )
}
