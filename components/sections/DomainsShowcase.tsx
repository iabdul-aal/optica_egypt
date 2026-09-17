"use client"

import React, { useState } from "react"
import { useLocale } from "next-intl"
import { Cpu, Zap, Radio, Atom } from "lucide-react"

export function DomainsShowcase() {
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState(0)

  const domains = [
    {
      id: "01",
      name: locale === "en" ? "Integrated Photonics and PICs" : "الضوئيات المتكاملة والدوائر البصرية",
      desc: locale === "en"
        ? "Photonic Integrated Circuits (PICs) replace electronic copper wires with microscopic silicon and indium phosphide waveguides, transmitting data at the speed of light with near-zero heat dissipation."
        : "تستبدل الدوائر المتكاملة الضوئية الأسلاك النحاسية الإلكترونية بأدلة موجية ميكروسكوبية من السيليكون، لنقل البيانات بسرعة الضوء مع انعدام الفقد الحراري تقريباً.",
      highlight: locale === "en" ? "Key Focus: Silicon Photonics Prototyping and Layout" : "التركيز: نمذجة رقائق السيليكون الضوئية وتصميمها",
      badge: "Optical Compute",
      icon: Cpu,
    },
    {
      id: "02",
      name: locale === "en" ? "Laser Physics and Ultrafast Optics" : "فيزياء الليزر والبصريات الفائقة السرعة",
      desc: locale === "en"
        ? "From femtosecond pulsed lasers to industrial diode systems, we explore beam conditioning, nonlinear harmonic generation, and precision spectroscopy used in material processing and biomedical diagnostics."
        : "من ليزرات الفيمتوثانية النبضية إلى الأنظمة الصناعية، نستكشف توجيه الحزم الضوئية وتوليد التوافقيات غير الخطية والتحليل الطيفي الدقيق للتشخيص الطبي والصناعي.",
      highlight: locale === "en" ? "Key Focus: Femtosecond Spectroscopy and Diagnostics" : "التركيز: التحليل الطيفي بالفيمتوثانية والتشخيص المتقدم",
      badge: "Laser Systems",
      icon: Zap,
    },
    {
      id: "03",
      name: locale === "en" ? "Fiber Communications and Sensors" : "الاتصالات بالألياف الضوئية والحساسات",
      desc: locale === "en"
        ? "Egypt connects 17+ submarine optical fiber cables bridging the East and West. We provide advanced workshops on wavelength division multiplexing (WDM), optical amplifiers, and distributed fiber sensors."
        : "تربط مصر أكثر من 17 كابلاً بحرياً للألياف الضوئية بين الشرق والغرب. نقدم تدريباً متقدماً على مضاعفة تقسيم الأطوال الموجية ومكبرات الإشارة البصرية.",
      highlight: locale === "en" ? "Key Focus: WDM Telecom Networks and Subsea Links" : "التركيز: شبكات الاتصالات عالية السعة والكوابل البحرية",
      badge: "Telecom and Sensing",
      icon: Radio,
    },
    {
      id: "04",
      name: locale === "en" ? "Quantum Optics and Photonic AI" : "البصريات الكمية والذكاء الاصطناعي الضوئي",
      desc: locale === "en"
        ? "Exploiting entangled photon pairs for quantum key distribution (QKD) and optical tensor processing units (TPUs) capable of running deep neural networks at teraflops per watt."
        : "استغلال أزواج الفوتونات المتشابكة لتوزيع المفاتيح الكمية الآمنة، وبناء معالجات مصفوفية ضوئية لتشغيل الشبكات العصبية بسرعة خيالية وكفاءة طاقة قصوى.",
      highlight: locale === "en" ? "Key Focus: Optical Neural Networks and QKD" : "التركيز: الشبكات العصبية الضوئية والتشفير الكمي",
      badge: "DeepTech Frontier",
      icon: Atom,
    },
  ]

  const active = domains[activeTab]

  return (
    <section className="py-20 bg-[#000000] border-b border-white/10 relative overflow-hidden">
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/10 mb-3">
              <span className="w-1.5 h-1.5 bg-[#fa8716]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#fa8716]">
                {locale === "en" ? "Technological Pillars" : "المحاور التقنية والعلمية"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {locale === "en" ? "Our Photonic Domains" : "مجالات علوم الضوئيات"}
            </h2>
          </div>
          <p className="text-slate-400 text-xs font-mono max-w-md leading-relaxed">
            {locale === "en"
              ? "Bridging fundamental optical physics with industrial photonic engineering across Egyptian research centers."
              : "ربط الفيزياء البصرية الأساسية بالهندسة التطبيقية عبر المراكز البحثية والجامعية المصرية."}
          </p>
        </div>

        {/* Tab Buttons Row (Akhetonics-inspired 01, 02, 03, 04) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          {domains.map((d, index) => (
            <button
              key={d.id}
              onClick={() => setActiveTab(index)}
              className={`p-4 text-start transition-colors border flex flex-col justify-between ${
                activeTab === index
                  ? "bg-[#02060B] border-[#fa8716]"
                  : "bg-[#000000] border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between mb-3 w-full font-mono text-[10px]">
                <span className={activeTab === index ? "text-[#fa8716] font-bold" : "text-slate-500"}>
                  {"//"} {d.id}
                </span>
                <span className={`px-1.5 py-0.5 border ${activeTab === index ? "border-[#fa8716]/40 text-[#fa8716]" : "border-white/10 text-slate-500"}`}>
                  {d.badge}
                </span>
              </div>
              <h4 className={`text-xs font-mono uppercase tracking-wider ${activeTab === index ? "text-white font-bold" : "text-slate-400"}`}>
                {d.name}
              </h4>
            </button>
          ))}
        </div>

        {/* Interactive Detailed Panel */}
        <div className="reticle-box p-6 md:p-8 bg-[#02060B] border border-white/10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="tech-tag mb-3">
                <span>[ {active.badge.toUpperCase()} ]</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {active.name}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                {active.desc}
              </p>
              <div className="p-3 bg-white/[0.02] border border-white/10 text-xs text-[#fa8716] font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#fa8716]" />
                <span>{active.highlight}</span>
              </div>
            </div>

            {/* Right Column: Deep-Tech Engineering Schematic (Akhetonics Style) */}
            <div className="lg:col-span-5 bg-[#000000] border border-white/10 p-5 relative">
              {/* Schematic Header Bar */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-[10px] font-mono">
                <span className="text-[#fa8716] font-bold">SCHEMATIC // SYS_ID: {active.id}</span>
                <span className="text-slate-400">STATUS: VERIFIED</span>
              </div>

              {/* 01: Integrated Photonics PIC Circuit */}
              {activeTab === 0 && (
                <div className="space-y-4">
                  <svg className="w-full h-44" viewBox="0 0 360 180" fill="none">
                    {/* Silicon Waveguide Bus */}
                    <path d="M 20 50 L 120 50 Q 150 50 150 70 L 150 110 Q 150 130 180 130 L 340 130" stroke="#00B4FF" strokeWidth="2.5" />
                    <path d="M 20 130 L 120 130 Q 150 130 150 110 L 150 70 Q 150 50 180 50 L 340 50" stroke="#00B4FF" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.7" />
                    {/* Ring Resonator Filter */}
                    <circle cx="260" cy="90" r="30" stroke="#fa8716" strokeWidth="2" fill="none" />
                    <circle cx="260" cy="90" r="2" fill="#fa8716" />
                    <line x1="260" y1="60" x2="260" y2="120" stroke="rgba(250,135,22,0.3)" strokeDasharray="2 2" />
                    {/* Mach-Zehnder Phase Shifter */}
                    <rect x="70" y="38" width="40" height="24" rx="2" fill="#0A2234" stroke="#D4AF37" strokeWidth="1" />
                    <text x="75" y="54" fill="#D4AF37" fontSize="9" fontFamily="monospace">Δφ (1550)</text>
                    {/* Laser In & Drop Out labels */}
                    <text x="15" y="42" fill="#94A3B8" fontSize="8" fontFamily="monospace">P_IN (Laser)</text>
                    <text x="290" y="42" fill="#00B4FF" fontSize="8" fontFamily="monospace">P_THROUGH</text>
                    <text x="290" y="145" fill="#fa8716" fontSize="8" fontFamily="monospace">P_DROP (Resonant)</text>
                  </svg>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-white/5">
                    <div className="p-2 border border-white/10 bg-white/[0.02] text-slate-300">CORE LOSS: &lt; 0.2 dB/cm</div>
                    <div className="p-2 border border-white/10 bg-white/[0.02] text-[#5CB1A2]">PDK: 220nm SOI Global Foundry</div>
                  </div>
                </div>
              )}

              {/* 02: Ultrafast Femtosecond Laser Cavity */}
              {activeTab === 1 && (
                <div className="space-y-4">
                  <svg className="w-full h-44" viewBox="0 0 360 180" fill="none">
                    {/* Laser Cavity Resonator */}
                    <rect x="25" y="60" width="10" height="60" fill="#475569" stroke="#94A3B8" />
                    <rect x="325" y="60" width="8" height="60" fill="#fa8716" opacity="0.8" />
                    {/* Intra-Cavity Laser Ray */}
                    <line x1="35" y1="90" x2="140" y2="90" stroke="#EF4444" strokeWidth="2.5" />
                    <line x1="180" y1="90" x2="325" y2="90" stroke="#EF4444" strokeWidth="2.5" />
                    {/* Ti:Sapphire Crystal */}
                    <polygon points="140,70 180,70 170,110 130,110" fill="#991B1B" stroke="#F87171" strokeWidth="1.5" />
                    <text x="132" y="125" fill="#FCA5A5" fontSize="8" fontFamily="monospace">Ti:Sapphire</text>
                    {/* Dispersion Prism Pair */}
                    <polygon points="220,120 240,150 200,150" stroke="#5CB1A2" strokeWidth="1" fill="#0C4A6E" />
                    <polygon points="260,120 280,150 240,150" stroke="#5CB1A2" strokeWidth="1" fill="#0C4A6E" />
                    {/* Output Pulse Train */}
                    <path d="M 333 90 Q 340 70 345 90 Q 350 110 355 90" stroke="#F87171" strokeWidth="2" />
                    <text x="25" y="48" fill="#94A3B8" fontSize="8" fontFamily="monospace">HR Mirror (99.9%)</text>
                    <text x="270" y="48" fill="#fa8716" fontSize="8" fontFamily="monospace">Output Coupler (T=5%)</text>
                  </svg>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-white/5">
                    <div className="p-2 border border-white/10 bg-white/[0.02] text-slate-300">PULSE: &lt; 20 fs FWHM</div>
                    <div className="p-2 border border-white/10 bg-white/[0.02] text-[#fa8716]">PEAK POWER: 2.5 MW</div>
                  </div>
                </div>
              )}

              {/* 03: Fiber Telecom DWDM Grid */}
              {activeTab === 2 && (
                <div className="space-y-4">
                  <svg className="w-full h-44" viewBox="0 0 360 180" fill="none">
                    {/* Fiber Core Cross-Section */}
                    <circle cx="90" cy="90" r="55" stroke="#334155" strokeWidth="1.5" fill="#0F172A" />
                    <circle cx="90" cy="90" r="18" stroke="#5CB1A2" strokeWidth="2" fill="#0284C7" fillOpacity="0.4" />
                    <circle cx="90" cy="90" r="4" fill="#38BDF8" />
                    <text x="50" y="160" fill="#94A3B8" fontSize="8" fontFamily="monospace">Core: 9µm / Cladding: 125µm</text>
                    {/* DWDM Multi-Wavelength Spectrum */}
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
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-white/5">
                    <div className="p-2 border border-white/10 bg-white/[0.02] text-slate-300">GRID: 50 GHz ITU Channels</div>
                    <div className="p-2 border border-white/10 bg-white/[0.02] text-[#5CB1A2]">SUBSEA LINK: Red Sea 17+</div>
                  </div>
                </div>
              )}

              {/* 04: Quantum Entangled Photon Pair Source */}
              {activeTab === 3 && (
                <div className="space-y-4">
                  <svg className="w-full h-44" viewBox="0 0 360 180" fill="none">
                    {/* Pump Laser 405nm */}
                    <line x1="20" y1="90" x2="120" y2="90" stroke="#A855F7" strokeWidth="3" />
                    <text x="20" y="75" fill="#C084FC" fontSize="8" fontFamily="monospace">Pump (405 nm)</text>
                    {/* Non-Linear SPDC BBO Crystal */}
                    <polygon points="120,60 160,75 160,105 120,120" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
                    <text x="122" y="140" fill="#A5B4FC" fontSize="8" fontFamily="monospace">BBO Crystal</text>
                    {/* Entangled Photon Cones (Signal and Idler) */}
                    <line x1="160" y1="85" x2="310" y2="45" stroke="#fa8716" strokeWidth="2" />
                    <line x1="160" y1="95" x2="310" y2="135" stroke="#5CB1A2" strokeWidth="2" />
                    {/* Avalanche Photodiode Detectors */}
                    <rect x="310" y="35" width="30" height="20" fill="#0A2234" stroke="#fa8716" />
                    <rect x="310" y="125" width="30" height="20" fill="#0A2234" stroke="#5CB1A2" />
                    <text x="260" y="32" fill="#fa8716" fontSize="8" fontFamily="monospace">|H⟩ Signal (810 nm)</text>
                    <text x="260" y="155" fill="#5CB1A2" fontSize="8" fontFamily="monospace">|V⟩ Idler (810 nm)</text>
                  </svg>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-white/5">
                    <div className="p-2 border border-white/10 bg-white/[0.02] text-slate-300">STATE: |Ψ+⟩ Bell Singlet</div>
                    <div className="p-2 border border-white/10 bg-white/[0.02] text-[#00e660]">FIDELITY: 99.4% Verified</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}