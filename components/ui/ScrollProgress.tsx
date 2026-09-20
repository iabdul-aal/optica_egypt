"use client"

import React, { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

          if (scrollHeight > 0) {
            const percentage = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
            setProgress(percentage)
            setIsVisible(scrollTop > 20)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2.5px] bg-transparent"
      aria-hidden="true"
    >
      {/* Laser progress line */}
      <div
        className="h-full bg-gradient-to-r from-transparent via-[var(--gold)] to-[var(--gold-pale)] transition-transform duration-75 ease-out"
        style={{
          width: "100%",
          transform: `scaleX(${progress / 100})`,
          transformOrigin: "left",
          boxShadow: "0 0 10px rgba(215, 174, 91, 0.8), 0 0 3px #ffffff",
        }}
      />
      {/* Laser head pulse */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white transition-all duration-75 ease-out"
        style={{
          left: `calc(${progress}% - 3px)`,
          boxShadow: "0 0 8px #ffffff, 0 0 16px var(--gold)",
          opacity: progress > 1 ? 1 : 0,
        }}
      />
    </div>
  )
}
