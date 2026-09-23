import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"
import { localizedHref, type Dictionary, type Locale } from "@/lib/locales"
import { siteConfig } from "@/lib/site-config"

type FooterProps = {
  locale: Locale
  dictionary: Dictionary
}

const links = [
  ["about", "/about"],
  ["leadership", "/leadership"],
  ["community", "/community"],
  ["chapters", "/chapters"],
  ["awards", "/awards"],
  ["volunteer", "/volunteer"],
  ["events", "/events"],
  ["education", "/education"],
  ["competitions", "/competitions"],
  ["openSource", "/open-source"],
  ["resources", "/resources"],
  ["news", "/news"],
  ["blogs", "/blogs"],
  ["gallery", "/gallery"],
] as const

export function Footer({ locale, dictionary }: FooterProps) {
  const year = new Date().getFullYear()
  const linkedinUrl = siteConfig.social.linkedin
    ? `https://www.linkedin.com/company/${siteConfig.social.linkedin}`
    : null

  return (
    <footer className="site-footer">
      <div className="container-page footer-grid">
        <div className="footer-introduction">
          <p className="footer-name">{dictionary.site.shortName}</p>
          <p className="footer-section-label">LOCAL SECTION</p>
          <p className="footer-copy">{dictionary.site.description}</p>
          <div className="footer-socials">
            <a aria-label={dictionary.common.emailUs} className="icon-link" href={`mailto:${siteConfig.email}`}>
              <Mail size={18} aria-hidden="true" />
            </a>
            {linkedinUrl && (
              <a aria-label="LinkedIn" className="icon-link" href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <nav className="footer-navigation" aria-label="Footer links">
            {links.map(([key, path]) => (
              <Link key={path} href={localizedHref(locale, path)}>{dictionary.nav[key]}</Link>
            ))}
          </nav>
        </div>
        <div className="footer-affiliation">
          <p className="eyebrow">Global connection</p>
          <p>{dictionary.site.affiliation}</p>
          <a className="text-link" href={siteConfig.parentOrg.url} target="_blank" rel="noopener noreferrer">
            {dictionary.common.visitOptica}
          </a>
        </div>
      </div>
      <div className="container-page footer-legal">
        <span>© {year} {dictionary.site.name}</span>
        <span>Optica is a registered trademark of Optica.</span>
      </div>
    </footer>
  )
}
