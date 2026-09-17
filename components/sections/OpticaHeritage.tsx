"use client"

import React from "react"
import { useLocale } from "next-intl"
import Link from "next/link"
import { Globe, Award, BookOpen, ExternalLink, ArrowRight } from "lucide-react"

export function OpticaHeritage() {
  const locale = useLocale()

  return (
    <section className="py-24 bg-[#000000] border-b border-white/10 relative">
      <div className="container-page">
        <div className="max-w-5xl mx-auto reticle-box p-8 md:p-14 bg-[#010E17]">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Global Optica Heritage */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-4 text-[#fa8716] text-xs font-mono">
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
                  ? "Optica is dedicated to promoting the generation, application, and archiving of knowledge in optics and photonics. As the official local section in Egypt, we provide our members with direct access to Optica technical groups, student travel grants, and peer-reviewed scientific journals."
                  : "تُعنى جمعية أوبتيكا العالمية بتطوير ونشر وتوثيق المعرفة في علوم الضوئيات والبصريات. كقسم محلي رسمي في مصر، نتيح لأعضائنا الوصول المباشر للمجموعات التخصصية، ومنح السفر للطلاب، والمجلات العلمية العالمية المحكمة."}
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

            {/* Right Col: Prestigious Badges (Technical modular panels) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-5 border border-white/10 bg-black/60 flex items-center gap-4 hover:border-[#fa8716] transition-colors">
                <div className="tech-icon-box text-[#fa8716]">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">AFFILIATION</p>
                  <p className="text-sm font-bold text-white">Official Local Section</p>
                </div>
              </div>

              <div className="p-5 border border-white/10 bg-black/60 flex items-center gap-4 hover:border-[#5CB1A2] transition-colors">
                <div className="tech-icon-box text-[#5CB1A2]">
                  <BookOpen size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">PUBLICATIONS</p>
                  <p className="text-sm font-bold text-white">Optica Publishing Group</p>
                </div>
              </div>

              <div className="p-5 border border-white/10 bg-black/60 flex items-center gap-4 hover:border-[#00e660] transition-colors">
                <div className="tech-icon-box text-[#00e660]">
                  <Globe size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">FELLOWSHIP</p>
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