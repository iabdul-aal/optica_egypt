import type { Locale } from "@/lib/locales"

export function formatEventDate(date: string, locale: Locale, options: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(new Date(`${date}T12:00:00`))
}

export function formatEventFormat(format: "in_person" | "online" | "hybrid", locale: Locale) {
  const labels = {
    en: { in_person: "In person", online: "Online", hybrid: "Hybrid" },
    ar: { in_person: "حضوري", online: "عبر الإنترنت", hybrid: "هجين" },
  }
  return labels[locale][format]
}

export function formatEventStatus(status: string, locale: Locale) {
  const labels = {
    en: {
      draft: "In preparation",
      upcoming: "Upcoming",
      registration_open: "Registration open",
      registration_closing: "Registration closing soon",
      sold_out: "Full",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    ar: {
      draft: "قيد الإعداد",
      upcoming: "قريباً",
      registration_open: "التسجيل مفتوح",
      registration_closing: "التسجيل يوشك على الإغلاق",
      sold_out: "مكتمل",
      completed: "مكتمل",
      cancelled: "ملغى",
    },
  }
  return labels[locale][status as keyof typeof labels.en] ?? status
}
