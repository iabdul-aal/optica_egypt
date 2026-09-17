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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Global Optica Heritage Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#fa8716]">
              <Globe size={13} />
              <span className="editorial-label text-[#fa8716]">WASHINGTON D.C. · EST. 1916</span>
            </div>

            <h2 className="editorial-headline text-white">
              {locale === "en"
                ? "Backed by the World's Leading Optics Society"
                : "مدعوم من الجمعية العالمية الرائدة للبصريات والضوئيات"}
            </h2>

            <p className="editorial-lead text-slate-300 max-w-2xl">
              {locale === "en"
                ? "Optica is dedicated to promoting the generation, application, and archiving of knowledge in optics and photonics. As the official local section in Egypt, we provide our members with direct access to Optica technical groups, student travel grants, and peer-reviewed scientific journals."
                : "تُعنى جمعية أوبتيكا العالمية بتطوير ونشر وتوثيق المعرفة في علوم الضوئيات والبصريات. كقسم محلي رسمي في مصر، نتيح لأعضائنا الوصول المباشر للمجموعات التخصصية، ومنح السفر للطلاب، والمجلات العلمية العالمية المحكمة."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://www.optica.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fa8716] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <span>{locale === "en" ? "Visit Optica Global" : "زيارة موقع أوبتيكا العالمي"}</span>
                <ExternalLink size={14} />
              </a>

              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>{locale === "en" ? "About Egypt Section" : "عن قسم مصر المحلي"}</span>
                <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Milestone Panels */}
          <div className="lg:col-span-4 divide-y divide-white/10 border-y border-white/10">
            <div className="py-6 flex items-start gap-4">
              <div className="text-[#fa8716] mt-1 shrink-0">
                <Award size={20} />
              </div>
              <div>
                <p className="editorial-label text-[10px] text-slate-500 mb-1">AFFILIATION</p>
                <p className="text-base font-bold text-white">Official Local Section</p>
                <p className="text-xs text-slate-400 mt-1 font-light">Chartered representation across Egyptian universities.</p>
              </div>
            </div>

            <div className="py-6 flex items-start gap-4">
              <div className="text-[#5CB1A2] mt-1 shrink-0">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="editorial-label text-[10px] text-slate-500 mb-1">PUBLICATIONS</p>
                <p className="text-base font-bold text-white">Optica Publishing Group</p>
                <p className="text-xs text-slate-400 mt-1 font-light">Direct conduits to premier peer-reviewed journals.</p>
              </div>
            </div>

            <div className="py-6 flex items-start gap-4">
              <div className="text-[#00e660] mt-1 shrink-0">
                <Globe size={20} />
              </div>
              <div>
                <p className="editorial-label text-[10px] text-slate-500 mb-1">FELLOWSHIP</p>
                <p className="text-base font-bold text-white">180+ Countries Network</p>
                <p className="text-xs text-slate-400 mt-1 font-light">Connecting local researchers to international laboratories.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}