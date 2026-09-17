"use client"

import React from "react"

export function ImpactMetrics() {
  const metrics = [
    {
      value: "430K+",
      id: "METRIC_01",
      label: "Global Optica Network",
      subtext: "Scientists and engineers across 180 countries",
    },
    {
      value: "100+",
      id: "METRIC_02",
      label: "Years of Scientific Heritage",
      subtext: "Advancing optics worldwide since 1916",
    },
    {
      value: "12",
      id: "METRIC_03",
      label: "Founding Board Officers",
      subtext: "Driving activities across Egyptian universities",
    },
    {
      value: "100%",
      id: "METRIC_04",
      label: "Open Community Access",
      subtext: "Zero membership barrier for local students",
    },
  ]

  return (
    <section className="bg-[#000000] border-y border-white/10 relative">
      <div className="container-page">
        {/* Continuous Architectural Datum Band - No boxed cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="py-10 px-6 sm:px-8 flex flex-col justify-between group hover:bg-white/[0.015] transition-colors"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="editorial-label text-slate-500">
                  {"//"} {item.id}
                </span>
                <span className="w-1.5 h-1.5 bg-[#fa8716] group-hover:scale-125 transition-transform" />
              </div>

              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tighter mb-3">
                  {item.value}
                </div>
                <div className="h-0.5 w-6 bg-[#fa8716] mb-3 group-hover:w-12 transition-all duration-300" />
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-1.5">
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