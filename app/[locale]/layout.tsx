import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "@/app/globals.css"
import { getDictionary, isLocale, locales, type Locale } from "@/lib/locales"
import { siteConfig } from "@/lib/site-config"

type LayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale: requestedLocale } = await params
  const locale = isLocale(requestedLocale) ? requestedLocale : "en"
  const dictionary = getDictionary(locale)
  const canonical = `/${locale}`

  return {
    metadataBase: new URL(siteConfig.seo.siteUrl),
    title: { default: dictionary.site.name, template: `%s | ${dictionary.site.shortName}` },
    description: dictionary.site.description,
    keywords: ["Optica", "photonics", "optics", "Egypt", "local section", "laser", "fiber optics"],
    authors: [{ name: dictionary.site.name }],
    creator: dictionary.site.name,
    alternates: {
      canonical,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      url: canonical,
      siteName: dictionary.site.name,
      title: dictionary.site.name,
      description: dictionary.site.description,
    },
    twitter: { card: "summary" },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: requestedLocale } = await params
  if (!isLocale(requestedLocale)) notFound()

  const locale = requestedLocale
  const dictionary = getDictionary(locale)

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={locale === "ar" ? "font-arabic antialiased" : "font-latin antialiased"}>
        <a href="#main-content" className="skip-link">{dictionary.common.skipToContent}</a>
        <Header locale={locale} dictionary={dictionary} />
        <main id="main-content" tabIndex={-1} className="main-content focus:outline-none">
          {children}
        </main>
        <Footer locale={locale} dictionary={dictionary} />
      </body>
    </html>
  )
}
