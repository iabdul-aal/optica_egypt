"use client"

import React from "react"
import { useLocale } from "next-intl"

export function ImpactMetrics() {
  const locale = useLocale()

  const metrics = [
    {
      value: "430K+",
      label: locale === "en" ? "Global Optica Network" : "عضو بشبكة أوبتيكا العالمية",
      subtext: locale === "en" ? "Scientists and engineers across 180 countries" : "علماء ومهندسون في أكثر من 180 دولة",
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
    <section className="py-20 bg-[#000000] border-b border-white/10">
      <div className="container-page">
        <div className="reticle-box grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 border-r border-b border-white/10 bg-[#02060B] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6 font-mono text-[10px] text-slate-500">
                <span>{"//"} METRIC_0{idx + 1}</span>
                <span className="w-1.5 h-1.5 bg-[#fa8716]" />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight mb-3">
                  {item.value}
                </div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#fa8716] mb-2">
                  {item.label}
                </p>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}