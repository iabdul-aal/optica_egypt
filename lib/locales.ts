import en from "@/messages/en.json"

export const locales = ["en"] as const
export type Locale = "en"
export type Dictionary = typeof en
export type LocalizedText = { en: string }

export function isLocale(value: string): value is Locale {
  return value === "en"
}

export function getDictionary(_locale?: Locale): Dictionary {
  return en
}

export function getLocalizedText(value: LocalizedText, _locale?: Locale): string {
  return value.en
}

export function getLocaleTag(): string {
  return "en-GB"
}

export function localizedHref(_locale?: Locale, pathname = "/"): string {
  const normalizedPath = pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`
  return normalizedPath === "" ? "/" : normalizedPath
}
