"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { siteConfig } from "@/lib/site-config"
import { Linkedin, Mail, Globe, ArrowRight } from "lucide-react"

export function Footer() {
  const t = useTranslations("footer")
  const tn = useTranslations("nav")
  const locale = useLocale()

  const links = [
    { key: "home", href: `/${locale}` },
    { key: "about", href: `/${locale}/about` },
    { key: "events", href: `/${locale}/events` },
    { key: "community", href: `/${locale}/community` },
    { key: "leadership", href: `/${locale}/leadership` },
    { key: "outreach", href: `/${locale}/outreach` },
    { key: "resources", href: `/${locale}/resources` },
    { key: "join", href: `/${locale}/join` },
  ]

  return (
    <footer className="relative bg-[#010B12] border-t border-[#D4AF37]/20 pt-20 pb-12 overflow-hidden">
      {/* Hairline subtle glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="container-page grid gap-12 lg:grid-cols-12 mb-16">
        {/* Brand Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <Link href={`/${locale}`} className="mb-6 block" aria-label="Optica Egypt">
            <Image
              src="/assets/brand/egypt/logo/optica-egypt-logo.png"
              alt="Optica Egypt Local Section"
              width={180}
              height={56}
              className="h-10 md:h-11 w-auto object-contain"
            />
          </Link>

          <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-light mb-6">
            {locale === "en"
              ? "The official Optica Local Section connecting students, researchers, universities, and industry in Egypt to the global photonics ecosystem."
              : "القسم المحلي الرسمي لمنظمة أوبتيكا، يربط الطلاب والباحثين والجامعات وقطاع الصناعة في مصر بالمنظومة العالمية لعلوم الضوئيات."}
          </p>

          <div className="flex items-center gap-3">
            {siteConfig.social.linkedin && (
              <a
                href={`https://linkedin.com/company/${siteConfig.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00B4FF] hover:border-[#00B4FF]/40 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            )}
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.optica.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Optica Global"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-colors"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column (3 Cols) */}
        <div className="lg:col-span-3">
          <p className="text-xs uppercase font-mono font-bold tracking-widest text-[#D4AF37] mb-6">
            {t("links")}
          </p>
          <ul className="space-y-3">
            {links.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {tn(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Global Affiliation & Newsletter (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase font-mono font-bold tracking-widest text-[#00B4FF] mb-4">
              GLOBAL AFFILIATION
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 font-light">
              Optica (formerly OSA) — The society dedicated to promoting the generation, application, and archiving of knowledge in optics and photonics worldwide.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#02121C] border border-white/10">
            <p className="text-xs font-bold text-white mb-1">
              {locale === "en" ? "Join the Section" : "انضم إلى القسم المحلي"}
            </p>
            <p className="text-xs text-slate-400 mb-4 font-light">
              {locale === "en" ? "Become part of Egypt's photonics future." : "كن جزءاً من مستقبل الضوئيات في مصر."}
            </p>
            <Link href={`/${locale}/join`} className="btn-primary text-xs py-2.5 w-full justify-center">
              <span>{locale === "en" ? "Apply Now" : "قدّم الآن"}</span>
              <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="container-page pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {t("copyright")}</p>
        <p className="font-mono text-[11px]">
          Optica Egypt Local Section · Cairo, Egypt
        </p>
      </div>
    </footer>
  )
}