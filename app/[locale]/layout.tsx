import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Inter, Montserrat, Noto_Naskh_Arabic } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { LenisProvider } from "@/components/providers/LenisProvider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" })
const notoArabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-noto-arabic", display: "swap" })

const LOCALES = ["en", "ar"] as const

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home.hero" })
  return {
    description: t("subtitle"),
    alternates: {
      canonical: `https://optica-egypt.vercel.app/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound()
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${notoArabic.variable} antialiased selection:bg-[#00ADEF]/30 selection:text-white`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <LenisProvider>
              <Header />
              <main id="main-content" tabIndex={-1} className="focus:outline-none min-h-[calc(100vh-140px)]">
                {children}
              </main>
              <Footer />
            </LenisProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}