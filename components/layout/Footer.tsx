import Link from "next/link"
import { ArrowUpRight, Linkedin, Mail } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const footerLinks = [
  ["About", "/about"],
  ["Community", "/community"],
  ["Events", "/events"],
  ["Leadership", "/leadership"],
  ["Resources", "/resources"],
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060708] text-[var(--ink)]">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.15fr_.85fr_.9fr]">
        <div>
          <p className="text-lg font-black tracking-[0.13em]">OPTICA EGYPT</p>
          <p className="mt-1 text-[0.65rem] font-bold tracking-[0.18em] text-[var(--gold)]">LOCAL SECTION</p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-[var(--ink-soft)]">A gathering point for people advancing optics and photonics across Egypt.</p>
          <div className="mt-6 flex gap-4">
            <a aria-label="Email Optica Egypt" className="grid size-8 place-items-center text-[var(--gold)] transition-colors hover:text-[var(--ink)]" href={`mailto:${siteConfig.email}`}><Mail size={18} /></a>
            <a aria-label="Optica Egypt on LinkedIn" className="grid size-8 place-items-center text-[var(--gold)] transition-colors hover:text-[var(--ink)]" href={`https://linkedin.com/company/${siteConfig.social.linkedin}`} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
          </div>
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <div className="mt-5 grid gap-3">
            {footerLinks.map(([label, href]) => <Link key={href} href={href} className="w-fit text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]">{label}</Link>)}
          </div>
        </div>
        <div className="border-l-0 border-white/10 pt-1 md:border-l md:pl-8">
          <p className="eyebrow">Global context</p>
          <p className="mt-5 text-sm leading-7 text-[var(--ink-soft)]">Optica Egypt Local Section connects a local community with the wider optics and photonics field.</p>
          <a className="text-link mt-5" href="https://www.optica.org" target="_blank" rel="noreferrer">Visit Optica <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <div className="container-page flex flex-col gap-3 border-t border-white/10 py-5 text-[0.7rem] leading-5 text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Optica Egypt Local Section.</span>
        <span>Optica is a registered trademark of Optica.</span>
      </div>
    </footer>
  )
}
