import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { LenisProvider } from "@/components/providers/LenisProvider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://optica-egypt.vercel.app"),
  title: { default: "Optica Egypt Local Section", template: "%s | Optica Egypt" },
  description: "Optica Egypt Local Section connects Egypt's photonics community — students, researchers, universities, industry, and startups — to the global photonics ecosystem.",
  keywords: ["optica", "photonics", "optics", "egypt", "local section", "laser", "fiber optic"],
  authors: [{ name: "Optica Egypt Local Section" }],
  creator: "Optica Egypt Local Section",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://optica-egypt.vercel.app",
    siteName: "Optica Egypt Local Section",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} antialiased selection:bg-[#00ADEF]/30 selection:text-white`}>
        <NextIntlClientProvider messages={messages} locale="en">
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