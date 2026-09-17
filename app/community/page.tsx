import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("community")
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("subheading"),
  }
}

export default async function CommunityPage() {
  const t = await getTranslations("community")
  const j = await getTranslations("join")

  const TRACKS = [
    {
      id: "01",
      code: "TRACK_01",
      title: "Undergraduates and Graduates",
      desc: "Gain hands-on optical design training, lab mentorship, and international competition support.",
      status: "Active Mentorship Cohort",
    },
    {
      id: "02",
      code: "TRACK_02",
      title: "Academic Researchers",
      desc: "Facilitate inter-university research, share specialized laser and spectroscopy facilities, and publish jointly.",
      status: "Shared Lab Network",
    },
    {
      id: "03",
      code: "TRACK_03",
      title: "Industry and Telecom",
      desc: "Connect optical fiber, telecom, and sensor manufacturers with top engineering talent and applied research and development.",
      status: "Applied Testbeds",
    },
    {
      id: "04",
      code: "TRACK_04",
      title: "DeepTech Startups",
      desc: "Incubate photonics hardware concepts, access academic prototyping labs, and scale technical ventures.",
      status: "Hardware Prototyping",
    },
  ]

  const LABS_DIRECTORY = [
    {
      node: "LAB_01",
      institution: "Cairo University",
      lab: "Nanophotonics and Metamaterials Lab",
      focus: "Silicon Photonics, Plasmonics, PICs",
      contact: "cairo.photonics@eng.cu.edu.eg",
    },
    {
      node: "LAB_02",
      institution: "Ain Shams University",
      lab: "Optical Telecom and Wireless Lab",
      focus: "DWDM Systems, Free Space Optics (FSO)",
      contact: "optics@eng.asu.edu.eg",
    },
    {
      node: "LAB_03",
      institution: "Zewail City of Science and Tech",
      lab: "Center for Photonics and Smart Materials",
      focus: "Ultrafast Spectroscopy, Quantum Optics",
      contact: "cpsm@zewailcity.edu.eg",
    },
    {
      node: "LAB_04",
      institution: "American University in Cairo",
      lab: "Nanotechnology Research Center",
      focus: "Biophotonics, Optical Microcavities",
      contact: "nano@aucegypt.edu",
    },
  ]

  const benefits = [
    "Direct access to technical workshops and specialized seminars",
    "Network with international Optica fellows and senior engineers",
    "Eligibility for international student travel grants and publication awards",
    "Joint research and equipment sharing across Egyptian university labs",
  ]

  return (
    <div className="bg-[#000000] text-white">
      {/* Editorial Header */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                NATIONAL PHOTONICS ECOSYSTEM // EGYPT ROSTER
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              Connecting university researchers, telecom engineering professionals, students, and photonics hardware innovators across Egypt.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Community Cohort Tracks Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#fa8716] block mb-2">
                COHORT PATHWAYS
              </span>
              <h2 className="editorial-headline text-white">
                Four Pillars of Collaboration
              </h2>
            </div>
            <span className="editorial-label text-slate-500">
              NATIONAL INTEGRATION
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {TRACKS.map((track) => (
              <div
                key={track.id}
                className="py-10 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <span className="editorial-label text-[#fa8716] font-bold text-lg font-mono">
                      {"//"} {track.id}
                    </span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {track.title}
                    </h3>
                    <p className="editorial-label text-[10px] text-[#5CB1A2] mt-1 font-mono">
                      STATUS: {track.status}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                      {track.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Photonics Labs Directory Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5CB1A2] mb-2 uppercase">
                <Terminal size={14} />
                <span>LABORATORY DIRECTORY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Specialized Photonics Labs in Egypt
              </h2>
            </div>
            <span className="editorial-label text-slate-400">
              ACADEMIC COLLABORATION NETWORK
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {LABS_DIRECTORY.map((item, idx) => (
              <div
                key={idx}
                className="py-6 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="editorial-label text-[#fa8716] mt-0.5">{item.node}</span>
                  <div>
                    <span className="editorial-label text-xs text-[#fa8716] font-bold block mb-1">
                      {item.institution}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {item.lab}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">FOCUS: {item.focus}</p>
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-400 self-start sm:self-center">
                  <span className="text-slate-300 bg-white/[0.02] border border-white/10 px-3 py-1.5 block sm:inline">
                    {item.contact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Membership Callout Spread */}
      <section className="py-20 md:py-24 bg-[#02060B]">
        <div className="container-page">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#fa8716]">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                ZERO MEMBERSHIP FEES FOR STUDENTS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t("join_cta")}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {j("body")}
            </p>

            <div className="divide-y divide-white/10 border-y border-white/10 py-2">
              {benefits.map((benefit, i) => (
                <div key={i} className="py-3 flex items-start gap-3 text-sm">
                  <span className="editorial-label text-[#5CB1A2] text-xs mt-0.5">{"//"} 0{i + 1}</span>
                  <span className="text-slate-200 font-light">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/join"
                className="px-8 py-3.5 bg-[#fa8716] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <span>{t("join_cta")}</span>
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>Explore Upcoming Events</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
