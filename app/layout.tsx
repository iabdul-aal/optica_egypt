import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "@/app/globals.css"
import { getDictionary } from "@/lib/locales"
import { siteConfig } from "@/lib/site-config"

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

const dictionary = getDictionary("en")

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: { default: dictionary.site.name, template: `%s | ${dictionary.site.shortName}` },
  description: dictionary.site.description,
  keywords: ["Optica", "photonics", "optics", "Egypt", "local section", "laser", "fiber optics"],
  authors: [{ name: dictionary.site.name }],
  creator: dictionary.site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: dictionary.site.name,
    title: dictionary.site.name,
    description: dictionary.site.description,
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-latin antialiased">
        <a href="#main-content" className="skip-link">{dictionary.common.skipToContent}</a>
        <Header locale="en" dictionary={dictionary} />
        <main id="main-content" tabIndex={-1} className="main-content focus:outline-none">
          {children}
        </main>
        <Footer locale="en" dictionary={dictionary} />
      </body>
    </html>
  )
}
