"use client"

import React from "react"
import { useLocale } from "next-intl"
import Link from "next/link"
import { Globe, Award, BookOpen, ExternalLink, ArrowRight } from "lucide-react"

export function OpticaHeritage() {
  const locale = useLocale()

  return (
    <section className="py-24 bg-[#02121C] border-b border-[#D4AF37]/20 relative overflow-hidden">
      <div className="container-page">
        <div className="max-w-5xl mx-auto glass-panel-gold p-8 md:p-14 relative overflow-hidden bg-[#010E17]/90">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Global Optica Heritage */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 text-[#D4AF37] text-xs font-mono">
                <Globe size={13} />
                <span>WASHINGTON D.C. · EST. 1916</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                {locale === "en"
                  ? "Backed by the World's Leading Optics Society"
                  : "مدعوم من الجمعية العالمية الرائدة للبصريات والضوئيات"}
              </h2>

              <p className="text-slate-300 text-base leading-relaxed mb-8 font-light">
                {locale === "en"
                  ? "Optica (formerly OSA) is dedicated to promoting the generation, application, and archiving of knowledge in optics and photonics. As the official local section in Egypt, we provide our members with direct access to Optica's technical groups, student travel grants, and peer-reviewed scientific journals."
                  : "تُعنى منظمة أوبتيكا (المعروفة سابقاً بـ OSA) بتطوير ونشر وتوثيق المعرفة في علوم الضوئيات والبصريات. كقسم محلي رسمي في مصر، نتيح لأعضائنا الوصول المباشر للمجموعات التخصصية، ومنح السفر للطلاب، والمجلات العلمية العالمية المحكمة."}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://www.optica.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-3 px-6 inline-flex items-center gap-2"
                >
                  <span>{locale === "en" ? "Visit Optica Global" : "زيارة موقع أوبتيكا العالمي"}</span>
                  <ExternalLink size={14} />
                </a>

                <Link
                  href={`/${locale}/about`}
                  className="btn-secondary text-xs py-3 px-6 inline-flex items-center gap-2"
                >
                  <span>{locale === "en" ? "About Egypt Section" : "عن قسم مصر المحلي"}</span>
                  <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
                </Link>
              </div>
            </div>

            {/* Right Col: Prestigious Badges */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">AFFILIATION</p>
                  <p className="text-sm font-bold text-white">Official Local Section</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00B4FF]/15 text-[#00B4FF] flex items-center justify-center shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">PUBLICATIONS</p>
                  <p className="text-sm font-bold text-white">Optica Publishing Group</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">FELLOWSHIP</p>
                  <p className="text-sm font-bold text-white">180+ Countries Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}