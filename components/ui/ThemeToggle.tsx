"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useTranslations } from "next-intl"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("common")
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={t("toggle_theme")}
      className="p-2 rounded-lg transition-colors hover:bg-[rgba(212,175,55,0.1)] text-[var(--foreground-muted)] hover:text-[var(--accent-secondary)]"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}