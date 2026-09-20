"use client"

import React, { useEffect, useRef, useState } from "react"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in"
  delay?: number
  threshold?: number
}

export function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Immediate show if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  const animationClasses = {
    "fade-up": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-7 pointer-events-none",
    "fade-in": isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
    "slide-left": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-8 pointer-events-none",
    "slide-right": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-8 pointer-events-none",
    "zoom-in": isVisible
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95 pointer-events-none",
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ${animationClasses[animation]} ${className}`}
    >
      {children}
    </div>
  )
}
