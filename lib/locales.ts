import en from "@/messages/en.json"

export const locales = ["en"] as const

export type Locale = (typeof locales)[number]
export type Dictionary = typeof en
export type LocalizedText = { en: string; ar?: string }

const dictionaries: Record<Locale, Dictionary> = { en }

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en
}

export function getLocalizedText(value: LocalizedText, _locale: Locale): string {
  return value.en
}

export function getLocaleTag(): string {
  return "en-GB"
}

export function localizedHref(_locale: Locale, pathname = "/"): string {
  const normalizedPath = pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`
  return `/en${normalizedPath}`
}
