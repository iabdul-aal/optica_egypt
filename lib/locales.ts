import ar from "@/messages/ar.json"
import en from "@/messages/en.json"

export const locales = ["en", "ar"] as const

export type Locale = (typeof locales)[number]
export type Dictionary = typeof en
export type LocalizedText = { en: string; ar: string }

const dictionaries: Record<Locale, Dictionary> = { en, ar }

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export function getLocalizedText(value: LocalizedText, locale: Locale): string {
  return value[locale] || value.en
}

export function getLocaleTag(locale: Locale): string {
  return locale === "ar" ? "ar-EG" : "en-GB"
}

export function localizedHref(locale: Locale, pathname = "/"): string {
  const normalizedPath = pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`
  return `/${locale}${normalizedPath}`
}
