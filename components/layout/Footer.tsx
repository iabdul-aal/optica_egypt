"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/site-config"
import { Linkedin, Mail, Globe, ArrowRight } from "lucide-react"

export function Footer() {
  const t = useTranslations("footer")
  const tn = useTranslations("nav")

  const links = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "events", href: "/events" },
    { key: "community", href: "/community" },
    { key: "leadership", href: "/leadership" },
    { key: "outreach", href: "/outreach" },
    { key: "resources", href: "/resources" },
    { key: "join", href: "/join" },
  ]

  return (
    <footer className="bg-[#000000] border-t border-white/10 pt-16 pb-12">
      <div className="container-page grid gap-12 lg:grid-cols-12 mb-14">
        {/* Brand Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <Link href="/" className="mb-5 block" aria-label="Optica Egypt">
            <Image
              src="/assets/brand/egypt/logo/optica-egypt-logo.png"
              alt="Optica Egypt Local Section"
              width={160}
              height={46}
              className="h-9 md:h-10 w-auto object-contain"
            />
          </Link>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light mb-6">
            The official Optica Local Section connecting students, researchers, universities, and industry in Egypt to the global photonics ecosystem.
          </p>

          <div className="flex items-center gap-2">
            {siteConfig.social.linkedin && (
              <a
                href={`https://linkedin.com/company/${siteConfig.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#fa8716] hover:border-[#fa8716] transition-colors"
              >
                <Linkedin size={15} />
              </a>
            )}
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="w-8 h-8 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#fa8716] hover:border-[#fa8716] transition-colors"
            >
              <Mail size={15} />
            </a>
            <a
              href="https://www.optica.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Optica Global"
              className="w-8 h-8 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Globe size={15} />
            </a>
          </div>
        </div>

        {/* Quick Links Column (3 Cols) */}
        <div className="lg:col-span-3">
          <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#fa8716] mb-5">
            {"//"} {t("links")}
          </p>
          <ul className="space-y-2.5 font-mono text-xs">
            {links.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {tn(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Global Affiliation and Callout (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#5CB1A2] mb-3">
              {"//"} GLOBAL AFFILIATION
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 font-light">
              Optica, the leading global society dedicated to promoting the generation, application, and archiving of knowledge in optics and photonics worldwide.
            </p>
          </div>

          <div className="reticle-box p-5 bg-[#000000] border border-white/10">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-1">
              Join the Section
            </p>
            <p className="text-xs text-slate-400 mb-4 font-light">
              Become part of Egypt&apos;s photonics future.
            </p>
            <Link href="/join" className="btn-primary text-xs py-2 w-full justify-center">
              <span>Apply Now</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="container-page pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <p>© {new Date().getFullYear()} {t("copyright")}</p>
        <p className="text-[11px] text-slate-400">
          Optica Egypt Local Section · Cairo, Egypt
        </p>
      </div>
    </footer>
  )
}