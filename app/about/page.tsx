import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { ShieldCheck, Calendar, Globe, Building2 } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about")
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("mission"),
  }
}

export default async function AboutPage() {
  const t = await getTranslations("about")

  const PILLARS = [
    {
      id: "01",
      code: "PILLAR_01",
      title: "Knowledge Transmission",
      desc: "Delivering state-of-the-art technical workshops, peer-reviewed colloquia, and hands-on lab masterclasses in silicon photonics, ultrafast lasers, and optical telecommunications.",
      focus: "Workshops, Masterclasses, and Technical Groups",
    },
    {
      id: "02",
      code: "PILLAR_02",
      title: "National Research Synergy",
      desc: "Connecting faculty, graduate investigators, and laboratory facilities across Egyptian universities to eliminate research silos and enable shared access to spectroscopy equipment.",
      focus: "Shared Spectroscopy and Lab Conduits",
    },
    {
      id: "03",
      code: "PILLAR_03",
      title: "Industrial Co-Design",
      desc: "Bridging telecom operators, fiber cable providers, and semiconductor startups with cutting-edge optical engineering talent and applied prototyping testbeds.",
      focus: "Subsea Telecommunications and Photonic Hardware",
    },
    {
      id: "04",
      code: "PILLAR_04",
      title: "Global Optica Gateway",
      desc: "Direct conduits for Egyptian students and investigators to Optica Global travel grants, technical division working groups, international student sections, and publishing archives.",
      focus: "International Travel Grants and Publishing",
    },
  ]

  const UNIVERSITIES = [
    { node: "NODE_01", name: "Cairo University", lab: "Nanophotonics and Devices Group", focus: "Silicon Photonics and Plasmonics" },
    { node: "NODE_02", name: "Ain Shams University", lab: "Optical Communications and Photonic Systems", focus: "DWDM Systems and FSO" },
    { node: "NODE_03", name: "Zewail City of Science and Technology", lab: "Center for Photonics and Smart Materials", focus: "Ultrafast Laser Spectroscopy" },
    { node: "NODE_04", name: "American University in Cairo", lab: "Nanotechnology and Materials Research Center", focus: "Biophotonics and Optical Sensors" },
    { node: "NODE_05", name: "Egypt-Japan University (E-JUST)", lab: "Optical Networks and Applied Physics", focus: "Nonlinear Fiber Optics" },
    { node: "NODE_06", name: "Alexandria University", lab: "Microwave and Photonic Sensors Lab", focus: "Fiber Bragg Gratings" },
  ]

  const ROADMAP = [
    {
      period: "Q1 2026",
      phase: "Phase 01: Charter Ratification",
      detail: "Official recognition by Optica Global headquarters, constitution approval, and founding board appointment.",
    },
    {
      period: "Q3 2026",
      phase: "Phase 02: Flagship National Symposium",
      detail: "Inaugural Egyptian Photonics Workshop uniting researchers, students, and industry partners in Cairo.",
    },
    {
      period: "Q4 2026",
      phase: "Phase 03: Shared Lab Grants and Training",
      detail: "Launch of Photonic Integrated Circuit (PIC) design masterclasses and national student travel sponsorship.",
    },
    {
      period: "2027+",
      phase: "Phase 04: Regional MENA Photonics Hub",
      detail: "Expanding cross-border research networks and co-hosting international Optica technical conferences in Egypt.",
    },
  ]

  return (
    <div className="bg-[#000000] text-white">
      {/* Editorial Title Section */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                CHARTER AND STRATEGIC FOUNDATION // EST. 2026
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              Empowering Egypt&apos;s photonics scientists, students, and engineers with direct access to the global photonics ecosystem, advanced research infrastructure, and industrial innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Asymmetric Mission and Vision Spread */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Core Mandate */}
            <div className="lg:col-span-6 space-y-4">
              <span className="editorial-label text-[#fa8716] font-bold">
                MANDATE // 01 · {t("mission_label").toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {t("mission")}
              </h2>
            </div>

            {/* Right Column: Strategic Vision */}
            <div className="lg:col-span-6 space-y-4 lg:pt-2">
              <span className="editorial-label text-[#5CB1A2] font-bold">
                PERSPECTIVE // 02 · {t("vision_label").toUpperCase()}
              </span>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                {t("vision")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars: Numbered Architectural Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#fa8716] block mb-2">
                STRATEGIC PILLARS
              </span>
              <h2 className="editorial-headline text-white">
                How We Advance the Ecosystem
              </h2>
            </div>
            <span className="editorial-label text-slate-500">
              FOUR CORE AXES
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {PILLARS.map((p) => (
              <div
                key={p.id}
                className="py-10 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <span className="editorial-label text-[#fa8716] font-bold text-lg font-mono">
                      {"//"} {p.id}
                    </span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {p.title}
                    </h3>
                    <p className="editorial-label text-[10px] text-slate-500 mt-1">
                      {p.focus}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National Research Gazetteer: Institutional Directory Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5CB1A2] mb-2 uppercase">
                <Building2 size={14} />
                <span>INSTITUTIONAL DIRECTORY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Egyptian Photonics Laboratory Coalition
              </h2>
            </div>
            <span className="editorial-label text-slate-400">
              6 CORE NODES
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {UNIVERSITIES.map((u, i) => (
              <div
                key={i}
                className="py-6 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="editorial-label text-[#fa8716]">{u.node}</span>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {u.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{u.lab}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
                  <span className="text-slate-500">FOCUS:</span>
                  <span className="text-slate-200">{u.focus}</span>
                  <span className="w-1.5 h-1.5 bg-[#00e660] ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Roadmap Spine */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="mb-14 pb-6 border-b border-white/10">
            <span className="editorial-label text-[#fa8716] block mb-2">
              MILESTONE TRACKER
            </span>
            <h2 className="editorial-headline text-white">
              2026-2027 Strategic Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y border-white/10">
            {ROADMAP.map((r, i) => (
              <div
                key={i}
                className="py-8 px-6 flex flex-col justify-between group hover:bg-white/[0.015] transition-colors"
              >
                <div>
                  <span className="editorial-label text-[#fa8716] block mb-3 font-bold">
                    {r.period}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#fa8716] transition-colors">
                    {r.phase}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {r.detail}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 font-mono text-[10px] text-slate-500">
                  MILESTONE // 0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Registry and Global Charter */}
      <section className="py-16 bg-[#000000]">
        <div className="container-page">
          <div className="grid sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="px-6 py-4 flex items-start gap-4">
              <Calendar size={20} className="text-[#fa8716] mt-1 shrink-0" />
              <div>
                <p className="editorial-label text-slate-500 mb-1">{t("founded_label")}</p>
                <p className="text-base font-bold text-white">{siteConfig.founded}</p>
              </div>
            </div>

            <div className="px-6 py-4 flex items-start gap-4">
              <Globe size={20} className="text-[#5CB1A2] mt-1 shrink-0" />
              <div>
                <p className="editorial-label text-slate-500 mb-1">{t("affiliation_label")}</p>
                <p className="text-sm font-semibold text-white">{t("affiliation")}</p>
              </div>
            </div>

            <div className="px-6 py-4 flex items-start gap-4">
              <ShieldCheck size={20} className="text-[#00e660] mt-1 shrink-0" />
              <div>
                <p className="editorial-label text-slate-500 mb-1">
                  STATUS
                </p>
                <p className="text-sm font-semibold text-[#00e660]">
                  Officially Recognized Local Section
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
