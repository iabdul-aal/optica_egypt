"use client"

import React, { useState } from "react"
import { useLocale } from "next-intl"

export function DomainsShowcase() {
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState(0)

  const domains = [
    {
      id: "01",
      code: "PIC_SYS",
      name: locale === "en" ? "Integrated Photonics and PICs" : "الضوئيات المتكاملة والدوائر البصرية",
      desc: locale === "en"
        ? "Photonic Integrated Circuits (PICs) replace electronic copper wires with microscopic silicon and indium phosphide waveguides, transmitting data at the speed of light with near-zero heat dissipation."
        : "تستبدل الدوائر المتكاملة الضوئية الأسلاك النحاسية الإلكترونية بأدلة موجية ميكروسكوبية من السيليكون، لنقل البيانات بسرعة الضوء مع انعدام الفقد الحراري تقريباً.",
      highlight: locale === "en" ? "Silicon Photonics Prototyping and Layout" : "نمذجة رقائق السيليكون الضوئية وتصميمها",
      badge: "Optical Compute",
      specs: [
        { label: "CORE LOSS", val: "< 0.2 dB/cm" },
        { label: "FOUNDRY PDK", val: "220nm SOI" },
        { label: "MODULATION", val: "> 50 GHz" },
      ],
    },
    {
      id: "02",
      code: "LASER_CAV",
      name: locale === "en" ? "Laser Physics and Ultrafast Optics" : "فيزياء الليزر والبصريات الفائقة السرعة",
      desc: locale === "en"
        ? "From femtosecond pulsed lasers to industrial diode systems, we explore beam conditioning, nonlinear harmonic generation, and precision spectroscopy used in material processing and biomedical diagnostics."
        : "من ليزرات الفيمتوثانية النبضية إلى الأنظمة الصناعية، نستكشف توجيه الحزم الضوئية وتوليد التوافقيات غير الخطية والتحليل الطيفي الدقيق للتشخيص الطبي والصناعي.",
      highlight: locale === "en" ? "Femtosecond Spectroscopy and Diagnostics" : "التحليل الطيفي بالفيمتوثانية والتشخيص المتقدم",
      badge: "Laser Systems",
      specs: [
        { label: "PULSE DURATION", val: "< 20 fs FWHM" },
        { label: "PEAK POWER", val: "2.5 MW" },
        { label: "CRYSTAL", val: "Ti:Sapphire" },
      ],
    },
    {
      id: "03",
      code: "FIBER_GRID",
      name: locale === "en" ? "Fiber Communications and Sensors" : "الاتصالات بالألياف الضوئية والحساسات",
      desc: locale === "en"
        ? "Egypt connects 17+ submarine optical fiber cables bridging the East and West. We provide advanced workshops on wavelength division multiplexing (WDM), optical amplifiers, and distributed fiber sensors."
        : "تربط مصر أكثر من 17 كابلاً بحرياً للألياف الضوئية بين الشرق والغرب. نقدم تدريباً متقدماً على مضاعفة تقسيم الأطوال الموجية ومكبرات الإشارة البصرية.",
      highlight: locale === "en" ? "WDM Telecom Networks and Subsea Links" : "شبكات الاتصالات عالية السعة والكوابل البحرية",
      badge: "Telecom and Sensing",
      specs: [
        { label: "ITU GRID", val: "50 GHz C-Band" },
        { label: "SUBSEA RED SEA", val: "17+ Cables" },
        { label: "FIBER CORE", val: "9/125 µm SMF" },
      ],
    },
    {
      id: "04",
      code: "QUANTUM_OPT",
      name: locale === "en" ? "Quantum Optics and Photonic AI" : "البصريات الكمية والذكاء الاصطناعي الضوئي",
      desc: locale === "en"
        ? "Exploiting entangled photon pairs for quantum key distribution (QKD) and optical tensor processing units (TPUs) capable of running deep neural networks at teraflops per watt."
        : "استغلال أزواج الفوتونات المتشابكة لتوزيع المفاتيح الكمية الآمنة، وبناء معالجات مصفوفية ضوئية لتشغيل الشبكات العصبية بسرعة خيالية وكفاءة طاقة قصوى.",
      highlight: locale === "en" ? "Optical Neural Networks and QKD" : "الشبكات العصبية الضوئية والتشفير الكمي",
      badge: "DeepTech Frontier",
      specs: [
        { label: "BELL STATE", val: "|Ψ+⟩ Singlet" },
        { label: "FIDELITY", val: "99.4%" },
        { label: "PUMP SOURCE", val: "405 nm Diode" },
      ],
    },
  ]

  const active = domains[activeTab]

  return (
    <section className="py-24 bg-[#000000] border-b border-white/10 relative">
      <div className="container-page">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-8 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                {locale === "en" ? "CORE SCIENTIFIC DOMAINS" : "المحاور العلمية الأساسية"}
              </span>
            </div>
            <h2 className="editorial-headline text-white">
              {locale === "en" ? "The Photonic Disciplines" : "مجالات علوم الضوئيات"}
            </h2>
          </div>
          <p className="editorial-lead text-slate-400 max-w-md">
            {locale === "en"
              ? "Bridging fundamental optical physics with industrial photonic engineering across Egyptian research universities."
              : "ربط الفيزياء البصرية الأساسية بالهندسة التطبيقية عبر المراكز البحثية والجامعية المصرية."}
          </p>
        </div>

        {/* Split Laboratory Bench: Left Controller Ledger + Right Optical Workstation */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Domain Selector Ledger + Active Analysis */}
          <div className="lg:col-span-5 space-y-6">
            {/* Vertical Index Ledger */}
            <div className="divide-y divide-white/10 border-y border-white/10">
              {domains.map((d, index) => {
                const isSelected = activeTab === index
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveTab(index)}
                    className={`w-full py-4 text-start transition-all flex items-start justify-between gap-4 group ${
                      isSelected ? "text-white" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`editorial-label transition-colors mt-0.5 ${
                          isSelected ? "text-[#fa8716] font-bold" : "text-slate-600 group-hover:text-slate-400"
                        }`}
                      >
                        {d.id}
                      </span>
                      <div>
                        <h3 className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${
                          isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                        }`}>
                          {d.name}
                        </h3>
                        <p className="editorial-label text-[10px] text-slate-500 mt-1">
                          {d.code} {"//"} {d.badge}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1 shrink-0">
                      <span
                        className={`block w-2 h-2 transition-all ${
                          isSelected ? "bg-[#fa8716] scale-100" : "bg-transparent scale-0 border border-white/20"
                        }`}
                      />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Active Domain Detailed Statement */}
            <div className="pt-4 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {active.desc}
              </p>
              <div className="py-3 px-4 bg-white/[0.02] border-l-2 border-[#fa8716] text-xs text-slate-200 font-mono flex items-center justify-between">
                <span>{active.highlight}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Optical Bench Oscilloscope Display */}
          <div className="lg:col-span-7 bg-[#02060B] border border-white/10 p-6 relative">
            {/* Laboratory Test-Bench Header Telemetry */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#00e660]" />
                <span className="text-[#00e660] font-bold">BENCH_0{active.id} {"//"} ACTIVE</span>
              </div>
              <span className="text-slate-500">SCHEMATIC: {active.code}</span>
              <span className="text-slate-400">TELEMETRY: VERIFIED</span>
            </div>

            {/* Precision Optical Schematics */}
            <div className="min-h-[220px] flex items-center justify-center p-2">
              {activeTab === 0 && (
                <div className="w-full space-y-4">
                  <svg className="w-full h-48" viewBox="0 0 360 180" fill="none">
                    <path d="M 20 50 L 120 50 Q 150 50 150 70 L 150 110 Q 150 130 180 130 L 340 130" stroke="#00B4FF" strokeWidth="2" />
                    <path d="M 20 130 L 120 130 Q 150 130 150 110 L 150 70 Q 150 50 180 50 L 340 50" stroke="#00B4FF" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                    <circle cx="260" cy="90" r="30" stroke="#fa8716" strokeWidth="2" fill="none" />
                    <circle cx="260" cy="90" r="2" fill="#fa8716" />
                    <line x1="260" y1="60" x2="260" y2="120" stroke="rgba(250,135,22,0.3)" strokeDasharray="2 2" />
                    <rect x="70" y="38" width="40" height="24" rx="1" fill="#0A2234" stroke="#D4AF37" strokeWidth="1" />
                    <text x="75" y="53" fill="#D4AF37" fontSize="9" fontFamily="monospace">Δφ (1550)</text>
                    <text x="15" y="42" fill="#94A3B8" fontSize="8" fontFamily="monospace">P_IN (Laser)</text>
                    <text x="280" y="42" fill="#00B4FF" fontSize="8" fontFamily="monospace">P_THROUGH</text>
                    <text x="260" y="150" fill="#fa8716" fontSize="8" fontFamily="monospace">P_DROP (Resonant)</text>
                  </svg>
                </div>
              )}

              {activeTab === 1 && (
                <div className="w-full space-y-4">
                  <svg className="w-full h-48" viewBox="0 0 360 180" fill="none">
                    <rect x="25" y="60" width="10" height="60" fill="#475569" stroke="#94A3B8" />
                    <rect x="325" y="60" width="8" height="60" fill="#fa8716" opacity="0.8" />
                    <line x1="35" y1="90" x2="140" y2="90" stroke="#EF4444" strokeWidth="2" />
                    <line x1="180" y1="90" x2="325" y2="90" stroke="#EF4444" strokeWidth="2" />
                    <polygon points="140,70 180,70 170,110 130,110" fill="#991B1B" stroke="#F87171" strokeWidth="1.5" />
                    <text x="132" y="125" fill="#FCA5A5" fontSize="8" fontFamily="monospace">Ti:Sapphire</text>
                    <polygon points="220,120 240,150 200,150" stroke="#5CB1A2" strokeWidth="1" fill="#0C4A6E" />
                    <polygon points="260,120 280,150 240,150" stroke="#5CB1A2" strokeWidth="1" fill="#0C4A6E" />
                    <path d="M 333 90 Q 340 70 345 90 Q 350 110 355 90" stroke="#F87171" strokeWidth="2" />
                    <text x="25" y="48" fill="#94A3B8" fontSize="8" fontFamily="monospace">HR Mirror (99.9%)</text>
                    <text x="250" y="48" fill="#fa8716" fontSize="8" fontFamily="monospace">Output Coupler (T=5%)</text>
                  </svg>
                </div>
              )}

              {activeTab === 2 && (
                <div className="w-full space-y-4">
                  <svg className="w-full h-48" viewBox="0 0 360 180" fill="none">
                    <circle cx="90" cy="90" r="55" stroke="#334155" strokeWidth="1.5" fill="#0F172A" />
                    <circle cx="90" cy="90" r="18" stroke="#5CB1A2" strokeWidth="2" fill="#0284C7" fillOpacity="0.4" />
                    <circle cx="90" cy="90" r="4" fill="#38BDF8" />
                    <text x="45" y="160" fill="#94A3B8" fontSize="8" fontFamily="monospace">Core: 9µm / Clad: 125µm</text>
                    <g transform="translate(180, 40)">
                      <line x1="0" y1="80" x2="160" y2="80" stroke="#475569" strokeWidth="1" />
                      <line x1="20" y1="80" x2="20" y2="20" stroke="#38BDF8" strokeWidth="2" />
                      <line x1="40" y1="80" x2="40" y2="15" stroke="#5CB1A2" strokeWidth="2" />
                      <line x1="60" y1="80" x2="60" y2="10" stroke="#fa8716" strokeWidth="2" />
                      <line x1="80" y1="80" x2="80" y2="12" stroke="#F59E0B" strokeWidth="2" />
                      <line x1="100" y1="80" x2="100" y2="25" stroke="#D4AF37" strokeWidth="2" />
                      <line x1="120" y1="80" x2="120" y2="30" stroke="#10B981" strokeWidth="2" />
                      <line x1="140" y1="80" x2="140" y2="40" stroke="#6366F1" strokeWidth="2" />
                      <text x="20" y="95" fill="#94A3B8" fontSize="8" fontFamily="monospace">1530nm (C-BAND) 1565nm</text>
                    </g>
                  </svg>
                </div>
              )}

              {activeTab === 3 && (
                <div className="w-full space-y-4">
                  <svg className="w-full h-48" viewBox="0 0 360 180" fill="none">
                    <line x1="20" y1="90" x2="120" y2="90" stroke="#A855F7" strokeWidth="2.5" />
                    <text x="20" y="75" fill="#C084FC" fontSize="8" fontFamily="monospace">Pump (405 nm)</text>
                    <polygon points="120,60 160,75 160,105 120,120" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
                    <text x="122" y="140" fill="#A5B4FC" fontSize="8" fontFamily="monospace">BBO Crystal</text>
                    <line x1="160" y1="85" x2="310" y2="45" stroke="#fa8716" strokeWidth="2" />
                    <line x1="160" y1="95" x2="310" y2="135" stroke="#5CB1A2" strokeWidth="2" />
                    <rect x="310" y="35" width="30" height="20" fill="#0A2234" stroke="#fa8716" />
                    <rect x="310" y="125" width="30" height="20" fill="#0A2234" stroke="#5CB1A2" />
                    <text x="250" y="30" fill="#fa8716" fontSize="8" fontFamily="monospace">|H⟩ Signal (810 nm)</text>
                    <text x="250" y="160" fill="#5CB1A2" fontSize="8" fontFamily="monospace">|V⟩ Idler (810 nm)</text>
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom Parameter Ledger */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 font-mono text-[10px]">
              {active.specs.map((spec, i) => (
                <div key={i} className="p-2.5 bg-white/[0.02] border border-white/5">
                  <span className="text-slate-500 block text-[9px]">{spec.label}</span>
                  <span className="text-white font-bold">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}