"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="theme-toggle-btn opacity-60 cursor-default"
        disabled
      >
        <span className="w-4 h-4" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-toggle-btn"
    >
      {isDark ? (
        <Sun size={16} aria-hidden="true" className="text-[var(--gold)]" />
      ) : (
        <Moon size={16} aria-hidden="true" className="text-[var(--gold)]" />
      )}
    </button>
  )
}