import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ScrollProgress } from "@/components/ui/ScrollProgress"
import "@/app/globals.css"
import { siteConfig } from "@/lib/site-config"
import { getSocialSameAsUrls } from "@/lib/social"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteConfig.seo.defaultTitle, template: siteConfig.seo.titleTemplate },
  description: siteConfig.seo.defaultDescription,
  keywords: [
    "Optica Egypt",
    "Optica Egypt Local Section",
    "Egypt photonics",
    "optics society Egypt",
    "silicon photonics Cairo",
    "open-source photonics PDA",
    "Optica student chapters Egypt",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/`,
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url: `${siteUrl}/branding/FullOnBlack.png`,
        width: 1080,
        height: 1080,
        alt: "Optica Egypt Local Section",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    ...(siteConfig.social.twitter
      ? {
          creator: `@${siteConfig.social.twitter.replace(/^@+/, "")}`,
          site: `@${siteConfig.social.twitter.replace(/^@+/, "")}`,
        }
      : {}),
    images: [`${siteUrl}/branding/FullOnBlack.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Optica Egypt Local Section",
      alternateName: ["Optica Egypt", "Egypt Photonics Section"],
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/branding/FullOnBlack.png`,
        width: 1080,
        height: 1080,
      },
      description: siteConfig.seo.defaultDescription,
      foundingDate: "2026-09-10",
      parentOrganization: {
        "@type": "Organization",
        name: "Optica",
        url: "https://www.optica.org",
      },
      sameAs: [
        ...getSocialSameAsUrls(),
        "https://github.com/iabdul-aal/optica_egypt",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "administrative and general inquiries",
        url: `${siteUrl}/join`,
        availableLanguage: ["English"],
      },
      areaServed: {
        "@type": "Country",
        name: "Egypt",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Optica Egypt Local Section",
      description: siteConfig.seo.defaultDescription,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/markdown" href={`${siteUrl}/llms.txt`} title="LLM Context Summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-latin antialiased`}>
        <ThemeProvider>
          <ScrollProgress />
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Header />
          <main id="main-content" tabIndex={-1} className="main-content focus:outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
