import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { BrandCrest } from "@/components/ui/BrandCrest"
import { SocialIcon } from "@/components/ui/SocialIcon"
import { siteConfig } from "@/lib/site-config"
import { getActiveSocialChannels } from "@/lib/social"
import { getAssetPath } from "@/lib/utils"

const links = [
  { label: "About", href: "/about" },
  { label: "Chapters", href: "/chapters" },
  { label: "Governance", href: "/governance" },
  { label: "Projects", href: "/projects" },
  { label: "Leadership", href: "/leadership" },
  { label: "Open-Source", href: "/open-source" },
  { label: "Resources", href: "/resources" },
  { label: "Updates", href: "/updates" },
  { label: "Press", href: "/press" },
  { label: "Join", href: "/join" },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  const activeSocials = getActiveSocialChannels()

  return (
    <footer className="site-footer">
      <div className="container-page footer-grid">
        <div className="footer-introduction">
          <div className="flex items-center gap-3">
            <BrandCrest className="h-9 w-auto shrink-0 text-[var(--gold)]" />
            <div>
              <p className="footer-name">{siteConfig.shortName}</p>
              <p className="footer-section-label">LOCAL SECTION</p>
            </div>
          </div>
          <p className="footer-copy">{siteConfig.seo.defaultDescription}</p>
          <div className="mt-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-[48px] items-center gap-2 text-sm font-medium text-[var(--gold)] hover:underline break-all"
            >
              <Mail size={15} aria-hidden="true" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
          <div className="footer-socials flex-wrap">
            {activeSocials.map((channel) => (
              <a
                key={channel.id}
                aria-label={channel.label}
                className="icon-link min-h-[48px] min-w-[48px]"
                href={channel.url!}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon platform={channel.id} size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <nav className="footer-navigation" aria-label="Footer links">
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-affiliation">
          <p className="eyebrow">Parent Society</p>
          <p>{siteConfig.affiliation}</p>
          <div className="mt-4 flex flex-col items-start gap-2">
            <a
              className="text-link inline-flex items-center gap-1 min-h-[48px]"
              href={siteConfig.parentOrg.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Visit Optica Global</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              className="text-link inline-flex items-center gap-1 min-h-[48px]"
              href={getAssetPath("/docs/optica-egypt-fact-sheet.html")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Section Fact Sheet (A4)</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-page footer-bottom">
        <span>Optica Egypt Local Section, Chartered {siteConfig.approvedDate}</span>
        <span>{year}</span>
      </div>
    </footer>
  )
}
