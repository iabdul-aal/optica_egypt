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
        className="w-8 h-8 flex items-center justify-center border border-white/10 text-slate-400 opacity-70"
      >
        <span className="w-3 h-3 border border-current opacity-30" />
      </button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label={t("toggle_theme")}
      className="w-8 h-8 flex items-center justify-center border border-white/10 text-slate-400 hover:text-[#fa8716] hover:border-[#fa8716] transition-colors"
    >
      {currentTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}