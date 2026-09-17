"use client"

import React from "react"
import { useLocale } from "next-intl"

export function ImpactMetrics() {
  const locale = useLocale()

  const metrics = [
    {
      value: "430K+",
      label: locale === "en" ? "Global Optica Network" : "عضو بشبكة أوبتيكا العالمية",
      subtext: locale === "en" ? "Scientists & engineers across 180 countries" : "علماء ومهندسون في أكثر من 180 دولة",
    },
    {
      value: "100+",
      label: locale === "en" ? "Years of Scientific Heritage" : "عاماً من الريادة والتميز العلمي",
      subtext: locale === "en" ? "Advancing optics worldwide since 1916" : "تطوير علوم الضوئيات منذ عام 1916",
    },
    {
      value: "12",
      label: locale === "en" ? "Founding Board Officers" : "ضباط الهيئة التأسيسية بمصر",
      subtext: locale === "en" ? "Driving activities across Egyptian universities" : "يقودون الأنشطة بالجامعات المصرية",
    },
    {
      value: "100%",
      label: locale === "en" ? "Open Community Access" : "مجتمع مفتوح ومجاني بالكامل",
      subtext: locale === "en" ? "Zero membership barrier for local students" : "فرص متساوية لجميع الطلاب والباحثين",
    },
  ]

  return (
    <section className="relative py-20 bg-[#02121C] border-b border-[#D4AF37]/20">
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gold-gradient font-heading tracking-tight mb-2 transition-transform duration-300 group-hover:scale-105">
                {item.value}
              </h3>
              <p className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-xs text-slate-400 font-light leading-relaxed max-w-[200px]">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}