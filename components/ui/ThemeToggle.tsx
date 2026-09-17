"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useTranslations } from "next-intl"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const t = useTranslations("common")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={t("toggle_theme")}
        className="p-2 rounded-lg transition-colors text-[var(--foreground-muted)] w-8 h-8 flex items-center justify-center opacity-70"
      >
        <span className="w-4 h-4 rounded-full border border-current opacity-30" />
      </button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label={t("toggle_theme")}
      className="p-2 rounded-lg transition-colors hover:bg-[rgba(212,175,55,0.1)] text-[var(--foreground-muted)] hover:text-[var(--accent-secondary)]"
    >
      {currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}