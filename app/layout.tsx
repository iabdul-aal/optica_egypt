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
const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: dictionary.site.name, template: `%s | ${dictionary.site.shortName}` },
  description: dictionary.site.description,
  keywords: [
    "Optica",
    "Optica Egypt",
    "Optica Egypt Local Section",
    "Egypt photonics",
    "optics society Egypt",
    "laser science Egypt",
    "silicon photonics Cairo",
    "quantum optics",
    "Ain Shams University",
    "scientific research Cairo",
  ],
  authors: [{ name: dictionary.site.name, url: siteUrl }],
  creator: dictionary.site.name,
  publisher: "Optica",
  category: "science, technology, photonics",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: dictionary.site.name,
    title: dictionary.site.name,
    description: dictionary.site.description,
    images: [
      {
        url: `${siteUrl}/assets/brand/optica-egypt-logo.svg`,
        width: 1200,
        height: 630,
        alt: "Optica Egypt Local Section",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: dictionary.site.name,
    description: dictionary.site.description,
    creator: "@opticaegypt",
    site: "@opticaegypt",
    images: [`${siteUrl}/assets/brand/optica-egypt-logo.svg`],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Optica Egypt Local Section",
      alternateName: ["Optica Egypt", "Egypt Photonics Section"],
      url: siteUrl,
      logo: `${siteUrl}/assets/brand/optica-egypt-logo.svg`,
      description: dictionary.site.description,
      foundingDate: "2026-09-10",
      parentOrganization: {
        "@type": "Organization",
        name: "Optica",
        url: "https://www.optica.org",
      },
      sameAs: [
        "https://www.linkedin.com/company/optica-egypt",
        "https://instagram.com/opticaegypt",
        "https://twitter.com/opticaegypt",
        "https://github.com/iabdul-aal/optica_egypt",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "administrative and general inquiries",
        availableLanguage: ["English", "Arabic"],
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
      description: dictionary.site.description,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/markdown" href={`${siteUrl}/llms.txt`} title="LLM Context Summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
