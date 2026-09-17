import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { siteConfig } from "@/lib/site-config"

export function Footer() {
  const t = useTranslations("footer")
  const tn = useTranslations("nav")
  const locale = useLocale()

  const routes = ["home","about","events","community","leadership","outreach","resources","join"] as const

  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div className="container-page py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-bold text-[var(--accent-secondary)] mb-1">{siteConfig.shortName.en}</p>
          <p className="text-xs text-[var(--foreground-muted)] mb-3">{t("affiliation")}</p>
          <p className="text-sm text-[var(--foreground-muted)]">{t("tagline")}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)] mb-4">{t("links")}</p>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
            {routes.map((key) => (
              <li key={key}>
                <Link href={`/${locale}${key === "home" ? "" : "/" + key}`} className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent-secondary)] transition-colors">
                  {tn(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)] mb-4">Contact</p>
          <a href={`mailto:${siteConfig.email}`} className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors block mb-2">{siteConfig.email}</a>
          {siteConfig.social.linkedin && (
            <a href={`https://linkedin.com/company/${siteConfig.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors block">LinkedIn</a>
          )}
        </div>
      </div>
      <div className="container-page pb-6">
        <p className="text-xs text-[var(--foreground-muted)]">© {new Date().getFullYear()} {t("copyright")}</p>
      </div>
    </footer>
  )
}