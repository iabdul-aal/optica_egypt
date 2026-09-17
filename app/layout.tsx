import type { Metadata } from "next"
import "@/app/globals.css"

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}